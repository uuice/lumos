// 标签页面路由 - /tags/[value]
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { DatabaseSchema, POST } from '../../types.ts'
import { Layout } from '../../components/Layout.tsx'

// 标签页面组件
const TagPage: React.FC<{
  data: DatabaseSchema
  posts: POST[]
  tagName: string
}> = ({ data, posts, tagName }) => (
  <Layout title={`标签: ${tagName}`} data={data}>
    <div>
      <h2>标签: {tagName}</h2>
      <div>
        {posts.map(post => (
          <article key={post.id}>
            <h3>
              <a href={`/archives${post.url?.replace('/post', '') || `/${post.alias}`}`}>{post.title}</a>
            </h3>
            <p>{post.excerpt}</p>
            <div>
              <span>发布时间: {post.date}</span>
              {Array.isArray(post.tags) && post.tags.length > 0 && (
                <span> | 标签: {post.tags.join(', ')}</span>
              )}
            </div>
          </article>
        ))}
        {posts.length === 0 && (
          <p>这个标签下暂无文章。</p>
        )}
      </div>
    </div>
  </Layout>
)

export default async function handler(request: Request, params: { value: string }): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    const tagValue = decodeURIComponent(params.value)

    // 查找标签 - 支持按 value、title 或 url 查找
    const tag = data.tags?.find(t =>
      t.url === tagValue || t.title === tagValue || t.url === tagValue
    )

    const tagName = tag?.title || tagValue

    // 查找该标签下的文章
    const posts = data.posts.filter(p => {
      const tags = Array.isArray(p.tags) ? p.tags : []
      return tags.includes(tagName) && p.published
    }).sort((a, b) =>
      new Date(b.date || b.created_time).getTime() - new Date(a.date || a.created_time).getTime()
    )

    const html = '<!DOCTYPE html>' + renderToString(
      React.createElement(TagPage, { data, posts, tagName })
    )

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  } catch (error) {
    console.error('标签页面渲染错误:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
