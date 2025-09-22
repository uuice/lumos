import React, { useState, useRef } from 'react';

const ImageConvertTool = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [originalFormat, setOriginalFormat] = useState('');
  const [targetFormat, setTargetFormat] = useState('png');
  const [imageName, setImageName] = useState('');
  const [converting, setConverting] = useState(false);
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
          setOriginalFormat(file.type.split('/')[1].toUpperCase());
          setImageName(file.name.split('.')[0] || 'image');
          setConvertedImage(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImage = () => {
    if (!originalImage) return;

    setConverting(true);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setConverting(false);
      return;
    }

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      try {
        let mimeType = 'image/png';
        if (targetFormat === 'jpg') mimeType = 'image/jpeg';
        if (targetFormat === 'webp') mimeType = 'image/webp';

        const convertedDataUrl = canvas.toDataURL(mimeType, targetFormat === 'jpg' ? 0.9 : undefined);
        setConvertedImage(convertedDataUrl);
      } catch (error) {
        alert('转换失败，请尝试其他格式');
        console.error('转换错误:', error);
      } finally {
        setConverting(false);
      }
    };
    img.src = originalImage;
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const downloadConvertedImage = () => {
    if (!convertedImage) return;

    const link = document.createElement('a');
    link.href = convertedImage;
    link.download = `${imageName}.${targetFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearImages = () => {
    setOriginalImage(null);
    setConvertedImage(null);
    setOriginalFormat('');
    setImageName('');
    setTargetFormat('png');
    setConverting(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">图片格式转换工具</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          在线转换图片格式：PNG ↔ WebP ↔ JPG
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
                      原始格式: {originalFormat}
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      目标格式
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['png', 'jpg', 'webp'].map((format) => (
                        <button
                          key={format}
                          onClick={() => setTargetFormat(format)}
                          className={`py-2 px-4 rounded-md text-center capitalize ${
                            targetFormat === format
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                          }`}
                        >
                          {format}
                        </button>
                      ))}
                    </div>
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
                      onClick={convertImage}
                      disabled={!originalImage || converting}
                      className={`flex-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        originalImage && !converting
                          ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                      }`}
                    >
                      {converting ? '转换中...' : '转换格式'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 dark:text-white mb-4">转换结果</h3>

              {convertedImage ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">转换后预览</h4>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <img src={convertedImage} alt="Converted" className="mx-auto max-h-48" />
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-3">格式信息</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-gray-600 p-3 rounded">
                        <p className="text-xs text-gray-500 dark:text-gray-300">原始格式</p>
                        <p className="font-medium">{originalFormat}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-600 p-3 rounded">
                        <p className="text-xs text-gray-500 dark:text-gray-300">目标格式</p>
                        <p className="font-medium uppercase">{targetFormat}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={downloadConvertedImage}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    下载转换后图片
                  </button>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
                  <div className="mx-auto w-12 h-12 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h4 className="mt-2 text-sm font-medium text-gray-800 dark:text-white">等待转换</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    选择目标格式后将显示转换结果
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">格式特点</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white dark:bg-gray-700 p-3 rounded">
              <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-1">PNG</h4>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• 无损压缩</li>
                <li>• 支持透明背景</li>
                <li>• 文件相对较大</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-700 p-3 rounded">
              <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-1">JPG</h4>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• 有损压缩</li>
                <li>• 文件较小</li>
                <li>• 不支持透明</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-700 p-3 rounded">
              <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-1">WebP</h4>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• 现代格式</li>
                <li>• 更小文件</li>
                <li>• 支持透明和动画</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageConvertTool;
