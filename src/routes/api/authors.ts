// API: 获取所有作者 - /api/authors
import { DatabaseSchema } from '../../types.ts'

export default async function handler(_request: Request): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    return Response.json(data.authors)
  } catch (error) {
    console.error('获取作者列表错误:', error)
    return Response.json({ error: 'Failed to load authors' }, { status: 500 })
  }
}
