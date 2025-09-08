import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Button, message, Input, Form, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

// 登录页面组件
const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      // 这里应该调用实际的登录API
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 模拟登录成功
      if (values.username === "admin" && values.password === "admin123") {
        const user = { username: values.username };
        localStorage.setItem("admin_token", "fake_token");
        localStorage.setItem("admin_user", JSON.stringify(user));
        // 登录成功后跳转到后台管理页面
        window.location.href = "/admin/index";
      } else {
        message.error("用户名或密码错误");
      }
    } catch (error) {
      message.error("登录失败，请稍后重试");
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
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
      <Card style={{ width: 400, borderRadius: 8 }} bordered={false}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <Title level={2}>Lumos 后台管理</Title>
          <p>请使用您的账户登录</p>
        </div>

        <Form
          name="login"
          onFinish={handleLogin}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="密码"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              style={{ width: "100%" }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <p style={{ color: "#999", fontSize: "12px" }}>
            默认账户: admin / admin123
          </p>
        </div>
      </Card>
    </div>
  );
};

// 渲染应用
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<LoginPage />);
  }
});

export default LoginPage;
