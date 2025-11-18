---
id: 083f745a-5764-50b7-b88c-54945b081c87
title: Lumos 二次开发教程
alias: lumos-development
cover:
created_time: 2025-09-02 17:57:35
updated_time: 2025-09-02 17:57:35
categories: ['开发教程', '技术文档']
tags: ['Bun', 'TypeScript', 'React', '二次开发', '教程', 'FileSystemRouter']
excerpt: 详细的 Lumos 静态博客生成器二次开发教程，基于 Bun 运行时，包括项目架构解析、自定义组件开发、路由扩展等核心功能。
published: true
---

# 🛠️ Lumos 二次开发教程

本教程将深入介绍如何对 Lumos 静态博客生成器进行二次开发，包括项目架构解析、自定义组件开发、路由扩展等核心功能。适合有一定前端开发经验的开发者。

在开始二次开发之前，建议您先了解 Lumos 的基本概念和使用方法。请参阅 [README](../README.md) 和 [Lumos 项目介绍](./lumos-introduce.md) 以获取更多基础信息，参阅 [Lumos CLI 使用指南](./lumos-cli-usage.md) 了解命令行工具的使用方法。

## 📚 相关资源

- [Lumos 项目文档](./lumos-introduce.md) - 项目介绍和基础使用
- [CLI 使用指南](./lumos-cli-usage.md) - 命令行工具使用说明
- [README 文档](../README.md) - 项目完整文档
- [Bun 全栈开发](https://bun.sh/docs/bundler/fullstack#fullstack-dev-server) - Bun全栈开发

## 🎯 学习目标

通过本教程，你将学会：

- 🏗️ **项目架构理解**: 深入理解 Lumos 的核心架构和设计理念
- ⚛️ **React 组件开发**: 创建自定义的 React 组件和布局
- 🛣️ **路由扩展**: 添加新的页面路由和 API 接口
- 🔌 **插件开发**: 创建自定义插件扩展功能
- 🎨 **主题开发**: 创建自定义主题改变外观
- 🧪 **测试调试**: 建立完善的测试和调试环境

## 🚀 开发环境搭建

### 📋 前置要求

- 🚀 **Bun**: 现代化的 JavaScript 运行时（必需）
- 🎨 **代码编辑器**: VS Code 或 WebStorm
- 🔧 **Git**: 版本控制工具

### ⚙️ 环境配置

```bash
# 1️⃣ 安装 Bun (如果尚未安装)
curl -fsSL https://bun.sh/install | bash

# 2️⃣ 克隆项目或进入项目目录
cd lumos

# 3️⃣ 安装项目依赖
bun install

# 4️⃣ 构建项目
bun run build

# 5️⃣ 启动开发服务器
bun run dev
```

### 🔧 开发工具配置

#### VS Code 推荐插件

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "bradlc.vscode-tailwindcss"
  ]
}
```

#### 调试配置

在 `.vscode/launch.json` 中添加：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Lumos Server",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/src/cli.ts",
      "args": ["server", "-p", "3060"],
      "runtimeExecutable": "bun",
      "console": "integratedTerminal"
    }
  ]
}
```

### 🚀 Bun 特有功能

#### 1. 使用 Bun 的 FileSystemRouter

```typescript
// src/server.ts 中的路由配置
const router = new Bun.FileSystemRouter({
  style: 'nextjs',
  dir: join(process.cwd(), 'src/routes')
})
```

#### 2. 使用 Bun 的文件 API

```typescript
// 读取文件
const file = Bun.file('data.json')
const content = await file.text()

// 写入文件
await Bun.write('output.json', JSON.stringify(data, null, 2))
```

#### 3. 使用 Bun 的 HTTP 服务器

```typescript
// 创建 HTTP 服务器
const server = Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response('Hello from Bun!')
  }
})
```

## 🏗️ 项目架构深度解析

### 📂 核心目录结构

