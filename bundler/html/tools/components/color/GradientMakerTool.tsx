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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="color1" className="block mb-2 font-medium">起始颜色:</label>
          <div className="flex items-center space-x-4">
            <input
              id="color1"
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-16 h-16 cursor-pointer"
            />
            <div className="text-xl font-mono">{color1}</div>
          </div>
        </div>

        <div>
          <label htmlFor="color2" className="block mb-2 font-medium">结束颜色:</label>
          <div className="flex items-center space-x-4">
            <input
              id="color2"
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-16 h-16 cursor-pointer"
            />
            <div className="text-xl font-mono">{color2}</div>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="angle" className="block mb-2 font-medium">角度: {angle}°</label>
        <input
          id="angle"
          type="range"
          min="0"
          max="360"
          value={angle}
          onChange={(e) => setAngle(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex space-x-3">
        <button
          onClick={generateGradient}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          生成渐变
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!gradient}
          className={`px-4 py-2 rounded-lg ${gradient ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"}`}
        >
          复制CSS
        </button>
      </div>

      {gradient && (
        <div>
          <label className="block mb-2 font-medium">渐变预览:</label>
          <div
            className="w-full h-32 rounded-lg shadow-md border border-gray-300 mb-4"
            style={{ background: gradient }}
          ></div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <code className="font-mono break-all">background: {gradient};</code>
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p className="font-semibold">使用说明:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>选择起始颜色和结束颜色</li>
          <li>调整角度控制渐变方向</li>
          <li>复制生成的CSS代码到您的项目中</li>
        </ul>
      </div>
    </div>
  );
};

export default GradientMakerTool;
