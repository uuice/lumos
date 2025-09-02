// 文章详情页路由 - /archives/[url]
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { DatabaseSchema, POST } from '../../types.ts'
import { Layout } from '../../components/Layout.tsx'

// 文章详情组件
const PostDetailPage: React.FC<{ data: DatabaseSchema, post: POST }> = ({ data, post }) => (
  <Layout title={post.title} data={data}>
    <article>
      <header>
        <h1>{post.title}</h1>
        <div>
          <span>发布时间: {post.date}</span>
          <span> | 字数: {post.symbolsCount}</span>
          {Array.isArray(post.categories) && post.categories.length > 0 && (
            <div>
              分类: {post.categories.map(cat => (
                <a key={cat} href={`/categories/${cat}`}>{cat}</a>
              )).reduce((prev, curr) => [prev, ', ', curr] as any)}
            </div>
          )}
          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <div>
              标签: {post.tags.map(tag => (
                <a key={tag} href={`/tags/${tag}`}>{tag}</a>
              )).reduce((prev, curr) => [prev, ', ', curr] as any)}
            </div>
          )}
        </div>
      </header>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  </Layout>
)

export default async function handler(request: Request, params: { url: string }): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    const postUrl = params.url
    // 支持通过 alias 或 url 查找文章
    const post = data.posts.find(p => {
      // 移除 URL 前缀进行匹配
      const cleanUrl = p.url?.replace(/^\/post\//, '') || p.alias
      return (cleanUrl === postUrl || p.alias === postUrl) && p.published
    })

    if (!post) {
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

      return new Response('Post not found', { status: 404 })
    }

    const html = '<!DOCTYPE html>' + renderToString(
      React.createElement(PostDetailPage, { data, post })
    )

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  } catch (error) {
    console.error('文章详情渲染错误:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
