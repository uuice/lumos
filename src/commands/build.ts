import { assetsCommand } from "./assets"
import { genCommand } from "./gen"

// 构建命令
export async function buildCommand() {
  try {
    console.log('🔨 开始构建项目...')

    // 1. 生成数据
    await genCommand()

    // 2. 处理资源
    await assetsCommand()

    console.log('✅ 项目构建完成!')
    console.log('📊 数据文件: data.json')
    console.log('🎨 静态资源: /assets/*')
  } catch (error) {
    console.error('❌ 项目构建失败:', error)
    process.exit(1)
  }
}
