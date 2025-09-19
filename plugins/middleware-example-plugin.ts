import { Plugin, Middleware } from '../src/types.ts'

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
      handler: async (request: Request, _response: Response, next: () => Promise<Response>): Promise<Response> => {
        const startTime = Date.now()
        console.log(`📥 ${request.method} ${new URL(request.url).pathname} - ${request.headers.get('user-agent')}`)

        // 继续执行下一个中间件或处理请求
        const result = await next()

        const duration = Date.now() - startTime
        console.log(`📤 响应状态: ${result.status} - 耗时: ${duration}ms`)

        return result
      }
    } as Middleware)

    // 添加一个请求头修改中间件
    server.addMiddleware({
      name: 'header-modification-middleware',
      priority: 100, // 低优先级，在其他中间件之后执行
      handler: async (_request: Request, _response: Response, next: () => Promise<Response>): Promise<Response> => {
        // 继续执行下一个中间件或处理请求
        const result = await next()

        // 添加自定义响应头
        result.headers.set('X-Powered-By', 'Lumos Blog Engine')
        return result
      }
    } as Middleware)
  }
}

export default middlewareExamplePlugin
