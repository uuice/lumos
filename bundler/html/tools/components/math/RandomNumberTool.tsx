import React, { useMemo, useState } from 'react';

function mulberry32(seed: number) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const RandomNumberTool = () => {
  const [min, setMin] = useState<string>('1');
  const [max, setMax] = useState<string>('100');
  const [seed, setSeed] = useState<string>('');
  const [count, setCount] = useState<string>('1');

  const values = useMemo(() => {
    const nMin = parseFloat(min);
    const nMax = parseFloat(max);
    const nCount = Math.max(1, Math.min(1000, parseInt(count) || 1));
    if (!isFinite(nMin) || !isFinite(nMax) || nMax < nMin) return [] as number[];
    const rng = seed ? mulberry32(parseInt(seed) || 0) : Math.random;
    const out: number[] = [];
    for (let i=0;i<nCount;i++) out.push(nMin + (nMax - nMin) * rng());
    return out;
  }, [min,max,seed,count]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">随机数生成</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">最小值</label>
            <input type="number" value={min} onChange={(e)=>setMin(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">最大值</label>
            <input type="number" value={max} onChange={(e)=>setMax(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">数量</label>
            <input type="number" value={count} onChange={(e)=>setCount(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">种子 (可选)</label>
            <input value={seed} onChange={(e)=>setSeed(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
          </div>
        </div>
        <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
          {values.length ? values.map(v=>v.toFixed(6)).join('\n') : '输入无效'}
        </div>
      </div>
    </div>
  );
};

export default RandomNumberTool;



