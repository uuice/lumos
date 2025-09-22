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
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="delimiter" className="block mb-2 font-medium">分隔符:</label>
          <select
            id="delimiter"
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value=",">逗号 (,)</option>
            <option value=";">分号 (;)</option>
            <option value="\t">制表符 (Tab)</option>
            <option value="|">竖线 (|)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="csv-input" className="block mb-2 font-medium">CSV文本:</label>
        <textarea
          id="csv-input"
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          placeholder="在此输入CSV文本，例如:
name,age,city
张三,25,北京
李四,30,上海"
          className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={convertCsvToJson}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          转换为JSON
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!json}
          className={`px-4 py-2 rounded-lg ${json ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"}`}
        >
          复制JSON
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          清空
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
          value={json}
          readOnly
          placeholder="转换结果将显示在这里"
          className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono"
        />
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p className="font-semibold">使用说明:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>第一行应为列标题</li>
          <li>确保每行的字段数量与标题数量一致</li>
          <li>支持多种分隔符: 逗号、分号、制表符、竖线</li>
          <li>输出为标准JSON格式数组</li>
        </ul>
      </div>
    </div>
  );
};

export default CsvToJsonTool;
