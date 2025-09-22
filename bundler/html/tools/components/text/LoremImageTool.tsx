import React, { useState } from 'react';

const LoremImageTool = () => {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [bgColor, setBgColor] = useState('#cccccc');
  const [textColor, setTextColor] = useState('#666666');
  const [text, setText] = useState('');
  const [format, setFormat] = useState('png');
  const [imageUrl, setImageUrl] = useState('');

  const generateImage = () => {
    // 构造占位图片URL (使用占位服务)
    const url = `https://placehold.co/${width}x${height}/${bgColor.replace('#', '')}/${textColor.replace('#', '')}.${format}?text=${encodeURIComponent(text || `${width}×${height}`)}`;
    setImageUrl(url);
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `placeholder-${width}x${height}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 控制面板 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">占位图片生成器</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="width-input" className="block text-sm font-medium mb-1">宽度 (px)</label>
              <input
                id="width-input"
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                min="1"
                max="2000"
              />
            </div>
            
            <div>
              <label htmlFor="height-input" className="block text-sm font-medium mb-1">高度 (px)</label>
              <input
                id="height-input"
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                min="1"
                max="2000"
              />
            </div>
            
            <div>
              <label htmlFor="bg-color" className="block text-sm font-medium mb-1">背景颜色</label>
              <div className="flex items-center">
                <input
                  id="bg-color"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 border-0 rounded cursor-pointer"
                />
                <span className="ml-2 dark:text-gray-300">{bgColor}</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="text-color" className="block text-sm font-medium mb-1">文字颜色</label>
              <div className="flex items-center">
                <input
                  id="text-color"
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-10 h-10 border-0 rounded cursor-pointer"
                />
                <span className="ml-2 dark:text-gray-300">{textColor}</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="custom-text" className="block text-sm font-medium mb-1">自定义文字</label>
              <input
                id="custom-text"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="默认显示尺寸"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="format-select" className="block text-sm font-medium mb-1">图片格式</label>
              <select
                id="format-select"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WebP</option>
              </select>
            </div>
            
            <button
              onClick={generateImage}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"
            >
              生成占位图片
            </button>
          </div>
        </div>
        
        {/* 预览区域 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">预览</h2>
          
          {imageUrl ? (
            <div className="flex flex-col items-center">
              <img 
                src={imageUrl} 
                alt="占位图片预览" 
                className="max-w-full h-auto border border-gray-300 dark:border-gray-600 rounded-md"
              />
              <button
                onClick={downloadImage}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-200"
              >
                下载图片
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-700 rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600">
              <p className="text-gray-500 dark:text-gray-400">点击&#34;生成占位图片&#34;按钮预览</p>
            </div>
          )}
          
          {imageUrl && (
            <div className="mt-4">
              <label htmlFor="image-url" className="block text-sm font-medium mb-1">图片URL</label>
              <div className="flex">
                <input
                  id="image-url"
                  type="text"
                  value={imageUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(imageUrl)}
                  className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 px-3 rounded-r-md transition duration-200"
                >
                  复制
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoremImageTool;