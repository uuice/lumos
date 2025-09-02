---
id: 1ef40c6e-d151-69a0-9327-ad1a88221078
title: 全局过滤器
alias: doc-template-guide-global-filter
cover:
created_time: 2024-07-13 11:20:59
updated_time: 2024-07-13 11:20:59
categories:
tags:
excerpt:
published: true
---

## console

配合`dump`、`safe` 两个过滤器，打印模板内容到浏览器控制台，主要用于调试

### 参数

- key: 属性名
- type: <span>(可选)</span>浏览器 console 的所有方法都可以用，常用的 type 如下:
  - log 打印内容的通用方法 **（默认）**
  - info 打印资讯类说明信息
  - table 将列表型的数据打印成表格
  - warn 打印一个警告信息
  - error 打印一条错误信息

### 推荐使用方式

`Console` 默认加载到了系统中， 可以直接使用

列表数据建议用`table`打印， 输出更直观

其他可以用 log、info 打印

### 调用

```
{{ message | dump | console('message') | safe}}
{{ result | dump | console('result', 'table') | safe}}
```

## date

使用`moment` 进行时间格式化

### 参数

- format: **(可选)** 格式化字符串，默认为`YYYY-MM-DD HH:mm:ss`

### 推荐格式

- 年月日 时分 `YYYY-MM-DD HH:mm:ss`
- 年月日 `YYYY-MM-DD`

## shorten

字符串截取

### 参数

- count **(可选)** 截取长度，默认为 5

## stripHtml

用空字符串替换所有HTML标签

## symbolsCount

统计字符串中符号的数量, 不包括html标签和所有不可见字符

## titleToUrl

将标题转换为 URL
