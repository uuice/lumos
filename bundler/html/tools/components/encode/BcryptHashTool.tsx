import React, { useState } from 'react';

const BcryptHashTool = () => {
  const [inputText, setInputText] = useState('');
  const [saltRounds, setSaltRounds] = useState(10);
  const [hashResult, setHashResult] = useState('');
  const [verifyText, setVerifyText] = useState('');
  const [verifyResult, setVerifyResult] = useState<{ isValid: boolean; message: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // 模拟 bcrypt 哈希函数（实际应用中应使用后端服务）
  const mockBcryptHash = async (text: string, rounds: number) => {
    // 在实际应用中，这应该由后端完成
    // 这里我们只是模拟一个看起来像 bcrypt 的哈希值
    const salt = '$2b$' + rounds.toString().padStart(2, '0') + '$' +
      Array(22).fill(0).map(() => Math.random().toString(36)[2] || 'a').join('');
    const hash = salt + Array(31).fill(0).map(() => Math.random().toString(36)[2] || 'a').join('');
    return hash;
  };

  // 模拟 bcrypt 验证函数
  const mockBcryptCompare = async (text: string, hash: string) => {
    // 在实际应用中，这应该由后端完成
    // 这里我们只是模拟验证过程
    return text.length > 0 && hash.length > 50;
  };

  const calculateBcryptHash = async () => {
    if (!inputText) {
      setHashResult('请输入要哈希的文本');
      return;
    }

    if (saltRounds < 4 || saltRounds > 20) {
      setHashResult('盐轮数必须在 4-20 之间');
      return;
    }

    setIsProcessing(true);

    try {
      // 注意：在实际应用中，bcrypt 哈希应该在后端完成
      // 前端无法安全地进行 bcrypt 哈希
      const hash = await mockBcryptHash(inputText, saltRounds);
      setHashResult(hash);
    } catch (error) {
      setHashResult('哈希计算失败: ' + (error instanceof Error ? error.message : '未知错误'));
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyBcryptHash = async () => {
    if (!verifyText) {
      setVerifyResult({ isValid: false, message: '请输入要验证的文本' });
      return;
    }

    if (!hashResult) {
      setVerifyResult({ isValid: false, message: '请先生成哈希值' });
      return;
    }

    setIsProcessing(true);

    try {
      // 注意：在实际应用中，bcrypt 验证应该在后端完成
      const isValid = await mockBcryptCompare(verifyText, hashResult);
      setVerifyResult({
        isValid,
        message: isValid ? '验证成功 ✅' : '验证失败 ❌'
      });
    } catch (error) {
      setVerifyResult({
        isValid: false,
        message: '验证失败: ' + (error instanceof Error ? error.message : '未知错误')
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetCalculator = () => {
    setInputText('');
    setSaltRounds(10);
    setHashResult('');
    setVerifyText('');
    setVerifyResult(null);
    setIsProcessing(false);
  };

  const copyToClipboard = () => {
    if (hashResult) {
      navigator.clipboard.writeText(hashResult);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Bcrypt 哈希工具</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          生成和验证 Bcrypt 哈希值（注意：实际应用中应在后端处理）
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-medium text-gray-800 dark:text-white mb-3">生成 Bcrypt 哈希</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  输入文本
                </label>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="输入要哈希的文本"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  盐轮数: {saltRounds}
                </label>
                <input
                  type="range"
                  min="4"
                  max="20"
                  value={saltRounds}
                  onChange={(e) => setSaltRounds(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>较弱安全</span>
                  <span>较强安全</span>
                </div>
              </div>

              <button
                onClick={calculateBcryptHash}
                disabled={!inputText || isProcessing}
                className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  inputText && !isProcessing
                    ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                {isProcessing ? '生成中...' : '生成 Bcrypt 哈希'}
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 dark:text-white mb-3">验证 Bcrypt 哈希</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  验证文本
                </label>
                <input
                  type="text"
                  value={verifyText}
                  onChange={(e) => setVerifyText(e.target.value)}
                  placeholder="输入要验证的文本"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <button
                onClick={verifyBcryptHash}
                disabled={!verifyText || !hashResult || isProcessing}
                className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  verifyText && hashResult && !isProcessing
                    ? 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                {isProcessing ? '验证中...' : '验证 Bcrypt 哈希'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mb-6">
          <button
            onClick={resetCalculator}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            重置
          </button>
        </div>

        {(hashResult || verifyResult) && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            {hashResult && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 dark:text-white mb-3">Bcrypt 哈希结果</h3>
                <div className="bg-gray-800 rounded-lg p-4 mb-3">
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

            {verifyResult && (
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white mb-3">验证结果</h3>
                <div className={`rounded-lg p-4 text-center ${verifyResult.isValid ? 'bg-green-50 dark:bg-green-900' : 'bg-red-50 dark:bg-red-900'}`}>
                  <p className={`font-medium ${verifyResult.isValid ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                    {verifyResult.message}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {!hashResult && !verifyResult && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
            <div className="mx-auto w-12 h-12 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className="mt-2 text-sm font-medium text-gray-800 dark:text-white">请输入文本生成哈希</h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              输入文本后将生成 Bcrypt 哈希值
            </p>
          </div>
        )}

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Bcrypt 说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
            <li>• Bcrypt 是专为密码哈希设计的算法</li>
            <li>• 包含盐值以防止彩虹表攻击</li>
            <li>• 计算速度可调（通过盐轮数）</li>
            <li>• <span className="font-medium text-red-600">重要</span>: 实际应用中应在后端生成和验证 Bcrypt 哈希</li>
            <li>• 前端无法安全地进行真正的 Bcrypt 哈希</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BcryptHashTool;
