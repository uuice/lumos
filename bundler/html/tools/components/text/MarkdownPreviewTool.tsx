import React, { useState } from 'react';
import * as marked from 'marked';

const MarkdownPreviewTool = () => {
  const [markdownText, setMarkdownText] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');

  // 实时预览
  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setMarkdownText(text);
    setPreviewHtml(marked.marked(text));
  };

  // 清空内容
  const clearContent = () => {
    setMarkdownText('');
    setPreviewHtml('');
  };

  // 复制HTML
  const copyHtml = () => {
    navigator.clipboard.writeText(previewHtml);
  };

  // 下载HTML文件
  const downloadHtml = () => {
    const blob = new Blob([`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Markdown Preview</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
    code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
    pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
    blockquote { border-left: 4px solid #ddd; padding-left: 15px; color: #666; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f4f4f4; }
  </style>
</head>
<body>
  ${previewHtml}
</body>
</html>`], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown-preview.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Markdown 实时预览</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Markdown 编辑器</label>
              <button
                onClick={clearContent}
                className="text-xs text-red-500 hover:text-red-700"
              >
                清空
              </button>
            </div>
            <textarea
              value={markdownText}
              onChange={handleMarkdownChange}
              placeholder="在此输入 Markdown 内容..."
              className="w-full h-96 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">实时预览</label>
              <div className="space-x-2">
                <button
                  onClick={copyHtml}
                  className="text-xs text-blue-500 hover:text-blue-700"
                >
                  复制HTML
                </button>
                <button
                  onClick={downloadHtml}
                  className="text-xs text-green-500 hover:text-green-700"
                >
                  下载HTML
                </button>
              </div>
            </div>
            <div
              className="w-full h-96 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md overflow-auto bg-white dark:bg-gray-900"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p>支持标准 Markdown 语法：</p>
          <ul className="list-disc list-inside mt-1">
            <li><code># 标题</code> - 1-6级标题</li>
            <li><code>**粗体**</code> 和 <code>*斜体*</code></li>
            <li><code>- 列表</code> 和 <code>1. 编号列表</code></li>
            <li><code>[链接](url)</code> 和 <code>![图片](url)</code></li>
            <li><code>`代码`</code> 和 <code>```代码块```</code></li>
            <li><code>&gt; 引用</code></li>
            <li><code>---</code> - 分割线</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MarkdownPreviewTool;
