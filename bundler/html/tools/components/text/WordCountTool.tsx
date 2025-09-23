import React, { useState } from "react";

const WordCountTool = () => {
  const [text, setText] = useState("");

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineCount = text ? text.split(/\r\n|\r|\n/).length : 0;

  return (
    <div className="space-y-6 p-1">
      <div className="transition-all duration-300">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在此输入文本..."
          className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-800 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 p-5 rounded-xl border border-blue-200 dark:border-blue-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-1">字符数</div>
          <div className="text-3xl font-bold text-blue-800 dark:text-blue-200">{charCount}</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50 p-5 rounded-xl border border-green-200 dark:border-green-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="text-sm text-green-700 dark:text-green-300 font-medium mb-1">单词数</div>
          <div className="text-3xl font-bold text-green-800 dark:text-green-200">{wordCount}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 p-5 rounded-xl border border-purple-200 dark:border-purple-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="text-sm text-purple-700 dark:text-purple-300 font-medium mb-1">行数</div>
          <div className="text-3xl font-bold text-purple-800 dark:text-purple-200">{lineCount}</div>
        </div>
      </div>
    </div>
  );
};

export default WordCountTool;
