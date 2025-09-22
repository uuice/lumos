import React, { useState } from "react";

const JwtGeneratorTool: React.FC = () => {
  const [header, setHeader] = useState<string>(
    JSON.stringify(
      {
        alg: "HS256",
        typ: "JWT"
      },
      null,
      2
    )
  );

  const [payload, setPayload] = useState<string>(
    JSON.stringify(
      {
        sub: "1234567890",
        name: "John Doe",
        iat: Math.floor(Date.now() / 1000)
      },
      null,
      2
    )
  );

  const [secret, setSecret] = useState<string>("your-256-bit-secret");
  const [algorithm, setAlgorithm] = useState<string>("HS256");
  const [generatedToken, setGeneratedToken] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Base64 URL编码函数
  const base64UrlEncode = (str: string): string => {
    return btoa(str)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  };

  // Base64 URL解码函数
  const base64UrlDecode = (str: string): string => {
    // 添加必要的填充
    const padding = '='.repeat((4 - str.length % 4) % 4);
    const base64 = (str + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    return atob(base64);
  };

  // 简单的JWT签名生成（仅用于演示，实际应用中应使用后端生成）
  const generateJwt = async () => {
    setIsGenerating(true);
    setError("");
    setGeneratedToken("");

    try {
      // 验证JSON格式
      let headerObj, payloadObj;

      try {
        headerObj = JSON.parse(header);
      } catch (e) {
        throw new Error("Header必须是有效的JSON格式");
      }

      try {
        payloadObj = JSON.parse(payload);
      } catch (e) {
        throw new Error("Payload必须是有效的JSON格式");
      }

      // 更新算法
      headerObj.alg = algorithm;

      // 编码Header和Payload
      const encodedHeader = base64UrlEncode(JSON.stringify(headerObj));
      const encodedPayload = base64UrlEncode(JSON.stringify(payloadObj));

      // 创建签名内容
      const signatureInput = `${encodedHeader}.${encodedPayload}`;

      // 简化的签名生成（仅用于演示）
      // 实际应用中应使用crypto库进行HMAC SHA256签名
      const signature = base64UrlEncode(
        btoa(signatureInput.split("").reduce((a, b) => {
          a = ((a << 5) - a) + b.charCodeAt(0);
          return a & a;
        }, 0).toString())
      );

      const jwt = `${signatureInput}.${signature}`;
      setGeneratedToken(jwt);
    } catch (err: any) {
      setError(err.message || "生成JWT时发生错误");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatJson = (jsonStr: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    try {
      const parsed = JSON.parse(jsonStr);
      setter(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e) {
      setError("无效的JSON格式");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">JWT签名工具</h2>
        <p className="text-gray-600 dark:text-gray-400">
          生成JSON Web Token (JWT)用于API认证和授权
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Header部分 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Header</h3>
            <button
              onClick={() => formatJson(header, setHeader)}
              className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              格式化
            </button>
          </div>
          <textarea
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            className="w-full h-40 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
            placeholder='{"alg": "HS256", "typ": "JWT"}'
          />
        </div>

        {/* Payload部分 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payload</h3>
            <button
              onClick={() => formatJson(payload, setPayload)}
              className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              格式化
            </button>
          </div>
          <textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            className="w-full h-40 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
            placeholder='{"sub": "1234567890", "name": "John Doe", "iat": 1516239022}'
          />
        </div>
      </div>

      {/* 算法和密钥设置 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="algorithm" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              算法
            </label>
            <select
              id="algorithm"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="HS256">HS256 (HMAC SHA-256)</option>
              <option value="HS384">HS384 (HMAC SHA-384)</option>
              <option value="HS512">HS512 (HMAC SHA-512)</option>
            </select>
          </div>

          <div>
            <label htmlFor="secret" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              密钥 (Secret)
            </label>
            <input
              id="secret"
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="your-256-bit-secret"
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
            {error}
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={generateJwt}
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
              "生成JWT"
            )}
          </button>
        </div>
      </div>

      {/* 生成的JWT结果 */}
      {generatedToken && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">生成的JWT</h3>
            <button
              onClick={() => copyToClipboard(generatedToken)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              复制Token
            </button>
          </div>
          <div className="relative">
            <textarea
              value={generatedToken}
              readOnly
              className="w-full h-32 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                Header: {generatedToken.split('.')[0].length} 字符
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                Payload: {generatedToken.split('.')[1].length} 字符
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                Signature: {generatedToken.split('.')[2].length} 字符
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                总长度: {generatedToken.length} 字符
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 使用说明 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">使用说明</h3>
        <ul className="list-disc list-inside space-y-2 text-blue-700 dark:text-blue-300">
          <li>Header: 包含令牌类型和签名算法的JSON对象</li>
          <li>Payload: 包含声明（claims）的JSON对象，声明是关于实体（通常是用户）和其他数据的声明</li>
          <li>Secret: 用于签名JWT的密钥，应妥善保管</li>
          <li>注意：此工具仅用于演示目的，实际生产环境中应在后端生成JWT</li>
        </ul>
      </div>
    </div>
  );
};

export default JwtGeneratorTool;
