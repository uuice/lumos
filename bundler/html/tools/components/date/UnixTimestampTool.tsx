import React, { useState } from "react";

const UnixTimestampTool = () => {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [date, setDate] = useState(new Date());

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setTimestamp(value);
    setDate(new Date(value * 1000));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setDate(newDate);
    setTimestamp(Math.floor(newDate.getTime() / 1000));
  };

  const now = () => {
    const now = new Date();
    setTimestamp(Math.floor(now.getTime() / 1000));
    setDate(now);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6 p-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl">
          <label htmlFor="timestamp-input" className="block mb-2 font-medium text-gray-800 dark:text-gray-200">Unix时间戳 (秒)</label>
          <input
            id="timestamp-input"
            type="number"
            value={timestamp}
            onChange={handleTimestampChange}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg">
            {isNaN(date.getTime()) ? "无效时间戳" : date.toString()}
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl">
          <label htmlFor="datetime-input" className="block mb-2 font-medium text-gray-800 dark:text-gray-200">日期时间</label>
          <input
            id="datetime-input"
            type="datetime-local"
            value={date.toISOString().slice(0, 16)}
            onChange={handleDateChange}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg">
            时间戳: {timestamp}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={now}
          className="px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          当前时间
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 p-5 rounded-xl border border-blue-200 dark:border-blue-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-2">可读格式</div>
          <div className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
            {isNaN(date.getTime()) ? "无效日期" : date.toLocaleString()}
          </div>
          <button
            onClick={() => copyToClipboard(isNaN(date.getTime()) ? "" : date.toLocaleString())}
            disabled={isNaN(date.getTime())}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-50 px-3 py-1 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors duration-200"
          >
            复制
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50 p-5 rounded-xl border border-green-200 dark:border-green-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="text-sm text-green-700 dark:text-green-300 font-medium mb-2">UTC时间</div>
          <div className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
            {isNaN(date.getTime()) ? "无效日期" : date.toUTCString()}
          </div>
          <button
            onClick={() => copyToClipboard(isNaN(date.getTime()) ? "" : date.toUTCString())}
            disabled={isNaN(date.getTime())}
            className="text-sm text-green-600 dark:text-green-400 hover:underline disabled:opacity-50 px-3 py-1 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors duration-200"
          >
            复制
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 p-5 rounded-xl border border-purple-200 dark:border-purple-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="text-sm text-purple-700 dark:text-purple-300 font-medium mb-2">ISO格式</div>
          <div className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3">
            {isNaN(date.getTime()) ? "无效日期" : date.toISOString()}
          </div>
          <button
            onClick={() => copyToClipboard(isNaN(date.getTime()) ? "" : date.toISOString())}
            disabled={isNaN(date.getTime())}
            className="text-sm text-purple-600 dark:text-purple-400 hover:underline disabled:opacity-50 px-3 py-1 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors duration-200"
          >
            复制
          </button>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl">
        <p className="font-semibold text-gray-800 dark:text-gray-200 mb-3">功能说明:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Unix时间戳是从1970年1月1日00:00:00 UTC开始计算的秒数</li>
          <li>支持时间戳与日期时间之间的相互转换</li>
          <li>点击&quot;当前时间&quot;按钮可获取当前时间戳</li>
          <li>可以复制不同格式的时间表示</li>
        </ul>
      </div>
    </div>
  );
};

export default UnixTimestampTool;
