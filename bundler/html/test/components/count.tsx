import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="text-center">
        <h3 className="text-xl font-bold text-slate-700 mb-2">Counter</h3>
        <p className="text-slate-500">Click the button to increase the count</p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-lg opacity-70 animate-pulse"></div>
        <div className="relative flex items-center justify-center h-32 w-32 bg-white rounded-full border-4 border-white shadow-md">
          <span className="text-4xl font-bold text-slate-800">{count}</span>
        </div>
      </div>

      <button
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-black font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        onClick={() => setCount(count + 1)}
      >
        Increment Count
      </button>

      <button
        className="text-slate-500 hover:text-slate-700 font-medium transition-colors duration-200"
        onClick={() => setCount(0)}
      >
        Reset
      </button>
    </div>
  );
};