```
lumos/
├── 📁 source/               # 内容源目录
│   ├── 📁 _authors/         # 作者 Markdown 文件
│   ├── 📁 _pages/          # 页面 Markdown 文件
│   ├── 📁 _posts/          # 文章 Markdown 文件
│   ├── 📁 _jsons/          # JSON 配置文件
│   └── 📁 _ymls/           # YAML 配置文件
├── 📁 src/                  # 源码目录（核心开发区域）
│   ├── 📄 cli.ts           # CLI 命令行工具入口
│   ├── 📁 commands/        # CLI 命令实现
│   │   ├── 📄 assets.ts    # 资源处理命令
│   │   ├── 📄 build-css.ts # CSS 构建命令
│   │   ├── 📄 build.ts     # 项目构建命令
│   │   ├── 📄 gen.ts       # 数据生成命令
│   │   ├── 📄 help.ts      # 帮助命令
│   │   ├── 📄 new.ts       # 内容创建命令
│   │   ├── 📄 server.ts    # 服务器启动命令
│   │   ├── 📄 version.ts   # 版本查看命令
│   │   ├── 📄 webp.ts      # WebP 转换命令
│   │   └── 📁 gen-utils/   # 数据生成工具
│   ├── 📁 components/      # React 组件库
│   ├── 📁 routes/          # 路由处理器
│   ├── 📄 server.ts        # HTTP 服务器
│   ├── 📄 standalone-server.ts # 独立服务器（用于开发模式）
│   ├── 📄 plugin-manager.ts # 插件管理器
│   ├── 📄 theme-manager.ts  # 主题管理器
│   ├── 📄 utils.ts         # 工具函数
│   └── 📄 types.ts         # 类型定义
├── 📁 assets/               # 静态资源目录
│   ├── 📁 styles/          # 样式文件
│   ├── 📁 javascript/      # JavaScript 文件
│   ├── 📁 images/          # 图片资源
│   └── 📁 fonts/           # 字体文件
├── 📁 bundler/              # Bun HTML Bundling 目录
│   ├── 📁 html/            # HTML 源文件
│   │   ├── 📄 index.html   # 首页 HTML 入口
│   │   ├── 📄 app.tsx      # React 组件
│   │   └── 📄 about.html   # 关于页面 HTML 入口
│   └── 📄 html-route.ts    # HTML 路由 入口
├── 📁 templates/            # 模板文件
├── 📁 plugins/              # 插件目录
├── 📁 themes/               # 主题目录
├── 📄 lumos.config.json     # 配置文件
├── 📄 package.json          # 项目配置
├── 📄 tsconfig.json         # TypeScript 配置
├── 📄 tailwind.config.js    # Tailwind CSS 配置
├── 📄 lumos                 # CLI 可执行文件
└── 📄 data.json             # 生成的数据文件
```

### 🔧 核心模块说明

