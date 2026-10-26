(function () {
  'use strict';

  const $ = (selector) => document.querySelector(selector);
  const normalize = (value) => String(value ?? '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd')
    .toLocaleLowerCase('vi-VN').replace(/\s+/g, ' ').trim();
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  let prompts = [];
  let toastTimer;

  function setTheme(theme, persist = true) {
    const dark = theme === 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    const button = $('#themeToggle');
    button.classList.toggle('is-dark', dark);
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
    $('#themeThumbMoon').style.display = dark ? 'none' : 'block';
    $('#themeThumbSun').style.display = dark ? 'block' : 'none';
    $('.theme-switch-static-moon').style.display = dark ? 'block' : 'none';
    $('.theme-switch-static-sun').style.display = dark ? 'none' : 'block';
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
    })).filter((item) => item.title || item.prompt.trim());
    if (!result.length) throw new Error('Sheet chưa có prompt hợp lệ.');
    return result;
  }

  function render() {
    const query = normalize($('#promptSearch').value);
    const category = $('#categoryFilter').value;
    const filtered = prompts.filter((item) => (!query || normalize(`${item.title} ${item.prompt} ${item.categories.join(' ')}`).includes(query))
      && (!category || item.categories.includes(category)));
    $('#resultCount').textContent = `${filtered.length.toLocaleString('vi-VN')} / ${prompts.length.toLocaleString('vi-VN')} prompt`;
    if (!filtered.length) {
      $('#promptList').innerHTML = '<p class="empty-state">Không tìm thấy prompt phù hợp. Hãy đổi từ khóa hoặc chọn “Tất cả nhóm”.</p>';
      return;
    }
    $('#promptList').innerHTML = filtered.map((item, index) => `<article class="prompt-item"><header><div><h2>${escapeHtml(item.title)}</h2><div class="prompt-categories">${item.categories.map((categoryName) => `<span>${escapeHtml(categoryName)}</span>`).join('')}</div></div><button class="quiet-button copy-prompt" type="button" data-copy-index="${prompts.indexOf(item)}" aria-label="Sao chép prompt: ${escapeHtml(item.title)}">Sao chép</button></header><p class="prompt-text">${escapeHtml(item.prompt)}</p></article>`).join('');
  }

  function notify(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2000);
  }

  async function copyPrompt(index) {
    const value = prompts[index]?.prompt;
    if (value === undefined) return;
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(value);
      else {
        const field = document.createElement('textarea');
        field.value = value; field.style.position = 'fixed'; field.style.opacity = '0';
        document.body.appendChild(field);
        try { field.select(); if (!document.execCommand('copy')) throw new Error('Clipboard unavailable'); }
        finally { field.remove(); }
      }
      notify('Đã sao chép prompt.');
    } catch (error) { notify('Không thể sao chép. Hãy chọn nội dung và copy thủ công.'); }
  }

  async function load() {
    $('#datasetStatus').textContent = 'Đang tải prompt…';
    $('#promptList').innerHTML = '<div class="prompt-skeleton" aria-hidden="true"></div><div class="prompt-skeleton" aria-hidden="true"></div><div class="prompt-skeleton" aria-hidden="true"></div><div class="prompt-skeleton" aria-hidden="true"></div>';
    try {
      prompts = parseWorkbook(await fetchWorkbook());
      const categories = [...new Set(prompts.flatMap((item) => item.categories))].sort((a, b) => a.localeCompare(b, 'vi'));
      $('#categoryFilter').innerHTML = '<option value="">Tất cả nhóm</option>' + categories.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join('');
      $('#promptCount').textContent = `${prompts.length.toLocaleString('vi-VN')} prompt`;
      $('#datasetStatus').textContent = 'Đã cập nhật';
      render();
    } catch (error) {
      $('#datasetStatus').textContent = 'Không tải được dữ liệu';
      $('#resultCount').textContent = error.message;
      $('#promptList').innerHTML = `<p class="error-state">${escapeHtml(error.message)} Hãy bấm “Làm mới” để thử lại.</p>`;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    let theme = 'light';
    try { theme = localStorage.getItem('skill-ai-theme') || 'light'; } catch (error) { /* private browsing */ }
    setTheme(theme, false);
    $('#themeToggle').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
    $('#refreshButton').addEventListener('click', load);
    $('#promptSearch').addEventListener('input', render);
    $('#categoryFilter').addEventListener('change', render);
    $('#clearSearch').addEventListener('click', () => { $('#promptSearch').value = ''; $('#categoryFilter').value = ''; render(); });
    $('#promptList').addEventListener('click', (event) => {
      const button = event.target.closest('[data-copy-index]');
      if (button) copyPrompt(Number(button.dataset.copyIndex));
    });
    load();
  });
}());
