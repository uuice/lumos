import { Plugin } from '../src/types.ts'

/**
 * Markdown路径转换插件
 * 该插件会在页面渲染时自动查找并转换.md文件路径
 * 将所有.md结尾的<a>标签路径统一转换为 pages/文件名 格式
 * 仅修改 <a> 标签中的路径，不修改其他标签中的内容
 * 不处理外部链接
 */
const mdPathTransformPlugin: Plugin = {
  name: 'md-path-transform-plugin',
  version: '1.0.0',
  description: 'Markdown路径转换插件，在渲染时自动转换.md文件路径，仅修改<a>标签',

  // 在渲染时执行，查找并转换HTML中的.md文件路径
  async onRender(html: string, _data: any) {
    console.log('🔄 MD路径转换插件: 开始转换页面中的.md文件路径')

    // 使用正则表达式匹配所有<a>标签中的.md文件路径
    // 匹配 <a> 标签中 href 属性的 .md 文件路径
    const mdLinkRegex = /<a([^>]*?)href=(["'])([^"']*?)\.md(\?[^"']*?)?\2([^>]*?)>/g

    // 替换函数，将所有.md路径统一转换为 pages/文件名 格式
    const transformedHtml = html.replace(mdLinkRegex, (match, beforeHref, quote, path, query, afterHref) => {
      // 检查是否为外部链接（包含协议）
      if (path.startsWith('http://') || path.startsWith('https://')) {
        // 对于外部链接，不进行处理，直接返回原链接
        console.log(`🔄 MD路径转换插件: 跳过外部链接 "${path}.md"`)
        return match
      }

      // 获取文件名（路径中最后的部分）
      const filename = path.split('/').pop()?.toLowerCase();

      // 对于内部链接，统一转换为 pages/文件名 格式
      const newPath = `/pages/${filename}${query || ''}`;
      const newLink = `<a${beforeHref}href=${quote}${newPath}${quote}${afterHref}>`
      console.log(`🔄 MD路径转换插件: 转换链接 "${path}.md" -> "${newPath}"`)
      return newLink
    })

    console.log('✅ MD路径转换插件: 页面路径转换完成')
    return transformedHtml
  }
}

export default mdPathTransformPlugin