- **📄 cli.ts**: 命令行接口，处理用户输入和命令分发
- **📁 commands/**: CLI 命令实现目录
- **📄 server.ts**: HTTP 服务器，基于 Bun 的 FileSystemRouter
- **📄 standalone-server.ts**: 独立服务器（用于开发模式）
- **📄 plugin-manager.ts**: 插件管理器，负责加载和执行插件
- **📄 theme-manager.ts**: 主题管理器，负责加载和管理主题
- **📄 utils.ts**: 工具函数
- **📄 types.ts**: 类型定义
- **📁 components/**: React 组件库，可扩展的 UI 组件
- **📁 routes/**: 路由处理器，定义页面和 API 路由
- **📁 bundler/**: Bun HTML Bundling 目录，用于创建高优先级的静态页面

## ⚛️ React 组件开发

### 🧩 组件架构

Lumos 使用 React + TypeScript 构建组件系统，所有组件都支持 SSR 渲染。

#### 基础组件结构

```typescript
// themes/my-theme/components/MyComponent.tsx
import * as React from 'react'
import { DatabaseSchema } from '../types.ts'

interface MyComponentProps {
  title: string
  data: DatabaseSchema
  children?: React.ReactNode
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  data,
  children
}) => {
  return (
    <div className="my-component">
      <h2>{title}</h2>
      {children}
    </div>
  )
}
```

### 🎨 自定义布局组件

#### 创建新的布局组件

```typescript
// themes/my-theme/components/CustomLayout.tsx
import * as React from 'react'
import { DatabaseSchema } from '../types.ts'

interface CustomLayoutProps {
  title: string
  children: React.ReactNode
  data: DatabaseSchema
  className?: string
}

export const CustomLayout: React.FC<CustomLayoutProps> = ({
  title,
  children,
  data,
  className = ''
}) => {
  return (
    <html lang="zh-CN">
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/assets/styles/style.css" />
      </head>
      <body className={`custom-layout ${className}`}>
        <header className="header">
          <h1>我的自定义博客</h1>
          <nav>
            <a href="/">首页</a>
            <a href="/posts">文章</a>
            <a href="/about">关于</a>
          </nav>
        </header>

        <main className="main-content">
          {children}
        </main>

        <footer className="footer">
          <p>&copy; 2024 我的博客</p>
        </footer>
      </body>
    </html>
  )
}
```

### 🔧 组件开发最佳实践

#### 1. 类型安全

```typescript
// 定义严格的 Props 类型
interface ArticleCardProps {
  article: {
    id: string
    title: string
    excerpt: string
    date: string
    author?: string
  }
  showAuthor?: boolean
  className?: string
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  showAuthor = true,
  className = ''
}) => {
  // 组件实现
}
```

#### 2. 样式管理

```typescript
// 使用 Tailwind CSS 类名
const cardClasses = `
  bg-white dark:bg-gray-800
  rounded-lg shadow-md
  p-6 mb-4
  hover:shadow-lg transition-shadow
  ${className}
`

return (
  <article className={cardClasses}>
    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-4">{article.excerpt}</p>
    {showAuthor && article.author && (
      <p className="text-sm text-gray-500">作者: {article.author}</p>
    )}
  </article>
)
```

#### 3. 条件渲染

```typescript
// 使用条件渲染优化性能
{data.posts.length > 0 ? (
  <div className="posts-grid">
    {data.posts.map(post => (
      <ArticleCard key={post.id} article={post} />
    ))}
  </div>
) : (
  <div className="empty-state">
    <p>暂无文章</p>
  </div>
)}
```

## 🛣️ 路由系统扩展

### 📍 创建新的页面路由

#### 1. 静态路由

```typescript
// themes/my-theme/routes/my-custom-page.tsx
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { DatabaseSchema } from '../types.ts'
import { LumosContext } from '../../src/context.ts'
import { Layout } from '../components/Layout.tsx'

const MyCustomPage: React.FC<{ data: DatabaseSchema }> = ({ data }) => (
  <Layout title="我的自定义页面" data={data}>
    <div className="custom-page">
      <h1>欢迎来到我的自定义页面</h1>
      <p>这是一个自定义的页面内容</p>
    </div>
  </Layout>
)

export default async function handler(ctx: LumosContext): Promise<void> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      ctx.html('Server not initialized', 500)
      return
    }

    const html = '<!DOCTYPE html>' + renderToString(
      React.createElement(MyCustomPage, { data })
    )

    ctx.html(html)
  } catch (error) {
    console.error('页面渲染错误:', error)
    ctx.html('Internal Server Error', 500)
  }
}
```

#### 2. 动态路由

```typescript
// themes/my-theme/routes/custom/[slug].tsx
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { DatabaseSchema } from '../types.ts'
import { LumosContext } from '../../src/context.ts'
import { Layout } from '../components/Layout.tsx'

const CustomDynamicPage: React.FC<{
  data: DatabaseSchema,
  slug: string
}> = ({ data, slug }) => (
  <Layout title={`自定义页面 - ${slug}`} data={data}>
    <div className="custom-dynamic-page">
      <h1>动态页面: {slug}</h1>
      <p>这是一个动态生成的自定义页面</p>
    </div>
  </Layout>
)

export default async function handler(ctx: LumosContext): Promise<void> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      ctx.html('Server not initialized', 500)
      return
    }

    const slug = ctx.params.slug

    const html = '<!DOCTYPE html>' + renderToString(
      React.createElement(CustomDynamicPage, { data, slug })
    )

    ctx.html(html)
  } catch (error) {
    console.error('动态页面渲染错误:', error)
    ctx.html('Internal Server Error', 500)
  }
}
```

### 🔌 API 接口开发

#### 创建自定义 API

```typescript
// src/routes/api/custom.ts
import { DatabaseSchema } from '../../types.ts'
import { LumosContext } from '../../context.ts'

export default async function handler(ctx: LumosContext): Promise<void> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      ctx.json({ error: 'Server not initialized' }, 500)
      return
    }

    const method = ctx.method

    switch (method) {
      case 'GET':
        await handleGet(data, ctx)
        break
      case 'POST':
        await handlePost(data, ctx)
        break
      default:
        ctx.json({ error: 'Method not allowed' }, 405)
    }
  } catch (error) {
    console.error('API 错误:', error)
    ctx.json({ error: 'Internal Server Error' }, 500)
  }
}

async function handleGet(data: DatabaseSchema, ctx: LumosContext): Promise<void> {
  const query = ctx.url.searchParams.get('query')

  const result = {
    message: 'Hello from custom API',
    query,
    timestamp: new Date().toISOString(),
    stats: {
      posts: data.posts.length,
      pages: data.pages.length,
      authors: data.authors.length
    }
  }

  ctx.json(result)
}

async function handlePost(data: DatabaseSchema, ctx: LumosContext): Promise<void> {
  const body = await ctx.parseBody()

  ctx.json({
    message: 'POST request received',
    data: body
  })
}
```

## 🔌 插件系统开发

### 🧩 插件架构

Lumos 的插件系统基于生命周期钩子，允许在博客生成和运行的不同阶段执行自定义逻辑。

#### 插件接口定义

```typescript
// src/types.ts
export interface Plugin {
  name: string
  version?: string
  description?: string

  // 生命周期钩子
  onGenerateStart?: (generator: any) => Promise<void> | void
  onGenerateEnd?: (data: DatabaseSchema) => Promise<DatabaseSchema> | DatabaseSchema
  onParseFile?: (
    filePath: string,
    content: string,
    type: 'post' | 'page' | 'author'
  ) => Promise<string> | string
  onRender?: (html: string, data: any) => Promise<string> | string
  onServerStart?: (server: any) => Promise<void> | void
}
```

### 🛠️ 创建自定义插件

#### 1. 基础插件结构

```typescript
// plugins/my-custom-plugin.ts
import { Plugin } from '../src/types.ts'

const myCustomPlugin: Plugin = {
  name: 'my-custom-plugin',
  version: '1.0.0',
  description: '我的自定义插件',

  // 在生成开始时执行
  async onGenerateStart(generator) {
    console.log('📝 我的插件: 开始生成数据')
    // 可以在这里访问和修改生成器
  },

  // 在生成结束时执行，可以修改最终数据
  async onGenerateEnd(data) {
    console.log('✅ 我的插件: 数据生成完成')
    // 可以在这里修改返回的数据
    return data
  },

  // 在解析文件时执行，可以修改文件内容
  async onParseFile(filePath, content, type) {
    console.log(`📄 我的插件: 解析文件 ${filePath} (类型: ${type})`)
    // 可以在这里修改文件内容
    return content
  },

  // 在渲染时执行，可以修改 HTML 输出
  async onRender(html, data) {
    console.log('🖥️ 我的插件: 渲染页面')
    // 可以在这里修改 HTML 输出
    return html
  },

  // 在服务器启动时执行
  async onServerStart(server) {
    console.log('🚀 我的插件: 服务器启动')
    // 可以在这里访问服务器实例
  }
}

export default myCustomPlugin
```

#### 2. 插件配置

在 `lumos.config.json` 中配置插件：

```json
{
  "plugins": {
    "my-custom-plugin": {
      "enabled": true,
      "options": {
        "customOption": "value"
      }
    }
  }
}
```

#### 3. 高级插件示例

```typescript
// plugins/word-count-plugin.ts
import { Plugin, DatabaseSchema } from '../src/types.ts'

const wordCountPlugin: Plugin = {
  name: 'word-count-plugin',
  version: '1.0.0',
  description: '文章字数统计插件',

  // 在解析文件时统计字数
  async onParseFile(filePath, content, type) {
    if (type === 'post') {
      // 统计字数的逻辑
      const wordCount = content
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ').length
      console.log(`📝 文件 ${filePath} 字数统计: ${wordCount}`)
    }
    return content
  },

  // 在生成结束时添加字数统计到数据中
  async onGenerateEnd(data: DatabaseSchema) {
    // 为每篇文章添加字数统计
    const postsWithWordCount = data.posts.map(post => ({
      ...post,
      wordCount: post.content
        ? post.content
            .replace(/<[^>]*>/g, '')
            .replace(/\s+/g, ' ')
            .trim()
            .split(' ').length
        : 0
    }))

    return {
      ...data,
      posts: postsWithWordCount
    }
  }
}

export default wordCountPlugin
```

### 🔧 插件开发最佳实践

#### 1. 错误处理

```typescript
async onGenerateEnd(data) {
  try {
    // 插件逻辑
    return data
  } catch (error) {
    console.error(`插件 ${this.name} 执行失败:`, error)
    // 返回原始数据而不是抛出错误
    return data
  }
}
```

#### 2. 性能优化

```typescript
// 避免在每次调用时执行昂贵的操作
let cachedData: any = null

async onGenerateEnd(data) {
  if (!cachedData) {
    // 执行昂贵的计算
    cachedData = await expensiveComputation(data)
  }
  return {
    ...data,
    cachedData
  }
}
```

#### 3. 配置管理

```typescript
async onGenerateStart(generator) {
  // 从插件配置中获取选项
  const config = generator.pluginConfigs[this.name]
  const options = config?.options || {}

  // 使用配置选项
  if (options.customOption) {
    // 根据配置执行不同的逻辑
  }
}
```

## 🎨 主题系统开发

### 🧩 主题架构

Lumos 的主题系统允许开发者创建和使用自定义主题来改变博客的外观和功能。

#### 主题目录结构

```
themes/
└── my-theme/             # 自定义主题目录
    ├── assets/           # 主题静态资源
    │   ├── styles/       # 样式文件
    │   └── images/       # 图片资源
    ├── components/       # 主题组件
    │   └── Layout.tsx    # 布局组件
    └── routes/           # 主题路由
        ├── index.tsx     # 首页
        ├── posts.tsx     # 文章列表页
        └── post/[url].tsx # 文章详情页
```

### 🎨 创建自定义主题

#### 1. 创建主题目录结构

```bash
mkdir -p themes/my-custom-theme/{assets,components,routes}
```

#### 2. 创建布局组件

```tsx
// themes/my-custom-theme/components/Layout.tsx
import * as React from 'react'
import { DatabaseSchema } from '../../../src/types.ts'

interface LayoutProps {
  title: string
  children: React.ReactNode
  data: DatabaseSchema
  description?: string
}

export const Layout: React.FC<LayoutProps> = ({
  title,
  children,
  data,
  description = '我的自定义博客'
}) => {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/assets/styles/my-theme.css" />
      </head>
      <body className="my-custom-theme">
        <header className="header">
          <h1 className="site-title">我的自定义博客</h1>
          <nav className="navigation">
            <a href="/">首页</a>
            <a href="/posts">文章</a>
            <a href="/about">关于</a>
          </nav>
        </header>

        <main className="main-content">{children}</main>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} 我的自定义博客</p>
          <p>文章: {data.posts?.length || 0} 篇</p>
        </footer>
      </body>
    </html>
  )
}
```

#### 3. 创建路由页面

```tsx
// themes/my-custom-theme/routes/index.tsx
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { DatabaseSchema } from '../../../src/types.ts'
import { Layout } from '../components/Layout.tsx'

const HomePage: React.FC<{ data: DatabaseSchema }> = ({ data }) => (
  <div className="home-page">
    <h2>欢迎来到我的博客</h2>
    <p>这是使用自定义主题的首页</p>

    <section className="latest-posts">
      <h3>最新文章</h3>
      <div className="posts-list">
        {data.posts.slice(0, 5).map(post => (
          <article key={post.id} className="post-item">
            <h4>
              <a href={`/post/${post.alias}`}>{post.title}</a>
            </h4>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-meta">
              <span className="post-date">{post.date}</span>
              {post.categories && post.categories.length > 0 && (
                <span className="post-categories">分类: {post.categories.join(', ')}</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  </div>
)

export default async function handler(_request: Request): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    const html = '<!DOCTYPE html>' + renderToString(React.createElement(HomePage, { data }))

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  } catch (error) {
    console.error('首页渲染错误:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
```

#### 4. 配置主题

在 `lumos.config.json` 中切换到新主题：

```json
{
  "theme": "my-custom-theme"
}
```

### 🎨 主题开发最佳实践

#### 1. 样式组织

```css
/* themes/my-custom-theme/assets/styles/my-theme.css */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --background-color: #f8fafc;
  --text-color: #1e293b;
}

