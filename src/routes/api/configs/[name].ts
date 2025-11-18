import { DatabaseSchema } from '../../../types.ts'
import { LumosContext } from '../../../context.ts'

export default async function handler(ctx: LumosContext, params: { name?: string }): Promise<void> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      ctx.json({ error: 'Server not initialized' }, 500)
      return
    }

    // 使用路由参数或默认值
    const configName = params.name || 'navigationWebsiteDataJsonConfig'

    // 检查配置是否存在
    if (!(configName in data)) {
      ctx.json({ error: `Config '${configName}' not found` }, 404)
      return
    }

    // 获取对应的配置数据
    const configData = data[configName as keyof DatabaseSchema]

    ctx.json({
      name: configName,
      data: configData
    })
  } catch (error) {
    console.error('获取配置错误:', error)
    ctx.json({ error: 'Failed to load config' }, 500)
  }
}
