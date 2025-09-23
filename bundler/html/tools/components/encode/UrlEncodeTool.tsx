import React, { useState } from "react";

const UrlEncodeTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode"); // encode or decode

  const handleConvert = () => {
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (error: any) {
      setOutput("错误: " + error.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const swapInputOutput = () => {
    const temp = input;
    setInput(output);
    setOutput(temp);
  };

  return (
    <div className="space-y-6 p-1">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">URL 编码/解码</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          在URL编码和原始文本之间进行转换
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setMode("encode")}
            className={`px-5 py-2.5 rounded-lg transition-all duration-200 ${
              mode === "encode"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            }`}
          >
            编码
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`px-5 py-2.5 rounded-lg transition-all duration-200 ${
              mode === "decode"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            }`}
          >
            解码
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === "encode" ? "原始文本:" : "URL编码文本:"}
          </label>
          <textarea
            id="url-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "输入要编码的文本..." : "输入要解码的URL编码文本..."}
            className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
            disabled={!output}
            className={`px-5 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 ${
              output
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transform hover:-translate-y-0.5"
                : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300"
            }`}
          >
            复制结果
          </button>
          <button
            onClick={swapInputOutput}
            disabled={!output}
            className={`px-5 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 ${
              output
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transform hover:-translate-y-0.5"
                : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300"
            }`}
          >
            交换
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="url-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === "encode" ? "URL编码结果:" : "解码结果:"}
          </label>
          <textarea
            id="url-output"
            value={output}
            readOnly
            placeholder="转换结果将显示在这里"
            className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white transition-all duration-200"
          />
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">功能说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>编码模式: 将特殊字符转换为URL安全的编码格式</li>
            <li>解码模式: 将URL编码的文本还原为原始文本</li>
            <li>交换按钮: 快速交换输入和输出内容</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UrlEncodeTool;
