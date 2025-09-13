// 文章详情页路由 - /archives/[url]
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { DatabaseSchema, POST } from '../../../../src/types.ts'
import { Layout } from '../../components/Layout.tsx'
import { WordCountReadingTime } from '../../components/macros/wordCountReadingTime.tsx'
import { Metadata } from '../../components/macros/metadata.tsx'
import dayjs from 'dayjs'

// 文章详情组件
const PostDetailPage: React.FC<{ data: DatabaseSchema, post: POST, previousArticle: POST | null, nextArticle: POST | null }> = ({ data, post, previousArticle, nextArticle }) => (
  <Layout title={post.title} data={data} toc={post.toc}>
    <div className="flex w-full rounded-[var(--radius-large)] overflow-hidden relative mb-4">
      <div id="post-container" className="card-base z-10 px-6 md:px-9 pt-6 pb-4 relative w-full">
        {/* word count and reading time */}
        <WordCountReadingTime item={post} />

        {/* title */}
        <div className="relative onload-animation">
          <div
            className="transition w-full block font-bold mb-3 text-3xl md:text-[2.25rem]/[2.75rem] text-black/90 dark:text-white/90 md:before:w-1 before:h-5 before:rounded-md before:bg-[var(--primary)] before:absolute before:top-[0.75rem] before:left-[-1.125rem]"
          >
            {post.title}
          </div>
        </div>

        {/* metadata */}
        <div className="onload-animation">
          <Metadata item={post} />
          <div className="border-[var(--line-divider)] border-dashed border-b-[1px] mb-5"></div>
        </div>

        {/* always show cover as long as it has one */}
        <div
          className="prose dark:prose-invert prose-base !max-w-none custom-md mb-6 markdown-content onload-animation"
        >
          <section dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div
          className="relative transition overflow-hidden bg-[var(--license-block-bg)] py-5 px-6 mb-6 rounded-xl license-container onload-animation"
        >
          <div className="transition font-bold text-black/75 dark:text-white/75"></div>
          <a href={`/archives/${post.url}`} className="link text-[var(--primary)]">
            {(data as any).settingJsonConfig?.siteSetting?.baseUrl || 'http://localhost:3000'}/archives/{post.url}
          </a>
          <div className="flex gap-6 mt-2">
            <div>
              <div className="transition text-black/30 dark:text-white/30 text-sm">Author</div>
              <div className="transition text-black/75 dark:text-white/75 line-clamp-2">
                {data.authors.find(author => author.id === post.authorIds[0])?.title || 'Unknown'}
              </div>
            </div>
            <div>
              <div className="transition text-black/30 dark:text-white/30 text-sm">Published at</div>
              <div className="transition text-black/75 dark:text-white/75 line-clamp-2">
                {dayjs(post.created_time).format('YYYY-MM-DD')}
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

    <div className="flex flex-col md:flex-row justify-between mb-4 gap-4 overflow-hidden w-full">
      {previousArticle ? (
        <a
          href={`/archives/${previousArticle.url}`}
          className="w-full font-bold overflow-hidden active:scale-95"
        >
          <div
            className="btn-card rounded-2xl w-full h-[3.75rem] max-w-full px-4 flex items-center !justify-start gap-4"
          >
            {/* <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="text-[2rem] text-[var(--primary)]"
              data-icon="material-symbols:chevron-left-rounded"
            >
              <use href="#ai:material-symbols:chevron-left-rounded"></use>
            </svg> */}
            <svg width="1em" height="1em" className="text-[2rem] text-[var(--primary)]" data-icon="material-symbols:chevron-left-rounded">   <symbol id="ai:material-symbols:chevron-left-rounded" viewBox="0 0 24 24"><path fill="currentColor" d="m10.8 12l3.9 3.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7z"></path></symbol><use href="#ai:material-symbols:chevron-left-rounded"></use>  </svg>

            <div
              className="overflow-hidden transition overflow-ellipsis whitespace-nowrap max-w-[calc(100%_-_3rem)] text-black/75 dark:text-white/75"
            >
              {previousArticle.title}
            </div>
          </div>
        </a>
      ) : (
        <div className="w-full font-bold overflow-hidden pointer-events-none">
          <div
            className="btn-card rounded-2xl w-full h-[3.75rem] max-w-full px-4 flex items-center !justify-start gap-4 opacity-50"
          >
            {/* <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="text-[2rem] text-black/30 dark:text-white/30"
              data-icon="material-symbols:chevron-left-rounded"
            >
              <use href="#ai:material-symbols:chevron-left-rounded"></use>
              </svg> */}

              <svg width="1em" height="1em"  className="text-[2rem] text-black/30 dark:text-white/30" data-icon="material-symbols:chevron-left-rounded">   <symbol id="ai:material-symbols:chevron-left-rounded" viewBox="0 0 24 24"><path fill="currentColor" d="m10.8 12l3.9 3.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7z"></path></symbol><use href="#ai:material-symbols:chevron-left-rounded"></use>  </svg>
            <div
              className="overflow-hidden transition overflow-ellipsis whitespace-nowrap max-w-[calc(100%_-_3rem)] text-black/30 dark:text-white/30"
            >
              无上一篇文章
            </div>
          </div>
        </div>
      )}

      {nextArticle ? (
        <a
          href={`/archives/${nextArticle.url}`}
          className="w-full font-bold overflow-hidden active:scale-95"
        >
          <div
            className="btn-card rounded-2xl w-full h-[3.75rem] max-w-full px-4 flex items-center !justify-end gap-4"
          >
            <div
              className="overflow-hidden transition overflow-ellipsis whitespace-nowrap max-w-[calc(100%_-_3rem)] text-black/75 dark:text-white/75"
            >
              {nextArticle.title}
            </div>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="text-[2rem] text-[var(--primary)]"
              data-icon="material-symbols:chevron-right-rounded"
            >
              <use href="#ai:material-symbols:chevron-right-rounded"></use>
            </svg>
          </div>
        </a>
      ) : (
        <div className="w-full font-bold overflow-hidden pointer-events-none">
          <div
            className="btn-card rounded-2xl w-full h-[3.75rem] max-w-full px-4 flex items-center !justify-end gap-4 opacity-50"
          >
            <div
              className="overflow-hidden transition overflow-ellipsis whitespace-nowrap max-w-[calc(100%_-_3rem)] text-black/30 dark:text-white/30"
            >
              无下一篇文章
            </div>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="text-[2rem] text-black/30 dark:text-white/30"
              data-icon="material-symbols:chevron-right-rounded"
            >
              <use href="#ai:material-symbols:chevron-right-rounded"></use>
            </svg>
          </div>
        </div>
      )}
    </div>
  </Layout>
)

