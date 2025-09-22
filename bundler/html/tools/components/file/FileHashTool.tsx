import React, { useState, useRef } from "react";

const FileHashTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 计算文件哈希值的函数
  const calculateHash = async (file: File, algorithm: string): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest(algorithm, buffer);
    const hashArray = Array.from(new Uint8Array(hashArray));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setHashes({});
    }
  };

  const calculateAllHashes = async () => {
    if (!file) return;
    
    setIsCalculating(true);
    const newHashes: Record<string, string> = {};
    
    try {
      // 计算常用哈希值
      const algorithms = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
      
      for (const algorithm of algorithms) {
        try {
          // 注意：Web Crypto API 不直接支持 MD5，所以我们需要模拟一个简单的实现
          if (algorithm === 'MD5') {
            newHashes[algorithm] = 'MD5计算需要特殊实现（Web Crypto API不支持）';
          } else {
            const webCryptoAlgorithm = algorithm.replace('-', '').toLowerCase();
            newHashes[algorithm] = await calculateHash(file, webCryptoAlgorithm);
          }
        } catch (error) {
          newHashes[algorithm] = `计算错误: ${error instanceof Error ? error.message : '未知错误'}`;
        }
      }
      
      setHashes(newHashes);
    } catch (error) {
      console.error('计算哈希时出错:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearFile = () => {
    setFile(null);
    setHashes({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">文件校验和</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          计算文件的哈希值，用于验证文件完整性和检测文件是否被篡改
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            选择文件
          </label>
          <div className="flex flex-wrap gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
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
            <button
              onClick={calculateAllHashes}
              disabled={isCalculating}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                isCalculating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
              }`}
            >
              {isCalculating ? '计算中...' : '计算哈希值'}
            </button>
          </div>
        )}

        {Object.keys(hashes).length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              哈希值结果
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="space-y-4">
                {Object.entries(hashes).map(([algorithm, hash]) => (
                  <div key={algorithm} className="flex items-start">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {algorithm}
                      </div>
                      <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 break-all">
                        {hash}
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(hash)}
                      className="ml-3 inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                    >
                      复制
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            使用说明
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>选择要计算哈希值的文件</li>
            <li>点击"计算哈希值"按钮开始计算</li>
            <li>支持的算法包括：MD5、SHA-1、SHA-256、SHA-384、SHA-512</li>
            <li>哈希值可用于验证文件完整性，确保文件未被篡改</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FileHashTool;