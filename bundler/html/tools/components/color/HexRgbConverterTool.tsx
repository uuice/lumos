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
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <div
          className="w-32 h-32 rounded-lg shadow-lg mb-4 border border-gray-300"
          style={{ backgroundColor: hex }}
        ></div>
        <div className="text-xl font-mono">{hex}</div>
        <div className="text-lg">rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="hex-input" className="block mb-2 font-medium">HEX颜色值:</label>
          <div className="flex space-x-2">
            <input
              id="hex-input"
              type="text"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono"
            />
            <button
              onClick={() => copyToClipboard(hex)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300"
            >
              复制
            </button>
          </div>
        </div>

        <div>
          <div className="block mb-2 font-medium">RGB颜色值:</div>
          <div className="grid grid-cols-3 gap-2">
            {(['r', 'g', 'b'] as const).map((channel) => (
              <div key={channel}>
                <label htmlFor={`rgb-${channel}`} className="block text-sm mb-1">{channel.toUpperCase()}</label>
                <div className="flex space-x-2">
                  <input
                    id={`rgb-${channel}`}
                    type="number"
                    min="0"
                    max="255"
                    value={rgb[channel]}
                    onChange={(e) => handleRgbChange(channel, e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">预设颜色:</h3>
        <div className="grid grid-cols-6 gap-2">
          {[
            "#ef4444", "#f97316", "#eab308",
            "#22c55e", "#3b82f6", "#8b5cf6",
            "#ec4899", "#000000", "#ffffff",
            "#64748b", "#f59e0b", "#10b981"
          ].map((color) => (
            <div
              key={color}
              onClick={() => handleHexChange(color)}
              className="flex flex-col items-center cursor-pointer"
            >
              <div
                className="w-10 h-10 rounded-lg shadow-md border border-gray-300"
                style={{ backgroundColor: color }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p className="font-semibold">使用说明:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>在HEX输入框中输入十六进制颜色值（如 #ff0000）</li>
          <li>在RGB输入框中输入红、绿、蓝三个通道的值（0-255）</li>
          <li>点击预设颜色可快速选择常用颜色</li>
        </ul>
      </div>
    </div>
  );
};

export default HexRgbConverterTool;
