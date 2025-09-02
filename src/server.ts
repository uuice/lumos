import { join } from 'path'
import { DatabaseSchema } from './types.ts'

export interface ServerOptions {
  port: number
  dataPath: string
}

export class LumosServer {
  private data: DatabaseSchema | null = null
  private port: number
  private dataPath: string
  private _router: unknown = null

  constructor(options: ServerOptions) {
    this.port = options.port
    this.dataPath = options.dataPath
  }

  // 加载数据
  async loadData(): Promise<void> {
    try {
      const file = Bun.file(this.dataPath)
      const content = await file.text()
      this.data = JSON.parse(content)

      // 将数据存储到全局状态供路由使用
      ;(globalThis as any).__LUMOS_DATA__ = this.data

      console.log('数据加载成功')
    } catch (error) {
      console.error('数据加载失败:', error)
      throw error
    }
  }

  // 初始化路由器
  private async initRouter(): Promise<void> {
    try {
      // 创建 FileSystemRouter
      this._router = new Bun.FileSystemRouter({
        style: 'nextjs',
        dir: join(process.cwd(), 'src/routes')
      })

      console.log('FileSystemRouter 初始化成功')
    } catch (error) {
      console.error('路由器初始化失败:', error)
      throw error
    }
  }

  // 处理请求
  private async handleRequest(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const pathname = url.pathname

    // 确保数据已加载
    if (!this.data) {
      return new Response('Server not initialized', { status: 500 })
    }

    try {
      // 使用 FileSystemRouter 匹配路由
      const match = (this._router as any).match(pathname)

      if (match) {
        // 动态导入路由处理器
        const routeModule = await import(match.filePath)
        const handler = routeModule.default

        if (handler) {
          // 调用路由处理器
          return await handler(request, match.params || {})
        }
      }

      // 如果没有匹配的路由，返回 404
      return new Response('Page not found', { status: 404 })
    } catch (error) {
      console.error('请求处理错误:', error)
      return new Response('Internal Server Error', { status: 500 })
    }
  }

  // 启动服务器
  async start(): Promise<void> {
    await this.loadData()
    await this.initRouter()

    Bun.serve({
      port: this.port,
      fetch: this.handleRequest.bind(this)
    })

    console.log(`🚀 Lumos 服务器已启动 (使用 FileSystemRouter)`)
    console.log(`📡 监听端口: ${this.port}`)
    console.log(`🌐 访问地址: http://localhost:${this.port}`)
    console.log(`📊 数据文件: ${this.dataPath}`)
  }

  // 停止服务器
  stop(): void {
    // Bun server 会自动清理
    console.log('服务器已停止')
  }
}
