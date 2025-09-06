// @ts-ignore
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import _ from 'lodash'
import './data.css'

// 添加样式
const tooltipStyle = `
  /* 导航样式 */
  .navigation {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 1000;
    max-height: 80vh;
    overflow-y: auto;
  }

  .nav-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;
  }

  .nav-item {
    display: block;
    padding: 8px 12px;
    margin: 5px 0;
    background-color: #f8f9fa;
    border-radius: 4px;
    text-decoration: none;
    color: #333;
    transition: all 0.2s;
  }

  .nav-item:hover {
    background-color: #007bff;
    color: white;
  }

  /* 内容区域样式 */
  .content-section {
    scroll-margin-top: 80px;
  }

  /* 模态框样式 */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  }

  .modal-content {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    width: 600px; /* 固定宽度 */
    max-width: 90%;
    max-height: 80%;
    overflow: auto;
    position: relative;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .modal-title {
    font-size: 18px;
    font-weight: bold;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .detail-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 12px;
  }

  .detail-button:hover {
    background-color: #0056b3;
  }

  .json-content {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    padding: 15px;
    font-family: monospace;
    white-space: pre-wrap;
    word-break: break-all;
    max-height: 500px;
    overflow: auto;
  }

  /* 返回顶部按钮 */
  .back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .back-to-top:hover {
    background-color: #0056b3;
  }
`;

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

// 动态获取API接口列表
const fetchApiRoutes = async () => {
  try {
    // 通过新的API路由接口获取所有API路由
    const response = await fetch('/api/routes');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const routesData = await response.json();

    // 转换API路由数据格式
    const apiRoutes = routesData.apiRoutes.map((route: any) => ({
      path: route.path,
      description: `${route.path} 接口`,
      filePath: route.filePath
    }));

    return apiRoutes;
  } catch (error) {
    console.error('获取API接口列表失败:', error)
    return []
  }
}

// 动态获取前台路由列表
const fetchFrontendRoutes = async () => {
  try {
    // 通过新的API路由接口获取所有前端路由
    const response = await fetch('/api/routes');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const routesData = await response.json();

    // 转换前端路由数据格式
    const frontendRoutes = routesData.frontendRoutes.map((route: any) => ({
      path: route.path,
      description: `${route.path} 页面`,
      filePath: route.filePath
    }));

    return frontendRoutes;
  } catch (error) {
    console.error('获取前台路由列表失败:', error)
    return []
  }
}

