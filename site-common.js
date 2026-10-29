/**
 * Skill AI — Unified Architecture Core (site-common.js)
 * Cung cấp Single Source of Truth cho:
 * 1. Text normalization & HTML escaping
 * 2. Dracula Theme management & cross-window synchronization
 * 3. Clipboard copy & Toast notifications
 * 4. Image Lightbox & Image Fallbacks
 * 5. Spiritual Ambient Atmosphere with reduced-motion compliance
 */
(function (global) {
  'use strict';

  // 1. Text & Security Utilities
  const textUtils = Object.freeze({
    normalize(value) {
      return String(value ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLocaleLowerCase('vi-VN')
        .replace(/\s+/g, ' ')
        .trim();
    },
    escapeHtml(value) {
      return String(value ?? '').replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[char]));
    }
  });

  // 2. Theme Manager (Dracula Dark / Clean Light)
  const themeManager = (() => {
    const STORAGE_KEY = 'skill-ai-theme';

    function get() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'dark' || saved === 'light') return saved;
      } catch (e) { /* private mode */ }
      return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    }

    function set(theme, syncFrame = true) {
      const isDark = theme === 'dark';
      document.documentElement.dataset.theme = isDark ? 'dark' : 'light';

      // Update all toggle buttons on page
      document.querySelectorAll('.theme-toggle').forEach((btn) => {
        btn.classList.toggle('is-dark', isDark);
        btn.setAttribute('aria-pressed', String(isDark));
        btn.setAttribute('aria-label', isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
        btn.setAttribute('title', isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện Dracula');
      });

      try {
        localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
      } catch (e) { /* private mode */ }

      // Sync with embedded iframe if present
      if (syncFrame) {
        const frame = document.querySelector('#promptPageFrame');
        if (frame && frame.contentWindow && frame.src) {
          try {
            frame.contentWindow.postMessage({ type: 'skill-ai-theme', theme: isDark ? 'dark' : 'light' }, location.origin);
          } catch (e) {}
        }
      }
    }

    function toggle() {
      set(get() === 'dark' ? 'light' : 'dark');
    }

    function init() {
      // Apply saved theme immediately
      set(get(), false);

      // Event delegation for theme toggle clicks
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('.theme-toggle');
        if (btn) {
          e.preventDefault();
          toggle();
        }
      });

      // Synchronize across browser tabs/windows
      window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY && (e.newValue === 'dark' || e.newValue === 'light')) {
          set(e.newValue, false);
        }
      });

      // Listen to postMessage from parent if embedded in iframe
      window.addEventListener('message', (e) => {
        if (e.data && e.data.type === 'skill-ai-theme' && (e.data.theme === 'dark' || e.data.theme === 'light')) {
          set(e.data.theme, false);
        }
      });
    }

    return Object.freeze({ get, set, toggle, init });
  })();

  // 3. Clipboard & Toast Notifications
  const clipboardUtils = (() => {
    let toastTimer = null;

    function toast(message, duration = 2200) {
      let el = document.getElementById('toast');
      if (!el) {
        el = document.createElement('div');
        el.id = 'toast';
        el.className = 'toast';
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        document.body.appendChild(el);
      }
      el.textContent = message;
      el.classList.add('is-visible');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => el.classList.remove('is-visible'), duration);
    }

    async function copy(textToCopy, successMsg = 'Đã sao chép vào bộ nhớ tạm.', failMsg = 'Không thể sao chép tự động. Vui lòng chọn và sao chép thủ công.') {
      const val = String(textToCopy ?? '').trim();
      if (!val) return false;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(val);
        } else {
          const ta = document.createElement('textarea');
          ta.value = val;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          const ok = document.execCommand('copy');
          ta.remove();
          if (!ok) throw new Error('execCommand failed');
        }
        toast(successMsg);
        return true;
      } catch (err) {
        toast(failMsg);
        return false;
      }
    }

    return Object.freeze({ copy, toast });
  })();

  // 4. UI Components (Lightbox, Tabs, Fallbacks)
  const uiUtils = (() => {
    function initLightbox() {
      let modal = document.getElementById('guideLightbox');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'guideLightbox';
        modal.className = 'lightbox-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-label', 'Xem ảnh chi tiết');
        modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:9999;background:rgba(10,10,10,0.88);backdrop-filter:blur(8px);align-items:center;justify-content:center;cursor:zoom-out;';
        modal.innerHTML = '<img id="lightboxImg" src="data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=\'http://www.w3.org/2000/svg\'%20viewBox=\'0%200%201%201\'/%3E" alt="Ảnh phóng to chi tiết" style="max-width:92vw;max-height:90vh;object-fit:contain;border-radius:8px;box-shadow:0 16px 48px rgba(0,0,0,0.5);">';
        document.body.appendChild(modal);

        modal.addEventListener('click', () => {
          modal.classList.remove('is-active');
          modal.style.display = 'none';
        });
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modal.classList.contains('is-active')) {
            modal.classList.remove('is-active');
            modal.style.display = 'none';
          }
        });
      }

      document.addEventListener('click', (e) => {
        const img = e.target.closest('.ui-shot-box img, .ui-shot-img, [data-lightbox]');
        if (!img || img.id === 'lightboxImg') return;
        const target = document.getElementById('lightboxImg');
        if (target) {
          target.src = img.src;
          target.alt = img.alt || 'Ảnh chi tiết';
          modal.classList.add('is-active');
          modal.style.display = 'flex';
        }
      });
    }

    function initTabs() {
      document.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.tab-btn');
        if (!tabBtn) return;
        const container = tabBtn.closest('.guide-tabs');
        if (!container) return;
        const targetId = tabBtn.dataset.tab;
        if (!targetId) return;

        container.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
        container.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));

        tabBtn.classList.add('active');
        const panel = container.querySelector(`#${targetId}`);
        if (panel) panel.classList.add('active');
      });
    }

    function initImageFallbacks() {
      document.querySelectorAll('.ui-shot-box img').forEach((img) => {
        img.onerror = () => {
          const box = img.closest('.ui-shot-box');
          if (box && !box.querySelector('.ui-shot-fallback')) {
            img.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'ui-shot-fallback';
            fallback.style.padding = '32px 20px';
            fallback.style.textAlign = 'center';
            fallback.style.color = 'var(--muted)';
            fallback.style.fontSize = '14px';
            fallback.innerHTML = '<span>⚠️ Không thể tải trước hình ảnh. Vui lòng tham khảo trực tiếp mã nguồn.</span>';
            box.insertBefore(fallback, box.querySelector('.ui-shot-caption'));
          }
        };
      });
    }

    return Object.freeze({ initLightbox, initTabs, initImageFallbacks });
  })();

  // 5. Spiritual Ambient Atmosphere
  const ambientUtils = (() => {
    function init() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const shell = document.querySelector('.page-shell');
      if (!shell || shell.querySelector('.mystic-ambient-layer')) return;

      const layer = document.createElement('div');
      layer.className = 'mystic-ambient-layer';
      layer.setAttribute('aria-hidden', 'true');

      // 12 tinh thể linh quang lững lờ trôi rất nhẹ
      for (let i = 0; i < 12; i++) {
        const mote = document.createElement('span');
        mote.className = 'spiritual-mote';
        const size = Math.floor(Math.random() * 2) + 2; // 2px - 3px
        mote.style.width = `${size}px`;
        mote.style.height = `${size}px`;
        mote.style.left = `${(i * 8.2 + Math.random() * 5).toFixed(1)}%`;
        mote.style.top = `${(Math.random() * 90 + 5).toFixed(1)}%`;
        mote.style.animationDelay = `${(Math.random() * 8).toFixed(1)}s`;
        mote.style.animationDuration = `${(9 + Math.random() * 6).toFixed(1)}s`;
        layer.appendChild(mote);
      }
      shell.insertBefore(layer, shell.firstChild);
    }

    return Object.freeze({ init });
  })();

  // Expose global namespace SkillAI
  global.SkillAI = Object.freeze({
    text: textUtils,
    theme: themeManager,
    clipboard: clipboardUtils,
    ui: uiUtils,
    ambient: ambientUtils
  });

  // Auto-initialize core features when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      themeManager.init();
      uiUtils.initLightbox();
      uiUtils.initTabs();
      uiUtils.initImageFallbacks();
      ambientUtils.init();
    });
  } else {
    themeManager.init();
    uiUtils.initLightbox();
    uiUtils.initTabs();
    uiUtils.initImageFallbacks();
    ambientUtils.init();
  }

})(typeof window !== 'undefined' ? window : this);
