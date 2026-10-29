(function () {
  'use strict';

  // 1. Quản lý theme sáng/tối đồng bộ với toàn bộ Skill AI
  const themeToggle = document.getElementById('themeToggle');
  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    if (themeToggle) {
      themeToggle.classList.toggle('is-dark', isDark);
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
    }
    try { localStorage.setItem('skill-ai-theme', isDark ? 'dark' : 'light'); } catch (e) {}
  }

  let savedTheme = 'light';
  try { savedTheme = localStorage.getItem('skill-ai-theme') || 'light'; } catch (e) {}
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // 2. Toast notification
  let toastTimer;
  function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
  }
  window.showGuideToast = showToast;

  // 3. Sao chép code
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.copy-btn, [data-copy-target]');
    if (!btn) return;
    
    let text = '';
    const targetId = btn.dataset.copyTarget;
    if (targetId) {
      const el = document.getElementById(targetId);
      text = el ? el.textContent : '';
    } else {
      const codeBlock = btn.closest('.code-block');
      if (codeBlock) {
        const codeEl = codeBlock.querySelector('pre code') || codeBlock.querySelector('pre');
        text = codeEl ? codeEl.textContent : '';
      }
    }

    if (!text.trim()) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text.trim());
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text.trim();
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      showToast('Đã sao chép lệnh/mã vào clipboard.');
    } catch (err) {
      showToast('Không thể sao chép tự động. Vui lòng chọn và sao chép thủ công.');
    }
  });

  // 4. Interactive Tabs Switcher
  document.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('.tab-btn');
    if (!tabBtn) return;
    const tabContainer = tabBtn.closest('.guide-tabs');
    if (!tabContainer) return;

    const targetId = tabBtn.dataset.tab;
    if (!targetId) return;

    tabContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    tabContainer.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

    tabBtn.classList.add('active');
    const panel = tabContainer.querySelector(`#${targetId}`);
    if (panel) panel.classList.add('active');
  });

  // 5. Image Lightbox Modal for Hi-res Screenshots & Diagrams
  let lightbox = document.getElementById('guideLightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'guideLightbox';
    lightbox.className = 'lightbox-modal';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-label', 'Xem ảnh phóng to');
    lightbox.innerHTML = '<img id="lightboxImg" src="" alt="Xem ảnh chi tiết">';
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('is-active');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
        lightbox.classList.remove('is-active');
      }
    });
  }

  document.addEventListener('click', (e) => {
    const img = e.target.closest('.ui-shot-box img, .ui-shot-img');
    if (!img) return;
    const fullImg = document.getElementById('lightboxImg');
    if (fullImg) {
      fullImg.src = img.src;
      fullImg.alt = img.alt || 'Ảnh phóng to';
      lightbox.classList.add('is-active');
    }
  });

  // 6. Xử lý fallback khi ảnh tải lỗi & tái khởi tạo động
  function initMediaFallbacks() {
    document.querySelectorAll('.ui-shot-box img').forEach(img => {
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
          fallback.innerHTML = `<span>⚠️ Không thể tải trước hình ảnh. Vui lòng tham khảo trực tiếp mã nguồn.</span>`;
          box.insertBefore(fallback, box.querySelector('.ui-shot-caption'));
        }
      };
    });
  }

  // 7. Tìm kiếm trong trang Hub Guide (nếu có ô tìm kiếm #hubSearch)
  function initHubSearch() {
    const hubSearch = document.getElementById('hubSearch');
    if (!hubSearch || hubSearch.dataset.bound) return;
    hubSearch.dataset.bound = 'true';
    const cards = document.querySelectorAll('.guide-card');
    const groupSections = document.querySelectorAll('.group-section');
    const emptyNotice = document.getElementById('hubEmpty');

    hubSearch.addEventListener('input', () => {
      const q = hubSearch.value.trim().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd');
      
      let totalVisible = 0;
      cards.forEach((card) => {
        const text = (card.textContent || '').toLowerCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd');
        const match = !q || text.includes(q);
        card.style.display = match ? 'flex' : 'none';
        if (match) totalVisible++;
      });

      groupSections.forEach((sec) => {
        const visibleInGroup = sec.querySelectorAll('.guide-card[style*="display: flex"]').length;
        sec.style.display = (!q || visibleInGroup > 0) ? 'block' : 'none';
      });

      if (emptyNotice) {
        emptyNotice.style.display = (totalVisible === 0 && q) ? 'block' : 'none';
      }
    });
  }

  function reinitDynamicFeatures() {
    initMediaFallbacks();
    initHubSearch();
  }

  window.reinitGuideDynamicFeatures = reinitDynamicFeatures;
  reinitDynamicFeatures();
})();
