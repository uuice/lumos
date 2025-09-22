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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">盒阴影生成器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          创建和自定义 CSS 盒阴影效果
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-800 dark:text-white">阴影设置</h3>
                <button
                  onClick={addShadow}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  添加阴影
                </button>
              </div>

              {shadows.map((shadow) => (
                <div key={shadow.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-800 dark:text-white">阴影 {shadow.id}</h4>
                    {shadows.length > 1 && (
                      <button
                        onClick={() => removeShadow(shadow.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        删除
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-gray-700 dark:text-gray-300 mb-1">X 偏移</label>
                      <input
                        type="number"
                        value={shadow.x}
                        onChange={(e) => updateShadow(shadow.id, 'x', parseInt(e.target.value) || 0)}
                        className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 dark:text-gray-300 mb-1">Y 偏移</label>
                      <input
                        type="number"
                        value={shadow.y}
                        onChange={(e) => updateShadow(shadow.id, 'y', parseInt(e.target.value) || 0)}
                        className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 dark:text-gray-300 mb-1">模糊半径</label>
                      <input
                        type="number"
                        value={shadow.blur}
                        onChange={(e) => updateShadow(shadow.id, 'blur', parseInt(e.target.value) || 0)}
                        className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 dark:text-gray-300 mb-1">扩展半径</label>
                      <input
                        type="number"
                        value={shadow.spread}
                        onChange={(e) => updateShadow(shadow.id, 'spread', parseInt(e.target.value) || 0)}
                        className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-gray-700 dark:text-gray-300 mb-1">颜色</label>
                      <input
                        type="color"
                        value={shadow.color}
                        onChange={(e) => updateShadow(shadow.id, 'color', e.target.value)}
                        className="w-full h-8 border-0 rounded cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 dark:text-gray-300 mb-1">透明度: {shadow.opacity}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={shadow.opacity}
                        onChange={(e) => updateShadow(shadow.id, 'opacity', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`inset-${shadow.id}`}
                      checked={shadow.inset}
                      onChange={(e) => updateShadow(shadow.id, 'inset', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 dark:text-white mb-3">预览</h3>
              <div
                className="h-48 rounded-lg flex items-center justify-center bg-white dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600"
                style={{ boxShadow: generateCss() }}
              >
                <p className="text-gray-800 dark:text-white font-medium">阴影预览</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-800 dark:text-white mb-3">CSS 代码</h3>
              <div className="bg-gray-800 rounded-lg p-4 mb-3">
                <pre className="text-green-400 text-sm overflow-x-auto">
                  {`box-shadow: ${generateCss()};`}
                </pre>
              </div>
              <button
                onClick={copyToClipboard}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
