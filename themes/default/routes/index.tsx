// 首页路由
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { DatabaseSchema, POST } from '../../../src/types.ts'
import { Layout } from '../components/Layout.tsx'
import { Metadata } from '../components/macros/metadata.tsx'
import { Description } from '../components/macros/description.tsx'
import { WordCountReadingTime } from '../components/macros/wordCountReadingTime.tsx'

// 首页组件
const IndexPage: React.FC<{ data: DatabaseSchema }> = ({ data }) => {
  // 获取热门文章列表（这里简单地取前几篇文章作为示例）
  const hotArticleList: POST[] = data.posts.slice(0, 5)

  return (
    <Layout title="首页" data={data}>
      <div
        className="transition flex flex-col rounded-[var(--radius-large)] bg-[var(--card-bg)] py-1 md:py-0 md:bg-transparent md:gap-4 mb-4"
      >
        {/* Article */}
        {hotArticleList.map((item) => (
          <div
            key={item.id as string}
            className="card-base flex flex-col-reverse md:flex-col w-full rounded-[var(--radius-large)] overflow-hidden relative onload-animation"
            style={{ animationDelay: 'calc(var(--content-delay) + 0ms)', '--coverWidth': '28%' } as React.CSSProperties}
          >
            <div
              className="pl-6 md:pl-9 pr-6 md:pr-2 pt-6 md:pt-7 pb-6 relative w-full md:w-[calc(100%_-_52px_-_12px)]"
              style={{ '--coverWidth': '28%' } as React.CSSProperties}
            >
              <a
                href={`/archives/${item.url}`}
                className="transition group w-full block font-bold mb-3 text-3xl text-90 hover:text-[var(--primary)] dark:hover:text-[var(--primary)] active:text-[var(--title-active)] dark:active:text-[var(--title-active)] before:w-1 before:h-5 before:rounded-md before:bg-[var(--primary)] before:absolute before:top-[35px] before:left-[18px] before:hidden md:before:block"
                style={{ '--coverWidth': '28%' } as React.CSSProperties}
              >
                {item.title}
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="inline text-[2rem] text-[var(--primary)] md:hidden translate-y-0.5 absolute"
                  data-icon="material-symbols:chevron-right-rounded"
                >
                  <use href="#ai:material-symbols:chevron-right-rounded"></use>
                </svg>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="text-[var(--primary)] text-[2rem] transition hidden md:inline absolute translate-y-0.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
                  data-icon="material-symbols:chevron-right-rounded"
                >
                  <use href="#ai:material-symbols:chevron-right-rounded"></use>
                </svg>
              </a>
              {/* metadata */}
              <Metadata item={item} />

              {/* description */}
              <Description item={item} />

              {/* word count and read time */}
              <WordCountReadingTime item={item} />
            </div>

            <a
              href={`/archives/${item.url}`}
              aria-label={item.title as string}
              className="!hidden md:!flex btn-regular w-[3.25rem] absolute right-3 top-3 bottom-3 rounded-xl bg-[var(--enter-btn-bg)] hover:bg-[var(--enter-btn-bg-hover)] active:bg-[var(--enter-btn-bg-active)] active:scale-95"
              style={{ '--coverWidth': '28%' } as React.CSSProperties}
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="transition text-[var(--primary)] text-4xl mx-auto"
                data-icon="material-symbols:chevron-right-rounded"
              >
                <use href="#ai:material-symbols:chevron-right-rounded"></use>
              </svg>
            </a>
          </div>
        ))}

        {hotArticleList.map((_, index) => (
          index < hotArticleList.length - 1 && (
            <div
              key={`divider-${index}`}
              className="transition border-t-[1px] border-dashed mx-6 border-black/10 dark:border-white/[0.15] last:border-t-0 md:hidden"
              style={{ '--coverWidth': '28%' } as React.CSSProperties}
            ></div>
          )
        ))}
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
      React.createElement(IndexPage, { data })
    )

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  } catch (error) {
    console.error('首页渲染错误:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
