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
    <div className="space-y-6">
      <div>
        <label htmlFor="base-color" className="block mb-2 font-medium">基础颜色:</label>
        <div className="flex items-center space-x-4">
          <input
            id="base-color"
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-16 h-16 cursor-pointer"
          />
          <div className="text-xl font-mono">{baseColor}</div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={generatePalette}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          生成调色板
        </button>
        {palette.length > 0 && (
          <button
            onClick={copyAllColors}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            复制所有颜色
          </button>
        )}
      </div>

      {palette.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">生成的调色板:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {palette.map((color, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-full h-16 rounded-lg shadow-md border border-gray-300 mb-2 cursor-pointer hover:scale-105 transition-transform"
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
          <li>基于基础颜色生成10种不同亮度的配色</li>
          <li>点击颜色方块或&quot;复制&quot;按钮可复制单个颜色值</li>
          <li>点击&quot;复制所有颜色&quot;按钮可复制整个调色板</li>
        </ul>
      </div>
    </div>
  );
};

export default PaletteGeneratorTool;
