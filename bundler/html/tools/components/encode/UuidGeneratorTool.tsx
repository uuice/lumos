import React, { useState } from "react";

const UuidGeneratorTool = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);

  const generateUuid = () => {
    // 简单的UUIDv4实现
    const generate = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };

    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(generate());
    }
    setUuids(newUuids);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
  };

  return (
    <div className="space-y-6 p-1">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">UUID 生成器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          生成符合RFC 4122标准的UUID v4标识符
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <label htmlFor="uuid-count" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              生成数量:
            </label>
            <input
              id="uuid-count"
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <button
            onClick={generateUuid}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            生成UUID
          </button>
        </div>

        {uuids.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">生成的UUID</h3>
              <button
                onClick={copyAll}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                复制全部
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 transition-all duration-300">
              {uuids.map((uuid, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-gray-600/50 rounded-lg shadow transition-all duration-300 hover:shadow-md">
                  <code className="font-mono text-sm text-gray-800 dark:text-gray-200 break-all">{uuid}</code>
                  <button
                    onClick={() => copyToClipboard(uuid)}
                    className="ml-3 px-3 py-1.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200"
                  >
                    复制
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {uuids.length === 0 && (
          <div className="mt-8 text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-all duration-300">
            <div className="mx-auto w-16 h-16 text-gray-400 dark:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <h4 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">点击&quot;生成UUID&quot;按钮开始</h4>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              生成的UUID将显示在这里
            </p>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>设置要生成的UUID数量（1-100）</li>
            <li>点击&quot;生成UUID&quot;按钮创建UUID</li>
            <li>每个UUID都是唯一的标识符</li>
            <li>支持单独复制或批量复制所有UUID</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UuidGeneratorTool;
