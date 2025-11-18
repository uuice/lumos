// API: 获取所有数据 - /api/data
import { DatabaseSchema } from '../../types.ts'
import { LumosContext } from '../../context.ts'

export default async function handler(ctx: LumosContext): Promise<void> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      ctx.json({ error: 'Server not initialized' }, 500)
      return
    }

    ctx.json(data)
  } catch (error) {
    console.error('获取数据错误:', error)
    ctx.json({ error: 'Failed to load data' }, 500)
  }
}