.my-custom-theme {
  font-family: 'Inter', sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
}

.header {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem;
}

.site-title {
  font-size: 2rem;
  font-weight: bold;
}

.navigation a {
  color: white;
  text-decoration: none;
  margin-right: 1rem;
}

.navigation a:hover {
  text-decoration: underline;
}
```

#### 2. 响应式设计

```tsx
// 在组件中使用响应式类名
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{/* 内容 */}</div>
</div>
```

#### 3. 主题继承

可以通过扩展默认主题来创建自定义主题，只需覆盖需要修改的部分：

```tsx
// themes/my-custom-theme/components/Layout.tsx
import * as React from 'react'
import { DatabaseSchema } from '../../../src/types.ts'
// 导入默认主题的布局组件
import { Layout as DefaultLayout } from '../../default/components/Layout.tsx'

interface LayoutProps {
  title: string
  children: React.ReactNode
  data: DatabaseSchema
}

export const Layout: React.FC<LayoutProps> = ({ title, children, data }) => {
  // 在默认布局基础上进行自定义
  return (
    <DefaultLayout title={`[自定义] ${title}`} data={data}>
      <div className="custom-wrapper">{children}</div>
    </DefaultLayout>
  )
}
```

## 📊 数据使用

### 🔍 在组件中使用数据

#### 1. 获取全局数据

```typescript
// 在路由处理器中获取数据
export default async function handler(_request: Request): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    // 使用数据进行渲染
    const html = '<!DOCTYPE html>' + renderToString(React.createElement(MyComponent, { data }))

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  } catch (error) {
    console.error('渲染错误:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
```

#### 2. 在组件中处理数据

```typescript
// 在 React 组件中使用数据
const MyComponent: React.FC<{ data: DatabaseSchema }> = ({ data }) => {
  // 获取最新文章
  const latestPosts = data.posts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  // 获取分类统计
  const categoryStats = data.categories.map(category => ({
    ...category,
    postCount: data.posts.filter(post =>
      post.categories?.includes(category.title)
    ).length
  }))

  return (
    <div>
      <h2>最新文章</h2>
      {latestPosts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </div>
      ))}

      <h2>分类统计</h2>
      {categoryStats.map(category => (
        <div key={category.id}>
          <span>{category.title}: {category.postCount} 篇</span>
        </div>
      ))}
    </div>
  )
}
```

## 🧪 测试与调试

### 🔍 基本测试

#### 1. 组件测试

```typescript
// 简单的组件测试示例
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Layout } from '../Layout.tsx'

