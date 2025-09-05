#!/usr/bin/env bun

// build-theme.js - 使用 Bun.build API 构建主题文件

import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";

const execAsync = promisify(exec);

async function buildTheme() {
  console.log('开始构建主题文件...');

  try {
    // 在构建之前先清空 dist 目录
    console.log('正在清空 dist 目录...');
    const distDir = './themes/default/dist';
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
    } catch (error) {
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

    // 动态获取 bundler/html 目录下的所有 .html 文件
    console.log('正在扫描 HTML 文件...');
    const htmlDir = './bundler/html';
    const htmlFiles = (await fs.readdir(htmlDir))
      .filter(file => file.endsWith('.html'))
      .map(file => path.join(htmlDir, file));

    console.log(`发现 ${htmlFiles.length} 个 HTML 文件:`);
    htmlFiles.forEach(file => console.log(`  - ${file}`));

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
        entry: "[name].[ext]", // 保持原始文件名
        chunk: "[name]-[hash].[ext]",
        asset: "[name]-[hash].[ext]"
      }
    });

    if (result.success) {
      console.log('✅ 主题构建成功!');
      console.log(`📦 输出文件: ${result.outputs.length} 个`);

      // 显示输出文件信息
      for (const output of result.outputs) {
        console.log(`  - ${output.path}`);
      }

      // 复制 favicon 目录到输出目录
      try {
        await fs.cp('./themes/default/html/favicon', './themes/default/dist/favicon', { recursive: true });
        console.log('✅ favicon 目录复制成功!');
      } catch (error) {
        console.log('ℹ️  favicon 目录复制失败或不存在:', error.message);
      }
    } else {
      console.error('❌ 构建失败:');
      for (const message of result.logs) {
        console.error(`  ${message}`);
      }
    }
  } catch (error) {
    console.error('❌ 构建过程中发生错误:', error);
  }
}

// 如果直接运行此脚本，则执行构建
if (import.meta.main) {
  await buildTheme();
}
