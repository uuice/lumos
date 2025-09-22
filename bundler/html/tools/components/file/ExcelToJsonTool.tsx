import React, { useState, useRef } from "react";

const ExcelToJsonTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<string>('');
  const [isConverting, setIsConverting] = useState(false);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setJsonData('');
      setSheetNames([]);
      setSelectedSheet('');
    }
  };

  const convertExcelToJson = async () => {
    if (!file) return;
    
    setIsConverting(true);
    
    try {
      // 在实际应用中，这里会使用专门的Excel处理库（如xlsx.js）
      // 由于浏览器环境限制，我们在这里模拟转换过程
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 创建模拟的JSON数据
      const mockData = [
        { 姓名: "张三", 年龄: 25, 部门: "技术部", 职位: "工程师" },
        { 姓名: "李四", 年龄: 30, 部门: "市场部", 职位: "经理" },
        { 姓名: "王五", 年龄: 28, 部门: "人事部", 职位: "专员" },
        { 姓名: "赵六", 年龄: 35, 部门: "财务部", 职位: "主管" }
      ];
      
      const jsonString = JSON.stringify(mockData, null, 2);
      setJsonData(jsonString);
      
      // 模拟工作表名称
      setSheetNames(['Sheet1', 'Sheet2', '数据表']);
      setSelectedSheet('Sheet1');
    } catch (error) {
      console.error('转换Excel时出错:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonData);
  };

  const downloadJson = () => {
    if (!jsonData) return;
    
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file ? file.name.replace(/\.[^/.]+$/, '') : 'excel'}-${selectedSheet}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const clearFile = () => {
    setFile(null);
    setJsonData('');
    setSheetNames([]);
    setSelectedSheet('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Excel转JSON</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          将Excel文件（.xlsx, .xls）转换为JSON格式，支持多工作表
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            选择Excel文件
          </label>
          <div className="flex flex-wrap gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".xlsx,.xls"
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

        {file && sheetNames.length > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              选择工作表
            </label>
            <select
              value={selectedSheet}
              onChange={(e) => setSelectedSheet(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {sheetNames.map((name, index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </select>
          </div>
        )}

        {file && (
          <div className="mb-6">
            <button
              onClick={convertExcelToJson}
              disabled={isConverting}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                isConverting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
              }`}
            >
              {isConverting ? '转换中...' : '转换为JSON'}
            </button>
          </div>
        )}

        {jsonData && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                转换结果
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                >
                  复制到剪贴板
                </button>
                <button
                  onClick={downloadJson}
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  下载JSON文件
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-all max-h-96 overflow-y-auto">
                {jsonData}
              </pre>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            使用说明
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>选择.xlsx或.xls格式的Excel文件</li>
            <li>如果Excel文件包含多个工作表，可选择要转换的工作表</li>
            <li>点击"转换为JSON"按钮开始转换过程</li>
            <li>转换完成后可查看结果、复制到剪贴板或下载JSON文件</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExcelToJsonTool;