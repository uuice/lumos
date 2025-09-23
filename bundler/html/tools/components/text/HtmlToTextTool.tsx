import React, { useState } from "react";

const HtmlToTextTool = () => {
  const [html, setHtml] = useState("");
  const [text, setText] = useState("");

  const convertHtmlToText = () => {
    // 创建一个临时的div元素来解析HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // 提取纯文本内容
    const extractedText = tempDiv.textContent || tempDiv.innerText || "";
    setText(extractedText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  const clearText = () => {
    setHtml("");
    setText("");
  };

  return (
    <div className="space-y-6 p-1">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">HTML 转 纯文本</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          从HTML代码中提取纯文本内容
        </p>

        <div className="mb-6">
          <label htmlFor="html-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            HTML文本
          </label>
          <textarea
            id="html-input"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="在此输入HTML文本..."
            className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={convertHtmlToText}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            提取纯文本
          </button>
          <button
            onClick={copyToClipboard}
            disabled={!text}
            className={`px-5 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 ${
              text
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transform hover:-translate-y-0.5"
                : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300"
            }`}
          >
            复制文本
          </button>
          <button
            onClick={clearText}
            className="px-5 py-2.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            清空
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="text-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            纯文本结果
          </label>
          <textarea
            id="text-output"
            value={text}
            readOnly
            placeholder="提取的纯文本将显示在这里"
            className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono transition-all duration-200"
          />
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">功能说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>移除所有HTML标签，只保留文本内容</li>
            <li>保留文本的换行和空格结构</li>
            <li>支持处理复杂的HTML结构</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HtmlToTextTool;
