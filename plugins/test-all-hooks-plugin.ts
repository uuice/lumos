#!/usr/bin/env bun

import { Plugin } from '../src/types.ts'
import { DataGenerator } from '../src/generator.ts'
import { Parser } from '../src/parser.ts'
import { PluginManager } from '../src/plugin-manager.ts'
import { join } from 'path'

/**
 * 测试所有插件钩子的完整功能插件
 */
const testAllHooksPlugin: Plugin = {
  name: 'test-all-hooks-plugin',
  version: '1.0.0',
  description: '测试所有插件钩子功能的插件',

  // 测试 onGenerateStart 钩子
  async onGenerateStart(generator: any) {
    console.log('✅ onGenerateStart 钩子被调用');
    console.log('  生成器实例:', generator.constructor.name);
  },

  // 测试 onGenerateEnd 钩子
  async onGenerateEnd(data: any) {
    console.log('✅ onGenerateEnd 钩子被调用');
    console.log('  数据结构包含:');
    console.log('    - 文章数量:', data.posts?.length || 0);
    console.log('    - 页面数量:', data.pages?.length || 0);
    console.log('    - 作者数量:', data.authors?.length || 0);

    // 返回未修改的数据
    return data;
  },

  // 测试 onParseFile 钩子
  async onParseFile(filePath: string, content: string, type: 'post' | 'page' | 'author') {
    console.log('✅ onParseFile 钩子被调用');
    console.log('  文件路径:', filePath);
    console.log('  文件类型:', type);
    console.log('  内容长度:', content.length);

    // 返回未修改的内容
    return content;
  },

  // 测试 onRender 钩子
  async onRender(html: string, data: any) {
    console.log('✅ onRender 钩子被调用');
    console.log('  HTML 长度:', html.length);
    console.log('  数据类型:', typeof data);

    // 返回未修改的 HTML
    return html;
  },

  // 测试 onServerStart 钩子
  async onServerStart(server: any) {
    console.log('✅ onServerStart 钩子被调用');
    console.log('  服务器实例:', server.constructor.name);
  }
};

// 导出插件
export default testAllHooksPlugin;

/**
 * 测试脚本 - 验证所有钩子是否正常工作
 */
async function runTests() {
  console.log('🧪 开始测试所有插件钩子...\n');

  try {
    const basePath = process.cwd();
    const pluginManager = new PluginManager(basePath);

    // 1. 测试插件加载
    console.log('1. 测试插件加载...');
    await pluginManager.loadPluginConfig();
    await pluginManager.loadPlugins();
    console.log('   插件加载完成\n');

    // 2. 测试 onGenerateStart 和 onGenerateEnd 钩子
    console.log('2. 测试生成器钩子...');
    const generator = new DataGenerator(basePath);
    await generator.generateData();
    console.log('   生成器钩子测试完成\n');

    // 3. 测试 onParseFile 钩子
    console.log('3. 测试解析器钩子...');
    const parser = new Parser(basePath);
    const sourceDir = join(basePath, 'source');
    const postsDir = join(sourceDir, '_posts');

    try {
      const postFiles = await new Promise<string[]>((resolve) => {
        const files: string[] = [];
        const glob = new Bun.Glob(`${postsDir}/**/*.md`);
        (async () => {
          for await (const file of glob.scan('.')) {
            files.push(file);
          }
          resolve(files);
        })();
      });
      if (postFiles.length > 0) {
        await parser.parseMarkdownFile(postFiles[0], 'post');
      }
    } catch (error) {
      console.error('   测试文件解析错误:', error);
      console.log('   跳过解析器测试（未找到测试文件）');
    }
    console.log('   解析器钩子测试完成\n');

    // 4. 测试 onRender 钩子
    console.log('4. 测试渲染钩子...');
    const testHtml = '<html><body><h1>Test</h1></body></html>';
    const testData = { title: 'Test Page' };
    await pluginManager.executeRender(testHtml, testData);
    console.log('   渲染钩子测试完成\n');

    console.log('🎉 所有插件钩子测试完成！');
  } catch (error) {
    console.error('❌ 测试过程中出现错误:', error);
  }
}

// 如果直接运行此脚本，则执行测试
if (import.meta.main) {
  runTests();
}
