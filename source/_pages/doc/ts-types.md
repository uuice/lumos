---
id: 1ef459f0-9402-64d0-87ab-b370f5a752c2
title: ts-types
alias: doc-ts-types
cover:
created_time: 2024-07-19 15:18:02
updated_time: 2024-07-19 15:18:02
categories:
tags:
excerpt:
published: true
---

## ARTICLE

```typescript
export interface ARTICLE {
  id: string
  title: string
  alias: string
  cover: string
  created_time: string
  date?: string
  updated_time: string
  updated?: string
  categories: Array<string>
  tags: Array<string>
  excerpt: string
  published: boolean
  content: string
  mdContent: string
  toc: string
  created_timestamp: number
  updated_timestamp: number
  url: string
  symbolsCount: number

  [key: string]: string | Array<string> | boolean | number
}
```

## POST

```typescript
import { PAGE } from './page'
import { ARTICLE } from './article'

export interface POST extends ARTICLE {}

export type LIST_POST_ITEM = Omit<POST, 'content' | 'mdContent' | 'toc'>

export type ARCHIVES_DATE_YEAR = { [date: string]: LIST_POST_ITEM[] }[]

export type ARCHIVES_DATE_YEAR_MONTH = { [date: string]: ARCHIVES_DATE_YEAR }[]

export type POST_PAGE_QUERY = {
  pageIndex: number
  pageCount: number
  prevPageIndex: number
  nextPageIndex: number
  pageSize: number
  postList: Omit<PAGE, 'content' | 'mdContent' | 'toc'>[]
}
```

## PAGE

```typescript
import { ARTICLE } from './article'

export interface PAGE extends ARTICLE {}

export type LIST_PAGE_ITEM = Omit<PAGE, 'content' | 'mdContent' | 'toc'>
```

## CATEGORY

```typescript
export interface CATEGORY {
  id: string
  title: string
  description: string
  url: string
}

export type CATEGORY_WITH_POST_NUM = CATEGORY & {
  postNum: number
}
```

## TAG

```typescript
export interface TAG {
  id: string
  title: string
  description: string
  url: string
}

export type TAG_WITH_POST_NUM = TAG & {
  postNum: number
}
```

## POST_CATEGORY

```typescript
export interface POST_CATEGORY {
  postId: string
  categoryId: string
  id: string
}
```

## POST_TAG

```typescript
export interface POST_TAG {
  postId: string
  tagId: string
  id: string
}
```

## CONFIG

```typescript
export interface CONFIG {
  [key: string]: string | number | boolean | object
}
```

## JSON

```typescript
export interface JSON_OBJ {
  [key: string]: any
}
```
