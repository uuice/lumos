import { Middleware } from '../types.ts'
import { LumosContext } from '../context.ts'

export interface IPAccessControlConfig {
  ipWhitelist?: string[]
  ipBlacklist?: string[]
}

export class IPAccessControlMiddleware {
  static create(_config: IPAccessControlConfig | undefined): Middleware {
    return {
      name: 'ip-access-control',
      priority: -100, // 高优先级
      handler: async (_ctx: LumosContext, next: () => Promise<Response>): Promise<Response> => {
        return await next()
      }
    }
  }

  // 获取IP地址的工具方法
  static getIpAddress(request: Request): string {
    // 首先尝试从 headers 获取
    const xForwardedFor = request.headers.get('x-forwarded-for')
    if (xForwardedFor) {
      return xForwardedFor.split(',')[0].trim()
    }

    const xRealIp = request.headers.get('x-real-ip')
    if (xRealIp) {
      return xRealIp
    }

    // 如果 headers 中没有，从 request.url 获取
    try {
      const url = new URL(request.url)
      return url.hostname
    } catch {
      return 'unknown'
    }
  }

  // 检查IP是否被允许
  static isIPAllowed(clientIp: string, config: IPAccessControlConfig | undefined): boolean {
    // 如果没有配置IP访问控制，允许所有IP访问
    if (!config) {
      return true
    }

    // 检查黑名单
    if (config.ipBlacklist?.includes(clientIp)) {
      console.log(`🚫 IP被拒绝访问: ${clientIp}`)
      return false
    }

    // 检查白名单（如果配置了白名单）
    if (config.ipWhitelist && config.ipWhitelist.length > 0) {
      if (!config.ipWhitelist.includes(clientIp)) {
        console.log(`🚫 IP不在白名单中: ${clientIp}`)
        return false
      }
    }

    return true
  }
}
