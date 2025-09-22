import React, { useState } from "react";

const DnsLookupTool: React.FC = () => {
  const [domain, setDomain] = useState("");
  const [recordType, setRecordType] = useState("A");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 常见DNS记录类型
  const recordTypes = [
    { value: "A", description: "IPv4地址记录" },
    { value: "AAAA", description: "IPv6地址记录" },
    { value: "CNAME", description: "规范名称记录" },
    { value: "MX", description: "邮件交换记录" },
    { value: "NS", description: "名称服务器记录" },
    { value: "TXT", description: "文本记录" },
    { value: "SRV", description: "服务定位器" },
    { value: "PTR", description: "指针记录" },
    { value: "SOA", description: "起始授权机构记录" }
  ];

  // 模拟DNS查询结果（实际应用中应调用后端API）
  const simulateDnsLookup = (): Promise<any[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResults: any[] = [];

        switch (recordType) {
          case "A":
            mockResults.push({
              type: "A",
              name: domain,
              value: "93.184.216.34",
              ttl: 3600
            });
            break;
          case "AAAA":
            mockResults.push({
              type: "AAAA",
              name: domain,
              value: "2606:2800:220:1:248:1893:25c8:1946",
              ttl: 3600
            });
            break;
          case "CNAME":
            mockResults.push({
              type: "CNAME",
              name: domain,
              value: "example.com.",
              ttl: 3600
            });
            break;
          case "MX":
            mockResults.push({
              type: "MX",
              name: domain,
              value: "10 mail.example.com.",
              priority: 10,
              ttl: 3600
            });
            break;
          case "NS":
            mockResults.push({
              type: "NS",
              name: domain,
              value: "ns1.example.com.",
              ttl: 3600
            }, {
              type: "NS",
              name: domain,
              value: "ns2.example.com.",
              ttl: 3600
            });
            break;
          case "TXT":
            mockResults.push({
              type: "TXT",
              name: domain,
              value: "v=spf1 include:_spf.example.com ~all",
              ttl: 3600
            });
            break;
          default:
            mockResults.push({
              type: recordType,
              name: domain,
              value: "示例记录值",
              ttl: 3600
            });
        }

        resolve(mockResults);
      }, 1000);
    });
  };

  const handleLookup = async () => {
    if (!domain.trim()) {
      setError("请输入域名");
      return;
    }

    setIsLoading(true);
    setError("");
    setResults([]);

    try {
      // 在实际应用中，这里应该调用真实的DNS查询API
      const data = await simulateDnsLookup();
      setResults(data);
    } catch (err) {
      setError("查询失败，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">DNS查询工具</h2>
        <p className="text-gray-600 dark:text-gray-400">
          查询域名的DNS记录信息，包括A、AAAA、CNAME、MX、NS等记录类型
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <label htmlFor="domain" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              域名
            </label>
            <input
              id="domain"
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              onKeyPress={(e) => e.key === 'Enter' && handleLookup()}
            />
          </div>
          <div>
            <label htmlFor="recordType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              记录类型
            </label>
            <select
              id="recordType"
              value={recordType}
              onChange={(e) => setRecordType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {recordTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.value} - {type.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleLookup}
          disabled={isLoading}
          className={`w-full px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              查询中...
            </span>
          ) : (
            "查询DNS记录"
          )}
        </button>
      </div>

      {results.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              查询结果 ({results.length} 条记录)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">名称</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">值</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">TTL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {results.map((result, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {result.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {result.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 break-all max-w-xs">
                      {result.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {result.ttl}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => copyToClipboard(result.value)}
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

      {results.length === 0 && !isLoading && !error && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">DNS查询</h3>
          <p className="text-gray-500 dark:text-gray-400">
            输入域名和选择记录类型后点击查询按钮获取DNS记录信息
          </p>
        </div>
      )}
    </div>
  );
};

export default DnsLookupTool;
