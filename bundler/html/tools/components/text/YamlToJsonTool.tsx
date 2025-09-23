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
    <div className="space-y-6 p-1">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">YAML 转 JSON</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          将YAML格式数据转换为JSON格式
        </p>

        <div className="mb-6">
          <label htmlFor="yaml-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            YAML文本
          </label>
          <textarea
            id="yaml-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="在此输入YAML文本..."
            className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={convertYamlToJson}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            转换为JSON
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
            复制JSON
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800 transition-all duration-300">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  {error}
                </h3>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="json-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            JSON结果
          </label>
          <textarea
            id="json-output"
            value={output}
            readOnly
            placeholder="转换结果将显示在这里"
            className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono transition-all duration-200"
          />
        </div>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 transition-all duration-300">
          <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">注意</h3>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            这是一个简化的YAML解析器，仅支持基本的键值对转换。对于复杂的YAML结构，请使用专业的解析库。
          </p>
        </div>
      </div>
    </div>
  );
};

export default YamlToJsonTool;
