import { Comment, CommentDB } from './db.ts'

// 获取评论接口
export async function getComments(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const pageId = url.searchParams.get("pageId") || undefined;
    const pageUrl = url.searchParams.get("pageUrl") || undefined;

    const comments = CommentDB.getComments(pageId, pageUrl);

    return new Response(JSON.stringify(comments), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "获取评论失败: " + (error as Error).message }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}

// 创建评论接口
export async function createComment(request: Request): Promise<Response> {
  try {
    const data = await request.json();

    // 验证必要字段
    if (!data.pageUrl || !data.author || !data.content) {
      return new Response(JSON.stringify({ error: "缺少必要字段" }), {
        headers: { "Content-Type": "application/json" },
        status: 400
      });
    }

    // 创建评论对象
    const comment: Omit<Comment, "id" | "createdAt"> = {
      pageId: data.pageId,
      pageUrl: data.pageUrl,
      author: data.author,
      content: data.content,
      approved: true, // 默认审核通过
      parentId: data.parentId // 支持 parentId
    };

    const newComment = CommentDB.insertComment(comment);

    return new Response(JSON.stringify(newComment), {
      headers: { "Content-Type": "application/json" },
      status: 201
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "创建评论失败: " + (error as Error).message }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}

// 获取所有评论接口（用于管理后台）
export async function getAllComments(_request: Request): Promise<Response> {
  try {
    const comments = CommentDB.getAllComments();

    return new Response(JSON.stringify(comments), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "获取评论失败: " + (error as Error).message }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}

// 更新评论状态接口（审核/取消审核）
export async function updateCommentStatus(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get("id") || "");
    const approved = url.searchParams.get("approved") === "true";

    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "无效的评论ID" }), {
        headers: { "Content-Type": "application/json" },
        status: 400
      });
    }

    const updatedComment = CommentDB.updateCommentStatus(id, approved);

    if (!updatedComment) {
      return new Response(JSON.stringify({ error: "评论未找到" }), {
        headers: { "Content-Type": "application/json" },
        status: 404
      });
    }

    return new Response(JSON.stringify(updatedComment), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "更新评论状态失败: " + (error as Error).message }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}

// 删除评论接口
export async function deleteComment(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get("id") || "");

    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "无效的评论ID" }), {
        headers: { "Content-Type": "application/json" },
        status: 400
      });
    }

    const success = CommentDB.deleteComment(id);

    if (!success) {
      return new Response(JSON.stringify({ error: "评论未找到" }), {
        headers: { "Content-Type": "application/json" },
        status: 404
      });
    }

    return new Response(JSON.stringify({ message: "评论删除成功" }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "删除评论失败: " + (error as Error).message }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}
