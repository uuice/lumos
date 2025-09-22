import React, { useState } from "react";

const LotteryPickerTool = () => {
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(49);
  const [count, setCount] = useState<number>(6);
  const [exclude, setExclude] = useState<string>("");
  const [results, setResults] = useState<number[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  const generateNumbers = () => {
    // 解析排除的数字
    const excludeNumbers = exclude
      .split(",")
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num) && num >= min && num <= max);

    // 创建可选数字数组
    const availableNumbers = [];
    for (let i = min; i <= max; i++) {
      if (!excludeNumbers.includes(i)) {
        availableNumbers.push(i);
      }
    }

    // 检查是否有足够的数字可选
    if (availableNumbers.length < count) {
      alert(`可选数字不足！排除${excludeNumbers.length}个数字后，只剩下${availableNumbers.length}个数字，但需要选择${count}个。`);
      return;
    }

    // 随机选择指定数量的数字
    const selectedNumbers = [];
    const tempArray = [...availableNumbers];

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      selectedNumbers.push(tempArray[randomIndex]);
      tempArray.splice(randomIndex, 1);
    }

    // 排序结果
    selectedNumbers.sort((a, b) => a - b);
    setResults(selectedNumbers);

    // 添加到历史记录
    const excludeText = excludeNumbers.length > 0 ? ` (排除: ${excludeNumbers.join(",")})` : "";
    const historyEntry = `${selectedNumbers.join(", ")}${excludeText}`;
    setHistory(prev => [historyEntry, ...prev.slice(0, 9)]); // 保留最近10条记录
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const quickPick = (preset: { min: number; max: number; count: number }) => {
    setMin(preset.min);
    setMax(preset.max);
    setCount(preset.count);
    setExclude("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">抽奖器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          从指定范围内随机选择不重复的数字，支持排除特定数字
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              最小值
            </label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              最大值
            </label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              选择数量
            </label>
            <input
              type="number"
              min="1"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              排除数字 (用逗号分隔)
            </label>
            <input
              type="text"
              value={exclude}
              onChange={(e) => setExclude(e.target.value)}
              placeholder="例如: 7, 13, 21"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            快速选择预设
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => quickPick({ min: 1, max: 49, count: 6 })}
              className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800"
            >
              49选6 (大乐透)
            </button>
            <button
              onClick={() => quickPick({ min: 1, max: 35, count: 5 })}
              className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800"
            >
              35选5 (双色球)
            </button>
            <button
              onClick={() => quickPick({ min: 1, max: 33, count: 6 })}
              className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800"
            >
              33选6 (福彩3D)
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={generateNumbers}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            生成随机数字
          </button>
        </div>

        {results.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              抽选结果
            </h3>

            <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 mb-4">
              <div className="flex flex-wrap justify-center gap-3">
                {results.map((number, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full shadow text-xl font-bold text-green-600 dark:text-green-300"
                  >
                    {number}
                  </div>
                ))}
              </div>
              <div className="mt-3 text-center text-gray-700 dark:text-gray-300">
                从 {min} 到 {max} 中选择了 {count} 个不重复的数字
              </div>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                抽选历史
              </h3>
              <button
                onClick={clearHistory}
                className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                清空历史
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <ul className="space-y-2">
                {history.map((entry, index) => (
                  <li
                    key={index}
                    className="py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0 text-gray-700 dark:text-gray-300"
                  >
                    {entry}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LotteryPickerTool;
