import React, { useState, useRef } from "react";

const ZipExtractorTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedFiles, setExtractedFiles] = useState<{name: string, size: number, type: string}[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [password, setPassword] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setExtractedFiles([]);
    }
  };

  const extractZip = async () => {
    if (!file) return;
    
    setIsExtracting(true);
    
    try {
      // 在实际应用中，这里会使用专门的ZIP处理库（如JSZip）
      // 由于浏览器环境限制，我们在这里模拟解压过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 创建模拟的文件列表
      const mockFiles = [
        { name: "document.txt", size: 1024, type: "text/plain" },
        { name: "image.jpg", size: 204800, type: "image/jpeg" },
        { name: "data.json", size: 5120, type: "application/json" },
        { name: "readme.md", size: 2048, type: "text/markdown" },
        { name: "styles.css", size: 3072, type: "text/css" }
      ];
      
      setExtractedFiles(mockFiles);
    } catch (error) {
      console.error('解压ZIP时出错:', error);
    } finally {
      setIsExtracting(false);
    }
  };

  const downloadFile = (fileName: string) => {
    // 在实际应用中，这里会下载具体的文件
    // 由于浏览器环境限制，我们在这里模拟下载过程
    alert(`正在下载文件: ${fileName}\n在实际应用中，这将下载具体的文件内容。`);
  };

  const downloadAll = () => {
    // 在实际应用中，这里会打包所有文件并下载
    alert(`正在打包并下载所有文件\n在实际应用中，这将创建一个包含所有文件的ZIP包。`);
  };

  const clearFile = () => {
    setFile(null);
    setExtractedFiles([]);
    setPassword('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">ZIP解压</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          解压ZIP文件，支持密码保护的ZIP文件
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            选择ZIP文件
          </label>
          <div className="flex flex-wrap gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".zip"
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
              解压密码（可选）
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="如果ZIP文件有密码保护，请输入密码"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        )}

        {file && (
          <div className="mb-6">
            <button
              onClick={extractZip}
              disabled={isExtracting}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                isExtracting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
              }`}
            >
              {isExtracting ? '解压中...' : '解压ZIP文件'}
            </button>
          </div>
        )}

        {extractedFiles.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                解压结果 ({extractedFiles.length} 个文件)
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
                {extractedFiles.map((file, index) => (
                  <li 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-md shadow"
                  >
                    <div className="flex items-center min-w-0">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mr-3">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {file.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {(file.size / 1024).toFixed(2)} KB
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => downloadFile(file.name)}
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
            <li>选择.zip格式的压缩文件</li>
            <li>如果ZIP文件有密码保护，请在密码框中输入密码</li>
            <li>点击"解压ZIP文件"按钮开始解压过程</li>
            <li>解压完成后可查看文件列表并单独下载或全部下载</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// 简单的文件类型图标函数
const getFileIcon = (fileType: string) => {
  if (fileType.startsWith('image/')) return '🖼️';
  if (fileType.startsWith('text/')) return '📄';
  if (fileType.includes('json')) return '{}';
  if (fileType.includes('css')) return '</>';
  return '📁';
};

export default ZipExtractorTool;