const mockData = {
  posts: [],
  pages: [],
  authors: [],
  categories: [],
  tags: []
}

describe('Layout Component', () => {
  it('renders with correct title', () => {
    const { getByText } = render(
      <Layout title="Test Page" data={mockData}>
        <div>Test Content</div>
      </Layout>
    )

    expect(getByText('Test Page')).toBeInTheDocument()
    expect(getByText('Test Content')).toBeInTheDocument()
  })
})
```

### 🐛 调试技巧

#### 1. 开发模式调试

```typescript
// 简单的调试工具
export function debugLog(message: string, data?: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEBUG] ${message}`, data)
  }
}

export function debugError(error: Error, context?: string) {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[ERROR] ${context || 'Unknown context'}:`, error)
  }
}
```

#### 2. 服务器调试

```bash
# 启动开发服务器进行调试
bun run dev

# 查看服务器日志
tail -f logs/server.log
```

## 🚀 部署

### 📦 基本部署

#### 1. 构建项目

```bash
# 生成数据文件
lumos gen

# 构建项目
bun run build

# 启动生产服务器
lumos server -p 3000
```

#### 2. 环境变量配置

```bash
# .env 文件
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
```

#### 3. 简单部署

```bash
# 使用 Bun 直接运行
bun run src/cli.ts server -p 3000

