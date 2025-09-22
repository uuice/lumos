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
        <label htmlFor="url-input" className="block mb-2 font-medium">
          {mode === "encode" ? "原始文本:" : "URL编码文本:"}
        </label>
        <textarea
          id="url-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "encode" ? "输入要编码的文本..." : "输入要解码的URL编码文本..."}
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
          disabled={!output}
          className={`px-4 py-2 rounded-lg ${output ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"}`}
        >
          复制结果
        </button>
        <button
          onClick={swapInputOutput}
          disabled={!output}
          className={`px-4 py-2 rounded-lg ${output ? "bg-purple-500 hover:bg-purple-600 text-white" : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"}`}
        >
          交换
        </button>
      </div>

      <div>
        <label htmlFor="url-output" className="block mb-2 font-medium">
          {mode === "encode" ? "URL编码结果:" : "解码结果:"}
        </label>
        <textarea
          id="url-output"
          value={output}
          readOnly
          placeholder="转换结果将显示在这里"
          className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p className="font-semibold">功能说明:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>编码模式: 将特殊字符转换为URL安全的编码格式</li>
          <li>解码模式: 将URL编码的文本还原为原始文本</li>
          <li>交换按钮: 快速交换输入和输出内容</li>
        </ul>
      </div>
    </div>
  );
};

export default UrlEncodeTool;
