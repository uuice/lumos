// CSS 构建命令
import { exec } from 'child_process'
import { promisify } from 'util'
interface CLIOptions {
  [key: string]: string | boolean | number | undefined
}

const execAsync = promisify(exec)

export async function buildCssCommand(options: CLIOptions = {}) {
  const isWatchMode = options.watch || options.w;

  try {
    if (isWatchMode) {
      console.log('正在启动 CSS 监听模式...');
      await execAsync('bun run build:css:watch');
    } else {
      console.log('正在构建 CSS 文件...');
      await execAsync('bun run build:css');
      console.log('✅ CSS 构建完成!');
    }
  } catch (error) {
    console.error('❌ CSS 构建失败:', error);
    process.exit(1);
  }
}
