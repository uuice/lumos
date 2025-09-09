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
    <div className="card-base px-8 py-6">
      <div>
        <div className="w-full flex items-center gap-2 mb-3 transition text-3xl font-extrabold text-75 tracking-tight">
          <span className="text-[var(--primary)]"></span>
          <span className="px-3 py-1 rounded-lg bg-[var(--btn-regular-bg)] text-[var(--btn-content)]">
            {categoryName}
          </span>
        </div>
        <div className="flex flex-row w-full items-center h-[3.75rem]">
          <div className="w-[15%] md:w-[10%] transition text-2xl font-bold text-right text-75">@</div>
          <div className="w-[15%] md:w-[10%]">
            <div className="h-3 w-3 bg-none rounded-full outline outline-[var(--primary)] mx-auto -outline-offset-[2px] z-50 outline-3"></div>
          </div>
          <div className="w-[70%] md:w-[80%] transition text-left text-50">
            {posts.length} posts
          </div>
        </div>

        {posts.length > 0 ? (
          posts.map((article) => (
            <a
              key={article.url}
              className="group btn-plain !block h-10 w-full rounded-lg hover:text-[initial]"
              href={`/archives/${article.url}`}
              aria-label={article.title}
            >
              <div className="flex flex-row justify-start items-center h-full">
                <div className="w-[15%] md:w-[10%] transition text-sm text-right text-50">
                  {new Date(article.date || article.created_time).toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })}
                </div>
                <div className="w-[15%] md:w-[10%] relative dash-line h-full flex items-center">
                  <div className="transition-all mx-auto w-1 h-1 rounded group-hover:h-5 bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-[var(--primary)] outline outline-4 z-50 outline-[var(--card-bg)] group-hover:outline-[var(--btn-plain-bg-hover)] group-active:outline-[var(--btn-plain-bg-active)]"></div>
                </div>
                <div className="w-[70%] md:max-w-[65%] md:w-[65%] text-left font-bold group-hover:translate-x-1 transition-all group-hover:text-[var(--primary)] text-75 pr-8 whitespace-nowrap overflow-ellipsis overflow-hidden">
                  {article.title}
                </div>
                <div className="hidden md:block md:w-[15%] text-left text-sm transition whitespace-nowrap overflow-ellipsis overflow-hidden text-30">
                  {Array.isArray(article.tags) && article.tags.map((tagName, index) => (
                    <span key={index}>#{tagName} </span>
                  ))}
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="text-50 mt-4">暂无文章</div>
        )}
      </div>
    </div>
  </Layout>
)

export default async function handler(request: Request, params: { url: string }): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    const url = decodeURIComponent(params.url)

    // 查找分类 - 支持按 alias 或 title 查找
    const category = data.categories?.find(cat => cat.url === url)

    const categoryName = category?.title || ''
    console.log(category)

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
