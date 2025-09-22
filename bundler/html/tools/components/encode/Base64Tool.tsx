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
    <div className="space-y-4">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setMode("encode")}
          className={`px-4 py-2 rounded-lg ${mode === "encode" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
        >
          编码
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-4 py-2 rounded-lg ${mode === "decode" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
        >
          解码
        </button>
      </div>

      <div>
        <label htmlFor="base64-input" className="block mb-2 font-medium">
          {mode === "encode" ? "原文本:" : "Base64文本:"}
        </label>
        <textarea
          id="base64-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "encode" ? "输入要编码的文本..." : "输入要解码的Base64文本..."}
          className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="flex space-x-3">
        <button
          onClick={handleConvert}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          转换
        </button>
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          复制结果
        </button>
      </div>

      <div>
        <label htmlFor="base64-output" className="block mb-2 font-medium">
          {mode === "encode" ? "Base64编码结果:" : "解码结果:"}
        </label>
        <textarea
          id="base64-output"
          value={output}
          readOnly
          placeholder="转换结果将显示在这里"
          className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        />
      </div>
    </div>
  );
};

export default Base64Tool;
