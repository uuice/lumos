import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // 页面加载动画
    if ((window as any).anime) {
      setTimeout(() => {
        (window as any).anime({
          targets: '.main-title',
          translateX: [-100, 0],
          opacity: [0, 1],
          duration: 1000,
          easing: 'easeOutExpo'
        });

        (window as any).anime({
          targets: '.time-display',
          scale: [0.8, 1],
          opacity: [0, 1],
          duration: 1000,
          delay: 300,
          easing: 'easeOutElastic'
        });

        (window as any).anime({
          targets: '.message',
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 800,
          delay: 600,
          easing: 'easeOutExpo'
        });
      }, 100);
    }
  }, []);

  const toggleMessage = () => {
    setShowMessage(!showMessage);
    if (!showMessage && (window as any).anime) {
      setTimeout(() => {
        (window as any).anime({
          targets: '.message-content',
          translateY: [10, 0],
          opacity: [0, 1],
          duration: 500,
          easing: 'easeOutExpo'
        });
      }, 50);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl w-full">
        <h1 className="main-title text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          享受代码 享受生活
        </h1>

        <div className="time-display bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-8">
          <div className="text-2xl font-mono text-gray-700">
            {currentTime.toLocaleString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            })}
          </div>
        </div>

        <button
          onClick={toggleMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        >
          <i className={`fas ${showMessage ? 'fa-minus' : 'fa-plus'} mr-2`}></i>
          {showMessage ? '隐藏信息' : '显示信息'}
        </button>

        {showMessage && (
          <div className="message mt-8">
            <div className="message-content bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">简单就是美</h2>
              <p className="text-gray-600 mb-4">
                编程不仅仅是工作，更是一种创造和表达的方式。
              </p>
              <p className="text-gray-600">
                在代码与生活之间找到平衡，享受每一刻的美好。
              </p>
            </div>
          </div>
        )}

        <div className="mt-12 text-gray-500 text-sm">
          <p>简约而不简单</p>
        </div>
      </div>
    </div>
  );
};

// 渲染应用
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
