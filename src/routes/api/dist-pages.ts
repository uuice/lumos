// API: 获取构建页面列表 - /api/dist-pages
import { join } from 'path'
import { existsSync, statSync } from 'fs'

// 递归获取目录下的所有 HTML 文件（包括子目录）
async function getAllDistHtmlFiles(dirPath: string, basePath: string = ''): Promise<{path: string, url: string}[]> {
  const { readdir } = await import('fs/promises')
  let fileList: {path: string, url: string}[] = []

  try {
    // 检查目录是否存在
    if (!existsSync(dirPath)) {
      return fileList
    }

    const files = await readdir(dirPath)

    for (const file of files) {
      const filePath = join(dirPath, file)
      const relativePath = join(basePath, file)
      const stat = statSync(filePath)

      if (stat.isDirectory()) {
        // 递归处理子目录
        const subFiles = await getAllDistHtmlFiles(filePath, relativePath)
        fileList = [...fileList, ...subFiles]
      } else if (file.endsWith('.html')) {
        // 添加 HTML 文件到列表
        fileList.push({
          path: relativePath,
          url: `/${relativePath}`
        })
      }
    }
  } catch (error) {
    console.error('读取目录失败:', error)
  }

  return fileList
}

export default async function handler(_request: Request): Promise<Response> {
  try {
    // 获取构建目录路径
    const distDir = join(process.cwd(), 'bundler', 'dist')

    // 获取所有 HTML 文件
    const pages = await getAllDistHtmlFiles(distDir)

    return Response.json(pages)
  } catch (error) {
    console.error('获取构建页面列表错误:', error)
    return Response.json({ error: 'Failed to load dist pages' }, { status: 500 })
  }
}
