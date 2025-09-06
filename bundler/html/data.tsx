// @ts-ignore
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import _ from 'lodash'
import './data.css'

// 获取数据
const fetchData = async () => {
  try {
    const response = await fetch('/api/data')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('获取数据失败:', error)
    return null
  }
}

// 获取构建页面列表
const fetchDistPages = async () => {
  try {
    const response = await fetch('/api/dist-pages')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('获取构建页面列表失败:', error)
    return []
  }
}

// 数据展示组件
const ShowDataPage: React.FC = () => {
  const [data, setData] = React.useState<any>(null)
  const [distPages, setDistPages] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const result = await fetchData()
        if (result) {
          setData(result)
        } else {
          setError('无法获取数据')
        }

        // 获取构建后的页面列表
        const pages = await fetchDistPages()
        setDistPages(pages)
      } catch (err) {
        setError('加载数据时发生错误')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  if (error) {
    return <div className="error">错误: {error}</div>
  }

  if (!data) {
    return <div className="no-data">没有数据可显示</div>
  }

  return (
    <div className="show-container">
      <h1>数据展示</h1>

      {/* 文章数据展示 */}
      <section>
        <h2>文章列表 ({data.posts?.length || 0})</h2>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>标题</th>
                <th>分类</th>
                <th>标签</th>
                <th>URL</th>
                <th>发布时间</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {data.posts?.map((post: any) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.categories?.join(', ') || '-'}</td>
                  <td>{post.tags?.join(', ') || '-'}</td>
                  <td>{post.url || '-'}</td>
                  <td>{post.date ? new Date(post.date).toLocaleDateString() : '-'}</td>
                  <td>{post.published ? '已发布' : '草稿'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 页面数据展示 */}
      <section>
        <h2>页面列表 ({data.pages?.length || 0})</h2>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>标题</th>
                <th>URL</th>
                <th>发布时间</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {data.pages?.map((page: any) => (
                <tr key={page.id}>
                  <td>{page.title}</td>
                  <td>{page.url || '-'}</td>
                  <td>{page.date ? new Date(page.date).toLocaleDateString() : '-'}</td>
                  <td>{page.published ? '已发布' : '草稿'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 作者数据展示 */}
      <section>
        <h2>作者列表 ({data.authors?.length || 0})</h2>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>名称</th>
                <th>URL</th>
                <th>文章数</th>
                <th>类型</th>
              </tr>
            </thead>
            <tbody>
              {data.authors?.map((author: any) => {
                const postCount = data.posts?.filter((post: any) =>
                  post.authorIds?.includes(author.id)
                ).length || 0
                return (
                  <tr key={author.id}>
                    <td>{author.title}</td>
                    <td>{author.url || '-'}</td>
                    <td>{postCount}</td>
                    <td>{author.isDefault ? '默认作者' : '普通作者'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 分类数据展示 */}
      <section>
        <h2>分类列表 ({data.categories?.length || 0})</h2>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>名称</th>
                <th>URL</th>
                <th>文章数</th>
              </tr>
            </thead>
            <tbody>
              {data.categories?.map((category: any) => {
                const postCount = data.posts?.filter((post: any) =>
                  post.categories?.includes(category.title)
                ).length || 0
                return (
                  <tr key={category.id}>
                    <td>{category.title}</td>
                    <td>{category.url || '-'}</td>
                    <td>{postCount}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 标签数据展示 */}
      <section>
        <h2>标签列表 ({data.tags?.length || 0})</h2>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>名称</th>
                <th>URL</th>
                <th>文章数</th>
              </tr>
            </thead>
            <tbody>
              {data.tags?.map((tag: any) => {
                const postCount = data.posts?.filter((post: any) =>
                  post.tags?.includes(tag.title)
                ).length || 0
                return (
                  <tr key={tag.id}>
                    <td>{tag.title}</td>
                    <td>{tag.url || '-'}</td>
                    <td>{postCount}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 构建页面列表展示 */}
      <section>
        <h2>构建页面列表 ({distPages.length || 0})</h2>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>页面路径</th>
                <th>访问链接</th>
              </tr>
            </thead>
            <tbody>
              {distPages.length > 0 ? (
                distPages.map((page: any, index: number) => (
                  <tr key={index}>
                    <td>{page.path}</td>
                    <td>
                      <a href={page.url} target="_blank" rel="noopener noreferrer">
                        访问页面
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2}>暂无构建页面信息</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 配置数据展示 */}
      <section>
        <h2>配置信息</h2>
        <div className="config-data">
          <pre>{JSON.stringify(_.omit(data, ['posts', 'pages', 'authors', 'categories', 'tags']), null, 2)}</pre>
        </div>
      </section>
    </div>
  )
}

// 渲染组件
const root = document.getElementById('root')
if (root) {
  const reactRoot = createRoot(root)
  reactRoot.render(<ShowDataPage />)
}
