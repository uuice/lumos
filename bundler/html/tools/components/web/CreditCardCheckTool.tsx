import React, { useMemo, useState } from 'react';

function luhn(s: string): boolean {
  const digits = s.replace(/\D/g,'');
  let sum = 0; let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i]);
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n; alt = !alt;
  }
  return digits.length >= 12 && sum % 10 === 0;
}

const CreditCardCheckTool = () => {
  const [input, setInput] = useState<string>('4111 1111 1111 1111');
  const valid = useMemo(()=>luhn(input), [input]);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">信用卡 Luhn 校验</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          验证信用卡号码是否符合Luhn算法
        </p>

        <div className="mb-6">
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            信用卡号码
          </label>
          <input
            id="cardNumber"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            placeholder="输入信用卡号码"
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
              校验通过
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              校验失败
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>输入信用卡号码进行Luhn算法校验</li>
            <li>支持带空格或不带空格的格式</li>
            <li>校验通过表示号码格式正确</li>
            <li>此工具不验证卡片是否真实存在</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreditCardCheckTool;
