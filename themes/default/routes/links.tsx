// 友情链接页路由
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { DatabaseSchema } from '../../../src/types.ts'
import { Layout } from '../components/Layout.tsx'

// 友情链接页组件
const LinksPage: React.FC<{ data: DatabaseSchema }> = ({ data }) => {
  // 从数据中获取友情链接，如果没有则使用默认示例
  const links = (data as any).links || [
    {
      id: 1,
      title: "示例链接1",
      url: "https://example1.com",
      description: "这是一个示例友情链接",
      avatar: ""
    },
    {
      id: 2,
      title: "示例链接2",
      url: "https://example2.com",
      description: "这是另一个示例友情链接",
      avatar: ""
    }
  ]

  return (
    <Layout title="友情链接" data={data}>
      <div>
        <h1>友情链接</h1>
        <p>以下是我的朋友们的站点，欢迎访问交流！</p>

        <div className="links-grid">
          {links.map((link: any) => (
            <div key={link.id} className="link-card">
              {link.avatar && (
                <img src={link.avatar} alt={link.title} className="link-avatar" />
              )}
              <div className="link-info">
                <h3>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                </h3>
                {link.description && <p>{link.description}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="apply-link">
          <h2>申请友链</h2>
          <p>如果您想和我交换友情链接，请联系我并提供以下信息：</p>
          <ul>
            <li>网站名称</li>
            <li>网站地址</li>
            <li>网站描述</li>
            <li>网站图标/头像</li>
          </ul>
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
      React.createElement(LinksPage, { data })
    )

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  } catch (error) {
    console.error('友情链接页渲染错误:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
