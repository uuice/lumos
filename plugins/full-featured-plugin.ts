import { Plugin } from '../src/types.ts'

/**
 * 完整功能插件
 * 该插件演示了所有可用的插件钩子
 */
const fullFeaturedPlugin: Plugin = {
  name: 'full-featured-plugin',
  version: '1.0.0',
  description: '完整功能插件，演示所有可用的插件钩子',

  // 在生成开始时执行
  async onGenerateStart(_generator) {
    console.log('🔧 完整功能插件: 数据生成开始')
  },

  // 在生成结束时执行，可以修改最终数据
  async onGenerateEnd(data) {
    console.log('✅ 完整功能插件: 数据生成完成')
    // 可以在这里修改数据结构
    return data
  },

  // 在解析文件时执行，可以修改文件内容
  async onParseFile(filePath, content, type) {
    console.log(`📄 完整功能插件: 解析文件 ${filePath} (类型: ${type})`)
    // 可以在这里修改文件内容
    return content
  },

  // 在渲染时执行，可以修改 HTML 输出
  async onRender(html, _data) {
    console.log('🖥️ 完整功能插件: 页面渲染')
    // 可以在这里修改 HTML 输出
    return html
  },

  // 在服务器启动时执行
  async onServerStart(_server) {
    console.log('🚀 完整功能插件: 服务器启动')
  }
}

export default fullFeaturedPlugin
