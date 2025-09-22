import React, { useState } from 'react';
import * as Diff from 'diff';

const DiffViewerTool = () => {
  const [originalText, setOriginalText] = useState('');
  const [changedText, setChangedText] = useState('');
  const [diffResult, setDiffResult] = useState<any[]>([]);

  // 计算差异
  const calculateDiff = () => {
    const diff = Diff.diffLines(originalText, changedText);
    setDiffResult(diff);
  };

  // 清空所有内容
  const clearAll = () => {
    setOriginalText('');
    setChangedText('');
    setDiffResult([]);
  };

  // 交换文本
  const swapTexts = () => {
    setOriginalText(changedText);
    setChangedText(originalText);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">文本差异对比工具</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">原始文本</label>
              <button
                onClick={() => setOriginalText('')}
                className="text-xs text-red-500 hover:text-red-700"
              >
                清空
              </button>
            </div>
            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="输入原始文本..."
              className="w-full h-40 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">修改后文本</label>
              <button
                onClick={() => setChangedText('')}
                className="text-xs text-red-500 hover:text-red-700"
              >
                清空
              </button>
            </div>
            <textarea
              value={changedText}
              onChange={(e) => setChangedText(e.target.value)}
              placeholder="输入修改后的文本..."
              className="w-full h-40 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={calculateDiff}
            disabled={!originalText && !changedText}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:dark:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-200"
          >
            计算差异
          </button>

          <button
            onClick={swapTexts}
            disabled={!originalText && !changedText}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:dark:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-200"
          >
            交换文本
          </button>

          <button
            onClick={clearAll}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-200"
          >
            清空所有
          </button>
        </div>
      </div>

      {diffResult.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">差异结果</h2>

          <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
            <pre className="text-sm p-4 max-h-96 overflow-auto font-mono">
              {diffResult.map((part, index) => (
                <span
                  key={index}
                  className={
                    part.added
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : part.removed
                        ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        : 'text-gray-800 dark:text-gray-200'
                  }
                >
                  {part.value}
                </span>
              ))}
            </pre>
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 mr-2"></span>
              <span className="text-sm">新增内容</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 mr-2"></span>
              <span className="text-sm">删除内容</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiffViewerTool;
