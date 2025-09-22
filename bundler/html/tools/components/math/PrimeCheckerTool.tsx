import React, { useState } from 'react';

const PrimeCheckerTool = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<{ isPrime: boolean; factors: number[] } | null>(null);
  const [error, setError] = useState('');

  const isPrime = (num: number) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;

    // 使用 6k±1 优化算法
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) {
        return false;
      }
    }
    return true;
  };

  const findFactors = (num: number) => {
    const factors = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        factors.push(i);
        if (i !== num / i) {
          factors.push(num / i);
        }
      }
    }
    return factors.sort((a, b) => a - b);
  };

  const checkPrime = () => {
    setError('');
    setResult(null);

    if (!number) {
      setError('请输入一个数字');
      return;
    }

    const num = parseInt(number);
    if (isNaN(num)) {
      setError('请输入有效的数字');
      return;
    }

    if (num < 0) {
      setError('请输入非负整数');
      return;
    }

    if (num > 1000000000000) {
      setError('数字过大，请输入小于1万亿的数字');
      return;
    }

    const prime = isPrime(num);
    const factors = findFactors(num);

    setResult({
      isPrime: prime,
      factors: factors
    });
  };

  const resetChecker = () => {
    setNumber('');
    setResult(null);
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 只允许数字
    if (value === '' || /^\d*$/.test(value)) {
      setNumber(value);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">质数检查器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          检查数字是否为质数并列出所有因数
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            输入数字
          </label>
          <div className="flex space-x-3">
            <input
              type="text"
              value={number}
              onChange={handleInputChange}
              placeholder="输入一个正整数"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={checkPrime}
              disabled={!number}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                number
                  ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              检查
            </button>
            <button
              onClick={resetChecker}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              重置
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4 mb-6">
            <p className="text-red-700 dark:text-red-200">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">检查结果</h3>

            <div className="bg-white dark:bg-gray-600 rounded-lg p-5 mb-6 text-center">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">数字 {number} 是</p>
              <p className={`text-3xl font-bold ${result.isPrime ? 'text-green-600' : 'text-red-600'}`}>
                {result.isPrime ? '质数 ✅' : '合数 ❌'}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">因数列表</h4>
              <div className="bg-white dark:bg-gray-600 rounded-lg p-4">
                <div className="flex flex-wrap gap-2">
                  {result.factors.map((factor, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-900 dark:text-blue-200"
                    >
                      {factor}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                  共 {result.factors.length} 个因数
                </p>
              </div>
            </div>
          </div>
        )}

        {!result && !error && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
            <div className="mx-auto w-12 h-12 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="mt-2 text-sm font-medium text-gray-800 dark:text-white">请输入要检查的数字</h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              输入正整数后将显示是否为质数及所有因数
            </p>
          </div>
        )}

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• 质数是大于1且只能被1和自身整除的自然数</li>
            <li>• 1既不是质数也不是合数</li>
            <li>• 2是唯一的偶数质数</li>
            <li>• 支持检查小于1万亿的正整数</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrimeCheckerTool;
