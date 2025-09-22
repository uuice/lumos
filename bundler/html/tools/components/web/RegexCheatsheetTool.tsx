import React, { useState } from "react";

const RegexCheatsheetTool: React.FC = () => {
  const [testString, setTestString] = useState<string>("hello@example.com");
  const [regexPattern, setRegexPattern] = useState<string>("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  const [flags, setFlags] = useState<string>("g");
  const [matches, setMatches] = useState<RegExpMatchArray | null>(null);
  const [error, setError] = useState<string>("");

  // 常用正则表达式模式
  const commonPatterns = [
    { name: "邮箱地址", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", description: "匹配标准邮箱格式" },
    { name: "手机号码", pattern: "1[3-9]\\d{9}", description: "匹配中国大陆手机号码" },
    { name: "URL链接", pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)", description: "匹配HTTP/HTTPS链接" },
    { name: "IP地址", pattern: "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", description: "匹配IPv4地址" },
    { name: "日期格式", pattern: "\\d{4}-\\d{2}-\\d{2}", description: "匹配YYYY-MM-DD日期格式" },
    { name: "时间格式", pattern: "\\d{2}:\\d{2}:\\d{2}", description: "匹配HH:MM:SS时间格式" },
    { name: "强密码", pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", description: "至少8位，包含大小写字母、数字和特殊字符" },
    { name: "邮政编码", pattern: "\\d{6}", description: "匹配6位数字邮政编码" },
    { name: "身份证号", pattern: "\\d{17}[\\dXx]", description: "匹配18位身份证号码" },
    { name: "车牌号码", pattern: "[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-Z0-9]{4}[A-Z0-9挂学警港澳]", description: "匹配中国大陆车牌号码" }
  ];

  // 正则表达式标志说明
  const flagDescriptions = [
    { flag: "g", description: "全局匹配" },
    { flag: "i", description: "忽略大小写" },
    { flag: "m", description: "多行匹配" },
    { flag: "s", description: "允许.匹配换行符" },
    { flag: "u", description: "Unicode模式" },
    { flag: "y", description: "粘性匹配" }
  ];

  // 执行正则表达式测试
  const testRegex = () => {
    if (!regexPattern) {
      setError("请输入正则表达式模式");
      return;
    }

    try {
      const regex = new RegExp(regexPattern, flags);
      const result = testString.match(regex);
      setMatches(result);
      setError("");
    } catch (err: any) {
      setError(`正则表达式错误: ${err.message}`);
      setMatches(null);
    }
  };

  // 应用常用模式
  const applyPattern = (pattern: string) => {
    setRegexPattern(pattern);
  };

  // 复制到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // 在测试字符串中高亮匹配项
  const highlightMatches = () => {
    if (!matches || !matches.length) return testString;

    // 为了简单起见，我们只高亮第一个匹配项
    if (matches[0]) {
      const matchIndex = testString.indexOf(matches[0]);
      if (matchIndex >= 0) {
        return (
          <>
            {testString.substring(0, matchIndex)}
            <span className="bg-yellow-200 dark:bg-yellow-600 text-gray-900 dark:text-white">
              {matches[0]}
            </span>
            {testString.substring(matchIndex + matches[0].length)}
          </>
        );
      }
    }

    return testString;
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">正则表达式速查工具</h2>
        <p className="text-gray-600 dark:text-gray-400">
          测试正则表达式模式，查看匹配结果，提供常用正则表达式模板
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 测试区域 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">正则表达式测试</h3>

          <div className="mb-4">
            <label htmlFor="regexPattern" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              正则表达式模式
            </label>
            <input
              id="regexPattern"
              type="text"
              value={regexPattern}
              onChange={(e) => setRegexPattern(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono"
              placeholder="输入正则表达式模式"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              标志 (Flags)
            </label>
            <div className="flex flex-wrap gap-2">
              {flagDescriptions.map((flagDesc) => (
                <label key={flagDesc.flag} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={flags.includes(flagDesc.flag)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFlags(prev => prev.includes(flagDesc.flag) ? prev : prev + flagDesc.flag);
                      } else {
                        setFlags(prev => prev.replace(flagDesc.flag, ''));
                      }
                    }}
                    className="rounded text-blue-600 dark:text-blue-400 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {flagDesc.flag} - {flagDesc.description}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="testString" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              测试字符串
            </label>
            <textarea
              id="testString"
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="w-full h-32 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="输入要测试的字符串"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={testRegex}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            测试正则表达式
          </button>
        </div>

        {/* 结果区域 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">匹配结果</h3>

          {matches ? (
            <div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">匹配文本</h4>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg min-h-[60px]">
                  {matches.length > 0 ? (
                    <div className="font-mono text-sm break-all">
                      {highlightMatches()}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">未找到匹配项</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">匹配详情</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">索引</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">匹配内容</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {matches.map((match, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                          <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300">{index}</td>
                          <td className="px-4 py-2 text-sm font-mono break-all">{match}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">统计信息</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">匹配数量</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{matches.length}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-200">模式长度</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-300">{regexPattern.length}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">等待测试</h4>
              <p className="text-gray-500 dark:text-gray-400">
                输入正则表达式模式和测试字符串后点击测试按钮查看结果
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 常用正则表达式 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">常用正则表达式模板</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commonPatterns.map((pattern, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer"
              onClick={() => applyPattern(pattern.pattern)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{pattern.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{pattern.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(pattern.pattern);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono text-sm break-all">
                {pattern.pattern}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 正则表达式速查表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">正则表达式速查表</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">元字符</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">描述</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">示例</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">.</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">匹配任意字符（除换行符）</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 font-mono">a.c 匹配 abc, axc</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">^</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">匹配字符串开头</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 font-mono">^abc 匹配以abc开头</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">$</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">匹配字符串结尾</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 font-mono">abc$ 匹配以abc结尾</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">*</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">匹配前面的字符0次或多次</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 font-mono">ab* 匹配 a, ab, abb</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">+</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">匹配前面的字符1次或多次</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 font-mono">ab+ 匹配 ab, abb, abbb</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">?</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">匹配前面的字符0次或1次</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 font-mono">ab? 匹配 a, ab</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">\d</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">匹配数字字符</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 font-mono">\d 匹配 0-9</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">\w</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">匹配字母、数字、下划线</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 font-mono">\w 匹配 a-z, A-Z, 0-9, _</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">\s</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">匹配空白字符</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 font-mono">\s 匹配空格, 制表符等</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">[abc]</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">匹配括号内任意字符</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 font-mono">[abc] 匹配 a, b, c</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">[^abc]</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">匹配除括号内字符外的任意字符</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 font-mono">[^abc] 匹配除 a, b, c 外的字符</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">(abc)</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">分组</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 font-mono">(abc)+ 匹配 abc, abcabc</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegexCheatsheetTool;
