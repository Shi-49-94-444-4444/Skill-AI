(function () {
  'use strict';

  // 1. Toast bridge for backward compatibility
  window.showGuideToast = function(msg) {
    if (window.SkillAI?.clipboard?.toast) window.SkillAI.clipboard.toast(msg);
  };

  // 2. Global Code Copy delegation (.copy-btn, [data-copy-target])
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
    if (window.SkillAI?.clipboard?.copy) {
      await window.SkillAI.clipboard.copy(text.trim(), 'Đã sao chép lệnh/mã vào clipboard.');
    }
  });

  // 3. Guide Hub Search (#hubSearch)
  function initHubSearch() {
    const hubSearch = document.getElementById('hubSearch');
    if (!hubSearch || hubSearch.dataset.bound) return;
    hubSearch.dataset.bound = 'true';
    const cards = document.querySelectorAll('.guide-card');
    const groupSections = document.querySelectorAll('.group-section');
    const emptyNotice = document.getElementById('hubEmpty');
    const normalize = window.SkillAI?.text?.normalize || ((v) => String(v || '').toLowerCase());

    hubSearch.addEventListener('input', () => {
      const q = normalize(hubSearch.value);
      let totalVisible = 0;
      cards.forEach((card) => {
        const text = normalize(card.textContent || '');
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
    window.SkillAI?.ui?.initImageFallbacks?.();
    window.SkillAI?.ui?.initLightbox?.();
    window.SkillAI?.ambient?.init?.();
    initHubSearch();
  }

  window.reinitGuideDynamicFeatures = reinitDynamicFeatures;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reinitDynamicFeatures);
  } else {
    reinitDynamicFeatures();
  }
})();
