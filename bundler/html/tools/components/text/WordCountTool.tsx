import React, { useState } from "react";

const WordCountTool = () => {
  const [text, setText] = useState("");

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineCount = text ? text.split(/\r\n|\r|\n/).length : 0;

  return (
    <div className="space-y-4">
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在此输入文本..."
          className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <div className="text-sm text-blue-700 dark:text-blue-300">字符数</div>
          <div className="text-2xl font-bold">{charCount}</div>
        </div>

        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
          <div className="text-sm text-green-700 dark:text-green-300">单词数</div>
          <div className="text-2xl font-bold">{wordCount}</div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
          <div className="text-sm text-purple-700 dark:text-purple-300">行数</div>
          <div className="text-2xl font-bold">{lineCount}</div>
        </div>
      </div>
    </div>
  );
};

export default WordCountTool;
