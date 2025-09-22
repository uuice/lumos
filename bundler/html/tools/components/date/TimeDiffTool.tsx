import React, { useState } from 'react';

const TimeDiffTool = () => {
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timeDiff, setTimeDiff] = useState<{
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
  } | null>(null);

  const calculateTimeDiff = () => {
    if (!startDate || !endDate) {
      alert('请选择开始和结束日期');
      return;
    }

    const start = new Date(`${startDate}T${startTime || '00:00'}`);
    const end = new Date(`${endDate}T${endTime || '00:00'}`);

    if (start > end) {
      alert('开始时间不能晚于结束时间');
      return;
    }

    const diffMs = end.getTime() - start.getTime();
    const totalSeconds = Math.floor(diffMs / 1000);

    // 计算年、月、日差异
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    let hours = end.getHours() - start.getHours();
    let minutes = end.getMinutes() - start.getMinutes();
    let seconds = end.getSeconds() - start.getSeconds();

    // 处理负数情况
    if (seconds < 0) {
      minutes--;
      seconds += 60;
    }

    if (minutes < 0) {
      hours--;
      minutes += 60;
    }

    if (hours < 0) {
      days--;
      hours += 24;
    }

    if (days < 0) {
      months--;
      const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setTimeDiff({
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
      totalSeconds
    });
  };

  const resetCalculator = () => {
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setTimeDiff(null);
  };

  const formatDuration = () => {
    if (!timeDiff) return '';

    const parts = [];
    if (timeDiff.years > 0) parts.push(`${timeDiff.years}年`);
    if (timeDiff.months > 0) parts.push(`${timeDiff.months}月`);
    if (timeDiff.days > 0) parts.push(`${timeDiff.days}天`);
    if (timeDiff.hours > 0) parts.push(`${timeDiff.hours}小时`);
    if (timeDiff.minutes > 0) parts.push(`${timeDiff.minutes}分钟`);
    if (timeDiff.seconds > 0) parts.push(`${timeDiff.seconds}秒`);

    return parts.join(' ') || '0秒';
  };

  const formatTotalTime = () => {
    if (!timeDiff) return '';

    const totalMinutes = Math.floor(timeDiff.totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    return `${totalDays}天 ${totalHours % 24}小时 ${totalMinutes % 60}分钟 ${timeDiff.totalSeconds % 60}秒`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">时间差计算器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          计算两个日期时间之间的差异
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-medium text-gray-800 dark:text-white mb-3">开始时间</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  日期
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  时间 (可选)
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 dark:text-white mb-3">结束时间</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  日期
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  时间 (可选)
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mb-6">
          <button
            onClick={calculateTimeDiff}
            disabled={!startDate || !endDate}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              startDate && endDate
                ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
            }`}
          >
            计算时间差
          </button>
          <button
            onClick={resetCalculator}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            重置
          </button>
        </div>

        {timeDiff && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">时间差结果</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg text-center">
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{timeDiff.years}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">年</p>
              </div>
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg text-center">
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{timeDiff.months}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">月</p>
              </div>
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg text-center">
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{timeDiff.days}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">天</p>
              </div>
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg text-center">
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{timeDiff.hours}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">小时</p>
              </div>
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg text-center">
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{timeDiff.minutes}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">分钟</p>
              </div>
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg text-center">
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{timeDiff.seconds}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">秒</p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">总计时间</h4>
              <p className="text-gray-800 dark:text-white">
                {formatDuration()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                或 {formatTotalTime()}
              </p>
            </div>
          </div>
        )}

        {!timeDiff && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
            <div className="mx-auto w-12 h-12 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="mt-2 text-sm font-medium text-gray-800 dark:text-white">请输入时间范围</h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              输入开始和结束时间后将显示时间差
            </p>
          </div>
        )}

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• 选择开始和结束日期时间以计算差异</li>
            <li>• 时间字段可选，默认为 00:00</li>
            <li>• 结果以年、月、日、时、分、秒显示</li>
            <li>• 同时提供总计时间的不同表示形式</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimeDiffTool;
