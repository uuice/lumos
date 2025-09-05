#!/usr/bin/env bun

// dev-html.js - 支持子目录的 HTML 开发服务器

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 获取 HTML 文件列表（包括子目录）
async function getHtmlFiles(dirPath, fileList = []) {
  const { readdir } = await import('fs/promises');
  const files = await readdir(dirPath);

  for (const file of files) {
    const filePath = join(dirPath, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      // 递归处理子目录
      await getHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      // 添加 HTML 文件到列表
      fileList.push(filePath);
    }
  }

  return fileList;
}

async function startDevServer() {
  console.log('正在启动 HTML 开发服务器...');

  const htmlDir = join(__dirname, 'bundler', 'html');
  if (!existsSync(htmlDir)) {
    console.error('❌ HTML 目录不存在:', htmlDir);
    process.exit(1);
  }

  // 获取所有 HTML 文件
  const htmlFiles = await getHtmlFiles(htmlDir);
  console.log(`发现 ${htmlFiles.length} 个 HTML 文件:`);
  htmlFiles.forEach(file => console.log(`  - ${file}`));

  if (htmlFiles.length === 0) {
    console.log('ℹ️  没有找到 HTML 文件');
    return;
  }

  // 使用 Bun.serve 启动开发服务器
  const server = Bun.serve({
    port: 3050,
    async fetch(req) {
      const url = new URL(req.url);
      const pathname = url.pathname;

      // 处理根路径，显示文件列表
      if (pathname === '/') {
        const fileListHtml = htmlFiles.map(file => {
          const relativePath = file.replace(htmlDir, '').replace(/\\/g, '/');
          return `<li><a href="${relativePath}">${relativePath}</a></li>`;
        }).join('');

        return new Response(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>HTML 开发服务器</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1>HTML 开发服务器</h1>
              <p>找到 ${htmlFiles.length} 个 HTML 文件:</p>
              <ul>
                ${fileListHtml}
              </ul>
            </body>
          </html>
        `, {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          }
        });
      }

      // 处理具体的 HTML 文件请求
      const requestedFile = join(htmlDir, pathname);

      // 检查文件是否存在且是 HTML 文件
      if (existsSync(requestedFile) && requestedFile.endsWith('.html')) {
        const file = Bun.file(requestedFile);
        return new Response(file);
      }

      // 返回 404
      return new Response('Not Found', { status: 404 });
    }
  });

  console.log(`✅ HTML 开发服务器已启动: http://localhost:${server.port}`);

  // 处理退出信号
  process.on('SIGINT', () => {
    console.log('\n正在关闭服务器...');
    server.stop();
    process.exit(0);
  });
}

// 如果直接运行此脚本，则启动开发服务器
if (import.meta.main) {
  await startDevServer();
}
