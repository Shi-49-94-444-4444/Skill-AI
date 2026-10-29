/*
 * Menu Guide trong sidebar: dropdown phân nhóm + tìm kiếm phía client.
 * Dữ liệu lấy từ guides/guide-catalog.js (window.SKILL_AI_GUIDES).
 * Trang nào muốn có menu chỉ cần:
 *   - một liên kết <a data-guide-nav href=".../guides/index.html">Guide</a> trong .sidebar-nav
 *   - nạp guide-nav.css, guide-catalog.js và guide-nav.js
 * Không có JavaScript thì liên kết vẫn mở trang tổng hợp Guide.
 */
(function () {
  'use strict';

  const data = window.SKILL_AI_GUIDES;
  if (!data) return;

  const script = document.currentScript || document.querySelector('script[src*="guide-nav.js"]');
  const base = new URL('.', script ? script.src : location.href);
  const groupsById = new Map(data.groups.map((group) => [group.id, group]));

  const normalize = (value) => String(value ?? '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd')
    .toLocaleLowerCase('vi-VN').replace(/\s+/g, ' ').trim();
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));

  const urlFor = (slug) => new URL(slug === 'index' ? 'index.html' : `${slug}.html`, base).href;
  const groupLabel = (id) => groupsById.get(id)?.label || '';

  // Nhận diện trang hiện tại, hỗ trợ cả /guides/x.html, /guides/x (clean URL của Cloudflare Pages) và /guides/.
  const currentSlug = (() => {
    const path = decodeURI(location.pathname);
    const root = decodeURI(base.pathname);
    if (!path.startsWith(root)) return null;
    const rest = path.slice(root.length).replace(/\.html$/i, '').replace(/\/$/, '');
    if (!rest || rest === 'index') return 'index';
    return data.guides.some((guide) => guide.slug === rest) ? rest : null;
  })();

  // Native Browser Prefetching (không can thiệp router hay pushState)
  const prefetchedUrls = new Set();
  function prefetchUrl(href) {
    if (!href || prefetchedUrls.has(href)) return;
    try {
      const u = new URL(href, location.href);
      if (u.origin !== location.origin) return;
      prefetchedUrls.add(href);
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    } catch (e) {}
  }

  const index = data.guides.map((guide) => ({
    guide,
    fields: [
      [normalize(guide.title), 6],
      [normalize(guide.slug.replace(/-/g, ' ')), 4],
      [normalize(guide.keywords.join(' ')), 3],
      [normalize(groupLabel(guide.group)), 2],
      [normalize(guide.summary), 1]
    ]
  }));

  /** Tìm theo tên trang, nhóm, từ khóa và mô tả. Mọi từ trong truy vấn đều phải khớp. */
  function search(query) {
    const terms = normalize(query).split(' ').filter(Boolean);
    if (!terms.length) return [];
    return index.map(({ guide, fields }) => {
      let score = 0;
      for (const term of terms) {
        let best = 0;
        for (const [text, weight] of fields) if (text.includes(term)) best = Math.max(best, weight);
        if (!best) return null;
        score += best;
      }
      if (fields[0][0].startsWith(terms[0])) score += 3;
      return { guide, score };
    }).filter(Boolean).sort((a, b) => b.score - a.score || a.guide.title.localeCompare(b.guide.title, 'vi')).map((item) => item.guide);
  }

  window.SkillAIGuides = Object.freeze({
    data,
    base,
    urlFor,
    groupLabel,
    currentSlug,
    normalize,
    escapeHtml,
    search,
    prefetch: prefetchUrl
  });

  if (document.documentElement.dataset.embedded === 'true') return;

  function init() {
    const placeholder = document.querySelector('.sidebar-nav [data-guide-nav]');
    if (!placeholder) return;

    const onGuidePage = currentSlug !== null;
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = `gnav-toggle${onGuidePage ? ' active' : ''}`;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'guideNavPanel');
    toggle.setAttribute('aria-haspopup', 'dialog');
    toggle.innerHTML = '<span>Guide</span><svg class="gnav-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5"></path></svg>';
    placeholder.replaceWith(toggle);

    const scrim = document.createElement('div');
    scrim.className = 'gnav-scrim';
    scrim.hidden = true;

    const panel = document.createElement('div');
    panel.className = 'gnav-panel';
    panel.id = 'guideNavPanel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Danh sách Guide');
    panel.tabIndex = -1;
    panel.hidden = true;
    panel.innerHTML = `
      <div class="gnav-head"><p class="gnav-title">Guide <span class="gnav-count">${data.guides.length} trang · ${data.groups.length} nhóm</span></p><button class="gnav-close" type="button">Đóng</button></div>
      <div class="gnav-search">
        <label class="gnav-sr" for="guideNavSearch">Tìm guide theo tên, nhóm hoặc từ khóa</label>
        <input id="guideNavSearch" type="search" placeholder="Tìm guide, nhóm, từ khóa…" autocomplete="off" spellcheck="false">
        <button class="gnav-clear" type="button" aria-label="Xóa từ khóa" hidden><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"></path></svg></button>
      </div>
      <div class="gnav-results" id="guideNavResults" aria-live="polite"></div>
      <div class="gnav-foot"><a class="gnav-all" href="${urlFor('index')}"${currentSlug === 'index' ? ' aria-current="page"' : ''}>Xem tất cả guide</a></div>`;
    document.body.append(scrim, panel);

    const input = panel.querySelector('#guideNavSearch');
    const clear = panel.querySelector('.gnav-clear');
    const results = panel.querySelector('#guideNavResults');
    const sheetQuery = window.matchMedia('(max-width: 900px)');
    const coarse = window.matchMedia('(pointer: coarse)');

    const itemHtml = (guide, withMeta) => {
      const current = guide.slug === currentSlug;
      const meta = withMeta ? `<span class="gnav-item-meta">${escapeHtml(groupLabel(guide.group))} · ${escapeHtml(guide.summary)}</span>` : '';
      return `<li><a class="gnav-item" href="${urlFor(guide.slug)}"${current ? ' aria-current="page"' : ''}><span class="gnav-item-title">${escapeHtml(guide.title)}${current ? '<span class="gnav-here">Đang xem</span>' : ''}</span>${meta}</a></li>`;
    };

    function render() {
      const query = input.value.trim();
      clear.hidden = !query;
      if (!query) {
        results.innerHTML = data.groups.map((group) => {
          const items = data.guides.filter((guide) => guide.group === group.id);
          if (!items.length) return '';
          return `<section class="gnav-group" aria-label="${escapeHtml(group.label)}"><p class="gnav-group-title">${escapeHtml(group.label)}</p><ul class="gnav-list">${items.map((guide) => itemHtml(guide, false)).join('')}</ul></section>`;
        }).join('');
        return;
      }
      const matches = search(query);
      if (!matches.length) {
        results.innerHTML = `<div class="gnav-empty"><p>Không có guide nào khớp “${escapeHtml(query)}”.</p><button type="button" class="gnav-empty-reset">Xóa từ khóa</button></div>`;
        return;
      }
      results.innerHTML = `<p class="gnav-group-title">${matches.length} kết quả</p><ul class="gnav-list">${matches.map((guide) => itemHtml(guide, true)).join('')}</ul>`;
    }

    function place() {
      if (sheetQuery.matches) {
        panel.style.removeProperty('top');
        panel.style.removeProperty('left');
        panel.style.removeProperty('max-height');
        return;
      }
      const button = toggle.getBoundingClientRect();
      const header = toggle.closest('.site-header');
      const left = header ? header.getBoundingClientRect().right + 10 : button.right + 10;
      const top = Math.max(12, Math.min(button.top - 6, window.innerHeight - 440));
      panel.style.left = `${Math.round(left)}px`;
      panel.style.top = `${Math.round(top)}px`;
      panel.style.maxHeight = `${Math.round(window.innerHeight - top - 12)}px`;
    }

    const isOpen = () => !panel.hidden;

    function open() {
      render();
      panel.hidden = false;
      scrim.hidden = !sheetQuery.matches;
      place();
      toggle.setAttribute('aria-expanded', 'true');
      if (coarse.matches) panel.focus({ preventScroll: true });
      else input.focus({ preventScroll: true });
    }

    function close(returnFocus) {
      if (!isOpen()) return;
      panel.hidden = true;
      scrim.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      if (returnFocus) toggle.focus({ preventScroll: true });
    }

    const focusables = () => [input, ...results.querySelectorAll('a.gnav-item, button'), panel.querySelector('.gnav-all')];

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      if (isOpen()) close(false); else open();
    });
    panel.querySelector('.gnav-close').addEventListener('click', () => close(true));
    scrim.addEventListener('click', () => close(false));
    input.addEventListener('input', render);
    clear.addEventListener('click', () => { input.value = ''; render(); input.focus(); });
    results.addEventListener('click', (event) => {
      if (event.target.closest('.gnav-empty-reset')) { input.value = ''; render(); input.focus(); }
    });

    panel.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { event.preventDefault(); close(true); return; }
      if (event.key === 'Enter' && event.target === input) {
        const first = results.querySelector('a.gnav-item');
        if (input.value.trim() && first) { event.preventDefault(); location.href = first.href; }
        return;
      }
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      const list = focusables();
      const position = list.indexOf(document.activeElement);
      const next = event.key === 'ArrowDown' ? Math.min(list.length - 1, position + 1) : Math.max(0, position - 1);
      if (list[next]) { event.preventDefault(); list[next].focus(); }
    });

    panel.addEventListener('focusout', (event) => {
      const next = event.relatedTarget;
      if (next && !panel.contains(next) && next !== toggle) close(false);
    });

    document.addEventListener('click', (event) => {
      if (isOpen() && !panel.contains(event.target) && !toggle.contains(event.target)) close(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isOpen()) close(true);
    });
    window.addEventListener('resize', () => { if (isOpen()) { scrim.hidden = !sheetQuery.matches; place(); } });

    // Tự động prefetch trang Guide khi rê chuột hoặc chạm nhẹ vào liên kết
    document.addEventListener('pointerover', (e) => {
      const a = e.target.closest('a[href]');
      if (a && a.href && a.origin === location.origin) prefetchUrl(a.href);
    }, { passive: true });

    document.addEventListener('touchstart', (e) => {
      const a = e.target.closest('a[href]');
      if (a && a.href && a.origin === location.origin) prefetchUrl(a.href);
    }, { passive: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
