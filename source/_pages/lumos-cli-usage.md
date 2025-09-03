---
id: 9f6e9823-1c61-418f-b1dd-32d790636e16
title: Lumos CLI USAGE 教程
cover:
created_time: 2025-09-02 17:57:35
updated_time: 2025-09-02 17:57:35
categories: ['开发教程', '技术文档']
tags: ['Bun', 'TypeScript', 'React', '二次开发', '教程', 'FileSystemRouter']
excerpt: Lumos CLI 是一个基于 Bun 运行时的静态博客生成器命令行工具。
published: true
---

# Lumos CLI 使用指南

Lumos CLI 是一个基于 Bun 运行时的静态博客生成器命令行工具。

## 安装

确保已安装 Bun 运行时：

```bash
curl -fsSL https://bun.sh/install | bash
```

## 命令

### new 命令

用于创建新的文章、页面或作者文件。

#### 语法

```bash
bun run new <type> <title> [options]
```

#### 参数

- `<type>`: 文件类型，支持 `post`、`page`、`author`
- `<title>`: 文件标题

#### 选项

- `-p, --path <path>`: 指定子目录路径

#### 示例

1. **创建新文章**

   ```bash
   bun run new post "我的第一篇文章"
   ```

2. **在子目录中创建文章**

   ```bash
   bun run new post "JavaScript 教程" -p "tutorials"
   ```

3. **创建新页面**

   ```bash
   bun run new page "关于我们"
   ```

4. **在子目录中创建页面**

   ```bash
   bun run new page "联系方式" -p "info"
   ```

5. **创建新作者**
   ```bash
   bun run new author "张三"
   ```

## 生成的文件结构

### 文章 (Post)

生成路径: `source/_posts/[path/]<title>.md`

### 页面 (Page)

生成路径: `source/_pages/[path/]<title>.md`

### 作者 (Author)

生成路径: `source/_authors/[path/]<title>.md`

## 模板结构

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

## 自定义模板

模板文件位于 `templates/` 目录下：

- `templates/post.tsx` - 文章模板
- `templates/page.tsx` - 页面模板
- `templates/author.tsx` - 作者模板

你可以修改这些 TSX 文件来自定义生成的文件格式。

## 技术特性

- ✅ 使用 JSX 模板
- ✅ 基于 UUID v5 的稳定 ID 生成
- ✅ 自动创建目录结构
- ✅ 重复文件检测
- ✅ 支持中文标题
- ✅ 统一的时间格式
