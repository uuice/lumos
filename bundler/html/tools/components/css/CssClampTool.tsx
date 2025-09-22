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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">CSS Clamp 生成器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          生成响应式 CSS clamp() 函数，实现流体尺寸调整
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 dark:text-white mb-4">尺寸设置</h3>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      最小尺寸
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        value={minSize}
                        onChange={(e) => setMinSize(parseFloat(e.target.value) || 0)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="border-t border-b border-r border-gray-300 dark:border-gray-600 rounded-r bg-white dark:bg-gray-700 dark:text-white px-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="px">px</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      最大尺寸
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        value={maxSize}
                        onChange={(e) => setMaxSize(parseFloat(e.target.value) || 0)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="border-t border-b border-r border-gray-300 dark:border-gray-600 rounded-r bg-white dark:bg-gray-700 dark:text-white px-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="px">px</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    首选尺寸
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      value={preferredSize}
                      onChange={(e) => setPreferredSize(parseFloat(e.target.value) || 0)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="border-t border-b border-r border-gray-300 dark:border-gray-600 rounded-r bg-white dark:bg-gray-700 dark:text-white px-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="px">px</option>
                      <option value="em">em</option>
                      <option value="rem">rem</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      最小视口宽度
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        value={viewportMin}
                        onChange={(e) => setViewportMin(parseFloat(e.target.value) || 0)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      <select
                        value={viewportUnit}
                        onChange={(e) => setViewportUnit(e.target.value)}
                        className="border-t border-b border-r border-gray-300 dark:border-gray-600 rounded-r bg-white dark:bg-gray-700 dark:text-white px-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="px">px</option>
                        <option value="rem">rem</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      最大视口宽度
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        value={viewportMax}
                        onChange={(e) => setViewportMax(parseFloat(e.target.value) || 0)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      <select
                        value={viewportUnit}
                        onChange={(e) => setViewportUnit(e.target.value)}
                        className="border-t border-b border-r border-gray-300 dark:border-gray-600 rounded-r bg-white dark:bg-gray-700 dark:text-white px-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 dark:text-white mb-4">生成结果</h3>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">基础 Clamp</h4>
                    <button
                      onClick={() => copyToClipboard(calculateClamp())}
                      className="text-xs px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    >
                      复制
                    </button>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      {calculateClamp()}
                    </pre>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">高级 Clamp (响应式)</h4>
                    <button
                      onClick={() => copyToClipboard(calculateAdvancedClamp())}
                      className="text-xs px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    >
                      复制
                    </button>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      {calculateAdvancedClamp()}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">预览效果</h4>
                  <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg p-6 text-center">
                    <p
                      className="font-bold text-white"
                      style={{ fontSize: calculateClamp() }}
                    >
                      流体尺寸文本
                    </p>
                    <p className="text-white text-opacity-80 mt-2 text-sm">
                      调整浏览器窗口宽度查看效果
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• clamp() 函数语法: clamp(最小值, 首选值, 最大值)</li>
            <li>• 最小值: 元素的最小尺寸</li>
            <li>• 首选值: 在正常视口尺寸下的理想尺寸</li>
            <li>• 最大值: 元素的最大尺寸</li>
            <li>• 浏览器会自动在最小值和最大值之间选择合适的尺寸</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CssClampTool;
