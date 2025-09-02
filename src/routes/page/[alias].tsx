// 页面详情路由 - /page/[alias]
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

export default async function handler(request: Request, params: { alias: string }): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    const pageAlias = params.alias
    const page = data.pages.find(p => 
      (p.alias === pageAlias || p.url.includes(pageAlias)) && p.published
    )
    
    if (!page) {
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