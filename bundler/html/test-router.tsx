import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route, Link, useNavigate } from "react-router";

// 首页组件
function HomePage() {
  return (
    <div className="container">
      <header>
        <h1>Lumos React Router 测试</h1>
        <nav>
          <ul>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/about">关于</Link></li>
            <li><Link to="/test">测试</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <section>
          <h2>欢迎来到首页</h2>
          <p>这是一个使用 React Router 实现路由功能的测试页面。</p>
          <NavigationButton />
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Lumos. All rights reserved.</p>
      </footer>
    </div>
  );
}

// 导航按钮组件（在 Router 内部使用 useNavigate）
function NavigationButton() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/about');
  };

  return <button onClick={handleNavigation}>导航到关于页面</button>;
}

// 关于页面组件
function AboutPage() {
  return (
    <div className="container">
      <header>
        <h1>Lumos React Router 测试</h1>
        <nav>
          <ul>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/about">关于</Link></li>
            <li><Link to="/test">测试</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <section>
          <h2>关于我们</h2>
          <p>这是关于页面的内容。</p>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Lumos. All rights reserved.</p>
      </footer>
    </div>
  );
}

// 测试页面组件
function TestPage() {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className="container">
      <header>
        <h1>Lumos React Router 测试</h1>
        <nav>
          <ul>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/about">关于</Link></li>
            <li><Link to="/test">测试</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <section>
          <h2>测试页面</h2>
          <p>这是一个测试页面，用于演示 React Router 的功能。</p>
          <p>计数器: {count}</p>
          <button onClick={increment}>增加计数</button>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Lumos. All rights reserved.</p>
      </footer>
    </div>
  );
}

// 主应用组件
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

// 渲染应用
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
  }
});
