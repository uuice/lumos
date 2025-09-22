import React, { useState } from 'react';

const PercentageCalculatorTool = () => {
  const [calcType, setCalcType] = useState('percentage'); // percentage, value, base
  const [percentage, setPercentage] = useState('');
  const [value, setValue] = useState('');
  const [base, setBase] = useState('');
  const [result, setResult] = useState('');

  const calculatePercentage = () => {
    const pct = parseFloat(percentage);
    const val = parseFloat(value);
    const bas = parseFloat(base);

    if (isNaN(pct) && isNaN(val) && isNaN(bas)) {
      setResult('');
      return;
    }

    switch (calcType) {
      case 'percentage':
        // 计算百分比: (值 / 基数) * 100
        if (val && bas && bas !== 0) {
          const result = (val / bas) * 100;
          setResult(`${result.toFixed(2)}%`);
        } else {
          setResult('请输入值和基数');
        }
        break;

      case 'value':
        // 计算值: (百分比 / 100) * 基数
        if (pct && bas) {
          const result = (pct / 100) * bas;
          setResult(result.toFixed(2));
        } else {
          setResult('请输入百分比和基数');
        }
        break;

      case 'base':
        // 计算基数: 值 / (百分比 / 100)
        if (val && pct && pct !== 0) {
          const result = val / (pct / 100);
          setResult(result.toFixed(2));
        } else {
          setResult('请输入值和百分比');
        }
        break;

      default:
        setResult('');
    }
  };

  const resetCalculator = () => {
    setPercentage('');
    setValue('');
    setBase('');
    setResult('');
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // 只允许数字和小数点
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setter(value);
      }
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">百分比计算器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          计算百分比、值或基数
        </p>

        <div className="mb-6">
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setCalcType('percentage')}
              className={`px-4 py-2 rounded-md ${
                calcType === 'percentage'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
              }`}
            >
              求百分比
            </button>
            <button
              onClick={() => setCalcType('value')}
              className={`px-4 py-2 rounded-md ${
                calcType === 'value'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
              }`}
            >
              求值
            </button>
            <button
              onClick={() => setCalcType('base')}
              className={`px-4 py-2 rounded-md ${
                calcType === 'base'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
              }`}
            >
              求基数
            </button>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
            {calcType === 'percentage' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    值
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={handleInputChange(setValue)}
                    placeholder="输入值"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    基数
                  </label>
                  <input
                    type="text"
                    value={base}
                    onChange={handleInputChange(setBase)}
                    placeholder="输入基数"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                  />
                </div>
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <p>(值 ÷ 基数) × 100 = 百分比</p>
                </div>
              </div>
            )}

            {calcType === 'value' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    百分比 (%)
                  </label>
                  <input
                    type="text"
                    value={percentage}
                    onChange={handleInputChange(setPercentage)}
                    placeholder="输入百分比"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    基数
                  </label>
                  <input
                    type="text"
                    value={base}
                    onChange={handleInputChange(setBase)}
                    placeholder="输入基数"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                  />
                </div>
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <p>(百分比 ÷ 100) × 基数 = 值</p>
                </div>
              </div>
            )}

            {calcType === 'base' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    值
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={handleInputChange(setValue)}
                    placeholder="输入值"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    百分比 (%)
                  </label>
                  <input
                    type="text"
                    value={percentage}
                    onChange={handleInputChange(setPercentage)}
                    placeholder="输入百分比"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                  />
                </div>
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <p>值 ÷ (百分比 ÷ 100) = 基数</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-3 mb-6">
          <button
            onClick={calculatePercentage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            计算
          </button>
          <button
            onClick={resetCalculator}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            重置
          </button>
        </div>

        {result && (
          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 text-center">
            <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">计算结果</h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{result}</p>
          </div>
        )}

        {!result && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
            <div className="mx-auto w-12 h-12 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="mt-2 text-sm font-medium text-gray-800 dark:text-white">请输入数值进行计算</h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              选择计算类型并输入相应数值
            </p>
          </div>
        )}

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• 求百分比: 已知值和基数，计算百分比</li>
            <li>• 求值: 已知百分比和基数，计算值</li>
            <li>• 求基数: 已知值和百分比，计算基数</li>
            <li>• 支持小数输入，结果保留两位小数</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PercentageCalculatorTool;
