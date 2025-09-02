// API: 获取所有标签 - /api/tags
import { DatabaseSchema } from '../../types.ts'

export default async function handler(_request: Request): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    return Response.json(data.tags)
  } catch (error) {
    console.error('获取标签列表错误:', error)
    return Response.json({ error: 'Failed to load tags' }, { status: 500 })
  }
}
