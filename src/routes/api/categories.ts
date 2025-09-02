// API: 获取所有分类 - /api/categories
import { DatabaseSchema } from '../../types.ts'

export default async function handler(_request: Request): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    return Response.json(data.categories)
  } catch (error) {
    console.error('获取分类列表错误:', error)
    return Response.json({ error: 'Failed to load categories' }, { status: 500 })
  }
}
