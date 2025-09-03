// 关于页路由
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { DatabaseSchema } from '../../../src/types.ts'
import { Layout } from '../components/Layout.tsx'

// 关于页组件
const AboutPage: React.FC<{ data: DatabaseSchema }> = ({ data }) => {
  // 从数据中获取关于信息，如果没有则使用默认内容
  const aboutInfo = (data as any).about || {
    title: "关于我",
    content: `
      <h2>欢迎来到我的博客</h2>
      <p>这里是我分享技术、思考和生活的地方。</p>

      <h3>关于站点</h3>
      <p>本站使用 Lumos 静态博客生成器构建，采用现代化的技术栈。</p>

      <h3>联系我</h3>
      <p>如果您有任何问题或建议，欢迎通过以下方式联系我：</p>
      <ul>
        <li>邮箱: example@email.com</li>
        <li>GitHub: https://github.com/username</li>
      </ul>
    `
  }

  return (
    <Layout title="关于" data={data}>
      <div>
        <h1>{aboutInfo.title || "关于"}</h1>
        <div dangerouslySetInnerHTML={{ __html: aboutInfo.content }} />
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
      React.createElement(AboutPage, { data })
    )

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  } catch (error) {
    console.error('关于页渲染错误:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
