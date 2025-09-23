import React, { useState } from 'react';

const GifSplitTool = () => {
  const [frames, setFrames] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const onFile = async (file: File) => {
    setFrames([]); setError('');
    try {
      // @ts-ignore
      if (typeof ImageDecoder !== 'undefined') {
        // @ts-ignore
        const decoder = new ImageDecoder({ data: await file.arrayBuffer(), type: file.type || 'image/gif' });
        const count = decoder.tracks?.selectedTrack?.frameCount ?? 0;
        const out: string[] = [];
        for (let i=0;i<count;i++) {
          // @ts-ignore
          const { image } = await decoder.decode({ frameIndex: i });
          const canvas = new OffscreenCanvas(image.displayWidth, image.displayHeight);
          const ctx = canvas.getContext('2d');
          if (!ctx) continue;
          // @ts-ignore
          ctx.drawImage(image, 0, 0);
          const blob = await canvas.convertToBlob({ type: 'image/png' });
          out.push(URL.createObjectURL(blob));
        }
        setFrames(out);
      } else {
        setError('当前浏览器不支持 ImageDecoder');
      }
    } catch (e) {
      setError('解析失败');
      console.error(e);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">GIF 帧拆分</h2>
        <input type="file" accept="image/gif" onChange={(e)=>{const f=e.target.files?.[0]; if (f) onFile(f);}} />
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {frames.map((url, idx) => (
            <a key={idx} href={url} download={`frame-${idx+1}.png`} className="block">
              <img src={url} alt={`frame ${idx+1}`} className="w-full h-auto rounded border" />
              <div className="text-xs text-center mt-1">下载第 {idx+1} 帧</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GifSplitTool;