export default async function handler(request: Request, params: { url: string }): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    const postUrl = params.url
    // 支持通过 alias 或 url 查找文章
    const postIndex = data.posts.findIndex(p => {
      // 移除 URL 前缀进行匹配
      const cleanUrl = p.url?.replace(/^\/post\//, '') || p.alias
      return (cleanUrl === postUrl || p.alias === postUrl) && p.published
    })

    if (postIndex === -1) {
      // 尝试加载 404 页面
      try {
        const notFoundModule = await import('../404.tsx')
        const notFoundHandler = notFoundModule.default
        if (notFoundHandler) {
          return await notFoundHandler(request)
        }
      } catch (error) {
        console.error('加载 404 页面失败:', error)
      }

      return new Response('Post not found', { status: 404 })
    }

    const post = data.posts[postIndex]

    // 获取上一篇和下一篇文章（按照排序后的顺序）
    // 由于文章已按创建时间降序排列，所以索引较小的是较新的文章
    const previousArticle = postIndex > 0 ? data.posts[postIndex - 1] : null
    const nextArticle = postIndex < data.posts.length - 1 ? data.posts[postIndex + 1] : null

    const html = '<!DOCTYPE html>' + renderToString(
      React.createElement(PostDetailPage, { data, post, previousArticle, nextArticle })
    )

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  } catch (error) {
    console.error('文章详情渲染错误:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
