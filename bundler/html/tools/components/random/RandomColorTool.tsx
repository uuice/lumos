import React, { useState } from "react";

const RandomColorTool = () => {
  const [colors, setColors] = useState<string[]>([]);
  const [count, setCount] = useState(10);

  // 生成随机颜色
  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  };

  // 生成随机颜色数组
  const generateColors = () => {
    const newColors = [];
    for (let i = 0; i < count; i++) {
      newColors.push(generateRandomColor());
    }
    setColors(newColors);
  };

  // 复制颜色到剪贴板
  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  // 复制所有颜色
  const copyAllColors = () => {
    navigator.clipboard.writeText(colors.join('\n'));
  };

  React.useEffect(() => {
    generateColors();
  }, []);

  return (
    <div className="space-y-6 p-1">
      <div className="flex flex-wrap items-center gap-4 p-5 bg-gray-100 dark:bg-gray-800 rounded-2xl">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="color-count" className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
            生成数量: <span className="font-bold text-purple-600 dark:text-purple-400">{count}</span>
          </label>
          <input
            id="color-count"
            type="range"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
            <span>1</span>
            <span>100</span>
          </div>
        </div>

        <button
          onClick={generateColors}
          className="px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          生成随机颜色
        </button>

        {colors.length > 0 && (
          <button
            onClick={copyAllColors}
            className="px-5 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            复制所有颜色
          </button>
        )}
      </div>

      {colors.length > 0 && (
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl">
          <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">生成的颜色:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {colors.map((color, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div
                  className="w-20 h-20 rounded-2xl shadow-lg border-4 border-white dark:border-gray-700 cursor-pointer hover:scale-110 transition-all duration-300"
                  style={{ backgroundColor: color }}
                  onClick={() => copyToClipboard(color)}
                ></div>
                <div className="text-sm font-mono text-center mt-2">
                  <div className="font-medium text-gray-800 dark:text-gray-200">{color}</div>
                  <button
                    onClick={() => copyToClipboard(color)}
                    className="text-blue-600 dark:text-blue-400 hover:underline mt-1 text-xs"
                  >
                    点击复制
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl">
        <p className="font-semibold text-gray-800 dark:text-gray-200 mb-3">功能说明:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>生成指定数量的随机十六进制颜色</li>
          <li>点击颜色方块或&quot;复制&quot;按钮可复制单个颜色值</li>
          <li>点击&quot;复制所有颜色&quot;按钮可复制所有颜色值</li>
          <li>颜色值格式为标准的6位十六进制表示法</li>
        </ul>
      </div>
    </div>
  );
};

export default RandomColorTool;
