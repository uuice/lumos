# Lumos Context 使用说明

Lumos Context 是一个类似于 Express/Koa 的 ctx 对象，用于简化请求和响应处理。

## 特性

- 类似于 Express/Koa 的 API 设计
- 支持请求和响应的便捷操作
- 支持中间件模式
- 易于扩展和自定义

## 基本用法

### 创建 Context

```typescript
import { LumosContext } from './context.ts'

// 在路由处理器中
export default async function handler(
  request: Request,
  params: Record<string, string>
): Promise<Response> {
  // 创建上下文对象
  const ctx = new LumosContext(request, params)

  // 使用 ctx 对象进行操作
  ctx.setStatus(200)
  ctx.setBody({ message: 'Hello World' })

  // 返回响应
  return ctx.toResponse()
}
```

### 访问请求信息

```typescript
const ctx = new LumosContext(request, params)

// 基本信息
console.log(ctx.method) // GET, POST, etc.
console.log(ctx.path) // /api/users
console.log(ctx.query) // { page: '1', limit: '10' }
console.log(ctx.params) // { id: '123' }

// 请求头
const contentType = ctx.get('content-type')
console.log(ctx.headers) // Headers 对象

// 请求体解析
const body = await ctx.parseBody()
```

### 设置响应

```typescript
const ctx = new LumosContext(request, params)

// 设置状态码
ctx.setStatus(200)

// 设置响应体
ctx.setBody('Hello World')
// 或者设置 JSON
ctx.setBody({ message: 'Hello World' })

// 设置响应头
ctx.set('Content-Type', 'application/json')
ctx.set('X-Custom-Header', 'Custom Value')

// 重定向
ctx.redirect('/new-location')

// 返回响应
return ctx.toResponse()
```

## 在中间件中使用

```typescript
import { Middleware } from '../types.ts'

const exampleMiddleware: Middleware = {
  name: 'example',
  priority: 0,
  handler: async (
    request: Request,
    response: Response,
    next: () => Promise<Response>
  ): Promise<Response> => {
    const startTime = Date.now()

    // 执行下一个中间件或路由处理器
    const result = await next()

    // 添加响应时间头
    result.headers.set('X-Response-Time', `${Date.now() - startTime}ms`)

    return result
  }
}
```

## API 参考

### 属性

- `req` / `request`: 原始 Request 对象
- `res` / `response`: 响应对象（包含 status, headers, body）
- `url`: URL 对象
- `method`: 请求方法
- `path`: 请求路径
- `query`: 查询参数对象
- `headers`: 请求头 Headers 对象
- `params`: 路由参数对象
- `status`: 当前状态码
- `body`: 请求体内容

### 方法

- `set(field: string, value: string)`: 设置响应头
- `get(field: string)`: 获取请求头
- `setStatus(code: number)`: 设置状态码
- `setBody(content: string | object)`: 设置响应体
- `redirect(url: string, status?: number)`: 重定向
- `is(type: string)`: 检查 Content-Type
- `parseBody()`: 解析请求体
- `toResponse()`: 转换为 Response 对象
- `isResponded()`: 检查是否已响应

## 示例

查看 `src/routes/api/context-example.ts` 获取完整示例。
