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
    <div className="space-y-4">
      <div>
        <label htmlFor="html-input" className="block mb-2 font-medium">HTML文本:</label>
        <textarea
          id="html-input"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="在此输入HTML文本..."
          className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={convertHtmlToText}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          提取纯文本
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!text}
          className={`px-4 py-2 rounded-lg ${text ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"}`}
        >
          复制文本
        </button>
        <button
          onClick={clearText}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          清空
        </button>
      </div>

      <div>
        <label htmlFor="text-output" className="block mb-2 font-medium">纯文本结果:</label>
        <textarea
          id="text-output"
          value={text}
          readOnly
          placeholder="提取的纯文本将显示在这里"
          className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono"
        />
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p className="font-semibold">功能说明:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>移除所有HTML标签，只保留文本内容</li>
          <li>保留文本的换行和空格结构</li>
          <li>支持处理复杂的HTML结构</li>
        </ul>
      </div>
    </div>
  );
};

export default HtmlToTextTool;
