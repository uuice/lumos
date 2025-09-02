import * as React from 'react'
import { renderToString } from 'react-dom/server'
import _ from 'lodash'
import { DatabaseSchema } from './types.ts'
import { formatDate } from './utils.ts'

// 保留一些向后兼容的工具函数和类型
export interface TemplateProps {
  data: DatabaseSchema
  _: typeof _
  formatDate: typeof formatDate
  [key: string]: unknown
}

// 简化的模板渲染器（向后兼容）
export class TemplateRenderer {
  private data: DatabaseSchema

  constructor(data: DatabaseSchema) {
    this.data = data
  }

  // 渲染 JSX 组件为 HTML 字符串的工具方法
  renderComponent(component: React.ReactElement): string {
    return '<!DOCTYPE html>' + renderToString(component)
  }

  // 简化的渲染方法，主要用于向后兼容
  render(templateName: string, _props: unknown = {}): string {
    console.warn(`TemplateRenderer.render() is deprecated. Use route-specific components instead.`)
    throw new Error(`Template rendering should now be handled in route files. Template: ${templateName}`)
  }

  // 废弃的方法，保留用于兼容性
  renderIndex(): string {
    throw new Error('renderIndex() is deprecated. Use /routes/index.ts instead.')
  }

  renderPost(_post: unknown): string {
    throw new Error('renderPost() is deprecated. Use /routes/post/[alias].ts instead.')
  }

  renderPostList(): string {
    throw new Error('renderPostList() is deprecated. Use /routes/posts.ts instead.')
  }
}
