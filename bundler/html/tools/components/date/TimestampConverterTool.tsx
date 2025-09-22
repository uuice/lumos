import React, { useState } from 'react';

const TimestampConverterTool = () => {
  const [timestamp, setTimestamp] = useState('');
  const [date, setDate] = useState('');
  const [isUnix, setIsUnix] = useState(true);
  const [convertedValue, setConvertedValue] = useState('');

  // 处理时间戳输入变化
  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimestamp(value);

    if (value) {
      if (isUnix) {
        // Unix时间戳转换为日期
        const timestampNum = parseInt(value);
        if (!isNaN(timestampNum)) {
          // 如果输入的是秒级时间戳，转换为毫秒
          const milliseconds = timestampNum.toString().length === 10 ? timestampNum * 1000 : timestampNum;
          const dateObj = new Date(milliseconds);
          if (dateObj.getTime() > 0) {
            setDate(dateObj.toLocaleString('zh-CN'));
            setConvertedValue(dateObj.toLocaleString('zh-CN'));
          } else {
            setConvertedValue('无效的时间戳');
          }
        } else {
          setConvertedValue('请输入有效的时间戳');
        }
      } else {
        // JavaScript时间戳转换为日期
        const timestampNum = parseInt(value);
        if (!isNaN(timestampNum)) {
          const dateObj = new Date(timestampNum);
          if (dateObj.getTime() > 0) {
            setDate(dateObj.toLocaleString('zh-CN'));
            setConvertedValue(dateObj.toLocaleString('zh-CN'));
          } else {
            setConvertedValue('无效的时间戳');
          }
        } else {
          setConvertedValue('请输入有效的时间戳');
        }
      }
    } else {
      setConvertedValue('');
    }
  };

  // 处理日期输入变化
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDate(value);

    if (value) {
      const dateObj = new Date(value);
      if (dateObj.toString() !== 'Invalid Date') {
        if (isUnix) {
          // 转换为Unix时间戳（秒）
          const unixTimestamp = Math.floor(dateObj.getTime() / 1000);
          setTimestamp(unixTimestamp.toString());
          setConvertedValue(unixTimestamp.toString());
        } else {
          // 转换为JavaScript时间戳（毫秒）
          const jsTimestamp = dateObj.getTime();
          setTimestamp(jsTimestamp.toString());
          setConvertedValue(jsTimestamp.toString());
        }
      } else {
        setConvertedValue('请输入有效的日期');
      }
    } else {
      setConvertedValue('');
    }
  };

  // 切换时间戳类型
  const toggleTimestampType = () => {
    const newIsUnix = !isUnix;
    setIsUnix(newIsUnix);

    // 重新计算转换结果
    if (timestamp) {
      handleTimestampChange({ target: { value: timestamp } } as React.ChangeEvent<HTMLInputElement>);
    } else if (date) {
      handleDateChange({ target: { value: date } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  // 获取当前时间戳
  const getCurrentTimestamp = () => {
    const now = new Date();
    if (isUnix) {
      const unixTimestamp = Math.floor(now.getTime() / 1000);
      setTimestamp(unixTimestamp.toString());
      handleTimestampChange({ target: { value: unixTimestamp.toString() } } as React.ChangeEvent<HTMLInputElement>);
    } else {
      const jsTimestamp = now.getTime();
      setTimestamp(jsTimestamp.toString());
      handleTimestampChange({ target: { value: jsTimestamp.toString() } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  // 获取当前日期
  const getCurrentDate = () => {
    const now = new Date();
    const nowString = now.toISOString().slice(0, 19);
    setDate(nowString);
    handleDateChange({ target: { value: nowString } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">时间戳转换器</h2>

        <div className="flex items-center mb-6">
          <span className="mr-2 text-gray-700 dark:text-gray-300">Unix时间戳(秒)</span>
          <button
            onClick={toggleTimestampType}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className={`${isUnix ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
          </button>
          <span className="ml-2 text-gray-700 dark:text-gray-300">JavaScript时间戳(毫秒)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="timestamp-input" className="block text-sm font-medium">
                {isUnix ? 'Unix时间戳 (秒)' : 'JavaScript时间戳 (毫秒)'}
              </label>
              <button
                onClick={getCurrentTimestamp}
                className="text-xs text-blue-500 hover:text-blue-700"
              >
                获取当前时间戳
              </button>
            </div>
            <input
              id="timestamp-input"
              type="text"
              value={timestamp}
              onChange={handleTimestampChange}
              placeholder={isUnix ? "输入Unix时间戳..." : "输入JavaScript时间戳..."}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="date-input" className="block text-sm font-medium">日期时间</label>
              <button
                onClick={getCurrentDate}
                className="text-xs text-blue-500 hover:text-blue-700"
              >
                获取当前时间
              </button>
            </div>
            <input
              id="date-input"
              type="datetime-local"
              value={date}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {convertedValue && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-md">
            <h3 className="font-medium mb-2">转换结果:</h3>
            <p className="text-lg font-mono">{convertedValue}</p>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">时间戳说明</h2>

        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Unix时间戳</h3>
            <p>Unix时间戳是从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数，不包括闰秒。</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">JavaScript时间戳</h3>
            <p>JavaScript时间戳是从1970年1月1日（UTC/GMT的午夜）开始所经过的毫秒数。</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">转换说明</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Unix时间戳通常是10位数字</li>
              <li>JavaScript时间戳通常是13位数字</li>
              <li>如果输入10位数字，系统会自动识别为Unix时间戳并转换为毫秒</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimestampConverterTool;
