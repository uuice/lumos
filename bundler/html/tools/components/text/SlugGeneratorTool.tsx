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
    <div className="space-y-4">
      <div>
        <label htmlFor="slug-input" className="block mb-2 font-medium">输入文本:</label>
        <textarea
          id="slug-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在此输入文本以生成slug..."
          className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="flex space-x-3">
        <button
          onClick={generateSlug}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          生成Slug
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!slug}
          className={`px-4 py-2 rounded-lg ${slug ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"}`}
        >
          复制Slug
        </button>
      </div>

      {slug && (
        <div className="mt-4">
          <label htmlFor="slug-output" className="block mb-2 font-medium">生成的Slug:</label>
          <div id="slug-output" className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <code className="font-mono break-all">{slug}</code>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlugGeneratorTool;
