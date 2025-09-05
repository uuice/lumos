module.exports = {
  apps: [
    {
      name: 'lumos-blog',
      script: 'bun',
      args: 'src/cli.ts server -p 3000',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        RUNTIME: 'bun'
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }
  ]
};