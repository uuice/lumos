#!/usr/bin/env bun

import { DataGenerator } from './generator.ts'

async function main() {
  try {
    console.log('🔄 开始生成数据文件...')
    
    const generator = new DataGenerator(process.cwd())
    await generator.saveData('data.json')
    
    console.log('✅ 数据生成完成!')
    process.exit(0)
  } catch (error) {
    console.error('❌ 生成数据失败:', error)
    process.exit(1)
  }
}

if (import.meta.main) {
  main()
}