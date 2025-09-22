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
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div>
          <label htmlFor="color-count" className="block mb-2 font-medium">生成数量: {count}</label>
          <input
            id="color-count"
            type="range"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-32"
          />
        </div>

        <button
          onClick={generateColors}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 h-fit self-end"
        >
          生成随机颜色
        </button>

        {colors.length > 0 && (
          <button
            onClick={copyAllColors}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 h-fit self-end"
          >
            复制所有颜色
          </button>
        )}
      </div>

      {colors.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">生成的颜色:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {colors.map((color, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-lg shadow-md border border-gray-300 mb-2 cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => copyToClipboard(color)}
                ></div>
                <div className="text-xs font-mono text-center">
                  <div>{color}</div>
                  <button
                    onClick={() => copyToClipboard(color)}
                    className="text-blue-600 dark:text-blue-400 hover:underline mt-1"
                  >
                    复制
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p className="font-semibold">功能说明:</p>
        <ul className="list-disc pl-5 space-y-1">
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
