// 文章基础接口
export interface ARTICLE {
  id: string
  title: string
  alias: string
  cover: string
  created_time: string
  date?: string
  updated_time: string
  updated?: string
  categories: Array<string>
  tags: Array<string>
  excerpt: string
  published: boolean
  content: string
  mdContent: string
  toc: string
  created_timestamp: number
  updated_timestamp: number
  url: string
  symbolsCount: number
  authorIds: Array<string>
  [key: string]: string | Array<string> | boolean | number | undefined
}

// 作者接口
export interface AUTHOR extends Omit<ARTICLE, 'authorId'> {
  isDefault: boolean
}

// 页面接口扩展了文章的所有属性
export interface PAGE extends ARTICLE {
  // 页面特有的属性可以在这里添加
}
export type LIST_PAGE_ITEM = Omit<PAGE, 'content' | 'mdContent' | 'toc'>

// 文章接口扩展了文章的所有属性
export interface POST extends ARTICLE {
  // 文章特有的属性可以在这里添加
}
export type LIST_POST_ITEM = Omit<POST, 'content' | 'mdContent' | 'toc'>

// 分类接口
export interface CATEGORY {
  id: string
  title: string
  description: string
  url: string
}

export type CATEGORY_WITH_POST_NUM = CATEGORY & {
  postNum: number
}

// 标签接口
export interface TAG {
  id: string
  title: string
  description: string
  url: string
}

export type TAG_WITH_POST_NUM = TAG & {
  postNum: number
}

// 文章-分类关联
export interface POST_CATEGORY {
  postId: string
  categoryId: string
  id: string
}

// 文章-标签关联
export interface POST_TAG {
  postId: string
  tagId: string
  id: string
}

// JSON 配置
export interface JSON_OBJ {
  [key: string]: unknown
}

// 配置接口
export interface CONFIG {
  [key: string]: string | number | boolean | object
}

// 归档类型
export type ARCHIVES_DATE_YEAR = { [date: string]: LIST_POST_ITEM[] }[]
export type ARCHIVES_DATE_YEAR_MONTH = { [date: string]: ARCHIVES_DATE_YEAR }[]

// 分页查询
export type POST_PAGE_QUERY = {
  pageIndex: number
  pageCount: number
  prevPageIndex: number
  nextPageIndex: number
  pageSize: number
  postList: Omit<PAGE, 'content' | 'mdContent' | 'toc'>[]
}

// 数据库结构
export interface DatabaseSchema {
  posts: POST[]
  pages: PAGE[]
  authors: AUTHOR[]
  categories: CATEGORY[]
  tags: TAG[]
  postCategories: POST_CATEGORY[]
  postTags: POST_TAG[]
  [key: string]: unknown | any
}

// 插件接口
export interface Plugin {
  name: string
  version?: string
  description?: string

  // 生命周期钩子
  onGenerateStart?: (generator: any) => Promise<void> | void
  onGenerateEnd?: (data: DatabaseSchema) => Promise<DatabaseSchema> | DatabaseSchema
  onParseFile?: (filePath: string, content: string, type: 'post' | 'page' | 'author') => Promise<string> | string
  onRender?: (html: string, data: any) => Promise<string> | string
  onServerStart?: (server: any) => Promise<void> | void
}

// 插件配置
export interface PluginConfig {
  [pluginName: string]: {
    enabled: boolean
    options?: Record<string, any>
  }
}

// LumosContext 相关类型
export interface LumosContextParams {
  [key: string]: string
}

export interface LumosContextQuery {
  [key: string]: string | string[]
}

export interface LumosContextResponse {
  status: number
  headers: Record<string, string>
  body: string | null
}

// 中间件接口
export interface Middleware {
  name: string
  priority?: number // 数值越小优先级越高
  handler: (request: Request, response: Response, next: () => Promise<Response>) => Promise<Response>
}

// Lumos配置接口
export interface LumosConfig {
  theme: string
  cache?: {
    staticAssets?: {
      maxAge?: number
      enabled?: boolean
    }
  }
  plugins: PluginConfig
  cors?: {
    enabled: boolean
    options: {
      'Access-Control-Allow-Origin': string
      'Access-Control-Allow-Methods': string
      'Access-Control-Allow-Headers': string
      'Access-Control-Max-Age': number
      'Access-Control-Allow-Credentials': boolean
    }
  }
  middleware?: {
    ipWhitelist?: string[] // IP白名单
    ipBlacklist?: string[] // IP黑名单
  }
  // 可选的 NestJS 适配配置（最简）
  nestjs?: {
    enabled?: boolean
    /** Nest 应用监听端口，默认 4000 */
    port?: number
    /** 在 Lumos 中的挂载前缀，默认 "/nest" */
    mountPath?: string
    /** 可选 Nest 启动入口相对路径，默认 "src/nest/main.ts" */
    entry?: string
  }
}
