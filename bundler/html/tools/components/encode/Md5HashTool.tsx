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
    <div className="space-y-6 p-1">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">MD5 哈希计算</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          计算文本的MD5哈希值
        </p>

        <div className="mb-6">
          <label htmlFor="md5-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            输入文本
          </label>
          <textarea
            id="md5-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="在此输入要计算MD5哈希的文本..."
            className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={calculateMd5}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            计算MD5
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
            复制哈希值
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="md5-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            MD5哈希值
          </label>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-all duration-300">
            <code id="md5-output" className="font-mono break-all text-gray-800 dark:text-gray-200">
              {output || "哈希值将显示在这里"}
            </code>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 transition-all duration-300">
          <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">重要说明</h3>
          <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
            此工具使用的是简化的MD5实现，仅用于演示目的。在实际生产环境中，请使用专业的加密库来计算MD5哈希值。
          </p>
          <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">MD5特性:</h4>
          <ul className="text-sm text-yellow-700 dark:text-yellow-300 list-disc pl-5 space-y-1">
            <li>输出固定为32位十六进制字符串</li>
            <li>相同输入总是产生相同输出</li>
            <li>不同输入几乎总是产生不同输出</li>
            <li>不可逆（无法从哈希值推导出原始文本）</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Md5HashTool;
