import * as React from 'react'
import { CATEGORY, DatabaseSchema, POST_CATEGORY, TAG } from '../../../src/types.ts'
// 导入所有需要的组件
import { Head } from './head'
import { Sidebar } from './sidebar'
import { Footer } from './footer'
import { ParticleEffect } from './particle-effect'
import { ScrollToTop } from './scroll-to-top'

// 定义 Sidebar 所需的数据类型
interface SidebarCategory {
  url: string
  title: string
  article_count: number
}

interface SidebarTag {
  url: string
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
  showSidebar?: boolean // 添加这个新属性
  showBanner?: boolean // 添加这个新属性
  toc?: string
}> = ({
  children,
  data,
  showSidebar = true, // 默认显示侧边栏
  showBanner = true, // 默认显示 banner
  toc
}) => {
  // 获取站点配置
  const siteSetting: any = data.settingJsonConfig.siteSetting || {}
  // 获取站点配置
  const recordSettings: any = data.settingJsonConfig.recordSettings || {}
  // 准备侧边栏数据
  const categories: SidebarCategory[] = (data.categories || []).map((category: CATEGORY) => {
    return {
      url: category.url,
      title: category.title,
      article_count: data.postCategories.filter(
        (postCategory: POST_CATEGORY) => postCategory.categoryId === category.id
      ).length
    }
  })

  const tags: SidebarTag[] = (data.tags || []).map((tag: TAG) => ({
    url: tag.url,
    title: tag.title
  }))

  return (
    <html lang="en" className="bg-[var(--page-bg)] transition text-[14px] md:text-[16px]">
      <head>
        <title>{siteSetting.siteName}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={siteSetting.siteDescription || '默认描述'} />
        <meta name="author" content={siteSetting.author || '默认作者'} />
        <meta property="og:site_name" content={siteSetting.siteName} />
        <meta property="og:url" content={siteSetting.baseUrl || ''} />
        <meta property="og:title" content={siteSetting.siteName} />
        <meta property="og:description" content={siteSetting.siteDescription || ''} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteSetting.baseUrl || ''} />
        <meta name="twitter:title" content={siteSetting.siteName} />
        <meta name="twitter:description" content={siteSetting.siteDescription || ''} />
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
        <script src="/assets/javascript/jquery-3.7.1.min.js"></script>

        {/* pjax 支持 */}
        <script src="/assets/javascript/jquery.pjax.js"></script>

        <script src="/assets/javascript/main.js"></script>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={siteSetting.siteName}
          href={`${siteSetting.baseUrl}/rss.xml`}
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
            <Head siteSetting={siteSetting} />
          </div>
        </div>

        {/* Banner 部分 - 根据 showBanner 属性决定是否显示 */}
        {showBanner && (
          <div
            id="banner-wrapper"
            className="absolute z-10 w-full transition duration-700 overflow-hidden"
            style={{ top: 0, height: '35vh' }}
          >
            <div
              id="banner"
              className="object-cover h-full transition duration-700 opacity-100 scale-100 overflow-hidden relative"
            >
              <div className="transition absolute inset-0 dark:bg-black/10 bg-opacity-50 pointer-events-none"></div>
              {/* 使用 picture 元素支持 WebP 格式 */}
              <picture>
                <source
                  srcSet="/assets/images-webp/demo-banner.webp"
                  type="image/webp"
                />
                <img
                  src="/assets/images/demo-banner.jpg"
                  alt="Banner of the blog"
                  style={{ objectPosition: 'center' }}
                  width="1344"
                  height="896"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
          </div>
        )}

        {/* 将主内容区域和TOC区域包装在一个共同的容器中，以便PJAX可以同时更新它们 */}
        <div id="pjax-container">
          <div
            className={`absolute w-full z-30 pointer-events-none ${showBanner ? '' : 'pt-0'}`}
            style={{ top: showBanner ? 'calc(35vh - 3.5rem)' : '0' }}
          >
            {/* The pointer-events-none here prevent blocking the click event of the TOC */}
            <div className="relative max-w-[var(--page-width)] mx-auto pointer-events-auto">
              <div
                id="main-grid"
                className="transition duration-700 w-full left-0 right-0 grid grid-cols-[17.5rem_auto] grid-rows-[auto_1fr_auto] lg:grid-rows-[auto] mx-auto gap-4 px-0 md:px-4"
              >
                {/* Banner image credit - 根据 showBanner 属性决定是否显示 */}
                {showBanner && (
                  <button
                    id="banner-credit"
                    aria-label="Visit image source"
                    className="group onload-animation transition-all absolute flex justify-center items-center rounded-full px-3 right-4 -top-[3.25rem] bg-black/60 hover:bg-black/70 h-9 hover:pr-9 active:bg-black/80"
                  >
                    <svg
                      width="1em"
                      height="1em"
                      className="text-white/75 text-[1.25rem] mr-1"
                      data-icon="material-symbols:copyright-outline-rounded"
                    >
                      <symbol
                        id="ai:material-symbols:copyright-outline-rounded"
                        viewBox="0 0 24 24"
                      >
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
                  </button>
                )}

                {/* 侧边栏组件 - 根据 showSidebar 属性决定是否显示 */}
                {showSidebar && <Sidebar categories={categories} tags={tags} />}

                <main
                  id="swup-container"
                  className={`transition-swup-fade ${showBanner ? 'col-span-2 lg:col-span-1' : 'col-span-2'} overflow-hidden`}
                >
                  <div id="content-wrapper" className="onload-animation">
                    {children}
                  </div>
                </main>

                {/* 底部组件 */}
                <Footer
                  currentYear={new Date().getFullYear()}
                  siteSetting={siteSetting}
                  recordSettings={recordSettings}
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
                    {typeof toc === 'string' && toc ? (
                      <div
                        className="toc-lists"
                        id="toc-lists"
                        dangerouslySetInnerHTML={{ __html: toc }}
                      ></div>
                    ) : null}
                    <div className="h-8 w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* increase the page height during page transition to prevent the scrolling animation from jumping */}
        <div
          id="page-height-extend"
          className="hidden h-[300vh]"
          style={
            {
              '--bannerOffset': '15vh',
              '--banner-height-home': '65vh',
              '--banner-height': '35vh',
              '--configHue': '280',
              '--page-width': '75rem'
            } as React.CSSProperties
          }
        ></div>
      </body>
    </html>
  )
}
