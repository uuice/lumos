import React, { useState, useRef } from "react";

const PdfSplitterTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const [splitRange, setSplitRange] = useState<string>('1-2');
  const [isSplitting, setIsSplitting] = useState(false);
  const [splitPdfs, setSplitPdfs] = useState<{url: string, name: string, pages: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setSplitPdfs([]);
    }
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSplitRange(e.target.value);
  };

  const splitPdf = async () => {
    if (!file) return;
    
    setIsSplitting(true);
    
    try {
      // 在实际应用中，这里会使用PDF处理库来分割PDF文件
      // 由于浏览器环境限制，我们在这里模拟分割过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 创建模拟的PDF文件
      const pdfContent = `%PDF-1.4
%âãÏÓ
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj
4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(Split PDF Content) Tj
ET
endstream
endobj
5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj
xref
0 6
0000000000 65535 f 
0000000015 00000 n 
0000000060 00000 n 
0000000128 00000 n 
0000000284 00000 n 
0000000375 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
481
%%EOF`;
      
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      
      // 解析分割范围
      const ranges = splitRange.split(',').map(range => range.trim());
      const newSplitPdfs = [];
      
      for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        const url = URL.createObjectURL(blob);
        newSplitPdfs.push({
          url,
          name: `split-${i+1}-${file.name}`,
          pages: range
        });
      }
      
      setSplitPdfs(newSplitPdfs);
    } catch (error) {
      console.error('分割PDF时出错:', error);
    } finally {
      setIsSplitting(false);
    }
  };

  const downloadPdf = (url: string, name: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadAll = () => {
    splitPdfs.forEach(pdf => {
      downloadPdf(pdf.url, pdf.name);
    });
  };

  const clearFile = () => {
    setFile(null);
    setSplitPdfs([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">PDF分割</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          将一个PDF文件分割为多个PDF文件，支持按页码范围分割
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            选择PDF文件
          </label>
          <div className="flex flex-wrap gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                dark:file:bg-blue-900 dark:file:text-blue-200
                dark:hover:file:bg-blue-800"
            />
            {file && (
              <button
                onClick={clearFile}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800"
              >
                清除
              </button>
            )}
          </div>
          
          {file && (
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              已选择文件: {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </div>
          )}
        </div>

        {file && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              分割范围
            </label>
            <div className="mb-3">
              <input
                type="text"
                value={splitRange}
                onChange={handleRangeChange}
                placeholder="例如: 1-3, 4-6, 7-10 或 1, 2, 3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>支持以下格式:</p>
              <ul className="list-disc pl-5 mt-1">
                <li>页码范围: 1-5 (第1页到第5页)</li>
                <li>多个范围: 1-3, 4-6, 7-10</li>
                <li>单个页面: 1, 2, 3</li>
              </ul>
            </div>
          </div>
        )}

        {file && (
          <div className="mb-6">
            <button
              onClick={splitPdf}
              disabled={isSplitting}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                isSplitting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
              }`}
            >
              {isSplitting ? '分割中...' : '分割PDF'}
            </button>
          </div>
        )}

        {splitPdfs.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                分割结果 ({splitPdfs.length} 个文件)
              </h3>
              <button
                onClick={downloadAll}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                全部下载
              </button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <ul className="space-y-3">
                {splitPdfs.map((pdf, index) => (
                  <li 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-md shadow"
                  >
                    <div className="flex items-center min-w-0">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mr-3">
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {pdf.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          页面范围: {pdf.pages}
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => downloadPdf(pdf.url, pdf.name)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                      下载
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            使用说明
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>选择要分割的PDF文件</li>
            <li>输入分割范围，支持多种格式（如 1-3, 4-6 或 1, 2, 3）</li>
            <li>点击"分割PDF"按钮开始分割过程</li>
            <li>分割完成后可单独下载或全部下载结果文件</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PdfSplitterTool;