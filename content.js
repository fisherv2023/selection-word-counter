// == 选中计字 - Selection Word Counter ==
(function() {
  'use strict';

  // 创建弹出框
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
    min-width: 160px;
  `;
  document.body.appendChild(popup);

  // 统计函数
  function count(text) {
    const raw = text;
    // 总字符数（不含空格）
    const totalNoSpace = raw.replace(/\s/g, '').length;

    // 中文字符
    const chinese = (raw.match(/[\u4e00-\u9fff]/g) || []).length;

    // 英文字母 + 数字
    const engLetters = (raw.match(/[a-zA-Z]/g) || []).length;
    const digits = (raw.match(/[0-9]/g) || []).length;

    // 英文单词（由字母组成的连续片段）
    const engWords = (raw.match(/[a-zA-Z]+/g) || []).length;

    // 标点符号：不是中文、不是英文字母、不是数字、不是空格
    const punct = raw.replace(/[\u4e00-\u9fff]/g, '')
                     .replace(/[a-zA-Z]/g, '')
                     .replace(/[0-9]/g, '')
                     .replace(/\s/g, '').length;

    // 判断主要语言
    const lang = chinese > engLetters ? '中文为主' : (engLetters > 0 ? '英文为主' : '混合');

    // 生成内容行
    const lines = [];

    // 动态排列：哪种语言多就哪种排前面
    if (chinese > 0 || engLetters > 0) {
      if (chinese >= engLetters) {
        if (chinese > 0) lines.push(`<div><span style="color:#888;">中文</span> ${chinese}</div>`);
        if (engWords > 0) lines.push(`<div><span style="color:#888;">英文词</span> ${engWords}</div>`);
      } else {
        if (engWords > 0) lines.push(`<div><span style="color:#888;">英文词</span> ${engWords}</div>`);
        if (chinese > 0) lines.push(`<div><span style="color:#888;">中文</span> ${chinese}</div>`);
      }
    }
    if (punct > 0) lines.push(`<div><span style="color:#888;">标点</span> ${punct}</div>`);
    lines.push(`<hr style="margin:4px 0;border:none;border-top:1px solid #eee;">`);
    lines.push(`<div><span style="color:#888;">总计</span> ${totalNoSpace}</div>`);

    return lines.join('\n');
  }

  // 鼠标弹起：选中后显示
  document.addEventListener('mouseup', function(e) {
    // 延迟一小下，等 selection 稳定
    setTimeout(() => {
      const sel = window.getSelection().toString().trim();
      if (!sel) { popup.style.display = 'none'; return; }

      popup.innerHTML = count(sel);

      // 定位：鼠标下方，不超出右边
      let left = e.clientX + 8;
      let top = e.clientY + 12;
      if (left + 200 > window.innerWidth) left = window.innerWidth - 210;
      if (top + 120 > window.innerHeight) top = e.clientY - 100;

      popup.style.left = left + 'px';
      popup.style.top = top + 'px';
      popup.style.display = 'block';
    }, 10);
  });

  // 点击其他地方消失
  document.addEventListener('mousedown', function(e) {
    if (e.target !== popup && !popup.contains(e.target)) {
      popup.style.display = 'none';
    }
  });
})();
