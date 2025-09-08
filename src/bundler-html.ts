#!/usr/bin/env bun

// bundler-html.ts - 合并的 HTML 构建和开发服务器功能

import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, statSync } from 'fs';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 递归获取目录下的所有 HTML 文件（包括子目录）
async function getAllHtmlFiles(dirPath: string, fileList: string[] = []): Promise<string[]> {
  try {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        // 递归处理子目录
        await getAllHtmlFiles(filePath, fileList);
      } else if (file.endsWith('.html')) {
        // 添加 HTML 文件到列表
        fileList.push(filePath);
      }
    }
  } catch (error) {
    console.error(`读取目录失败 ${dirPath}:`, error);
  }

  return fileList;
}

// 递归复制目录（保持子目录结构）
async function copyDirectoryRecursive(src: string, dest: string): Promise<void> {
  try {
    await fs.access(src);
  } catch (_error) {
    // 源目录不存在，直接返回
    return;
  }

  try {
    await fs.access(dest);
  } catch (_error) {
    // 目标目录不存在，创建它
    await fs.mkdir(dest, { recursive: true });
  }

  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // 递归复制子目录
      await copyDirectoryRecursive(srcPath, destPath);
    } else {
      // 复制文件
      await fs.copyFile(srcPath, destPath);
    }
  }
}

// 构建 HTML 文件
export async function buildHtmlFiles() {
  console.log('开始构建 HTML 文件...');

  try {
    // 在构建之前先清空 dist 目录
    console.log('正在清空 dist 目录...');
    const distDir = './bundler/dist';
    try {
      // 检查 dist 目录是否存在
      await fs.access(distDir);
      // 如果存在，删除目录中的所有文件和子目录
      const files = await fs.readdir(distDir);
      for (const file of files) {
        const filePath = path.join(distDir, file);
        await fs.rm(filePath, { recursive: true, force: true });
      }
      console.log('✅ dist 目录已清空!');
    } catch (error: any) {
      // 如果目录不存在，创建它
      if (error.code === 'ENOENT') {
        await fs.mkdir(distDir, { recursive: true });
        console.log('✅ dist 目录已创建!');
      } else {
        console.log('ℹ️  dist 目录清空失败:', error.message);
      }
    }

    // 先运行 Tailwind CSS 构建命令来预处理 CSS
    console.log('正在预处理 CSS 文件...');
    await execAsync('bun run build:css');
    console.log('✅ CSS 预处理完成!');

    // 动态获取 bundler/html 目录下的所有 .html 文件（包括子目录）
    console.log('正在扫描 HTML 文件...');
    const htmlDir = './bundler/html';
    const htmlFiles = await getAllHtmlFiles(htmlDir);

    console.log(`发现 ${htmlFiles.length} 个 HTML 文件:`);
    htmlFiles.forEach(file => console.log(`  - ${file}`));

    if (htmlFiles.length === 0) {
      console.log('ℹ️  没有找到 HTML 文件');
      return;
    }

    // 使用 Bun.build API 构建 HTML 文件
    const result = await Bun.build({
      entrypoints: htmlFiles,
      outdir: './bundler/dist',
      minify: {
        whitespace: true,
        identifiers: true,
        syntax: true,
      },
      naming: {
        entry: "[dir]/[name].[ext]", // 保持子目录结构
        chunk: "[dir]/[name]-[hash].[ext]",
        asset: "[dir]/[name]-[hash].[ext]"
      }
    });

    if (result.success) {
      console.log('✅ HTML 构建成功!');
      console.log(`📦 输出文件: ${result.outputs.length} 个`);

      // 显示输出文件信息
      for (const output of result.outputs) {
        console.log(`  - ${output.path}`);
      }

      // 复制 favicon 目录到输出目录（保持子目录结构）
      try {
        await copyDirectoryRecursive('./themes/default/html/favicon', './themes/default/dist/favicon');
        console.log('✅ favicon 目录复制成功!');
      } catch (error: any) {
        console.log('ℹ️  favicon 目录复制失败或不存在:', error.message);
      }
    } else {
      console.error('❌ 构建失败:');
      for (const message of result.logs) {
        console.error(`  ${message}`);
      }
    }
  } catch (error: any) {
    console.error('❌ 构建过程中发生错误:', error);
  }
}

// 获取 HTML 文件列表（包括子目录）
async function getHtmlFiles(dirPath: string, fileList: string[] = []): Promise<string[]> {
  try {
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
  } catch (error) {
    console.error(`读取目录失败 ${dirPath}:`, error);
  }

  return fileList;
}

// 启动 HTML 开发服务器
export async function startHtmlDevServer() {
  console.log('正在启动 HTML 开发服务器...');

  const htmlDir = join(process.cwd(), 'bundler', 'html');
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

// 监听模式构建 HTML 文件
export async function watchHtmlFiles() {
  console.log('👀 启动 HTML 监听模式...');

  // 初始构建
  await buildHtmlFiles();

  const htmlDir = join(process.cwd(), 'bundler', 'html');
  if (!existsSync(htmlDir)) {
    console.error('❌ HTML 目录不存在:', htmlDir);
    process.exit(1);
  }

  // 使用 fs.watch 监听目录变化
  const fs = await import('fs');
  const watcher = fs.watch(htmlDir, { recursive: true }, async (eventType, filename) => {
    if (filename) {
      console.log(`📝 检测到文件变化: ${filename}`);
      // 重新构建
      await buildHtmlFiles();
    }
  });

  watcher.on('error', (error) => {
    console.error('❌ 监听器错误:', error);
  });

  console.log(`👀 正在监听目录: ${htmlDir}`);

  // 处理退出信号
  const signals = ['SIGINT', 'SIGTERM'];
  for (const signal of signals) {
    process.on(signal, () => {
      console.log('\n正在关闭监听服务...');
      watcher.close();
      process.exit(0);
    });
  }
}
