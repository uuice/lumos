// 文章列表页路由
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { DatabaseSchema, POST } from '../types.ts'
import { Layout } from '../components/Layout.tsx'

// 文章列表组件
const PostListPage: React.FC<{
  data: DatabaseSchema
  posts?: POST[]
  title?: string
}> = ({ data, posts, title = "文章列表" }) => {
  const displayPosts = posts || data.posts.filter(post => post.published)

  return (
    <Layout title={title} data={data}>
      <div>
        <h2>{title}</h2>
        <div>
          {displayPosts.map(post => (
            <article key={post.id}>
              <h3>
                <a href={post.url}>{post.title}</a>
              </h3>
              <p>{post.excerpt}</p>
              <div>
                <span>发布时间: {post.date}</span>
                {Array.isArray(post.categories) && post.categories.length > 0 && (
                  <span> | 分类: {post.categories.join(', ')}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default async function handler(_request: Request): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    const html = '<!DOCTYPE html>' + renderToString(
      React.createElement(PostListPage, { data })
    )

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  } catch (error) {
    console.error('文章列表渲染错误:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
