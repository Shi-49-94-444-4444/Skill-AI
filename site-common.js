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
        const targetEl = e.target.closest('.ui-shot-box img, .ui-shot-img, [data-lightbox], .hero-showcase-img, .hero-showcase-card');
        if (!targetEl || targetEl.id === 'lightboxImg') return;
        const img = targetEl.tagName === 'IMG' ? targetEl : targetEl.querySelector('img');
        if (!img) return;
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

  // 5. Spiritual Ambient Atmosphere & Interactive Motion (ui-ux-pro-max)
  const ambientUtils = (() => {
    function init() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      initCosmicCanvas();
      initSpotlight();
      initTilt();
      initMagnetic();
      initCopyFeedback();
    }

    function initCosmicCanvas() {
      const shell = document.querySelector('.page-shell');
      if (!shell || shell.querySelector('.cosmic-canvas')) return;

      const canvas = document.createElement('canvas');
      canvas.className = 'cosmic-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      shell.insertBefore(canvas, shell.firstChild);

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = 0;
      let height = 0;
      let animId = null;
      let mouseX = -1000;
      let mouseY = -1000;

      const particles = [];
      const PARTICLE_COUNT = 26;

      function resize() {
        const rect = shell.getBoundingClientRect();
        width = canvas.width = rect.width;
        height = canvas.height = Math.max(rect.height, window.innerHeight);
      }

      const draculaColors = ['#bd93f9', '#8be9fd', '#50fa7b', '#ff79c6', '#f1fa8c'];
      function createParticle() {
        const isDark = document.documentElement.dataset.theme === 'dark';
        const color = isDark
          ? draculaColors[Math.floor(Math.random() * draculaColors.length)]
          : 'rgba(71, 85, 105, 0.4)';
        return {
          x: Math.random() * (width || window.innerWidth),
          y: Math.random() * (height || window.innerHeight),
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.5 + 1.2,
          color,
          alpha: Math.random() * 0.35 + 0.15
        };
      }

      function initParticles() {
        particles.length = 0;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          particles.push(createParticle());
        }
      }

      function updateAndDraw() {
        if (document.hidden) {
          animId = null;
          return;
        }

        ctx.clearRect(0, 0, width, height);
        const isDark = document.documentElement.dataset.theme === 'dark';

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          else if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          else if (p.y > height) p.y = 0;

          // Mouse gentle repel
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90 && dist > 0) {
            p.x += (dx / dist) * 1.2;
            p.y += (dy / dist) * 1.2;
          }

          // Draw particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? p.color : 'rgba(71, 85, 105, 0.35)';
          ctx.globalAlpha = p.alpha;
          ctx.fill();

          // Connect with nearby particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const pDist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (pDist < 80) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = isDark ? p.color : 'rgba(100, 116, 139, 0.15)';
              ctx.globalAlpha = (1 - pDist / 80) * 0.18;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1;

        animId = requestAnimationFrame(updateAndDraw);
      }

      resize();
      initParticles();
      animId = requestAnimationFrame(updateAndDraw);

      window.addEventListener('resize', () => {
        resize();
      }, { passive: true });

      shell.addEventListener('pointermove', (e) => {
        const rect = shell.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      }, { passive: true });

      shell.addEventListener('pointerleave', () => {
        mouseX = -1000;
        mouseY = -1000;
      });

      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && !animId) {
          animId = requestAnimationFrame(updateAndDraw);
        }
      });
    }

    function initSpotlight() {
      if (window.matchMedia('(pointer: coarse)').matches) return; // Touch devices use touch ripple

      let frame = null;
      let targetCard = null;
      let clientX = 0;
      let clientY = 0;

      function update() {
        if (targetCard) {
          const rect = targetCard.getBoundingClientRect();
          const x = clientX - rect.left;
          const y = clientY - rect.top;
          targetCard.style.setProperty('--mouse-x', `${x.toFixed(1)}px`);
          targetCard.style.setProperty('--mouse-y', `${y.toFixed(1)}px`);
        }
        frame = null;
      }

      document.addEventListener('pointermove', (e) => {
        if (document.hidden) return;
        const card = e.target.closest('.guide-card, .prompt-item, .glance-item, .quick-glance-card > div, .ui-shot-box, .result-row, .hero-showcase-card');
        if (!card) {
          targetCard = null;
          return;
        }
        targetCard = card;
        clientX = e.clientX;
        clientY = e.clientY;
        if (!frame) frame = requestAnimationFrame(update);
      }, { passive: true });

      // Clean up when tab becomes hidden
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && frame) {
          cancelAnimationFrame(frame);
          frame = null;
          targetCard = null;
        }
      });
    }

    function initTilt() {
      if (window.matchMedia('(pointer: coarse)').matches) return;

      let tiltFrame = null;
      let activeCard = null;
      let mouseEvt = null;

      function applyTilt() {
        if (activeCard && mouseEvt) {
          const rect = activeCard.getBoundingClientRect();
          const x = (mouseEvt.clientX - rect.left) / rect.width - 0.5;
          const y = (mouseEvt.clientY - rect.top) / rect.height - 0.5;
          const tiltX = -(y * 5).toFixed(2); // clamp to max 2.5 deg
          const tiltY = (x * 5).toFixed(2);
          activeCard.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-3px)`;
        }
        tiltFrame = null;
      }

      document.addEventListener('pointermove', (e) => {
        if (document.hidden) return;
        const card = e.target.closest('.hero-showcase-card, .guide-card, .prompt-item, .glance-item, .quick-glance-card > div');
        if (!card) {
          if (activeCard) {
            activeCard.style.transform = '';
            activeCard = null;
          }
          return;
        }
        if (activeCard && activeCard !== card) {
          activeCard.style.transform = '';
        }
        activeCard = card;
        mouseEvt = e;
        if (!tiltFrame) tiltFrame = requestAnimationFrame(applyTilt);
      }, { passive: true });

      document.addEventListener('pointerleave', () => {
        if (activeCard) {
          activeCard.style.transform = '';
          activeCard = null;
        }
      });
    }

    function initMagnetic() {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      document.addEventListener('pointermove', (e) => {
        if (document.hidden) return;
        const target = e.target.closest('.theme-toggle, .brand-mark, .hero-zoom-hint, .guide-ref-pill');
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        const pullX = Math.max(-5, Math.min(5, x * 0.22)).toFixed(1);
        const pullY = Math.max(-5, Math.min(5, y * 0.22)).toFixed(1);
        target.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
      }, { passive: true });

      document.addEventListener('pointerout', (e) => {
        const target = e.target.closest('.theme-toggle, .brand-mark, .hero-zoom-hint, .guide-ref-pill');
        if (target) {
          target.style.transform = '';
        }
      });
    }

    function initCopyFeedback() {
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('.copy-skill, .copy-prompt, .copy-btn, [data-copy-skill]');
        if (!btn) return;
        btn.classList.add('is-copied');
        setTimeout(() => btn.classList.remove('is-copied'), 1200);
      });
    }

    return Object.freeze({ init, initCosmicCanvas, initSpotlight, initTilt, initMagnetic });
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
