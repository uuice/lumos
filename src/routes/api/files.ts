import { join } from "path";
import { existsSync, readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, unlinkSync, renameSync } from "fs";

// 获取项目根目录
const PROJECT_ROOT = process.cwd();
const SOURCE_DIR = join(PROJECT_ROOT, "source");

// 文件信息接口
interface FileInfo {
  name: string;
  path: string;
  isDirectory: boolean;
  size?: number;
  modifiedTime?: string;
  children?: FileInfo[];
}

// 获取文件树结构
function getFileTree(dirPath: string = SOURCE_DIR): FileInfo[] {
  try {
    const items: FileInfo[] = [];
    const files = readdirSync(dirPath);

    for (const file of files) {
      // 跳过隐藏文件和目录
      if (file.startsWith(".")) continue;

      const fullPath = join(dirPath, file);
      const stat = statSync(fullPath);

      const fileInfo: FileInfo = {
        name: file,
        path: fullPath.replace(PROJECT_ROOT, ""),
        isDirectory: stat.isDirectory(),
        size: stat.size,
        modifiedTime: stat.mtime.toISOString()
      };

      if (stat.isDirectory()) {
        // 递归获取子目录文件树
        fileInfo.children = getFileTree(fullPath);
      }

      items.push(fileInfo);
    }

    return items;
  } catch (error) {
    console.error("获取文件树失败:", error);
    return [];
  }
}

// 读取文件内容
function readFileContent(filePath: string): { content: string; type: string } | null {
  try {
    const fullPath = join(PROJECT_ROOT, filePath);
    if (!existsSync(fullPath)) {
      return null;
    }

    const content = readFileSync(fullPath, "utf-8");
    const ext = filePath.split(".").pop()?.toLowerCase() || "";

    let type = "text";
    if (["md", "markdown"].includes(ext)) {
      type = "markdown";
    } else if (ext === "json") {
      type = "json";
    } else if (["yml", "yaml"].includes(ext)) {
      type = "yaml";
    }

    return { content, type };
  } catch (error) {
    console.error("读取文件内容失败:", error);
    return null;
  }
}

// 保存文件内容
function saveFileContent(filePath: string, content: string): boolean {
  try {
    const fullPath = join(PROJECT_ROOT, filePath);
    writeFileSync(fullPath, content, "utf-8");
    return true;
  } catch (error) {
    console.error("保存文件内容失败:", error);
    return false;
  }
}

// 创建目录
function createDirectory(dirPath: string): boolean {
  try {
    const fullPath = join(PROJECT_ROOT, dirPath);
    if (!existsSync(fullPath)) {
      mkdirSync(fullPath, { recursive: true });
      return true;
    }
    return false;
  } catch (error) {
    console.error("创建目录失败:", error);
    return false;
  }
}

// 删除文件或目录
function deleteFileOrDirectory(path: string): boolean {
  try {
    const fullPath = join(PROJECT_ROOT, path);
    if (existsSync(fullPath)) {
      unlinkSync(fullPath);
      return true;
    }
    return false;
  } catch (error) {
    console.error("删除文件或目录失败:", error);
    return false;
  }
}

// 重命名文件或目录
function renameFileOrDirectory(oldPath: string, newPath: string): boolean {
  try {
    const fullOldPath = join(PROJECT_ROOT, oldPath);
    const fullNewPath = join(PROJECT_ROOT, newPath);

    if (existsSync(fullOldPath)) {
      renameSync(fullOldPath, fullNewPath);
      return true;
    }
    return false;
  } catch (error) {
    console.error("重命名文件或目录失败:", error);
    return false;
  }
}

