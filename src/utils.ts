import { createHash } from 'crypto'
import { readdir, stat } from 'fs/promises'
import { join, extname } from 'path'
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid'
import { marked } from 'marked'
// @ts-expect-error markdown-toc库没有TypeScript类型定义
import markToc from 'markdown-toc'
import highlight from 'highlight.js'
import md5 from 'md5'
import pinyin from 'pinyin'

// Lumos 专用的 namespace UUID
export const LUMOS_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'

// 默认作者相关常量
export const DEFAULT_AUTHOR_ALIAS = 'default'

// 获取默认作者 ID
export function getDefaultAuthorId(): string {
  return generateNamespaceUUID('author:default')
}

// 生成随机 UUID (v4)
export function generateUUID(): string {
  return uuidv4()
}

// 生成基于名称的 UUID (v5) - 支持 namespace
export function generateNamespaceUUID(name: string, namespace?: string): string {
  return uuidv5(name, namespace || LUMOS_NAMESPACE)
}

// 生成文章 ID（基于标题或别名）
export function generatePostId(title: string, alias?: string): string {
  const seed = alias || title
  return generateNamespaceUUID(`post:${seed}`)
}

// 生成页面 ID（基于标题或别名）
export function generatePageId(title: string, alias?: string): string {
  const seed = alias || title
  return generateNamespaceUUID(`page:${seed}`)
}

// 生成作者 ID（基于名称）
export function generateAuthorId(name: string): string {
  return generateNamespaceUUID(`author:${name}`)
}

// 计算文件 MD5
export async function getFileMD5(filePath: string): Promise<string> {
  const file = Bun.file(filePath)
  const buffer = await file.arrayBuffer()
  return createHash('md5').update(Buffer.from(buffer)).digest('hex')
}

// 格式化日期
export function formatDate(date?: Date): string {
  const d = date || new Date()
  return d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0]
}

// 中文转拼音用于 URL
export function titleToUrl(title: string): string {
  if (!title) return 'untitled'

  // 检查是否包含中文字符
  if (/[\u4e00-\u9fa5]/.test(title)) {
    // 使用 pinyin 库将中文转换为拼音，按字符逐一转换
    const pinyinResult = pinyin(title, {
      style: pinyin.STYLE_NORMAL, // 普通风格，不带声调
      segment: true, // 启用分词
      heteronym: false // 不返回多音字的所有读音
    })

    // 将拼音数组扁平化并用连字符连接
    let url = pinyinResult.flat().join('-')

    // 处理中英文混合的情况，在中文字符和英文字符之间添加连字符
    url = url
      .replace(/([a-zA-Z0-9]+)/g, (match, p1) => {
        // 保持数字字母组合的完整性
        return p1.toLowerCase()
      })
      .replace(/[^a-zA-Z0-9\s-]/g, '') // 移除特殊字符，保留字母、数字、空格和连字符
      .replace(/\s+/g, '-')           // 空格转连字符
      .replace(/-+/g, '-')            // 多个连字符合并为一个
      .replace(/^-|-$/g, '')          // 移除开头和结尾的连字符
      .toLowerCase()

    return url || 'untitled'
  } else {
    // 如果没有中文，直接处理英文
    return title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s-]/g, '') // 移除特殊字符
      .replace(/\s+/g, '-')           // 空格转连字符
      .replace(/-+/g, '-')            // 多个连字符合并为一个
      .replace(/^-|-$/g, '')          // 移除开头和结尾的连字符
      .trim() || 'untitled'
  }
}

// 统计符号数量
export function symbolsCount(text: string): number {
// Remove HTML tags
const strippedText = text.replace(/<[^>]+>/g, '')

// Remove whitespace and invisible characters
const cleanedText = strippedText.replace(
  /[\s\u200b-\u200f\u2028-\u202f\u205f-\u206f\ufeff]+/g,
  ''
)
// Count the number of characters in the cleaned text
return cleanedText.length
}

// 提取摘要
export function generateExcerpt(content: string, maxLength: number = 200): string {
  const stripped = content.replace(/<[^>]*>/g, '') // 移除 HTML 标签
  return stripped.length > maxLength ?
    stripped.substring(0, maxLength) + '...' :
    stripped
}

// 递归获取目录下所有指定类型的文件
export async function getFilesByExtension(
  directory: string,
  extensions: string[]
): Promise<string[]> {
  const files: string[] = []

  try {
    const entries = await readdir(directory, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(directory, entry.name)

      if (entry.isDirectory()) {
        const subFiles = await getFilesByExtension(fullPath, extensions)
        files.push(...subFiles)
      } else if (entry.isFile() && extensions.includes(extname(entry.name))) {
        files.push(fullPath)
      }
    }
  } catch (error) {
    console.warn(`Warning: Cannot read directory ${directory}:`, error)
  }

  return files
}

// 确保目录存在
export async function ensureDir(dirPath: string): Promise<void> {
  try {
    await stat(dirPath)
  } catch {
    await Bun.write(Bun.file(dirPath), '')
  }
}

// Markdown 处理相关函数

/**
 * 生成 TOC 名称
 * @param name 标题名称
 * @returns TOC 锚点名称
 */
export function generateTocName(name: string): string {
  name = name.trim().replace(/\s+/g, '').replace(/\)/g, '').replace(/[(,]/g, '-').toLowerCase()
  if (/^[\w-]+$/.test(name)) {
    return name
  }
  return `toc-${md5(name).slice(0, 6)}`
}

/**
 * Markdown 转 TOC
 * @param content Markdown 内容
 * @returns TOC HTML
 */
export async function markdownToToc(content: string): Promise<string> {
  return (await marked((markToc as any)(content).content)).replace(
    /<a\s+href="#([^"]+)">([^<>]+)<\/a>/g,
    (a, b, c) => {
      return `<a href="#${generateTocName(c)}">${c}</a>`
    }
  )
}

/**
 * Markdown 转 HTML（包含代码高亮）
 * @param content Markdown 内容
 * @returns HTML 内容
 */
export async function markdownToHtml(content: string): Promise<string> {
  const markedContent = (await marked(content)).replace(/<h(\d)[^<>]*>(.*?)<\/h\1>/g, (a, b, c) => {
    // @ts-expect-error 故意使用位运算符进行条件判断，忽略类型检查
    if (b | (0 === 2)) {
      return `<h${b} id="${generateTocName(c)}">${c}</h${b}>`
    }
    return `<h${b} id="${generateTocName(c)}"><a class="anchor" href="#${generateTocName(
      c
    )}"></a>${c}</h${b}>`
  })

  return markedContent.replace(
    /<pre><code\s*(?:class="(lang|language)-(\w+)")?>[\s\S]*?<\/code><\/pre>/gm,
    (match) => {
      // 提取语言和代码内容
      const langMatch = match.match(/<pre><code\s*(?:class="(?:lang|language)-(\w+)")?>(.*?)<\/code><\/pre>/s)
      if (!langMatch) return match

      const language = langMatch[1]
      let text = langMatch[2]

      text = text
        .replace(/&#39;/g, "'")
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')

      try {
        const result = highlight.highlightAuto(text, language ? [language] : undefined)
        return `<pre><code class="hljs lang-${result.language || 'text'}">${result.value}</code></pre>`
      } catch (error) {
        console.warn('代码高亮失败:', error)
        return match
      }
    }
  )
}
