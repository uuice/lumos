// API: 获取单个文章 - /api/posts/[id]
import { DatabaseSchema } from '../../../types.ts'

export default async function handler(request: Request, params: { id: string }): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    const postId = params.id
    const post = data.posts.find(p => p.id === postId && p.published)

    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 })
    }

    return Response.json(post)
  } catch (error) {
    console.error('获取文章详情错误:', error)
    return Response.json({ error: 'Failed to load post' }, { status: 500 })
  }
}
