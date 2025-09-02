// 页面详情路由 - /pages/[url]
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { DatabaseSchema, PAGE } from '../../types.ts'
import { Layout } from '../../components/Layout.tsx'

// 页面详情组件
const PageDetailPage: React.FC<{ data: DatabaseSchema, page: PAGE }> = ({ data, page }) => (
  <Layout title={page.title} data={data}>
    <article>
      <header>
        <h1>{page.title}</h1>
        <div>
          <span>更新时间: {page.updated_time}</span>
          <span> | 字数: {page.symbolsCount}</span>
        </div>
      </header>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </article>
  </Layout>
)

export default async function handler(request: Request, params: { url: string }): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    const pageUrl = params.url
    // 支持通过 alias 或 url 查找页面
    const page = data.pages.find(p => {
      // 移除 URL 前缀进行匹配
      const cleanUrl = p.url?.replace(/^\/page\//, '') || p.alias
      return (cleanUrl === pageUrl || p.alias === pageUrl) && p.published
    })

    if (!page) {
      // 尝试加载 404 页面
      try {
        const notFoundModule = await import('../404.tsx')
        const notFoundHandler = notFoundModule.default
        if (notFoundHandler) {
          return await notFoundHandler(request)
        }
      } catch (error) {
        console.error('加载 404 页面失败:', error)
      }
      
      return new Response('Page not found', { status: 404 })
    }

    const html = '<!DOCTYPE html>' + renderToString(
      React.createElement(PageDetailPage, { data, page })
    )

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  } catch (error) {
    console.error('页面详情渲染错误:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
