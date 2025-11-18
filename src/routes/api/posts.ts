// API: 获取所有文章 - /api/posts
import { DatabaseSchema } from '../../types.ts'
import { LumosContext } from '../../context.ts'

export default async function handler(ctx: LumosContext): Promise<void> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      ctx.json({ error: 'Server not initialized' }, 500)
      return
    }

    const posts = data.posts.filter(p => p.published)
    ctx.json(posts)
  } catch (error) {
    console.error('获取文章列表错误:', error)
    ctx.json({ error: 'Failed to load posts' }, 500)
  }
}
