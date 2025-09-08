import React, { useState, useEffect } from "react";
import { Table, Button, Tag, Space, Modal, message, Input, Form } from "antd";
import { DeleteOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";

// 评论数据结构接口 (与后端返回的数据结构匹配)
interface Comment {
  id: number;
  page_id?: string;
  page_url: string;
  author: string;
  content: string;
  created_at: string;
  approved: number; // 数据库中是数字 0/1
  parent_id?: number | null;
  children?: Comment[]; // 添加子评论字段
}

// 转换数据库返回的评论格式为前端使用的格式
const transformComment = (dbComment: any) => {
  return {
    id: dbComment.id,
    page_id: dbComment.page_id,
    page_url: dbComment.page_url,
    author: dbComment.author,
    content: dbComment.content,
    created_at: dbComment.created_at,
    approved: dbComment.approved === 1, // 转换为布尔值
    parent_id: dbComment.parent_id,
    children: [] // 初始化子评论数组
  };
};

// 评论管理组件
const CommentManager: React.FC = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editingComment, setEditingComment] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 获取评论数据
  const fetchComments = async () => {
    try {
      setLoading(true);
      // 调用实际的API获取所有评论
      const response = await fetch("/api/comments?action=all");
      if (!response.ok) {
        throw new Error("获取评论失败");
      }
      const rawData = await response.json();
      // 转换数据格式
      const transformedData = rawData.map(transformComment);
      // 处理嵌套评论结构
      const processedComments = processComments(transformedData);
      setComments(processedComments);
    } catch (error) {
      message.error("获取评论失败: " + (error as Error).message);
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
      commentMap[comment.id] = { ...comment };
    });

    // 构建评论树
    data.forEach(comment => {
      if (comment.parent_id) {
        // 如果有父评论
        if (commentMap[comment.parent_id]) {
          // 初始化子评论数组
          if (!commentMap[comment.parent_id].children) {
            commentMap[comment.parent_id].children = [];
          }
          commentMap[comment.parent_id].children!.push(commentMap[comment.id]);
        }
      } else {
        // 根评论
        rootComments.push(commentMap[comment.id]);
      }
    });

    return rootComments;
  };

  // 组件挂载时获取数据
  useEffect(() => {
    fetchComments();
  }, []);

  // 批量删除评论
  const handleDeleteSelected = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("请先选择要删除的评论");
      return;
    }

    Modal.confirm({
      title: "确认删除",
      content: `确定要删除选中的 ${selectedRowKeys.length} 条评论吗？`,
      onOk: async () => {
        try {
          // 调用实际的API批量删除评论
          const deletePromises = selectedRowKeys.map(id =>
            fetch(`/api/comments?id=${id}`, { method: "DELETE" })
          );

          const responses = await Promise.all(deletePromises);

          // 检查是否有删除失败的情况
          const failedDeletes = responses.filter(response => !response.ok);
          if (failedDeletes.length > 0) {
            throw new Error(`有 ${failedDeletes.length} 条评论删除失败`);
          }

          message.success("删除成功");
          setSelectedRowKeys([]);
          fetchComments();
        } catch (error) {
          message.error("删除失败: " + (error as Error).message);
        }
      }
    });
  };

  // 删除单个评论
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "确认删除",
      content: "确定要删除这条评论吗？",
      onOk: async () => {
        try {
          // 调用实际的API删除评论
          const response = await fetch(`/api/comments?id=${id}`, { method: "DELETE" });

          if (!response.ok) {
            throw new Error("删除评论失败");
          }

          message.success("删除成功");
          fetchComments();
        } catch (error) {
          message.error("删除失败: " + (error as Error).message);
        }
      }
    });
  };

  // 审核/取消审核评论
  const handleApprove = async (id: number, approved: boolean) => {
    try {
      // 调用实际的API更新评论状态
      const response = await fetch(`/api/comments?id=${id}&approved=${approved}`, {
        method: "PUT"
      });

      if (!response.ok) {
        throw new Error("更新评论状态失败");
      }

      message.success(`${approved ? "审核通过" : "取消审核"}成功`);
      fetchComments();
    } catch (error) {
      message.error(`${approved ? "审核通过" : "取消审核"}失败: ` + (error as Error).message);
    }
  };

  // 编辑评论
  const handleEdit = (comment: Comment) => {
    setEditingComment(comment);
    setIsModalVisible(true);
  };

  // 保存编辑的评论
  const handleSaveEdit = async (values: any) => {
    if (!editingComment) return;

    try {
      // 这里应该调用实际的API
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));

      message.success("保存成功");
      setIsModalVisible(false);
      setEditingComment(null);
      fetchComments();
    } catch (error) {
      message.error("保存失败: " + (error as Error).message);
    }
  };

  // 表格列定义
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 180, // 增加宽度
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
      width: 120,
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
      render: (text: string) => (
        <div style={{ maxWidth: "300px", wordWrap: "break-word" }}>
          {text}
        </div>
      ),
    },
    {
      title: "页面URL",
      dataIndex: "page_url",
      key: "page_url",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "时间",
      dataIndex: "created_at",
      key: "created_at",
      width: 180,
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "状态",
      dataIndex: "approved",
      key: "approved",
      width: 100,
      render: (approved: boolean) => (
        <Tag color={approved ? "green" : "red"}>
          {approved ? "已审核" : "待审核"}
        </Tag>
      ),
    },
    {
      title: "操作",
      key: "action",
      width: 200,
      render: (_: any, record: any) => (
        <Space size="middle">
          {record.approved ? (
            <Button
              icon={<CloseOutlined />}
              onClick={() => handleApprove(record.id, false)}
              size="small"
            >
              取消审核
            </Button>
          ) : (
            <Button
              icon={<CheckOutlined />}
              onClick={() => handleApprove(record.id, true)}
              size="small"
              type="primary"
            >
              审核
            </Button>
          )}
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            size="small"
            danger
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 表格行选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h2>评论管理</h2>
        <div style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={handleDeleteSelected}
            disabled={selectedRowKeys.length === 0}
          >
            批量删除 ({selectedRowKeys.length})
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            onClick={fetchComments}
          >
            刷新
          </Button>
        </div>
      </div>

      <Table
        rowKey="id"
        dataSource={comments}
        columns={columns}
        loading={loading}
        rowSelection={rowSelection}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        scroll={{ x: 1200 }}
        indentSize={20} // 控制每一层的缩进宽度
      />

      {/* 编辑评论模态框 */}
      <Modal
        title="编辑评论"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingComment(null);
        }}
        footer={null}
      >
        {editingComment && (
          <Form
            initialValues={editingComment}
            onFinish={handleSaveEdit}
          >
            <Form.Item
              label="作者"
              name="author"
              rules={[{ required: true, message: "请输入作者名称" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: "请输入评论内容" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="页面ID"
              name="page_id"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="页面URL"
              name="page_url"
              rules={[{ required: true, message: "请输入页面URL" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default CommentManager;
