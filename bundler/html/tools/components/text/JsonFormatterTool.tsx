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
    <div className="space-y-4">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setMode("beautify")}
          className={`px-4 py-2 rounded-lg ${mode === "beautify" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
        >
          美化
        </button>
        <button
          onClick={() => setMode("minify")}
          className={`px-4 py-2 rounded-lg ${mode === "minify" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
        >
          压缩
        </button>
      </div>

      <div>
        <label htmlFor="json-input" className="block mb-2 font-medium">JSON文本:</label>
        <textarea
          id="json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入JSON文本..."
          className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono"
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
        <label htmlFor="json-output" className="block mb-2 font-medium">结果:</label>
        <textarea
          id="json-output"
          value={output}
          readOnly
          placeholder="转换结果将显示在这里"
          className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono"
        />
      </div>
    </div>
  );
};

export default JsonFormatterTool;
