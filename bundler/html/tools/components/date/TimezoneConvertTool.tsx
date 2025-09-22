import React, { useState } from 'react';

const TimezoneConvertTool = () => {
  const [dateTime, setDateTime] = useState('');
  const [fromTimezone, setFromTimezone] = useState('Asia/Shanghai');
  const [toTimezone, setToTimezone] = useState('America/New_York');
  const [convertedTime, setConvertedTime] = useState<{
    localTime: string;
    targetTime: string;
    offset: string;
  } | null>(null);

  // 常用时区列表
  const timezones = [
    { value: 'Asia/Shanghai', label: '中国标准时间 (CST)' },
    { value: 'Asia/Tokyo', label: '日本标准时间 (JST)' },
    { value: 'Asia/Seoul', label: '韩国标准时间 (KST)' },
    { value: 'America/New_York', label: '美国东部时间 (EST)' },
    { value: 'America/Chicago', label: '美国中部时间 (CST)' },
    { value: 'America/Denver', label: '美国山地时间 (MST)' },
    { value: 'America/Los_Angeles', label: '美国西部时间 (PST)' },
    { value: 'Europe/London', label: '格林威治标准时间 (GMT)' },
    { value: 'Europe/Paris', label: '中欧时间 (CET)' },
    { value: 'Australia/Sydney', label: '澳大利亚东部时间 (AEST)' },
  ];

  const convertTimezone = () => {
    if (!dateTime) {
      alert('请选择日期时间');
      return;
    }

    try {
      // 创建原始时区的时间
      const fromDate = new Date(`${dateTime}`);

      // 格式化原始时区时间
      const fromFormatter = new Intl.DateTimeFormat('zh-CN', {
        timeZone: fromTimezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      const fromTimeString = fromFormatter.format(fromDate);

      // 格式化目标时区时间
      const toFormatter = new Intl.DateTimeFormat('zh-CN', {
        timeZone: toTimezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      const toTimeString = toFormatter.format(fromDate);

      // 获取时区偏移信息
      const fromOffsetFormatter = new Intl.DateTimeFormat('en', {
        timeZone: fromTimezone,
        timeZoneName: 'longOffset'
      });

      const toOffsetFormatter = new Intl.DateTimeFormat('en', {
        timeZone: toTimezone,
        timeZoneName: 'longOffset'
      });

      const fromOffset = fromOffsetFormatter.formatToParts(fromDate).find(part => part.type === 'timeZoneName')?.value || '';
      const toOffset = toOffsetFormatter.formatToParts(fromDate).find(part => part.type === 'timeZoneName')?.value || '';

      setConvertedTime({
        localTime: fromTimeString,
        targetTime: toTimeString,
        offset: `${fromOffset} → ${toOffset}`
      });
    } catch (error) {
      alert('时间转换失败，请检查输入');
      console.error('转换错误:', error);
    }
  };

  const resetConverter = () => {
    setDateTime('');
    setFromTimezone('Asia/Shanghai');
    setToTimezone('America/New_York');
    setConvertedTime(null);
  };

  const swapTimezones = () => {
    const temp = fromTimezone;
    setFromTimezone(toTimezone);
    setToTimezone(temp);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">时区转换器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          在不同时区之间转换日期时间
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-medium text-gray-800 dark:text-white mb-3">源时区</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  日期时间
                </label>
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  时区
                </label>
                <select
                  value={fromTimezone}
                  onChange={(e) => setFromTimezone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {timezones.map(tz => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 dark:text-white mb-3">目标时区</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  时区
                </label>
                <select
                  value={toTimezone}
                  onChange={(e) => setToTimezone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {timezones.map(tz => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end h-full">
                <button
                  onClick={swapTimezones}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  交换时区
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mb-6">
          <button
            onClick={convertTimezone}
            disabled={!dateTime}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              dateTime
                ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
            }`}
          >
            转换时区
          </button>
          <button
            onClick={resetConverter}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            重置
          </button>
        </div>

        {convertedTime && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">转换结果</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-600 rounded-lg p-5">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">源时区</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {timezones.find(tz => tz.value === fromTimezone)?.label}
                  </p>
                  <p className="text-2xl font-mono text-blue-600 dark:text-blue-400">
                    {convertedTime.localTime}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-600 rounded-lg p-5">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">目标时区</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {timezones.find(tz => tz.value === toTimezone)?.label}
                  </p>
                  <p className="text-2xl font-mono text-blue-600 dark:text-blue-400">
                    {convertedTime.targetTime}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4 text-center">
              <p className="text-gray-800 dark:text-white font-medium">
                时区偏移: {convertedTime.offset}
              </p>
            </div>
          </div>
        )}

        {!convertedTime && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
            <div className="mx-auto w-12 h-12 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="mt-2 text-sm font-medium text-gray-800 dark:text-white">请输入时间进行转换</h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              选择日期时间和目标时区后将显示转换结果
            </p>
          </div>
        )}

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• 选择要转换的日期时间</li>
            <li>• 选择源时区和目标时区</li>
            <li>• 点击"转换时区"查看结果</li>
            <li>• 使用"交换时区"按钮可以快速切换源和目标时区</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimezoneConvertTool;
