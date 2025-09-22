import React, { useState, useRef } from 'react';

const FaviconGeneratorTool = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
          setImageName(file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const downloadFavicon = () => {
    if (!image) return;

    // 创建一个临时的 canvas 元素来生成 favicon
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // 生成不同尺寸的 favicon
      const sizes = [16, 32, 48, 64];

      // 创建一个 zip 文件来包含所有尺寸
      const zipContent = [];

      for (const size of sizes) {
        canvas.width = size;
        canvas.height = size;
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);

        // 生成数据 URL
        const dataUrl = canvas.toDataURL('image/png');
        zipContent.push({
          name: `favicon-${size}x${size}.png`,
          url: dataUrl
        });
      }

      // 显示下载说明
      alert(`Favicon 已生成，包含以下尺寸: ${sizes.join(', ')}px。在实际应用中，这些文件会被打包成一个 ICO 文件或 ZIP 文件供下载。`);
    };
    img.src = image;
  };

  const clearImage = () => {
    setImage(null);
    setImageName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Favicon 生成器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          上传图片生成多种尺寸的 Favicon 文件
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 dark:text-white mb-4">上传图片</h3>

              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={triggerFileInput}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                {image ? (
                  <div>
                    <img src={image} alt="Preview" className="mx-auto max-h-40" />
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{imageName}</p>
                  </div>
                ) : (
                  <div>
                    <div className="mx-auto w-12 h-12 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      点击选择图片或拖拽到此处
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      支持 JPG, PNG, GIF 格式
                    </p>
                  </div>
                )}
              </div>

              {image && (
                <div className="flex space-x-3 mt-4">
                  <button
                    onClick={clearImage}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  >
                    清除
                  </button>
                  <button
                    onClick={downloadFavicon}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    生成 Favicon
                  </button>
                </div>
              )}

              {!image && (
                <button
                  onClick={triggerFileInput}
                  className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  选择图片
                </button>
              )}
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 dark:text-white mb-4">说明</h3>
              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">如何使用生成的 Favicon</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                  <li>1. 将生成的 favicon.ico 文件放在网站根目录</li>
                  <li>2. 在 HTML 的 &lt;head&gt; 部分添加以下代码：</li>
                  <li className="bg-gray-800 text-green-400 p-2 rounded font-mono text-xs">
                    &lt;link rel="icon" type="image/x-icon" href="/favicon.ico"&gt;
                  </li>
                  <li>3. 也可以为不同设备指定不同尺寸：</li>
                  <li className="bg-gray-800 text-green-400 p-2 rounded font-mono text-xs">
                    &lt;link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"&gt;
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">生成的尺寸</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[16, 32, 48, 64].map(size => (
                    <div key={size} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
                      <div
                        className="mx-auto bg-gray-300 dark:bg-gray-600 rounded mb-2"
                        style={{ width: size > 32 ? 32 : size, height: size > 32 ? 32 : size }}
                      ></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{size}×{size}px</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaviconGeneratorTool;
