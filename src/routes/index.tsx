// 首页路由
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import _ from 'lodash'
import { DatabaseSchema } from '../types.ts'
import { Layout } from '../components/Layout.tsx'

// 首页组件
const IndexPage: React.FC<{ data: DatabaseSchema }> = ({ data }) => (
  <Layout title="首页" data={data}>
    <div>
      <h2>最新文章</h2>
      <div>
        {_.take(data.posts.filter(post => post.published), 10).map(post => (
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
              {Array.isArray(post.tags) && post.tags.length > 0 && (
                <span> | 标签: {post.tags.join(', ')}</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  </Layout>
)

export default async function handler(_request: Request): Promise<Response> {
  try {
    // 从全局状态获取数据
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    const html = '<!DOCTYPE html>' + renderToString(
      React.createElement(IndexPage, { data })
    )

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  } catch (error) {
    console.error('首页渲染错误:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
