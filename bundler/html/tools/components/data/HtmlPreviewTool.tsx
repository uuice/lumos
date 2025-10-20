import React, { useMemo, useState } from 'react';

const HtmlPreviewTool = () => {
  const [html, setHtml] = useState<string>('<h1>Hello</h1>');
  const srcDoc = useMemo(()=>html, [html]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">HTML 实时预览</h2>
        <div className="mb-4">
          <label htmlFor="htmlInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            HTML代码
          </label>
          <textarea
            id="htmlInput"
            value={html}
            onChange={(e)=>setHtml(e.target.value)}
            rows={10}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
            预览效果
          </h3>
          <div className="border rounded-lg overflow-hidden shadow">
            <iframe
              title="preview"
              srcDoc={srcDoc}
              className="w-full h-96 bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HtmlPreviewTool;

