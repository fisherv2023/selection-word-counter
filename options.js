const sel = document.getElementById('lang');
const saved = document.getElementById('saved');

// 读取当前设置
chrome.storage.sync.get('lang', function(data) {
  sel.value = data.lang || 'zh';
});

// 保存
sel.addEventListener('change', function() {
  chrome.storage.sync.set({ lang: sel.value }, function() {
    saved.style.display = 'block';
    setTimeout(() => saved.style.display = 'none', 2000);
  });
});
