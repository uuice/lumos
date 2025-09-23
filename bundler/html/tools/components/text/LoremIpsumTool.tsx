import React, { useState } from "react";

const LoremIpsumTool = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [sentences, setSentences] = useState(5);
  const [output, setOutput] = useState("");

  // Lorem ipsum 文本段落
  const loremText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?

  Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.

  Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.`;

  const generateLorem = () => {
    const loremParagraphs = loremText.split('\n\n');
    let result = "";

    for (let i = 0; i < paragraphs; i++) {
      if (i > 0) result += "\n\n";

      // 为每个段落选择指定数量的句子
      const paragraphSentences = loremParagraphs[i % loremParagraphs.length].split('. ');
      const selectedSentences = paragraphSentences.slice(0, sentences);
      result += selectedSentences.join('. ') + '.';
    }

    setOutput(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  React.useEffect(() => {
    generateLorem();
  }, []);

  return (
    <div className="space-y-6 p-1">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Lorem Ipsum 生成器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          生成占位文本用于设计和排版
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="paragraphs-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              段落数: <span className="font-bold text-blue-600 dark:text-blue-400">{paragraphs}</span>
            </label>
            <input
              id="paragraphs-input"
              type="range"
              min="1"
              max="10"
              value={paragraphs}
              onChange={(e) => setParagraphs(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
              <span>1</span>
              <span>10</span>
            </div>
          </div>

          <div>
            <label htmlFor="sentences-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              每段句子数: <span className="font-bold text-blue-600 dark:text-blue-400">{sentences}</span>
            </label>
            <input
              id="sentences-input"
              type="range"
              min="1"
              max="50"
              value={sentences}
              onChange={(e) => setSentences(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
              <span>1</span>
              <span>50</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={generateLorem}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            生成假文
          </button>
          <button
            onClick={copyToClipboard}
            disabled={!output}
            className={`px-5 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 ${
              output
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transform hover:-translate-y-0.5"
                : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300"
            }`}
          >
            复制文本
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="lorem-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            生成的假文
          </label>
          <textarea
            id="lorem-output"
            value={output}
            readOnly
            className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono transition-all duration-200"
          />
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>调整滑块设置段落数和每段句子数</li>
            <li>点击&quot;生成假文&quot;按钮创建Lorem Ipsum文本</li>
            <li>适用于网页设计、排版测试等场景</li>
            <li>支持复制生成的文本到剪贴板</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoremIpsumTool;
