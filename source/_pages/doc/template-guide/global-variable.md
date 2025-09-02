---
id: 1ef40c6f-1f8e-6e60-a857-5d1e734662cc
title: 全局变量
alias: doc-template-guide-global-variable
cover:
created_time: 2024-07-13 11:21:07
updated_time: 2024-07-13 11:21:07
categories:
tags:
excerpt:
published: true
---

## 系统变量

### sysConfig

系统变量通过配置文件 `config.yml` 配置

`sysConfig` 是一个全局变量，用于存储系统配置信息

### 其他

- isIndex 是否是首页 `boolean`
- isIndexFirstPage 是否是首页第一页 `boolean`
- isPost 是否文章页 `boolean`
- isPage 是否是单页 `boolean`
- isTag 是否是标签页 `boolean`
- isCategory 是否是分类页 `boolean`
- isArchive 是否是归档页 `boolean`
- isLink 是否是友链页 `boolean`

## 首页 (分页页面)

- pageIndex 当前页码 `number`
- pageCount 页码总数 `number`
- prevPageIndex 前一个页码 `number`
- nextPageIndex 后一个页码 `number`
- pageSize 页码总数 `number`
- postList 文章列表 `LIST_POST_ITEM[]`

## 分类页

- category 分类内容 `CATEGORY`

## 标签页

- tag 标签内容 `TAG`

## Page页

- page 页面内容 `PAGE`

## Post页

- post 页面内容 `POST`
- prevPost 页面内容 `POST`
- nextPost 页面内容 `POST`

## 友链页

- linkArchive 友链归档

`{
  [type: string]: {
  [key: string]: string | boolean | number
  }[]
}[]`