// API路由处理器
export default async function handler(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const method = request.method;
    const action = url.searchParams.get("action") || "";

    switch (method) {
      case "GET":
        // 获取文件树
        if (action === "tree") {
          const tree = getFileTree();
          return new Response(JSON.stringify(tree), {
            headers: { "Content-Type": "application/json" },
            status: 200
          });
        }

        // 读取文件内容
        if (action === "read") {
          const filePath = url.searchParams.get("path") || "";
          if (!filePath) {
            return new Response(JSON.stringify({ error: "缺少文件路径参数" }), {
              headers: { "Content-Type": "application/json" },
              status: 400
            });
          }

          const fileContent = readFileContent(filePath);
          if (fileContent) {
            return new Response(JSON.stringify(fileContent), {
              headers: { "Content-Type": "application/json" },
              status: 200
            });
          } else {
            return new Response(JSON.stringify({ error: "文件不存在或读取失败" }), {
              headers: { "Content-Type": "application/json" },
              status: 404
            });
          }
        }

        return new Response(JSON.stringify({ error: "不支持的GET操作" }), {
          headers: { "Content-Type": "application/json" },
          status: 400
        });

      case "POST":
        // 保存文件内容
        if (action === "save") {
          const data = await request.json();
          const filePath = data.path;
          const content = data.content;

          if (!filePath || content === undefined) {
            return new Response(JSON.stringify({ error: "缺少必要参数" }), {
              headers: { "Content-Type": "application/json" },
              status: 400
            });
          }

          const success = saveFileContent(filePath, content);
          if (success) {
            return new Response(JSON.stringify({ message: "保存成功" }), {
              headers: { "Content-Type": "application/json" },
              status: 200
            });
          } else {
            return new Response(JSON.stringify({ error: "保存失败" }), {
              headers: { "Content-Type": "application/json" },
              status: 500
            });
          }
        }

        // 创建目录
        if (action === "mkdir") {
          const data = await request.json();
          const dirPath = data.path;

          if (!dirPath) {
            return new Response(JSON.stringify({ error: "缺少目录路径参数" }), {
              headers: { "Content-Type": "application/json" },
              status: 400
            });
          }

          const success = createDirectory(dirPath);
          if (success) {
            return new Response(JSON.stringify({ message: "目录创建成功" }), {
              headers: { "Content-Type": "application/json" },
              status: 200
            });
          } else {
            return new Response(JSON.stringify({ error: "目录创建失败" }), {
              headers: { "Content-Type": "application/json" },
              status: 500
            });
          }
        }

        return new Response(JSON.stringify({ error: "不支持的POST操作" }), {
          headers: { "Content-Type": "application/json" },
          status: 400
        });

      case "PUT":
        // 重命名文件或目录
        if (action === "rename") {
          const data = await request.json();
          const oldPath = data.oldPath;
          const newPath = data.newPath;

          if (!oldPath || !newPath) {
            return new Response(JSON.stringify({ error: "缺少必要参数" }), {
              headers: { "Content-Type": "application/json" },
              status: 400
            });
          }

          const success = renameFileOrDirectory(oldPath, newPath);
          if (success) {
            return new Response(JSON.stringify({ message: "重命名成功" }), {
              headers: { "Content-Type": "application/json" },
              status: 200
            });
          } else {
            return new Response(JSON.stringify({ error: "重命名失败" }), {
              headers: { "Content-Type": "application/json" },
              status: 500
            });
          }
        }

        return new Response(JSON.stringify({ error: "不支持的PUT操作" }), {
          headers: { "Content-Type": "application/json" },
          status: 400
        });

      case "DELETE":
        // 删除文件或目录
        const filePath = url.searchParams.get("path") || "";
        if (!filePath) {
          return new Response(JSON.stringify({ error: "缺少文件路径参数" }), {
            headers: { "Content-Type": "application/json" },
            status: 400
          });
        }

        const success = deleteFileOrDirectory(filePath);
        if (success) {
          return new Response(JSON.stringify({ message: "删除成功" }), {
            headers: { "Content-Type": "application/json" },
            status: 200
          });
        } else {
          return new Response(JSON.stringify({ error: "删除失败" }), {
            headers: { "Content-Type": "application/json" },
            status: 500
          });
        }

      default:
        return new Response(JSON.stringify({ error: "不支持的请求方法" }), {
          headers: { "Content-Type": "application/json" },
          status: 405
        });
    }
  } catch (error) {
    console.error("文件管理API错误:", error);
    return new Response(JSON.stringify({ error: "服务器内部错误: " + (error as Error).message }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}
