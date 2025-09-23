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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">百分比计算器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          计算百分比、值或基数
        </p>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setCalcType('percentage')}
              className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${
                calcType === 'percentage'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
              }`}
            >
              求百分比
            </button>
            <button
              onClick={() => setCalcType('value')}
              className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${
                calcType === 'value'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
              }`}
            >
              求值
            </button>
            <button
              onClick={() => setCalcType('base')}
              className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${
                calcType === 'base'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
              }`}
            >
              求基数
            </button>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5 transition-all duration-300">
            {calcType === 'percentage' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="valueInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    值
                  </label>
                  <input
                    id="valueInput"
                    type="text"
                    value={value}
                    onChange={handleInputChange(setValue)}
                    placeholder="输入值"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="baseInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    基数
                  </label>
                  <input
                    id="baseInput"
                    type="text"
                    value={base}
                    onChange={handleInputChange(setBase)}
                    placeholder="输入基数"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white transition-all duration-200"
                  />
                </div>
                <div className="text-center text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="font-mono">(值 ÷ 基数) × 100 = 百分比</p>
                </div>
              </div>
            )}

            {calcType === 'value' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="percentageInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    百分比 (%)
                  </label>
                  <input
                    id="percentageInput"
                    type="text"
                    value={percentage}
                    onChange={handleInputChange(setPercentage)}
                    placeholder="输入百分比"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="baseInput2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    基数
                  </label>
                  <input
                    id="baseInput2"
                    type="text"
                    value={base}
                    onChange={handleInputChange(setBase)}
                    placeholder="输入基数"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white transition-all duration-200"
                  />
                </div>
                <div className="text-center text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="font-mono">(百分比 ÷ 100) × 基数 = 值</p>
                </div>
              </div>
            )}

            {calcType === 'base' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="valueInput2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    值
                  </label>
                  <input
                    id="valueInput2"
                    type="text"
                    value={value}
                    onChange={handleInputChange(setValue)}
                    placeholder="输入值"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="percentageInput2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    百分比 (%)
                  </label>
                  <input
                    id="percentageInput2"
                    type="text"
                    value={percentage}
                    onChange={handleInputChange(setPercentage)}
                    placeholder="输入百分比"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white transition-all duration-200"
                  />
                </div>
                <div className="text-center text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="font-mono">值 ÷ (百分比 ÷ 100) = 基数</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={calculatePercentage}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            计算
          </button>
          <button
            onClick={resetCalculator}
            className="px-5 py-2.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            重置
          </button>
        </div>

        {result && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 text-center border border-blue-200 dark:border-blue-800 transition-all duration-300">
            <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">计算结果</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">{result}</p>
          </div>
        )}

        {!result && (
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-8 text-center transition-all duration-300">
            <div className="mx-auto w-16 h-16 text-gray-400 dark:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">请输入数值进行计算</h4>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              选择计算类型并输入相应数值
            </p>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>求百分比: 已知值和基数，计算百分比</li>
            <li>求值: 已知百分比和基数，计算值</li>
            <li>求基数: 已知值和百分比，计算基数</li>
            <li>支持小数输入，结果保留两位小数</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PercentageCalculatorTool;
