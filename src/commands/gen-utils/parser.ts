import matter from 'gray-matter'
import yaml from 'js-yaml'
import { basename, join } from 'path'
import { ARTICLE, AUTHOR, JSON_OBJ, PAGE, POST } from '../../types.ts'
import {
  DEFAULT_AUTHOR_ALIAS,
  formatDate,
  generateAuthorId,
  generateExcerpt,
  generateNamespaceUUID,
  generatePageId,
  generatePostId,
  getDefaultAuthorId,
  getFileMD5,
  getFilesByExtension,
  isCacheValid,
  markdownToHtml,
  mdxToHtml,
  markdownToToc,
  readCache,
  saveCache,
  symbolsCount,
  titleToUrl
} from '../../utils.ts'
import { PluginManager } from '../../plugin-manager.ts'

export class Parser {
  private basePath: string
  private pluginManager: PluginManager

  constructor(basePath: string = process.cwd()) {
    this.basePath = basePath
    this.pluginManager = new PluginManager(basePath)
  }

  // 解析 Markdown 文件为 ARTICLE 对象（支持缓存）
  async parseMarkdownFile(
    filePath: string,
    type: 'post' | 'page' | 'author'
  ): Promise<ARTICLE | null> {
    try {
      // 计算文件 MD5
      const fileHash = await getFileMD5(filePath)

      // 检查缓存是否存在且有效
      if (await isCacheValid(this.basePath, filePath, fileHash)) {
        const cachedData = await readCache(this.basePath, filePath, fileHash)
        if (cachedData) {
          console.log(`📁 使用缓存: ${filePath}`)
          return cachedData
        }
      }

      console.log(`🔄 解析文件: ${filePath}`)

      const file = Bun.file(filePath)
      let content = await file.text()

      // 执行文件解析钩子
      content = await this.pluginManager.executeParseFile(filePath, content, type)

      const { data: frontMatter, content: mdContent } = matter(content)
      const baseName = basename(filePath).replace(/\.(md|mdx)$/i, '')
      const isMDX = filePath.endsWith('.mdx')
      const htmlContent = isMDX ? await mdxToHtml(mdContent) : await markdownToHtml(mdContent)

      // 生成 TOC
      const tocContent = await markdownToToc(mdContent)

      // 根据类型生成适当的 ID
      let generatedId: string
      if (frontMatter.id) {
        generatedId = frontMatter.id
      } else {
        const title = frontMatter.title || baseName
        const alias = frontMatter.alias

        switch (type) {
          case 'post':
            generatedId = generatePostId(title, alias)
            break
          case 'page':
            generatedId = generatePageId(title, alias)
            break
          case 'author':
            generatedId = generateAuthorId(title)
            break
          default:
            generatedId = generateNamespaceUUID(`unknown:${title}`)
        }
      }

      const article: ARTICLE = {
        id: generatedId,
        title: frontMatter.title || baseName,
        alias: frontMatter.alias || titleToUrl(frontMatter.title || baseName),
        cover: frontMatter.cover || '',
        created_time: frontMatter.created_time || formatDate(),
        date: frontMatter.date || frontMatter.created_time || formatDate(),
        updated_time: frontMatter.updated_time || formatDate(),
        updated: frontMatter.updated || frontMatter.updated_time || formatDate(),
        categories: Array.isArray(frontMatter.categories)
          ? frontMatter.categories
          : frontMatter.categories
            ? [frontMatter.categories]
            : [],
        tags: Array.isArray(frontMatter.tags)
          ? frontMatter.tags
          : frontMatter.tags
            ? [frontMatter.tags]
            : [],
        excerpt: frontMatter.excerpt || generateExcerpt(htmlContent),
        published: frontMatter.published !== false,
        content: htmlContent,
        mdContent: mdContent,
        toc: tocContent, // 使用生成的 TOC
        created_timestamp: new Date(frontMatter.created_time || Date.now()).getTime(),
        updated_timestamp: new Date(frontMatter.updated_time || Date.now()).getTime(),
        url: `${frontMatter.url || titleToUrl(frontMatter.alias || frontMatter.title || baseName)}`,
        symbolsCount: symbolsCount(mdContent),
        authorIds: Array.isArray(frontMatter.authors)
          ? frontMatter.authors
          : frontMatter.authors
            ? [frontMatter.authors]
            : [getDefaultAuthorId()],
        // 保留其他自定义字段
        ...frontMatter
      }

      // 保存到缓存
      await saveCache(this.basePath, filePath, fileHash, article)

      return article
    } catch (error) {
      console.error(`Error parsing markdown file ${filePath}:`, error)
      return null
    }
  }

