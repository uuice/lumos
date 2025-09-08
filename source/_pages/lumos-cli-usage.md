---
id: 9f6e9823-1c61-418f-b1dd-32d790636e16
title: Lumos CLI USAGE 教程
cover:
alias: lumos-cli-usage
created_time: 2025-09-02 17:57:35
updated_time: 2025-09-02 17:57:35
categories: ['开发教程', '技术文档']
tags: ['Bun', 'TypeScript', 'React', '二次开发', '教程', 'FileSystemRouter']
excerpt: Lumos CLI 是一个基于 Bun 运行时的静态博客生成器命令行工具。
published: true
---

# Lumos CLI 使用指南

Lumos CLI 是一个基于 Bun 运行时的静态博客生成器命令行工具。您可以使用两种方式来运行Lumos命令：

1. 使用 `lumos` 命令（需要将Lumos添加到系统PATH）
2. 使用 `bun run` 命令（推荐方式）

如果您想了解 Lumos 的更多高级功能，如插件系统和主题系统，请参阅 [Lumos 项目介绍](./lumos-introduce.md) 和 [Lumos 二次开发教程](./lumos-development.md)。

## 📚 相关文档

- [Lumos 项目介绍](./lumos-introduce.md) - 项目的详细介绍和架构说明
- [Lumos 二次开发教程](./lumos-development.md) - 插件和主题开发的详细教程
- [README 文档](../README.md) - 项目完整文档

## 📋 安装

确保已安装 Bun 运行时：

```bash
curl -fsSL https://bun.sh/install | bash
```

## 🚀 快速开始

### 工作流程示例

#### 1. 初始化项目

```bash
# 克隆项目
git clone <repository-url>
cd lumos

# 安装依赖
bun install
```

#### 2. 创建内容

使用 `lumos` 命令：

```bash
# 创建文章
lumos new post "Lumos 使用指南"

# 创建页面
lumos new page "关于" -p "info"

# 创建作者
lumos new author "开发者"
```

使用 `bun run` 命令：

```bash
# 创建文章
bun run src/cli.ts new post "Lumos 使用指南"

# 创建页面
bun run src/cli.ts new page "关于" -p "info"

# 创建作者
bun run src/cli.ts new author "开发者"
```

#### 3. 生成数据

使用 `lumos` 命令：

```bash
# 生成数据文件
lumos gen
```

使用 `bun run` 命令：

```bash
# 生成数据文件
bun run src/cli.ts gen
```

#### 4. 启动开发服务器

使用 `lumos` 命令：

```bash
# 启动服务器并监听文件变化
lumos server -w
```

使用 `bun run` 命令：

```bash
# 启动服务器并监听文件变化
bun run src/cli.ts server -w
```

#### 5. 构建项目

使用 `lumos` 命令：

```bash
# 构建项目用于生产环境
lumos build
```

使用 `bun run` 命令：

```bash
# 构建项目用于生产环境
bun run src/cli.ts build
```

#### 6. 构建 Bundler HTML 文件

使用 `lumos` 命令：

```bash
# 构建 HTML 文件
lumos html-gen

# 监听 HTML 文件变化并重新构建
lumos html-gen -w
```

使用 `bun run` 命令：

```bash
# 构建 HTML 文件
bun run src/cli.ts html-gen

# 监听 HTML 文件变化并重新构建
bun run src/cli.ts html-gen -w
```

#### 7. 构建 主题 CSS 文件

使用 `lumos` 命令：

```bash
# 构建 CSS 文件
lumos css

# 监听 CSS 文件变化
lumos css -w
```

使用 `bun run` 命令：

```bash
# 构建 CSS 文件
bun run src/cli.ts css

# 监听 CSS 文件变化
bun run src/cli.ts css -w
```

## 🛠️ 命令详解

### new 命令

用于创建新的文章、页面或作者文件。

#### 语法

使用 `lumos` 命令：

```bash
lumos new <type> <title> [options]
```

使用 `bun run` 命令：

```bash
bun run src/cli.ts new <type> <title> [options]
```

#### 参数

- `<type>`: 文件类型，支持 `post`、`page`、`author`
- `<title>`: 文件标题

#### 选项

- `-p, --path <path>`: 指定子目录路径

#### 示例

1. **创建新文章**

   使用 `lumos` 命令：

   ```bash
   lumos new post "我的第一篇文章"
   ```

   使用 `bun run` 命令：

   ```bash
   bun run src/cli.ts new post "我的第一篇文章"
   ```

