import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// 假期倒计时组件基类
const HolidayCountdown = ({ name, startDate, endDate, icon, color, pastMessage }: {
  name: string;
  startDate: string;
  endDate: string;
  icon: string;
  color: string;
  pastMessage: string;
}) => {
  const [timeInfo, setTimeInfo] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
    isOngoing: false
  });

  useEffect(() => {
    const startHolidayDate = new Date(startDate);
    const endHolidayDate = new Date(endDate);

    const calculateTimeRemaining = () => {
      const now = new Date();

      // 检查是否在假期中
      if (now >= startHolidayDate && now <= endHolidayDate) {
        // 假期中，计算剩余时间
        const difference = endHolidayDate.getTime() - now.getTime();
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeInfo({ days, hours, minutes, seconds, isPast: false, isOngoing: true });
      }
      // 检查是否假期已过
      else if (now > endHolidayDate) {
        setTimeInfo({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true, isOngoing: false });
      }
      // 还未到假期
      else {
        const difference = startHolidayDate.getTime() - now.getTime();
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeInfo({ days, hours, minutes, seconds, isPast: false, isOngoing: false });
      }
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, [startDate, endDate]);

  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">{name}</h2>
      {timeInfo.isPast ? (
        <div className="text-center py-3">
          <div className={`text-base ${color} font-semibold mb-1`}>🎉 {pastMessage}</div>
          <div className="text-xs text-gray-500">假期已结束，期待下一个假期</div>
        </div>
      ) : timeInfo.isOngoing ? (
        <div className="text-center py-3">
          <div className={`text-base ${color} font-semibold mb-2`}>🎊 {name}进行中</div>
          <div className="text-xs text-gray-500 mb-3">剩余时间：</div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-gray-100 rounded-lg p-2">
              <div className="text-base font-semibold text-gray-800">{timeInfo.days}</div>
              <div className="text-xs text-gray-500">天</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-2">
              <div className="text-base font-semibold text-gray-800">{timeInfo.hours}</div>
              <div className="text-xs text-gray-500">时</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-2">
              <div className="text-base font-semibold text-gray-800">{timeInfo.minutes}</div>
              <div className="text-xs text-gray-500">分</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-2">
              <div className="text-base font-semibold text-gray-800">{timeInfo.seconds}</div>
              <div className="text-xs text-gray-500">秒</div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-2 text-center mb-3">
            <div className="bg-gray-100 rounded-lg p-2">
              <div className="text-base font-semibold text-gray-800">{timeInfo.days}</div>
              <div className="text-xs text-gray-500">天</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-2">
              <div className="text-base font-semibold text-gray-800">{timeInfo.hours}</div>
              <div className="text-xs text-gray-500">时</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-2">
              <div className="text-base font-semibold text-gray-800">{timeInfo.minutes}</div>
              <div className="text-xs text-gray-500">分</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-2">
              <div className="text-base font-semibold text-gray-800">{timeInfo.seconds}</div>
              <div className="text-xs text-gray-500">秒</div>
            </div>
          </div>
          <div className="text-center mt-2">
            <i className={`fas ${icon} text-xl ${color}`}></i>
          </div>
        </>
      )}
    </div>
  );
};