# 或使用 systemd 服务
sudo systemctl start lumos-blog
```

#### 4. Bun 特有的部署优势

```bash
# Bun 的快速启动
bun --bun src/cli.ts server

# 使用 Bun 的打包功能
bun build src/cli.ts --outdir ./dist --target bun
```

## 📚 最佳实践

### 🎯 开发规范

#### 1. 代码组织

```
src/
├── components/          # React 组件
├── routes/             # 路由处理器
├── utils/              # 工具函数
└── types.ts            # 类型定义
```

#### 2. 命名规范

```typescript
// 组件命名：PascalCase
export const ArticleCard: React.FC<Props> = () => {}

// 函数命名：camelCase
export function parseMarkdownFile(filePath: string) {}

// 类型命名：PascalCase
export interface DatabaseSchema {}
```

#### 3. 错误处理

```typescript
// 简单的错误处理
export function handleError(error: unknown): Response {
  console.error('Error:', error)
  return new Response('Internal Server Error', { status: 500 })
}
```

### 🔧 维护指南

#### 1. 版本管理

```bash
# 更新版本
npm version patch  # 补丁版本
npm version minor  # 小版本
npm version major  # 大版本
```

#### 2. 代码提交

```bash
# 提交代码
git add .
git commit -m "feat: 添加新功能"
git push origin main
```

### 🚀 Bun 开发最佳实践

#### 1. 使用 Bun 的包管理器

```bash
# 安装依赖
bun install

