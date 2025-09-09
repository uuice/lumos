import { LumosServer } from './server'
import { join } from 'path'

async function startServer() {
  const port = parseInt(process.env.PORT || '3060')
  const dataPath = process.env.DATA_PATH || join(process.cwd(), 'data.json')

  const server = new LumosServer({ port, dataPath })

  // 监听 SIGUSR1 信号来重新加载数据
  process.on('SIGUSR1', async () => {
    console.log('🔄 收到重新加载数据信号')
    try {
      await server.loadData()
      console.log('✅ 数据已重新加载')
    } catch (error) {
      console.error('❌ 重新加载数据失败:', error)
    }
  })

  // 监听退出信号
  const signals = ['SIGINT', 'SIGTERM']
  for (const signal of signals) {
    process.on(signal, async () => {
      console.log(`收到信号 ${signal}，正在关闭子进程服务器...`)
      try {
        await server.stop()
        console.log('子进程服务器已关闭')
        process.exit(0)
      } catch (error) {
        console.error('关闭子进程服务器时出错:', error)
        process.exit(1)
      }
    })
  }

  await server.start()
  console.log('🚀 开发环境在子进程中启动，请勿关闭主进程')
  console.log(`🚀 子进程服务器已在端口 ${port} 启动`)
}

startServer().catch(error => {
  console.error('❌ 子进程启动服务器失败:', error)
  process.exit(1)
})
