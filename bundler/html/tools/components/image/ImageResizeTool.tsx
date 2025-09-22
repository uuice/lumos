import React, { useState, useRef } from 'react';

const ImageResizeTool = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [newWidth, setNewWidth] = useState(0);
  const [newHeight, setNewHeight] = useState(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [imageName, setImageName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 检查文件类型
      if (!file.type.match('image.*')) {
        alert('请选择图片文件');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setOriginalImage(event.target.result as string);
          setImageName(file.name);

          // 获取原始图片尺寸
          const img = new Image();
          img.onload = () => {
            setOriginalWidth(img.width);
            setOriginalHeight(img.height);
            setNewWidth(img.width);
            setNewHeight(img.height);
          };
          img.src = event.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeImage = () => {
    if (!originalImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      const resizedDataUrl = canvas.toDataURL('image/png');
      setResizedImage(resizedDataUrl);
    };
    img.src = originalImage;
  };

  const handleWidthChange = (width: number) => {
    setNewWidth(width);
    if (maintainAspectRatio && originalWidth > 0) {
      const ratio = originalHeight / originalWidth;
      setNewHeight(Math.round(width * ratio));
    }
  };

  const handleHeightChange = (height: number) => {
    setNewHeight(height);
    if (maintainAspectRatio && originalHeight > 0) {
      const ratio = originalWidth / originalHeight;
      setNewWidth(Math.round(height * ratio));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const downloadResizedImage = () => {
    if (!resizedImage) return;

    const link = document.createElement('a');
    link.href = resizedImage;
    link.download = `resized-${imageName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearImages = () => {
    setOriginalImage(null);
    setResizedImage(null);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setNewWidth(0);
    setNewHeight(0);
    setImageName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const swapDimensions = () => {
    const temp = newWidth;
    setNewWidth(newHeight);
    setNewHeight(temp);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">图片尺寸调整工具</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          在线调整图片尺寸，支持等比缩放
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
                {originalImage ? (
                  <div>
                    <img src={originalImage} alt="Original" className="mx-auto max-h-40" />
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
                      支持 JPG, PNG, WebP, GIF 格式
                    </p>
                  </div>
                )}
              </div>

              {originalImage && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      原始尺寸: {originalWidth} × {originalHeight} 像素
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        宽度 (px)
                      </label>
                      <input
                        type="number"
                        value={newWidth}
                        onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        高度 (px)
                      </label>
                      <input
                        type="number"
                        value={newHeight}
                        onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="maintain-aspect"
                      checked={maintainAspectRatio}
                      onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="maintain-aspect" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      保持宽高比
                    </label>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={swapDimensions}
                      className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      交换宽高
                    </button>
                  </div>
                </div>
              )}

              <div className="flex space-x-3 mt-6">
                {!originalImage ? (
                  <button
                    onClick={triggerFileInput}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    选择图片
                  </button>
                ) : (
                  <>
                    <button
                      onClick={clearImages}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    >
                      清除
                    </button>
                    <button
                      onClick={resizeImage}
                      disabled={!originalImage || newWidth <= 0 || newHeight <= 0}
                      className={`flex-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        originalImage && newWidth > 0 && newHeight > 0
                          ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                      }`}
                    >
                      调整尺寸
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 dark:text-white mb-4">调整结果</h3>

              {resizedImage ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">调整后预览</h4>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <img src={resizedImage} alt="Resized" className="mx-auto max-h-48" />
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-3">尺寸信息</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-gray-600 p-3 rounded">
                        <p className="text-xs text-gray-500 dark:text-gray-300">原始尺寸</p>
                        <p className="font-medium">{originalWidth} × {originalHeight}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-600 p-3 rounded">
                        <p className="text-xs text-gray-500 dark:text-gray-300">新尺寸</p>
                        <p className="font-medium">{newWidth} × {newHeight}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-600 p-3 rounded">
                        <p className="text-xs text-gray-500 dark:text-gray-300">缩放比例</p>
                        <p className="font-medium">
                          {originalWidth > 0 ? Math.round((newWidth / originalWidth) * 100) : 0}%
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-600 p-3 rounded">
                        <p className="text-xs text-gray-500 dark:text-gray-300">宽高比</p>
                        <p className="font-medium">
                          {newWidth > 0 && newHeight > 0 ?
                            (newWidth / newHeight).toFixed(2) : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={downloadResizedImage}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    下载调整后图片
                  </button>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
                  <div className="mx-auto w-12 h-12 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h4 className="mt-2 text-sm font-medium text-gray-800 dark:text-white">等待调整</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    设置新尺寸后将显示调整结果
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• 支持 JPG, PNG, WebP, GIF 格式的图片尺寸调整</li>
            <li>• 启用"保持宽高比"可自动计算对应尺寸</li>
            <li>• 图片处理在浏览器中完成，不会上传到服务器</li>
            <li>• 调整后的图片默认保存为 PNG 格式</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageResizeTool;
