import React, { useState } from "react";

const DiceRollerTool = () => {
  const [diceType, setDiceType] = useState<number>(6);
  const [diceCount, setDiceCount] = useState<number>(1);
  const [modifier, setModifier] = useState<number>(0);
  const [results, setResults] = useState<number[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [history, setHistory] = useState<string[]>([]);

  const rollDice = () => {
    const newResults = [];
    let sum = 0;

    for (let i = 0; i < diceCount; i++) {
      const roll = Math.floor(Math.random() * diceType) + 1;
      newResults.push(roll);
      sum += roll;
    }

    const finalTotal = sum + modifier;
    setResults(newResults);
    setTotal(finalTotal);

    // 添加到历史记录
    const historyEntry = `${diceCount}d${diceType}${modifier !== 0 ? (modifier > 0 ? `+${modifier}` : modifier) : ''} = ${newResults.join('+')}${modifier !== 0 ? (modifier > 0 ? `+${modifier}` : modifier) : ''} = ${finalTotal}`;
    setHistory(prev => [historyEntry, ...prev.slice(0, 9)]); // 保留最近10条记录
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">RPG骰子</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          模拟各种面数的骰子，支持多骰子投掷和修正值
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              骰子面数 (dX)
            </label>
            <select
              value={diceType}
              onChange={(e) => setDiceType(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value={2}>d2 (硬币)</option>
              <option value={4}>d4 (四面体)</option>
              <option value={6}>d6 (六面体)</option>
              <option value={8}>d8 (八面体)</option>
              <option value={10}>d10 (十面体)</option>
              <option value={12}>d12 (十二面体)</option>
              <option value={20}>d20 (二十面体)</option>
              <option value={100}>d100 (百分骰)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              骰子数量
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={diceCount}
              onChange={(e) => setDiceCount(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              修正值
            </label>
            <input
              type="number"
              value={modifier}
              onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={rollDice}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            投掷骰子
          </button>
        </div>

        {results.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              投掷结果
            </h3>

            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-700 dark:text-gray-200">投掷:</span>
                <div className="flex flex-wrap gap-1">
                  {results.map((result, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white dark:bg-gray-700 rounded-md shadow text-lg font-bold text-blue-600 dark:text-blue-300"
                    >
                      {result}
                    </span>
                  ))}
                </div>
                {modifier !== 0 && (
                  <span className="text-gray-700 dark:text-gray-200">
                    {modifier > 0 ? '+' : ''}{modifier}
                  </span>
                )}
                <span className="text-gray-700 dark:text-gray-200">=</span>
                <span className="px-3 py-1 bg-green-500 text-white rounded-md shadow text-lg font-bold">
                  {total}
                </span>
              </div>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                投掷历史
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

export default DiceRollerTool;
