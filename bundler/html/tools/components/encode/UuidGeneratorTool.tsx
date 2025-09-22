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
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <label htmlFor="uuid-count" className="font-medium">生成数量:</label>
        <input
          id="uuid-count"
          type="number"
          min="1"
          max="100"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value) || 1)}
          className="w-20 p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={generateUuid}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          生成UUID
        </button>
      </div>

      {uuids.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">生成的UUID:</h3>
            <button
              onClick={copyAll}
              className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
            >
              复制全部
            </button>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {uuids.map((uuid, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <code className="font-mono text-sm">{uuid}</code>
                <button
                  onClick={() => copyToClipboard(uuid)}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm hover:bg-gray-300"
                >
                  复制
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UuidGeneratorTool;
