#!/usr/bin/env bun

import { newCommand } from './commands/new.ts'
import { DataGenerator } from './generator.ts'
import { LumosServer } from './server.ts'
import { join } from 'path'
import { ensureAssetsDir } from './utils.ts'

interface CLIOptions {
  [key: string]: string | boolean | number | undefined
}

async function parseArgs(args: string[]): Promise<{ command: string; subcommand?: string; args: string[]; options: CLIOptions }> {
  const result = {
    command: '',
    subcommand: undefined as string | undefined,
    args: [] as string[],
    options: {} as CLIOptions
  }

  let i = 0
  while (i < args.length) {
    const arg = args[i]

    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=', 2)
      result.options[key] = value !== undefined ? value : true
    } else if (arg.startsWith('-')) {
      const key = arg.slice(1)
      if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
        result.options[key] = args[++i]
      } else {
        result.options[key] = true
      }
    } else {
      if (!result.command) {
        result.command = arg
      } else if (!result.subcommand && ['post', 'page', 'author'].includes(arg)) {
        result.subcommand = arg
      } else {
        result.args.push(arg)
      }
    }
    i++
  }

  return result
}

function showHelp() {
  console.log(`
Lumos - 基于 Bun 的静态博客生成器

用法:
  lumos <command> [options]

命令:
  gen                     生成 data.json 数据文件
  server                  启动开发服务器
  build                   构建项目 (生成数据 + 处理资源)
  assets                  处理资源文件
  new <type> <title>      创建新的文章、页面或作者
    类型: post, page, author
    选项:
      -p, --path <path>   指定子目录路径
  help                    显示帮助信息

选项:
  -p, --port <port>       服务器端口 (默认: 3000)
  -w, --watch             监听文件变化
  -h, --help              显示帮助信息
  -v, --version           显示版本信息

示例:
  lumos gen               # 生成数据文件
  lumos build             # 构建项目
  lumos assets            # 处理资源文件
  lumos server            # 启动服务器
  lumos server -p 8080    # 在端口 8080 启动服务器
  lumos server -w         # 启动服务器并监听文件变化
  lumos new post "Hello World"
  lumos new page "About Me" -p "info"
  lumos new author "John Doe"
  `)
}

function showVersion() {
  console.log('Lumos CLI v1.0.0')
}

// 生成数据命令
async function generateCommand() {
  try {
    console.log('🔄 开始生成数据...')

    const generator = new DataGenerator(process.cwd())
    await generator.saveData('data.json')

    console.log('✅ 数据生成完成!')
  } catch (error) {
    console.error('❌ 生成数据失败:', error)
    process.exit(1)
  }
}

// 资源处理命令
async function assetsCommand() {
  try {
    console.log('🎨 开始处理资源文件...')

    await ensureAssetsDir(process.cwd())

    console.log('✅ 资源文件处理完成!')
  } catch (error) {
    console.error('❌ 处理资源文件失败:', error)
    process.exit(1)
  }
}

// 构建命令
async function buildCommand() {
  try {
    console.log('🔨 开始构建项目...')

    // 1. 生成数据
    await generateCommand()

    // 2. 处理资源
    await assetsCommand()

    console.log('✅ 项目构建完成!')
    console.log('📊 数据文件: data.json')
    console.log('🎨 静态资源: /assets/*')
  } catch (error) {
    console.error('❌ 项目构建失败:', error)
    process.exit(1)
  }
}
async function serverCommand(options: CLIOptions) {
  const port = parseInt((options.port || options.p || '3000') as string)
  const dataPath = join(process.cwd(), 'data.json')

  try {
    // 检查 data.json 是否存在，不存在则先生成
    const dataFile = Bun.file(dataPath)
    const exists = await dataFile.exists()

    if (!exists) {
      console.log('📄 data.json 不存在，正在生成...')
      await generateCommand()
    }

    // 启动服务器
    const server = new LumosServer({ port, dataPath })

    if (options.watch || options.w) {
      // 监听文件变化
      console.log('👀 监听模式已启用')

      // 使用 Bun 的文件监听 API
      const { watch } = await import('fs')

      const watchDirs = ['source/_posts', 'source/_pages', 'source/_authors', 'source/_jsons', 'source/_ymls']

      for (const dir of watchDirs) {
        try {
          const watcher = watch(dir, { recursive: true }, async (eventType, filename) => {
            if (filename) {
              console.log(`📝 检测到文件变化: ${dir}/${filename}`)
              console.log('🔄 重新生成数据...')

              try {
                await generateCommand()
                await server.loadData()
                console.log('✅ 数据已更新')
              } catch (error) {
                console.error('❌ 更新数据失败:', error)
              }
            }
          })

          // 处理错误
          watcher.on('error', (error) => {
            console.warn(`监听目录 ${dir} 失败:`, error)
          })
        } catch (error) {
          console.warn(`无法监听目录 ${dir}:`, error)
        }
      }
    }

    await server.start()

  } catch (error) {
    console.error('❌ 启动服务器失败:', error)
    process.exit(1)
  }
}

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    showHelp()
    return
  }

  const { command, subcommand, args: restArgs, options } = await parseArgs(args)

  if (options.help || options.h) {
    showHelp()
    return
  }

  if (options.version || options.v) {
    showVersion()
    return
  }

  try {
    switch (command) {
      case 'gen':
      case 'generate':
        await generateCommand()
        break

      case 'server':
      case 'serve':
        await serverCommand(options)
        break

      case 'build':
        await buildCommand()
        break

      case 'assets':
        await assetsCommand()
        break

      case 'new': {
        if (!subcommand || restArgs.length === 0) {
          console.error('❌ Error: Type and title are required for new command')
          console.log('Usage: lumos new <type> <title> [options]')
          console.log('Types: post, page, author')
          process.exit(1)
        }

        const title = restArgs[0]
        const newOptions = {
          path: (options.path || options.p) as string
        }

        await newCommand(subcommand, title, newOptions)
        break
      }

      case 'help':
        showHelp()
        break

      default:
        console.error(`❌ 未知命令: ${command}`)
        showHelp()
        process.exit(1)
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error(`❌ Error: ${errorMessage}`)
    process.exit(1)
  }
}

if (import.meta.main) {
  main().catch((error) => {
    console.error('❌ 程序执行失败:', error)
    process.exit(1)
  })
}

export { main, newCommand }