2. **在子目录中创建文章**

   使用 `lumos` 命令：

   ```bash
   lumos new post "JavaScript 教程" -p "tutorials"
   ```

   使用 `bun run` 命令：

   ```bash
   bun run src/cli.ts new post "JavaScript 教程" -p "tutorials"
   ```

3. **创建新页面**

   使用 `lumos` 命令：

   ```bash
   lumos new page "关于我们"
   ```

   使用 `bun run` 命令：

   ```bash
   bun run src/cli.ts new page "关于我们"
   ```

4. **在子目录中创建页面**

   使用 `lumos` 命令：

   ```bash
   lumos new page "联系方式" -p "info"
   ```

   使用 `bun run` 命令：

   ```bash
   bun run src/cli.ts new page "联系方式" -p "info"
   ```

5. **创建新作者**

   使用 `lumos` 命令：

   ```bash
   lumos new author "张三"
   ```

   使用 `bun run` 命令：

   ```bash
   bun run src/cli.ts new author "张三"
   ```

### gen 命令

用于解析所有 Markdown、JSON、YAML 文件，生成 data.json 数据文件。

#### 语法

使用 `lumos` 命令：

```bash
lumos gen
```

使用 `bun run` 命令：

```bash
bun run src/cli.ts gen
```

#### 示例

1. **生成数据文件**

   使用 `lumos` 命令：

   ```bash
   lumos gen
   ```

   使用 `bun run` 命令：

   ```bash
   bun run src/cli.ts gen
   ```

2. **生成数据文件（别名命令）**

   使用 `lumos` 命令：

   ```bash
   lumos generate
   ```

   使用 `bun run` 命令：

   ```bash
   bun run src/cli.ts generate
   ```

### server 命令

启动开发服务器，支持监听文件变化自动重新生成。

#### 语法

使用 `lumos` 命令：

```bash
lumos server [options]
```

使用 `bun run` 命令：

```bash
bun run src/cli.ts server [options]
```

#### 选项

- `-p, --port <port>`: 指定服务器端口（默认: 3060）
- `-w, --watch`: 启用监听模式，文件变化自动重新生成

#### 示例

1. **启动开发服务器**

   使用 `lumos` 命令：

   ```bash
   lumos server
   ```

   使用 `bun run` 命令：

   ```bash
   bun run src/cli.ts server
   ```

2. **指定端口启动服务器**

   使用 `lumos` 命令：

   ```bash
   lumos server -p 8080
   ```

   使用 `bun run` 命令：

   ```bash
   bun run src/cli.ts server -p 8080
   ```

3. **启用监听模式**

   使用 `lumos` 命令：

   ```bash
   lumos server -w
   ```

   使用 `bun run` 命令：

   ```bash
   bun run src/cli.ts server -w
   ```

4. **指定端口并启用监听模式**

   使用 `lumos` 命令：

   ```bash
   lumos server -p 8080 -w
   ```

   使用 `bun run` 命令：

   ```bash
   bun run src/cli.ts server -p 8080 -w
   ```

### build 命令

构建项目，包括生成数据文件和处理资源文件。

#### 语法

使用 `lumos` 命令：

```bash
lumos build
```

使用 `bun run` 命令：

```bash
bun run src/cli.ts build
```

#### 示例

1. **构建项目**

   使用 `lumos` 命令：

   ```bash
   lumos build
   ```

   使用 `bun run` 命令：

   ```bash
   bun run src/cli.ts build
   ```

### assets 命令

处理资源文件，确保资源目录存在并创建必要的子目录。

#### 语法

使用 `lumos` 命令：

```bash
lumos assets
```

使用 `bun run` 命令：

```bash
bun run src/cli.ts assets
```

#### 示例

1. **处理资源文件**

   使用 `lumos` 命令：

   ```bash
   lumos assets
   ```

   使用 `bun run` 命令：

   ```bash
   bun run src/cli.ts assets
   ```

### Bundler html-gen 命令

构建 HTML 文件，支持监听模式重新构建。

#### 语法

使用 `lumos` 命令：

```bash
lumos html-gen [options]
```

使用 `bun run` 命令：

```bash
bun run src/cli.ts html-gen [options]
```

#### 选项

- `-w, --watch`: 启用监听模式，监听 HTML 文件变化并重新构建

#### 示例

