// 错误页面路由
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { DatabaseSchema } from '../types.ts'
import { Layout } from '../components/Layout.tsx'

// 错误页面组件
const ErrorPage: React.FC<{
  data: DatabaseSchema
  error?: string
  statusCode?: number
}> = ({ data, error = '服务器内部错误', statusCode = 500 }) => (
  <Layout title={`服务器错误 - ${statusCode}`} data={data}>
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
      <div className="max-w-md mx-auto">
        <div className="text-9xl font-bold text-red-500 mb-4">{statusCode}</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          服务器错误
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {error || '抱歉，服务器遇到了一个意外错误，请稍后再试。'}
        </p>
        <div className="space-y-4">
          <div>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors mr-4"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              刷新页面
            </button>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              返回首页
            </a>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-8">
            <p>如果问题持续存在，请联系管理员</p>
            <p className="mt-2">错误时间: {new Date().toLocaleString('zh-CN')}</p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default async function handler(request: Request, params?: { error?: string, statusCode?: number }): Promise<Response> {
  try {
    // 从全局状态获取数据
    let data: DatabaseSchema | null = null
    try {
      data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    } catch (err) {
      console.error('无法获取数据:', err)
    }

    // 如果数据不可用，使用最小化数据结构
    const fallbackData: DatabaseSchema = {
      posts: [],
      pages: [],
      authors: [],
      categories: [],
      tags: []
    }

    const finalData = data || fallbackData
    const error = params?.error || '服务器遇到了意外错误'
    const statusCode = params?.statusCode || 500

    const html = '<!DOCTYPE html>' + renderToString(
      React.createElement(ErrorPage, { data: finalData, error, statusCode })
    )

    return new Response(html, {
      status: statusCode,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  } catch (renderError) {
    console.error('错误页面渲染失败:', renderError)

    // 最简化的错误页面，纯HTML
    const fallbackHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>服务器错误</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
    .container { max-width: 600px; margin: 50px auto; text-align: center; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .error-code { font-size: 72px; font-weight: bold; color: #dc3545; margin-bottom: 20px; }
    .error-title { font-size: 24px; margin-bottom: 15px; color: #333; }
    .error-message { color: #666; margin-bottom: 30px; }
    .btn { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 0 10px; }
    .btn:hover { background: #0056b3; }
  </style>
</head>
<body>
  <div class="container">
    <div class="error-code">500</div>
    <h1 class="error-title">服务器错误</h1>
    <p class="error-message">抱歉，服务器遇到了一个意外错误。</p>
    <a href="/" class="btn">返回首页</a>
    <a href="javascript:window.location.reload()" class="btn">刷新页面</a>
  </div>
</body>
</html>`

    return new Response(fallbackHtml, {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  }
}
