import React, { useRef, useState } from 'react';

const VideoTrimTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);
  const [blobUrl, setBlobUrl] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const loadFile = (f: File) => {
    setFile(f);
    setBlobUrl(URL.createObjectURL(f));
  };

  const trim = async () => {
    const video = videoRef.current; const canvas = canvasRef.current;
    if (!video || !canvas || !file) return;
    await video.play().catch(()=>{});
    video.pause();
    video.currentTime = start;
    await new Promise(r=>video.onseeked = ()=>r(null));
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    const stream = (canvas as HTMLCanvasElement).captureStream();
    const chunks: BlobPart[] = [];
    const rec = new MediaRecorder(stream as MediaStream, { mimeType: 'video/webm;codecs=vp9' });
    rec.ondataavailable = (e)=>{ if (e.data.size) chunks.push(e.data); };
    const off = canvas.getContext('2d');
    rec.start(100);
    const fps = 30;
    const draw = () => {
      off?.drawImage(video, 0, 0, canvas.width, canvas.height);
    };
    const interval = setInterval(draw, 1000/fps);
    await video.play();
    await new Promise<void>((resolve)=>{
      const onTimeUpdate = () => { if (video.currentTime >= end) { video.pause(); resolve(); } };
      video.addEventListener('timeupdate', onTimeUpdate, { once: false });
    });
    clearInterval(interval);
    rec.stop();
    await new Promise(r=>rec.onstop = ()=>r(null));
    const out = new Blob(chunks, { type: 'video/webm' });
    setBlobUrl(URL.createObjectURL(out));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">视频裁剪（浏览器端 WebM）</h2>
        <input type="file" accept="video/*" onChange={(e)=>{const f=e.target.files?.[0]; if (f) loadFile(f);}} />
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">选择开始/结束秒数，然后导出 WebM 片段</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 items-end">
          <div>
            <label className="block text-sm mb-1">开始 (s)</label>
            <input type="number" value={start} onChange={(e)=>setStart(parseFloat(e.target.value||'0'))} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm mb-1">结束 (s)</label>
            <input type="number" value={end} onChange={(e)=>setEnd(parseFloat(e.target.value||'0'))} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <button onClick={trim} disabled={!file || end<=start} className={`px-4 py-2 rounded-md ${(!file||end<=start)?'bg-gray-200 text-gray-500':'bg-blue-500 text-white hover:bg-blue-600'}`}>导出 WebM</button>
        </div>
        <video ref={videoRef} src={file?URL.createObjectURL(file):undefined} controls className="mt-4 w-full rounded" />
        <canvas ref={canvasRef} className="hidden" />
        {blobUrl && (
          <a href={blobUrl} download="trimmed.webm" className="inline-block mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">下载结果</a>
        )}
      </div>
    </div>
  );
};

export default VideoTrimTool;




