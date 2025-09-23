import React, { useMemo, useRef, useState } from 'react';

function buildMonthMatrix(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<number | null> = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (Array<number | null>)[] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

const CalendarMakerTool = () => {
  const now = new Date();
  const [year, setYear] = useState<number>(now.getFullYear());
  const [month, setMonth] = useState<number>(now.getMonth());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const matrix = useMemo(() => buildMonthMatrix(year, month), [year, month]);

  const exportPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url; a.download = `calendar-${year}-${month + 1}.png`; a.click();
  };

  const draw = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = (canvas.width = 800);
    const h = (canvas.height = 600);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 28px system-ui, -apple-system, Segoe UI, Roboto';
    const title = `${year} 年 ${month + 1} 月`;
    ctx.fillText(title, 30, 50);
    const weekdays = ['日','一','二','三','四','五','六'];
    ctx.font = 'bold 16px system-ui, -apple-system, Segoe UI, Roboto';
    weekdays.forEach((d, i) => ctx.fillText(d, 30 + i * 100, 90));
    // grid
    const cellW = 100; const cellH = 70; const top = 110; const left = 20;
    ctx.strokeStyle = '#e5e7eb';
    for (let r = 0; r <= matrix.length; r++) {
      ctx.beginPath(); ctx.moveTo(left, top + r * cellH); ctx.lineTo(left + 7 * cellW, top + r * cellH); ctx.stroke();
    }
    for (let c = 0; c <= 7; c++) {
      ctx.beginPath(); ctx.moveTo(left + c * cellW, top); ctx.lineTo(left + c * cellW, top + matrix.length * cellH); ctx.stroke();
    }
    // numbers
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 18px system-ui, -apple-system, Segoe UI, Roboto';
    matrix.forEach((week, r) => week.forEach((d, c) => {
      if (d == null) return;
      ctx.fillText(String(d), left + c * cellW + 8, top + r * cellH + 24);
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">月历 PNG 生成</h2>
        <div className="flex items-center space-x-3">
          <label className="text-sm">年份</label>
          <input type="number" value={year} onChange={(e)=>setYear(parseInt(e.target.value||'0'))} className="w-28 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
          <label className="text-sm">月份</label>
          <select value={month} onChange={(e)=>setMonth(parseInt(e.target.value))} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
            {Array.from({length:12}).map((_,i)=>(<option key={i} value={i}>{i+1}</option>))}
          </select>
          <button onClick={exportPng} className="ml-auto px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">导出 PNG</button>
        </div>
        <div className="mt-4 overflow-auto">
          <canvas ref={(el)=>{canvasRef.current = el; if (el) draw(el);}} className="bg-white rounded-md border border-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default CalendarMakerTool;


