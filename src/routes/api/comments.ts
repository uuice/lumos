import { getComments, createComment, getAllComments, updateCommentStatus, deleteComment } from '../../services/comments.ts';

// API路由处理器
export default async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const method = request.method;
  const action = url.searchParams.get("action");

  // 根据请求方法和路径处理不同的操作
  switch (method) {
    case 'GET':
      // 获取评论列表
      if (action === "all") {
        return await getAllComments(request);
      }
      return await getComments(request);

    case 'POST':
      // 创建新评论
      return await createComment(request);

    case 'PUT':
      // 更新评论状态（审核/取消审核）
      return await updateCommentStatus(request);

    case 'DELETE':
      // 删除评论
      return await deleteComment(request);

    default:
      return new Response(JSON.stringify({ error: '不支持的请求方法' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 405
      });
  }
}
