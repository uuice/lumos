// API: 获取所有路由信息 - /api/routes
// 用于存储服务器实例的全局变量
let serverInstance: any = null;

// 设置服务器实例的函数
export function setServerInstance(server: any) {
  serverInstance = server;
}

export default async function handler(_request: Request): Promise<Response> {
  try {
    if (!serverInstance) {
      return Response.json({ error: 'Server instance not available' }, { status: 500 });
    }

    // 使用服务器提供的公共方法获取路由器信息
    const apiRouter = serverInstance.getApiRouter();
    const themeRouter = serverInstance.getThemeRouter();

    // 获取项目根目录路径
    const projectRoot = process.cwd();

    const routesInfo: any = {
      apiRoutes: [],
      frontendRoutes: []
    };

    // 从API路由器获取路由信息
    if (apiRouter && apiRouter.routes) {
      // FileSystemRouter 的 routes 是一个属性
      routesInfo.apiRoutes = Object.keys(apiRouter.routes).map(key => ({
        path: key,
        filePath: apiRouter.routes[key].replace(projectRoot + '/', '')
      }));
    }

    // 从主题路由器获取路由信息
    if (themeRouter && themeRouter.routes) {
      // FileSystemRouter 的 routes 是一个属性
      routesInfo.frontendRoutes = Object.keys(themeRouter.routes).map(key => ({
        path: key,
        filePath: themeRouter.routes[key].replace(projectRoot + '/', '')
      }));
    }

    return Response.json(routesInfo);
  } catch (error) {
    console.error('获取路由信息错误:', error);
    return Response.json({ error: 'Failed to load routes info' }, { status: 500 });
  }
}
