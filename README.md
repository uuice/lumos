# Lumos - Bun 版本

基于 Bun 运行时的极简静态博客生成器，使用 JSX 替代 nunjucks 模板引擎。

## 特性

- ⚡ **极快启动**: 基于 Bun 运行时，启动速度极快
- 📝 **Markdown 支持**: 原生支持 Markdown 文件解析
- 🎨 **JSX 模板**: 使用 JSX 组件进行模板渲染，替代传统模板引擎
- 📁 **多格式配置**: 支持 JSON 和 YAML 配置文件
- 🔥 **热更新**: 开发模式下支持文件变化自动重新生成
- 🚀 **零配置**: 开箱即用，无需复杂配置

## 项目结构

```
lumos/
├── source/            # 内容源目录
│   ├── _authors/      # 作者 Markdown 文件
│   ├── _pages/        # 页面 Markdown 文件
│   ├── _posts/        # 文章 Markdown 文件
│   ├── _jsons/        # JSON 配置文件
│   └── _ymls/         # YAML 配置文件
├── src/               # 源码
├── package.json       # 项目配置
├── tsconfig.json      # TypeScript 配置
└── data.json          # 生成的数据文件
```

## 安装

确保你已经安装了 Bun:

```bash
# 安装 Bun
curl -fsSL https://bun.sh/install | bash

# 安装项目依赖
bun install
```

## 使用方法

### 1. 生成数据文件

```bash
bun run gen
# 或
bun src/generate.ts
```

这会解析所有的 Markdown、JSON、YAML 文件，生成 `data.json` 数据文件。

### 2. 启动开发服务器

```bash
bun run dev
# 或
bun src/index.tsx server
```

默认在 http://localhost:3000 启动服务器。

### 3. 监听模式

```bash
bun src/index.tsx server --watch
```

监听源文件变化，自动重新生成数据并刷新服务器。

### 4. 自定义端口

```bash
bun src/index.tsx server --port 8080
```

## Markdown 文件格式

### 文章 (\_posts/\*.md)

```markdown
---
title: '文章标题'
date: '2024-01-01'
categories: ['技术', 'Web开发']
tags: ['Bun', 'JavaScript', '博客']
excerpt: '文章摘要'
published: true
---

# 文章内容

这里是文章的 Markdown 内容...
```

### 页面 (\_pages/\*.md)

```markdown
---
title: '关于页面'
alias: 'about'
published: true
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
---

# 作者详情

作者的详细介绍...
```

## 配置文件

### JSON 配置 (\_jsons/\*.json)

```json
{
  "siteName": "我的博客",
  "siteUrl": "https://example.com",
  "description": "这是一个基于 Lumos 的博客"
}
```

### YAML 配置 (\_ymls/\*.yml)

```yaml
theme:
  name: default
  colors:
    primary: '#007bff'
    secondary: '#6c757d'
```

## API 接口

服务器提供以下 REST API:

- `GET /api/posts` - 获取所有文章
- `GET /api/posts/:id` - 获取指定文章
- `GET /api/pages` - 获取所有页面
- `GET /api/categories` - 获取所有分类
- `GET /api/tags` - 获取所有标签
- `GET /api/authors` - 获取所有作者

## 页面路由

- `/` - 首页
- `/posts` - 文章列表
- `/post/:alias` - 文章详情页
- `/page/:alias` - 页面详情
- `/category/:name` - 分类页面
- `/tag/:name` - 标签页面

## 开发

```bash
# 开发模式
bun run dev

# 构建项目
bun run build

# 运行测试
bun test
```

## 数据结构

生成的 `data.json` 包含以下数据结构:

```typescript
interface DatabaseSchema {
  posts: POST[] // 文章列表
  pages: PAGE[] // 页面列表
  authors: AUTHOR[] // 作者列表
  categories: CATEGORY[] // 分类列表
  tags: TAG[] // 标签列表
  postCategories: POST_CATEGORY[] // 文章-分类关联
  postTags: POST_TAG[] // 文章-标签关联
  [key: string]: any // 其他配置数据
}
```

## 许可证

MIT License
