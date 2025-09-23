import React, { useState } from 'react';

const QrGeneratorTool = () => {
  const [text, setText] = useState('');
  const [size, setSize] = useState(200);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // 生成二维码
  const generateQRCode = () => {
    if (!text.trim()) return;

    // 使用在线服务生成二维码
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
    setQrCodeUrl(url);
  };

  // 下载二维码
  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">二维码生成器</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="text-input" className="block text-sm font-medium mb-1">输入文本</label>
            <input
              id="text-input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="输入要生成二维码的文本"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="size-input" className="block text-sm font-medium mb-1">二维码尺寸 (px)</label>
            <input
              id="size-input"
              type="range"
              min="100"
              max="500"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>100px</span>
              <span>{size}px</span>
              <span>500px</span>
            </div>
          </div>

          <button
            onClick={generateQRCode}
            disabled={!text.trim()}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:dark:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-200"
          >
            生成二维码
          </button>
        </div>
      </div>

      {qrCodeUrl && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">二维码预览</h2>

          <div className="flex flex-col items-center">
            <img
              src={qrCodeUrl}
              alt="生成的二维码"
              className="border border-gray-300 dark:border-gray-600 rounded-md"
            />
            <button
              onClick={downloadQRCode}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-200"
            >
              下载二维码
            </button>
          </div>

          <div className="mt-4">
            <label htmlFor="qr-url" className="block text-sm font-medium mb-1">二维码URL</label>
            <div className="flex">
              <input
                id="qr-url"
                type="text"
                value={qrCodeUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={() => navigator.clipboard.writeText(qrCodeUrl)}
                className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 px-3 rounded-r-md transition duration-200"
              >
                复制
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QrGeneratorTool;
