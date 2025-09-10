import { readdir, stat, mkdir } from 'fs/promises'
import { join, extname, basename } from 'path'
import sharp from 'sharp'

// 支持的图片格式
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.tiff', '.gif', '.bmp']
const OUTPUT_FORMAT = 'webp'

interface ConvertOptions {
  quality?: number
  // 删除 compressionLevel，使用 effort 代替
  effort?: number
}

async function isDirectory(path: string): Promise<boolean> {
  try {
    const stats = await stat(path)
    return stats.isDirectory()
  } catch {
    return false
  }
}

async function ensureDirectoryExists(dirPath: string): Promise<void> {
  try {
    await mkdir(dirPath, { recursive: true })
  } catch (error) {
    // 如果目录已存在，忽略错误
    if (!(error instanceof Error && error.message.includes('EEXIST'))) {
      throw error
    }
  }
}

async function convertImage(
  inputPath: string,
  outputPath: string,
  options: ConvertOptions = {}
): Promise<void> {
  const { quality = 80, effort = 4 } = options

  // 确保输出目录存在
  const outputDir = outputPath.substring(0, outputPath.lastIndexOf('/'))
  await ensureDirectoryExists(outputDir)

  // 使用正确的 WebP 选项
  await sharp(inputPath)
    .webp({ quality, effort })
    .toFile(outputPath)

  console.log(`✅ 转换完成: ${inputPath} -> ${outputPath}`)
}

async function convertDirectory(
  inputDir: string,
  outputDir: string,
  options: ConvertOptions = {}
): Promise<void> {
  try {
    // 确保输出目录存在
    await ensureDirectoryExists(outputDir)

    const files = await readdir(inputDir)

    for (const file of files) {
      const inputPath = join(inputDir, file)
      const outputName = `${basename(file, extname(file))}.${OUTPUT_FORMAT}`
      const outputPath = join(outputDir, outputName)

      // 检查是否为支持的图片格式
      if (SUPPORTED_FORMATS.includes(extname(file).toLowerCase())) {
        await convertImage(inputPath, outputPath, options)
      } else if (await isDirectory(inputPath)) {
        // 递归处理子目录
        await convertDirectory(inputPath, join(outputDir, file), options)
      }
    }
  } catch (error) {
    console.error('❌ 转换目录时出错:', error)
  }
}

export async function webpCommand(args: string[], options: Record<string, string | boolean>): Promise<void> {
  if (args.length < 2) {
    console.log('使用方法: lumos webp <输入路径> <输出路径> [质量] [压缩级别]')
    console.log('示例: lumos webp ./images ./webp-images --quality=85 --effort=4')
    process.exit(1)
  }

  const inputPath = args[0]
  const outputPath = args[1]
  const quality = options.quality ? parseInt(options.quality as string) : 80
  // 将 compressionLevel 改为 effort
  const effort = options.effort ? parseInt(options.effort as string) : 4

  // 使用正确的选项名称
  const convertOptions = { quality, effort }

  try {
    console.log(`🔄 开始转换图片到 WebP 格式...`)

    if (await isDirectory(inputPath)) {
      console.log(`📁 转换目录: ${inputPath} -> ${outputPath}`)
      await convertDirectory(inputPath, outputPath, convertOptions)
    } else if (SUPPORTED_FORMATS.includes(extname(inputPath).toLowerCase())) {
      console.log(`📄 转换单个文件: ${inputPath} -> ${outputPath}`)
      await convertImage(inputPath, outputPath, convertOptions)
    } else {
      console.error('❌ 不支持的文件格式')
      process.exit(1)
    }

    console.log('✅ 所有图片转换完成!')
  } catch (error) {
    console.error('❌ 转换过程中出错:', error)
    process.exit(1)
  }
}