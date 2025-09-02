---
id: 1ef40c70-59f7-62e0-9ae4-8dbc49326259
title: 标签列表
alias: doc-template-guide-global-tag
cover:
created_time: 2024-07-13 11:21:40
updated_time: 2024-07-13 11:21:40
categories:
tags:
excerpt:
published: true
---

## Post相关

### post分页列表

标签名: PostPageList

参数

无

标签返回变量

- postPageList: `POST_PAGE_QUERY`

### 通过分类获取post列表

标签名: PostListByCategory

参数

- id: `string` 分类id
- title: `string` 分类title
- url: `string` 分类url

标签返回变量

- list: `LIST_POST_ITEM[]`

### 通过标签获取post列表

标签名: PostListByTag

参数

- id: `string` 标签id
- title: `string` 标签title
- url: `string` 标签url

标签返回变量

- list: `LIST_POST_ITEM[]`

### 获取post详情

标签名: PostItem

参数

- id: `string` Post id
- title: `string` Post title
- url: `string` Post url

标签返回变量

- post: `POST | undefined`

## 分类相关

### 分类列表

标签名: CategoryList

参数

- withPostNum: `boolean` 是否返回 postNum

标签返回变量

- list: `CATEGORY_WITH_POST_NUM[] | CATEGORY[]`

### 分类详情

标签名: CategoryItem

参数

- id: `string` 分类id
- title: `string` 分类title
- url: `string` 分类url

标签返回变量

- category: `CATEGORY | undefined`

## 标签相关

### 标签列表

标签名: TagList

参数

- withPostNum: `boolean` 是否返回 postNum

标签返回变量

- list: `TAG_WITH_POST_NUM[] | TAG[]`

### 标签详情

标签名: TagItem

参数

- id: `string` 标签id
- title: `string` 标签title
- url: `string` 标签url

标签返回变量

- tag: `TAG | undefined`

## 页面相关

### 页面列表

标签名: PageList

参数

无

标签返回变量

- list: `LIST_PAGE_ITEM[]`

### 页面详情

标签名: PageItem

参数

- id: `string` 页面id
- title: `string` 页面title
- url: `string` 页面url

标签返回变量

- page: `PAGE | undefined`

## Json标签相关

标签名: JsonConfig

参数

- alias: `string` Json标签别名 (文件名)

标签返回变量

jsonData: `JSON_OBJ | undefined`

## Yml标签相关

标签名: YmlConfig

参数

- alias: `string` Yml标签别名 (文件名)

标签返回变量

ymlData: `JSON_OBJ | undefined`

## 系统配置相关

### 所有系统配置

标签名: SysConfig

参数

无

标签返回变量

list: `JSON_OBJ | undefined`

### 单个系统配置

标签名: SysConfigItem

参数

- path: `string` 系统配置路径

标签返回变量

无

标签直接返回 `JSON_OBJ | string | number | boolean | undefined`
