// 404 页面路由
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { DatabaseSchema } from '../../../src/types.ts'
import { LumosContext } from '../../../src/context.ts'
import { Layout } from '../components/Layout.tsx'

// 404 页面组件
const NotFoundPage: React.FC<{ data: DatabaseSchema }> = ({ data }) => (
  <Layout title="页面未找到" data={data}>
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center pt-20">
      <div className="max-w-md mx-auto">
        <div className="text-9xl font-bold text-[var(--primary)] mb-4">404</div>
        <h1 className="text-2xl font-bold text-black/90 dark:text-white/90 mb-4">
          页面未找到
        </h1>
        <p className="text-black/60 dark:text-white/60 mb-8">
          抱歉，您访问的页面不存在或已被移动。
        </p>
        <div className="space-y-4">
          <div>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-[var(--btn-regular-bg)] text-[var(--btn-content)] rounded-[var(--radius-large)] hover:bg-[var(--btn-regular-bg-hover)] transition-colors border border-[var(--line-divider)]"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              返回首页
            </a>
          </div>
          <div className="text-sm">
            <span className="text-black/50 dark:text-white/50">或者尝试以下链接：</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="/archives" className="text-[var(--primary)] hover:underline">
              文章归档
            </a>
            <a href="/categories" className="text-[var(--primary)] hover:underline">
              分类目录
            </a>
            <a href="/tags" className="text-[var(--primary)] hover:underline">
              标签云
            </a>
            <a href="/about" className="text-[var(--primary)] hover:underline">
              关于我们
            </a>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default async function handler(ctx: LumosContext): Promise<void> {
  try {
    // 从全局状态获取数据
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      ctx.text('Server not initialized', 500)
      return
    }

    const html = '<!DOCTYPE html>' + renderToString(
      React.createElement(NotFoundPage, { data })
    )

    ctx.setStatus(404)
    ctx.html(html)
  } catch (error) {
    console.error('404页面渲染错误:', error)
    ctx.text('Internal Server Error', 500)
  }
}
