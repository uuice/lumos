import React, { useState } from "react";

const ColorPickerTool = () => {
  const [color, setColor] = useState("#3b82f6");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
  };

  return (
    <div className="space-y-6 p-1">
      <div className="flex flex-col items-center">
        <div
          className="w-36 h-36 rounded-2xl shadow-lg mb-5 border-4 border-white dark:border-gray-700 transition-all duration-300"
          style={{ backgroundColor: color }}
        ></div>
        <div className="text-2xl font-mono font-bold bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">{color}</div>
        <button
          onClick={copyToClipboard}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          复制颜色值
        </button>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl">
        <label htmlFor="color-picker" className="block mb-3 font-medium text-gray-800 dark:text-gray-200">选择颜色:</label>
        <input
          id="color-picker"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-14 cursor-pointer rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
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
            className="flex flex-col items-center cursor-pointer group"
          >
            <div
              className="w-14 h-14 rounded-xl shadow-md border-2 border-white dark:border-gray-700 group-hover:scale-110 transition-all duration-300"
              style={{ backgroundColor: presetColor }}
            ></div>
            <div className="text-xs mt-2 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">{presetColor}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPickerTool;
