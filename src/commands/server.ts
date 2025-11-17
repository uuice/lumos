import { join } from 'node:path'
import { genCommand } from './gen.ts'

interface CLIOptions {
  [key: string]: string | boolean | number | undefined
}
export async function serverCommand(options: CLIOptions) {
  const port = parseInt((options.port || options.p || '3060') as string)
  const dataPath = join(process.cwd(), 'data.json')

  try {
    // 检查 data.json 是否存在，不存在则先生成
    const dataFile = Bun.file(dataPath)
    const exists = await dataFile.exists()

    if (!exists) {
      console.log('📄 data.json 不存在，正在生成...')
      await genCommand()
    }

    // 判断是否为开发模式（启用监听模式）
    const isDevMode = options.watch || options.w;

    if (isDevMode) {
      // 开发模式使用子进程管理
      await runServerInDevMode(port, dataPath);
    } else {
      // 生产模式直接运行服务器
      await runServerInProductionMode(port, dataPath);
    }
  } catch (error) {
    console.error('❌ 启动服务器失败:', error)
    process.exit(1)
  }
}

async function runServerInProductionMode(port: number, dataPath: string) {
  const { LumosServer } = await import('../server.ts');

  // 直接运行服务器，不使用子进程
  const server = new LumosServer({ port, dataPath });
  await server.start();

  // 监听进程退出信号，确保服务器正确关闭
  const signals = ['SIGINT', 'SIGTERM', 'SIGUSR1', 'SIGUSR2'];
  for (const signal of signals) {
    process.on(signal, async () => {
      console.log(`收到信号 ${signal}，正在关闭服务器...`);
      try {
        await server.stop();
        console.log('服务器已关闭');
        process.exit(0);
      } catch (error) {
        console.error('关闭服务器时出错:', error);
        process.exit(1);
      }
    });
  }
}

