import { DatabaseSchema, POST, PAGE, CATEGORY, TAG } from '../types.ts'
import { Builder } from 'xml2js'

/**
 * Sitemap XML 路由处理器
 * 生成符合 sitemap.org 标准的站点地图
 */
export default async function handler(_request: Request): Promise<Response> {
  try {
    // 获取全局数据
    const data: DatabaseSchema = (globalThis as any).__LUMOS_DATA__

    if (!data) {
      return new Response('Data not available', { status: 500 })
    }

    // 获取站点配置信息
    const siteConfig = {
      url: (data as any).url || (data as any).config?.url || 'http://localhost:6000'
    }

    // 确保 URL 不以斜杠结尾
    const baseUrl = siteConfig.url.replace(/\/$/, '')

    // 构建 URL 列表
    const urls: any[] = []

    // 1. 首页
    urls.push({
      loc: baseUrl + '/',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: '1.0'
    })

    // 2. 文章页面
    const posts = (data.posts || []).filter((post: POST) => post.published)
    posts.forEach((post: POST) => {
      const postUrl = post.url?.replace('/post', '') || `/${post.alias}`
      urls.push({
        loc: baseUrl + '/archives' + postUrl,
        lastmod: new Date(post.updated_time || post.created_time).toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.8'
      })
    })

    // 3. 页面
    const pages = (data.pages || []).filter((page: PAGE) => page.published)
    pages.forEach((page: PAGE) => {
      const pageUrl = page.url?.replace('/page', '') || `/${page.alias}`
      // 只支持 /pages/:url 访问
      urls.push({
        loc: baseUrl + '/pages' + pageUrl,
        lastmod: new Date(page.updated_time || page.created_time).toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.7'
      })
    })

    // 4. 分类页面
    const categories = data.categories || []
    categories.forEach((category: CATEGORY) => {
      const categoryAlias = category.url || category.title
      urls.push({
        loc: baseUrl + `/categories/${encodeURIComponent(categoryAlias)}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.6'
      })
    })

    // 5. 标签页面
    const tags = data.tags || []
    tags.forEach((tag: TAG) => {
      const tagValue = tag.url || tag.title
      urls.push({
        loc: baseUrl + `/tags/${encodeURIComponent(tagValue)}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.5'
      })
    })

    // 6. 列表页面
    urls.push(
      {
        loc: baseUrl + '/archives',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: '0.9'
      },
      {
        loc: baseUrl + '/posts',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: '0.9'
      },
      {
        loc: baseUrl + '/categories',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.6'
      },
      {
        loc: baseUrl + '/tags',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.6'
      },
      {
        loc: baseUrl + '/links',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.5'
      },
      {
        loc: baseUrl + '/about',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.6'
      }
    )

    // 构建 Sitemap XML 对象
    const sitemapData = {
      urlset: {
        $: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
          'xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9',
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'xsi:schemaLocation': 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd',
          'xmlns:mobile': 'http://www.google.com/schemas/sitemap-mobile/1.0',
          'xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
          'xmlns:video': 'http://www.google.com/schemas/sitemap-video/1.1'
        },
        url: urls
      }
    }

    // 使用 xml2js Builder 生成 XML
    const builder = new Builder({
      xmldec: { version: '1.0', encoding: 'UTF-8' },
      renderOpts: { pretty: true, indent: '  ' }
    })

    const xml = builder.buildObject(sitemapData)

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=UTF-8',
        'Cache-Control': 'public, max-age=3600' // 1小时缓存
      }
    })

  } catch (error) {
    console.error('Sitemap generation error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
