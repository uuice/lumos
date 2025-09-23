import React, { useState } from "react";

const JsonFormatterTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("beautify"); // beautify or minify

  const handleConvert = () => {
    try {
      if (mode === "beautify") {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed, null, 2));
      } else {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed));
      }
    } catch (error: any) {
      setOutput("JSON格式错误: " + error.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-6 p-1">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">JSON 格式化工具</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          美化或压缩JSON格式文本
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setMode("beautify")}
            className={`px-5 py-2.5 rounded-lg transition-all duration-200 ${
              mode === "beautify"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            }`}
          >
            美化
          </button>
          <button
            onClick={() => setMode("minify")}
            className={`px-5 py-2.5 rounded-lg transition-all duration-200 ${
              mode === "minify"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            }`}
          >
            压缩
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            JSON文本
          </label>
          <textarea
            id="json-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入JSON文本..."
            className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleConvert}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            转换
          </button>
          <button
            onClick={copyToClipboard}
            className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            复制结果
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="json-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            结果
          </label>
          <textarea
            id="json-output"
            value={output}
            readOnly
            placeholder="转换结果将显示在这里"
            className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono transition-all duration-200"
          />
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>美化模式: 格式化JSON文本，添加缩进和换行，便于阅读</li>
            <li>压缩模式: 移除JSON文本中的空格和换行，减小文件大小</li>
            <li>自动检测JSON格式错误并提示</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JsonFormatterTool;
