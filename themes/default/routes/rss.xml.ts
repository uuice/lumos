import { DatabaseSchema, POST } from '../../../src/types.ts'
import { LumosContext } from '../../../src/context.ts'
import { Builder } from 'xml2js'

/**
 * RSS Feed 路由处理器
 * 生成符合 RSS 2.0 标准的 XML Feed
 */
export default async function handler(ctx: LumosContext): Promise<void> {
  try {
    // 获取全局数据
    const data: DatabaseSchema = (globalThis as any).__LUMOS_DATA__

    if (!data) {
      ctx.text('Data not available', 500)
      return
    }

    // 获取站点配置信息（从 JSON 配置文件中获取）
    const siteConfig = {
      title: (data as any).title || (data as any).config?.title || 'Lumos Blog',
      url: (data as any).url || (data as any).config?.url || 'http://localhost:3060）',
      description: (data as any).description || (data as any).config?.description || 'A blog powered by Lumos'
    }

    // 获取已发布的文章列表（按时间倒序）
    const posts = (data.posts || [])
      .filter((post: POST) => post.published)
      .sort((a: POST, b: POST) =>
        new Date(b.date || b.created_time).getTime() - new Date(a.date || a.created_time).getTime()
      )
      .slice(0, 20) // 限制 RSS 条目数量

    // 构建 RSS JSON 对象
    const rssData = {
      rss: {
        $: {
          version: '2.0',
          'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
          'xmlns:atom': 'http://www.w3.org/2005/Atom'
        },
        channel: {
          title: siteConfig.title,
          link: siteConfig.url,
          description: siteConfig.description,
          language: 'zh-CN',
          lastBuildDate: new Date().toUTCString(),
          generator: 'Lumos RSS Generator',
          'atom:link': {
            $: {
              href: `${siteConfig.url}/rss.xml`,
              rel: 'self',
              type: 'application/rss+xml'
            }
          },
          item: posts.map((post: POST) => {
            const postUrl = `/archives${post.url?.replace('/post', '') || `/${post.alias}`}`
            const fullUrl = `${siteConfig.url}${postUrl}`
            const pubDate = new Date(post.date || post.created_time).toUTCString()

            return {
              title: { _: post.title, $: { 'xml:space': 'preserve' } },
              link: fullUrl,
              guid: {
                _: fullUrl,
                $: { isPermaLink: 'true' }
              },
              description: post.excerpt || post.title,
              'content:encoded': {
                _: post.content,
                $: { 'xml:space': 'preserve' }
              },
              pubDate: pubDate,
              author: post.authorIds?.[0] || 'admin',
              category: post.categories || []
            }
          })
        }
      }
    }

    // 使用 xml2js Builder 生成 XML
    const builder = new Builder({
      xmldec: { version: '1.0', encoding: 'UTF-8' },
      renderOpts: { pretty: true, indent: '  ' }
    })

    const xml = builder.buildObject(rssData)

    ctx.set('Content-Type', 'application/rss+xml; charset=UTF-8')
    ctx.set('Cache-Control', 'public, max-age=3600')
    ctx.setBody(xml)

  } catch (error) {
    console.error('RSS generation error:', error)
    ctx.text('Internal Server Error', 500)
  }
}
