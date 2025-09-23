import React, { useMemo, useState } from 'react';

function parseCsv(text: string, delimiter = ','): string[][] {
  const lines = text.split(/\r?\n/).filter(l => l.length);
  return lines.map(line => {
    const cells: string[] = [];
    let cur = '';
    let inQ = false;
    for (let i=0;i<line.length;i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQ && line[i+1] === '"') { cur += '"'; i++; }
        else inQ = !inQ;
      } else if (ch === delimiter && !inQ) {
        cells.push(cur); cur = '';
      } else cur += ch;
    }
    cells.push(cur);
    return cells;
  });
}

const CsvPreviewTool = () => {
  const [raw, setRaw] = useState<string>('id,name\n1,Alice\n2,Bob');
  const [delimiter, setDelimiter] = useState<string>(',');
  const rows = useMemo(()=>parseCsv(raw, delimiter), [raw, delimiter]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">CSV 预览</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CSV 数据:</label>
          <textarea
            value={raw}
            onChange={(e)=>setRaw(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
        </div>
        <div className="flex items-center space-x-3 mt-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="delimiter">分隔符:</label>
          <input
            id="delimiter"
            value={delimiter}
            onChange={(e)=>setDelimiter(e.target.value)}
            className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
        </div>
        <div className="mt-5 bg-white dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">预览结果:</h3>
          <div className="overflow-auto rounded-lg border border-gray-300 dark:border-gray-600">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className={i%2? 'bg-gray-50 dark:bg-gray-700':''}>
                    {r.map((c, j) => <td key={j} className="px-4 py-3 whitespace-pre border-r border-gray-200 dark:border-gray-700 last:border-r-0">{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CsvPreviewTool;
