(function () {
  'use strict';

  // Quản lý theme sáng/tối đồng bộ với toàn bộ Skill AI
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

  // Toast notification
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

  // Sao chép code
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

  // Tìm kiếm trong trang Hub Guide (nếu có ô tìm kiếm #hubSearch)
  const hubSearch = document.getElementById('hubSearch');
  if (hubSearch) {
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
        card.style.display = match ? '' : 'none';
        if (match) totalVisible++;
      });

      groupSections.forEach((section) => {
        const visibleInGroup = section.querySelectorAll('.guide-card:not([style*="display: none"])').length;
        section.style.display = visibleInGroup > 0 ? '' : 'none';
      });

      if (emptyNotice) {
        emptyNotice.style.display = totalVisible === 0 ? 'block' : 'none';
      }
    });
  }
})();
