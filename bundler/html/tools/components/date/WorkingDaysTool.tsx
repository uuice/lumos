import React, { useState } from 'react';

function countWorkingDays(start: Date, end: Date): number {
  let count = 0;
  const d = new Date(start);
  while (d <= end) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) count++;
    d.setDate(d.getDate() + 1);
  }
  return count;
}

const WorkingDaysTool = () => {
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [days, setDays] = useState<number | null>(null);

  const calc = () => {
    const s = new Date(start);
    const e = new Date(end);
    if (isNaN(s.getTime()) || isNaN(e.getTime()) || s > e) return;
    setDays(countWorkingDays(s, e));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">工作日计算</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">开始日期</label>
            <input type="date" value={start} onChange={(e)=>setStart(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">结束日期</label>
            <input type="date" value={end} onChange={(e)=>setEnd(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
          </div>
        </div>
        <div className="flex space-x-3 mt-4">
          <button onClick={calc} disabled={!start || !end} className={`px-4 py-2 rounded-md ${(!start||!end)?'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400':'bg-blue-500 text-white hover:bg-blue-600'}`}>计算</button>
        </div>
        {days !== null && (
          <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4 text-center">
            <p className="text-gray-800 dark:text-white text-lg">工作日：{days} 天（不含周末）</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkingDaysTool;


