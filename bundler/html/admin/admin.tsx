import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { Layout, Menu, Button, theme, Typography, message } from "antd";
import {
  CommentOutlined,
  FileOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";

// 引入各个管理页面组件
import CommentManager from "./components/CommentManager";
import FileManager from "./components/FileManager";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

// 主页面组件
function AdminPage() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<{username: string} | null>(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 检查用户是否已登录
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth?action=verify", {
          credentials: "include"
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // 未登录则跳转到登录页面
          navigate("/admin/login");
        }
      } catch (error) {
        console.error("验证失败:", error);
        navigate("/admin/login");
      }
    };

    checkAuth();
  }, [navigate]);

  // 登出功能
  const handleLogout = async () => {
    try {
      await fetch("/api/auth?action=logout", {
        method: "POST",
        credentials: "include"
      });

      setUser(null);
      navigate("/admin/login");
    } catch (error) {
      message.error("登出失败: " + (error as Error).message);
    }
  };

  // 菜单项
  const menuItems = [
    {
      key: "1",
      icon: <CommentOutlined />,
      label: <Link to="/admin/comments">评论管理</Link>,
    },
    {
      key: "2",
      icon: <FileOutlined />,
      label: <Link to="/admin/files">文件管理</Link>,
    },
  ];

  if (!user) {
    return <div>加载中...</div>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div style={{ float: "right", marginRight: "20px" }}>
            <span style={{ marginRight: "10px" }}>
              欢迎，{user.username}
            </span>
            <Button
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              type="primary"
              danger
            >
              登出
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/admin/comments" replace />} />
            <Route path="/comments" element={<CommentManager />} />
            <Route path="/files" element={<FileManager />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

// 登录页面组件
function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth?action=login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        // 登录成功
        localStorage.setItem("admin_user", JSON.stringify(data.user));
        navigate("/admin");
      } else {
        // 登录失败
        setError(data.error || "登录失败");
      }
    } catch (err) {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f0f2f5"
    }}>
      <div style={{
        width: "400px",
        padding: "40px",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
          Lumos 后台管理
        </Title>
        <form onSubmit={handleLogin}>
          {error && (
            <div style={{
              color: "red",
              marginBottom: "15px",
              padding: "10px",
              background: "#fff2f0",
              border: "1px solid #ffccc7",
              borderRadius: "4px"
            }}>
              {error}
            </div>
          )}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>用户名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="请输入用户名"
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="请输入密码"
            />
          </div>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}
          >
            登录
          </Button>
        </form>
      </div>
    </div>
  );
}

// 主应用组件
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/" element={<LoginPage />} />
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
