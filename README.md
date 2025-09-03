# Lumos - 基于 Bun 的静态博客生成器

基于 Bun 运行时的高性能静态博客生成器，使用 JSX 组件和现代化技术栈。专为低配置服务器优化，提供轻量级博客解决方案。

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

## 📁 项目结构

```
lumos/
├── source/               # 内容源目录
│   ├── _authors/         # 作者 Markdown 文件
│   ├── _pages/          # 页面 Markdown 文件
│   ├── _posts/          # 文章 Markdown 文件
│   ├── _jsons/          # JSON 配置文件
│   └── _ymls/           # YAML 配置文件
├── src/                  # 源码目录
│   ├── cli.ts           # CLI 命令行工具
│   ├── components/      # React 组件
│   ├── routes/          # 路由处理器
│   ├── server.ts        # HTTP 服务器
│   ├── generator.ts     # 数据生成器
│   └── utils.ts         # 工具函数
├── assets/               # 静态资源目录
│   ├── css/             # 样式文件
│   ├── js/              # JavaScript 文件
│   ├── images/          # 图片资源
│   └── fonts/           # 字体文件
├── templates/            # 模板文件
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript 配置
├── tailwind.config.js    # Tailwind CSS 配置
├── lumos                 # CLI 可执行文件
└── data.json             # 生成的数据文件
```

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

### 快速开始

```bash
# 一键启动开发环境
bun run dev

# 或者手动步骤
lumos gen && lumos server -w
```

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

## 🛠️ 开发

### 开发命令

```bash
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

```typescript
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

### v1.0.0 (2024-01-01)

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

## 🚀 路线图

- [ ] 支持多主题系统
- [ ] 图片优化和懒加载
- [ ] 全文搜索功能
- [ ] PWA 支持
- [ ] 多语言国际化
- [ ] 评论系统集成
- [ ] 性能监控和分析
- [ ] Docker 容器化支持