  // 解析 JSON 文件
  async parseJsonFile(filePath: string): Promise<JSON_OBJ | null> {
    try {
      const file = Bun.file(filePath)
      const content = await file.text()
      return JSON.parse(content)
    } catch (error) {
      console.error(`Error parsing JSON file ${filePath}:`, error)
      return null
    }
  }

  // 解析 YAML 文件
  async parseYamlFile(filePath: string): Promise<JSON_OBJ | null> {
    try {
      const file = Bun.file(filePath)
      const content = await file.text()
      return yaml.load(content) as JSON_OBJ
    } catch (error) {
      console.error(`Error parsing YAML file ${filePath}:`, error)
      return null
    }
  }

  // 解析所有 Markdown 文件
  async parseAllMarkdownFiles(): Promise<{
    posts: POST[]
    pages: PAGE[]
    authors: AUTHOR[]
  }> {
    const posts: POST[] = []
    const pages: PAGE[] = []
    const authors: AUTHOR[] = []

    // 使用 source 目录作为基础路径
    const sourceDir = join(this.basePath, 'source')

    // 解析 posts
    const postsDir = join(sourceDir, '_posts')
    const postFiles = await getFilesByExtension(postsDir, ['.md', '.mdx'])

    for (const filePath of postFiles) {
      const article = await this.parseMarkdownFile(filePath, 'post')
      if (article) {
        posts.push(article as POST)
      }
    }

    // 解析 pages
    const pagesDir = join(sourceDir, '_pages')
    const pageFiles = await getFilesByExtension(pagesDir, ['.md', '.mdx'])

    for (const filePath of pageFiles) {
      const article = await this.parseMarkdownFile(filePath, 'page')
      if (article) {
        pages.push(article as PAGE)
      }
    }

    // 解析 authors
    const authorsDir = join(sourceDir, '_authors')
    const authorFiles = await getFilesByExtension(authorsDir, ['.md', '.mdx'])

    for (const filePath of authorFiles) {
      const article = await this.parseMarkdownFile(filePath, 'author')
      if (article) {
        const author: AUTHOR = {
          ...article,
          isDefault: article.alias === DEFAULT_AUTHOR_ALIAS || article.id === getDefaultAuthorId()
        }
        authors.push(author)
      }
    }

    return { posts, pages, authors }
  }

  // 解析所有 JSON 文件
  async parseAllJsonFiles(): Promise<Record<string, JSON_OBJ>> {
    const jsonConfigs: Record<string, JSON_OBJ> = {}

    // 使用 source 目录作为基础路径
    const sourceDir = join(this.basePath, 'source')
    const jsonsDir = join(sourceDir, '_jsons')
    const jsonFiles = await getFilesByExtension(jsonsDir, ['.json'])

    for (const filePath of jsonFiles) {
      const config = await this.parseJsonFile(filePath)
      if (config) {
        const key = basename(filePath, '.json') + 'Json' + 'Config'
        jsonConfigs[key] = config
      }
    }

    return jsonConfigs
  }

  // 解析所有 YAML 文件
  async parseAllYamlFiles(): Promise<Record<string, JSON_OBJ>> {
    const yamlConfigs: Record<string, JSON_OBJ> = {}

    // 使用 source 目录作为基础路径
    const sourceDir = join(this.basePath, 'source')
    const yamlsDir = join(sourceDir, '_ymls')
    const yamlFiles = await getFilesByExtension(yamlsDir, ['.yml', '.yaml'])

    for (const filePath of yamlFiles) {
      const config = await this.parseYamlFile(filePath)
      if (config) {
        const key = basename(filePath).replace(/\.(yml|yaml)$/, '') + 'Yml' + 'Config'
        yamlConfigs[key] = config
      }
    }

    return yamlConfigs
  }
}
