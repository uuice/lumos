import { join } from 'path'
import { Plugin, PluginConfig } from './types.ts'
import { readdir, stat } from 'fs/promises'

export class PluginManager {
  private plugins: Plugin[] = []
  private pluginConfigs: PluginConfig = {}
  private basePath: string

  constructor(basePath: string) {
    this.basePath = basePath
  }

  // 加载插件配置
  async loadPluginConfig(): Promise<void> {
    try {
      const configPath = join(this.basePath, 'lumos.config.json')
      const configFile = Bun.file(configPath)

      if (await configFile.exists()) {
        const configContent = await configFile.text()
        const config = JSON.parse(configContent)
        this.pluginConfigs = config.plugins || {}
      }
    } catch (error) {
      console.warn('警告: 无法加载插件配置:', error)
    }
  }

  // 加载插件
  async loadPlugins(): Promise<void> {
    try {
      const pluginsDir = join(this.basePath, 'plugins')

      // 检查插件目录是否存在
      try {
        const stats = await stat(pluginsDir)
        if (!stats.isDirectory()) {
          console.log('🔌 插件目录不存在，跳过插件加载')
          return
        }
      } catch {
        console.log('🔌 插件目录不存在，跳过插件加载')
        return
      }

      const entries = await readdir(pluginsDir, { withFileTypes: true })

      for (const entry of entries) {
        if (entry.isFile() && entry.name.endsWith('.ts')) {
          await this.loadPlugin(join(pluginsDir, entry.name))
        }
      }

      console.log(`🔌 已加载 ${this.plugins.length} 个插件`)
    } catch (error) {
      console.warn('警告: 加载插件时出错:', error)
    }
  }

  // 加载单个插件
  private async loadPlugin(pluginPath: string): Promise<void> {
    try {
      console.log(`🔌 尝试加载插件: ${pluginPath}`)
      const pluginModule = await import(pluginPath)
      const plugin: Plugin = pluginModule.default || pluginModule

      if (plugin && typeof plugin === 'object' && plugin.name) {
        // 检查插件是否启用
        const config = this.pluginConfigs[plugin.name]
        if (config && config.enabled === false) {
          console.log(`🔌 插件 ${plugin.name} 已禁用`)
          return
        }

        this.plugins.push(plugin)
        console.log(`🔌 成功加载插件: ${plugin.name}`)
      } else {
        console.log(`🔌 文件 ${pluginPath} 不是有效的插件`)
      }
    } catch (error) {
      console.warn(`警告: 无法加载插件 ${pluginPath}:`, error)
    }
  }

  // 获取所有插件
  getPlugins(): Plugin[] {
    return this.plugins
  }

  // 执行生成开始钩子
  async executeGenerateStart(generator: any): Promise<void> {
    for (const plugin of this.plugins) {
      if (plugin.onGenerateStart) {
        try {
          await plugin.onGenerateStart(generator)
        } catch (error) {
          console.warn(`警告: 插件 ${plugin.name} 的 onGenerateStart 钩子执行失败:`, error)
        }
      }
    }
  }

  // 执行生成结束钩子
  async executeGenerateEnd(data: any): Promise<any> {
    let result = data
    for (const plugin of this.plugins) {
      if (plugin.onGenerateEnd) {
        try {
          result = await plugin.onGenerateEnd(result) || result
        } catch (error) {
          console.warn(`警告: 插件 ${plugin.name} 的 onGenerateEnd 钩子执行失败:`, error)
        }
      }
    }
    return result
  }

  // 执行文件解析钩子
  async executeParseFile(filePath: string, content: string, type: 'post' | 'page' | 'author'): Promise<string> {
    let result = content
    for (const plugin of this.plugins) {
      if (plugin.onParseFile) {
        try {
          result = await plugin.onParseFile(filePath, result, type) || result
        } catch (error) {
          console.warn(`警告: 插件 ${plugin.name} 的 onParseFile 钩子执行失败:`, error)
        }
      }
    }
    return result
  }

  // 执行渲染钩子
  async executeRender(html: string, data: any): Promise<string> {
    let result = html
    for (const plugin of this.plugins) {
      if (plugin.onRender) {
        try {
          result = await plugin.onRender(result, data) || result
        } catch (error) {
          console.warn(`警告: 插件 ${plugin.name} 的 onRender 钩子执行失败:`, error)
        }
      }
    }
    return result
  }

  // 执行服务器启动钩子
  async executeServerStart(server: any): Promise<void> {
    for (const plugin of this.plugins) {
      if (plugin.onServerStart) {
        try {
          await plugin.onServerStart(server)
        } catch (error) {
          console.warn(`警告: 插件 ${plugin.name} 的 onServerStart 钩子执行失败:`, error)
        }
      }
    }
  }
}
