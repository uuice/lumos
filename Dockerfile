FROM oven/bun:latest

WORKDIR /app

# 复制项目文件（先复制package.json，然后安装依赖，最后复制其余文件以利用Docker缓存层）
COPY package.json .

# 安装依赖（使用--no-frozen-lockfile以避免完整性检查问题）
RUN bun install --no-frozen-lockfile

# 复制其余项目文件
COPY . .

# 生成数据文件
RUN bun run gen

# 构建TypeScript
RUN bun run build

# 构建CSS
RUN bun run build:css

# 构建HTML
RUN bun run build:html

# 暴露端口
EXPOSE 3060

# 设置环境变量
ENV NODE_ENV=production

# 启动命令
CMD ["bun", "run", "start"]