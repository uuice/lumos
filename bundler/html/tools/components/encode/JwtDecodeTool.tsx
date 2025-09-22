import React, { useState } from 'react';

const JwtDecodeTool = () => {
  const [jwtToken, setJwtToken] = useState('');
  const [decodedHeader, setDecodedHeader] = useState('');
  const [decodedPayload, setDecodedPayload] = useState('');
  const [error, setError] = useState('');

  const decodeJwt = () => {
    setError('');
    setDecodedHeader('');
    setDecodedPayload('');

    if (!jwtToken) {
      setError('请输入 JWT Token');
      return;
    }

    try {
      const parts = jwtToken.split('.');
      if (parts.length !== 3) {
        throw new Error('无效的 JWT Token 格式');
      }

      const [header, payload] = parts;

      // 解码 header
      const decodedHeader = JSON.parse(atob(header));
      setDecodedHeader(JSON.stringify(decodedHeader, null, 2));

      // 解码 payload
      const decodedPayload = JSON.parse(atob(payload));
      setDecodedPayload(JSON.stringify(decodedPayload, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'JWT 解码失败');
    }
  };

  const resetDecoder = () => {
    setJwtToken('');
    setDecodedHeader('');
    setDecodedPayload('');
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">JWT 解码器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          解析 JWT Token 的头部和载荷信息
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            JWT Token
          </label>
          <div className="space-y-3">
            <textarea
              value={jwtToken}
              onChange={(e) => setJwtToken(e.target.value)}
              placeholder="输入完整的 JWT Token"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex space-x-3">
              <button
                onClick={decodeJwt}
                disabled={!jwtToken}
                className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  jwtToken
                    ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                解码 JWT
              </button>
              <button
                onClick={resetDecoder}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                重置
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4 mb-6">
            <p className="text-red-700 dark:text-red-200">{error}</p>
          </div>
        )}

        {(decodedHeader || decodedPayload) && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">解码结果</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-3">头部 (Header)</h4>
                <div className="bg-gray-800 rounded-lg p-4">
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    {decodedHeader || '无数据'}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-3">载荷 (Payload)</h4>
                <div className="bg-gray-800 rounded-lg p-4">
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    {decodedPayload || '无数据'}
                  </pre>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">JWT 结构说明</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• JWT 由三部分组成：头部.载荷.签名</li>
                <li>• 头部包含算法和令牌类型信息</li>
                <li>• 载荷包含声明（claims）信息</li>
                <li>• 签名用于验证令牌的完整性</li>
              </ul>
            </div>
          </div>
        )}

        {!decodedHeader && !decodedPayload && !error && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
            <div className="mx-auto w-12 h-12 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h4 className="mt-2 text-sm font-medium text-gray-800 dark:text-white">请输入 JWT Token</h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              输入完整的 JWT Token 后将显示解码结果
            </p>
          </div>
        )}

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">安全提醒</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• JWT 的签名部分未被验证，仅用于解码查看</li>
            <li>• 不要在生产环境中使用此工具处理敏感令牌</li>
            <li>• JWT 载荷是 Base64 编码的，不是加密的</li>
            <li>• 敏感信息不应存储在 JWT 载荷中</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JwtDecodeTool;
