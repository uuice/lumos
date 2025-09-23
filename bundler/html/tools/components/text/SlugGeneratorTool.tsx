import React, { useState } from "react";

const SlugGeneratorTool = () => {
  const [text, setText] = useState("");
  const [slug, setSlug] = useState("");

  const generateSlug = () => {
    // 将文本转换为URL友好的slug
    const generatedSlug = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setSlug(generatedSlug);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(slug);
  };

  return (
    <div className="space-y-6 p-1">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Slug 生成器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          将文本转换为URL友好的slug格式
        </p>

        <div className="mb-6">
          <label htmlFor="slug-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            输入文本
          </label>
          <textarea
            id="slug-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="在此输入文本以生成slug..."
            className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={generateSlug}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            生成Slug
          </button>
          <button
            onClick={copyToClipboard}
            disabled={!slug}
            className={`px-5 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 ${
              slug
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transform hover:-translate-y-0.5"
                : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300"
            }`}
          >
            复制Slug
          </button>
        </div>

        {slug && (
          <div className="mb-6">
            <label htmlFor="slug-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              生成的Slug
            </label>
            <div id="slug-output" className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-all duration-300">
              <code className="font-mono break-all text-gray-800 dark:text-gray-200">{slug}</code>
            </div>
          </div>
        )}

        {!slug && (
          <div className="mt-8 text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-all duration-300">
            <div className="mx-auto w-16 h-16 text-gray-400 dark:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h4 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">生成的Slug将显示在这里</h4>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              输入文本后点击&quot;生成Slug&quot;按钮
            </p>
          </div>
        )}

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>输入任何文本以生成URL友好的slug</li>
            <li>自动转换为小写字母</li>
            <li>移除特殊字符，用连字符替换空格</li>
            <li>适用于网站URL、博客文章链接等场景</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SlugGeneratorTool;
