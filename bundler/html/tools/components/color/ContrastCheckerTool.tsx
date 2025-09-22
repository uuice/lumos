import React, { useState, useEffect } from 'react';

const ContrastCheckerTool = () => {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [contrastRatio, setContratRatio] = useState(0);
  const [aaaCompliance, setAaaCompliance] = useState(false);
  const [aaCompliance, setAaCompliance] = useState(false);

  // 计算相对亮度
  const calculateLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  };

  // RGB转换
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  // 计算对比度
  const calculateContrast = () => {
    const bgRgb = hexToRgb(backgroundColor);
    const textRgb = hexToRgb(textColor);

    const bgLuminance = calculateLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    const textLuminance = calculateLuminance(textRgb.r, textRgb.g, textRgb.b);

    const ratio = (Math.max(bgLuminance, textLuminance) + 0.05) / (Math.min(bgLuminance, textLuminance) + 0.05);
    setContratRatio(parseFloat(ratio.toFixed(2)));

    // 检查合规性 (WCAG 2.0)
    setAaaCompliance(ratio >= 7);
    setAaCompliance(ratio >= 4.5);
  };

  useEffect(() => {
    calculateContrast();
  }, [backgroundColor, textColor]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">对比度检测工具</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          检测文本与背景颜色的对比度是否符合 WCAG 2.0 标准
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              背景颜色
            </label>
            <div className="flex items-center">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-12 h-12 border-0 rounded cursor-pointer"
              />
              <input
                type="text"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="ml-3 flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              文本颜色
            </label>
            <div className="flex items-center">
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-12 h-12 border-0 rounded cursor-pointer"
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="ml-3 flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div
            className="p-8 rounded-lg text-center"
            style={{ backgroundColor: backgroundColor, color: textColor }}
          >
            <p className="text-lg font-medium">对比度示例文本</p>
            <p className="mt-2">The quick brown fox jumps over the lazy dog</p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="font-medium text-gray-800 dark:text-white mb-2">对比度结果</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{contrastRatio}:1</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">对比度比率</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${aaCompliance ? 'text-green-600' : 'text-red-600'}`}>
                {aaCompliance ? '✓' : '✗'} AA 级
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">4.5:1 或更高</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${aaaCompliance ? 'text-green-600' : 'text-red-600'}`}>
                {aaaCompliance ? '✓' : '✗'} AAA 级
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">7:1 或更高</p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium text-gray-800 dark:text-white mb-2">WCAG 2.0 标准</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• AA 级 (常规文本): 对比度至少 4.5:1</li>
              <li>• AA 级 (大文本): 对比度至少 3:1</li>
              <li>• AAA 级 (常规文本): 对比度至少 7:1</li>
              <li>• AAA 级 (大文本): 对比度至少 4.5:1</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContrastCheckerTool;
