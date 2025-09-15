import { createRoot } from 'react-dom/client';
import { Counter } from './components/count';

import './test-page.css';


export const App = () => (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">Example App</h1>
          <p className="text-slate-500 text-lg">A modern Tailwind CSS demonstration</p>
        </header>
        
        <main className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
            <Counter />
          </div>
        </main>
        
        <footer className="mt-12 text-slate-400 text-sm">
          <p>Powered by Tailwind CSS & React</p>
        </footer>
      </div>
);


// 渲染组件
const root = document.getElementById('root')
if (root) {
  const reactRoot = createRoot(root)
  reactRoot.render(<App />)
}
