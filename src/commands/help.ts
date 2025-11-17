export const helpCommand = () => {
  // ANSI color codes
  const colors = [
    '\x1b[31m', // Red
    '\x1b[32m', // Green
    '\x1b[33m', // Yellow
    '\x1b[34m', // Blue
    '\x1b[35m', // Magenta
    '\x1b[36m', // Cyan
    '\x1b[91m', // Bright Red
    '\x1b[92m', // Bright Green
    '\x1b[93m', // Bright Yellow
    '\x1b[94m', // Bright Blue
    '\x1b[95m', // Bright Magenta
    '\x1b[96m'  // Bright Cyan
  ]
  const reset = '\x1b[0m'

  // Split help text into lines
  const helpText = `
Lumos - 基于 Bun 的静态博客生成器
 ▄█       ███    █▄    ▄▄▄▄███▄▄▄▄    ▄██████▄     ▄████████
███       ███    ███ ▄██▀▀▀███▀▀▀██▄ ███    ███   ███    ███
███       ███    ███ ███   ███   ███ ███    ███   ███    █▀
███       ███    ███ ███   ███   ███ ███    ███   ███
███       ███    ███ ███   ███   ███ ███    ███ ▀███████████
███       ███    ███ ███   ███   ███ ███    ███          ███
███▌    ▄ ███    ███ ███   ███   ███ ███    ███    ▄█    ███
█████▄▄██ ████████▀   ▀█   ███   █▀   ▀██████▀   ▄████████▀
▀
用法:
  lumos <command> [options]

命令:
  gen                     生成 data.json 数据文件
  server                  启动开发服务器
      选项:
      -w, --watch         监听 主题、src目录、插件目录变化并重新启动开发服务器
  build                   构建项目 (生成数据 + 处理资源)
  assets                  处理资源文件
  css                     构建 CSS 文件
    选项:
      -w, --watch         监听 CSS 文件变化
  new <type> <title>      创建新的文章、页面或作者
    类型: post, page, author
    选项:
      -p, --path <path>   指定子目录路径
  webp <input> <output>   将图片转换为 WebP 格式
    支持格式: jpg, jpeg, png, tiff, gif, bmp
    选项:
      --quality <number>   WebP 质量 (默认: 80)
      --effort <number> WebP 压缩级别 (默认: 6)
  help                    显示帮助信息

选项:
  -p, --port <port>       服务器端口 (默认: 3060）
  -w, --watch             监听文件变化
  -h, --help              显示帮助信息
  -v, --version           显示版本信息

示例:
  lumos gen               # 生成数据文件
  lumos build             # 构建项目
  lumos assets            # 处理资源文件
  lumos css               # 构建 主题CSS 文件
  lumos css -w            # 监听 主题CSS 文件变化
  lumos server            # 启动服务器
  lumos server -p 8080    # 在端口 8080 启动服务器
  lumos server -w         # 启动服务器并监听文件变化
  lumos new post "Hello World"
  lumos new page "About Me" -p "info"
  lumos new author "John Doe"
  lumos webp ./images ./webp-images --quality=85
  lumos webp ./images/avatar.jpg ./webp-images/avatar.webp --quality=90
  `

  // Print each line with a different color
  const lines = helpText.trim().split('\n')
  for (let i = 0; i < lines.length; i++) {
    const color = colors[i % colors.length]
    console.log(`${color}${lines[i]}${reset}`)
  }
}
