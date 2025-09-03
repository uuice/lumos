import * as React from 'react'
import { DatabaseSchema, CATEGORY, TAG } from '../../../src/types.ts'
// 导入所有需要的组件
import { Head } from './head'
import { Sidebar } from './sidebar'
import { Footer } from './footer'
import { ParticleEffect } from './particle-effect'
import { ScrollToTop } from './scroll-to-top'
import { TOC } from './toc'

// 定义 Sidebar 所需的数据类型
interface SidebarCategory {
  alias: string
  title: string
  article_count: number
}

interface SidebarTag {
  value: string
  title: string
}

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
  baseUrl = ''
}) => {
  // 获取站点配置
  const siteConfig: any = data.siteConfig || {};

  // 准备侧边栏数据
  const categories: SidebarCategory[] = (data.categories || []).map((category: CATEGORY) => ({
    alias: category.url,
    title: category.title,
    article_count: (category as any).postNum || 0
  }));

  const tags: SidebarTag[] = (data.tags || []).map((tag: TAG) => ({
    value: tag.url,
    title: tag.title
  }));

  return (
    <html lang="en" className="bg-[var(--page-bg)] transition text-[14px] md:text-[16px]">
      <head>
        <title>{siteConfig.siteName || title}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="author" content="uuice" />
        <meta property="og:site_name" content={siteConfig.siteName || title} />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:title" content={siteConfig.siteName || title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={baseUrl} />
        <meta name="twitter:title" content={siteConfig.siteName || title} />
        <meta name="twitter:description" content={description} />
        <meta name="viewport" content="width=device-width" />
        <link
          rel="icon"
          href="/assets/favicon/favicon-light-32.png"
          sizes="32x32"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/assets/favicon/favicon-light-128.png"
          sizes="128x128"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/assets/favicon/favicon-light-180.png"
          sizes="180x180"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/assets/favicon/favicon-light-192.png"
          sizes="192x192"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/assets/favicon/favicon-dark-32.png"
          sizes="32x32"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          href="/assets/favicon/favicon-dark-128.png"
          sizes="128x128"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          href="/assets/favicon/favicon-dark-180.png"
          sizes="180x180"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          href="/assets/favicon/favicon-dark-192.png"
          sizes="192x192"
          media="(prefers-color-scheme: dark)"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var theme = localStorage.getItem('theme') || 'auto'
                switch (theme) {
                  case 'light':
                    document.documentElement.classList.remove('dark')
                    break
                  case 'dark':
                    document.documentElement.classList.add('dark')
                    break
                  case 'auto':
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      document.documentElement.classList.add('dark')
                    } else {
                      document.documentElement.classList.remove('dark')
                    }
                }
                var hue = localStorage.getItem('hue') || 280
                document.documentElement.style.setProperty('--hue', hue)
              })()
            `
          }}
        />
        <script src="/assets/javascript/jquery-3.7.1.min.js"></script>

        {/* pjax 支持 */}
        <script src="/assets/javascript/jquery.pjax.js"></script>

        <link
          rel="alternate"
          type="application/rss+xml"
          title={siteConfig.siteName || title}
          href={`${baseUrl}/rss.xml`}
        />
        <link rel="stylesheet" href="/assets/styles/style.css" />
      </head>
      <body className="min-h-screen transition lg:is-home enable-banner">
        {/* 粒子效果组件 */}
        <ParticleEffect />
        <div
          id="top-row"
          className="z-50 pointer-events-none transition-all duration-700 max-w-[var(--page-width)] px-0 md:px-4 mx-auto sticky top-0"
        >
          <div id="navbar-wrapper" className="pointer-events-auto sticky top-0 transition-all">
            {/* 头部组件 */}
            <Head siteConfig={siteConfig} />
          </div>
        </div>

        <div
          id="banner-wrapper"
          className="absolute z-10 w-full transition duration-700 overflow-hidden"
          style={{ top: 0, height: '35vh' }}
        >
          <div
            id="banner"
            className="object-cover h-full transition duration-700 opacity-100 scale-100 overflow-hidden relative"
          >
            <div
              className="transition absolute inset-0 dark:bg-black/10 bg-opacity-50 pointer-events-none"
            ></div>
            <img
              src="/assets/images/demo-banner.png"
              alt="Banner image of the blog"
              style={{ objectPosition: 'center' }}
              width="1344"
              height="896"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute w-full z-30 pointer-events-none" style={{ top: 'calc(35vh - 3.5rem)' }}>
          {/* The pointer-events-none here prevent blocking the click event of the TOC */}
          <div className="relative max-w-[var(--page-width)] mx-auto pointer-events-auto">
            <div
              id="main-grid"
              className="transition duration-700 w-full left-0 right-0 grid grid-cols-[17.5rem_auto] grid-rows-[auto_1fr_auto] lg:grid-rows-[auto] mx-auto gap-4 px-0 md:px-4"
            >
              {/* Banner image credit */}
              <a
                href=""
                id="banner-credit"
                target="_blank"
                rel="noopener"
                aria-label="Visit image source"
                className="group onload-animation transition-all absolute flex justify-center items-center rounded-full px-3 right-4 -top-[3.25rem] bg-black/60 hover:bg-black/70 h-9 hover:pr-9 active:bg-black/80"
              >
                <svg
                  width="1em"
                  height="1em"
                  className="text-white/75 text-[1.25rem] mr-1"
                  data-icon="material-symbols:copyright-outline-rounded"
                >
                  <symbol id="ai:material-symbols:copyright-outline-rounded" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m-2-4h4q.425 0 .713-.288T15 15v-1q0-.425-.288-.712T14 13t-.712.288T13 14h-2v-4h2q0 .425.288.713T14 11t.713-.288T15 10V9q0-.425-.288-.712T14 8h-4q-.425 0-.712.288T9 9v6q0 .425.288.713T10 16"
                    />
                  </symbol>
                  <use href="#ai:material-symbols:copyright-outline-rounded"></use>
                </svg>
                <div className="text-white/75 text-xs">幻想变成轻盈的鱼， 畅游在自由的海洋</div>
                <svg
                  width="1em"
                  height="1em"
                  className="transition absolute text-[oklch(0.75_0.14_var(--hue))] right-4 text-[0.75rem] opacity-0 group-hover:opacity-100"
                  data-icon="fa6-solid:arrow-up-right-from-square"
                >
                  <symbol id="ai:fa6-solid:arrow-up-right-from-square" viewBox="0 0 512 512">
                    <path
                      fill="currentColor"
                      d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32zM80 32C35.8 32 0 67.8 0 112v320c0 44.2 35.8 80 80 80h320c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v112c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16h112c17.7 0 32-14.3 32-32s-14.3-32-32-32z"
                    />
                  </symbol>
                  <use href="#ai:fa6-solid:arrow-up-right-from-square"></use>
                </svg>
              </a>

              {/* 侧边栏组件 */}
              <Sidebar categories={categories} tags={tags} />

              <main
                id="swup-container"
                className="transition-swup-fade col-span-2 lg:col-span-1 overflow-hidden"
              >
                <div id="content-wrapper" className="onload-animation">
                  {children}
                </div>
              </main>

              {/* 底部组件 */}
              <Footer
                currentYear={new Date().getFullYear()}
                siteConfig={siteConfig}
                recordSettings={data.recordSettings as any}
              />
            </div>

            {/* 滚动到顶部组件 */}
            <ScrollToTop />
          </div>
        </div>

        <div className="absolute w-full z-0 hidden 2xl:block">
          <div className="relative max-w-[var(--page-width)] mx-auto">
            {/* TOC component */}
            <div
              id="toc-wrapper"
              className="hidden lg:block transition absolute top-0 -right-[var(--toc-width)] w-[var(--toc-width)] items-center"
            >
              <div
                id="toc-inner-wrapper"
                className="fixed top-14 w-[var(--toc-width)] h-[calc(100vh_-_20rem)] overflow-y-scroll overflow-x-hidden hide-scrollbar"
              >
                <div id="toc" className="w-full h-full transition-swup-fade">
                  <div className="h-8 w-full"></div>
                  {/* TOC 组件 */}
                  <TOC />
                  <div className="h-8 w-full"></div>
                </div>
              </div>
            </div>

            <script
              dangerouslySetInnerHTML={{
                __html: `
                  document.addEventListener('DOMContentLoaded', function () {
                    'use strict'

                    // TOC show/hide logic based on banner height
                    const toc = document.getElementById('toc-wrapper')
                    let bannerHeight = window.innerHeight * 0.35 // 35vh banner height

                    function toggleTOC() {
                      if (
                        document.body.scrollTop > bannerHeight ||
                        document.documentElement.scrollTop > bannerHeight
                      ) {
                        toc.classList.remove('toc-hide')
                      } else {
                        toc.classList.add('toc-hide')
                      }
                    }

                    // Initial check
                    toggleTOC()

                    // Add scroll listener
                    window.addEventListener('scroll', toggleTOC)

                    // Also check on resize
                    window.addEventListener('resize', function () {
                      // Update banner height on resize
                      const newBannerHeight = window.innerHeight * 0.35
                      bannerHeight = newBannerHeight
                      toggleTOC()
                    })
                  })
                `
              }}
            />
          </div>
        </div>

        {/* increase the page height during page transition to prevent the scrolling animation from jumping */}
        <div
          id="page-height-extend"
          className="hidden h-[300vh]"
          style={{
            // @ts-ignore
            '--bannerOffset': '15vh',
            '--banner-height-home': '65vh',
            '--banner-height': '35vh',
            '--configHue': '280',
            '--page-width': '75rem'
          } as React.CSSProperties}
        ></div>

        <script src="/assets/javascript/highlight.min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function () {
                if (window.hljs) hljs.highlightAll()
              })
            `
          }}
        />

        {/* pjax 初始化脚本 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function () {
                // 只对所有 a 标签启用 pjax，排除外部链接和带 target 的链接
                if (window.jQuery) {
                  $(document).pjax(
                    'a:not([target="_blank"]):not([href^="#"]):not([href^="http"]):not([download])',
                    '#swup-container',
                    {
                      fragment: '#swup-container',
                      timeout: 8000
                    }
                  )

                  // pjax 完成后重新高亮代码
                  $(document).on('pjax:end', function () {
                    if (window.hljs) hljs.highlightAll()
                  })
                }
              })
            `
          }}
        />
      </body>
    </html>
  )
}
