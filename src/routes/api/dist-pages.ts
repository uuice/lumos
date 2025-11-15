// API: 获取构建页面列表 - /api/dist-pages
// 根据 `bundler/html-route.ts` 的映射，返回路由与文件路径映射
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

// 解析 `bundler/html-route.ts`，从 import 段和 htmlRoutes 对象构建 route -> file 映射
async function parseHtmlRouteFile(): Promise<{ path: string; url: string | null }[]> {
  const filePath = join(process.cwd(), 'bundler', 'html-route.ts')
  const text = await readFile(filePath, 'utf-8')

  // 提取 import 标识符到源路径的映射
  const importRegex = /import\s+([A-Za-z0-9_$]+)\s+from\s+['"](.+?)['"]/g
  const idToSource: Record<string, string> = {}
  let m: RegExpExecArray | null
  while ((m = importRegex.exec(text)) !== null) {
    const id = m[1]
    const src = m[2]
    idToSource[id] = src
  }

  // 提取 htmlRoutes 对象主体
  const routesRegex = /export\s+const\s+htmlRoutes\s*=\s*{([\s\S]*?)}/m
  const routesMatch = text.match(routesRegex)
  const results: { path: string; url: string | null }[] = []

  if (!routesMatch) return results

  const body = routesMatch[1]
  // 匹配形如 '/data': dataHtml,
  const entryRegex = /(['"`])(.+?)\1\s*:\s*([A-Za-z0-9_$]+)/g
  while ((m = entryRegex.exec(body)) !== null) {
    const route = m[2]
    const id = m[3]
    const src = idToSource[id]
    if (src) {
      // path: 文件路径（相对于 bundler），url: htmlRoutes 对象的路由键
      const path = src.replace(/^\.\//, '').replace(/^\//, '')
      results.push({ path, url: route })
    } else {
      results.push({ path: src || '', url: route })
    }
  }

  return results
}

export default async function handler(_request: Request): Promise<Response> {
  try {
    const mappings = await parseHtmlRouteFile()
    return Response.json(mappings)
  } catch (error) {
    console.error('解析 html-route.ts 失败:', error)
    return Response.json({ error: 'Failed to load dist pages' }, { status: 500 })
  }
}
