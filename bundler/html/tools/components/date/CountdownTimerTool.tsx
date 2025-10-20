import React, { useEffect, useMemo, useRef, useState } from 'react';

const CountdownTimerTool = () => {
  const [target, setTarget] = useState<string>('');
  const [running, setRunning] = useState(false);
  const [diff, setDiff] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  const validTarget = useMemo(() => {
    if (!target) return null;
    const d = new Date(target);
    return isNaN(d.getTime()) ? null : d;
  }, [target]);

  useEffect(() => {
    if (!running || !validTarget) return;
    const tick = () => {
      const now = Date.now();
      const delta = validTarget.getTime() - now;
      setDiff(delta > 0 ? delta : 0);
      if (delta <= 0 && timerRef.current) {
        cancelAnimationFrame(timerRef.current);
        timerRef.current = null;
        setRunning(false);
      } else {
        timerRef.current = requestAnimationFrame(tick);
      }
    };
    timerRef.current = requestAnimationFrame(tick);
    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
      timerRef.current = null;
    };
  }, [running, validTarget]);

  const start = () => {
    if (!validTarget) return;
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
  };

  const reset = () => {
    setRunning(false);
    setDiff(0);
  };

  const parts = useMemo(() => {
    let ms = Math.max(0, diff);
    const days = Math.floor(ms / 86400000); ms %= 86400000;
    const hours = Math.floor(ms / 3600000); ms %= 3600000;
    const minutes = Math.floor(ms / 60000); ms %= 60000;
    const seconds = Math.floor(ms / 1000);
    return { days, hours, minutes, seconds };
  }, [diff]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">倒计时</h2>

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">目标时间</label>
        <input
          type="datetime-local"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />

        <div className="flex space-x-3 mt-4">
          <button onClick={start} disabled={!validTarget || running} className={`px-4 py-2 rounded-md ${(!validTarget || running) ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>开始</button>
          <button onClick={stop} disabled={!running} className={`px-4 py-2 rounded-md ${!running ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400' : 'bg-yellow-500 text-white hover:bg-yellow-600'}`}>暂停</button>
          <button onClick={reset} className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white">重置</button>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-3 text-center">
          {['天','时','分','秒'].map((label, idx) => (
            <div key={label} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {idx === 0 ? parts.days : idx === 1 ? parts.hours : idx === 2 ? parts.minutes : parts.seconds}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimerTool;



