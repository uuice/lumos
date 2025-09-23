import React, { useMemo, useState } from 'react';

function minifySvg(src: string): string {
  return src
    .replace(/<!--([\s\S]*?)-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s*(=)\s*/g, '$1')
    .trim();
}

const SvgMinifyTool = () => {
  const [input, setInput] = useState<string>('');
  const output = useMemo(()=>{
    try { return input ? minifySvg(input) : ''; } catch { return ''; }
  }, [input]);

  const download = () => {
    const blob = new Blob([output], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'minified.svg'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">SVG 压缩</h2>
        <textarea value={input} onChange={(e)=>setInput(e.target.value)} placeholder="粘贴 SVG 源码" rows={10} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm dark:bg-gray-700 dark:text-white" />
        <div className="mt-4">
          <h3 className="font-medium mb-2">输出</h3>
          <textarea readOnly value={output} rows={10} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-700 dark:text-white" />
          <div className="text-xs text-gray-500 mt-2">原始 {input.length} 字符 → 压缩 {output.length} 字符</div>
          <button onClick={download} disabled={!output} className={`mt-3 px-4 py-2 rounded-md ${output?'bg-blue-500 text-white hover:bg-blue-600':'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>下载 minified.svg</button>
        </div>
      </div>
    </div>
  );
};

export default SvgMinifyTool;


