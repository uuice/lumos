// 主题切换功能
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'auto'
    this.init()
  }

  init() {
    this.applyTheme()
    this.bindEvents()
  }

  applyTheme() {
    const isDark = this.theme === 'dark' ||
      (this.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)

    document.documentElement.classList.toggle('dark', isDark)
  }

  setTheme(theme) {
    this.theme = theme
    localStorage.setItem('theme', theme)
    this.applyTheme()
  }

  bindEvents() {
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.theme === 'auto') {
        this.applyTheme()
      }
    })

    // 主题切换按钮
    const themeToggle = document.getElementById('theme-toggle')
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const newTheme = this.theme === 'dark' ? 'light' : 'dark'
        this.setTheme(newTheme)
      })
    }
  }
}

// TOC 滚动高亮功能
class TOCManager {
  constructor() {
    this.tocLinks = document.querySelectorAll('.toc a')
    this.sections = Array.from(this.tocLinks).map(link => {
      const id = link.getAttribute('href')?.substring(1)
      return id ? document.getElementById(id) : null
    }).filter(Boolean)

    this.init()
  }

  init() {
    if (this.sections.length === 0) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setActiveSection(entry.target.id)
        }
      })
    }, {
      rootMargin: '-20% 0% -35% 0%'
    })

    this.sections.forEach(section => observer.observe(section))
  }

  setActiveSection(activeId) {
    this.tocLinks.forEach(link => {
      const href = link.getAttribute('href')?.substring(1)
      link.classList.toggle('active', href === activeId)
    })
  }
}

// 复制代码功能
class CodeCopyManager {
  constructor() {
    this.init()
  }

  init() {
    const codeBlocks = document.querySelectorAll('pre code')
    codeBlocks.forEach(block => {
      const button = this.createCopyButton()
      block.parentElement?.appendChild(button)

      button.addEventListener('click', () => {
        this.copyCode(block, button)
      })
    })
  }

  createCopyButton() {
    const button = document.createElement('button')
    button.className = 'absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity'
    button.innerHTML = '复制'
    return button
  }

  async copyCode(codeElement, button) {
    const code = codeElement.textContent || ''

    try {
      await navigator.clipboard.writeText(code)
      button.innerHTML = '已复制'
      setTimeout(() => {
        button.innerHTML = '复制'
      }, 2000)
    } catch (err) {
      console.error('复制失败:', err)
      button.innerHTML = '复制失败'
      setTimeout(() => {
        button.innerHTML = '复制'
      }, 2000)
    }
  }
}

// 搜索功能
class SearchManager {
  constructor() {
    this.searchInput = document.getElementById('search-input')
    this.searchResults = document.getElementById('search-results')
    this.init()
  }

  init() {
    if (!this.searchInput) return

    let debounceTimer
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        this.search(e.target.value)
      }, 300)
    })
  }

  async search(query) {
    if (!query.trim()) {
      this.hideResults()
      return
    }

    try {
      // 这里可以实现实际的搜索逻辑
      // 可以搜索 data.json 中的内容
      const results = await this.performSearch(query)
      this.showResults(results)
    } catch (err) {
      console.error('搜索失败:', err)
    }
  }

  async performSearch(query) {
    // 简单的客户端搜索实现
    // 在实际项目中，可以连接到后端搜索接口
    return []
  }

  showResults(results) {
    if (!this.searchResults) return

    if (results.length === 0) {
      this.searchResults.innerHTML = '<div class="p-4 text-gray-500">没有找到相关内容</div>'
    } else {
      this.searchResults.innerHTML = results.map(result => `
        <a href="${result.url}" class="block p-4 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h3 class="font-medium text-gray-900 dark:text-gray-100">${result.title}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${result.excerpt}</p>
        </a>
      `).join('')
    }

    this.searchResults.classList.remove('hidden')
  }

  hideResults() {
    if (this.searchResults) {
      this.searchResults.classList.add('hidden')
    }
  }
}

// 图片懒加载
class LazyLoadManager {
  constructor() {
    this.init()
  }

  init() {
    const images = document.querySelectorAll('img[data-src]')
    if (images.length === 0) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target)
          observer.unobserve(entry.target)
        }
      })
    })

    images.forEach(img => observer.observe(img))
  }

  loadImage(img) {
    const src = img.getAttribute('data-src')
    if (src) {
      img.src = src
      img.removeAttribute('data-src')
      img.classList.add('fade-in')
    }
  }
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager()
  new TOCManager()
  new CodeCopyManager()
  new SearchManager()
  new LazyLoadManager()
})

// 导出类以便在其他地方使用
window.LumosJS = {
  ThemeManager,
  TOCManager,
  CodeCopyManager,
  SearchManager,
  LazyLoadManager
}
