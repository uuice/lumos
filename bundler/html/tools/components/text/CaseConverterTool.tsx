import React, { useState } from "react";

const CaseConverterTool = () => {
  const [text, setText] = useState("");

  const convertTo = (type: string) => {
    switch (type) {
      case "upper":
        return text.toUpperCase();
      case "lower":
        return text.toLowerCase();
      case "title":
        return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
      case "sentence":
        return text.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
      default:
        return text;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在此输入文本..."
          className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => navigator.clipboard.writeText(convertTo("upper"))}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          大写
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(convertTo("lower"))}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          小写
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(convertTo("title"))}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          标题
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(convertTo("sentence"))}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          句子
        </button>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">转换结果:</h3>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg min-h-[100px]">
          {convertTo("upper") || "转换结果将显示在这里"}
        </div>
      </div>
    </div>
  );
};

export default CaseConverterTool;
