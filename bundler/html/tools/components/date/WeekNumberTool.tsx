import React, { useState } from 'react';

// ISO week number calculator
function getIsoWeekNumber(date: Date): { year: number; week: number } {
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const weekNum = Math.ceil((((target.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return { year: target.getUTCFullYear(), week: weekNum };
}

const WeekNumberTool = () => {
  const [dateInput, setDateInput] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const dateObj = new Date(dateInput);
  const { year, week } = isNaN(dateObj.getTime()) ? { year: 0, week: 0 } : getIsoWeekNumber(dateObj);

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">ISO 周数计算器</h2>

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">选择日期</label>
        <input
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />

        {!isNaN(dateObj.getTime()) && (
          <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4 text-center">
            <p className="text-gray-800 dark:text-white text-lg">
              {dateObj.toLocaleDateString('zh-CN')} 属于 {year} 年的第 <span className="font-bold">{week}</span> 周
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeekNumberTool;



