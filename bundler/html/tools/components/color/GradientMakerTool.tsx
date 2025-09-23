import React, { useState } from "react";

const GradientMakerTool = () => {
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#8b5cf6");
  const [angle, setAngle] = useState(45);
  const [gradient, setGradient] = useState("");

  // 生成渐变CSS
  const generateGradient = () => {
    const css = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    setGradient(css);
  };

  // 复制CSS到剪贴板
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`background: ${gradient};`);
  };

  React.useEffect(() => {
    generateGradient();
  }, [color1, color2, angle]);

  return (
    <div className="space-y-6 p-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
          <label htmlFor="color1" className="block mb-3 font-medium text-gray-800 dark:text-white">起始颜色:</label>
          <div className="flex items-center space-x-4">
            <input
              id="color1"
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-16 h-16 cursor-pointer rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm"
            />
            <div className="text-xl font-mono text-gray-800 dark:text-white">{color1}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
          <label htmlFor="color2" className="block mb-3 font-medium text-gray-800 dark:text-white">结束颜色:</label>
          <div className="flex items-center space-x-4">
            <input
              id="color2"
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-16 h-16 cursor-pointer rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm"
            />
            <div className="text-xl font-mono text-gray-800 dark:text-white">{color2}</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
        <label htmlFor="angle" className="block mb-3 font-medium text-gray-800 dark:text-white">角度: {angle}°</label>
        <input
          id="angle"
          type="range"
          min="0"
          max="360"
          value={angle}
          onChange={(e) => setAngle(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
        />
      </div>

      <div className="flex space-x-3">
        <button
          onClick={generateGradient}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md"
        >
          生成渐变
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!gradient}
          className={`px-4 py-2 rounded-lg transition-all duration-300 shadow-md ${gradient ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" : "bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 text-gray-500 dark:text-gray-300 cursor-not-allowed"}`}
        >
          复制CSS
        </button>
      </div>

      {gradient && (
        <div className="bg-white dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
          <label className="block mb-3 font-medium text-gray-800 dark:text-white" htmlFor="gradientPreview">渐变预览:</label>
          <div
            className="w-full h-32 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 mb-4 transition-all duration-300"
            style={{ background: gradient }}
          ></div>
          <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg transition-all duration-300">
            <code className="font-mono break-all text-gray-800 dark:text-white">background: {gradient};</code>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
        <p className="font-semibold text-gray-800 dark:text-white mb-3">使用说明:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
          <li className="flex items-start">
            <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
            选择起始颜色和结束颜色
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
            调整角度控制渐变方向
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
            复制生成的CSS代码到您的项目中
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GradientMakerTool;
