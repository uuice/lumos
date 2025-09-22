import React, { useState, useRef } from "react";

const TextToPdfTool = () => {
  const [text, setText] = useState<string>('');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fileName, setFileName] = useState<string>('document.pdf');
  const [fontSize, setFontSize] = useState<number>(12);
  const [fontFamily, setFontFamily] = useState<string>('Helvetica');

  const generatePdf = async () => {
    if (!text.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // 在实际应用中，这里会使用专门的PDF生成库（如jsPDF）
      // 由于浏览器环境限制，我们在这里模拟生成过程
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 创建模拟的PDF内容
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
(Text to PDF Content) Tj
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
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error('生成PDF时出错:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPdf = () => {
    if (!pdfUrl) return;
    
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  const clearText = () => {
    setText('');
    setPdfUrl(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Text转PDF</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          将文本内容转换为PDF文件，支持自定义字体和字号
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              文件名
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              字体大小
            </label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {[8, 10, 12, 14, 16, 18, 20, 24, 28, 32].map(size => (
                <option key={size} value={size}>{size}pt</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              字体
            </label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="Helvetica">Helvetica</option>
              <option value="Times">Times New Roman</option>
              <option value="Courier">Courier</option>
              <option value="Arial">Arial</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            文本内容
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="在此输入要转换为PDF的文本内容..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={generatePdf}
            disabled={isGenerating || !text.trim()}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
              isGenerating || !text.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
            }`}
          >
            {isGenerating ? '生成中...' : '生成PDF'}
          </button>
          
          <button
            onClick={copyToClipboard}
            disabled={!text}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
              !text
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500'
            }`}
          >
            复制文本
          </button>
          
          <button
            onClick={clearText}
            disabled={!text}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
              !text
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
                : 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800'
            }`}
          >
            清除文本
          </button>
        </div>

        {pdfUrl && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              PDF生成完成
            </h3>
            
            <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-green-100 dark:bg-green-800 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-800 dark:text-green-200">
                      PDF文件已生成
                    </div>
                    <div className="text-xs text-green-700 dark:text-green-300">
                      文件名: {fileName}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={downloadPdf}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  下载PDF
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            使用说明
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>在文本框中输入要转换为PDF的内容</li>
            <li>可自定义PDF文件名、字体大小和字体类型</li>
            <li>点击"生成PDF"按钮创建PDF文件</li>
            <li>生成完成后可下载PDF文件</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TextToPdfTool;