import React, { useState, useEffect } from "react";
import {
  Tree,
  Button,
  message,
  Modal,
  Input,
  Form,
  Space,
  Dropdown,
  Menu,
  Card,
  Typography
} from "antd";
import type { MenuProps } from 'antd';
import {
  FolderOutlined,
  FileOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  FileTextOutlined,
  FileMarkdownOutlined,
  FileUnknownOutlined,
  FileUnknownOutlined as FileYamlOutlined
} from "@ant-design/icons";
import type { DataNode } from "antd/es/tree";

const { Title } = Typography;

// 文件信息接口
interface FileInfo {
  name: string;
  path: string;
  isDirectory: boolean;
  size?: number;
  modifiedTime?: string;
  children?: FileInfo[];
}

// 文件管理组件
const FileManager: React.FC = () => {
  const [fileTree, setFileTree] = useState<DataNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  const [fileContent, setFileContent] = useState("");
  const [fileType, setFileType] = useState("text");
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [createType, setCreateType] = useState<"file" | "directory">("file");
  const [newItemName, setNewItemName] = useState("");
  const [uploading, setUploading] = useState(false);

  // 获取文件树
  const fetchFileTree = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/files?action=tree");
      if (!response.ok) {
        throw new Error("获取文件树失败");
      }
      const data: FileInfo[] = await response.json();
      setFileTree(transformToFileTree(data));
    } catch (error) {
      message.error("获取文件树失败: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // 转换文件信息为树节点
  const transformToFileTree = (files: FileInfo[]): DataNode[] => {
    return files.map(file => ({
      key: file.path,
      title: (
        <Dropdown
          menu={{ items: getMenuItems(file), onClick: (info) => {
            // 设置当前右键点击的文件
            setSelectedFile(file);
            // 确保在下一个事件循环中处理菜单点击
            setTimeout(() => {
              handleMenuClick(info);
            }, 0);
          } }}
          trigger={['contextMenu']}
        >
          <span>{file.name}</span>
        </Dropdown>
      ),
      icon: file.isDirectory ? <FolderOutlined /> : getFileIcon(file.path),
      isLeaf: !file.isDirectory,
      children: file.children ? transformToFileTree(file.children) : undefined,
      data: file
    }));
  };

  // 根据文件扩展名获取图标
  const getFileIcon = (filePath: string) => {
    const ext = filePath.split(".").pop()?.toLowerCase() || "";
    switch (ext) {
      case "md":
      case "markdown":
        return <FileMarkdownOutlined />;
      case "json":
        return <FileUnknownOutlined />; // 使用存在的图标
      case "yml":
      case "yaml":
        return <FileYamlOutlined />; // 使用别名的图标
      default:
        return <FileTextOutlined />;
    }
  };

  // 组件挂载时获取文件树
  useEffect(() => {
    fetchFileTree();
  }, []);

  // 读取文件内容
  const readFileContent = async (filePath: string) => {
    try {
      const response = await fetch(`/api/files?action=read&path=${encodeURIComponent(filePath)}`);
      if (!response.ok) {
        throw new Error("读取文件失败");
      }
      const data = await response.json();
      setFileContent(data.content);
      setFileType(data.type);
      // 确保选中的文件被正确设置
      if (!selectedFile || selectedFile.path !== filePath) {
        const file = findFileInTree(fileTree, filePath);
        if (file) {
          setSelectedFile(file);
        }
      }
    } catch (error) {
      message.error("读取文件失败: " + (error as Error).message);
    }
  };

  // 在文件树中查找文件
  const findFileInTree = (tree: DataNode[], path: string): FileInfo | null => {
    for (const node of tree) {
      if (node.key === path && node.data) {
        return node.data as FileInfo;
      }
      if (node.children) {
        const found = findFileInTree(node.children, path);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  // 保存文件内容
  const saveFileContent = async () => {
    if (!selectedFile) return;

    try {
      const response = await fetch("/api/files?action=save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: selectedFile.path,
          content: fileContent
        })
      });

      if (!response.ok) {
        throw new Error("保存文件失败");
      }

      message.success("保存成功");
    } catch (error) {
      message.error("保存文件失败: " + (error as Error).message);
    }
  };

  // 创建新项目（文件或目录）
  const createNewItem = async () => {
    if (!newItemName) {
      message.warning("请输入名称");
      return;
    }

    // 获取父目录路径
    let parentPath = "/source";
    if (selectedFile && selectedFile.isDirectory) {
      parentPath = selectedFile.path;
    }

    try {
      if (createType === "directory") {
        // 创建目录
        const response = await fetch("/api/files?action=mkdir", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: `${parentPath}/${newItemName}`
          })
        });

        if (!response.ok) {
          throw new Error("创建目录失败");
        }
      } else {
        // 创建文件
        const response = await fetch("/api/files?action=save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: `${parentPath}/${newItemName}`,
            content: ""
          })
        });

        if (!response.ok) {
          throw new Error("创建文件失败");
        }
      }

      message.success(`${createType === "directory" ? "目录" : "文件"}创建成功`);
      setIsCreateModalVisible(false);
      setNewItemName("");
      // 刷新文件树
      fetchFileTree();
    } catch (error) {
      message.error(`${createType === "directory" ? "创建目录" : "创建文件"}失败: ` + (error as Error).message);
    }
  };

  // 删除文件或目录
  const deleteFileOrDirectory = async (filePath: string) => {
    Modal.confirm({
      title: "确认删除",
      content: "确定要删除这个文件或目录吗？",
      onOk: async () => {
        try {
          const response = await fetch(`/api/files?path=${encodeURIComponent(filePath)}`, {
            method: "DELETE"
          });

          if (!response.ok) {
            throw new Error("删除失败");
          }

          message.success("删除成功");
          // 重置选中的文件
          setSelectedFile(null);
          setFileContent("");
          // 刷新文件树
          fetchFileTree();
        } catch (error) {
          message.error("删除失败: " + (error as Error).message);
        }
      }
    });
  };

  // 树节点选择事件
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    const node = info.node;
    if (!node.isLeaf) return;

    const file = node.data as FileInfo;
    if (file) {
      // 设置选中的文件
      setSelectedFile(file);
      // 读取文件内容
      readFileContent(file.path);
    }
  };

  // 树节点右键菜单
  const onRightClick = ({ event, node }: { event: React.MouseEvent; node: DataNode }) => {
    // 右键菜单会在树节点上自动触发
  };

  // 右键菜单项点击处理
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (!selectedFile) return;

    switch (key) {
      case 'create':
        setCreateType("file");
        setIsCreateModalVisible(true);
        break;
      case 'createDir':
        setCreateType("directory");
        setIsCreateModalVisible(true);
        break;
      case 'delete':
        deleteFileOrDirectory(selectedFile.path);
        break;
      default:
        break;
    }
  };

  // 右键菜单项
  const getMenuItems = (file: FileInfo): MenuProps['items'] => [
    {
      label: '新建文件',
      key: 'create',
      icon: <PlusOutlined />,
      disabled: !file.isDirectory
    },
    {
      label: '新建目录',
      key: 'createDir',
      icon: <PlusOutlined />,
      disabled: !file.isDirectory
    },
    {
      type: 'divider'
    },
    {
      label: '删除',
      key: 'delete',
      icon: <DeleteOutlined />,
    },
  ];

  // 文件上传功能
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const file = files[0];

    try {
      // 读取文件内容
      const content = await file.text();

      // 保存文件
      const response = await fetch("/api/files?action=save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: `/source/${file.name}`,
          content: content
        })
      });

      if (!response.ok) {
        throw new Error("文件上传失败");
      }

      message.success(`文件 ${file.name} 上传成功`);
      fetchFileTree();
    } catch (error) {
      message.error("文件上传失败: " + (error as Error).message);
    } finally {
      setUploading(false);
      // 清空input值以便可以重复上传同一文件
      event.target.value = '';
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Title level={2}>文件管理</Title>
        <Space>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setCreateType("file");
              setIsCreateModalVisible(true);
            }}
          >
            新建文件
          </Button>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setCreateType("directory");
              setIsCreateModalVisible(true);
            }}
          >
            新建目录
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchFileTree}
          >
            刷新
          </Button>
          <input
            type="file"
            id="file-upload"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            disabled={uploading}
          />
          <Button
            icon={<FileOutlined />}
            onClick={() => document.getElementById('file-upload')?.click()}
            loading={uploading}
          >
            上传文件
          </Button>
        </Space>
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ width: "300px" }}>
          <Card title="文件树" size="small">
            <Tree
              showIcon
              defaultExpandAll
              treeData={fileTree}
              onSelect={onSelect}
              loading={loading}
            />
          </Card>
        </div>

        <div style={{ flex: 1 }}>
          <Card
            title={`文件内容: ${selectedFile?.name || "未选择文件"}`}
            size="small"
            extra={
              selectedFile && (
                <Button
                  type="primary"
                  size="small"
                  onClick={saveFileContent}
                  disabled={!selectedFile}
                >
                  保存
                </Button>
              )
            }
          >
            {selectedFile ? (
              <div>
                <div style={{ marginBottom: "10px", fontSize: "12px", color: "#666" }}>
                  {selectedFile.path && <div>路径: {selectedFile.path}</div>}
                  {selectedFile.size && <div>大小: {selectedFile.size} 字节</div>}
                  {selectedFile.modifiedTime && <div>修改时间: {selectedFile.modifiedTime}</div>}
                </div>
                <Input.TextArea
                  value={fileContent}
                  onChange={(e) => setFileContent(e.target.value)}
                  rows={18}
                  style={{ fontFamily: "monospace", width: "100%" }}
                  placeholder="文件内容"
                />
              </div>
            ) : (
              <div>请选择一个文件进行编辑</div>
            )}
          </Card>
        </div>
      </div>

      {/* 文件编辑器模态框 */}
      <Modal
        title={`编辑文件: ${selectedFile?.name || ""}`}
        open={isEditorVisible}
        onCancel={() => setIsEditorVisible(false)}
        onOk={saveFileContent}
        width={800}
        destroyOnClose
      >
        <Input.TextArea
          value={fileContent}
          onChange={(e) => setFileContent(e.target.value)}
          rows={20}
          style={{ fontFamily: "monospace" }}
        />
      </Modal>

      {/* 创建新项目模态框 */}
      <Modal
        title={`新建${createType === "directory" ? "目录" : "文件"}`}
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        onOk={createNewItem}
        destroyOnClose
      >
        <Form layout="vertical">
          <Form.Item label="名称">
            <Input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder={`请输入${createType === "directory" ? "目录" : "文件"}名称`}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FileManager;
