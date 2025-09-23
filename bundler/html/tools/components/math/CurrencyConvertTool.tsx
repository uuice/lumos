import React, { useMemo, useState } from 'react';

// Static FX rates (base USD). For demo only.
const RATES: Record<string, number> = {
  USD: 1,
  CNY: 7.25,
  EUR: 0.92,
  JPY: 147,
  GBP: 0.78,
  HKD: 7.8,
  AUD: 1.5,
  CAD: 1.35
};

const codes = Object.keys(RATES);

const CurrencyConvertTool = () => {
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('CNY');
  const [amount, setAmount] = useState<string>('1');

  const result = useMemo(() => {
    const n = parseFloat(amount);
    if (!isFinite(n)) return null;
    const usd = n / RATES[from];
    const out = usd * RATES[to];
    return out;
  }, [from, to, amount]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">静态汇率换算（演示）</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">从</label>
            <select value={from} onChange={(e)=>setFrom(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
              {codes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">到</label>
            <select value={to} onChange={(e)=>setTo(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
              {codes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">金额</label>
          <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
        </div>
        <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4 text-center">
          {result == null ? (
            <span className="text-gray-600 dark:text-gray-300">请输入有效金额</span>
          ) : (
            <span className="text-gray-800 dark:text-white text-lg">≈ {result.toFixed(4)} {to}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConvertTool;


