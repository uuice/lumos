import React, { useMemo, useState } from 'react';

const Base64ImageTool = () => {
  const [dataUri, setDataUri] = useState<string>('');
  const valid = useMemo(()=>/^data:image\/(png|jpeg|gif|webp);base64,/.test(dataUri), [dataUri]);

  const onFile = async (file: File) => {
    const buf = await file.arrayBuffer();
    const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
    setDataUri(`data:${file.type};base64,${b64}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Base64 图片预览</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="imageFile">选择图片文件:</label>
          <input
            id="imageFile"
            type="file"
            accept="image/*"
            onChange={(e)=>{const f=e.target.files?.[0]; if (f) onFile(f);}}
            className="block w-full text-sm text-gray-500 dark:text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-500 file:text-white
              hover:file:bg-blue-600
              dark:file:bg-blue-600 dark:hover:file:bg-blue-700
              transition-all duration-300"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="base64Data">或粘贴 Base64 数据:</label>
          <textarea
            id="base64Data"
            value={dataUri}
            onChange={(e)=>setDataUri(e.target.value)}
            placeholder="或粘贴 data:image/...;base64,..."
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-xs dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
        </div>
        {!valid && dataUri && <div className="text-sm text-yellow-600 dark:text-yellow-400 mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/50">看起来不像有效的图片 data URI</div>}
        {valid && (
          <div className="mt-5 bg-white dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">图片预览:</h3>
            <img src={dataUri} alt="preview" className="max-h-96 object-contain rounded-lg border border-gray-300 dark:border-gray-600 mx-auto transition-all duration-300" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Base64ImageTool;


