import { Document, Charset } from 'flexsearch'
import { DatabaseSchema, LIST_POST_ITEM, POST } from '../../types.ts'

// Cache index and documents in module scope
let postIndex: Document | null = null
let documents: Map<string, LIST_POST_ITEM> | null = null

function buildIndex(data: DatabaseSchema): void {
  const posts = (data.posts || []).filter((p: POST) => p.published)

  // Initialize cache containers
  documents = new Map<string, LIST_POST_ITEM>()
  // Build a Document index with CJK support as requested

  postIndex = new Document({
     document: {
      id: 'id',
      index: ['title', 'abstract'],
      store: true
    },
    // Enable CJK (Chinese, Japanese, Korean) support
    tokenize: 'full',
    encoder: Charset.CJK
  })

  for (const post of posts) {
    // Store lightweight doc without heavy fields
    const rest: any = { ...post }
    delete rest.content
    delete rest.mdContent
    delete rest.toc
    documents.set(post.id, rest as LIST_POST_ITEM)

    // Index using Document schema (title + abstract[excerpt])
    const docToAdd = {
      id: post.id,
      title: post.title || '',
      abstract: post.excerpt || ''
    }
    postIndex.add(docToAdd)
  }
}

export default async function handler(request: Request): Promise<Response> {
  try {
    const data = (globalThis as any).__LUMOS_DATA__ as DatabaseSchema
    if (!data) {
      return new Response('Server not initialized', { status: 500 })
    }

    // Lazy-build index on first request or when missing
    if (!postIndex || !documents) {
      buildIndex(data)
    }

    const url = new URL(request.url)
    const q = (url.searchParams.get('q') || '').trim()
    if (!q) {
      return Response.json({ q, results: [] })
    }

    // Search across all indexed fields; normalize results
    const searchResult = postIndex!.search(q) as Array<{ field: string, result: Array<string | number> }>
    const idSet = new Set<string>()
    for (const group of Array.isArray(searchResult) ? searchResult : []) {
      for (const id of group.result || []) {
        idSet.add(String(id))
        if (idSet.size >= 20) break
      }
      if (idSet.size >= 20) break
    }
    const results: LIST_POST_ITEM[] = Array.from(idSet)
      .map(id => documents!.get(id))
      .filter(Boolean) as LIST_POST_ITEM[]

    return Response.json({ q, results })
  } catch (error) {
    console.error('搜索接口错误:', error)
    return Response.json({ error: 'Failed to search' }, { status: 500 })
  }
}


