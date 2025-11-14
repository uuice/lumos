import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// 数字时钟组件
const DigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 格式化时间
  const formattedTime = currentTime.toLocaleTimeString('zh-CN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // 格式化日期
  const formattedDate = currentTime.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short'
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-6xl font-bold text-gray-800 tracking-wider mb-2">
        {formattedTime}
      </div>
      <div className="text-xl text-gray-600">
        {formattedDate}
      </div>
      <div className="mt-4 text-lg text-gray-500">
        北京时间 (GMT +8:00)
      </div>
    </div>
  );
};

// 倒计时组件
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 5,
    seconds: 0
  });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
            setIsActive(false);
            return prev;
          }

          let { hours, minutes, seconds } = prev;
          if (seconds > 0) {
            seconds--;
          } else if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          }

          return { hours, minutes, seconds };
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  const handleReset = () => {
    setIsActive(false);
    setTimeLeft({ hours: 0, minutes: 5, seconds: 0 });
  };

  const handleTimeChange = (unit: string, value: number) => {
    setTimeLeft(prev => ({
      ...prev,
      [unit]: Math.max(0, Math.min(59, value))
    }));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-5xl font-mono font-bold mb-8">
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleStart}
          disabled={isActive}
          className={`px-6 py-2 rounded-lg text-white ${
            isActive ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          开始
        </button>
        <button
          onClick={handlePause}
          disabled={!isActive}
          className={`px-6 py-2 rounded-lg text-white ${
            !isActive ? 'bg-gray-400' : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
        >
          暂停
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          重置
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="flex flex-col items-center">
          <label htmlFor="hours-input" className="text-sm text-gray-600 mb-1">小时</label>
          <input
            id="hours-input"
            type="number"
            min="0"
            max="23"
            value={timeLeft.hours}
            onChange={(e) => handleTimeChange('hours', parseInt(e.target.value) || 0)}
            className="w-16 text-center border border-gray-300 rounded p-2"
            disabled={isActive}
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="minutes-input" className="text-sm text-gray-600 mb-1">分钟</label>
          <input
            id="minutes-input"
            type="number"
            min="0"
            max="59"
            value={timeLeft.minutes}
            onChange={(e) => handleTimeChange('minutes', parseInt(e.target.value) || 0)}
            className="w-16 text-center border border-gray-300 rounded p-2"
            disabled={isActive}
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="seconds-input" className="text-sm text-gray-600 mb-1">秒</label>
          <input
            id="seconds-input"
            type="number"
            min="0"
            max="59"
            value={timeLeft.seconds}
            onChange={(e) => handleTimeChange('seconds', parseInt(e.target.value) || 0)}
            className="w-16 text-center border border-gray-300 rounded p-2"
            disabled={isActive}
          />
        </div>
      </div>
    </div>
  );
};

// 世界时钟组件
const WorldClock = () => {
  const [timezones] = useState([
    { name: '北京时间', timezone: 'Asia/Shanghai', offset: '+8:00' },
    { name: '纽约时间', timezone: 'America/New_York', offset: '-5:00' },
    { name: '伦敦时间', timezone: 'Europe/London', offset: '+0:00' },
    { name: '东京时间', timezone: 'Asia/Tokyo', offset: '+9:00' },
    { name: '悉尼时间', timezone: 'Australia/Sydney', offset: '+11:00' },
  ]);

  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: Record<string, string> = {};

      timezones.forEach(tz => {
        try {
          // 使用 Intl.DateTimeFormat 获取不同时区的时间
          const formatter = new Intl.DateTimeFormat('zh-CN', {
            timeZone: tz.timezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });

          newTimes[tz.timezone] = formatter.format(new Date());
        } catch {
          newTimes[tz.timezone] = '无法获取';
        }
      });

      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, [timezones]);

  return (
    <div className="w-full">
      {timezones.map((tz, index) => (
        <div
          key={tz.timezone}
          className={`flex justify-between items-center p-4 mb-3 rounded-lg ${
            index % 2 === 0 ? 'bg-blue-50' : 'bg-indigo-50'
          }`}
        >
          <div>
            <div className="font-medium text-gray-800">{tz.name}</div>
            <div className="text-sm text-gray-600">GMT {tz.offset}</div>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {times[tz.timezone] || '--:--:--'}
          </div>
        </div>
      ))}
    </div>
  );
};

// 主应用组件
const TimeApp = () => {
  const [activeTab, setActiveTab] = useState('digital');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* 头部 */}
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center">
          <h1 className="text-2xl font-bold">时间工具箱</h1>
          <p className="text-blue-100 mt-1">实用的时间管理工具集合</p>
        </div>

        {/* 标签页 */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('digital')}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === 'digital'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            数字时钟
          </button>
          <button
            onClick={() => setActiveTab('countdown')}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === 'countdown'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            倒计时
          </button>
          <button
            onClick={() => setActiveTab('world')}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === 'world'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            世界时钟
          </button>
        </div>

        {/* 内容区域 */}
        <div className="p-6 min-h-[300px]">
          {activeTab === 'digital' && <DigitalClock />}
          {activeTab === 'countdown' && <CountdownTimer />}
          {activeTab === 'world' && <WorldClock />}
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<TimeApp />);