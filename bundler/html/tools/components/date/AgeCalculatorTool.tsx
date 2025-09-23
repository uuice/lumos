import React, { useState } from 'react';

const AgeCalculatorTool = () => {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
  const [nextBirthday, setNextBirthday] = useState<{ days: number; date: string } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today) {
      alert('出生日期不能晚于今天');
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });

    // 计算下一个生日
    const nextBirth = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirth < today) {
      nextBirth.setFullYear(today.getFullYear() + 1);
    }

    const diffTime = nextBirth.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setNextBirthday({
      days: diffDays,
      date: nextBirth.toLocaleDateString('zh-CN')
    });
  };

  const resetCalculator = () => {
    setBirthDate('');
    setAge(null);
    setNextBirthday(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">年龄计算器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          计算精确年龄和下一个生日信息
        </p>

        <div className="mb-6">
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            出生日期
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
            />
            <div className="flex gap-3">
              <button
                onClick={calculateAge}
                disabled={!birthDate}
                className={`px-5 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 ${
                  birthDate
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500 transform hover:-translate-y-0.5'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
                }`}
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
          </div>
        </div>

        {age && (
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-6 transition-all duration-300">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">年龄信息</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-600/50 p-5 rounded-lg text-center shadow transition-all duration-300 hover:shadow-md">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{age.years}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">年</p>
              </div>
              <div className="bg-white dark:bg-gray-600/50 p-5 rounded-lg text-center shadow transition-all duration-300 hover:shadow-md">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{age.months}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">月</p>
              </div>
              <div className="bg-white dark:bg-gray-600/50 p-5 rounded-lg text-center shadow transition-all duration-300 hover:shadow-md">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{age.days}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">天</p>
              </div>
            </div>

            {nextBirthday && (
              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 transition-all duration-300">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">下一个生日</h4>
                <div className="flex justify-between items-center">
                  <p className="text-gray-800 dark:text-white">
                    {nextBirthday.date} (<span className="font-medium">{nextBirthday.days}</span> 天后)
                  </p>
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800/50 flex items-center justify-center">
                    <span className="text-2xl">🎂</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!age && (
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8 text-center transition-all duration-300">
            <div className="mx-auto w-16 h-16 text-gray-400 dark:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">请输入出生日期</h4>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              输入出生日期后将显示详细年龄信息
            </p>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>选择您的出生日期以计算精确年龄</li>
            <li>年龄以年、月、日的形式显示</li>
            <li>同时显示下一个生日的日期和倒计时</li>
            <li>支持公历日期计算</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgeCalculatorTool;
