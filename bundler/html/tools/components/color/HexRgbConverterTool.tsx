import React, { useState } from "react";

const HexRgbConverterTool = () => {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });

  // 将HEX转换为RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // 将RGB转换为HEX
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  // 处理HEX输入变化
  const handleHexChange = (value: string) => {
    setHex(value);
    const rgbResult = hexToRgb(value);
    if (rgbResult) {
      setRgb(rgbResult);
    }
  };

  // 处理RGB输入变化
  const handleRgbChange = (channel: 'r' | 'g' | 'b', value: string) => {
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.min(255, Math.max(0, numValue));

    const newRgb = { ...rgb, [channel]: clampedValue };
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  // 复制颜色值到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6 p-1">
      <div className="flex flex-col items-center bg-white dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div
          className="w-32 h-32 rounded-2xl shadow-lg mb-4 border-2 border-gray-300 dark:border-gray-600 transition-all duration-300"
          style={{ backgroundColor: hex }}
        ></div>
        <div className="text-2xl font-mono font-bold text-gray-800 dark:text-white mt-2">{hex}</div>
        <div className="text-xl text-gray-600 dark:text-gray-300">rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
          <label htmlFor="hex-input" className="block mb-3 font-medium text-gray-800 dark:text-white">HEX颜色值:</label>
          <div className="flex space-x-2">
            <input
              id="hex-input"
              type="text"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <button
              onClick={() => copyToClipboard(hex)}
              className="px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-lg hover:from-gray-300 hover:to-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:from-gray-700 dark:to-gray-600 dark:text-white dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 shadow-sm"
            >
              复制
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="block mb-3 font-medium text-gray-800 dark:text-white">RGB颜色值:</div>
          <div className="grid grid-cols-3 gap-3">
            {(['r', 'g', 'b'] as const).map((channel) => (
              <div key={channel} className="space-y-2">
                <label htmlFor={`rgb-${channel}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{channel.toUpperCase()}</label>
                <div className="flex space-x-2">
                  <input
                    id={`rgb-${channel}`}
                    type="number"
                    min="0"
                    max="255"
                    value={rgb[channel]}
                    onChange={(e) => handleRgbChange(channel, e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-4">预设颜色:</h3>
        <div className="grid grid-cols-6 gap-3">
          {[
            "#ef4444", "#f97316", "#eab308",
            "#22c55e", "#3b82f6", "#8b5cf6",
            "#ec4899", "#000000", "#ffffff",
            "#64748b", "#f59e0b", "#10b981"
          ].map((color) => (
            <div
              key={color}
              onClick={() => handleHexChange(color)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div
                className="w-12 h-12 rounded-xl shadow-md border-2 border-gray-300 dark:border-gray-600 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{ backgroundColor: color }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
        <p className="font-semibold text-gray-800 dark:text-white mb-3">使用说明:</p>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          <li className="flex items-start">
            <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
            在HEX输入框中输入十六进制颜色值（如 #ff0000）
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
            在RGB输入框中输入红、绿、蓝三个通道的值（0-255）
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
            点击预设颜色可快速选择常用颜色
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HexRgbConverterTool;
