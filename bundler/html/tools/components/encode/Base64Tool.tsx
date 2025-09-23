import React, { useState } from "react";

const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode"); // encode or decode

  const handleConvert = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (error: any) {
      setOutput("错误: " + error.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-5 p-1">
      <div className="flex space-x-3 mb-5">
        <button
          onClick={() => setMode("encode")}
          className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
            mode === "encode"
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          编码
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
            mode === "decode"
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          解码
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="base64-input" className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
            {mode === "encode" ? "原文本:" : "Base64文本:"}
          </label>
          <textarea
            id="base64-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "输入要编码的文本..." : "输入要解码的Base64文本..."}
            className="w-full h-36 p-4 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-800 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
          />
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleConvert}
            className="px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            转换
          </button>
          <button
            onClick={copyToClipboard}
            className="px-5 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            复制结果
          </button>
        </div>

        <div>
          <label htmlFor="base64-output" className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
            {mode === "encode" ? "Base64编码结果:" : "解码结果:"}
          </label>
          <textarea
            id="base64-output"
            value={output}
            readOnly
            placeholder="转换结果将显示在这里"
            className="w-full h-36 p-4 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-800 dark:text-white shadow-sm resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Base64Tool;
