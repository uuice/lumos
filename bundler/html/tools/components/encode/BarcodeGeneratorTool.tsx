import React, { useState } from 'react';

const BarcodeGeneratorTool = () => {
  const [text, setText] = useState('');
  const [barcodeType, setBarcodeType] = useState('code128');
  const [barcodeUrl, setBarcodeUrl] = useState('');

  // 生成条形码
  const generateBarcode = () => {
    if (!text.trim()) return;

    // 使用在线服务生成条形码
    const url = `https://barcodeapi.org/api/${barcodeType}/${encodeURIComponent(text)}`;
    setBarcodeUrl(url);
  };

  // 下载条形码
  const downloadBarcode = () => {
    if (!barcodeUrl) return;

    const link = document.createElement('a');
    link.href = barcodeUrl;
    link.download = 'barcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 条形码类型选项
  const barcodeTypes = [
    { value: 'code128', label: 'Code 128' },
    { value: 'code39', label: 'Code 39' },
    { value: 'ean13', label: 'EAN-13' },
    { value: 'ean8', label: 'EAN-8' },
    { value: 'upca', label: 'UPC-A' },
    { value: 'upce', label: 'UPC-E' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">条形码生成器</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="text-input" className="block text-sm font-medium mb-1">输入文本</label>
            <input
              id="text-input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="输入要生成条形码的文本"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="type-select" className="block text-sm font-medium mb-1">条形码类型</label>
            <select
              id="type-select"
              value={barcodeType}
              onChange={(e) => setBarcodeType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {barcodeTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={generateBarcode}
            disabled={!text.trim()}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:dark:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-200"
          >
            生成条形码
          </button>
        </div>
      </div>

      {barcodeUrl && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">条形码预览</h2>

          <div className="flex flex-col items-center">
            <img
              src={barcodeUrl}
              alt="生成的条形码"
              className="border border-gray-300 dark:border-gray-600 rounded-md"
            />
            <button
              onClick={downloadBarcode}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-200"
            >
              下载条形码
            </button>
          </div>

          <div className="mt-4">
            <label htmlFor="barcode-url" className="block text-sm font-medium mb-1">条形码URL</label>
            <div className="flex">
              <input
                id="barcode-url"
                type="text"
                value={barcodeUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={() => navigator.clipboard.writeText(barcodeUrl)}
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

export default BarcodeGeneratorTool;
