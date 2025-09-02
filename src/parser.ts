import matter from 'gray-matter'
import yaml from 'js-yaml'
import { join, basename } from 'path'
import {
  ARTICLE,
  POST,
  PAGE,
  AUTHOR,
  JSON_OBJ
} from './types.ts'
import {
  generateNamespaceUUID,
  generatePostId,
  generatePageId,
  generateAuthorId,
  getDefaultAuthorId,
  DEFAULT_AUTHOR_ALIAS,
  formatDate,
  titleToUrl,
  symbolsCount,
  generateExcerpt,
  getFilesByExtension,
  markdownToHtml,
  markdownToToc
} from './utils.ts'

export class Parser {
  private basePath: string

  constructor(basePath: string = process.cwd()) {
    this.basePath = basePath
  }

  // 解析 Markdown 文件为 ARTICLE 对象
  async parseMarkdownFile(filePath: string, type: 'post' | 'page' | 'author'): Promise<ARTICLE | null> {
    try {
      const file = Bun.file(filePath)
      const content = await file.text()
      const { data: frontMatter, content: mdContent } = matter(content)

      // 将 Markdown 转换为 HTML（包含代码高亮）
      const htmlContent = await markdownToHtml(mdContent)

      // 生成 TOC
      const tocContent = await markdownToToc(mdContent)

      // 根据类型生成适当的 ID
      let generatedId: string
      if (frontMatter.id) {
        generatedId = frontMatter.id
      } else {
        const title = frontMatter.title || basename(filePath, '.md')
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
        title: frontMatter.title || basename(filePath, '.md'),
        alias: frontMatter.alias || titleToUrl(frontMatter.title || basename(filePath, '.md')),
        cover: frontMatter.cover || '',
        created_time: frontMatter.created_time || formatDate(),
        date: frontMatter.date || frontMatter.created_time || formatDate(),
        updated_time: frontMatter.updated_time || formatDate(),
        updated: frontMatter.updated || frontMatter.updated_time || formatDate(),
        categories: Array.isArray(frontMatter.categories) ? frontMatter.categories :
                   frontMatter.categories ? [frontMatter.categories] : [],
        tags: Array.isArray(frontMatter.tags) ? frontMatter.tags :
              frontMatter.tags ? [frontMatter.tags] : [],
        excerpt: frontMatter.excerpt || generateExcerpt(htmlContent),
        published: frontMatter.published !== false,
        content: htmlContent,
        mdContent: mdContent,
        toc: tocContent, // 使用生成的 TOC
        created_timestamp: new Date(frontMatter.created_time || Date.now()).getTime(),
        updated_timestamp: new Date(frontMatter.updated_time || Date.now()).getTime(),
        url: frontMatter.url || `/${type}/${frontMatter.alias || titleToUrl(frontMatter.title || basename(filePath, '.md'))}`,
        symbolsCount: symbolsCount(mdContent),
        authorIds: Array.isArray(frontMatter.authors) ? frontMatter.authors :
                  frontMatter.authors ? [frontMatter.authors] : [getDefaultAuthorId()],
        // 保留其他自定义字段
        ...frontMatter
      }

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
    const postFiles = await getFilesByExtension(postsDir, ['.md'])

    for (const filePath of postFiles) {
      const article = await this.parseMarkdownFile(filePath, 'post')
      if (article) {
        posts.push(article as POST)
      }
    }

    // 解析 pages
    const pagesDir = join(sourceDir, '_pages')
    const pageFiles = await getFilesByExtension(pagesDir, ['.md'])

    for (const filePath of pageFiles) {
      const article = await this.parseMarkdownFile(filePath, 'page')
      if (article) {
        pages.push(article as PAGE)
      }
    }

    // 解析 authors
    const authorsDir = join(sourceDir, '_authors')
    const authorFiles = await getFilesByExtension(authorsDir, ['.md'])

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
        const key = basename(filePath, '.json') + 'Config'
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
        const key = basename(filePath).replace(/\.(yml|yaml)$/, '') + 'Config'
        yamlConfigs[key] = config
      }
    }

    return yamlConfigs
  }
}
