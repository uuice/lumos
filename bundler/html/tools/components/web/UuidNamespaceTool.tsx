import React, { useState } from "react";

const UuidNamespaceTool: React.FC = () => {
  const [namespace, setNamespace] = useState<string>("6ba7b810-9dad-11d1-80b4-00c04fd430c8"); // 示例UUID命名空间
  const [name, setName] = useState<string>("example.com");
  const [uuidVersion, setUuidVersion] = useState<string>("v5");
  const [generatedUuids, setGeneratedUuids] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // UUID版本说明
  const uuidVersions = [
    { value: "v3", name: "UUID v3", description: "基于MD5哈希的命名空间UUID" },
    { value: "v5", name: "UUID v5", description: "基于SHA-1哈希的命名空间UUID" }
  ];

  // 预定义的命名空间UUID
  const predefinedNamespaces = [
    { name: "DNS", uuid: "6ba7b810-9dad-11d1-80b4-00c04fd430c8" },
    { name: "URL", uuid: "6ba7b811-9dad-11d1-80b4-00c04fd430c8" },
    { name: "OID", uuid: "6ba7b812-9dad-11d1-80b4-00c04fd430c8" },
    { name: "X500", uuid: "6ba7b814-9dad-11d1-80b4-00c04fd430c8" }
  ];

  // 简单的UUID v5生成模拟（实际应用中应使用crypto库）
  const generateUuidV5 = (namespace: string, name: string): string => {
    // 这是一个简化的模拟实现，仅用于演示
    // 实际应用中应使用标准的SHA-1哈希算法
    const hash = btoa(namespace + name)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .substring(0, 32);

    // 格式化为UUID v5格式
    return `${hash.substring(0, 8)}-${hash.substring(8, 12)}-5${hash.substring(13, 16)}-${hash.substring(16, 20)}-${hash.substring(20, 32)}`;
  };

  // 简单的UUID v3生成模拟（实际应用中应使用crypto库）
  const generateUuidV3 = (namespace: string, name: string): string => {
    // 这是一个简化的模拟实现，仅用于演示
    // 实际应用中应使用标准的MD5哈希算法
    const hash = btoa(namespace + name + "md5")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .substring(0, 32);

    // 格式化为UUID v3格式
    return `${hash.substring(0, 8)}-${hash.substring(8, 12)}-3${hash.substring(13, 16)}-${hash.substring(16, 20)}-${hash.substring(20, 32)}`;
  };

  const generateUuid = () => {
    if (!namespace.trim() || !name.trim()) {
      setError("命名空间和名称不能为空");
      return;
    }

    // 验证命名空间UUID格式
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(namespace)) {
      setError("命名空间必须是有效的UUID格式");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      // 模拟生成过程
      setTimeout(() => {
        let newUuid = "";
        if (uuidVersion === "v5") {
          newUuid = generateUuidV5(namespace, name);
        } else {
          newUuid = generateUuidV3(namespace, name);
        }

        const newEntry = {
          id: Date.now(),
          namespace,
          name,
          version: uuidVersion,
          uuid: newUuid,
          timestamp: new Date().toISOString()
        };

        setGeneratedUuids(prev => [newEntry, ...prev]);
        setIsGenerating(false);
      }, 500);
    } catch (err) {
      setError("生成UUID时发生错误");
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearHistory = () => {
    setGeneratedUuids([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">UUID命名空间工具</h2>
        <p className="text-gray-600 dark:text-gray-400">
          基于命名空间和名称生成UUID v3/v5，确保相同输入生成相同UUID
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="uuidVersion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              UUID版本
            </label>
            <select
              id="uuidVersion"
              value={uuidVersion}
              onChange={(e) => setUuidVersion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {uuidVersions.map((version) => (
                <option key={version.value} value={version.value}>
                  {version.name} - {version.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="predefinedNamespace" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              预定义命名空间
            </label>
            <select
              id="predefinedNamespace"
              onChange={(e) => setNamespace(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">选择预定义命名空间</option>
              {predefinedNamespaces.map((ns) => (
                <option key={ns.name} value={ns.uuid}>
                  {ns.name} ({ns.uuid})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="namespace" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              命名空间 UUID
            </label>
            <input
              id="namespace"
              type="text"
              value={namespace}
              onChange={(e) => setNamespace(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono"
              placeholder="6ba7b810-9dad-11d1-80b4-00c04fd430c8"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              输入有效的UUID作为命名空间
            </p>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              名称
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="example.com"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              输入要生成UUID的名称字符串
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={generateUuid}
          disabled={isGenerating}
          className={`w-full px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isGenerating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              生成中...
            </span>
          ) : (
            `生成 ${uuidVersion.toUpperCase()} UUID`
          )}
        </button>
      </div>

      {generatedUuids.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              生成的UUID历史 ({generatedUuids.length})
            </h3>
            <button
              onClick={clearHistory}
              className="text-sm px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded hover:bg-red-200 dark:hover:bg-red-800"
            >
              清空历史
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">UUID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">版本</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">名称</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">时间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {generatedUuids.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white break-all max-w-xs">
                      {entry.uuid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {entry.version.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {entry.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => copyToClipboard(entry.uuid)}
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        复制
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {generatedUuids.length === 0 && !isGenerating && !error && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 8a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">UUID命名空间生成器</h3>
          <p className="text-gray-500 dark:text-gray-400">
            配置命名空间和名称后点击生成按钮创建基于命名空间的UUID
          </p>
        </div>
      )}

      {/* 使用说明 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">使用说明</h3>
        <ul className="list-disc list-inside space-y-2 text-blue-700 dark:text-blue-300">
          <li>UUID v3: 使用MD5哈希算法，基于命名空间UUID和名称字符串生成</li>
          <li>UUID v5: 使用SHA-1哈希算法，基于命名空间UUID和名称字符串生成</li>
          <li>相同命名空间和名称总是生成相同的UUID，适用于需要确定性UUID的场景</li>
          <li>预定义命名空间：DNS、URL、OID、X500可用于常见场景</li>
          <li>注意：此工具为演示用途，实际应用中应使用标准库生成UUID</li>
        </ul>
      </div>
    </div>
  );
};

export default UuidNamespaceTool;
