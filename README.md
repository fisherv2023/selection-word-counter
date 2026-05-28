# 选中计字 / Selection Word Counter

选中网页文字后自动弹出字数统计。  
Show character/word count instantly when selecting text on any webpage.

适用于内容创作者、翻译、编辑等需要频繁核对字数的场景。  
For content creators, translators, editors who need quick character counts.

## 安装 / Installation

1. 下载本仓库（Code → Download ZIP，解压）
2. Chrome 地址栏输入 `chrome://extensions`，打开右上角 **开发者模式**
3. 点击 **加载已解压的扩展程序** → 选择解压后的文件夹
4. 刷新页面后，选中任意文字即可

Or download ZIP from GitHub, extract, go to `chrome://extensions` → Developer mode → Load unpacked.

## 语言切换 / Language

右击 Chrome 右上角扩展栏的选中计字图标 → **选项** → 选择 中文 / English。  
Right-click the extension icon in Chrome toolbar → **Options** → Choose language.

刷新页面后生效。Reload the page after changing.

## 功能 / Features

- 自动识别中英文 / Auto-detect Chinese and English
- 中文字数统计 / Chinese character count
- 英文单词数统计 / Word count
- 标点符号数统计 / Punctuation count
- 总计（中文 + 英文词 + 标点）/ Total (Chinese + words + punctuation)
- 浅色弹窗，点击任意位置关闭 / Light popup, click anywhere to dismiss

## 文件结构 / File Structure

```
selection-word-counter/
├── manifest.json     # 扩展配置
├── content.js        # 核心逻辑
├── options.html      # 设置页面
├── options.js        # 设置逻辑
├── icon16.png        # 图标
├── icon48.png
├── icon128.png
└── README.md
```
