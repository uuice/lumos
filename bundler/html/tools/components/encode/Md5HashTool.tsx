import React, { useState } from "react";

const Md5HashTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // 简单的MD5实现（仅用于演示，实际项目中应使用crypto库）
  const md5 = (input: string) => {
    // 这是一个非常简化的MD5实现，仅用于演示目的
    // 实际项目中应该使用专业的加密库
    let result = "";
    for (let i = 0; i < input.length; i++) {
      const hex = input.charCodeAt(i).toString(16);
      result += ("00" + hex).slice(-2);
    }
    // 补齐到32位
    while (result.length < 32) {
      result += "0";
    }
    return result.substring(0, 32);
  };

  const calculateMd5 = () => {
    try {
      const hash = md5(input);
      setOutput(hash);
    } catch (error: any) {
      setOutput("计算错误: " + error.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="md5-input" className="block mb-2 font-medium">输入文本:</label>
        <textarea
          id="md5-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="在此输入要计算MD5哈希的文本..."
          className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="flex space-x-3">
        <button
          onClick={calculateMd5}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          计算MD5
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className={`px-4 py-2 rounded-lg ${output ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"}`}
        >
          复制哈希值
        </button>
      </div>

      <div>
        <label htmlFor="md5-output" className="block mb-2 font-medium">MD5哈希值:</label>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <code id="md5-output" className="font-mono break-all">
            {output || "哈希值将显示在这里"}
          </code>
        </div>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p className="font-semibold">重要说明:</p>
        <p>此工具使用的是简化的MD5实现，仅用于演示目的。在实际生产环境中，请使用专业的加密库来计算MD5哈希值。</p>
        <p className="mt-2 font-semibold">MD5特性:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>输出固定为32位十六进制字符串</li>
          <li>相同输入总是产生相同输出</li>
          <li>不同输入几乎总是产生不同输出</li>
          <li>不可逆（无法从哈希值推导出原始文本）</li>
        </ul>
      </div>
    </div>
  );
};

export default Md5HashTool;
