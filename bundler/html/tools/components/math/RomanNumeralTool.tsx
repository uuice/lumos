import React, { useMemo, useState } from 'react';

function toRoman(num: number): string {
  if (num <= 0 || num >= 4000) return '';
  const map: [number, string][] = [
    [1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']
  ];
  let res = '';
  for (const [v,s] of map) while (num >= v) { res += s; num -= v; }
  return res;
}

function fromRoman(roman: string): number | null {
  const map: Record<string, number> = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
  const s = roman.toUpperCase();
  let total = 0;
  for (let i=0;i<s.length;i++) {
    const v = map[s[i]]; if (!v) return null;
    const next = map[s[i+1]] || 0;
    if (v < next) { total += next - v; i++; } else { total += v; }
  }
  return total;
}

const RomanNumeralTool = () => {
  const [arabic, setArabic] = useState<string>('2024');
  const [roman, setRoman] = useState<string>('MMXXIV');

  const rFromA = useMemo(()=>{
    const n = parseInt(arabic);
    return isFinite(n) ? toRoman(n) : '';
  }, [arabic]);

  const aFromR = useMemo(()=>fromRoman(roman) ?? '', [roman]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">罗马数字转换</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">阿拉伯数字 → 罗马</label>
            <input type="number" value={arabic} onChange={(e)=>setArabic(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
            <div className="mt-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded">{rFromA}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">罗马 → 阿拉伯数字</label>
            <input type="text" value={roman} onChange={(e)=>setRoman(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
            <div className="mt-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded">{aFromR}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RomanNumeralTool;



