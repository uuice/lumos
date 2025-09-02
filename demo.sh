#!/bin/bash
# Lumos 项目演示脚本

echo "🚀 Lumos - 基于 Bun 的静态博客生成器演示"
echo ""

echo "1️⃣ 项目结构："
tree -I 'node_modules|.git|uuice-cli' -a
echo ""

echo "2️⃣ 生成数据文件："
bun src/index.tsx gen
echo ""

echo "3️⃣ 查看生成的数据文件（前30行）："
head -30 data.json
echo "..."
echo ""

echo "4️⃣ 测试 API 接口："
echo "启动服务器..."
bun src/index.tsx server --port 3002 &
SERVER_PID=$!
sleep 2

echo ""
echo "📊 获取文章列表："
curl -s http://localhost:3002/api/posts | jq -r '.[0] | {id, title, categories, tags}'

echo ""
echo "🏠 首页 HTML（前200字符）："
curl -s http://localhost:3002/ | head -c 200
echo "..."

echo ""
echo "5️⃣ 清理进程..."
kill $SERVER_PID 2>/dev/null

echo ""
echo "✅ 演示完成！"
echo "💡 使用 'bun src/index.tsx help' 查看更多命令"