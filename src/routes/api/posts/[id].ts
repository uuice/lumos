// API: 获取单个文章 - /api/posts/[id]
import { DatabaseSchema } from '../../../types.ts'
import { LumosContext } from '../../../context.ts'

export default async function handler(ctx: LumosContext, params: { id: string }): Promise<void> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      ctx.json({ error: 'Server not initialized' }, 500)
      return
    }

    const postId = params.id
    const post = data.posts.find(p => p.id === postId && p.published)

    if (!post) {
      ctx.json({ error: 'Post not found' }, 404)
      return
    }

    ctx.json(post)
  } catch (error) {
    console.error('获取文章详情错误:', error)
    ctx.json({ error: 'Failed to load post' }, 500)
  }
}
