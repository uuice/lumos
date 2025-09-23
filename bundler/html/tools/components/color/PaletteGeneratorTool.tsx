import React, { useState } from "react";

const PaletteGeneratorTool = () => {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [palette, setPalette] = useState<string[]>([]);

  // 生成调色板颜色
  const generatePalette = () => {
    const colors = [];

    // 生成不同亮度的颜色
    for (let i = 0; i < 10; i++) {
      const lightness = 10 + i * 10;
      const color = changeColorLightness(baseColor, lightness - 50);
      colors.push(color);
    }

    setPalette(colors);
  };

  // 调整颜色亮度
  const changeColorLightness = (hex: string, percent: number) => {
    // Convert hex to RGB
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    // Adjust lightness
    r = Math.min(255, Math.max(0, r + (255 * percent / 100)));
    g = Math.min(255, Math.max(0, g + (255 * percent / 100)));
    b = Math.min(255, Math.max(0, b + (255 * percent / 100)));

    // Convert back to hex
    return "#" +
      Math.round(r).toString(16).padStart(2, '0') +
      Math.round(g).toString(16).padStart(2, '0') +
      Math.round(b).toString(16).padStart(2, '0');
  };

  // 复制颜色到剪贴板
  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  // 复制所有颜色
  const copyAllColors = () => {
    navigator.clipboard.writeText(palette.join('\n'));
  };

  React.useEffect(() => {
    generatePalette();
  }, [baseColor]);

  return (
    <div className="space-y-6 p-1">
      <div className="bg-white dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
        <label htmlFor="base-color" className="block mb-3 font-medium text-gray-800 dark:text-white">基础颜色:</label>
        <div className="flex items-center space-x-4">
          <input
            id="base-color"
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-16 h-16 cursor-pointer rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm"
          />
          <div className="text-xl font-mono text-gray-800 dark:text-white">{baseColor}</div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={generatePalette}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md"
        >
          生成调色板
        </button>
        {palette.length > 0 && (
          <button
            onClick={copyAllColors}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 shadow-md"
          >
            复制所有颜色
          </button>
        )}
      </div>

      {palette.length > 0 && (
        <div className="bg-white dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-4">生成的调色板:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {palette.map((color, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div
                  className="w-full h-16 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 mb-2 cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                  style={{ backgroundColor: color }}
                  onClick={() => copyToClipboard(color)}
                ></div>
                <div className="text-xs font-mono text-center mt-2">
                  <div className="text-gray-800 dark:text-white">{color}</div>
                  <button
                    onClick={() => copyToClipboard(color)}
                    className="text-blue-600 dark:text-blue-400 hover:underline mt-1 transition-all duration-300"
                  >
                    复制
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
        <p className="font-semibold text-gray-800 dark:text-white mb-3">功能说明:</p>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          <li className="flex items-start">
            <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
            基于基础颜色生成10种不同亮度的配色
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
            点击颜色方块或&quot;复制&quot;按钮可复制单个颜色值
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
            点击&quot;复制所有颜色&quot;按钮可复制整个调色板
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PaletteGeneratorTool;
