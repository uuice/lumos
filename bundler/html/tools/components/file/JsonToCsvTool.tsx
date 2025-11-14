import React, { useMemo, useState } from 'react';

function toCsv(data: any[]): string {
  if (!data.length) return '';
  const headers = Array.from(new Set(data.flatMap(obj => Object.keys(obj || {}))));
  const escape = (v: any) => {
    const s = v == null ? '' : String(v).replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  };
  const rows = [headers.join(',')];
  for (const row of data) rows.push(headers.map(h => escape((row||{})[h])).join(','));
  return rows.join('\n');
}

const JsonToCsvTool = () => {
  const [input, setInput] = useState<string>('[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]');
  const [delimiter, setDelimiter] = useState<string>(',');

  const output = useMemo(()=>{
    try {
      const json = JSON.parse(input);
      if (Array.isArray(json)) {
        const csv = toCsv(json);
        return delimiter === ',' ? csv : csv.replace(/,/g, delimiter);
      }
      return '';
    } catch { return ''; }
  }, [input, delimiter]);

  const download = () => {
    const blob = new Blob([output], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'data.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">JSON → CSV</h2>
        <textarea value={input} onChange={(e)=>setInput(e.target.value)} rows={10} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm dark:bg-gray-700 dark:text-white" />
        <div className="flex items-center space-x-3 mt-3">
          <label>分隔符</label>
          <input value={delimiter} onChange={(e)=>setDelimiter(e.target.value)} className="w-24 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white" />
        </div>
        <div className="mt-4">
          <h3 className="font-medium mb-2">输出</h3>
          <textarea readOnly value={output} rows={10} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-700 dark:text-white" />
          <button onClick={download} disabled={!output} className={`mt-3 px-4 py-2 rounded-md ${output?'bg-blue-500 text-white hover:bg-blue-600':'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>下载 CSV</button>
        </div>
      </div>
    </div>
  );
};

export default JsonToCsvTool;




