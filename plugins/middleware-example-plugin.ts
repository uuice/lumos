import { Plugin, Middleware } from '../src/types.ts'
import { LumosContext } from '../src/context.ts'

const middlewareExamplePlugin: Plugin = {
  name: 'middleware-example-plugin',
  version: '1.0.0',
  description: '示例插件，演示如何添加自定义中间件',

  // 在服务器启动时执行
  async onServerStart(server: any) {
    console.log('🚀 中间件示例插件: 服务器启动')

    // 添加一个自定义中间件
    server.addMiddleware({
      name: 'logging-middleware',
      priority: -50, // 在IP访问控制之后执行
      handler: async (ctx: LumosContext, next: () => Promise<Response>): Promise<Response> => {
        const startTime = Date.now()
        console.log(`📥 ${ctx.method} ${ctx.path} - ${ctx.get('user-agent')}`)
        const result = await next()
        const duration = Date.now() - startTime
        const status = (result && typeof result.status === 'number') ? result.status : ctx.status
        console.log(`📤 响应状态: ${status} - 耗时: ${duration}ms`)
        return result
      }
    } as Middleware)

    // 添加一个请求头修改中间件
    server.addMiddleware({
      name: 'header-modification-middleware',
      priority: 100, // 低优先级，在其他中间件之后执行
      handler: async (ctx: LumosContext, next: () => Promise<Response>): Promise<Response> => {
        const result = await next()
        ctx.set('X-Powered-By', 'Lumos Blog Engine')
        return result
      }
    } as Middleware)
  }
}

export default middlewareExamplePlugin
