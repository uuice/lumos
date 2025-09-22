import React, { useState } from 'react';

const TriangleSolverTool = () => {
  const [solveType, setSolveType] = useState('sas'); // sas, sss, aas, ssa
  const [sideA, setSideA] = useState('');
  const [sideB, setSideB] = useState('');
  const [sideC, setSideC] = useState('');
  const [angleA, setAngleA] = useState('');
  const [angleB, setAngleB] = useState('');
  const [angleC, setAngleC] = useState('');
  const [result, setResult] = useState<{ sides: number[]; angles: number[]; area: number; perimeter: number } | null>(null);
  const [error, setError] = useState('');

  const degToRad = (degrees: number) => degrees * (Math.PI / 180);
  const radToDeg = (radians: number) => radians * (180 / Math.PI);

  const solveTriangle = () => {
    setError('');
    setResult(null);

    const a = parseFloat(sideA) || 0;
    const b = parseFloat(sideB) || 0;
    const c = parseFloat(sideC) || 0;
    const A = parseFloat(angleA) || 0;
    const B = parseFloat(angleB) || 0;
    const C = parseFloat(angleC) || 0;

    try {
      const solvedSides = [a, b, c];
      const solvedAngles = [A, B, C];

      switch (solveType) {
        case 'sas':
          // 已知两边及夹角
          if (a && b && C) {
            // 使用余弦定理计算第三边
            const c2 = a * a + b * b - 2 * a * b * Math.cos(degToRad(C));
            solvedSides[2] = Math.sqrt(c2);

            // 使用正弦定理计算其他角
            const sinA = (a * Math.sin(degToRad(C))) / solvedSides[2];
            solvedAngles[0] = radToDeg(Math.asin(sinA));

            solvedAngles[1] = 180 - solvedAngles[0] - C;
          } else {
            throw new Error('请输入两边及夹角');
          }
          break;

        case 'sss':
          // 已知三边
          if (a && b && c) {
            // 使用余弦定理计算角度
            const cosA = (b * b + c * c - a * a) / (2 * b * c);
            solvedAngles[0] = radToDeg(Math.acos(cosA));

            const cosB = (a * a + c * c - b * b) / (2 * a * c);
            solvedAngles[1] = radToDeg(Math.acos(cosB));

            solvedAngles[2] = 180 - solvedAngles[0] - solvedAngles[1];
          } else {
            throw new Error('请输入三边长度');
          }
          break;

        case 'aas':
          // 已知两角及一边
          if ((A && B && a) || (A && B && b) || (A && B && c)) {
            solvedAngles[2] = 180 - A - B;

            // 使用正弦定理计算其他边
            if (a) {
              const sinB = Math.sin(degToRad(B));
              const sinA = Math.sin(degToRad(A));
              const sinC = Math.sin(degToRad(solvedAngles[2]));

              solvedSides[1] = (a * sinB) / sinA;
              solvedSides[2] = (a * sinC) / sinA;
            } else if (b) {
              const sinA = Math.sin(degToRad(A));
              const sinB = Math.sin(degToRad(B));
              const sinC = Math.sin(degToRad(solvedAngles[2]));

              solvedSides[0] = (b * sinA) / sinB;
              solvedSides[2] = (b * sinC) / sinB;
            } else if (c) {
              const sinA = Math.sin(degToRad(A));
              const sinB = Math.sin(degToRad(B));
              const sinC = Math.sin(degToRad(solvedAngles[2]));

              solvedSides[0] = (c * sinA) / sinC;
              solvedSides[1] = (c * sinB) / sinC;
            }
          } else {
            throw new Error('请输入两角及一边');
          }
          break;

        default:
          throw new Error('请选择求解类型');
      }

      // 计算面积和周长
      const perimeter = solvedSides[0] + solvedSides[1] + solvedSides[2];
      const s = perimeter / 2; // 半周长
      const area = Math.sqrt(s * (s - solvedSides[0]) * (s - solvedSides[1]) * (s - solvedSides[2])); // 海伦公式

      setResult({
        sides: solvedSides.map(side => parseFloat(side.toFixed(2))),
        angles: solvedAngles.map(angle => parseFloat(angle.toFixed(2))),
        area: parseFloat(area.toFixed(2)),
        perimeter: parseFloat(perimeter.toFixed(2))
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '计算出错');
    }
  };

  const resetCalculator = () => {
    setSideA('');
    setSideB('');
    setSideC('');
    setAngleA('');
    setAngleB('');
    setAngleC('');
    setResult(null);
    setError('');
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // 只允许数字和小数点
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setter(value);
      }
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">三角形求解器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          根据已知条件求解三角形的边长、角度、面积和周长
        </p>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setSolveType('sas')}
              className={`px-4 py-2 rounded-md text-sm ${
                solveType === 'sas'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
              }`}
            >
              两边及夹角 (SAS)
            </button>
            <button
              onClick={() => setSolveType('sss')}
              className={`px-4 py-2 rounded-md text-sm ${
                solveType === 'sss'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
              }`}
            >
              三边 (SSS)
            </button>
            <button
              onClick={() => setSolveType('aas')}
              className={`px-4 py-2 rounded-md text-sm ${
                solveType === 'aas'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
              }`}
            >
              两角及一边 (AAS)
            </button>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white mb-3">边长</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      边 a
                    </label>
                    <input
                      type="text"
                      value={sideA}
                      onChange={handleInputChange(setSideA)}
                      placeholder="输入边长 a"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      边 b
                    </label>
                    <input
                      type="text"
                      value={sideB}
                      onChange={handleInputChange(setSideB)}
                      placeholder="输入边长 b"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      边 c
                    </label>
                    <input
                      type="text"
                      value={sideC}
                      onChange={handleInputChange(setSideC)}
                      placeholder="输入边长 c"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 dark:text-white mb-3">角度 (度)</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      角 A
                    </label>
                    <input
                      type="text"
                      value={angleA}
                      onChange={handleInputChange(setAngleA)}
                      placeholder="输入角度 A"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      角 B
                    </label>
                    <input
                      type="text"
                      value={angleB}
                      onChange={handleInputChange(setAngleB)}
                      placeholder="输入角度 B"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      角 C
                    </label>
                    <input
                      type="text"
                      value={angleC}
                      onChange={handleInputChange(setAngleC)}
                      placeholder="输入角度 C"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mb-6">
          <button
            onClick={solveTriangle}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            求解三角形
          </button>
          <button
            onClick={resetCalculator}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            重置
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4 mb-6">
            <p className="text-red-700 dark:text-red-200">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">求解结果</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white dark:bg-gray-600 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 dark:text-white mb-3">边长</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">a</p>
                    <p className="font-bold text-blue-600 dark:text-blue-400">{result.sides[0]}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">b</p>
                    <p className="font-bold text-blue-600 dark:text-blue-400">{result.sides[1]}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">c</p>
                    <p className="font-bold text-blue-600 dark:text-blue-400">{result.sides[2]}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-600 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 dark:text-white mb-3">角度 (度)</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">A</p>
                    <p className="font-bold text-blue-600 dark:text-blue-400">{result.angles[0]}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">B</p>
                    <p className="font-bold text-blue-600 dark:text-blue-400">{result.angles[1]}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">C</p>
                    <p className="font-bold text-blue-600 dark:text-blue-400">{result.angles[2]}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">面积</h4>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{result.area}</p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">周长</h4>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{result.perimeter}</p>
              </div>
            </div>
          </div>
        )}

        {!result && !error && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
            <div className="mx-auto w-12 h-12 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h4 className="mt-2 text-sm font-medium text-gray-800 dark:text-white">请输入已知条件</h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              选择求解类型并输入相应数值
            </p>
          </div>
        )}

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• SAS: 已知两边及夹角，求解第三边和其他两角</li>
            <li>• SSS: 已知三边，求解三个角</li>
            <li>• AAS: 已知两角及一边，求解其他边和角</li>
            <li>• 角度单位为度，结果保留两位小数</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TriangleSolverTool;
