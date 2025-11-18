// 关于页路由
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { DatabaseSchema, PAGE } from '../../../src/types.ts'
import { LumosContext } from '../../../src/context.ts'
import { Layout } from '../components/Layout.tsx'
import { WordCountReadingTime } from '../components/macros/wordCountReadingTime.tsx'
import { Metadata } from '../components/macros/metadata.tsx'

// 关于页组件
const AboutPage: React.FC<{ data: DatabaseSchema }> = ({ data }) => {
  const page = data.pages.find((page) => page.alias === 'about') as PAGE

  if (!page) {
    return (
      <Layout title="关于" data={data}>
        <div className="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32">
          <div className="card-base z-10 px-9 py-6 relative w-full">
            <h1>页面未找到</h1>
            <p>关于页面不存在</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="关于" data={data} toc={page.toc}>
      <div className="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32">
        <div className="card-base z-10 px-9 py-6 relative w-full">
          {/* word count and reading time */}
          <WordCountReadingTime item={page} />

          {/* title */}
          <div className="relative onload-animation">
            <div
              className="transition w-full block font-bold mb-3 text-3xl md:text-[2.25rem]/[2.75rem] text-black/90 dark:text-white/90 md:before:w-1 before:h-5 before:rounded-md before:bg-[var(--primary)] before:absolute before:top-[0.75rem] before:left-[-1.125rem]"
            >
              {page.title}
            </div>
          </div>

          {/* metadata */}
          <div className="onload-animation">
            <Metadata item={page} />
            <div className="border-[var(--line-divider)] border-dashed border-b-[1px] mb-5"></div>
          </div>

          {/* content */}
          <div className="prose dark:prose-invert prose-base !max-w-none custom-md mt-2">
            <section>
              <section dangerouslySetInnerHTML={{ __html: page.content }} />
            </section>
          </div>

          <div
            className="relative transition overflow-hidden bg-[var(--license-block-bg)] py-5 px-6 mb-6 rounded-xl license-container onload-animation"
          >
            <div className="transition font-bold text-black/75 dark:text-white/75"></div>
            <a href="/about" className="link text-[var(--primary)]">
              {(data as any).settingJsonConfig?.siteSetting?.baseUrl || 'http://localhost:3000'}/about
            </a>
            <div className="flex gap-6 mt-2">
              <div>
                <div className="transition text-black/30 dark:text-white/30 text-sm">Author</div>
                <div className="transition text-black/75 dark:text-white/75 line-clamp-2">
                  {data.authors.find(author => author.isDefault)?.title || 'Unknown'}
                </div>
              </div>
              <div>
                <div className="transition text-black/30 dark:text-white/30 text-sm">Published at</div>
                <div className="transition text-black/75 dark:text-white/75 line-clamp-2">
                  {new Date(page.created_time).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="transition text-black/30 dark:text-white/30 text-sm">License</div>
                <a
                  href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                  target="_blank"
                  rel="noreferrer"
                  className="link text-[var(--primary)] line-clamp-2"
                >
                  CC BY-NC-SA 4.0
                </a>
              </div>
            </div>
            <svg
              width="0.97em"
              height="1em"
              className="transition text-[15rem] absolute pointer-events-none right-6 top-1/2 -translate-y-1/2 text-black/5 dark:text-white/5"
              data-icon="fa6-brands:creative-commons"
            >
              <symbol id="ai:fa6-brands:creative-commons" viewBox="0 0 496 512">
                <path
                  fill="currentColor"
                  d="m245.83 214.87l-33.22 17.28c-9.43-19.58-25.24-19.93-27.46-19.93c-22.13 0-33.22 14.61-33.22 43.84c0 23.57 9.21 43.84 33.22 43.84c14.47 0 24.65-7.09 30.57-21.26l30.55 15.5c-6.17 11.51-25.69 38.98-65.1 38.98c-22.6 0-73.96-10.32-73.96-77.05c0-58.69 43-77.06 72.63-77.06c30.72-.01 52.7 11.95 65.99 35.86m143.05 0l-32.78 17.28c-9.5-19.77-25.72-19.93-27.9-19.93c-22.14 0-33.22 14.61-33.22 43.84c0 23.55 9.23 43.84 33.22 43.84c14.45 0 24.65-7.09 30.54-21.26l31 15.5c-2.1 3.75-21.39 38.98-65.09 38.98c-22.69 0-73.96-9.87-73.96-77.05c0-58.67 42.97-77.06 72.63-77.06c30.71-.01 52.58 11.95 65.56 35.86M247.56 8.05C104.74 8.05 0 123.11 0 256.05c0 138.49 113.6 248 247.56 248c129.93 0 248.44-100.87 248.44-248c0-137.87-106.62-248-248.44-248m.87 450.81c-112.54 0-203.7-93.04-203.7-202.81c0-105.42 85.43-203.27 203.72-203.27c112.53 0 202.82 89.46 202.82 203.26c-.01 121.69-99.68 202.82-202.84 202.82"
                ></path>
              </symbol>
              <use href="#ai:fa6-brands:creative-commons"></use>
            </svg>
          </div>
        </div>
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
      React.createElement(AboutPage, { data })
    )

    ctx.html(html)
  } catch (error) {
    console.error('关于页渲染错误:', error)
    ctx.text('Internal Server Error', 500)
  }
}
