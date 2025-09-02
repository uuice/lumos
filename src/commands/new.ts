import { join } from 'path'
import { mkdir, writeFile, stat } from 'fs/promises'
import { generatePostId, generatePageId, generateAuthorId, formatDate } from '../utils.ts'
import { PostTemplate, PageTemplate, AuthorTemplate } from '../../templates/index.ts'

export interface NewCommandOptions {
  path?: string
}

export async function newCommand(type: string, title: string, options: NewCommandOptions = {}) {
  if (!type || !title) {
    throw new Error('Type and title are required')
  }

  const { path: subPath = '' } = options
  const currentTime = formatDate()

  switch (type.toLowerCase()) {
    case 'post':
      await createPost(title, subPath, currentTime)
      break
    case 'page':
      await createPage(title, subPath, currentTime)
      break
    case 'author':
      await createAuthor(title, subPath, currentTime)
      break
    default:
      throw new Error(`Unknown type: ${type}. Supported types: post, page, author`)
  }
}

async function createPost(title: string, subPath: string, currentTime: string) {
  const postId = generatePostId(title)
  const sourcePath = process.cwd()
  const postDir = join(sourcePath, 'source', '_posts', subPath)
  const postPath = join(postDir, `${title}.md`)

  await ensureDirectoryExists(postDir)
  await checkFileNotExists(postPath, 'post', title)

  const content = PostTemplate({
    id: postId,
    title,
    created_time: currentTime,
    updated_time: currentTime
  })

  await writeFile(postPath, content, 'utf-8')
  console.log(`✅ Post "${title}" created successfully at ${postPath}`)
}

async function createPage(title: string, subPath: string, currentTime: string) {
  const pageId = generatePageId(title)
  const sourcePath = process.cwd()
  const pageDir = join(sourcePath, 'source', '_pages', subPath)
  const pagePath = join(pageDir, `${title}.md`)

  await ensureDirectoryExists(pageDir)
  await checkFileNotExists(pagePath, 'page', title)

  const content = PageTemplate({
    id: pageId,
    title,
    created_time: currentTime,
    updated_time: currentTime
  })

  await writeFile(pagePath, content, 'utf-8')
  console.log(`✅ Page "${title}" created successfully at ${pagePath}`)
}

async function createAuthor(title: string, subPath: string, currentTime: string) {
  const authorId = generateAuthorId(title)
  const sourcePath = process.cwd()
  const authorDir = join(sourcePath, 'source', '_authors', subPath)
  const authorPath = join(authorDir, `${title}.md`)

  await ensureDirectoryExists(authorDir)
  await checkFileNotExists(authorPath, 'author', title)

  const content = AuthorTemplate({
    id: authorId,
    title,
    created_time: currentTime,
    updated_time: currentTime
  })

  await writeFile(authorPath, content, 'utf-8')
  console.log(`✅ Author "${title}" created successfully at ${authorPath}`)
}

async function ensureDirectoryExists(dirPath: string) {
  try {
    await stat(dirPath)
  } catch {
    await mkdir(dirPath, { recursive: true })
  }
}

async function checkFileNotExists(filePath: string, type: string, title: string) {
  try {
    await stat(filePath)
    throw new Error(`${type} "${title}" already exists at ${filePath}`)
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error && error.code !== 'ENOENT') {
      throw error
    }
  }
}
