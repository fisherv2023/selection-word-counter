// == 选中计字 - Selection Word Counter ==
(function() {
  'use strict';

  const L = {
    zh: { cn:'中文', en:'英文', punct:'标点', total:'总计' },
    en: { cn:'Chinese', en:'English', punct:'Punctuation', total:'Total' }
  };

  let lang = 'zh';
  chrome.storage.sync.get('lang', data => { lang = data.lang || (navigator.language.startsWith('en') ? 'en' : 'zh'); });

  const popup = document.createElement('div');
  popup.id = '_wc_popup';
  popup.style.cssText = `
    position: fixed; z-index: 2147483647;
    background: #ffffff; color: #333;
    padding: 10px 14px;
    border-radius: 8px;
    font: 13px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    box-shadow: 0 2px 12px rgba(0,0,0,0.12);
    border: 1px solid #e8e8e8;
    pointer-events: none; display: none;
    min-width: 140px;
  `;
  document.body.appendChild(popup);

  function count(text) {
    const raw = text;
    const chinese = (raw.match(/[\u4e00-\u9fff]/g) || []).length;
    const engLetters = (raw.match(/[a-zA-Z]/g) || []).length;
    const engWords = (raw.match(/[a-zA-Z]+/g) || []).length;
    const punct = raw.replace(/[\u4e00-\u9fff]/g,'').replace(/[a-zA-Z]/g,'').replace(/[0-9]/g,'').replace(/\s/g,'').length;
    const total = chinese + engWords + punct;
    const t = (chinese >= engLetters) ? L[lang] : L.en;
    
    const lines = [];
    if (chinese > 0) lines.push(`<div><span style="color:#888;">${t.cn}</span> ${chinese}</div>`);
    if (engWords > 0) lines.push(`<div><span style="color:#888;">${t.en}</span> ${engWords}</div>`);
    if (punct > 0) lines.push(`<div><span style="color:#888;">${t.punct}</span> ${punct}</div>`);
    lines.push(`<hr style="margin:4px 0;border:none;border-top:1px solid #eee;">`);
    lines.push(`<div><span style="color:#888;">${t.total}</span> ${total}</div>`);
    return lines.join('\n');
  }

  document.addEventListener('mouseup', function(e) {
    setTimeout(() => {
      const sel = window.getSelection().toString().trim();
      if (!sel) { popup.style.display = 'none'; return; }
      popup.innerHTML = count(sel);
      let left = e.clientX + 8, top = e.clientY + 12;
      if (left + 200 > window.innerWidth) left = window.innerWidth - 210;
      if (top + 120 > window.innerHeight) top = e.clientY - 100;
      popup.style.left = left + 'px'; popup.style.top = top + 'px';
      popup.style.display = 'block';
    }, 10);
  });

  document.addEventListener('mousedown', function(e) {
    if (e.target !== popup && !popup.contains(e.target)) popup.style.display = 'none';
  });
})();
