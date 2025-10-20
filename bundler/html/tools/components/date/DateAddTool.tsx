import React, { useState } from 'react';

const DateAddTool = () => {
  const [base, setBase] = useState<string>(() => new Date().toISOString().slice(0, 16));
  const [years, setYears] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [result, setResult] = useState<string>('');

  const apply = () => {
    const d = new Date(base);
    if (isNaN(d.getTime())) return;
    const res = new Date(d);
    res.setFullYear(res.getFullYear() + years);
    res.setMonth(res.getMonth() + months);
    res.setDate(res.getDate() + days);
    res.setHours(res.getHours() + hours);
    res.setMinutes(res.getMinutes() + minutes);
    setResult(res.toLocaleString('zh-CN'));
  };

  const reset = () => {
    setYears(0); setMonths(0); setDays(0); setHours(0); setMinutes(0); setResult('');
  };

  const NumberInput = ({ label, value, onChange }: { label: string; value: number; onChange: (v:number)=>void }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <input type="number" value={value} onChange={(e)=>onChange(parseInt(e.target.value||'0'))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">日期加减</h2>

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">基准时间</label>
        <input type="datetime-local" value={base} onChange={(e)=>setBase(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <NumberInput label="年" value={years} onChange={setYears} />
          <NumberInput label="月" value={months} onChange={setMonths} />
          <NumberInput label="天" value={days} onChange={setDays} />
          <NumberInput label="小时" value={hours} onChange={setHours} />
          <NumberInput label="分钟" value={minutes} onChange={setMinutes} />
        </div>

        <div className="flex space-x-3 mt-4">
          <button onClick={apply} className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">计算</button>
          <button onClick={reset} className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white">重置</button>
        </div>

        {result && (
          <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4 text-center">
            <p className="text-gray-800 dark:text-white text-lg">结果：{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateAddTool;



