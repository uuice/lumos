import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

// 简单的 React 组件
function App() {
  const handleTestClick = () => {
    const output = document.getElementById('output');
    if (output) {
      output.innerHTML = '<p>按钮点击成功！Bun HTML Bundling 正常工作。</p>';
    }
  };

  useEffect(() => {
    setInterval(() => {
      const currentTime = document.getElementById('currentTime');
      if (currentTime) {
        currentTime.innerHTML = (+new Date()).toString();
      }
    }, 1000);
  }, [])

  return (
    <div className="container">
      <header>
        <h1>Lumos 主题测试</h1>
        <nav>
          <ul>
            <li><a href="/">首页</a></li>
            <li><a href="/about">关于</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section>
          <h2>欢迎来到 Lumos 测试页面</h2>
          <p>这是一个使用 Bun HTML Bundling 功能创建的测试页面。</p>
          <p>当前时间：<span id="currentTime">{+new Date()}</span></p>
          <button id="testButton" onClick={handleTestClick}>点击测试</button>
          <div id="output"></div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Lumos. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(React.createElement(App));
  }
});
