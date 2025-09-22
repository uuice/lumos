import React, { useState } from 'react';

// HTTP状态码数据
const httpStatusCodes = [
  // 1xx 信息性状态码
  { code: 100, name: 'Continue', category: '信息性', description: '客户端应继续其请求' },
  { code: 101, name: 'Switching Protocols', category: '信息性', description: '服务器根据客户端的请求切换协议' },

  // 2xx 成功状态码
  { code: 200, name: 'OK', category: '成功', description: '请求成功' },
  { code: 201, name: 'Created', category: '成功', description: '请求成功并且服务器创建了新的资源' },
  { code: 202, name: 'Accepted', category: '成功', description: '服务器已接受请求，但尚未处理' },
  { code: 204, name: 'No Content', category: '成功', description: '服务器成功处理，但未返回内容' },
  { code: 206, name: 'Partial Content', category: '成功', description: '服务器成功处理了部分GET请求' },

  // 3xx 重定向状态码
  { code: 301, name: 'Moved Permanently', category: '重定向', description: '请求的资源已被永久移动到新URI' },
  { code: 302, name: 'Found', category: '重定向', description: '请求的资源临时从不同的URI响应请求' },
  { code: 304, name: 'Not Modified', category: '重定向', description: '所请求的资源未修改，服务器返回此状态码时不会返回任何资源' },

  // 4xx 客户端错误状态码
  { code: 400, name: 'Bad Request', category: '客户端错误', description: '客户端请求的语法错误，服务器无法理解' },
  { code: 401, name: 'Unauthorized', category: '客户端错误', description: '请求要求用户的身份认证' },
  { code: 403, name: 'Forbidden', category: '客户端错误', description: '服务器理解请求客户端的请求，但是拒绝执行此请求' },
  { code: 404, name: 'Not Found', category: '客户端错误', description: '服务器无法根据客户端的请求找到资源' },
  { code: 405, name: 'Method Not Allowed', category: '客户端错误', description: '客户端请求中的方法被禁止' },
  { code: 408, name: 'Request Timeout', category: '客户端错误', description: '服务器等待客户端发送的请求时间过长' },
  { code: 409, name: 'Conflict', category: '客户端错误', description: '服务器完成客户端的PUT请求时可能返回此代码' },
  { code: 410, name: 'Gone', category: '客户端错误', description: '客户端请求的资源已经不存在' },
  { code: 413, name: 'Payload Too Large', category: '客户端错误', description: '请求的实体过大，超出服务器的处理能力' },
  { code: 422, name: 'Unprocessable Entity', category: '客户端错误', description: '请求格式正确，但是由于含有语义错误，无法响应' },
  { code: 429, name: 'Too Many Requests', category: '客户端错误', description: '客户端的请求次数超过限制' },

  // 5xx 服务器错误状态码
  { code: 500, name: 'Internal Server Error', category: '服务器错误', description: '服务器内部错误，无法完成请求' },
  { code: 501, name: 'Not Implemented', category: '服务器错误', description: '服务器不支持请求的功能' },
  { code: 502, name: 'Bad Gateway', category: '服务器错误', description: '作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应' },
  { code: 503, name: 'Service Unavailable', category: '服务器错误', description: '由于超载或系统维护，服务器暂时的无法处理客户端的请求' },
  { code: 504, name: 'Gateway Timeout', category: '服务器错误', description: '充当网关或代理的服务器，未及时从远端服务器获取请求' },
  { code: 505, name: 'HTTP Version Not Supported', category: '服务器错误', description: '服务器不支持请求的HTTP协议的版本' }
];

const HttpStatusLookupTool = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStatuses, setFilteredStatuses] = useState(httpStatusCodes);

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    if (!term) {
      setFilteredStatuses(httpStatusCodes);
      return;
    }

    const lowerTerm = term.toLowerCase();
    const filtered = httpStatusCodes.filter(status =>
      status.code.toString().includes(term) ||
      status.name.toLowerCase().includes(lowerTerm) ||
      status.description.toLowerCase().includes(lowerTerm) ||
      status.category.toLowerCase().includes(lowerTerm)
    );

    setFilteredStatuses(filtered);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '信息性': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case '成功': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case '重定向': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case '客户端错误': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case '服务器错误': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">HTTP状态码查询</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          查询常见的HTTP状态码及其含义
        </p>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="搜索状态码、名称或描述..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            {searchTerm && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-2 text-gray-500 dark:text-gray-400"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-gray-800 dark:text-white mb-3">
            共找到 {filteredStatuses.length} 个状态码
          </h3>

          {filteredStatuses.length === 0 ? (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
              <div className="mx-auto w-12 h-12 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="mt-2 text-sm font-medium text-gray-800 dark:text-white">没有找到匹配的状态码</h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                请尝试其他搜索关键词
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredStatuses.map((status) => (
                <div
                  key={status.code}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-3">
                        <span
                          onClick={() => copyToClipboard(status.code.toString())}
                          className="text-lg font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
                        >
                          {status.code}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(status.category)}`}>
                          {status.category}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-800 dark:text-white mt-2">
                        {status.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                        {status.description}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`${status.code} ${status.name}`)}
                      className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                      复制
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">HTTP状态码分类</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            <div className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 p-2 rounded text-center">
              1xx: 信息性
            </div>
            <div className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 p-2 rounded text-center">
              2xx: 成功
            </div>
            <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 p-2 rounded text-center">
              3xx: 重定向
            </div>
            <div className="bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100 p-2 rounded text-center">
              4xx: 客户端错误
            </div>
            <div className="bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 p-2 rounded text-center">
              5xx: 服务器错误
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HttpStatusLookupTool;
