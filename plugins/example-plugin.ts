import { Plugin } from '../src/types.ts'

const examplePlugin: Plugin = {
  name: 'example-plugin',
  version: '1.0.0',
  description: '示例插件，演示插件系统的基本用法',

  // 在生成开始时执行
  async onGenerateStart(generator) {
    console.log('📝 示例插件: 开始生成数据')
  },

  // 在生成结束时执行，可以修改最终数据
  async onGenerateEnd(data) {
    console.log('✅ 示例插件: 数据生成完成')
    // 可以在这里修改数据结构
    return data
  },

  // 在解析文件时执行，可以修改文件内容
  async onParseFile(filePath, content, type) {
    console.log(`📄 示例插件: 解析文件 ${filePath} (类型: ${type})`)
    // 可以在这里修改文件内容
    return content
  },

  // 在渲染时执行，可以修改 HTML 输出
  async onRender(html, data) {
    console.log('🖥️ 示例插件: 渲染页面')
    // 可以在这里修改 HTML 输出
    return html
  },

  // 在服务器启动时执行
  async onServerStart(server) {
    console.log('🚀 示例插件: 服务器启动')
  }
}

export default examplePlugin
