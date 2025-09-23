import React, { useRef, useState } from 'react';

const ImageToPdfTool = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onFiles = (files: FileList) => {
    const arr = Array.from(files).map(f => URL.createObjectURL(f));
    setUrls(arr);
  };

  const printToPdf = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">图片 → PDF（打印）</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          将图片转换为PDF格式，支持多张图片合并
        </p>

        <div className="mb-6">
          <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            选择图片文件
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              multiple
              onChange={(e)=>{ if (e.target.files) onFiles(e.target.files); }}
              className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
            <button
              onClick={printToPdf}
              disabled={!urls.length}
              className={`px-5 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 ${
                urls.length
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500 transform hover:-translate-y-0.5'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
              }`}
            >
              打印为 PDF
            </button>
          </div>
        </div>

        {urls.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              预览图片 ({urls.length} 张)
            </h3>
            <div ref={containerRef} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 print:block">
              {urls.map((u, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 transition-all duration-300">
                  <img src={u} className="w-full max-h-[400px] object-contain print:break-before-page rounded" alt={`Preview ${i+1}`} />
                  <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    图片 {i+1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {urls.length === 0 && (
          <div className="mt-8 text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-all duration-300">
            <div className="mx-auto w-16 h-16 text-gray-400 dark:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">请上传图片文件</h4>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              选择图片文件后将显示预览
            </p>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            使用说明
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>选择一张或多张图片文件</li>
            <li>预览图片确认无误后点击&quot;打印为PDF&quot;按钮</li>
            <li>在打印对话框中选择&quot;另存为PDF&quot;选项</li>
            <li>支持JPG、PNG、GIF等常见图片格式</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageToPdfTool;
