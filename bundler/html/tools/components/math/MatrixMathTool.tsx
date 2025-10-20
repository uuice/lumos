import React, { useMemo, useState } from 'react';

type Matrix = number[][];

function parseMatrix(input: string): Matrix | null {
  try {
    const rows = input.trim().split(/\n+/).map(r => r.trim()).filter(Boolean);
    const matrix = rows.map(r => r.split(/\s+/).map(Number));
    const cols = matrix[0]?.length || 0;
    if (!cols || matrix.some(r => r.length !== cols || r.some(n => !isFinite(n)))) return null;
    return matrix;
  } catch { return null; }
}

function add(a: Matrix, b: Matrix): Matrix { return a.map((r,i)=>r.map((v,j)=>v + b[i][j])); }
function sub(a: Matrix, b: Matrix): Matrix { return a.map((r,i)=>r.map((v,j)=>v - b[i][j])); }
function mul(a: Matrix, b: Matrix): Matrix {
  const res: Matrix = Array.from({length: a.length}, ()=>Array(b[0].length).fill(0));
  for (let i=0;i<a.length;i++) for (let k=0;k<b.length;k++) for (let j=0;j<b[0].length;j++) res[i][j]+=a[i][k]*b[k][j];
  return res;
}

const MatrixMathTool = () => {
  const [a, setA] = useState<string>('1 0\n0 1');
  const [b, setB] = useState<string>('1 2\n3 4');
  const [op, setOp] = useState<'add'|'sub'|'mul'>('mul');

  const mA = useMemo(()=>parseMatrix(a),[a]);
  const mB = useMemo(()=>parseMatrix(b),[b]);

  const result = useMemo(()=>{
    if (!mA || !mB) return null;
    if (op === 'add' || op === 'sub') {
      if (mA.length !== mB.length || mA[0].length !== mB[0].length) return null;
      return op==='add'?add(mA,mB):sub(mA,mB);
    }
    if (op === 'mul') {
      if (mA[0].length !== mB.length) return null;
      return mul(mA,mB);
    }
    return null;
  }, [mA,mB,op]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">矩阵运算</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">矩阵 A</label>
            <textarea value={a} onChange={(e)=>setA(e.target.value)} rows={6} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">矩阵 B</label>
            <textarea value={b} onChange={(e)=>setB(e.target.value)} rows={6} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm dark:bg-gray-700 dark:text-white" />
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-4">
          <label>运算</label>
          <select value={op} onChange={(e)=>setOp(e.target.value as any)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
            <option value="add">A + B</option>
            <option value="sub">A - B</option>
            <option value="mul">A × B</option>
          </select>
        </div>
        <div className="mt-6">
          <h3 className="font-medium mb-2">结果</h3>
          {!result && <div className="text-sm text-gray-600 dark:text-gray-400">输入无效或维度不匹配</div>}
          {result && (
            <pre className="bg-gray-50 dark:bg-gray-700 rounded-md p-4 overflow-auto text-sm">
{result.map(row=>row.join(' ')).join('\n')}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatrixMathTool;



