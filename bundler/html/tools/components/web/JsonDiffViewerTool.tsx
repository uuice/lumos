import React, { useState } from "react";

const JsonDiffViewerTool: React.FC = () => {
  const [leftJson, setLeftJson] = useState<string>(
    JSON.stringify(
      {
        name: "John Doe",
        age: 30,
        email: "john@example.com",
        address: {
          street: "123 Main St",
          city: "New York",
          zipcode: "10001"
        },
        hobbies: ["reading", "swimming", "coding"]
      },
      null,
      2
    )
  );

  const [rightJson, setRightJson] = useState<string>(
    JSON.stringify(
      {
        name: "John Smith",
        age: 31,
        email: "johnsmith@example.com",
        address: {
          street: "123 Main St",
          city: "Boston",
          zipcode: "10001"
        },
        hobbies: ["reading", "cycling", "coding", "photography"]
      },
      null,
      2
    )
  );

  const [diffResult, setDiffResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [isComparing, setIsComparing] = useState<boolean>(false);

  // 简单的JSON差异比较函数
  const compareJson = (obj1: any, obj2: any, path: string = ""): any[] => {
    const diffs: any[] = [];

    // 获取所有唯一的键
    const allKeys = new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})]);

    for (const key of Array.from(allKeys)) {
      const currentPath = path ? `${path}.${key}` : key;

      // 如果键只存在于一个对象中
      if (!(key in obj1)) {
        diffs.push({
          type: "added",
          path: currentPath,
          value: obj2[key]
        });
        continue;
      }

      if (!(key in obj2)) {
        diffs.push({
          type: "removed",
          path: currentPath,
          value: obj1[key]
        });
        continue;
      }

      // 如果键在两个对象中都存在
      const val1 = obj1[key];
      const val2 = obj2[key];

      // 检查类型是否相同
      if (typeof val1 !== typeof val2) {
        diffs.push({
          type: "modified",
          path: currentPath,
          oldValue: val1,
          newValue: val2
        });
        continue;
      }

      // 如果都是对象，递归比较
      if (typeof val1 === "object" && typeof val2 === "object" && val1 !== null && val2 !== null && !Array.isArray(val1) && !Array.isArray(val2)) {
        diffs.push(...compareJson(val1, val2, currentPath));
        continue;
      }

      // 如果都是数组
      if (Array.isArray(val1) && Array.isArray(val2)) {
        if (JSON.stringify(val1) !== JSON.stringify(val2)) {
          diffs.push({
            type: "modified",
            path: currentPath,
            oldValue: val1,
            newValue: val2
          });
        }
        continue;
      }

      // 如果值不同
      if (val1 !== val2) {
        diffs.push({
          type: "modified",
          path: currentPath,
          oldValue: val1,
          newValue: val2
        });
      }
    }

    return diffs;
  };

  // 执行JSON比较
  const performComparison = () => {
    setIsComparing(true);
    setError("");
    setDiffResult(null);

    try {
      // 解析JSON
      let leftObj, rightObj;

      try {
        leftObj = JSON.parse(leftJson);
      } catch (e) {
        throw new Error("左侧JSON格式无效");
      }

      try {
        rightObj = JSON.parse(rightJson);
      } catch (e) {
        throw new Error("右侧JSON格式无效");
      }

      // 执行比较
      const diffs = compareJson(leftObj, rightObj);
      setDiffResult({
        diffs,
        left: leftObj,
        right: rightObj
      });
    } catch (err: any) {
      setError(err.message || "比较过程中发生错误");
    } finally {
      setIsComparing(false);
    }
  };

  // 格式化JSON
  const formatJson = (jsonStr: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    try {
      const parsed = JSON.parse(jsonStr);
      setter(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e) {
      setError("无效的JSON格式");
    }
  };

  // 复制到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // 获取差异类型的颜色类
  const getDiffTypeClass = (type: string) => {
    switch (type) {
      case "added":
        return "bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-700";
      case "removed":
        return "bg-red-100 dark:bg-red-900 border-red-200 dark:border-red-700";
      case "modified":
        return "bg-yellow-100 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700";
      default:
        return "bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600";
    }
  };

  // 获取差异类型的文字
  const getDiffTypeText = (type: string) => {
    switch (type) {
      case "added":
        return "新增";
      case "removed":
        return "删除";
      case "modified":
        return "修改";
      default:
        return "无变化";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">JSON差异查看器</h2>
        <p className="text-gray-600 dark:text-gray-400">
          比较两个JSON文档的差异，可视化显示添加、删除和修改的内容
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 左侧JSON */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">源JSON</h3>
            <button
              onClick={() => formatJson(leftJson, setLeftJson)}
              className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              格式化
            </button>
          </div>
          <textarea
            value={leftJson}
            onChange={(e) => setLeftJson(e.target.value)}
            className="w-full h-80 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
            placeholder='{"name": "John Doe", "age": 30}'
          />
        </div>

        {/* 右侧JSON */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">目标JSON</h3>
            <button
              onClick={() => formatJson(rightJson, setRightJson)}
              className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              格式化
            </button>
          </div>
          <textarea
            value={rightJson}
            onChange={(e) => setRightJson(e.target.value)}
            className="w-full h-80 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
            placeholder='{"name": "John Smith", "age": 31}'
          />
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={performComparison}
          disabled={isComparing}
          className={`w-full px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isComparing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isComparing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              比较中...
            </span>
          ) : (
            "比较JSON差异"
          )}
        </button>
      </div>

      {/* 差异结果 */}
      {diffResult && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              差异结果 ({diffResult.diffs.length} 个差异)
            </h3>
          </div>
          <div className="p-6">
            {diffResult.diffs.length > 0 ? (
              <div className="space-y-4">
                {diffResult.diffs.map((diff: any, index: number) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${getDiffTypeClass(diff.type)}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          diff.type === "added"
                            ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-100"
                            : diff.type === "removed"
                              ? "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-100"
                              : "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100"
                        }`}>
                          {getDiffTypeText(diff.type)}
                        </span>
                        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          {diff.path}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(
                          diff.type === "modified"
                            ? `路径: ${diff.path}\n旧值: ${JSON.stringify(diff.oldValue, null, 2)}\n新值: ${JSON.stringify(diff.newValue, null, 2)}`
                            : `路径: ${diff.path}\n值: ${JSON.stringify(diff.value, null, 2)}`
                        )}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>

                    {diff.type === "modified" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">旧值:</p>
                          <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
                            {JSON.stringify(diff.oldValue, null, 2)}
                          </pre>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">新值:</p>
                          <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
                            {JSON.stringify(diff.newValue, null, 2)}
                          </pre>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {diff.type === "added" ? "新增值:" : "删除值:"}
                        </p>
                        <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
                          {JSON.stringify(diff.value, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-green-500 dark:text-green-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">无差异</h4>
                <p className="text-gray-500 dark:text-gray-400">
                  两个JSON文档完全相同，没有发现任何差异
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {!diffResult && !isComparing && !error && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">JSON差异比较</h3>
          <p className="text-gray-500 dark:text-gray-400">
            在上方输入两个JSON文档，然后点击比较按钮查看差异
          </p>
        </div>
      )}

      {/* 使用说明 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">使用说明</h3>
        <ul className="list-disc list-inside space-y-2 text-blue-700 dark:text-blue-300">
          <li>在左侧和右侧文本框中分别输入要比较的JSON文档</li>
          <li>点击"格式化"按钮可以美化JSON格式，便于查看</li>
          <li>点击"比较JSON差异"按钮开始比较两个JSON文档</li>
          <li>差异结果会按添加、删除、修改三种类型进行分类显示</li>
          <li>可以点击复制按钮将差异信息复制到剪贴板</li>
        </ul>
      </div>
    </div>
  );
};

export default JsonDiffViewerTool;
