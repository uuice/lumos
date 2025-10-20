import React, { useMemo, useState } from 'react';

const sample = `id,name,age\n1,Alice,30\n2,Bob,25\n3,Carol,27`;

function parseCsv(text: string): string[][] {
  return text.split(/\r?\n/).filter(Boolean).map(l => l.split(','));
}

const TableSorterTool = () => {
  const [raw, setRaw] = useState<string>(sample);
  const [query, setQuery] = useState<string>('');
  const [sortIdx, setSortIdx] = useState<number>(0);
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('asc');

  const rows = useMemo(()=>parseCsv(raw), [raw]);
  const headers = rows[0] || [];
  const data = rows.slice(1).filter(r => r.join(' ').toLowerCase().includes(query.toLowerCase())).sort((a,b)=>{
    const va = a[sortIdx] || ''; const vb = b[sortIdx] || '';
    if (va === vb) return 0; return (va > vb ? 1 : -1) * (sortDir==='asc'?1:-1);
  });

  const setSort = (idx: number) => {
    if (idx === sortIdx) setSortDir(sortDir==='asc'?'desc':'asc'); else { setSortIdx(idx); setSortDir('asc'); }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">表格排序 / 筛选</h2>
        <div className="mb-4">
          <label htmlFor="csvInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            CSV数据
          </label>
          <textarea
            id="csvInput"
            value={raw}
            onChange={(e)=>setRaw(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex-1 mr-4">
            <label htmlFor="filterInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              筛选关键词
            </label>
            <input
              id="filterInput"
              placeholder="输入关键词进行筛选"
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-4 py-2.5 rounded-lg">
            排序: <span className="font-medium">{headers[sortIdx]}</span> ({sortDir})
          </div>
        </div>
        <div className="mt-6 overflow-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150 flex items-center"
                    onClick={()=>setSort(i)}
                  >
                    <span>{h}</span>
                    {i === sortIdx && (
                      <span className="ml-1">
                        {sortDir === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {data.map((r, i) => (
                <tr
                  key={i}
                  className={`${i%2? 'bg-gray-50 dark:bg-gray-700/50':''} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150`}
                >
                  {r.map((c, j) => (
                    <td key={j} className="px-4 py-3 whitespace-pre">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableSorterTool;

