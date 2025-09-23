import React, { useState } from 'react';

const ShadowGeneratorTool = () => {
  const [shadows, setShadows] = useState([
    { id: 1, x: 0, y: 2, blur: 4, spread: 0, color: '#000000', opacity: 20, inset: false }
  ]);

  const addShadow = () => {
    const newId = shadows.length > 0 ? Math.max(...shadows.map(s => s.id)) + 1 : 1;
    setShadows([
      ...shadows,
      { id: newId, x: 0, y: 2, blur: 4, spread: 0, color: '#000000', opacity: 20, inset: false }
    ]);
  };

  const removeShadow = (id: number) => {
    if (shadows.length > 1) {
      setShadows(shadows.filter(shadow => shadow.id !== id));
    }
  };

  const updateShadow = (id: number, field: string, value: any) => {
    setShadows(shadows.map(shadow =>
      shadow.id === id ? { ...shadow, [field]: value } : shadow
    ));
  };

  const generateCss = () => {
    return shadows.map(shadow => {
      const { x, y, blur, spread, color, opacity, inset } = shadow;
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const rgba = `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
      return `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${rgba}`;
    }).join(', ');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`box-shadow: ${generateCss()};`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">盒阴影生成器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          创建和自定义 CSS 盒阴影效果
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-6 bg-white dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">阴影设置</h3>
                <button
                  onClick={addShadow}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md"
                >
                  添加阴影
                </button>
              </div>

              {shadows.map((shadow) => (
                <div key={shadow.id} className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl p-4 mb-4 border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-800 dark:text-white">阴影 {shadow.id}</h4>
                    {shadows.length > 1 && (
                      <button
                        onClick={() => removeShadow(shadow.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-all duration-300"
                      >
                        删除
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor={`x-${shadow.id}`}>X 偏移</label>
                      <input
                        id={`x-${shadow.id}`}
                        type="number"
                        value={shadow.x}
                        onChange={(e) => updateShadow(shadow.id, 'x', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor={`y-${shadow.id}`}>Y 偏移</label>
                      <input
                        id={`y-${shadow.id}`}
                        type="number"
                        value={shadow.y}
                        onChange={(e) => updateShadow(shadow.id, 'y', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor={`blur-${shadow.id}`}>模糊半径</label>
                      <input
                        id={`blur-${shadow.id}`}
                        type="number"
                        value={shadow.blur}
                        onChange={(e) => updateShadow(shadow.id, 'blur', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor={`spread-${shadow.id}`}>扩展半径</label>
                      <input
                        id={`spread-${shadow.id}`}
                        type="number"
                        value={shadow.spread}
                        onChange={(e) => updateShadow(shadow.id, 'spread', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor={`color-${shadow.id}`}>颜色</label>
                      <input
                        id={`color-${shadow.id}`}
                        type="color"
                        value={shadow.color}
                        onChange={(e) => updateShadow(shadow.id, 'color', e.target.value)}
                        className="w-full h-10 border-0 rounded-lg cursor-pointer bg-white dark:bg-gray-700 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">透明度: {shadow.opacity}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={shadow.opacity}
                        onChange={(e) => updateShadow(shadow.id, 'opacity', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`inset-${shadow.id}`}
                      checked={shadow.inset}
                      onChange={(e) => updateShadow(shadow.id, 'inset', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700"
                    />
                    <label htmlFor={`inset-${shadow.id}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      内阴影
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 bg-white dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-3">预览</h3>
              <div
                className="h-48 rounded-xl flex items-center justify-center bg-white dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 transition-all duration-300"
                style={{ boxShadow: generateCss() }}
              >
                <p className="text-gray-800 dark:text-white font-medium">阴影预览</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-3">CSS 代码</h3>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 mb-3 transition-all duration-300">
                <pre className="text-green-400 text-sm overflow-x-auto font-mono">
                  {`box-shadow: ${generateCss()};`}
                </pre>
              </div>
              <button
                onClick={copyToClipboard}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md"
              >
                复制到剪贴板
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShadowGeneratorTool;
