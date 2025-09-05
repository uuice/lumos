// API: 获取所有数据 - /api/data
import { DatabaseSchema } from '../../types.ts'

export default async function handler(_request: Request): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    console.error('获取数据错误:', error)
    return Response.json({ error: 'Failed to load data' }, { status: 500 })
  }
}
