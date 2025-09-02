// API: 获取所有页面 - /api/pages
import { DatabaseSchema } from '../../types.ts'

export default async function handler(_request: Request): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    const pages = data.pages.filter(p => p.published)
    return Response.json(pages)
  } catch (error) {
    console.error('获取页面列表错误:', error)
    return Response.json({ error: 'Failed to load pages' }, { status: 500 })
  }
}
