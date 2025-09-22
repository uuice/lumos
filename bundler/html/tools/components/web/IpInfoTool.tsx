import React, { useState } from "react";

const IpInfoTool: React.FC = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [ipInfo, setIpInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPublicIp, setIsPublicIp] = useState(true);

  // 模拟IP信息数据（实际应用中应调用后端API）
  const simulateIpInfo = (): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟公网IP信息
        if (isPublicIp) {
          resolve({
            ip: ipAddress || "203.0.113.195",
            hostname: "example.com",
            city: "北京",
            region: "北京市",
            country: "中国",
            loc: "39.9042,116.4074",
            org: "AS12345 Example Organization",
            postal: "100000",
            timezone: "Asia/Shanghai",
            asn: {
              asn: "AS12345",
              name: "Example ISP",
              domain: "example.com",
              route: "203.0.113.0/24",
              type: "isp"
            },
            company: {
              name: "Example Company",
              domain: "example.com",
              type: "business"
            },
            privacy: {
              vpn: false,
              proxy: false,
              tor: false,
              relay: false,
              hosting: false,
              service: ""
            },
            abuse: {
              address: "Abuse Department, Example ISP, Beijing, China",
              country: "China",
              email: "abuse@example.com",
              name: "Abuse Department",
              network: "203.0.113.0/24",
              phone: "+86 10 1234 5678"
            }
          });
        } else {
          // 模拟内网IP信息
          resolve({
            ip: ipAddress || "192.168.1.100",
            hostname: "local-machine",
            city: "局域网",
            region: "本地网络",
            country: "本地",
            loc: "0,0",
            org: "Local Network",
            postal: "N/A",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            asn: null,
            company: null,
            privacy: {
              vpn: false,
              proxy: false,
              tor: false,
              relay: false,
              hosting: false,
              service: ""
            },
            abuse: null
          });
        }
      }, 1000);
    });
  };

  const getPublicIp = async () => {
    setIsLoading(true);
    setError("");

    try {
      // 在实际应用中，这里应该调用真实的获取公网IP API
      // 例如: const response = await fetch('https://api.ipify.org?format=json');
      // const data = await response.json();
      // setIpAddress(data.ip);

      // 模拟获取公网IP
      setTimeout(() => {
        setIpAddress("203.0.113.195");
        setIsLoading(false);
      }, 500);
    } catch (err) {
      setError("获取公网IP失败");
      setIsLoading(false);
    }
  };

  const handleLookup = async () => {
    if (!ipAddress.trim()) {
      setError("请输入IP地址");
      return;
    }

    // 简单的IP地址验证
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ipAddress)) {
      setError("请输入有效的IPv4地址");
      return;
    }

    setIsLoading(true);
    setError("");
    setIpInfo(null);

    try {
      // 在实际应用中，这里应该调用真实的IP信息查询API
      const data = await simulateIpInfo();
      setIpInfo(data);
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
        <h2 className="text-2xl font-bold mb-2">IP信息查询工具</h2>
        <p className="text-gray-600 dark:text-gray-400">
          查询IP地址的地理位置、ISP、ASN等详细信息
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <label htmlFor="ipAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              IP地址
            </label>
            <div className="flex">
              <input
                id="ipAddress"
                type="text"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                placeholder="例如: 8.8.8.8 或 留空查询本机公网IP"
                className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleLookup()}
              />
              <button
                onClick={getPublicIp}
                disabled={isLoading}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-r-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                获取公网IP
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              IP类型
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={isPublicIp}
                  onChange={() => setIsPublicIp(true)}
                  className="text-blue-600 dark:text-blue-400 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">公网</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={!isPublicIp}
                  onChange={() => setIsPublicIp(false)}
                  className="text-blue-600 dark:text-blue-400 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">内网</span>
              </label>
            </div>
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
            "查询IP信息"
          )}
        </button>
      </div>

      {ipInfo && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              IP信息详情
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-semibold mb-3 text-gray-800 dark:text-gray-200">基本信息</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">IP地址:</span>
                    <span className="font-medium">{ipInfo.ip}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">主机名:</span>
                    <span className="font-medium">{ipInfo.hostname || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">城市:</span>
                    <span className="font-medium">{ipInfo.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">地区:</span>
                    <span className="font-medium">{ipInfo.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">国家:</span>
                    <span className="font-medium">{ipInfo.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">邮编:</span>
                    <span className="font-medium">{ipInfo.postal || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">时区:</span>
                    <span className="font-medium">{ipInfo.timezone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">坐标:</span>
                    <span className="font-medium">{ipInfo.loc || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-md font-semibold mb-3 text-gray-800 dark:text-gray-200">网络信息</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">组织:</span>
                    <span className="font-medium">{ipInfo.org || "N/A"}</span>
                  </div>

                  {ipInfo.asn && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">ASN:</span>
                        <span className="font-medium">{ipInfo.asn.asn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">ASN名称:</span>
                        <span className="font-medium">{ipInfo.asn.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">ASN域名:</span>
                        <span className="font-medium">{ipInfo.asn.domain}</span>
                      </div>
                    </>
                  )}

                  {ipInfo.company && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">公司:</span>
                        <span className="font-medium">{ipInfo.company.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">公司域名:</span>
                        <span className="font-medium">{ipInfo.company.domain}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">公司类型:</span>
                        <span className="font-medium">{ipInfo.company.type}</span>
                      </div>
                    </>
                  )}
                </div>

                <h4 className="text-md font-semibold mt-4 mb-3 text-gray-800 dark:text-gray-200">安全信息</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">VPN:</span>
                    <span className={`font-medium ${ipInfo.privacy.vpn ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                      {ipInfo.privacy.vpn ? "是" : "否"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">代理:</span>
                    <span className={`font-medium ${ipInfo.privacy.proxy ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                      {ipInfo.privacy.proxy ? "是" : "否"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tor:</span>
                    <span className={`font-medium ${ipInfo.privacy.tor ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                      {ipInfo.privacy.tor ? "是" : "否"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">托管:</span>
                    <span className={`font-medium ${ipInfo.privacy.hosting ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                      {ipInfo.privacy.hosting ? "是" : "否"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => copyToClipboard(JSON.stringify(ipInfo, null, 2))}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                复制完整信息
              </button>
            </div>
          </div>
        </div>
      )}

      {!ipInfo && !isLoading && !error && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">IP信息查询</h3>
          <p className="text-gray-500 dark:text-gray-400">
            输入IP地址或点击"获取公网IP"按钮查询IP详细信息
          </p>
        </div>
      )}
    </div>
  );
};

export default IpInfoTool;
