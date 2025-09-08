import { join, extname } from 'path'
import { DatabaseSchema } from './types.ts'
import { PluginManager } from './plugin-manager.ts'
import { ThemeManager } from './theme-manager.ts'
import { BunFile } from 'bun';

// 定义配置接口
interface LumosConfig {
  theme: string;
  cache?: {
    staticAssets?: {
      maxAge?: number;
      enabled?: boolean;
    };
  };
  plugins: Record<string, any>;
}

export interface ServerOptions {
  port: number
  dataPath: string
  basePath?: string
}

// 添加导入routes API并设置服务器实例
import { setServerInstance } from './routes/api/routes.ts';

export class LumosServer {
  private data: DatabaseSchema | null = null
  private port: number
  private dataPath: string
  private basePath: string
  private _themeRouter: unknown = null
  private _apiRouter: unknown = null
  private pluginManager: PluginManager
  private themeManager: ThemeManager
  private serverInstance: ReturnType<typeof Bun.serve> | null = null
  private config: LumosConfig | null = null

  constructor(options: ServerOptions) {
    this.port = options.port
    this.dataPath = options.dataPath
    this.basePath = options.basePath || process.cwd()
    this.pluginManager = new PluginManager(this.basePath)
    this.themeManager = new ThemeManager(this.basePath)
  }

  // 加载配置
  private async loadConfig(): Promise<void> {
    try {
      const configPath = join(this.basePath, 'lumos.config.json')
      const configFile = Bun.file(configPath)
      if (await configFile.exists()) {
        const content = await configFile.text()
        this.config = JSON.parse(content)
      } else {
        // 默认配置
        this.config = {
          theme: 'default',
          plugins: {}
        }
      }
    } catch (error) {
      console.error('配置加载失败:', error)
      // 使用默认配置
      this.config = {
        theme: 'default',
        plugins: {}
      }
    }
  }