1. **构建 HTML 文件**

   使用 `lumos` 命令：

   ```bash
   lumos html-gen
   ```

   使用 `bun run` 命令：

   ```bash
   bun run src/cli.ts html-gen
   ```

2. **监听 HTML 文件变化并重新构建**

   使用 `lumos` 命令：

   ```bash
   lumos html-gen -w
   ```

   使用 `bun run` 命令：

   ```bash
   bun run src/cli.ts html-gen -w
   ```

### css 命令

构建 CSS 文件，支持监听模式。

#### 语法

使用 `lumos` 命令：

```bash
lumos css [options]
```

使用 `bun run` 命令：

```bash
bun run src/cli.ts css [options]
```

#### 选项

- `-w, --watch`: 启用监听模式，监听 CSS 文件变化

#### 示例

1. **构建 主题 CSS 文件**

   使用 `lumos` 命令：

   ```bash
   lumos css
   ```

   使用 `bun run` 命令：

   ```bash
   bun run src/cli.ts css
   ```

2. **监听 主题 CSS 文件变化**

   使用 `lumos` 命令：

   ```bash
   lumos css -w
   ```

   使用 `bun run` 命令：

   ```bash
   bun run src/cli.ts css -w
   ```

## 📁 生成的文件结构

### 文章 (Post)

生成路径: `source/_posts/[path/]<title>.md`

### 页面 (Page)

生成路径: `source/_pages/[path/]<title>.md`

### 作者 (Author)

生成路径: `source/_authors/[path/]<title>.md`

## 📄 模板结构

所有生成的文件都包含以下 Front Matter：

```yaml
---
id: <自动生成的UUID>
title: <标题>
cover:
created_time: <创建时间>
updated_time: <更新时间>
categories:
tags:
excerpt:
published: true
---
```

## 🎨 自定义模板

模板文件位于 `templates/` 目录下：

- `templates/post.tsx` - 文章模板
- `templates/page.tsx` - 页面模板
- `templates/author.tsx` - 作者模板

你可以修改这些 TSX 文件来自定义生成的文件格式。

## ⚙️ 技术特性

- ✅ 使用 JSX 模板
- ✅ 基于 UUID v5 的稳定 ID 生成
- ✅ 自动创建目录结构
- ✅ 重复文件检测
- ✅ 支持中文标题
- ✅ 统一的时间格式
- ✅ 支持子目录路径
- ✅ 自动生成友好 URL
- ✅ 中文标题自动转拼音

## 🔧 高级用法

### 使用 package.json 脚本

Lumos 项目提供了预定义的 npm 脚本：

```bash
# 启动开发环境（等同于 lumos server -w）
bun run dev

# 创建新内容
bun run new post "文章标题"

# 生成数据
bun run gen

# 构建项目
bun run build

# 构建 Bundler HTML 文件
bun run build:html

# 监听 Bundler HTML 文件变化并重新构建
bun run dev:html

# 构建 主题CSS 文件
bun run build:css

# 监听 主题CSS 文件变化
bun run build:css:watch
```

### 命令组合使用

使用 `lumos` 命令：

```bash
# 一次性生成数据并启动服务器
lumos gen && lumos server

# 构建项目并处理资源
bun run src/cli.ts build && bun run src/cli.ts assets

# 构建 Bundler HTML 文件并监听变化
lumos html-gen && lumos html-gen -w

# 构建 主题 CSS 文件并监听变化
lumos css && lumos css -w
```

使用 `bun run` 命令：

```bash
# 一次性生成数据并启动服务器
bun run src/cli.ts gen && bun run src/cli.ts server

# 构建项目并处理资源
bun run src/cli.ts build && bun run src/cli.ts assets

# 构建 Bundler HTML 文件并监听变化
bun run src/cli.ts html-gen && bun run src/cli.ts html-gen -w

# 构建 主题 CSS 文件并监听变化
bun run src/cli.ts css && bun run src/cli.ts css -w
```

## 🎯 推荐使用方式

我们推荐使用 `bun run` 命令，因为：

1. **无需全局安装**：不需要将Lumos添加到系统PATH
2. **版本一致**：确保使用项目中定义的Lumos版本
3. **跨平台兼容**：在不同操作系统上行为一致
4. **易于团队协作**：所有团队成员使用相同的命令方式

如果您想深入了解如何扩展 Lumos 的功能，例如创建自定义插件或主题，请参阅 [Lumos 二次开发教程](./lumos-development.md)。
