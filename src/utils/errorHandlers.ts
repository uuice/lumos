// 错误处理工具函数
import { join } from 'path'

/**
 * 处理 404 错误，尝试加载自定义 404 页面
 */
export async function handle404(request: Request): Promise<Response> {
  try {
    const notFoundPath = join(process.cwd(), 'src/routes/404.tsx')
    const notFoundModule = await import(notFoundPath)
    const handler = notFoundModule.default
    
    if (handler) {
      return await handler(request)
    }
  } catch (error) {
    console.error('加载 404 页面失败:', error)
  }

  // 降级到简单的 404 响应
  const simple404Html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>页面未找到 - 404</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
    .container { max-width: 600px; margin: 50px auto; text-align: center; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .error-code { font-size: 72px; font-weight: bold; color: #007bff; margin-bottom: 20px; }
    .error-title { font-size: 24px; margin-bottom: 15px; color: #333; }
    .error-message { color: #666; margin-bottom: 30px; }
    .btn { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; }
    .btn:hover { background: #0056b3; }
  </style>
</head>
<body>
  <div class="container">
    <div class="error-code">404</div>
    <h1 class="error-title">页面未找到</h1>
    <p class="error-message">抱歉，您访问的页面不存在或已被移动。</p>
    <a href="/" class="btn">返回首页</a>
  </div>
</body>
</html>`

  return new Response(simple404Html, {
    status: 404,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  })
}

/**
 * 处理服务器错误，尝试加载自定义错误页面
 */
export async function handleError(request: Request, errorMessage: string, statusCode: number = 500): Promise<Response> {
  try {
    const errorPath = join(process.cwd(), 'src/routes/error.tsx')
    const errorModule = await import(errorPath)
    const handler = errorModule.default
    
    if (handler) {
      return await handler(request, { error: errorMessage, statusCode })
    }
  } catch (error) {
    console.error('加载错误页面失败:', error)
  }

  // 降级到简单的错误响应
  const simpleErrorHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>服务器错误 - ${statusCode}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
    .container { max-width: 600px; margin: 50px auto; text-align: center; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .error-code { font-size: 72px; font-weight: bold; color: #dc3545; margin-bottom: 20px; }
    .error-title { font-size: 24px; margin-bottom: 15px; color: #333; }
    .error-message { color: #666; margin-bottom: 30px; }
    .btn { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 0 10px; }
    .btn:hover { background: #0056b3; }
  </style>
</head>
<body>
  <div class="container">
    <div class="error-code">${statusCode}</div>
    <h1 class="error-title">服务器错误</h1>
    <p class="error-message">${errorMessage}</p>
    <a href="/" class="btn">返回首页</a>
    <a href="javascript:window.location.reload()" class="btn">刷新页面</a>
  </div>
</body>
</html>`

  return new Response(simpleErrorHtml, {
    status: statusCode,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  })
}