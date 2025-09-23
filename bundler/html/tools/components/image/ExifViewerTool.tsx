import React, { useMemo, useRef, useState } from 'react';

const ExifViewerTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<{ name: string; type: string; sizeKB: number; width?: number; height?: number } | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onFile = async (f: File) => {
    setFile(f);
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => {
      setInfo({ name: f.name, type: f.type || 'unknown', sizeKB: Math.round(f.size / 102.4) / 10, width: img.width, height: img.height });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const strippedUrl = useMemo(() => {
    if (!file) return '';
    return new Promise<string>((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { resolve(''); return; }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (!blob) { resolve(''); return; }
          resolve(URL.createObjectURL(blob));
          URL.revokeObjectURL(url);
        }, 'image/jpeg', 0.92);
      };
      img.src = url;
    });
  }, [file]);

  const downloadStripped = async () => {
    const u = await strippedUrl;
    if (!u) return;
    const a = document.createElement('a');
    a.href = u; a.download = (file?.name.replace(/\.[^.]+$/, '') || 'image') + '-stripped.jpg'; a.click();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">EXIF 查看 / 去除</h2>
        <input type="file" accept="image/*" onChange={(e)=>{const f=e.target.files?.[0]; if (f) onFile(f);}} />
        {info && (
          <div className="mt-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <div>文件名：{info.name}</div>
            <div>类型：{info.type}</div>
            <div>大小：{info.sizeKB} KB</div>
            {info.width && <div>尺寸：{info.width}×{info.height}</div>}
          </div>
        )}
        <div className="mt-4 flex space-x-3">
          <button onClick={downloadStripped} disabled={!file} className={`px-4 py-2 rounded-md ${file? 'bg-blue-500 text-white hover:bg-blue-600':'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>导出去除EXIF的 JPEG</button>
        </div>
        <img ref={imgRef} alt="preview" className="mt-4 max-h-64 object-contain" src={file ? URL.createObjectURL(file) : undefined} />
      </div>
    </div>
  );
};

export default ExifViewerTool;


