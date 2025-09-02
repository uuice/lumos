import { Parser } from './parser.ts'
import {
  DatabaseSchema,
  POST,
  CATEGORY,
  TAG,
  POST_CATEGORY,
  POST_TAG
} from './types.ts'
import {
  generateNamespaceUUID,
  getDefaultAuthorId,
  DEFAULT_AUTHOR_ALIAS,
  titleToUrl
} from './utils.ts'

export class DataGenerator {
  private parser: Parser
  private basePath: string

  constructor(basePath: string = process.cwd()) {
    this.basePath = basePath
    this.parser = new Parser(basePath)
  }

  // 从文章中提取分类
  private extractCategories(posts: POST[]): CATEGORY[] {
    const categoryMap = new Map<string, CATEGORY>()

    posts.forEach(post => {
      // 确保 categories 字段存在且为数组
      const categories = Array.isArray(post.categories) ? post.categories : []
      categories.forEach(catName => {
        if (catName && !categoryMap.has(catName)) {
          categoryMap.set(catName, {
            id: generateNamespaceUUID(`category:${catName}`),
            title: catName,
            description: `Category: ${catName}`,
            url: `/category/${titleToUrl(catName) || 'category'}`
          })
        }
      })
    })

    return Array.from(categoryMap.values())
  }

  // 从文章中提取标签
  private extractTags(posts: POST[]): TAG[] {
    const tagMap = new Map<string, TAG>()

    posts.forEach(post => {
      // 确保 tags 字段存在且为数组
      const tags = Array.isArray(post.tags) ? post.tags : []
      tags.forEach(tagName => {
        if (tagName && !tagMap.has(tagName)) {
          tagMap.set(tagName, {
            id: generateNamespaceUUID(`tag:${tagName}`),
            title: tagName,
            description: `Tag: ${tagName}`,
            url: `/tag/${titleToUrl(tagName) || 'tag'}`
          })
        }
      })
    })

    return Array.from(tagMap.values())
  }

  // 生成文章-分类关联
  private generatePostCategoryRelations(
    posts: POST[],
    categories: CATEGORY[]
  ): POST_CATEGORY[] {
    const relations: POST_CATEGORY[] = []
    const categoryNameMap = new Map(categories.map(cat => [cat.title, cat.id]))

    posts.forEach(post => {
      // 确保 categories 字段存在且为数组
      const categories = Array.isArray(post.categories) ? post.categories : []
      categories.forEach(catName => {
        const categoryId = categoryNameMap.get(catName)
        if (categoryId) {
          relations.push({
            id: generateNamespaceUUID(`post-category:${post.id}:${categoryId}`),
            postId: post.id,
            categoryId
          })
        }
      })
    })

    return relations
  }

  // 生成文章-标签关联
  private generatePostTagRelations(
    posts: POST[],
    tags: TAG[]
  ): POST_TAG[] {
    const relations: POST_TAG[] = []
    const tagNameMap = new Map(tags.map(tag => [tag.title, tag.id]))

    posts.forEach(post => {
      // 确保 tags 字段存在且为数组
      const tags = Array.isArray(post.tags) ? post.tags : []
      tags.forEach(tagName => {
        const tagId = tagNameMap.get(tagName)
        if (tagId) {
          relations.push({
            id: generateNamespaceUUID(`post-tag:${post.id}:${tagId}`),
            postId: post.id,
            tagId
          })
        }
      })
    })

    return relations
  }

  // 生成完整的数据库结构
  async generateData(): Promise<DatabaseSchema> {
    console.log('开始解析文件...')

    // 解析 Markdown 文件
    const { posts, pages, authors } = await this.parser.parseAllMarkdownFiles()
    console.log(`解析完成: ${posts.length} 篇文章, ${pages.length} 个页面, ${authors.length} 个作者`)

    // 解析配置文件
    const jsonConfigs = await this.parser.parseAllJsonFiles()
    const yamlConfigs = await this.parser.parseAllYamlFiles()
    console.log(`解析配置文件: ${Object.keys(jsonConfigs).length} 个JSON, ${Object.keys(yamlConfigs).length} 个YAML`)

    // 提取分类和标签
    const categories = this.extractCategories(posts)
    const tags = this.extractTags(posts)
    console.log(`提取分类标签: ${categories.length} 个分类, ${tags.length} 个标签`)

    // 生成关联关系
    const postCategories = this.generatePostCategoryRelations(posts, categories)
    const postTags = this.generatePostTagRelations(posts, tags)

    // 构建数据结构
    const data: DatabaseSchema = {
      posts: posts.sort((a, b) => b.created_timestamp - a.created_timestamp),
      pages: pages.sort((a, b) => a.title.localeCompare(b.title)),
      authors: authors.length > 0 ? authors : [{
        id: getDefaultAuthorId(),
        title: 'Default Author',
        alias: DEFAULT_AUTHOR_ALIAS,
        cover: '',
        created_time: new Date().toISOString(),
        updated_time: new Date().toISOString(),
        categories: [],
        tags: [],
        excerpt: 'Default author for the blog',
        published: true,
        content: '<p>Default author for the blog</p>',
        mdContent: 'Default author for the blog',
        toc: '',
        created_timestamp: Date.now(),
        updated_timestamp: Date.now(),
        url: '/author/default',
        symbolsCount: 0,
        authorIds: [],
        isDefault: true
      }],
      categories,
      tags,
      postCategories,
      postTags,
      ...jsonConfigs,
      ...yamlConfigs
    }

    return data
  }

  // 保存数据到文件
  async saveData(outputPath: string = 'data.json'): Promise<void> {
    const data = await this.generateData()

    const jsonString = JSON.stringify(data, null, 2)
    await Bun.write(outputPath, jsonString)

    console.log(`数据已保存到: ${outputPath}`)
    console.log(`文件大小: ${(jsonString.length / 1024).toFixed(2)} KB`)
  }
}
