// API: 获取所有分类 - /api/categories
import { DatabaseSchema } from '../../types.ts'
import { LumosContext } from '../../context.ts'

export default async function handler(ctx: LumosContext): Promise<void> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      ctx.json({ error: 'Server not initialized' }, 500)
      return
    }

    ctx.json(data.categories)
  } catch (error) {
    console.error('获取分类列表错误:', error)
    ctx.json({ error: 'Failed to load categories' }, 500)
  }
}
