import React, { useMemo, useState } from 'react';

const QuadraticSolverTool = () => {
  const [a, setA] = useState<string>('1');
  const [b, setB] = useState<string>('0');
  const [c, setC] = useState<string>('0');

  const parsed = useMemo(() => ({
    a: parseFloat(a),
    b: parseFloat(b),
    c: parseFloat(c)
  }), [a,b,c]);

  const result = useMemo(() => {
    const { a, b, c } = parsed;
    if (!isFinite(a) || !isFinite(b) || !isFinite(c)) return null;
    if (a === 0) return { type: 'linear' as const, x: -c / b };
    const D = b*b - 4*a*c;
    if (D > 0) {
      const x1 = (-b + Math.sqrt(D)) / (2*a);
      const x2 = (-b - Math.sqrt(D)) / (2*a);
      return { type: 'two', x1, x2, D };
    } else if (D === 0) {
      const x = -b / (2*a);
      return { type: 'double', x, D };
    } else {
      const real = (-b / (2*a));
      const imag = Math.sqrt(-D) / (2*a);
      return { type: 'complex', real, imag, D };
    }
  }, [parsed]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">一元二次方程求解 ax²+bx+c=0</h2>
        <div className="grid grid-cols-3 gap-3">
          {([['a', a, setA], ['b', b, setB], ['c', c, setC]] as const).map(([label, val, setter]) => (
            <div key={label}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
              <input type="number" value={val} onChange={(e)=>setter(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
            </div>
          ))}
        </div>
        {result && (
          <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
            {'type' in result && result.type === 'two' && (
              <p className="text-gray-800 dark:text-white">判别式 D = {result.D.toFixed(4)}，有两个实根：x₁ = {result.x1}, x₂ = {result.x2}</p>
            )}
            {'type' in result && result.type === 'double' && (
              <p className="text-gray-800 dark:text-white">判别式 D = 0，重根：x = {result.x}</p>
            )}
            {'type' in result && result.type === 'linear' && (
              <p className="text-gray-800 dark:text-white">退化为一次方程：x = {result.x}</p>
            )}
            {'type' in result && result.type === 'complex' && (
              <p className="text-gray-800 dark:text-white">判别式 D = {result.D.toFixed(4)}，共轭复根：x = {result.real} ± {result.imag}i</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuadraticSolverTool;


