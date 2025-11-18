// API: 获取所有页面 - /api/pages
import { DatabaseSchema } from '../../types.ts'
import { LumosContext } from '../../context.ts'

export default async function handler(ctx: LumosContext): Promise<void> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      ctx.json({ error: 'Server not initialized' }, 500)
      return
    }

    const pages = data.pages.filter(p => p.published)
    ctx.json(pages)
  } catch (error) {
    console.error('获取页面列表错误:', error)
    ctx.json({ error: 'Failed to load pages' }, 500)
  }
}
