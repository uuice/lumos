import React, { useState } from 'react';

const CssClampTool = () => {
  const [minSize, setMinSize] = useState(16);
  const [preferredSize, setPreferredSize] = useState(20);
  const [maxSize, setMaxSize] = useState(24);
  const [viewportMin, setViewportMin] = useState(320);
  const [viewportMax, setViewportMax] = useState(1200);
  const [unit, setUnit] = useState('px');
  const [viewportUnit, setViewportUnit] = useState('px');

  const calculateClamp = () => {
    // 计算 preferred value (中间值)
    const preferredValue = preferredSize;

    // 计算 minimum value (最小值)
    const minValue = minSize;

    // 计算 maximum value (最大值)
    const maxValue = maxSize;

    return `clamp(${minValue}${unit}, ${preferredValue}${unit}, ${maxValue}${unit})`;
  };

  const calculateAdvancedClamp = () => {
    // 基于视口宽度的高级计算
    // 公式: clamp(min, preferred + (viewport difference * ratio), max)

    // 计算视口宽度差值
    const viewportDiff = viewportMax - viewportMin;

    // 计算比率 (简化计算)
    const ratio = ((preferredSize - minSize) / viewportDiff) * 100;

    // 构建表达式
    const preferredExpression = `${minSize}${unit} + ${ratio.toFixed(2)}${viewportUnit === 'px' ? 'vw' : viewportUnit}`;

    return `clamp(${minSize}${unit}, ${preferredExpression}, ${maxSize}${unit})`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">CSS Clamp 生成器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          生成响应式 CSS clamp() 函数，实现流体尺寸调整
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-6 bg-white dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-4">尺寸设置</h3>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="minSize">
                      最小尺寸
                    </label>
                    <div className="flex">
                      <input
                        id="minSize"
                        type="number"
                        value={minSize}
                        onChange={(e) => setMinSize(parseFloat(e.target.value) || 0)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                      />
                      <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="border-t border-b border-r border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-700 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      >
                        <option value="px">px</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="maxSize">
                      最大尺寸
                    </label>
                    <div className="flex">
                      <input
                        id="maxSize"
                        type="number"
                        value={maxSize}
                        onChange={(e) => setMaxSize(parseFloat(e.target.value) || 0)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                      />
                      <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="border-t border-b border-r border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-700 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      >
                        <option value="px">px</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="preferredSize">
                    首选尺寸
                  </label>
                  <div className="flex">
                    <input
                      id="preferredSize"
                      type="number"
                      value={preferredSize}
                      onChange={(e) => setPreferredSize(parseFloat(e.target.value) || 0)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                    />
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="border-t border-b border-r border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-700 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    >
                      <option value="px">px</option>
                      <option value="em">em</option>
                      <option value="rem">rem</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="viewportMin">
                      最小视口宽度
                    </label>
                    <div className="flex">
                      <input
                        id="viewportMin"
                        type="number"
                        value={viewportMin}
                        onChange={(e) => setViewportMin(parseFloat(e.target.value) || 0)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                      />
                      <select
                        value={viewportUnit}
                        onChange={(e) => setViewportUnit(e.target.value)}
                        className="border-t border-b border-r border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-700 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      >
                        <option value="px">px</option>
                        <option value="rem">rem</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="viewportMax">
                      最大视口宽度
                    </label>
                    <div className="flex">
                      <input
                        id="viewportMax"
                        type="number"
                        value={viewportMax}
                        onChange={(e) => setViewportMax(parseFloat(e.target.value) || 0)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                      />
                      <select
                        value={viewportUnit}
                        onChange={(e) => setViewportUnit(e.target.value)}
                        className="border-t border-b border-r border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-700 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      >
                        <option value="px">px</option>
                        <option value="rem">rem</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6 bg-white dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-4">生成结果</h3>

              <div className="space-y-5">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-gray-200">基础 Clamp</h4>
                    <button
                      onClick={() => copyToClipboard(calculateClamp())}
                      className="text-xs px-3 py-1 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 shadow-sm"
                    >
                      复制
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 transition-all duration-300">
                    <pre className="text-green-400 text-sm overflow-x-auto font-mono">
                      {calculateClamp()}
                    </pre>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-gray-200">高级 Clamp (响应式)</h4>
                    <button
                      onClick={() => copyToClipboard(calculateAdvancedClamp())}
                      className="text-xs px-3 py-1 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 shadow-sm"
                    >
                      复制
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 transition-all duration-300">
                    <pre className="text-green-400 text-sm overflow-x-auto font-mono">
                      {calculateAdvancedClamp()}
                    </pre>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-5 transition-all duration-300">
                  <h4 className="text-sm font-medium text-white mb-3">预览效果</h4>
                  <div className="bg-white bg-opacity-20 rounded-lg p-6 text-center backdrop-blur-sm">
                    <p
                      className="font-bold text-white"
                      style={{ fontSize: calculateClamp() }}
                    >
                      流体尺寸文本
                    </p>
                    <p className="text-white text-opacity-90 mt-2 text-sm">
                      调整浏览器窗口宽度查看效果
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-2xl p-5 border border-blue-200 dark:border-blue-700/50 shadow-sm transition-all duration-300">
          <h3 className="font-semibold text-lg text-blue-800 dark:text-blue-200 mb-3">使用说明</h3>
          <ul className="space-y-2 text-blue-700 dark:text-blue-300">
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
              clamp() 函数语法: clamp(最小值, 首选值, 最大值)
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
              最小值: 元素的最小尺寸
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
              首选值: 在正常视口尺寸下的理想尺寸
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
              最大值: 元素的最大尺寸
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
              浏览器会自动在最小值和最大值之间选择合适的尺寸
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CssClampTool;