async function runServerInDevMode(port: number, dataPath: string) {
  // 声明变量
  let serverProcess: any;
  let watchers: any[] = [];

  // 检查端口是否被占用的函数
  const isPortInUse = async (port: number): Promise<boolean> => {
    try {
      // 尝试创建一个服务器来检查端口是否可用
      const server = Bun.serve({
        port,
        fetch: () => new Response('test')
      });
      // 如果成功创建服务器，说明端口未被占用，关闭服务器
      server.stop();
      return false;
    } catch (_error: unknown) {
      // 如果端口被占用，会抛出错误
      // 记录错误信息以便调试
      console.error(`端口检查失败: ${_error instanceof Error ? _error.message : String(_error)}`);
      return true;
    }
  };

  // 杀死占用指定端口的进程
  const killPortProcess = async (port: number): Promise<void> => {
    try {
      // 在 Unix/Linux/macOS 系统上使用 lsof 命令查找占用端口的进程
      const { exitCode, stdout, stderr } = Bun.spawnSync([
        'lsof',
        '-ti',
        `:${port}`
      ]);

      if (exitCode === 0 && stdout) {
        const pid = parseInt(new TextDecoder().decode(stdout).trim());
        if (!isNaN(pid)) {
          console.log(`🔍 发现占用端口 ${port} 的进程 (PID: ${pid})，正在终止...`);
          try {
            process.kill(pid, 'SIGTERM');
            // 等待一段时间让进程优雅关闭
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 检查进程是否仍然存在
            try {
              process.kill(pid, 0); // 这不会发送信号，但会检查进程是否存在
              // 如果进程仍然存在，强制终止
              console.log(`⚠️  进程 ${pid} 仍未关闭，正在强制终止...`);
              process.kill(pid, 'SIGKILL');
            } catch (_error: unknown) {
              // 进程已经不存在了
              // 记录错误信息以便调试
              console.error(`进程检查失败: ${_error instanceof Error ? _error.message : String(_error)}`);
              console.log(`✅ 进程 ${pid} 已成功终止`);
            }
          } catch (killError) {
            console.warn(`⚠️  无法终止进程 ${pid}:`, killError);
          }
        }
      } else if (stderr) {
        console.warn(`⚠️  检查端口占用时出错:`, new TextDecoder().decode(stderr));
      }
    } catch (error) {
      console.warn(`⚠️  无法检查端口 ${port} 的占用情况:`, error);
    }
  };

  // 启动服务器的函数
  const startServer = async () => {
    // 检查端口是否被占用
    if (await isPortInUse(port)) {
      console.log(`⚠️  端口 ${port} 已被占用，正在尝试清理...`);
      await killPortProcess(port);

      // 再次检查端口是否已被释放
      if (await isPortInUse(port)) {
        console.warn(`⚠️  端口 ${port} 仍然被占用，可能会导致启动失败`);
      } else {
        console.log(`✅ 端口 ${port} 已被释放`);
      }
    }

    const { spawn } = await import('bun')
    const child = spawn({
      cmd: ['bun', 'src/standalone-server.ts'],
      env: {
        ...process.env,
        PORT: port.toString(),
        DATA_PATH: dataPath
      },
      stdout: 'inherit',
      stderr: 'inherit'
    })
    return child
  }

  // 重启服务器的函数
  const restartServer = async () => {
    console.log('🔄 重启服务器...')

    // 关闭现有的子进程
    if (serverProcess) {
      serverProcess.kill()
    }

    // 等待一段时间确保端口释放
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 重新启动服务器
    serverProcess = await startServer()
    console.log('✅ 服务器已重启')
  }

  // 设置监听器的函数
  const setupWatchers = async () => {
    // 清理现有的监听器
    for (const watcher of watchers) {
      watcher.close()
    }
    watchers = []

    // 动态获取当前主题名称
    let themeName = 'default'
    try {
      const configPath = join(process.cwd(), 'lumos.config.json')
      const configFile = Bun.file(configPath)
      if (await configFile.exists()) {
        const configContent = await configFile.text()
        const config = JSON.parse(configContent)
        themeName = config.theme || 'default'
      }
    } catch (error) {
      console.warn('警告: 无法加载主题配置，使用默认主题:', error)
    }

    // 使用 Bun 的文件监听 API
    const watchDirs = [
      'source/',
      'src/',
      'plugins/',
      `themes/${themeName}`,
    ]

    for (const dir of watchDirs) {
      try {
        const fullPath = join(process.cwd(), dir)

        // 检查目录是否存在
        const stat = await Bun.file(fullPath).stat().catch(() => null)
        if (!stat || !stat.isDirectory()) {
          console.warn(`监听目录不存在或不是目录: ${fullPath}`)
          continue
        }

        // 使用 fs.watch 监听文件变化
        const fs = await import('fs')
        const watcher = fs.watch(fullPath, { recursive: true }, async (eventType, filename) => {
          if (filename) {
            console.log(`📝 检测到文件变化: ${dir}/${filename}`)

            // 如果是主题目录的文件变化，重启服务器
            if (dir.startsWith(`themes/${themeName}`)) {
              console.log('🔄 主题文件发生变化，正在重启服务器...')
              await restartServer()
            } else if (dir.startsWith('src/')) {
              // 如果是src目录的文件变化，重启服务器
              console.log('🔄 src文件发生变化，正在重启服务器...')
              await restartServer()
            } else if (dir.startsWith('plugins/')) {
              // 如果是src目录的文件变化，重启服务器
              console.log('🔄 plugin文件发生变化，正在重启服务器...')
              await restartServer()
            } else {
              // 内容文件变化，重新生成数据
              console.log('🔄 重新生成数据...')
              try {
                await genCommand()
                // 发送信号给子进程重新加载数据
                if (serverProcess) {
                  process.kill(serverProcess.pid, 'SIGUSR1')
                }
                console.log('✅ 数据已更新')
              } catch (_error) {
                console.error('❌ 更新数据失败:', _error)
                // _error 变量已使用
              }
            }
          }
        })

        // 处理错误
        watcher.on('error', (error) => {
          console.warn(`监听目录 ${dir} 失败:`, error)
        })

        watchers.push(watcher)
        console.log(`👀 正在监听目录: ${fullPath}`)
      } catch (error) {
        console.warn(`无法监听目录 ${dir}:`, error)
      }
    }
  }

  // 初始化服务器进程
  serverProcess = await startServer();

  // 监听文件变化
  console.log('👀 监听模式已启用')
  await setupWatchers()

  // 监听主进程退出信号，确保子进程也被关闭
  const signals = ['SIGINT', 'SIGTERM'];
  for (const signal of signals) {
    process.on(signal, () => {
      console.log(`收到信号 ${signal}，正在关闭开发服务器...`);
      // 关闭监听器
      for (const watcher of watchers) {
        watcher.close();
      }

      // 关闭子进程
      if (serverProcess) {
        console.log('正在关闭子进程...');
        serverProcess.kill();
      }

      console.log('开发服务器已关闭');
      process.exit(0);
    });
  }

  // 监听子进程退出事件
  serverProcess.exited.then((code: number) => {
    console.log(`服务器进程退出，退出码: ${code}`)
  })
}
