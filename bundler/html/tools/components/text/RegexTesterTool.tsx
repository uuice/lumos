import React, { useState, useEffect } from 'react';

const RegexTesterTool = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('');
  const [matches, setMatches] = useState<any[]>([]);
  const [error, setError] = useState('');

  // 测试正则表达式
  const testRegex = () => {
    if (!pattern) {
      setMatches([]);
      setError('');
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const matchArray = [...text.matchAll(regex)];
      setMatches(matchArray);
      setError('');
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  };

  // 实时测试
  useEffect(() => {
    testRegex();
  }, [pattern, flags, text]);

  // 高亮匹配的文本
  const highlightMatches = () => {
    if (!pattern || error) return text;

    try {
      const regex = new RegExp(`(${pattern})`, `${flags.replace('g', '')}g`);
      const parts = text.split(regex);

      return parts.map((part, index) => {
        if (index % 2 === 1) {
          // 这是匹配的部分
          return <span key={index} className="bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100">{part}</span>;
        }
        return part;
      });
    } catch (_e) {
      return text;
    }
  };

  // 常用正则表达式
  const commonPatterns = [
    { name: '邮箱', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
    { name: '手机号', pattern: '1[3-9]\\d{9}' },
    { name: 'URL', pattern: 'https?://[\\w.-]+(/[\\w.-]*)*' },
    { name: 'IP地址', pattern: '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)' },
    { name: '日期 (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}' },
    { name: '时间 (HH:MM:SS)', pattern: '[0-2][0-9]:[0-5][0-9]:[0-5][0-9]' },
    { name: '邮政编码', pattern: '[1-9]\\d{5}' },
    { name: '身份证号', pattern: '[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]' }
  ];

  // 使用常用正则表达式
  const handleUsePattern = (pattern: string) => {
    setPattern(pattern);
  };

  // 替换功能
  const [replaceText, setReplaceText] = useState('');
  const [replacedText, setReplacedText] = useState('');

  const performReplace = () => {
    if (!pattern || error) {
      setReplacedText(text);
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const result = text.replace(regex, replaceText);
      setReplacedText(result);
    } catch (_e) {
      setReplacedText(text);
    }
  };

  // 当替换文本或正则表达式改变时执行替换
  useEffect(() => {
    performReplace();
  }, [replaceText, pattern, flags, text]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">正则表达式测试器</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="mb-4">
              <label htmlFor="regex-pattern" className="block text-sm font-medium mb-1">正则表达式</label>
              <input
                id="regex-pattern"
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="输入正则表达式..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono"
              />
            </div>

            <div className="mb-4">
              <div className="block text-sm font-medium mb-1">标志</div>
              <div className="flex flex-wrap gap-2">
                {['g', 'i', 'm', 's', 'u', 'y'].map((flag) => (
                  <label key={flag} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={flags.includes(flag)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFlags(flags + flag);
                        } else {
                          setFlags(flags.replace(flag, ''));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-1 text-sm">{flag}</span>
                  </label>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
                错误: {error}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="test-text" className="block text-sm font-medium mb-1">测试文本</label>
            <textarea
              id="test-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="输入要测试的文本..."
              className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="block text-sm font-medium mb-1">常用正则表达式</div>
          <div className="flex flex-wrap gap-2">
            {commonPatterns.map((item, index) => (
              <button
                key={index}
                onClick={() => handleUsePattern(item.pattern)}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-sm transition"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="replace-text" className="block text-sm font-medium mb-1">替换文本</label>
            <input
              id="replace-text"
              type="text"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              placeholder="输入替换文本..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <div className="block text-sm font-medium mb-1">替换结果</div>
            <div className="w-full h-12 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 overflow-auto">
              {replacedText}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">匹配结果</h2>

          {matches.length > 0 ? (
            <div className="space-y-2">
              {matches.map((match, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <div className="font-medium">匹配 {index + 1}:</div>
                  <div className="font-mono text-sm mt-1">{match[0]}</div>
                  {match.length > 1 && (
                    <div className="mt-2">
                      <div className="text-xs text-gray-500 dark:text-gray-400">捕获组:</div>
                      <div className="space-y-1 mt-1">
                        {match.slice(1).map((group: string, groupIndex: number) => (
                          <div key={groupIndex} className="font-mono text-xs">
                            [{groupIndex + 1}] {group}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400">
              {pattern ? '未找到匹配项' : '请输入正则表达式进行测试'}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">高亮显示</h2>

          <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 min-h-[200px]">
            {pattern && !error ? (
              <div className="font-mono whitespace-pre-wrap">
                {highlightMatches()}
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400">
                {pattern ? '正则表达式有错误' : '请输入正则表达式进行高亮显示'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegexTesterTool;
