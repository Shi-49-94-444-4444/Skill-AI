(function () {
  'use strict';

  const $ = (selector) => document.querySelector(selector);
  const normalize = (value) => window.SkillAI?.text?.normalize(value) ?? String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').toLocaleLowerCase('vi-VN').replace(/\s+/g, ' ').trim();
  const escapeHtml = (value) => window.SkillAI?.text?.escapeHtml(value) ?? String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));
  let prompts = [];
  const selectedCategories = new Set();
  let toastTimer;
  let renderTimer = 0;

  function setTheme(theme, persist = true) {
    const dark = theme === 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    const button = $('#themeToggle');
    button.classList.toggle('is-dark', dark);
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
    if (persist) { try { localStorage.setItem('skill-ai-theme', dark ? 'dark' : 'light'); } catch (error) { /* private browsing */ } }
  }

  function workbookUrl() {
    const config = window.SKILL_AI_CONFIG;
    if (config.dataUrl && config.dataUrl.trim()) return config.dataUrl.trim();
    return `https://raw.githubusercontent.com/${encodeURIComponent(config.repositoryOwner)}/${encodeURIComponent(config.repositoryName)}/${encodeURIComponent(config.dataBranch)}/${encodeURIComponent(config.excelFile)}`;
  }

  async function fetchWorkbook() {
    const config = window.SKILL_AI_CONFIG;
    const sources = [workbookUrl()];
    if (/^(localhost|127\.0\.0\.1|\[::1\])$/i.test(location.hostname)) sources.push(new URL(encodeURIComponent(config.excelFile), location.href).href);
    const errors = [];
    for (const source of [...new Set(sources)]) {
      try {
        const response = await fetch(`${source}${source.includes('?') ? '&' : '?'}v=${Date.now()}`, { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.arrayBuffer();
      } catch (error) { errors.push(error.message); }
    }
    throw new Error(`Không tải được workbook (${errors.join(', ')}).`);
  }

  function parseWorkbook(buffer) {
    if (!window.XLSX) throw new Error('Thư viện đọc Excel chưa sẵn sàng.');
    const workbook = XLSX.read(buffer, { type: 'array', raw: false });
    const sheetName = workbook.SheetNames.find((name) => ['prompt nang cao', 'promt nang cao'].includes(normalize(name)));
    if (!sheetName) throw new Error(`Không tìm thấy sheet Prompt nâng cao. Các sheet hiện có: ${workbook.SheetNames.join(', ')}`);
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, raw: false, defval: '' });
    let headerIndex = -1;
    let columns = {};
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
      const map = new Map(rows[rowIndex].map((value, index) => [normalize(value), index]));
      const titleColumn = map.get('title');
      const promptColumn = map.has('prompt') ? map.get('prompt') : map.get('promt');
      const categoryColumn = map.get('category');
      if (titleColumn !== undefined && promptColumn !== undefined && categoryColumn !== undefined) {
        headerIndex = rowIndex;
        columns = { title: titleColumn, prompt: promptColumn, category: categoryColumn };
        break;
      }
    }
    if (headerIndex < 0) throw new Error('Không nhận diện được các cột Title, Promt/Prompt và Category.');
    const result = rows.slice(headerIndex + 1).map((row) => ({
      title: String(row[columns.title] ?? '').trim(),
      prompt: String(row[columns.prompt] ?? '').replace(/\r\n?/g, '\n'),
      categories: String(row[columns.category] ?? '').split(/\r?\n/).map((item) => item.trim()).filter(Boolean)
    })).filter((item) => item.title || item.prompt.trim()).map((item) => ({ ...item, searchText: normalize(`${item.title} ${item.prompt} ${item.categories.join(' ')}`) }));
    if (!result.length) throw new Error('Sheet chưa có prompt hợp lệ.');
    return result;
  }

  function getCategorySlug(cat) {
    const norm = normalize(cat);
    if (norm.includes('front') || norm.includes('ui') || norm.includes('ux')) return 'cyan';
    if (norm.includes('full') || norm.includes('debug')) return 'purple';
    if (norm.includes('gen') || norm.includes('image') || norm.includes('anh')) return 'pink';
    if (norm.includes('business') || norm.includes('seo') || norm.includes('marketing')) return 'orange';
    if (norm.includes('learn') || norm.includes('lang') || norm.includes('tieng') || norm.includes('hoc')) return 'green';
    if (norm.includes('personal') || norm.includes('ca nhan')) return 'yellow';
    return 'cyan';
  }

  function formatPromptBody(text) {
    const escaped = escapeHtml(text);
    return escaped.replace(/\[([^\]\n]+)\]/g, '<span class="prompt-var">[$1]</span>');
  }

  function render() {
    const query = normalize($('#promptSearch').value);
    const filtered = prompts.filter((item) => (!query || item.searchText.includes(query))
      && (!selectedCategories.size || item.categories.some((category) => selectedCategories.has(category))));
    $('#resultCount').textContent = `${filtered.length.toLocaleString('vi-VN')} / ${prompts.length.toLocaleString('vi-VN')} prompt`;
    if (!filtered.length) {
      $('#promptList').innerHTML = '<p class="empty-state">Không tìm thấy prompt phù hợp. Hãy đổi từ khóa hoặc chọn “Tất cả nhóm”.</p>';
      return;
    }
    $('#promptList').innerHTML = filtered.map((item) => {
      const pIndex = prompts.indexOf(item);
      const vars = item.prompt.match(/\[([^\]\n]+)\]/g) || [];
      const varsCount = vars.length;
      return `<article class="prompt-item" data-index="${pIndex}">
        <header class="prompt-card-header">
          <div class="prompt-meta-row">
            <div class="prompt-categories">
              ${item.categories.map((c) => `<span class="prompt-tag prompt-tag-${getCategorySlug(c)}">${escapeHtml(c)}</span>`).join('')}
            </div>
            <button class="quiet-button copy-prompt" type="button" data-copy-index="${pIndex}" aria-label="Sao chép prompt: ${escapeHtml(item.title)}">
              <svg class="copy-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path></svg>
              <span class="copy-label">Sao chép</span>
            </button>
          </div>
          <h3 class="prompt-title">${escapeHtml(item.title)}</h3>
        </header>
        <div class="prompt-terminal">
          <div class="terminal-bar">
            <div class="terminal-dots" aria-hidden="true">
              <span class="dot dot-red"></span>
              <span class="dot dot-yellow"></span>
              <span class="dot dot-green"></span>
            </div>
            <span class="terminal-badge">PROMPT // TEMPLATE</span>
            <span class="terminal-vars-indicator">${varsCount > 0 ? `${varsCount} tham số [ ]` : 'Template chuẩn'}</span>
          </div>
          <div class="prompt-text-block">
            <p class="prompt-text">${formatPromptBody(item.prompt)}</p>
          </div>
        </div>
        <footer class="prompt-card-footer">
          <div class="prompt-compat">
            <span class="compat-icon" aria-hidden="true">⚡</span>
            <span>Sẵn sàng cho Claude · GPT-4o · Cursor</span>
          </div>
          <span class="prompt-quick-copy" data-copy-index="${pIndex}">Nhấp để chép</span>
        </footer>
      </article>`;
    }).join('');
  }

  function skeletonMarkup() {
    return Array.from({ length: 4 }, () => `<div class="prompt-skeleton" aria-hidden="true">
      <div class="skeleton-meta-row">
        <span class="skeleton-bar skeleton-pill"></span>
        <span class="skeleton-bar skeleton-btn"></span>
      </div>
      <span class="skeleton-bar skeleton-title"></span>
      <div class="skeleton-terminal">
        <span class="skeleton-bar skeleton-line"></span>
        <span class="skeleton-bar skeleton-line"></span>
        <span class="skeleton-bar skeleton-line short"></span>
      </div>
    </div>`).join('');
  }

  function queueRender() {
    clearTimeout(renderTimer);
    renderTimer = setTimeout(() => {
      const list = $('#promptList');
      list.classList.add('is-updating');
      renderTimer = setTimeout(() => {
        render();
        requestAnimationFrame(() => list.classList.remove('is-updating'));
      }, 70);
    }, 110);
  }

  function notify(message) {
    if (window.SkillAI?.clipboard?.toast) window.SkillAI.clipboard.toast(message);
    else {
      const toast = $('#toast');
      if (toast) { toast.textContent = message; toast.classList.add('is-visible'); setTimeout(() => toast.classList.remove('is-visible'), 2000); }
    }
  }

  async function copyPrompt(index, triggerElement) {
    const item = prompts[index];
    const value = item?.prompt;
    if (value === undefined) return;
    if (window.SkillAI?.clipboard?.copy) {
      await window.SkillAI.clipboard.copy(value, `Đã sao chép: ${item.title || 'prompt'}`);
    } else {
      notify(`Đã sao chép: ${item.title || 'prompt'}`);
    }
    const card = triggerElement?.closest('.prompt-item') || $(`[data-index="${index}"]`);
    const btn = card?.querySelector('.copy-prompt');
    if (btn) {
      btn.classList.add('is-copied');
      const label = btn.querySelector('.copy-label');
      if (label) label.textContent = 'Đã chép!';
      setTimeout(() => {
        btn.classList.remove('is-copied');
        if (label) label.textContent = 'Sao chép';
      }, 1600);
    }
  }

  async function load() {
    $('#datasetStatus').textContent = 'Đang tải prompt…';
    $('#promptList').innerHTML = skeletonMarkup();
    try {
      prompts = parseWorkbook(await fetchWorkbook());
      const categoryCounts = new Map();
      prompts.forEach((item) => new Set(item.categories).forEach((category) => categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1)));
      const categories = [...categoryCounts].sort(([a], [b]) => a.localeCompare(b, 'vi'));
      for (const category of selectedCategories) if (!categoryCounts.has(category)) selectedCategories.delete(category);
      $('#promptCategoryOptions').innerHTML = categories.map(([value, count]) => `<label><input type="checkbox" value="${escapeHtml(value)}"${selectedCategories.has(value) ? ' checked' : ''}><span>${escapeHtml(value)}</span><span class="prompt-filter-count">${count.toLocaleString('vi-VN')}</span></label>`).join('');
      updateCategorySummary();
      $('#promptCount').textContent = `${prompts.length.toLocaleString('vi-VN')} prompt`;
      $('#datasetStatus').textContent = 'Đã cập nhật';
      render();
    } catch (error) {
      $('#datasetStatus').textContent = 'Không tải được dữ liệu';
      $('#resultCount').textContent = error.message;
      $('#promptList').innerHTML = `<p class="error-state">${escapeHtml(error.message)} Hãy bấm “Làm mới” để thử lại.</p>`;
    }
  }

  function updateCategorySummary() {
    $('#promptCategorySummary').textContent = selectedCategories.size ? `Đã chọn ${selectedCategories.size} nhóm` : 'Tất cả nhóm';
  }

  document.addEventListener('DOMContentLoaded', () => {
    let theme = 'light';
    try { theme = localStorage.getItem('skill-ai-theme') || 'light'; } catch (error) { /* private browsing */ }
    setTheme(theme, false);
    $('#themeToggle').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
    $('#refreshButton').addEventListener('click', load);
    $('#promptSearch').addEventListener('input', queueRender);
    $('#promptCategoryOptions').addEventListener('change', (event) => {
      const checkbox = event.target.closest('input[type="checkbox"]');
      if (!checkbox) return;
      if (checkbox.checked) selectedCategories.add(checkbox.value);
      else selectedCategories.delete(checkbox.value);
      updateCategorySummary();
      queueRender();
    });
    $('#clearSearch').addEventListener('click', () => {
      $('#promptSearch').value = '';
      selectedCategories.clear();
      $('#promptCategoryOptions').querySelectorAll('input[type="checkbox"]').forEach((checkbox) => { checkbox.checked = false; });
      updateCategorySummary();
      queueRender();
    });
    document.addEventListener('click', (event) => {
      if (!event.target.closest('#promptCategoryMenu')) $('#promptCategoryMenu').removeAttribute('open');
    });
    document.addEventListener('focusin', (event) => {
      if (!event.target.closest('#promptCategoryMenu')) $('#promptCategoryMenu').removeAttribute('open');
    });
    $('#promptList').addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-copy-index]');
      if (trigger) copyPrompt(Number(trigger.dataset.copyIndex), trigger);
    });
    window.addEventListener('message', (event) => {
      if (event.origin !== location.origin || event.source !== window.parent || !event.data) return;
      if (event.data.type === 'skill-ai-theme' && ['light', 'dark'].includes(event.data.theme)) setTheme(event.data.theme, false);
      if (event.data.type === 'skill-ai-refresh') load();
    });
    load();
  });
}());
