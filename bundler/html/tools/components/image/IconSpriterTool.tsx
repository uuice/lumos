import React, { useState } from 'react';

const IconSpriterTool = () => {
  const [sprite, setSprite] = useState<string>('');

  const onFiles = async (files: FileList) => {
    const svgs: string[] = [];
    for (const f of Array.from(files)) {
      const text = await f.text();
      const id = f.name.replace(/\.[^.]+$/, '');
      const viewBoxMatch = text.match(/viewBox="([^"]+)"/i);
      const content = text.replace(/^[\s\S]*?<svg[^>]*>/i, '').replace(/<\/svg>[\s\S]*$/i, '');
      const viewBoxAttr = viewBoxMatch ? ` viewBox="${viewBoxMatch[1]}"` : '';
      svgs.push(`<symbol id="${id}"${viewBoxAttr}>${content}</symbol>`);
    }
    const out = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${svgs.join('')}</svg>`;
    setSprite(out);
  };

  const download = () => {
    const blob = new Blob([sprite], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'sprite.svg'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">SVG 雪碧图生成</h2>
        <input type="file" accept="image/svg+xml" multiple onChange={(e)=>{ if (e.target.files) onFiles(e.target.files); }} />
        {sprite && (
          <div className="mt-4">
            <textarea readOnly value={sprite} rows={10} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-700 dark:text-white" />
            <button onClick={download} className="mt-3 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">下载 sprite.svg</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IconSpriterTool;


