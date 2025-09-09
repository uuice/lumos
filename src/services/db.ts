import { Database } from 'bun:sqlite'

// 创建或连接到 SQLite 数据库
const db = new Database("sqlite.db");

// 创建评论表
db.exec(`
  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page_id TEXT,
    page_url TEXT NOT NULL,
    author TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    approved BOOLEAN DEFAULT 1,
    parent_id INTEGER,
    FOREIGN KEY (parent_id) REFERENCES comments (id)
  )
`);

// 创建管理员表
db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
  )
`);

// 评论数据结构接口
export interface Comment {
  id?: number;
  pageId?: string;
  pageUrl: string;
  author: string;
  content: string;
  createdAt?: string;
  approved?: boolean;
  parentId?: number; // 添加 parentId 字段
}

// 管理员数据结构接口
export interface Admin {
  id?: number;
  username: string;
  password: string;
  createdAt?: string;
}

// 数据库操作函数
export class CommentDB {
  // 插入新评论
  static insertComment(comment: Omit<Comment, "id" | "createdAt">): Comment {
    const result = db.query<
      Comment,
      Record<string, string | number | boolean | null>
    >(`
      INSERT INTO comments (page_id, page_url, author, content, approved, parent_id)
      VALUES ($pageId, $pageUrl, $author, $content, $approved, $parentId)
      RETURNING *
    `).get({
      $pageId: comment.pageId ?? null,
      $pageUrl: comment.pageUrl,
      $author: comment.author,
      $content: comment.content,
      $approved: comment.approved ? 1 : 0,
      $parentId: comment.parentId ?? null
    }) as Comment;

    return result;
  }

  // 根据页面ID或URL获取评论
  static getComments(pageId?: string, pageUrl?: string): Comment[] {
    let query = "SELECT * FROM comments WHERE approved = 1";
    const params: any = {};

    if (pageId) {
      query += " AND page_id = $pageId";
      params.$pageId = pageId;
    }

    if (pageUrl) {
      query += " AND page_url = $pageUrl";
      params.$pageUrl = pageUrl;
    }

    query += " ORDER BY created_at DESC";

    return db.query(query).all(params) as Comment[];
  }

  // 获取所有评论（用于管理后台）
  static getAllComments(): Comment[] {
    return db.query("SELECT * FROM comments ORDER BY created_at DESC").all() as Comment[];
  }

  // 更新评论状态（审核/取消审核）
  static updateCommentStatus(id: number, approved: boolean): Comment | null {
    const result = db.query<
      Comment,
      Record<string, string | number | boolean | null>
    >(`
      UPDATE comments
      SET approved = $approved
      WHERE id = $id
      RETURNING *
    `).get({
      $id: id,
      $approved: approved ? 1 : 0
    }) as Comment;

    return result || null;
  }

  // 删除评论
  static deleteComment(id: number): boolean {
    const result = db.query("DELETE FROM comments WHERE id = $id").run({ $id: id });
    return result.changes > 0;
  }

  // 插入管理员账户
  static async insertAdmin(admin: Omit<Admin, "id" | "createdAt">): Promise<Admin> {
    // 使用 Bun.password.hash 对密码进行哈希
    const hashedPassword = await Bun.password.hash(admin.password);

    const result = db.query<
      Admin,
      Record<string, string | number | boolean | null>
    >(`
      INSERT INTO admins (username, password)
      VALUES ($username, $password)
      RETURNING *
    `).get({
      $username: admin.username,
      $password: hashedPassword
    }) as Admin;

    return result;
  }

  // 根据用户名获取管理员
  static getAdminByUsername(username: string): Admin | null {
    const result = db.query<
      Admin,
      Record<string, string | number | boolean | null>
    >("SELECT * FROM admins WHERE username = $username").get({
      $username: username
    }) as Admin;

    return result || null;
  }

  // 验证管理员账户
  static async validateAdmin(username: string, password: string): Promise<boolean> {
    const admin = this.getAdminByUsername(username);
    if (!admin) return false;

    // 使用 Bun.password.verify 验证密码
    return await Bun.password.verify(password, admin.password);
  }

  // 关闭数据库连接
  static close() {
    db.close();
  }
}

// 初始化默认管理员账户（如果不存在）
async function initializeDefaultAdmin() {
  const admin = CommentDB.getAdminByUsername("admin");
  if (!admin) {
    await CommentDB.insertAdmin({
      username: "admin",
      password: "admin123"
    });
    console.log("默认管理员账户已创建: admin / admin123");
  }
}

// 初始化数据库
initializeDefaultAdmin();

export default db;
