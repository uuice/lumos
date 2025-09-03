// 分类页面路由 - /categories/[alias]
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { DatabaseSchema, POST } from '../../../../src/types.ts'
import { Layout } from '../../components/Layout.tsx'

// 分类页面组件
const CategoryPage: React.FC<{
  data: DatabaseSchema
  posts: POST[]
  categoryName: string
}> = ({ data, posts, categoryName }) => (
  <Layout title={`分类: ${categoryName}`} data={data}>
    <div>
      <h2>分类: {categoryName}</h2>
      <div>
        {posts.map(post => (
          <article key={post.id}>
            <h3>
              <a href={`/archives${post.url?.replace('/post', '') || `/${post.alias}`}`}>{post.title}</a>
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
        {posts.length === 0 && (
          <p>这个分类下暂无文章。</p>
        )}
      </div>
    </div>
  </Layout>
)

export default async function handler(request: Request, params: { alias: string }): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    const categoryAlias = decodeURIComponent(params.alias)

    // 查找分类 - 支持按 alias 或 title 查找
    const category = data.categories?.find(cat =>
      cat.url === categoryAlias || cat.title === categoryAlias || cat.url === categoryAlias
    )

    const categoryName = category?.title || categoryAlias

    // 查找该分类下的文章
    const posts = data.posts.filter(p => {
      const categories = Array.isArray(p.categories) ? p.categories : []
      return categories.includes(categoryName) && p.published
    }).sort((a, b) =>
      new Date(b.date || b.created_time).getTime() - new Date(a.date || a.created_time).getTime()
    )

    const html = '<!DOCTYPE html>' + renderToString(
      React.createElement(CategoryPage, { data, posts, categoryName })
    )

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  } catch (error) {
    console.error('分类页面渲染错误:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
