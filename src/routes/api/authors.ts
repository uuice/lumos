// API: 获取所有作者 - /api/authors
import { DatabaseSchema } from '../../types.ts'
import { LumosContext } from '../../context.ts'

export default async function handler(ctx: LumosContext): Promise<void> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      ctx.json({ error: 'Server not initialized' }, 500)
      return
    }

    ctx.json(data.authors)
  } catch (error) {
    console.error('获取作者列表错误:', error)
    ctx.json({ error: 'Failed to load authors' }, 500)
  }
}
