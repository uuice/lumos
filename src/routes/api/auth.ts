import { CommentDB } from "../../services/db.ts";

// 生成简单的JWT token（实际项目中应该使用正式的JWT库）
function generateToken(username: string): string {
  // 简单的token生成，实际项目中应该使用正式的JWT库
  const timestamp = Date.now();
  return Buffer.from(`${username}:${timestamp}`).toString("base64");
}

// 验证token
function verifyToken(token: string): { username: string; valid: boolean } {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [username, timestamp] = decoded.split(":");

    // 检查token是否过期（24小时）
    const tokenAge = Date.now() - parseInt(timestamp);
    if (tokenAge > 24 * 60 * 60 * 1000) {
      return { username: "", valid: false };
    }

    return { username, valid: true };
  } catch (error) {
    return { username: "", valid: false };
  }
}

// 登录接口
export async function login(request: Request): Promise<Response> {
  try {
    const data = await request.json();
    const { username, password } = data;

    // 验证必要字段
    if (!username || !password) {
      return new Response(JSON.stringify({ error: "用户名和密码不能为空" }), {
        headers: { "Content-Type": "application/json" },
        status: 400
      });
    }

    // 验证管理员账户
    const isValid = await CommentDB.validateAdmin(username, password);

    if (isValid) {
      // 生成token
      const token = generateToken(username);

      // 返回用户信息和token
      const user = {
        username,
        token
      };

      return new Response(JSON.stringify({ user }), {
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `admin_token=${token}; Path=/; HttpOnly; SameSite=Strict`
        },
        status: 200
      });
    } else {
      return new Response(JSON.stringify({ error: "用户名或密码错误" }), {
        headers: { "Content-Type": "application/json" },
        status: 401
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "登录失败: " + (error as Error).message }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}

// 登出接口
export async function logout(_request: Request): Promise<Response> {
  return new Response(JSON.stringify({ message: "登出成功" }), {
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `admin_token=; Path=/; HttpOnly; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    },
    status: 200
  });
}

// 验证接口
export async function verify(request: Request): Promise<Response> {
  try {
    // 从Cookie中获取token
    const cookieHeader = request.headers.get("Cookie") || "";
    const tokenMatch = cookieHeader.match(/admin_token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : "";

    if (!token) {
      return new Response(JSON.stringify({ error: "未登录" }), {
        headers: { "Content-Type": "application/json" },
        status: 401
      });
    }

    // 验证token
    const { username, valid } = verifyToken(token);

    if (valid) {
      const user = { username };
      return new Response(JSON.stringify({ user }), {
        headers: { "Content-Type": "application/json" },
        status: 200
      });
    } else {
      return new Response(JSON.stringify({ error: "登录已过期" }), {
        headers: { "Content-Type": "application/json" },
        status: 401
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "验证失败: " + (error as Error).message }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}

// API路由处理器
export default async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const method = request.method;
  const action = url.searchParams.get("action") || "";

  switch (method) {
    case "POST":
      if (action === "login") {
        return await login(request);
      } else if (action === "logout") {
        return await logout(request);
      }
      break;

    case "GET":
      if (action === "verify") {
        return await verify(request);
      }
      break;
  }

  return new Response(JSON.stringify({ error: "不支持的操作" }), {
    headers: { "Content-Type": "application/json" },
    status: 400
  });
}
