import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

// 评论数据结构接口 (与后端返回的数据结构匹配)
interface Comment {
  id: number;
  page_id?: string;
  page_url: string;
  author: string;
  content: string;
  created_at: string;
  approved: number; // 数据库中是数字 0/1
  parent_id?: number | null; // 数据库中可能是 null
  parentId?: number; // 前端使用的字段
  replies?: Comment[]; // 添加回复列表
}

// 转换数据库返回的评论格式为前端使用的格式
const transformComment = (dbComment: any): Comment => {
  return {
    id: dbComment.id,
    page_id: dbComment.page_id,
    page_url: dbComment.page_url,
    author: dbComment.author,
    content: dbComment.content,
    created_at: dbComment.created_at,
    approved: dbComment.approved,
    parent_id: dbComment.parent_id,
    parentId: dbComment.parent_id || undefined, // 转换 parent_id 为 parentId
    replies: []
  };
};

// 评论组件属性接口
interface CommentProps {
  pageId?: string;
  pageUrl?: string;
}

// 评论项组件
function CommentItem({ comment, onReply }: { comment: Comment; onReply: (replyData: any) => void }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyAuthor.trim() || !replyContent.trim()) {
      alert("请填写完整的回复信息");
      return;
    }

    onReply({
      author: replyAuthor,
      content: replyContent,
      parentId: comment.id
    });

    // 清空表单
    setReplyAuthor("");
    setReplyContent("");
    setShowReplyForm(false);
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <span className="comment-author">{comment.author}</span>
        <span className="comment-date">
          {new Date(comment.created_at).toLocaleString()}
        </span>
      </div>
      <div className="comment-content">{comment.content}</div>

      <div className="comment-actions">
        <button
          className="reply-button"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          {showReplyForm ? "取消回复" : "回复"}
        </button>
      </div>

      {showReplyForm && (
        <form className="reply-form" onSubmit={handleReplySubmit}>
          <div className="form-group">
            <input
              type="text"
              value={replyAuthor}
              onChange={(e) => setReplyAuthor(e.target.value)}
              placeholder="昵称"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="回复内容"
              rows={3}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit">提交回复</button>
            <button type="button" onClick={() => setShowReplyForm(false)}>取消</button>
          </div>
        </form>
      )}

      {/* 显示回复 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// 评论组件
function CommentComponent({ pageId, pageUrl }: CommentProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取评论数据
  useEffect(() => {
    fetchComments();
  }, [pageId, pageUrl]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/comments?pageId=${pageId}&pageUrl=${pageUrl}`);
      if (!response.ok) {
        throw new Error("获取评论失败");
      }
      const rawData: any[] = await response.json();
      // 转换数据格式
      const transformedData: Comment[] = rawData.map(transformComment);
      // 处理嵌套评论结构
      const processedComments = processComments(transformedData);
      setComments(processedComments);
      setError(null);
    } catch (err) {
      setError("获取评论时出错: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // 处理嵌套评论结构
  const processComments = (data: Comment[]): Comment[] => {
    const commentMap: { [key: number]: Comment } = {};
    const rootComments: Comment[] = [];

    // 初始化所有评论
    data.forEach(comment => {
      commentMap[comment.id] = { ...comment, replies: [] };
    });

    // 构建评论树
    data.forEach(comment => {
      if (comment.parent_id || comment.parentId) {
        const parentId = (comment.parent_id || comment.parentId)!;
        // 确保父评论存在
        if (commentMap[parentId]) {
          commentMap[parentId].replies!.push(commentMap[comment.id]);
        }
      } else {
        rootComments.push(commentMap[comment.id]);
      }
    });

    return rootComments;
  };

  // 提交新评论
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) {
      alert("请填写完整的评论信息");
      return;
    }

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageId,
          pageUrl,
          author,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("提交评论失败");
      }

      // 清空表单
      setAuthor("");
      setContent("");

      // 重新获取评论
      fetchComments();
    } catch (err) {
      setError("提交评论时出错: " + (err as Error).message);
    }
  };

  // 处理回复提交
  const handleReplySubmit = async (replyData: any) => {
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageId,
          pageUrl,
          author: replyData.author,
          content: replyData.content,
          parentId: replyData.parentId
        }),
      });

      if (!response.ok) {
        throw new Error("提交回复失败");
      }

      // 重新获取评论
      fetchComments();
    } catch (err) {
      setError("提交回复时出错: " + (err as Error).message);
    }
  };

  // 渲染评论列表
  const renderComments = () => {
    if (loading) {
      return <div className="loading">加载评论中...</div>;
    }

    if (error) {
      return <div className="error">错误: {error}</div>;
    }

    if (comments.length === 0) {
      return <div className="no-comments">暂无评论，快来抢沙发吧！</div>;
    }

    return (
      <div className="comments-list">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReplySubmit}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="comment-section">
      <h3>评论</h3>

      <form className="comment-form" onSubmit={handleSubmit}>
        <h4>发表评论</h4>
        <div className="form-group">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="昵称"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="评论内容"
            rows={4}
            required
          />
        </div>
        <button type="submit">提交评论</button>
      </form>

      {renderComments()}
    </div>
  );
}

// 评论页面组件
function CommentPage() {
  // 获取页面参数（这里简化处理，实际项目中可能需要从URL参数获取）
  const pageId = "example-page-id";
  const pageUrl = window.location.pathname;

  return (
    <div className="container">
      <header>
        <h1>Lumos 评论系统</h1>
      </header>

      <main>
        <CommentComponent pageId={pageId} pageUrl={pageUrl} />
      </main>

      <footer>
        <p>&copy; 2025 Lumos. All rights reserved.</p>
      </footer>
    </div>
  );
}

// 渲染应用
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<CommentPage />);
  }
});

// 添加样式
const style = document.createElement('style');
style.textContent = `
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }

  h1 {
    color: #333;
    margin: 0;
  }

  h3 {
    color: #444;
    margin-top: 0;
  }

  h4 {
    margin-top: 0;
    color: #555;
  }

  .comment-section {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .comment-form {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 6px;
    margin-bottom: 30px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  button {
    background: #1890ff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  button:hover {
    background: #40a9ff;
  }

  button[type="button"] {
    background: #fafafa;
    color: #666;
    border: 1px solid #d9d9d9;
    margin-left: 10px;
  }

  button[type="button"]:hover {
    background: #e6e6e6;
    border-color: #bfbfbf;
  }

  .comments-list {
    margin-top: 20px;
  }

  .comment-item {
    border-bottom: 1px solid #eee;
    padding: 15px 0;
  }

  .comment-item:last-child {
    border-bottom: none;
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .comment-author {
    font-weight: bold;
    color: #1890ff;
  }

  .comment-date {
    color: #999;
    font-size: 12px;
  }

  .comment-content {
    color: #333;
    line-height: 1.5;
    margin-bottom: 10px;
  }

  .comment-actions {
    margin-bottom: 10px;
  }

  .reply-button {
    background: none;
    color: #1890ff;
    border: none;
    padding: 0;
    font-size: 14px;
    cursor: pointer;
    text-decoration: underline;
  }

  .reply-button:hover {
    color: #40a9ff;
  }

  .reply-form {
    background: #f0f8ff;
    padding: 15px;
    border-radius: 4px;
    margin-top: 10px;
  }

  .reply-form .form-group input,
  .reply-form .form-group textarea {
    background: white;
  }

  .form-actions {
    display: flex;
    justify-content: flex-start;
  }

  .replies {
    margin-left: 30px;
    border-left: 2px solid #e8e8e8;
    padding-left: 15px;
    margin-top: 15px;
  }

  .reply-item {
    padding: 10px 0;
  }

  .reply-item .comment-header {
    margin-bottom: 5px;
  }

  .reply-item .comment-content {
    margin-bottom: 5px;
  }

  .loading, .error, .no-comments {
    text-align: center;
    padding: 20px;
    color: #666;
  }

  .error {
    color: #ff4d4f;
  }

  footer {
    text-align: center;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    color: #999;
  }

  @media (max-width: 600px) {
    .container {
      padding: 10px;
    }

    .replies {
      margin-left: 15px;
    }

    .form-actions {
      flex-direction: column;
    }

    button[type="button"] {
      margin-left: 0;
      margin-top: 10px;
    }
  }
`;

document.head.appendChild(style);

export default CommentComponent;
