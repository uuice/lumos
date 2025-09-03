import { Plugin, POST } from '../src/types.ts'

/**
 * 字数统计插件
 * 该插件会在文章生成时自动计算并添加字数统计信息
 */
const wordCountPlugin: Plugin = {
  name: 'word-count-plugin',
  version: '1.0.0',
  description: '字数统计插件，自动为文章添加字数统计信息',

  // 在生成结束时执行，为文章添加字数统计
  async onGenerateEnd(data) {
    console.log('📝 字数统计插件: 开始处理文章字数统计')
    console.log(`📝 字数统计插件: 当前共有 ${data.posts.length} 篇文章`)

    // 为每篇文章计算字数
    const postsWithWordCount = data.posts.map((post: POST) => {
      // 移除HTML标签并计算字数
      const cleanContent = post.mdContent.replace(/<[^>]*>/g, '')
      const wordCount = cleanContent.length

      // 添加字数统计字段
      const updatedPost = {
        ...post,
        wordCount: wordCount,
        readingTime: Math.ceil(wordCount / 200) // 假设每分钟阅读200字
      }

      console.log(`📝 字数统计插件: 文章 "${post.title}" 字数统计: ${wordCount}, 阅读时间: ${updatedPost.readingTime} 分钟`)

      return updatedPost
    })

    console.log(`✅ 字数统计插件: 处理完成，共处理 ${postsWithWordCount.length} 篇文章`)

    // 返回修改后的数据
    return {
      ...data,
      posts: postsWithWordCount
    }
  },

  // 在渲染时添加字数统计信息到页面
  async onRender(html, _data) {
    // 这里可以修改HTML，在文章页面添加字数统计显示
    // 为了简化示例，我们只是记录日志
    console.log('🖥️ 字数统计插件: 页面渲染完成')
    return html
  }
}

export default wordCountPlugin
