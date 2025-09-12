// @ts-ignore
import * as React from 'react'
import { createRoot } from 'react-dom/client'
// 添加样式
const tooltipStyle = `
  /* 导航样式 */
  .website-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .website-container h1 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
  }

  .category-section {
    margin-bottom: 40px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }

  .category-header {
    border-bottom: 2px solid #eee;
    padding-bottom: 15px;
    margin-bottom: 20px;
  }

  .category-title {
    font-size: 24px;
    margin-bottom: 10px;
    color: #444;
  }

  .category-description {
    color: #666;
    font-size: 16px;
  }

  .website-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .website-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    transition: all 0.3s ease;
    border: 1px solid #e9ecef;
  }

  .website-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .website-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .website-icon {
    font-size: 24px;
    margin-right: 10px;
  }

  .website-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    text-decoration: none;
  }

  .website-title:hover {
    color: #007bff;
  }

  .website-description {
    color: #666;
    margin-bottom: 15px;
    font-size: 14px;
    line-height: 1.5;
  }

  .website-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .website-tag {
    background-color: #e9ecef;
    color: #495057;
    border-radius: 12px;
    padding: 3px 10px;
    font-size: 12px;
  }

  .search-container {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  .search-input {
    width: 100%;
    max-width: 500px;
    padding: 12px 20px;
    border: 2px solid #e9ecef;
    border-radius: 25px;
    font-size: 16px;
    transition: all 0.3s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  .loading, .error, .no-data {
    text-align: center;
    padding: 50px;
    font-size: 18px;
  }

  .error {
    color: #e74c3c;
  }

  .loading {
    color: #3498db;
  }

  .no-results {
    text-align: center;
    padding: 30px;
    color: #666;
  }
`;

// 获取配置数据
const fetchConfigData = async () => {
  try {
    // 使用新的通用API，指定获取navigationWebsiteDataJsonConfig配置
    const response = await fetch('/api/configs/navigationWebsiteDataJsonConfig')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    // 从新的响应格式中提取数据
    return result.data || { categories: [] }
  } catch (error) {
    console.error('获取配置数据失败:', error)
    return { categories: [] }
  }
}

// 定义类型
interface Website {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  websites: Website[];
}

interface ConfigData {
  categories: Category[];
}

// 网站导航组件
const WebsiteNavigation: React.FC = () => {
  const [configData, setConfigData] = React.useState<ConfigData>({ categories: [] })
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)
  const [searchTerm, setSearchTerm] = React.useState<string>('')

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const result = await fetchConfigData()
        setConfigData(result)
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

  // 搜索过滤
  const filteredData = React.useMemo(() => {
    if (!searchTerm.trim()) {
      return configData.categories || []
    }

    const term = searchTerm.toLowerCase()
    return (configData.categories || []).map((category: Category) => {
      const filteredWebsites = category.websites.filter((website: Website) => 
        website.title.toLowerCase().includes(term) ||
        website.description.toLowerCase().includes(term) ||
        website.tags.some((tag: string) => tag.toLowerCase().includes(term))
      )
      
      return {
        ...category,
        websites: filteredWebsites
      }
    }).filter((category: Category) => category.websites.length > 0)
  }, [configData, searchTerm])

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  if (error) {
    return <div className="error">错误: {error}</div>
  }

  return (
    <div className="website-container">
      <h1>网站导航</h1>
      
      {/* 搜索框 */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="搜索网站名称、描述或标签..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 网站分类展示 */}
      {filteredData.length > 0 ? (
        filteredData.map((category: Category) => (
          <section key={category.id} className="category-section">
            <div className="category-header">
              <h2 className="category-title">{category.name}</h2>
              <p className="category-description">{category.description}</p>
            </div>
            <div className="website-grid">
              {category.websites.map((website: Website) => (
                <div key={website.id} className="website-card">
                  <div className="website-header">
                    <span className="website-icon">{website.icon}</span>
                    <a href={website.url} target="_blank" rel="noopener noreferrer" className="website-title">
                      {website.title}
                    </a>
                  </div>
                  <p className="website-description">{website.description}</p>
                  <div className="website-tags">
                    {website.tags.map((tag: string, index: number) => (
                      <span key={index} className="website-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="no-results">
          <p>没有找到匹配的网站</p>
        </div>
      )}
    </div>
  )
}

// 渲染组件
const root = document.getElementById('root')
if (root) {
  const reactRoot = createRoot(root)
  reactRoot.render(<WebsiteNavigation />)
}