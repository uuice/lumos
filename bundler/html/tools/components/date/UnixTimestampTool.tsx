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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="timestamp-input" className="block mb-2 font-medium">Unix时间戳 (秒)</label>
          <input
            id="timestamp-input"
            type="number"
            value={timestamp}
            onChange={handleTimestampChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isNaN(date.getTime()) ? "无效时间戳" : date.toString()}
          </div>
        </div>

        <div>
          <label htmlFor="datetime-input" className="block mb-2 font-medium">日期时间</label>
          <input
            id="datetime-input"
            type="datetime-local"
            value={date.toISOString().slice(0, 16)}
            onChange={handleDateChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            时间戳: {timestamp}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={now}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          当前时间
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <div className="text-sm text-blue-700 dark:text-blue-300">可读格式</div>
          <div className="text-lg font-semibold">
            {isNaN(date.getTime()) ? "无效日期" : date.toLocaleString()}
          </div>
          <button
            onClick={() => copyToClipboard(isNaN(date.getTime()) ? "" : date.toLocaleString())}
            disabled={isNaN(date.getTime())}
            className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-50"
          >
            复制
          </button>
        </div>

        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
          <div className="text-sm text-green-700 dark:text-green-300">UTC时间</div>
          <div className="text-lg font-semibold">
            {isNaN(date.getTime()) ? "无效日期" : date.toUTCString()}
          </div>
          <button
            onClick={() => copyToClipboard(isNaN(date.getTime()) ? "" : date.toUTCString())}
            disabled={isNaN(date.getTime())}
            className="mt-2 text-sm text-green-600 dark:text-green-400 hover:underline disabled:opacity-50"
          >
            复制
          </button>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
          <div className="text-sm text-purple-700 dark:text-purple-300">ISO格式</div>
          <div className="text-lg font-semibold">
            {isNaN(date.getTime()) ? "无效日期" : date.toISOString()}
          </div>
          <button
            onClick={() => copyToClipboard(isNaN(date.getTime()) ? "" : date.toISOString())}
            disabled={isNaN(date.getTime())}
            className="mt-2 text-sm text-purple-600 dark:text-purple-400 hover:underline disabled:opacity-50"
          >
            复制
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p className="font-semibold">功能说明:</p>
        <ul className="list-disc pl-5 space-y-1">
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
