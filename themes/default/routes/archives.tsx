// 归档页路由
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import _ from 'lodash'
import { DatabaseSchema, POST } from '../../../src/types.ts'
import { LumosContext } from '../../../src/context.ts'
import { Layout } from '../components/Layout.tsx'
import dayjs from 'dayjs'

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
      <div className="card-base px-8 py-6">
        {years.map(year => {
          const posts = postsByYear[year].sort((a: POST, b: POST) =>
            new Date(b.date || b.created_time).getTime() - new Date(a.date || a.created_time).getTime()
          )

          return (
            <div key={year}>
              <div className="flex flex-row w-full items-center h-[3.75rem]">
                <div className="w-[15%] md:w-[10%] transition text-2xl font-bold text-right text-75">
                  {year}
                </div>
                <div className="w-[15%] md:w-[10%]">
                  <div
                    className="h-3 w-3 bg-none rounded-full outline outline-[var(--primary)] mx-auto -outline-offset-[2px] z-50 outline-3"
                  ></div>
                </div>
                <div className="w-[70%] md:w-[80%] transition text-left text-50">
                  {posts.length} posts
                </div>
              </div>

              {posts.map(item => (
                <a
                  key={item.id}
                  className="group btn-plain !block h-10 w-full rounded-lg hover:text-[initial]"
                  href={`/archives/${item.url}`}
                  aria-label={item.title}
                >
                  <div className="flex flex-row justify-start items-center h-full">
                    <div className="w-[15%] md:w-[10%] transition text-sm text-right text-50">
                      {dayjs(item.date || item.created_time).format('MM-DD')}
                    </div>
                    <div className="w-[15%] md:w-[10%] relative dash-line h-full flex items-center">
                      <div
                        className="transition-all mx-auto w-1 h-1 rounded group-hover:h-5 bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-[var(--primary)] outline outline-4 z-50 outline-[var(--card-bg)] group-hover:outline-[var(--btn-plain-bg-hover)] group-active:outline-[var(--btn-plain-bg-active)]"
                      ></div>
                    </div>
                    <div
                      className="w-[70%] md:max-w-[65%] md:w-[65%] text-left font-bold group-hover:translate-x-1 transition-all group-hover:text-[var(--primary)] text-75 pr-8 whitespace-nowrap overflow-ellipsis overflow-hidden"
                    >
                      {item.title}
                    </div>
                    <div
                      className="hidden md:block md:w-[15%] text-left text-sm transition whitespace-nowrap overflow-ellipsis overflow-hidden text-30"
                    >
                      {Array.isArray(item.tags) && item.tags.map((tag, index) => (
                        <span key={index}>#{tag} </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )
        })}
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
      React.createElement(ArchivesPage, { data })
    )

    ctx.html(html)
  } catch (error) {
    console.error('归档页渲染错误:', error)
    ctx.text('Internal Server Error', 500)
  }
}
