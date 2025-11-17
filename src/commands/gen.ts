import { DataGenerator } from "./gen-utils/generator"

// 生成数据命令
export async function genCommand() {
  try {
    console.log('🔄 开始生成数据...')

    const generator = new DataGenerator(process.cwd())
    await generator.saveData('data.json')

    console.log('✅ 数据生成完成!')
  } catch (error) {
    console.error('❌ 生成数据失败:', error)
    process.exit(1)
  }
}
