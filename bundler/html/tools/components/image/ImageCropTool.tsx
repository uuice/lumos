import React, { useState, useRef } from 'react';

const ImageCropTool = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState('');
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match('image.*')) {
        alert('请选择图片文件');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setOriginalImage(event.target.result as string);
          setImageName(file.name.split('.')[0] || 'image');
          setCroppedImage(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !imageRef.current) return;

    const container = imageRef.current.parentElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width - cropArea.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height - cropArea.height));

    setCropArea(prev => ({
      ...prev,
      x,
      y
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const cropImage = () => {
    if (!originalImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // 计算裁剪区域相对于原图的比例
      const scaleX = img.width / (imageRef.current?.clientWidth || img.width);
      const scaleY = img.height / (imageRef.current?.clientHeight || img.height);

      canvas.width = cropArea.width * scaleX;
      canvas.height = cropArea.height * scaleY;

      ctx.drawImage(
        img,
        cropArea.x * scaleX,
        cropArea.y * scaleY,
        cropArea.width * scaleX,
        cropArea.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const croppedDataUrl = canvas.toDataURL('image/png');
      setCroppedImage(croppedDataUrl);
    };
    img.src = originalImage;
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const downloadCroppedImage = () => {
    if (!croppedImage) return;

    const link = document.createElement('a');
    link.href = croppedImage;
    link.download = `cropped-${imageName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearImages = () => {
    setOriginalImage(null);
    setCroppedImage(null);
    setImageName('');
    setCropArea({ x: 0, y: 0, width: 100, height: 100 });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">图片裁剪工具</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          在线裁剪图片，支持自定义裁剪区域
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
                <div className="mt-6">
                  <div className="relative inline-block">
                    <img
                      ref={imageRef}
                      src={originalImage}
                      alt="For cropping"
                      className="max-w-full max-h-96"
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    />
                    {originalImage && (
                      <div
                        className="absolute border-2 border-dashed border-blue-500 cursor-move"
                        style={{
                          left: `${cropArea.x}px`,
                          top: `${cropArea.y}px`,
                          width: `${cropArea.width}px`,
                          height: `${cropArea.height}px`
                        }}
                      >
                        <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full cursor-nwse-resize"></div>
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full cursor-nesw-resize"></div>
                        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-500 rounded-full cursor-nesw-resize"></div>
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-500 rounded-full cursor-nwse-resize"></div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        宽度 (px)
                      </label>
                      <input
                        type="number"
                        value={cropArea.width}
                        onChange={(e) => setCropArea(prev => ({ ...prev, width: parseInt(e.target.value) || 100 }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        高度 (px)
                      </label>
                      <input
                        type="number"
                        value={cropArea.height}
                        onChange={(e) => setCropArea(prev => ({ ...prev, height: parseInt(e.target.value) || 100 }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
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
                      onClick={cropImage}
                      disabled={!originalImage}
                      className={`flex-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        originalImage
                          ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                      }`}
                    >
                      裁剪图片
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 dark:text-white mb-4">裁剪结果</h3>

              {croppedImage ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">裁剪预览</h4>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <img src={croppedImage} alt="Cropped" className="mx-auto max-h-48" />
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-3">裁剪信息</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-gray-600 p-3 rounded">
                        <p className="text-xs text-gray-500 dark:text-gray-300">裁剪区域</p>
                        <p className="font-medium">{cropArea.width} × {cropArea.height}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-600 p-3 rounded">
                        <p className="text-xs text-gray-500 dark:text-gray-300">位置</p>
                        <p className="font-medium">X: {cropArea.x}, Y: {cropArea.y}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={downloadCroppedImage}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    下载裁剪后图片
                  </button>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
                  <div className="mx-auto w-12 h-12 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h4 className="mt-2 text-sm font-medium text-gray-800 dark:text-white">等待裁剪</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    调整裁剪区域后将显示裁剪结果
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• 拖拽图片上的蓝色框来调整裁剪区域</li>
            <li>• 使用输入框精确设置裁剪区域的尺寸</li>
            <li>• 裁剪处理在浏览器中完成，图片不会上传到服务器</li>
            <li>• 裁剪后的图片默认保存为 PNG 格式</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageCropTool;
