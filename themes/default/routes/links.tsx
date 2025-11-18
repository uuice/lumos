// 友情链接页路由
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { DatabaseSchema } from '../../../src/types.ts'
import { LumosContext } from '../../../src/context.ts'
import { Layout } from '../components/Layout.tsx'

// 定义链接类型
interface LinkItem {
  title: string
  icon?: string
  url: string
  type?: string
  des?: string
  method?: string
  logo?: string
  site_name?: string
}

// 友情链接页组件
const LinksPage: React.FC<{ data: DatabaseSchema }> = ({ data }) => {
  // 从 data 中获取 linkJsonConfig
  const linkJsonConfig = (data as any).linkJsonConfig as LinkItem[] || []

  // 按 type 分组链接
  const groupedLinks: Record<string, LinkItem[]> = {}

  // 如果有链接数据，按 type 分组
  if (linkJsonConfig && linkJsonConfig.length > 0) {
    linkJsonConfig.forEach(link => {
      const type = link.type || '默认分类'
      if (!groupedLinks[type]) {
        groupedLinks[type] = []
      }
      // 确保链接有 site_name 字段
      const linkWithSiteName = {
        ...link,
        site_name: link.site_name || link.title
      }
      groupedLinks[type].push(linkWithSiteName)
    })
  }

  return (
    <Layout title="友情链接" data={data}>
      <div className="space-y-8">
        {/* 页面标题 */}
        <div
          className="bg-[var(--card-bg)] rounded-[var(--radius-large)] shadow-lg border border-[var(--line-divider)] p-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div>
              <h1
                className="text-3xl font-bold text-neutral-700 hover:text-[var(--primary)] dark:text-neutral-300 dark:hover:text-[var(--primary)]"
              >
                友情链接
              </h1>
              <p className="text-[var(--btn-content)] mt-1">这里是一些值得推荐的网站和博客</p>
            </div>
          </div>
        </div>

        {Object.keys(groupedLinks).length > 0 ? (
          // 按分类显示友情链接
          Object.entries(groupedLinks).map(([categoryName, categoryLinks]) => (
            <div
              key={categoryName}
              className="bg-[var(--card-bg)] rounded-[var(--radius-large)] shadow-lg border border-[var(--line-divider)] p-6"
            >
              <div className="flex items-center mb-6">
                <div
                  className="w-8 h-8 bg-[var(--primary)]/20 rounded-full flex items-center justify-center mr-3"
                >
                  <svg
                    className="w-4 h-4 text-[var(--primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    ></path>
                  </svg>
                </div>
                <h2
                  className="text-xl font-semibold text-neutral-700 hover:text-[var(--primary)] dark:text-neutral-300 dark:hover:text-[var(--primary)]"
                >
                  {categoryName}
                </h2>
                <span
                  className="ml-2 text-sm text-[var(--meta-divider)] bg-[var(--btn-regular-bg)] px-2 py-1 rounded-full text-neutral-700 hover:text-[var(--primary)] dark:text-neutral-300 dark:hover:text-[var(--primary)]"
                >
                  {categoryLinks.length}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryLinks.map((link, index) => (
                  <div
                    key={index}
                    className="bg-[var(--btn-regular-bg)] rounded-lg border border-[var(--line-divider)] p-4 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-center mb-3">
                      {link.logo ? (
                        <img
                          src={link.logo}
                          alt={link.site_name}
                          className="w-10 h-10 rounded-lg mr-3 object-cover border border-[var(--line-divider)]"
                        />
                      ) : (
                        <div
                          className="w-10 h-10 bg-[var(--primary)]/20 rounded-lg mr-3 flex items-center justify-center border border-[var(--line-divider)]"
                        >
                          <span className="text-[var(--primary)] font-bold text-sm">
                            {link.site_name?.[0] || link.title?.[0] || 'L'}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-base font-medium text-neutral-700 hover:text-[var(--primary)] dark:text-neutral-300 dark:hover:text-[var(--primary)] group-hover:text-[var(--primary)] transition-colors truncate"
                          title={link.site_name || link.title}
                        >
                          {link.site_name || link.title}
                        </h3>
                      </div>
                    </div>

                    {link.des && (
                      <p className="text-[var(--btn-content)] text-xs mb-3 line-clamp-2">{link.des}</p>
                    )}

                    <div className="flex justify-between items-center">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-3 py-1.5 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary-hover)] transition-colors text-xs font-medium"
                      >
                        <span>访问</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          ></path>
                        </svg>
                      </a>
                      {link.method && (
                        <span
                          className="text-xs text-[var(--meta-divider)] bg-[var(--card-bg)] px-2 py-1 rounded text-center"
                        >
                          {link.method}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          // 没有任何链接时显示
          <div
            className="bg-[var(--card-bg)] rounded-[var(--radius-large)] shadow-lg border border-[var(--line-divider)] p-12 text-center"
          >
            <div
              className="w-16 h-16 bg-[var(--primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                className="w-8 h-8 text-[var(--primary)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[var(--deep-text)] mb-2">暂无友情链接</h3>
            <p className="text-[var(--btn-content)]">目前还没有添加友情链接，敬请期待...</p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default async function handler(ctx: LumosContext): Promise<void> {
  try {
    // 从全局状态获取数据
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      ctx.text('Server not initialized', 500)
      return
    }

    const html = '<!DOCTYPE html>' + renderToString(
      React.createElement(LinksPage, { data })
    )

    ctx.html(html)
  } catch (error) {
    console.error('友情链接页渲染错误:', error)
    ctx.text('Internal Server Error', 500)
  }
}
