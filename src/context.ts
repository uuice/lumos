// Lumos Context 类似于 Express/Koa 的 ctx 对象
export class LumosContext {
  // 请求对象
  req: Request
  request: Request

  // 响应相关属性（可变的）
  res: {
    status: number
    headers: Record<string, string>
    body: string | null
  }
  response: {
    status: number
    headers: Record<string, string>
    body: string | null
  }

  // URL 对象
  url: URL

  // 请求方法
  method: string

  // 请求路径
  path: string

  // 查询参数
  query: Record<string, string | string[]>

  // 请求头
  headers: Headers

  // 状态码
  status: number

  // 响应头
  set: (field: string, value: string) => void
  get: (field: string) => string | null

  // 请求体（如果需要）
  body: any

  // 参数（路由参数）
  params: Record<string, string>

  // 是否已响应
  responded: boolean

  constructor(request: Request, params: Record<string, string> = {}) {
    this.req = request
    this.request = request

    this.res = {
      status: 404,
      headers: {},
      body: null
    }
    this.response = this.res

    this.url = new URL(request.url)
    this.method = request.method
    this.path = this.url.pathname
    this.query = this.parseQuery(this.url.searchParams)
    this.headers = request.headers
    this.status = 404
    this.params = this.extractRouteParams(request, params)
    this.body = null
    this.responded = false

    // 设置响应头的方法
    this.set = (field: string, value: string) => {
      this.res.headers[field] = value
    }

    this.get = (field: string) => {
      return this.headers.get(field)
    }
  }

  // 解析查询参数
  private parseQuery(searchParams: URLSearchParams): Record<string, string | string[]> {
    const query: Record<string, string | string[]> = {}
    for (const [key, value] of searchParams) {
      if (query[key]) {
        // 如果键已存在，转换为数组或添加到数组中
        if (Array.isArray(query[key])) {
          (query[key] as string[]).push(value)
        } else {
          query[key] = [query[key] as string, value]
        }
      } else {
        query[key] = value
      }
    }
    return query
  }

  // 提取路由参数
  private extractRouteParams(request: Request, initialParams: Record<string, string> = {}): Record<string, string> {
    // 合并初始参数和从请求中提取的参数
    const params: Record<string, string> = { ...initialParams }

    // 如果请求URL中有自定义参数标记，尝试解析它们
    // 这里我们假设参数可能存储在特殊的请求头中或者URL的特殊位置

    // 从请求头中提取路由参数（如果有的话）
    const routeParamsHeader = request.headers.get('x-route-params')
    if (routeParamsHeader) {
      try {
        const headerParams = JSON.parse(routeParamsHeader)
        Object.assign(params, headerParams)
      } catch (error) {
        // 忽略解析错误
        console.debug('Failed to parse route params from header:', error)
      }
    }

    return params
  }

  // 设置状态码
  setStatus(code: number): void {
    this.status = code
    this.res.status = code
  }

  // 设置响应体
  setBody(content: string | object): void {
    if (typeof content === 'object') {
      this.body = JSON.stringify(content)
      this.set('Content-Type', 'application/json')
    } else {
      this.body = content
    }
    this.res.body = this.body
  }

  // 重定向
  redirect(url: string, status: number = 302): void {
    this.setStatus(status)
    this.set('Location', url)
    this.setBody('')
    this.responded = true
  }

  // 检查请求头
  is(type: string): boolean {
    const contentType = this.headers.get('content-type') || ''
    return contentType.includes(type)
  }

  // 获取请求体（需要在适当的地方解析）
  async parseBody(): Promise<any> {
    if (this.method === 'GET' || this.method === 'HEAD') {
      return {}
    }

    if (this.is('application/json')) {
      try {
        const text = await this.request.text()
        return JSON.parse(text)
      } catch {
        return {}
      }
    }

    if (this.is('application/x-www-form-urlencoded')) {
      try {
        const text = await this.request.text()
        const params = new URLSearchParams(text)
        const result: Record<string, string> = {}
        for (const [key, value] of params) {
          result[key] = value
        }
        return result
      } catch {
        return {}
      }
    }

    // 默认返回文本
    try {
      return await this.request.text()
    } catch {
      return ''
    }
  }

  addParam(key: string, value: string): void {
    this.params[key] = value
  }

  // 创建 Response 对象
  toResponse(): Response {
    this.responded = true

    // 如果没有设置内容类型，根据内容自动设置
    if (!this.res.headers['Content-Type'] && this.res.body) {
      if (typeof this.res.body === 'string' && this.res.body.startsWith('<!DOCTYPE html')) {
        this.set('Content-Type', 'text/html; charset=utf-8')
      } else if (typeof this.res.body === 'string') {
        this.set('Content-Type', 'text/plain; charset=utf-8')
      }
    }

    return new Response(this.res.body, {
      status: this.res.status,
      headers: this.res.headers
    })
  }

  // 检查是否已响应
  isResponded(): boolean {
    return this.responded
  }
}
