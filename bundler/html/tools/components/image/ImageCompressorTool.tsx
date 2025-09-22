import React, { useState, useRef } from 'react';

const ImageCompressorTool = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(80);
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
          setOriginalSize(file.size);
          setImageName(file.name);
          compressImage(event.target.result as string, quality);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = (src: string, quality: number) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // 设置 canvas 尺寸
      canvas.width = img.width;
      canvas.height = img.height;

      // 绘制图片到 canvas
      ctx.drawImage(img, 0, 0);

      // 导出压缩后的图片
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality / 100);
      setCompressedImage(compressedDataUrl);

      // 计算压缩后的大小（近似）
      const base64Size = compressedDataUrl.length;
      const compressedSize = Math.round(base64Size * 0.75); // Base64 转换为字节大小
      setCompressedSize(compressedSize);
    };
    img.src = src;
  };

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality);
    if (originalImage) {
      compressImage(originalImage, newQuality);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const downloadCompressedImage = () => {
    if (!compressedImage) return;

    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = `compressed-${imageName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearImages = () => {
    setOriginalImage(null);
    setCompressedImage(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setImageName('');
    setQuality(80);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const calculateSavings = () => {
    if (originalSize === 0 || compressedSize === 0) return 0;
    return Math.round(((originalSize - compressedSize) / originalSize) * 100);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">图片压缩工具</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          在线压缩 JPG/PNG/WebP 图片，减小文件大小
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
                      支持 JPG, PNG, WebP 格式
                    </p>
                  </div>
                )}
              </div>

              {originalImage && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    压缩质量: {quality}%
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => handleQualityChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>低质量</span>
                    <span>高质量</span>
                  </div>
                </div>
              )}

              <div className="flex space-x-3 mt-4">
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
                      onClick={downloadCompressedImage}
                      disabled={!compressedImage}
                      className={`flex-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        compressedImage
                          ? 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                      }`}
                    >
                      下载压缩图
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 dark:text-white mb-4">压缩结果</h3>

              {compressedImage ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">压缩预览</h4>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <img src={compressedImage} alt="Compressed" className="mx-auto max-h-48" />
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-3">文件信息</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-gray-600 p-3 rounded">
                        <p className="text-xs text-gray-500 dark:text-gray-300">原始文件</p>
                        <p className="font-medium">{formatFileSize(originalSize)}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-600 p-3 rounded">
                        <p className="text-xs text-gray-500 dark:text-gray-300">压缩后</p>
                        <p className="font-medium">{formatFileSize(compressedSize)}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-600 p-3 rounded">
                        <p className="text-xs text-gray-500 dark:text-gray-300">节省空间</p>
                        <p className="font-medium text-green-600">{calculateSavings()}%</p>
                      </div>
                      <div className="bg-white dark:bg-gray-600 p-3 rounded">
                        <p className="text-xs text-gray-500 dark:text-gray-300">质量设置</p>
                        <p className="font-medium">{quality}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
                  <div className="mx-auto w-12 h-12 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h4 className="mt-2 text-sm font-medium text-gray-800 dark:text-white">等待压缩</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    上传图片后将显示压缩结果
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• 支持 JPG, PNG, WebP 格式的图片压缩</li>
            <li>• 调整压缩质量滑块来平衡图片质量和文件大小</li>
            <li>• 压缩过程在浏览器中完成，图片不会上传到服务器</li>
            <li>• 压缩率通常在 50%-90% 之间，具体取决于原始图片</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageCompressorTool;
