import React, { useMemo, useState } from 'react';

const EmailValidatorTool = () => {
  const [email, setEmail] = useState<string>('user@example.com');
  const valid = useMemo(()=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">邮箱验证</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          验证邮箱地址格式是否正确
        </p>

        <div className="mb-6">
          <label htmlFor="emailInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            邮箱地址
          </label>
          <input
            id="emailInput"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="输入邮箱地址"
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        <div className={`mt-4 px-4 py-3 rounded-lg text-center font-medium transition-all duration-300 ${
          valid?
          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 border border-green-200 dark:border-green-800' :
          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 border border-red-200 dark:border-red-800'
        }`}>
          {valid ? (
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              有效邮箱地址
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              无效邮箱地址
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>输入邮箱地址进行格式验证</li>
            <li>验证通过表示邮箱格式正确</li>
            <li>此工具不验证邮箱是否真实存在</li>
            <li>支持常见的邮箱格式</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmailValidatorTool;


