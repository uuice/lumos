import * as React from 'react'
import { DatabaseSchema } from '../types.ts'

// 基础布局组件
export const Layout: React.FC<{
  title: string
  children: React.ReactNode
  data: DatabaseSchema
}> = ({ title, children, data: _data }) => (
  <html lang="zh-CN">
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
      <header>
        <h1>Lumos Blog</h1>
        <nav>
          <a href="/">首页</a>
          <a href="/posts">文章</a>
          <a href="/pages">页面</a>
          <a href="/categories">分类</a>
          <a href="/tags">标签</a>
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>&copy; 2024 Powered by Lumos</p>
      </footer>
    </body>
  </html>
)
