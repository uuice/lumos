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
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="paragraphs-input" className="block mb-2 font-medium">段落数: {paragraphs}</label>
          <input
            id="paragraphs-input"
            type="range"
            min="1"
            max="10"
            value={paragraphs}
            onChange={(e) => setParagraphs(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="sentences-input" className="block mb-2 font-medium">每段句子数: {sentences}</label>
          <input
            id="sentences-input"
            type="range"
            min="1"
            max="50"
            value={sentences}
            onChange={(e) => setSentences(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={generateLorem}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          生成假文
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className={`px-4 py-2 rounded-lg ${output ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"}`}
        >
          复制文本
        </button>
      </div>

      <div>
        <label htmlFor="lorem-output" className="block mb-2 font-medium">生成的假文:</label>
        <textarea
          id="lorem-output"
          value={output}
          readOnly
          className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white font-mono"
        />
      </div>
    </div>
  );
};

export default LoremIpsumTool;
