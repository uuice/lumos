import { join } from 'path'
import { stat } from 'fs/promises'

export interface ThemeConfig {
  name: string
  path: string
  components: {
    layout: string
  }
  routes: string
  assets: string
}

export class ThemeManager {
  private basePath: string
  private themeName: string
  private themeConfig: ThemeConfig | null = null

  constructor(basePath: string, themeName: string = 'default') {
    this.basePath = basePath
    this.themeName = themeName
  }

  // 加载主题配置
  async loadThemeConfig(): Promise<void> {
    try {
      const configPath = join(this.basePath, 'lumos.config.json')
      const configFile = Bun.file(configPath)

      if (await configFile.exists()) {
        const configContent = await configFile.text()
        const config = JSON.parse(configContent)
        this.themeName = config.theme || 'default'
      }
    } catch (error) {
      console.warn('警告: 无法加载主题配置，使用默认主题:', error)
      this.themeName = 'default'
    }

    // 设置主题路径
    const themePath = join(this.basePath, 'themes', this.themeName)

    try {
      const stats = await stat(themePath)
      if (!stats.isDirectory()) {
        throw new Error(`主题目录不存在: ${themePath}`)
      }
    } catch {
      throw new Error(`主题目录不存在: ${themePath}`)
    }

    this.themeConfig = {
      name: this.themeName,
      path: themePath,
      components: {
        layout: join(themePath, 'components', 'Layout.tsx')
      },
      routes: join(themePath, 'routes'),
      assets: join(themePath, 'assets')
    }

    console.log(`🎨 主题加载成功: ${this.themeName}`)
  }

  // 获取主题配置
  getThemeConfig(): ThemeConfig {
    if (!this.themeConfig) {
      throw new Error('主题尚未加载，请先调用 loadThemeConfig()')
    }
    return this.themeConfig
  }

  // 获取主题路径
  getThemePath(): string {
    if (!this.themeConfig) {
      throw new Error('主题尚未加载，请先调用 loadThemeConfig()')
    }
    return this.themeConfig.path
  }

  // 获取组件路径
  getComponentsPath(): string {
    if (!this.themeConfig) {
      throw new Error('主题尚未加载，请先调用 loadThemeConfig()')
    }
    return join(this.themeConfig.path, 'components')
  }

  // 获取路由路径
  getRoutesPath(): string {
    if (!this.themeConfig) {
      throw new Error('主题尚未加载，请先调用 loadThemeConfig()')
    }
    return this.themeConfig.routes
  }

  // 获取资源路径
  getAssetsPath(): string {
    if (!this.themeConfig) {
      throw new Error('主题尚未加载，请先调用 loadThemeConfig()')
    }
    return this.themeConfig.assets
  }

  // 获取布局组件路径
  getLayoutComponentPath(): string {
    if (!this.themeConfig) {
      throw new Error('主题尚未加载，请先调用 loadThemeConfig()')
    }
    return this.themeConfig.components.layout
  }

  // 获取主题名称
  getThemeName(): string {
    return this.themeName
  }
}