  // 获取静态资源缓存配置
  private getStaticAssetCacheConfig(): { enabled: boolean; maxAge: number } {
    const defaultConfig = { enabled: true, maxAge: 31536000 }; // 默认1年缓存

    if (!this.config?.cache?.staticAssets) {
      return defaultConfig;
    }

    return {
      enabled: this.config.cache.staticAssets.enabled ?? defaultConfig.enabled,
      maxAge: this.config.cache.staticAssets.maxAge ?? defaultConfig.maxAge
    };
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
      // 加载主题配置
      await this.themeManager.loadThemeConfig()

      // 创建主题路由器，使用主题路由目录
      this._themeRouter = new Bun.FileSystemRouter({
        style: 'nextjs',
        dir: this.themeManager.getRoutesPath()
      })

      // 创建API路由器，使用默认API路由目录
      this._apiRouter = new Bun.FileSystemRouter({
        style: 'nextjs',
        dir: join(this.basePath, 'src', 'routes')
      })

      console.log('FileSystemRouter 初始化成功')
    } catch (error) {
      console.error('路由器初始化失败:', error)
      throw error
    }
  }

  // 处理静态资源
  private async handleStaticAssets(pathname: string): Promise<Response | null> {
    // 检查是否是静态资源请求
    if (pathname.startsWith('/assets/')) {
      try {
        // 获取缓存配置
        const cacheConfig = this.getStaticAssetCacheConfig();

        // 首先尝试从主题目录加载资源
        let filePath = join(this.themeManager.getAssetsPath(), pathname.replace('/assets/', ''))
        let file = Bun.file(filePath)

        // 如果主题目录中没有该资源，则从默认assets目录加载
        if (!(await file.exists())) {
          filePath = join(process.cwd(), pathname)
          file = Bun.file(filePath)
        }

        if (await file.exists()) {
          // 根据文件扩展名设置Content-Type
          const ext = extname(pathname).toLowerCase()
          const contentTypes: { [key: string]: string } = {
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
            '.ttf': 'font/ttf',
            '.eot': 'application/vnd.ms-fontobject'
          }

          const contentType = contentTypes[ext] || 'application/octet-stream'

          // 构建响应头
          const headers: Record<string, string> = {
            'Content-Type': contentType
          };

          // 如果启用了缓存，则添加缓存控制头
          if (cacheConfig.enabled) {
            headers['Cache-Control'] = `public, max-age=${cacheConfig.maxAge}`;
          }

          return new Response(file, {
            headers
          })
        }
      } catch (error) {
        console.error('静态资源处理错误:', error)
      }
    }

    return null
  }

  // 处理请求
  private async handleRequest(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const pathname = url.pathname

    // 首先尝试处理静态资源
    const staticResponse = await this.handleStaticAssets(pathname)
    if (staticResponse) {
      return staticResponse
    }

    // 检查是否是 dist 目录中的静态文件
    if (!pathname.startsWith('/api/') && !pathname.startsWith('/assets/')) {
      try {
        const themePath = join(this.basePath, 'bundler')
        const distDir = join(themePath, 'dist');

        // 构建可能的文件路径列表
        const possiblePaths = [
          // 直接使用请求的路径
          join(distDir, pathname),
          join(distDir, pathname.substring(1)),
          // 尝试查找 index.html
          join(distDir, pathname, 'index.html'),
          // 如果路径以 / 结尾，尝试查找 index.html
          join(distDir, pathname.substring(1), 'index.html'),
          // 如果路径不以 .html 结尾，尝试添加 .html 扩展名
          pathname.endsWith('.html') ? '' : join(distDir, pathname.substring(1) + '.html')
        ].filter(path => path.length > 0); // 过滤掉空路径

        // 查找第一个存在的文件
        let filePath: string | null = null;
        let file: BunFile | null = null;

        for (const path of possiblePaths) {
          const candidateFile = Bun.file(path);
          if (await candidateFile.exists()) {
            filePath = path;
            file = candidateFile;
            break;
          }
        }

        // 如果找到了存在的文件
        if (filePath && file) {
          // 根据文件扩展名设置Content-Type
          const ext = extname(filePath).toLowerCase();
          const contentTypes: { [key: string]: string } = {
            '.html': 'text/html',
            '.htm': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
            '.ttf': 'font/ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.json': 'application/json',
            '.txt': 'text/plain',
            '.xml': 'application/xml',
            '.pdf': 'application/pdf'
          }

          const contentType = contentTypes[ext] || 'application/octet-stream';

          // 获取缓存配置
          const cacheConfig = this.getStaticAssetCacheConfig();

          // 构建响应头
          const headers: Record<string, string> = {
            'Content-Type': contentType
          };

          // 如果启用了缓存，则添加缓存控制头
          if (cacheConfig.enabled) {
            headers['Cache-Control'] = `public, max-age=${cacheConfig.maxAge}`;
          }

          return new Response(file, {
            headers
          });
        }
      } catch (error) {
        console.error('dist目录静态文件处理错误:', error);
      }
    }

    // 确保数据已加载
    if (!this.data) {
      return await this.handleError('Server not initialized', 500)
    }

    try {
      // 首先尝试匹配API路由
      const apiMatch = (this._apiRouter as any).match(pathname)
      if (apiMatch) {
        // 动态导入路由处理器
        const routeModule = await import(apiMatch.filePath)
        const handler = routeModule.default

        if (handler) {
          // 调用路由处理器
          const response = await handler(request, apiMatch.params || {})
          return response
        }
      }

      // 如果没有匹配的API路由，尝试匹配主题路由
      const themeMatch = (this._themeRouter as any).match(pathname)
      if (themeMatch) {
        // 动态导入路由处理器
        const routeModule = await import(themeMatch.filePath)
        const handler = routeModule.default

        if (handler) {
          // 调用路由处理器
          const response = await handler(request, themeMatch.params || {})

          // 如果是 HTML 响应，执行渲染钩子
          if (response && response.headers.get('Content-Type')?.includes('text/html')) {
            const originalHtml = await response.text()
            const modifiedHtml = await this.pluginManager.executeRender(originalHtml, this.data)
            return new Response(modifiedHtml, {
              status: response.status,
              headers: response.headers
            })
          }

          return response
        }
      }

      // 如果没有匹配的路由，返回 404
      return await this.handle404()
    } catch (error) {
      console.error('请求处理错误:', error)
      return await this.handleError(error instanceof Error ? error.message : 'Internal Server Error', 500)
    }
  }

  // 处理 404 错误
  private async handle404(): Promise<Response> {
    try {
      // 尝试从主题目录加载 404 页面
      const notFoundPath = join(this.themeManager.getRoutesPath(), '404.tsx')
      const notFoundModule = await import(notFoundPath)
      const handler = notFoundModule.default

      if (handler) {
        return await handler(new Request('http://localhost/404'))
      }
    } catch (error) {
      console.error('404页面加载失败:', error)
    }

    // 降级到简单的 404 响应
    const simple404Html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>页面未找到 - 404</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
    .container { max-width: 600px; margin: 50px auto; text-align: center; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .error-code { font-size: 72px; font-weight: bold; color: #007bff; margin-bottom: 20px; }
    .error-title { font-size: 24px; margin-bottom: 15px; color: #333; }
    .error-message { color: #666; margin-bottom: 30px; }
    .btn { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; }
    .btn:hover { background: #0056b3; }
  </style>
</head>
<body>
  <div class="container">
    <div class="error-code">404</div>
    <h1 class="error-title">页面未找到</h1>
    <p class="error-message">抱歉，您访问的页面不存在或已被移动。</p>
    <a href="/" class="btn">返回首页</a>
  </div>
</body>
</html>`

    return new Response(simple404Html, {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  }

  // 处理服务器错误
  private async handleError(errorMessage: string, statusCode: number = 500): Promise<Response> {
    try {
      // 尝试从主题目录加载错误页面
      const errorPath = join(this.themeManager.getRoutesPath(), 'error.tsx')
      const errorModule = await import(errorPath)
      const handler = errorModule.default

      if (handler) {
        return await handler(new Request('http://localhost/error'), { error: errorMessage, statusCode })
      }
    } catch (error) {
      console.error('错误页面加载失败:', error)
    }

    // 降级到简单的错误响应
    const simpleErrorHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>服务器错误 - ${statusCode}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
    .container { max-width: 600px; margin: 50px auto; text-align: center; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .error-code { font-size: 72px; font-weight: bold; color: #dc3545; margin-bottom: 20px; }
    .error-title { font-size: 24px; margin-bottom: 15px; color: #333; }
    .error-message { color: #666; margin-bottom: 30px; }
    .btn { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 0 10px; }
    .btn:hover { background: #0056b3; }
    .btn-secondary { background: #6c757d; }
    .btn-secondary:hover { background: #545b62; }
  </style>
</head>
<body>
  <div class="container">
    <div class="error-code">${statusCode}</div>
    <h1 class="error-title">服务器错误</h1>
    <p class="error-message">${errorMessage}</p>
    <a href="/" class="btn">返回首页</a>
    <button class="btn btn-secondary" onclick="location.reload()">刷新页面</button>
  </div>
</body>
</html>`

    return new Response(simpleErrorHtml, {
      status: statusCode,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  }

  // 启动服务器
  async start(): Promise<void> {
    try {
      // 加载配置
      await this.loadConfig();

      // 加载插件
      await this.pluginManager.loadPluginConfig()
      await this.pluginManager.loadPlugins()

      // 执行服务器启动钩子
      await this.pluginManager.executeServerStart(this)

      // 加载数据
      await this.loadData()

      // 初始化路由器
      await this.initRouter()

      this.serverInstance = Bun.serve({
        port: this.port,
        fetch: (request) => this.handleRequest(request)
      })

      // 设置服务器实例供API路由使用
      setServerInstance(this);

      console.log(`🚀 Lumos 服务器已启动 (使用 FileSystemRouter)`)
      console.log(`📡 监听端口: ${this.port}`)
      console.log(`🌐 访问地址: http://localhost:${this.port}`)
      console.log(`📊 数据文件: ${this.dataPath}`)
      console.log(`🎨 静态资源: ${this.themeManager.getAssetsPath()}/*`)
      console.log(`🎨 当前主题: ${this.themeManager.getThemeName()}`)
      // 显示缓存配置信息
      const cacheConfig = this.getStaticAssetCacheConfig();
      if (cacheConfig.enabled) {
        console.log(`📚 静态资源缓存已启用`)
      } else {
        console.log(`📚 静态资源缓存已禁用`)
      }
    } catch (error) {
      console.error('服务器启动失败:', error)
      throw error
    }
  }

  // 停止服务器
  async stop(): Promise<void> {
    if (this.serverInstance) {
      this.serverInstance.stop()
      this.serverInstance = null
      console.log('🛑 服务器已停止')
    } else {
      console.log('🛑 服务器实例不存在')
    }
  }

  // 添加获取路由器的方法
  getThemeRouter() {
    return this._themeRouter;
  }

  getApiRouter() {
    return this._apiRouter;
  }
}
