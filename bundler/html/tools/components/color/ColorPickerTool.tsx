import React, { useState } from "react";

const ColorPickerTool = () => {
  const [color, setColor] = useState("#3b82f6");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <div
          className="w-32 h-32 rounded-lg shadow-lg mb-4 border border-gray-300"
          style={{ backgroundColor: color }}
        ></div>
        <div className="text-xl font-mono">{color}</div>
        <button
          onClick={copyToClipboard}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          复制颜色值
        </button>
      </div>

      <div>
        <label htmlFor="color-picker" className="block mb-2 font-medium">选择颜色:</label>
        <input
          id="color-picker"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-12 cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          "#ef4444", "#f97316", "#eab308",
          "#22c55e", "#3b82f6", "#8b5cf6",
          "#ec4899", "#000000", "#ffffff"
        ].map((presetColor) => (
          <div
            key={presetColor}
            onClick={() => setColor(presetColor)}
            className="flex flex-col items-center cursor-pointer"
          >
            <div
              className="w-12 h-12 rounded-lg shadow-md border border-gray-300"
              style={{ backgroundColor: presetColor }}
            ></div>
            <div className="text-xs mt-1 font-mono">{presetColor}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPickerTool;
