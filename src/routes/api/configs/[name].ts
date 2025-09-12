import { DatabaseSchema } from '../../../types.ts'

export default async function handler(request: Request, params: { name?: string }): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    // 使用路由参数或默认值
    const configName = params.name || 'navigationWebsiteDataJsonConfig'

    // 检查配置是否存在
    if (!(configName in data)) {
      return Response.json({ error: `Config '${configName}' not found` }, { status: 404 })
    }

    // 获取对应的配置数据
    const configData = data[configName as keyof DatabaseSchema]

    return Response.json({
      name: configName,
      data: configData
    })
  } catch (error) {
    console.error('获取配置错误:', error)
    return Response.json({ error: 'Failed to load config' }, { status: 500 })
  }
}
