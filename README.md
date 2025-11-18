# Lumos - 基于 Bun 的静态博客生成器

基于 Bun 运行时的高性能静态博客生成器，使用 JSX 组件和现代化技术栈。专为低配置服务器优化，提供轻量级博客解决方案。

## 📚 相关文档

想要深入了解 Lumos 的更多功能和使用方法？请查看以下文档：

- [Lumos 项目介绍](./source/_pages/lumos-introduce.md) - 项目的详细介绍和架构说明
- [Lumos CLI 使用指南](./source/_pages/lumos-cli-usage.md) - CLI 命令的详细使用方法
- [Lumos 二次开发教程](./source/_pages/lumos-development.md) - 插件和主题开发的详细教程
- [Bun 全栈开发](https://bun.sh/docs/bundler/fullstack#fullstack-dev-server) - Bun全栈开发

## ✨ 特性

- ⚡ **极快启动**: 基于 Bun 运行时，冷启动时间 < 100ms
- 📝 **Markdown 原生支持**: 完整的 Markdown 解析，支持代码高亮和 TOC 生成
- 🎨 **现代化模板**: JSX + React 组件替代传统模板引擎
- 🎯 **TypeScript 全覆盖**: 完整的类型安全和开发体验
- 📁 **多格式配置**: 支持 JSON、YAML 配置文件
- 🔥 **热更新开发**: 文件变化自动重新生成，支持监听模式
- 🚀 **零配置启动**: 开箱即用，一键启动
- 🎨 **Tailwind CSS**: 内置现代化 CSS 框架
- 📊 **智能缓存**: 基于 MD5 的文件缓存机制，提升构建性能
- 🌐 **静态资源管理**: 自动处理 CSS、JS、图片等静态资源
- 🔧 **强大的 CLI**: 完整的命令行工具，支持创建、构建、服务等功能
- 🔌 **插件系统**: 支持生命周期钩子的可扩展插件架构
- 🎨 **主题系统**: 支持自定义主题和组件的灵活主题机制
- 📦 **Bundler HTML 页面**: 支持使用 Bun HTML Bundling 创建高性能页面, 支持React 生态

## 🚀 安装

确保你已经安装了 Bun：

```bash
# 安装 Bun (如果尚未安装)
curl -fsSL https://bun.sh/install | bash

# 克隆项目或进入项目目录
cd lumos

# 安装项目依赖
bun install

# 初始化项目（如果需要）
bun run build
```

## 🛠️ 使用方法

### CLI 命令

Lumos 提供了完整的命令行工具：

```bash
# 查看帮助信息
lumos help

# 查看版本
lumos --version
```

### 1. 创建内容

```bash
# 创建新文章
lumos new post "我的第一篇文章"

# 创建新页面
lumos new page "关于我"

# 创建新作者
lumos new author "张三"

# 指定子目录
lumos new post "技术分享" -p "tech"
```

### 2. 生成数据文件

```bash
# 解析所有 Markdown、JSON、YAML 文件，生成 data.json
lumos gen
# 或
lumos generate
```

### 3. 启动开发服务器

```bash
# 启动服务器（默认端口 3060）
lumos server

# 指定端口
lumos server -p 8080

# 监听模式（文件变化自动重新生成）
lumos server -w
# 或
lumos server --watch
```

### 4. 构建项目

```bash
# 完整构建（生成数据 + 处理资源）
lumos build

# 只处理资源文件
lumos assets
```

### 5. 构建 CSS 文件

```bash
# 构建 主题CSS 文件
lumos css

# 监听 主题CSS 文件变化
lumos css -w
# 或
lumos css --watch
```

### 6. 使用 PM2 部署（生产环境）

Lumos 支持使用 PM2 进行生产环境部署，确保应用的高可用性和自动重启。

首先安装 PM2：

```bash
# 全局安装 PM2
bun install -g pm2
```

使用 PM2 启动应用：

```bash
# 启动应用
bun run pm2:start

# 查看应用状态
bun run pm2:status

# 查看日志
bun run pm2:logs

# 重启应用
bun run pm2:restart

# 停止应用
bun run pm2:stop
```

PM2 配置文件 `ecosystem.config.cjs` 已经包含在项目中，可以根据需要进行调整：

- 应用名称: `lumos-blog`
- 启动脚本: 使用 Bun 运行 `src/cli.ts server`
- 端口: 默认 3000
- 日志文件: 存储在 `logs` 目录中

### 7. 使用 Docker 部署

Lumos 支持使用 Docker 进行容器化部署，项目中已包含必要的 Docker 配置文件。

#### 前提条件

确保已安装 Docker 和 Docker Compose：

- [Docker 安装指南](https://docs.docker.com/get-docker/)
- [Docker Compose 安装指南](https://docs.docker.com/compose/install/)

#### 使用 Docker Compose（推荐）

项目根目录包含 `docker-compose.yml` 文件，可以使用 Docker Compose 一键启动应用：

```bash
# 构建镜像并启动容器（后台模式）
docker-compose up --build -d

# 查看容器状态
docker-compose ps

# 查看应用日志
docker-compose logs -f

# 停止容器
docker-compose down
```

#### 使用 Caddy 配置启动应用（推荐）

```bash
docker-compose -f docker-compose.caddy.yml up --build -d
```

默认情况下，应用将在 <http://localhost:3060> 上运行。

#### 使用 Docker CLI

如果不使用 Docker Compose，也可以直接使用 Docker 命令行工具：

```bash
# 构建 Docker 镜像
docker build -t lumos-blog .

# 运行容器
docker run -p 3060:3060 --name lumos-blog -d lumos-blog

# 查看容器日志
docker logs -f lumos-blog

# 停止容器
docker stop lumos-blog
```

#### 开发模式配置

在 `docker-compose.yml` 文件中，提供了可选的开发模式配置。取消注释相应的卷挂载配置，可以实现本地文件变更与容器内文件的实时同步：

```yaml
# 取消注释以下行以启用开发模式卷挂载
# volumes:
#   - "./source:/app/source"
#   - "./themes:/app/themes"
#   - "./data.json:/app/data.json"
```

修改后，重启容器使配置生效：

```bash
docker-compose down
docker-compose up --build -d
```

#### 环境变量配置

Docker 部署支持以下环境变量配置：

- `NODE_ENV`: 运行环境，默认为 `production`
- `PORT`: 服务器端口，默认为 `3060`

可以在 `docker-compose.yml` 文件中修改这些环境变量：

```yaml
environment:
  NODE_ENV: production
  PORT: '3060'
```

#### Dockerfile 说明

项目中的 `Dockerfile` 使用了官方的 Bun 镜像作为基础镜像，并包含以下步骤：

1. 安装项目依赖
2. 生成数据文件
3. 构建 TypeScript、CSS 和 HTML 文件
4. 设置生产环境配置

镜像构建过程会自动排除不必要的文件，这由 `.dockerignore` 文件控制。

### 9. WebP 图片转换

Lumos 提供了内置的 WebP 图片转换功能，可以将 JPEG、PNG 等格式的图片批量转换为更高效的 WebP 格式，以提升网站加载速度和用户体验。

```bash

# 将单个图片转换为 WebP 格式

lumos webp ./images/avatar.jpg ./webp-images/avatar.webp --quality=85

# 批量转换目录中的所有图片

lumos webp ./images ./webp-images --quality=80 --effort=6

```

#### 参数说明

- `输入路径`: 要转换的图片文件或目录路径
- `输出路径`: 转换后 WebP 图片的保存路径
- `--quality`: WebP 图片质量（1-100，默认 80）
- `--effort`: WebP 压缩级别（0-6，默认 6）

#### 支持的图片格式

- JPEG / JPG
- PNG
- TIFF
- GIF
- BMP

#### 使用示例

```bash
# 转换单个图片
lumos webp ./assets/images/logo.png ./assets/images-webp/logo.webp

# 批量转换整个目录
lumos webp ./themes/default/assets/images ./themes/default/assets/images-webp

# 高质量转换
lumos webp ./images ./webp-images --quality=95 --effort=4
```

转换后的 WebP 图片体积通常比原图小 25-35%，同时保持相近的视觉质量，有助于提升网站性能。

### 快速开始

```bash
# 一键启动开发环境
bun run dev

# 或者手动步骤
lumos gen && lumos server -w
```

## 📁 项目结构

```
lumos/
├── 📁 source/               # 内容源目录
│   ├── 📁 _authors/         # 作者 Markdown 文件
│   ├── 📁 _pages/          # 页面 Markdown 文件
│   ├── 📁 _posts/          # 文章 Markdown 文件
│   ├── 📁 _jsons/          # JSON 配置文件
│   └── 📁 _ymls/           # YAML 配置文件
├── 📁 src/                  # 源码目录
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
│   ├── 📁 components/      # React 组件
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
│   └── 📁 default/         # 默认主题
├── 📄 lumos.config.json     # 插件和主题配置
├── 📄 package.json          # 项目配置
├── 📄 tsconfig.json         # TypeScript 配置
├── 📄 tailwind.config.js    # Tailwind CSS 配置
├── 📄 lumos                 # CLI 可执行文件
└── 📄 data.json             # 生成的数据文件
```

## 🧩 插件系统

Lumos 提供了强大的插件系统，允许开发者通过插件扩展博客的功能。插件系统基于生命周期钩子，可以在博客生成和运行的不同阶段执行自定义逻辑。

### 插件架构

插件系统基于以下核心概念：

1. **生命周期钩子**: 插件可以在特定的生命周期阶段执行代码
2. **配置管理**: 插件可以通过配置文件进行配置
3. **易于扩展**: 插件可以轻松地添加新功能

### 生命周期钩子

插件支持以下生命周期钩子：

- `onGenerateStart(generator)`: 数据生成开始前调用
- `onGenerateEnd(data)`: 数据生成结束后调用
- `onParseFile(filePath, content, type)`: 解析文件时调用
- `onRender(html, data)`: 渲染页面时调用
- `onServerStart(server)`: 服务器启动时调用

### 插件配置

插件配置在项目根目录的 `lumos.config.json` 文件中：

```json
{
  "plugins": {
    "example-plugin": {
      "enabled": true,
      "options": {
        "customOption": "value"
      }
    }
  }
}
```

### 创建插件

插件是一个导出默认对象的 TypeScript 文件，放置在 `plugins/` 目录中：

```typescript
// plugins/example-plugin.ts
import { Plugin } from '../src/types.ts'

const examplePlugin: Plugin = {
  name: 'example-plugin',
  version: '1.0.0',
  description: '示例插件',

  async onGenerateStart(generator: any) {
    console.log('生成开始')
  },

  async onGenerateEnd(data: any) {
    console.log('生成结束')
    return data
  },

  async onParseFile(filePath: string, content: string, type: 'post' | 'page' | 'author') {
    console.log(`解析文件: ${filePath}`)
    return content
  },

  async onRender(html: string, data: any) {
    console.log('渲染页面')
    return html
  },

  async onServerStart(server: any) {
    console.log('服务器启动')
  }
}

export default examplePlugin
```

## 🎨 主题系统

Lumos 支持灵活的主题系统，允许开发者创建和使用自定义主题来改变博客的外观和功能。

### 主题结构

主题文件位于 `themes/` 目录中，每个主题都有自己的目录：

```
themes/
└── default/              # 主题目录
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

### 主题配置

主题配置在 `lumos.config.json` 文件中：

```json
{
  "theme": "default"
}
```

### 创建主题

创建新主题只需在 `themes/` 目录中创建新文件夹，并按照主题结构添加文件。

#### 1. 创建主题目录结构

```bash
mkdir -p themes/my-theme/{assets,components,routes}
```

#### 2. 创建布局组件

```tsx
// themes/my-theme/components/Layout.tsx
import * as React from 'react'

interface LayoutProps {
  title: string
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <html>
      <head>
        <title>{title}</title>
        <link rel="stylesheet" href="/assets/styles/theme.css" />
      </head>
      <body>
        <header>
          <h1>我的自定义主题</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2024 我的博客</p>
        </footer>
      </body>
    </html>
  )
}
```

#### 3. 创建路由页面

```tsx
// themes/my-theme/routes/index.tsx
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { LumosContext } from '../../src/context.ts'
import { Layout } from '../components/Layout.tsx'

const HomePage: React.FC = () => (
  <div>
    <h2>欢迎来到我的博客</h2>
    <p>这是使用自定义主题的首页</p>
  </div>
)

export default async function handler(ctx: LumosContext): Promise<void> {
  const html = '<!DOCTYPE html>' + renderToString(React.createElement(HomePage))
  ctx.html(html)
}
```

#### 4. 配置主题

在 `lumos.config.json` 中切换到新主题：

```json
{
  "theme": "my-theme"
}
```

### 主题继承

主题支持继承机制，可以通过扩展默认主题来创建自定义主题，只需覆盖需要修改的部分。

## 📄 Markdown 文件格式

### 文章 (\_posts/\*.md)

```markdown
---
title: '文章标题'
date: '2024-01-01'
alias: 'my-first-post' # 可选，用于 URL
categories: ['技术', 'Web开发']
tags: ['Bun', 'JavaScript', '博客']
excerpt: '文章摘要'
author: 'author-alias'
published: true
featured: false # 是否置顶
---

# 文章内容

这里是文章的 Markdown 内容...

## 支持的功能

- 代码高亮
- TOC 目录生成
- 摘要自动提取
- 字数统计
- 中文 URL 友好化
```

### 页面 (\_pages/\*.md)

```markdown
---
title: '关于页面'
alias: 'about'
published: true
navOrder: 1 # 导航栏排序
---

# 关于我们

这里是页面内容...
```

### 作者 (\_authors/\*.md)

```markdown
---
title: '作者名称'
alias: 'author-alias'
bio: '作者简介'
avatar: '/assets/images/avatar.jpg'
social:
  github: 'https://github.com/username'
  twitter: 'https://twitter.com/username'
  email: 'author@example.com'
---

# 作者详情

作者的详细介绍...
```

## ⚙️ 配置文件

### JSON 配置 (\_jsons/\*.json)

```json
{
  "siteName": "我的博客",
  "siteUrl": "https://example.com",
  "description": "这是一个基于 Lumos 的博客",
  "author": "默认作者",
  "keywords": ["Lumos", "博客", "Bun"],
  "social": {
    "github": "https://github.com/username",
    "twitter": "https://twitter.com/username"
  },
  "navigation": [
    { "name": "首页", "url": "/" },
    { "name": "文章", "url": "/posts" },
    { "name": "关于", "url": "/page/about" }
  ]
}
```

### YAML 配置 (\_ymls/\*.yml)

```yaml
# 主题配置
theme:
  name: default
  colors:
    primary: '#007bff'
    secondary: '#6c757d'
  fonts:
    body: 'Inter, sans-serif'
    heading: 'Inter, sans-serif'

# SEO 配置
seo:
  titleTemplate: '%s | 我的博客'
  defaultDescription: '一个由 Lumos 驱动的静态博客'
  openGraph:
    type: website
    locale: zh_CN
```

## 🌐 API 接口

服务器提供以下 RESTful API：

### 文章 API

- `GET /api/posts` - 获取所有文章（支持分页、筛选）
- `GET /api/posts/:alias` - 获取指定文章
- `GET /api/posts/category/:name` - 获取指定分类下的文章
- `GET /api/posts/tag/:name` - 获取指定标签下的文章

### 页面 API

- `GET /api/pages` - 获取所有页面
- `GET /api/pages/:alias` - 获取指定页面

### 分类和标签 API

- `GET /api/categories` - 获取所有分类
- `GET /api/tags` - 获取所有标签

### 作者 API

- `GET /api/authors` - 获取所有作者
- `GET /api/authors/:alias` - 获取指定作者

### 统计 API

- `GET /api/stats` - 获取站点统计数据

### 查询参数

```
GET /api/posts?page=1&limit=10&category=技术&tag=JavaScript&author=author-alias
```

## 🗺️ 页面路由

### 前台页面

#### 核心页面

- `/` - 首页（最新文章列表）
- `/posts` - 文章列表页（分页显示）
- `/archives` - 文章归档页（按年份分组）
- `/about` - 关于页面
- `/links` - 友情链接页面

#### 内容页面

- `/post/:alias` - 文章详情页
- `/archives/:url` - 文章归档详情页
- `/page/:alias` - 自定义页面详情
- `/pages/:url` - 页面详情（支持 URL 路径）

#### 分类和标签

- `/category/:name` - 分类页面（显示该分类下的文章）
- `/categories/:alias` - 分类页面（支持别名）
- `/tag/:name` - 标签页面（显示该标签下的文章）
- `/tags/:value` - 标签页面（支持值匹配）

#### 特殊页面

- `/404` - 404 错误页面
- `/error` - 通用错误页面

#### 数据接口

- `/rss.xml` - RSS 订阅源
- `/sitemap.xml` - 网站地图
- `/api/*` - RESTful API 接口

### 特性

- 基于 Bun FileSystemRouter 的自动路由
- 支持动态路由参数和别名系统
- SSR 服务端渲染，SEO 友好
- SEO 友好的 URL 结构, 中文 URL 自动转拼音
- 智能缓存和性能优化
- 响应式设计，移动端友好

## 📦 Bundler HTML 页面 (高优先级)

Lumos 支持使用 Bun 的 HTML bundling 功能创建页面，这种方式的优先级比主题中的 route 更高。Bundler HTML 页面位于 `bundler/html/` 目录中。

### 工作原理

<https://bun.sh/docs/bundler/fullstack#fullstack-dev-server>

1. 在 `bundler/html/` 目录中创建 HTML 文件和相关的 TypeScript/JSX 组件
2. 在`html-route.ts` 中配置路由

### 使用场景

- 创建高性能的静态页面
- 构建独立的 landing pages
- 实现特殊的前端交互效果
- 创建演示页面或测试页面

### 示例

```
<!-- bundler/html/index.html -->
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lumos 主题测试页面</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- 将 app.tsx 作为模块引入 -->
    <script src="./app.tsx" type="module"></script>
  </body>
</html>
```

```
// bundler/html/app.tsx
import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div>
      <h1>Hello from Bun HTML Bundling!</h1>
    </div>
  );
}

// 渲染应用
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(React.createElement(App));
  }
});
```

## 🛠️ 开发

### 开发命令

```
# 开发模式（热更新）
bun run dev

# 构建项目
bun run build

# 代码检查
bun run lint

# 修复代码风格
bun run fix

# 构建 CSS
bun run build:css

# 监听 CSS 文件变化
bun run build:css:watch

# TypeScript 编译
bun run tsc
```

### 工作流

1. **创建内容**: 使用 `lumos new` 命令创建文章/页面/作者
2. **开发调试**: 运行 `bun run dev` 启动开发服务器
3. **实时预览**: 文件变化自动重新生成，无需手动刷新
4. **构建部署**: 运行 `lumos build` 生成生产文件

### 技术栈

- **运行时**: Bun
- **语言**: TypeScript
- **模板**: JSX + React
- **样式**: Tailwind CSS
- **解析**: Marked + Gray Matter
- **高亮**: Highlight.js
- **路由**: Bun FileSystemRouter

## 📊 数据结构

生成的 `data.json` 包含以下数据结构：

```
interface DatabaseSchema {
  // 核心实体
  posts: POST[] // 文章列表
  pages: PAGE[] // 页面列表
  authors: AUTHOR[] // 作者列表
  categories: CATEGORY[] // 分类列表
  tags: TAG[] // 标签列表

  // 关联关系
  postCategories: POST_CATEGORY[] // 文章-分类关联
  postTags: POST_TAG[] // 文章-标签关联

  // 配置数据
  [key: string]: any // 其他 JSON/YAML 配置
}

// 文章结构
interface POST {
  id: string
  title: string
  alias?: string
  content: string // HTML 内容
  mdContent: string // 原始 Markdown
  excerpt: string // 摘要
  date: string
  published: boolean
  featured: boolean
  author?: string
  wordCount: number // 字数
  readingTime: number // 阅读时间（分钟）
  toc?: any[] // 目录结构
  url: string // 友好 URL
  createdAt: string
  updatedAt: string
}
```

### 数据特性

- **智能缓存**: 基于 MD5 的文件缓存，只对变更文件重新解析
- **关联关系**: 支持文章与分类、标签、作者的多对多关联
- **SEO 优化**: 自动生成友好 URL，支持中文转拼音
- **内容增强**: 自动生成 TOC、摘要、字数统计等

## 📝 更新日志

### v1.0.0 (2025-09-01)

- ✨ 初始版本发布
- ⚡ 基于 Bun 运行时重写，性能大幅提升
- 🎨 使用 JSX + React 替代 Nunjucks 模板
- 🔧 完整的 CLI 工具链
- 🌐 支持 FileSystemRouter 自动路由
- 🎨 集成 Tailwind CSS 样式系统
- 📊 智能缓存机制，提升构建性能
- 🔍 SEO 优化，支持中文 URL 转拼音
- 📦 静态资源管理和服务
- 🔥 开发模式热更新支持

## 🚀 路线图

- [x] 支持多主题系统
- [ ] 图片优化和懒加载
- [x] 全文搜索功能
- [ ] PWA 支持
- [ ] 多语言国际化
- [ ] 评论系统集成
- [ ] 性能监控和分析
- [x] Docker 容器化支持

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

### 开发流程

1. Fork 项目
2. 创建特性分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'Add amazing feature'`
4. 推送分支: `git push origin feature/amazing-feature`
5. 提交 Pull Request

## 📄 许可证

MIT License