// 下班倒计时组件
const OffWorkCountdown = () => {
  const [timeInfo, setTimeInfo] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOffWork: false,
    isWeekend: false
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

      // 检查是否是周末
      if (day === 0 || day === 6) {
        // 周末，计算到下周一上班时间
        const nextMonday = new Date();
        nextMonday.setDate(now.getDate() + (8 - day) % 7);
        nextMonday.setHours(9, 0, 0, 0); // 假设周一上午9点上班

        const difference = nextMonday.getTime() - now.getTime();
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeInfo({ hours, minutes, seconds, isOffWork: false, isWeekend: true });
      } else {
        // 工作日
        // 计算到下班时间（18:00）
        const offWorkTime = new Date();
        offWorkTime.setHours(18, 0, 0, 0);

        // 计算到上班时间（9:00）
        const onWorkTime = new Date();
        onWorkTime.setHours(9, 0, 0, 0);

        if (now < onWorkTime) {
          // 还未上班，计算到上班时间
          const difference = onWorkTime.getTime() - now.getTime();
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeInfo({ hours, minutes, seconds, isOffWork: true, isWeekend: false });
        } else if (now >= onWorkTime && now < offWorkTime) {
          // 工作中，计算到下班时间
          const difference = offWorkTime.getTime() - now.getTime();
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeInfo({ hours, minutes, seconds, isOffWork: false, isWeekend: false });
        } else {
          // 已下班，计算到明天上班时间
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(9, 0, 0, 0);

          const difference = tomorrow.getTime() - now.getTime();
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeInfo({ hours, minutes, seconds, isOffWork: true, isWeekend: false });
        }
      }
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">工作时间</h2>
      {timeInfo.isWeekend ? (
        <div className="text-center py-3">
          <div className="text-base text-purple-600 font-semibold mb-1">🛌 周末愉快！</div>
          <div className="text-xs text-gray-500 mb-3">距离周一上班还有：</div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-gray-100 rounded-lg p-2">
              <div className="text-base font-semibold text-gray-800">{timeInfo.hours}</div>
              <div className="text-xs text-gray-500">时</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-2">
              <div className="text-base font-semibold text-gray-800">{timeInfo.minutes}</div>
              <div className="text-xs text-gray-500">分</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-2">
              <div className="text-base font-semibold text-gray-800">{timeInfo.seconds}</div>
              <div className="text-xs text-gray-500">秒</div>
            </div>
          </div>
        </div>
      ) : timeInfo.isOffWork ? (
        <div className="text-center py-3">
          <div className="text-base text-green-600 font-semibold mb-1">🌙 下班时间！</div>
          <div className="text-xs text-gray-500 mb-3">距离上班还有：</div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-gray-100 rounded-lg p-2">
              <div className="text-base font-semibold text-gray-800">{timeInfo.hours}</div>
              <div className="text-xs text-gray-500">时</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-2">
              <div className="text-base font-semibold text-gray-800">{timeInfo.minutes}</div>
              <div className="text-xs text-gray-500">分</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-2">
              <div className="text-base font-semibold text-gray-800">{timeInfo.seconds}</div>
              <div className="text-xs text-gray-500">秒</div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2 text-center mb-3">
            <div className="bg-gray-100 rounded-lg p-2">
              <div className="text-base font-semibold text-gray-800">{timeInfo.hours}</div>
              <div className="text-xs text-gray-500">时</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-2">
              <div className="text-base font-semibold text-gray-800">{timeInfo.minutes}</div>
              <div className="text-xs text-gray-500">分</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-2">
              <div className="text-base font-semibold text-gray-800">{timeInfo.seconds}</div>
              <div className="text-xs text-gray-500">秒</div>
            </div>
          </div>
          <div className="text-center mt-2">
            <i className="fas fa-briefcase text-xl text-blue-600"></i>
          </div>
        </>
      )}
    </div>
  );
};

// 主应用组件
const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 2025年假期数据，按时间倒序排列
  const holidays = [
    {
      name: "国庆节、中秋节",
      startDate: "2025-10-01T00:00:00",
      endDate: "2025-10-08T23:59:59",
      icon: "fa-flag",
      color: "text-red-600",
      pastMessage: "国庆快乐！"
    },
    {
      name: "端午节",
      startDate: "2025-05-31T00:00:00",
      endDate: "2025-06-02T23:59:59",
      icon: "fa-seedling",
      color: "text-green-600",
      pastMessage: "端午安康！"
    },
    {
      name: "劳动节",
      startDate: "2025-05-01T00:00:00",
      endDate: "2025-05-05T23:59:59",
      icon: "fa-briefcase",
      color: "text-blue-600",
      pastMessage: "劳动节快乐！"
    },
    {
      name: "清明节",
      startDate: "2025-04-04T00:00:00",
      endDate: "2025-04-06T23:59:59",
      icon: "fa-leaf",
      color: "text-green-500",
      pastMessage: "清明安康！"
    },
    {
      name: "春节",
      startDate: "2025-01-28T00:00:00",
      endDate: "2025-02-04T23:59:59",
      icon: "fa-dragon",
      color: "text-red-500",
      pastMessage: "春节快乐！"
    },
    {
      name: "元旦",
      startDate: "2025-01-01T00:00:00",
      endDate: "2025-01-01T23:59:59",
      icon: "fa-glass-cheers",
      color: "text-yellow-500",
      pastMessage: "元旦快乐！"
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="max-w-6xl mx-auto">
        {/* 头部时间显示 */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">时间倒计时</h1>
          <div className="text-xl text-gray-600 font-mono bg-white rounded-xl p-3 inline-block shadow-sm border border-gray-200">
            {currentTime.toLocaleString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            })}
          </div>
        </div>

        {/* 倒计时卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 下班倒计时 */}
          <OffWorkCountdown />

          {/* 假期倒计时 */}
          {holidays.map((holiday, index) => (
            <HolidayCountdown
              key={index}
              name={holiday.name}
              startDate={holiday.startDate}
              endDate={holiday.endDate}
              icon={holiday.icon}
              color={holiday.color}
              pastMessage={holiday.pastMessage}
            />
          ))}
        </div>

        {/* 页面说明 */}
        <div className="mt-10 text-center text-gray-500">
          <p className="text-base">2025年法定节假日倒计时</p>
        </div>
      </div>
    </div>
  );
};

// 渲染应用
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
