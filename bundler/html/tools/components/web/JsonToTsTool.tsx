import React, { useState } from 'react';

const JsonToTsTool = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [tsOutput, setTsOutput] = useState('');
  const [interfaceName, setInterfaceName] = useState('MyInterface');
  const [error, setError] = useState('');

  const convertJsonToTs = () => {
    setError('');
    setTsOutput('');

    if (!jsonInput) {
      setError('请输入JSON数据');
      return;
    }

    try {
      // 验证JSON格式
      const parsedJson = JSON.parse(jsonInput);

      // 生成TypeScript接口
      const tsInterface = generateTypeScriptInterface(parsedJson, interfaceName);
      setTsOutput(tsInterface);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'JSON解析失败');
    }
  };

  const generateTypeScriptInterface = (obj: any, name: string, indent = 0): string => {
    const spaces = '  '.repeat(indent);

    if (obj === null) {
      return 'null';
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return 'any[]';
      }

      const firstItemType = getType(obj[0]);
      if (firstItemType === 'object') {
        const nestedInterface = generateTypeScriptInterface(obj[0], `${name}Item`, indent);
        return `${name}Item[];\n\n${nestedInterface}`;
      }

      return `${firstItemType}[]`;
    }

    if (typeof obj === 'object') {
      let result = `interface ${name} {\n`;

      for (const [key, value] of Object.entries(obj)) {
        const type = getType(value);

        if (type === 'object' && value !== null) {
          const nestedName = `${name}${capitalizeFirstLetter(key)}`;
          result += `${spaces}  ${key}: ${nestedName};\n`;
          // 递归生成嵌套接口（在实际应用中可能需要更复杂的处理）
        } else if (type === 'array' && Array.isArray(value) && value.length > 0) {
          const firstItemType = getType(value[0]);
          if (firstItemType === 'object' && value[0] !== null) {
            const nestedName = `${name}${capitalizeFirstLetter(key)}Item`;
            result += `${spaces}  ${key}: ${nestedName}[];\n`;
          } else {
            result += `${spaces}  ${key}: ${firstItemType}[];\n`;
          }
        } else {
          result += `${spaces}  ${key}: ${type};\n`;
        }
      }

      result += `${spaces}}`;
      return result;
    }

    return getType(obj);
  };

  const getType = (value: any): string => {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';

    switch (typeof value) {
      case 'string': return 'string';
      case 'number': return Number.isInteger(value) ? 'number' : 'number';
      case 'boolean': return 'boolean';
      case 'object': return 'object';
      default: return 'any';
    }
  };

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const resetConverter = () => {
    setJsonInput('');
    setTsOutput('');
    setInterfaceName('MyInterface');
    setError('');
  };

  const copyToClipboard = () => {
    if (tsOutput) {
      navigator.clipboard.writeText(tsOutput);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">JSON转TypeScript接口</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          将JSON数据转换为TypeScript接口定义
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-medium text-gray-800 dark:text-white mb-3">JSON输入</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  接口名称
                </label>
                <input
                  type="text"
                  value={interfaceName}
                  onChange={(e) => setInterfaceName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  JSON数据
                </label>
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder='输入JSON数据，例如: {"name": "张三", "age": 25}'
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <button
                onClick={convertJsonToTs}
                disabled={!jsonInput}
                className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  jsonInput
                    ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                转换为TypeScript
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 dark:text-white mb-3">TypeScript接口</h3>
            <div className="space-y-4">
              {tsOutput ? (
                <div className="bg-gray-800 rounded-lg p-4">
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    {tsOutput}
                  </pre>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center h-full flex items-center justify-center">
                  <div>
                    <div className="mx-auto w-12 h-12 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h4 className="mt-2 text-sm font-medium text-gray-800 dark:text-white">等待转换结果</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      输入JSON数据后将显示TypeScript接口
                    </p>
                  </div>
                </div>
              )}

              {tsOutput && (
                <button
                  onClick={copyToClipboard}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  复制到剪贴板
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mb-6">
          <button
            onClick={resetConverter}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            重置
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4 mb-6">
            <p className="text-red-700 dark:text-red-200">{error}</p>
          </div>
        )}

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• 输入有效的JSON数据以转换为TypeScript接口</li>
            <li>• 支持嵌套对象和数组结构</li>
            <li>• 自动生成合适的类型（string, number, boolean等）</li>
            <li>• 可自定义生成的接口名称</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JsonToTsTool;
