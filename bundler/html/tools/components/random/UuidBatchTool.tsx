import React, { useState } from "react";

const UuidBatchTool = () => {
  const [count, setCount] = useState<number>(10);
  const [uuids, setUuids] = useState<string[]>([]);
  const [format, setFormat] = useState<string>("plain");

  // 生成UUID v4的函数
  const generateUUID = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generateBatch = () => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(generateUUID());
    }
    setUuids(newUuids);
  };

  const copyToClipboard = () => {
    const textToCopy = uuids.join(format === "json" ? ",\n" : "\n");
    navigator.clipboard.writeText(textToCopy);
  };

  const download = () => {
    const content = format === "json"
      ? JSON.stringify(uuids, null, 2)
      : uuids.join("\n");

    const blob = new Blob([content], {
      type: format === "json" ? "application/json" : "text/plain"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uuids-${new Date().toISOString().slice(0, 10)}.${format === "json" ? "json" : "txt"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">批量UUID生成器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          生成指定数量的UUID v4，支持多种格式导出
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              生成数量
            </label>
            <input
              type="number"
              min="1"
              max="1000"
              value={count}
              onChange={(e) => setCount(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              输出格式
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="plain">纯文本 (每行一个)</option>
              <option value="json">JSON 数组</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={generateBatch}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            生成 UUID
          </button>

          {uuids.length > 0 && (
            <>
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                复制到剪贴板
              </button>
              <button
                onClick={download}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                下载文件
              </button>
            </>
          )}
        </div>

        {uuids.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                生成的 UUID ({uuids.length} 个)
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {format === "json" ? "JSON 格式" : "纯文本格式"}
              </span>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-96 overflow-y-auto">
              {format === "json" ? (
                <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {JSON.stringify(uuids, null, 2)}
                </pre>
              ) : (
                <div className="text-sm text-gray-800 dark:text-gray-200">
                  {uuids.map((uuid, index) => (
                    <div key={index} className="py-1 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                      {uuid}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UuidBatchTool;
