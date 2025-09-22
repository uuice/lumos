import React, { useState } from 'react';

const Sha256HashTool = () => {
  const [inputText, setInputText] = useState('');
  const [hashResult, setHashResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateSha256 = async () => {
    if (!inputText) {
      setHashResult('请输入要计算哈希的文本');
      return;
    }

    setIsProcessing(true);

    try {
      // 使用 Web Crypto API 计算 SHA-256
      const encoder = new TextEncoder();
      const data = encoder.encode(inputText);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      setHashResult(hashHex);
    } catch (error) {
      setHashResult('哈希计算失败: ' + (error instanceof Error ? error.message : '未知错误'));
    } finally {
      setIsProcessing(false);
    }
  };

  const resetCalculator = () => {
    setInputText('');
    setHashResult('');
    setIsProcessing(false);
  };

  const copyToClipboard = () => {
    if (hashResult) {
      navigator.clipboard.writeText(hashResult);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">SHA-256 哈希计算器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          使用 SHA-256 算法计算文本的哈希值
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            输入文本
          </label>
          <div className="space-y-3">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="输入要计算哈希的文本"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex space-x-3">
              <button
                onClick={calculateSha256}
                disabled={!inputText || isProcessing}
                className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  inputText && !isProcessing
                    ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                {isProcessing ? '计算中...' : '计算 SHA-256'}
              </button>
              <button
                onClick={resetCalculator}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                重置
              </button>
            </div>
          </div>
        </div>

        {hashResult && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-3">SHA-256 哈希结果</h3>
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <pre className="text-green-400 text-sm overflow-x-auto break-all">
                {hashResult}
              </pre>
            </div>
            <button
              onClick={copyToClipboard}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              复制到剪贴板
            </button>
          </div>
        )}

        {!hashResult && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
            <div className="mx-auto w-12 h-12 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="mt-2 text-sm font-medium text-gray-800 dark:text-white">请输入文本计算哈希</h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              输入文本后将显示 SHA-256 哈希值
            </p>
          </div>
        )}

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">SHA-256 说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• SHA-256 是安全哈希算法的一种</li>
            <li>• 生成 256 位（64 字符）的十六进制哈希值</li>
            <li>• 相同输入总是产生相同输出</li>
            <li>• 不同输入几乎总是产生不同输出</li>
            <li>• 计算过程不可逆，无法从哈希值推导原文</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sha256HashTool;