// 数据展示组件
const ShowDataPage: React.FC = () => {
  const [data, setData] = React.useState<any>(null)
  const [distPages, setDistPages] = React.useState<any[]>([])
  const [apiRoutes, setApiRoutes] = React.useState<any[]>([])
  const [frontendRoutes, setFrontendRoutes] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)
  // 添加模态框状态
  const [modalData, setModalData] = React.useState<any>(null)
  const [modalTitle, setModalTitle] = React.useState<string>('')

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

        // 获取API接口列表
        const apiRoutesData = await fetchApiRoutes()
        setApiRoutes(apiRoutesData)

        // 获取前台路由列表
        const frontendRoutesData = await fetchFrontendRoutes()
        setFrontendRoutes(frontendRoutesData)
      } catch (err) {
        setError('加载数据时发生错误')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // 添加样式到页面
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = tooltipStyle;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // 打开模态框
  const openModal = (data: any, title: string) => {
    setModalData(data)
    setModalTitle(title)
  }

  // 关闭模态框
  const closeModal = () => {
    setModalData(null)
    setModalTitle('')
  }

  // 滚动到指定元素
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // 返回顶部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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
      {/* 导航 */}
      <nav className="navigation">
        <div className="nav-title">数据导航</div>
        <a href="#posts" className="nav-item" onClick={(e) => { e.preventDefault(); scrollToSection('posts'); }}>文章列表</a>
        <a href="#pages" className="nav-item" onClick={(e) => { e.preventDefault(); scrollToSection('pages'); }}>页面列表</a>
        <a href="#authors" className="nav-item" onClick={(e) => { e.preventDefault(); scrollToSection('authors'); }}>作者列表</a>
        <a href="#categories" className="nav-item" onClick={(e) => { e.preventDefault(); scrollToSection('categories'); }}>分类列表</a>
        <a href="#tags" className="nav-item" onClick={(e) => { e.preventDefault(); scrollToSection('tags'); }}>标签列表</a>
        <a href="#dist-pages" className="nav-item" onClick={(e) => { e.preventDefault(); scrollToSection('dist-pages'); }}>构建页面列表</a>
        <a href="#api-routes" className="nav-item" onClick={(e) => { e.preventDefault(); scrollToSection('api-routes'); }}>API接口列表</a>
        <a href="#frontend-routes" className="nav-item" onClick={(e) => { e.preventDefault(); scrollToSection('frontend-routes'); }}>前台路由列表</a>
        <a href="#config" className="nav-item" onClick={(e) => { e.preventDefault(); scrollToSection('config'); }}>配置信息</a>
      </nav>

      <h1>数据展示</h1>

      {/* 文章数据展示 */}
      <section id="posts" className="content-section">
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
                <th>操作</th>
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
                  <td>
                    <button
                      className="detail-button"
                      onClick={() => openModal(post, `文章: ${post.title}`)}
                    >
                      详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 页面数据展示 */}
      <section id="pages" className="content-section">
        <h2>页面列表 ({data.pages?.length || 0})</h2>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>标题</th>
                <th>URL</th>
                <th>发布时间</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {data.pages?.map((page: any) => (
                <tr key={page.id}>
                  <td>{page.title}</td>
                  <td>{page.url || '-'}</td>
                  <td>{page.date ? new Date(page.date).toLocaleDateString() : '-'}</td>
                  <td>{page.published ? '已发布' : '草稿'}</td>
                  <td>
                    <button
                      className="detail-button"
                      onClick={() => openModal(page, `页面: ${page.title}`)}
                    >
                      详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 作者数据展示 */}
      <section id="authors" className="content-section">
        <h2>作者列表 ({data.authors?.length || 0})</h2>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>名称</th>
                <th>URL</th>
                <th>文章数</th>
                <th>类型</th>
                <th>操作</th>
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
                    <td>
                      <button
                        className="detail-button"
                        onClick={() => openModal(author, `作者: ${author.title}`)}
                      >
                        详情
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 分类数据展示 */}
      <section id="categories" className="content-section">
        <h2>分类列表 ({data.categories?.length || 0})</h2>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>名称</th>
                <th>URL</th>
                <th>文章数</th>
                <th>操作</th>
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
                    <td>
                      <button
                        className="detail-button"
                        onClick={() => openModal(category, `分类: ${category.title}`)}
                      >
                        详情
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 标签数据展示 */}
      <section id="tags" className="content-section">
        <h2>标签列表 ({data.tags?.length || 0})</h2>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>名称</th>
                <th>URL</th>
                <th>文章数</th>
                <th>操作</th>
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
                    <td>
                      <button
                        className="detail-button"
                        onClick={() => openModal(tag, `标签: ${tag.title}`)}
                      >
                        详情
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 构建页面列表展示 */}
      <section id="dist-pages" className="content-section">
        <h2>构建页面列表 ({distPages.length || 0})</h2>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>页面路径</th>
                <th>访问链接</th>
                <th>操作</th>
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
                    <td>
                      <button
                        className="detail-button"
                        onClick={() => openModal(page, `构建页面: ${page.path}`)}
                      >
                        详情
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>暂无构建页面信息</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* API接口列表展示 */}
      <section id="api-routes" className="content-section">
        <h2>API接口列表 ({apiRoutes.length || 0})</h2>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>路径</th>
                <th>描述</th>
                <th>文件路径</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {apiRoutes.map((route: any, index: number) => (
                <tr key={index}>
                  <td>{route.path}</td>
                  <td>{route.description}</td>
                  <td>{route.filePath}</td>
                  <td>
                    <button
                      className="detail-button"
                      onClick={() => openModal(route, `API接口: ${route.path}`)}
                    >
                      详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 前台路由列表展示 */}
      <section id="frontend-routes" className="content-section">
        <h2>前台路由列表 ({frontendRoutes.length || 0})</h2>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>路径</th>
                <th>描述</th>
                <th>文件路径</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {frontendRoutes.map((route: any, index: number) => (
                <tr key={index}>
                  <td>{route.path}</td>
                  <td>{route.description}</td>
                  <td>{route.filePath}</td>
                  <td>
                    <button
                      className="detail-button"
                      onClick={() => openModal(route, `前台路由: ${route.path}`)}
                    >
                      详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 配置数据展示 */}
      <section id="config" className="content-section">
        <h2>配置信息</h2>
        <div className="config-data">
          <pre>{JSON.stringify(_.omit(data, ['posts', 'pages', 'authors', 'categories', 'tags']), null, 2)}</pre>
        </div>
      </section>

      {/* 模态框 */}
      {modalData && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{modalTitle}</div>
              <button className="close-button" onClick={closeModal}>&times;</button>
            </div>
            <div className="json-content">
              {JSON.stringify(modalData, null, 2)}
            </div>
          </div>
        </div>
      )}

      {/* 返回顶部按钮 */}
      <button className="back-to-top" onClick={scrollToTop}>
        ↑
      </button>
    </div>
  )
}

// 渲染组件
const root = document.getElementById('root')
if (root) {
  const reactRoot = createRoot(root)
  reactRoot.render(<ShowDataPage />)
}
