import React, { useMemo, useState } from 'react';

function buildToc(md: string): string {
  const lines = md.split(/\r?\n/);
  const items: { level: number; text: string; slug: string }[] = [];
  for (const line of lines) {
    const m = line.match(/^(#{1,6})\s+(.+)/);
    if (m) {
      const level = m[1].length;
      const text = m[2].replace(/#+\s*$/,'').trim();
      const slug = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g,'').replace(/\s+/g,'-');
      items.push({ level, text, slug });
    }
  }
  return items.map(i => `${'  '.repeat(i.level - 1)}- [${i.text}](#${i.slug})`).join('\n');
}

const MarkdownTocTool = () => {
  const [input, setInput] = useState<string>('# Title\n\n## Section\n### Sub');
  const toc = useMemo(()=>buildToc(input), [input]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Markdown 目录生成</h2>
        <textarea value={input} onChange={(e)=>setInput(e.target.value)} rows={10} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm dark:bg-gray-700 dark:text-white" />
        <div className="mt-4">
          <h3 className="font-medium mb-2">目录 (Markdown)</h3>
          <textarea readOnly value={toc} rows={10} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-700 dark:text-white" />
        </div>
      </div>
    </div>
  );
};

export default MarkdownTocTool;




