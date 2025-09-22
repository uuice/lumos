import React, { useState } from "react";

const YamlToJsonTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  // 简单的YAML到JSON转换函数
  const convertYamlToJson = () => {
    try {
      setError("");

      // 这是一个非常简化的YAML解析器，仅用于演示
      // 实际项目中应该使用专业的库如js-yaml
      const lines = input.split('\n');
      const result: any = {};
      let currentObj = result;
      const stack: any[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;

        // 计算缩进级别
        const indent = line.search(/\S/);
        const trimmedLine = line.trim();

        // 处理键值对
        if (trimmedLine.includes(':')) {
          const [key, ...valueParts] = trimmedLine.split(':');
          const value = valueParts.join(':').trim();

          // 根据缩进调整当前对象
          while (stack.length > indent / 2) {
            stack.pop();
          }

          currentObj = stack.length > 0 ? stack[stack.length - 1] : result;

          // 解析值
          let parsedValue: any;
          if (value === '') {
            parsedValue = {};
            stack.push(parsedValue);
          } else if (value === 'null') {
            parsedValue = null;
          } else if (value === 'true') {
            parsedValue = true;
          } else if (value === 'false') {
            parsedValue = false;
          } else if (!isNaN(Number(value))) {
            parsedValue = Number(value);
          } else if (value.startsWith('"') && value.endsWith('"')) {
            parsedValue = value.slice(1, -1);
          } else if (value.startsWith("'") && value.endsWith("'")) {
            parsedValue = value.slice(1, -1);
          } else {
            parsedValue = value;
          }

          currentObj[key.trim()] = parsedValue;
        }
      }

      setOutput(JSON.stringify(result, null, 2));
    } catch (err: any) {
      setError("转换错误: " + err.message);
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="yaml-input" className="block mb-2 font-medium">YAML文本:</label>
        <textarea
          id="yaml-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="在此输入YAML文本..."
          className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono"
        />
      </div>

      <div className="flex space-x-3">
        <button
          onClick={convertYamlToJson}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          转换为JSON
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className={`px-4 py-2 rounded-lg ${output ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"}`}
        >
          复制JSON
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="json-output" className="block mb-2 font-medium">JSON结果:</label>
        <textarea
          id="json-output"
          value={output}
          readOnly
          placeholder="转换结果将显示在这里"
          className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono"
        />
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p className="font-semibold">注意:</p>
        <p>这是一个简化的YAML解析器，仅支持基本的键值对转换。对于复杂的YAML结构，请使用专业的解析库。</p>
      </div>
    </div>
  );
};

export default YamlToJsonTool;
