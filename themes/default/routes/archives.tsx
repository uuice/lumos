// 归档页路由
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import _ from 'lodash'
import { DatabaseSchema, POST } from '../../../src/types.ts'
import { Layout } from '../components/Layout.tsx'

// 归档页组件
const ArchivesPage: React.FC<{ data: DatabaseSchema }> = ({ data }) => {
  // 按年份分组文章
  const postsByYear = _.groupBy(
    data.posts.filter(post => post.published),
    post => new Date(post.date || post.created_time).getFullYear()
  )

  // 按年份倒序排列
  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a))

  return (
    <Layout title="归档" data={data}>
      <div>
        <h1>文章归档</h1>
        <div>
          {years.map(year => {
            const posts = postsByYear[year].sort((a: POST, b: POST) =>
              new Date(b.date || b.created_time).getTime() - new Date(a.date || a.created_time).getTime()
            )

            return (
              <div key={year}>
                <h2>{year}年 ({posts.length}篇)</h2>
                <div>
                  {posts.map(post => (
                    <article key={post.id}>
                      <div>
                        <span>{new Date(post.date || post.created_time).toLocaleDateString()}</span>
                        <a href={`/archives${post.url?.replace('/post', '') || `/${post.alias}`}`}>{post.title}</a>
                      </div>
                      {post.excerpt && <p>{post.excerpt}</p>}
                    </article>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default async function handler(_request: Request): Promise<Response> {
  try {
    // 从全局状态获取数据
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    const html = '<!DOCTYPE html>' + renderToString(
      React.createElement(ArchivesPage, { data })
    )

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  } catch (error) {
    console.error('归档页渲染错误:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
