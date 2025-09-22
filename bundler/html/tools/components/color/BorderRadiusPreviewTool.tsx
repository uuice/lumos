import React, { useState } from 'react';

const BorderRadiusPreviewTool = () => {
  const [topLeft, setTopLeft] = useState(10);
  const [topRight, setTopRight] = useState(10);
  const [bottomRight, setBottomRight] = useState(10);
  const [bottomLeft, setBottomLeft] = useState(10);

  const generateBorderRadius = () => {
    return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`border-radius: ${generateBorderRadius()};`);
  };

  const resetValues = () => {
    setTopLeft(0);
    setTopRight(0);
    setBottomRight(0);
    setBottomLeft(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">圆角预览工具</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          可视化调整元素的圆角属性并生成 CSS 代码
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 dark:text-white mb-4">圆角设置</h3>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      左上角 (Top Left)
                    </label>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{topLeft}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={topLeft}
                    onChange={(e) => setTopLeft(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      右上角 (Top Right)
                    </label>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{topRight}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={topRight}
                    onChange={(e) => setTopRight(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      右下角 (Bottom Right)
                    </label>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{bottomRight}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={bottomRight}
                    onChange={(e) => setBottomRight(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      左下角 (Bottom Left)
                    </label>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{bottomLeft}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={bottomLeft}
                    onChange={(e) => setBottomLeft(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={resetValues}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  重置
                </button>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  复制 CSS
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 dark:text-white mb-4">预览</h3>
              <div className="flex justify-center">
                <div
                  className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center"
                  style={{ borderRadius: generateBorderRadius() }}
                >
                  <p className="text-white font-medium text-center">
                    圆角预览<br/>
                    <span className="text-sm opacity-80">调整滑块查看效果</span>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-800 dark:text-white mb-3">CSS 代码</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <pre className="text-green-400 text-sm overflow-x-auto">
                  {`border-radius: ${generateBorderRadius()};`}
                </pre>
              </div>
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                <p>简写形式: {topLeft === bottomRight && topRight === bottomLeft && topLeft === topRight ?
                  `${topLeft}px` :
                  topLeft === bottomRight && topRight === bottomLeft ?
                  `${topLeft}px ${topRight}px` :
                  `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorderRadiusPreviewTool;
