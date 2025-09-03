import * as React from 'react'
import { DatabaseSchema } from '../types.ts'

// 基础布局组件
export const Layout: React.FC<{
  title: string
  children: React.ReactNode
  data: DatabaseSchema
  description?: string
  keywords?: string
  baseUrl?: string
}> = ({
  title,
  children,
  data,
  description = 'Lumos 静态博客生成器',
  keywords = '博客,静态博客,Lumos',
  baseUrl = ''
}) => {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />

        {/* 预连接到字体服务 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

        {/* CSS 样式 */}
        <link rel="stylesheet" href={`${baseUrl}/assets/styles/style.css`} />

        {/* 主题初始化脚本 */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const theme = localStorage.getItem('theme') || 'auto';
              const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
              if (isDark) document.documentElement.classList.add('dark');
            })()
          `
        }} />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* 导航栏 */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <a href="/" className="text-2xl font-bold text-gradient">
                  Lumos
                </a>
              </div>

              {/* 导航菜单 */}
              <nav className="hidden md:flex space-x-8">
                <a href="/" className="nav-link">首页</a>
                <a href="/posts" className="nav-link">文章</a>
                <a href="/pages" className="nav-link">页面</a>
                <a href="/categories" className="nav-link">分类</a>
                <a href="/tags" className="nav-link">标签</a>
              </nav>

              {/* 右侧工具栏 */}
              <div className="flex items-center space-x-4">
                {/* 搜索框 */}
                <div className="relative hidden sm:block">
                  <input
                    type="text"
                    id="search-input"
                    placeholder="搜索文章..."
                    className="w-64 px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div id="search-results" className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg hidden max-h-96 overflow-y-auto"></div>
                </div>

                {/* 主题切换按钮 */}
                <button
                  id="theme-toggle"
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="切换主题"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </button>

                {/* 移动端菜单按钮 */}
                <button className="md:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* 主要内容区域 */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* 页脚 */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* 站点信息 */}
              <div className="col-span-1 md:col-span-2">
                <div className="text-xl font-bold text-gradient mb-4">Lumos</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  基于 Bun 的高性能静态博客生成器，专为低配置服务器优化，提供轻量级博客解决方案。
                </p>
              </div>

              {/* 快速导航 */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">快速导航</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">首页</a></li>
                  <li><a href="/posts" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">文章</a></li>
                  <li><a href="/categories" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">分类</a></li>
                  <li><a href="/tags" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">标签</a></li>
                </ul>
              </div>

              {/* 统计信息 */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">统计信息</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>文章: {data.posts?.length || 0} 篇</li>
                  <li>页面: {data.pages?.length || 0} 个</li>
                  <li>分类: {data.categories?.length || 0} 个</li>
                  <li>标签: {data.tags?.length || 0} 个</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>&copy; 2024 Powered by <a href="https://github.com/your-username/lumos" className="text-blue-600 dark:text-blue-400 hover:underline">Lumos</a></p>
            </div>
          </div>
        </footer>

        {/* JavaScript */}
        <script src={`${baseUrl}/assets/javascript/jquery-3.7.1.min.js`} defer></script>
        <script src={`${baseUrl}/assets/javascript/highlight.min.js`} defer></script>
      </body>
    </html>
  )
}
