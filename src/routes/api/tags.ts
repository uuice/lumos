// API: 获取所有标签 - /api/tags
import { DatabaseSchema } from '../../types.ts'
import { LumosContext } from '../../context.ts'

export default async function handler(ctx: LumosContext): Promise<void> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      ctx.json({ error: 'Server not initialized' }, 500)
      return
    }

    ctx.json(data.tags)
  } catch (error) {
    console.error('获取标签列表错误:', error)
    ctx.json({ error: 'Failed to load tags' }, 500)
  }
}
