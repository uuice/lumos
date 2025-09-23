import React, { useMemo, useState } from 'react';

const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function parseInBase(value: string, base: number): number | null {
  const s = value.trim().toUpperCase();
  if (!s) return null;
  let n = 0;
  for (const ch of s) {
    const v = digits.indexOf(ch);
    if (v < 0 || v >= base) return null;
    n = n * base + v;
  }
  return n;
}

function toBase(n: number, base: number): string {
  if (n === 0) return '0';
  let x = Math.floor(Math.abs(n));
  let out = '';
  while (x > 0) { out = digits[x % base] + out; x = Math.floor(x / base); }
  return (n < 0 ? '-' : '') + out;
}

const BaseNConvertTool = () => {
  const [input, setInput] = useState('255');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(16);

  const output = useMemo(() => {
    const n = parseInBase(input, fromBase);
    if (n == null) return '';
    return toBase(n, toBase);
  }, [input, fromBase, toBase]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">进制转换（2-36）</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">输入</label>
          <input value={input} onChange={(e)=>setInput(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">源进制</label>
            <input type="number" min={2} max={36} value={fromBase} onChange={(e)=>setFromBase(parseInt(e.target.value||'10'))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">目标进制</label>
            <input type="number" min={2} max={36} value={toBase} onChange={(e)=>setToBase(parseInt(e.target.value||'10'))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
          </div>
        </div>
        <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4 text-center">
          <span className="text-gray-800 dark:text-white text-lg">{output || '输入无效'}</span>
        </div>
      </div>
    </div>
  );
};

export default BaseNConvertTool;


