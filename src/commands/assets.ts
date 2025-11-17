import { ensureAssetsDir } from "../utils"

// 资源处理命令
export async function assetsCommand() {
  try {
    console.log('🎨 开始处理资源文件...')

    await ensureAssetsDir(process.cwd())

    console.log('✅ 资源文件处理完成!')
  } catch (error) {
    console.error('❌ 处理资源文件失败:', error)
    process.exit(1)
  }
}
