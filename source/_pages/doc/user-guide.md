---
id: 1ef459b0-d140-6d00-b0b7-4acf496dcd5a
title: user-guide
alias: doc-user-guide
cover:
created_time: 2024-07-19 14:49:31
updated_time: 2024-07-19 14:49:31
categories:
tags:
excerpt:
published: true
---

## 安装、更新

- npm install -g uuice-cli
- yarn global add uuice-cli
- pnpm add -g uuice-cli

## 新建 文章、页面

```
uuice new 命令

eg: uuice new page -p "path/path2" "title"

Usage: uuice-cli new [options] <type> <title>

generate new post or page

Arguments:
type type only support post or page
title title

Options:
-p, --path <path> md file path (default: "")
-h, --help display help for command
```

## 生成 data.json 数据

```
Usage: uuice-cli gen [options]

generate data json

Options:
-w, --watch Listen to the source file directory
-h, --help display help for command
```

## 启动服务

```
Usage: uuice-cli server [options]

nestjs server

Options:
-p, --port <port> server port (default: "6000")
-w --watch Listen to data.json and reload db
-h, --help display help for command
```
