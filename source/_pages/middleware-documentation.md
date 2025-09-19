---
title: 中间件系统使用说明
date: 2025-09-19
categories:
  - 技术文档
tags:
  - 中间件
  - 服务器
  - 安全
---

# Lumos 中间件系统使用说明

Lumos 现在支持全局中间件功能，允许开发者在请求处理流程中添加自定义逻辑，如IP访问控制、日志记录、请求头修改等。

中间件相关代码已移至 [/src/middlewares](file:///Users/yjj/WebstormProjects/lumos/src/middlewares) 目录下，便于管理和扩展。

## 中间件特性

1. **优先级控制**：可以为中间件设置优先级，数值越小优先级越高
2. **链式调用**：中间件按顺序执行，可通过 `next()` 方法调用下一个中间件
3. **IP访问控制**：内置IP白名单和黑名单功能
4. **插件集成**：插件可以通过 `onServerStart` 钩子添加自定义中间件

## 配置IP访问控制

在 `lumos.config.json` 中配置IP访问控制：

```json
{
  "middleware": {
    "ipWhitelist": ["127.0.0.1", "192.168.1.10"],
    "ipBlacklist": ["192.168.1.100", "10.0.0.5"]
  }
}
```

> 注意：如果配置了白名单，只有白名单中的IP可以访问；如果只配置了黑名单，除了黑名单中的IP都可以访问。

## 创建自定义中间件插件

可以通过创建插件来添加自定义中间件：

```typescript
import { Plugin } from '../src/types.ts'

const middlewareExamplePlugin: Plugin = {
  name: 'middleware-example-plugin',
  version: '1.0.0',
  description: '示例插件，演示如何添加自定义中间件',

  async onServerStart(server: any) {
    // 添加一个日志记录中间件
    server.addMiddleware({
      name: 'logging-middleware',
      priority: -50,
      handler: async (request, response, next) => {
        const startTime = Date.now()
        console.log(`📥 ${request.method} ${new URL(request.url).pathname}`)

        // 继续执行下一个中间件或处理请求
        const result = await next()

        const duration = Date.now() - startTime
        console.log(`📤 响应状态: ${result.status} - 耗时: ${duration}ms`)

        return result
      }
    })
  }
}

export default middlewareExamplePlugin
```

## 中间件执行流程

```
[客户端请求]
     ↓
[IP访问控制中间件] (高优先级)
     ↓
[插件注册的中间件] (按优先级排序)
     ↓
[实际请求处理]
     ↓
[返回响应]
```

## 内置中间件

### IP访问控制中间件

自动注册的第一个中间件，用于控制IP访问权限。

## 最佳实践

1. **合理设置优先级**：安全相关的中间件（如IP控制）应设置较高的优先级（负数）
2. **异常处理**：在中间件中应妥善处理异常，避免影响整个请求处理流程
3. **性能考虑**：避免在中间件中执行耗时操作，影响服务器性能
4. **日志记录**：适当添加日志，便于调试和监控
