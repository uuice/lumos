import React, { useState } from "react";

const CaseConverterTool = () => {
  const [text, setText] = useState("");

  const convertTo = (type: string) => {
    switch (type) {
      case "upper":
        return text.toUpperCase();
      case "lower":
        return text.toLowerCase();
      case "title":
        return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
      case "sentence":
        return text.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
      default:
        return text;
    }
  };

  return (
    <div className="space-y-6 p-1">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">文本大小写转换器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          将文本转换为不同的大小写格式
        </p>

        <div className="mb-6">
          <label htmlFor="textInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            输入文本
          </label>
          <textarea
            id="textInput"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="在此输入文本..."
            className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <button
            onClick={() => navigator.clipboard.writeText(convertTo("upper"))}
            className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            大写
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(convertTo("lower"))}
            className="px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            小写
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(convertTo("title"))}
            className="px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            标题
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(convertTo("sentence"))}
            className="px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            句子
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">转换结果</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">大写格式</div>
              <div className="p-3 bg-white dark:bg-gray-600/50 rounded min-h-[60px] break-words">
                {convertTo("upper") || "转换结果将显示在这里"}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(convertTo("upper"))}
                className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                复制
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">小写格式</div>
              <div className="p-3 bg-white dark:bg-gray-600/50 rounded min-h-[60px] break-words">
                {convertTo("lower") || "转换结果将显示在这里"}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(convertTo("lower"))}
                className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                复制
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">标题格式</div>
              <div className="p-3 bg-white dark:bg-gray-600/50 rounded min-h-[60px] break-words">
                {convertTo("title") || "转换结果将显示在这里"}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(convertTo("title"))}
                className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                复制
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">句子格式</div>
              <div className="p-3 bg-white dark:bg-gray-600/50 rounded min-h-[60px] break-words">
                {convertTo("sentence") || "转换结果将显示在这里"}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(convertTo("sentence"))}
                className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                复制
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>在输入框中输入需要转换的文本</li>
            <li>点击不同的按钮将文本转换为相应的格式</li>
            <li>每种格式都提供单独的复制按钮</li>
            <li>支持中文和英文文本的大小写转换</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CaseConverterTool;