# 添加新依赖
bun add react react-dom

# 添加开发依赖
bun add -d @types/react @types/react-dom
```

#### 2. 利用 Bun 的性能优势

```typescript
// 使用 Bun 的并行处理
const results = await Promise.all([
  Bun.file('file1.json').text(),
  Bun.file('file2.json').text(),
  Bun.file('file3.json').text()
])

// 使用 Bun 的快速 JSON 解析
const data = JSON.parse(await Bun.file('data.json').text())
```

#### 3. Bun 特有的类型支持

```typescript
// 使用 Bun 的类型定义
import type { BunFile } from 'bun'

const file: BunFile = Bun.file('example.txt')
const content = await file.text()
```

## 🎉 总结

通过本教程，你已经学会了：

- 🏗️ **项目架构理解**: 深入理解 Lumos 基于 Bun 的核心架构
- ⚛️ **React 组件开发**: 创建自定义组件和布局系统
- 🛣️ **路由扩展**: 使用 Bun FileSystemRouter 添加新页面和 API
- 🔌 **插件开发**: 创建自定义插件扩展功能
- 🎨 **主题开发**: 创建自定义主题改变外观
- 📊 **数据使用**: 在组件中使用和处理数据
- 🧪 **测试调试**: 基本的测试和调试技巧
- 🚀 **Bun 部署**: 利用 Bun 的性能优势进行部署

### 🚀 Bun 的优势

- **极速启动**: 冷启动时间 < 100ms
- **内置工具**: 包管理器、测试框架、打包工具一体化
- **原生 TypeScript**: 无需额外配置
- **高性能**: 比 Node.js 快 3-5 倍

现在你可以开始你的 Lumos 二次开发之旅了！🚀

如需了解更多关于 Lumos CLI 命令的使用方法，请参阅 [Lumos CLI 使用指南](./lumos-cli-usage.md)。

## 🤝 社区支持

- 💬 [GitHub Discussions](https://github.com/your-username/lumos/discussions) - 技术讨论
- 🐛 [Issue 报告](https://github.com/your-username/lumos/issues) - 问题反馈
- 📝 [贡献指南](https://github.com/your-username/lumos/blob/main/CONTRIBUTING.md) - 参与贡献

## 📄 许可证

MIT License - 详见 [LICENSE](https://github.com/your-username/lumos/blob/main/LICENSE) 文件
