// API: 获取所有文章 - /api/posts
import { DatabaseSchema } from '../../types.ts'

export default async function handler(_request: Request): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    const posts = data.posts.filter(p => p.published)
    return Response.json(posts)
  } catch (error) {
    console.error('获取文章列表错误:', error)
    return Response.json({ error: 'Failed to load posts' }, { status: 500 })
  }
}
