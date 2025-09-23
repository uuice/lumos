import React, { useState } from "react";

const CsvToJsonTool = () => {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [error, setError] = useState("");

  // CSV到JSON转换函数
  const convertCsvToJson = () => {
    try {
      setError("");

      if (!csv.trim()) {
        setJson("");
        return;
      }

      const lines = csv.trim().split('\n');
      if (lines.length === 0) {
        setJson("[]");
        return;
      }

      // 解析标题行
      const headers = lines[0].split(delimiter).map(header => header.trim());

      // 解析数据行
      const jsonArray = [];
      for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(delimiter);
        if (currentLine.length === headers.length) {
          const obj: any = {};
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j].trim();
          }
          jsonArray.push(obj);
        }
      }

      setJson(JSON.stringify(jsonArray, null, 2));
    } catch (err: any) {
      setError("转换错误: " + err.message);
      setJson("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(json);
  };

  const clearAll = () => {
    setCsv("");
    setJson("");
    setError("");
  };

  return (
    <div className="space-y-6 p-1">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">CSV 转 JSON</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          将CSV格式数据转换为JSON格式
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="delimiter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              分隔符
            </label>
            <select
              id="delimiter"
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              <option value=",">逗号 (,)</option>
              <option value=";">分号 (;)</option>
              <option value="\t">制表符 (Tab)</option>
              <option value="|">竖线 (|)</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="csv-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            CSV文本
          </label>
          <textarea
            id="csv-input"
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            placeholder="在此输入CSV文本，例如:
name,age,city
张三,25,北京
李四,30,上海"
            className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={convertCsvToJson}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            转换为JSON
          </button>
          <button
            onClick={copyToClipboard}
            disabled={!json}
            className={`px-5 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 ${
              json
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transform hover:-translate-y-0.5"
                : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300"
            }`}
          >
            复制JSON
          </button>
          <button
            onClick={clearAll}
            className="px-5 py-2.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            清空
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
            value={json}
            readOnly
            placeholder="转换结果将显示在这里"
            className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono transition-all duration-200"
          />
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>第一行应为列标题</li>
            <li>确保每行的字段数量与标题数量一致</li>
            <li>支持多种分隔符: 逗号、分号、制表符、竖线</li>
            <li>输出为标准JSON格式数组</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CsvToJsonTool;
