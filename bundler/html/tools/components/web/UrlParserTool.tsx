import React, { useMemo, useState } from 'react';

const UrlParserTool = () => {
  const [u, setU] = useState<string>('https://example.com:8080/path/name?x=1&y=2#hash');
  const parsed = useMemo(()=>{
    try { return new URL(u); } catch { return null; }
  }, [u]);

  const entries = useMemo(()=>{
    if (!parsed) return [] as Array<[string,string]>;
    return Array.from(parsed.searchParams.entries());
  }, [parsed]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">URL 解析</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          解析URL的各个组成部分
        </p>

        <div className="mb-6">
          <label htmlFor="urlInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            URL地址
          </label>
          <input
            id="urlInput"
            value={u}
            onChange={(e)=>setU(e.target.value)}
            placeholder="输入URL地址"
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        {parsed ? (
          <div className="mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5 transition-all duration-300">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">解析结果</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-600/50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">协议</div>
                <div className="font-medium text-gray-800 dark:text-white">{parsed.protocol}</div>
              </div>
              <div className="bg-white dark:bg-gray-600/50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">主机</div>
                <div className="font-medium text-gray-800 dark:text-white">{parsed.host}</div>
              </div>
              <div className="bg-white dark:bg-gray-600/50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">主机名</div>
                <div className="font-medium text-gray-800 dark:text-white">{parsed.hostname}</div>
              </div>
              <div className="bg-white dark:bg-gray-600/50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">端口</div>
                <div className="font-medium text-gray-800 dark:text-white">{parsed.port || '默认端口'}</div>
              </div>
              <div className="bg-white dark:bg-gray-600/50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">路径</div>
                <div className="font-medium text-gray-800 dark:text-white">{parsed.pathname}</div>
              </div>
              <div className="bg-white dark:bg-gray-600/50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">锚点</div>
                <div className="font-medium text-gray-800 dark:text-white">{parsed.hash || '无'}</div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-800 dark:text-white mb-3">查询参数</h4>
              <div className="bg-white dark:bg-gray-600/50 rounded-lg p-4">
                {entries.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {entries.map(([k,v],i)=>(
                      <div key={i} className="flex items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                        <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">{k}:</span>
                        <span className="text-gray-600 dark:text-gray-400">{v}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 dark:text-gray-400 text-center py-4">
                    无查询参数
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800 text-center">
            <div className="flex items-center justify-center text-red-800 dark:text-red-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              无效的 URL
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>输入完整的URL地址进行解析</li>
            <li>支持HTTP、HTTPS等协议</li>
            <li>自动识别主机、端口、路径、查询参数等组成部分</li>
            <li>显示查询参数的键值对</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UrlParserTool;

