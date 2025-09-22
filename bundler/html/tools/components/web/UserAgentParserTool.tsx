import React, { useState } from 'react';

const UserAgentParserTool = () => {
  const [userAgent, setUserAgent] = useState(navigator.userAgent);
  const [parsedInfo, setParsedInfo] = useState<any>(null);
  const [error, setError] = useState('');

  // 简单的User-Agent解析函数
  const parseUserAgent = (ua: string) => {
    try {
      const info: any = {
        browser: '未知',
        version: '未知',
        os: '未知',
        device: '未知'
      };

      // 浏览器检测
      if (ua.includes('Chrome') && !ua.includes('Edg')) {
        info.browser = 'Chrome';
        const match = ua.match(/Chrome\/(\d+\.\d+)/);
        if (match) info.version = match[1];
      } else if (ua.includes('Firefox')) {
        info.browser = 'Firefox';
        const match = ua.match(/Firefox\/(\d+\.\d+)/);
        if (match) info.version = match[1];
      } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
        info.browser = 'Safari';
        const match = ua.match(/Version\/(\d+\.\d+)/);
        if (match) info.version = match[1];
      } else if (ua.includes('Edg')) {
        info.browser = 'Edge';
        const match = ua.match(/Edg\/(\d+\.\d+)/);
        if (match) info.version = match[1];
      } else if (ua.includes('OPR') || ua.includes('Opera')) {
        info.browser = 'Opera';
        const match = ua.match(/(OPR|Opera)\/(\d+\.\d+)/);
        if (match) info.version = match[2];
      }

      // 操作系统检测
      if (ua.includes('Windows NT 10.0')) {
        info.os = 'Windows 10';
      } else if (ua.includes('Windows NT 6.1')) {
        info.os = 'Windows 7';
      } else if (ua.includes('Mac OS X')) {
        info.os = 'macOS';
      } else if (ua.includes('Linux')) {
        info.os = 'Linux';
      } else if (ua.includes('Android')) {
        info.os = 'Android';
      } else if (ua.includes('iPhone') || ua.includes('iPad')) {
        info.os = 'iOS';
      }

      // 设备检测
      if (ua.includes('Mobile') || ua.includes('Android')) {
        info.device = '移动设备';
      } else if (ua.includes('Tablet')) {
        info.device = '平板设备';
      } else {
        info.device = '桌面设备';
      }

      return info;
    } catch (err) {
      throw new Error('User-Agent解析失败');
    }
  };

  const parseCurrentUA = () => {
    setError('');
    try {
      const info = parseUserAgent(userAgent);
      setParsedInfo(info);
    } catch (err) {
      setError(err instanceof Error ? err.message : '解析失败');
    }
  };

  const resetParser = () => {
    setUserAgent(navigator.userAgent);
    setParsedInfo(null);
    setError('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">User-Agent解析器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          解析User-Agent字符串，获取浏览器、操作系统和设备信息
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            User-Agent字符串
          </label>
          <div className="space-y-3">
            <textarea
              value={userAgent}
              onChange={(e) => setUserAgent(e.target.value)}
              placeholder="输入User-Agent字符串"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex space-x-3">
              <button
                onClick={parseCurrentUA}
                disabled={!userAgent}
                className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  userAgent
                    ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                解析User-Agent
              </button>
              <button
                onClick={resetParser}
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

        {parsedInfo && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">解析结果</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-600 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">浏览器信息</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">浏览器:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{parsedInfo.browser}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">版本:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{parsedInfo.version}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-600 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">系统信息</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">操作系统:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{parsedInfo.os}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">设备类型:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{parsedInfo.device}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">完整User-Agent</h4>
              <div className="bg-gray-800 rounded-lg p-4">
                <pre
                  onClick={() => copyToClipboard(userAgent)}
                  className="text-green-400 text-sm overflow-x-auto cursor-pointer hover:opacity-80"
                >
                  {userAgent}
                </pre>
              </div>
              <button
                onClick={() => copyToClipboard(userAgent)}
                className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                复制User-Agent
              </button>
            </div>
          </div>
        )}

        {!parsedInfo && !error && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
            <div className="mx-auto w-12 h-12 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="mt-2 text-sm font-medium text-gray-800 dark:text-white">请输入User-Agent字符串</h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              输入User-Agent字符串后将显示解析结果
            </p>
          </div>
        )}

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">User-Agent说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• User-Agent是浏览器发送给服务器的字符串，用于识别浏览器和操作系统</li>
            <li>• 默认显示当前浏览器的User-Agent</li>
            <li>• 可以粘贴其他User-Agent字符串进行解析</li>
            <li>• 解析结果包括浏览器、版本、操作系统和设备类型</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserAgentParserTool;
