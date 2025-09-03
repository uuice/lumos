// 文章详情页路由 - /post/[alias]
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { DatabaseSchema, POST } from '../../../../src/types.ts'
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
                <a key={cat} href={`/category/${cat}`}>{cat}</a>
              )).reduce((prev, curr) => [prev, ', ', curr] as any)}
            </div>
          )}
          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <div>
              标签: {post.tags.map(tag => (
                <a key={tag} href={`/tag/${tag}`}>{tag}</a>
              )).reduce((prev, curr) => [prev, ', ', curr] as any)}
            </div>
          )}
        </div>
      </header>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  </Layout>
)

export default async function handler(request: Request, params: { alias: string }): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    const postAlias = params.alias
    const post = data.posts.find(p =>
      (p.alias === postAlias || p.url.includes(postAlias)) && p.published
    )

    if (!post) {
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
