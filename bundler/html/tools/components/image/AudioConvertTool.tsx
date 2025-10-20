import React, { useState } from 'react';

function encodeWav(samples: Float32Array, sampleRate: number): Blob {
  const numChannels = 1;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const buffer = new ArrayBuffer(44 + samples.length * bytesPerSample);
  const view = new DataView(buffer);
  let offset = 0;
  function writeString(s: string) { for (let i=0;i<s.length;i++) view.setUint8(offset++, s.charCodeAt(i)); }
  function writeUint32(v: number) { view.setUint32(offset, v, true); offset += 4; }
  function writeUint16(v: number) { view.setUint16(offset, v, true); offset += 2; }
  // RIFF header
  writeString('RIFF'); writeUint32(36 + samples.length * bytesPerSample); writeString('WAVE');
  // fmt chunk
  writeString('fmt '); writeUint32(16); writeUint16(1); writeUint16(numChannels); writeUint32(sampleRate);
  writeUint32(sampleRate * blockAlign); writeUint16(blockAlign); writeUint16(8 * bytesPerSample);
  // data chunk
  writeString('data'); writeUint32(samples.length * bytesPerSample);
  // PCM samples
  for (let i=0;i<samples.length;i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true); offset += 2;
  }
  return new Blob([view], { type: 'audio/wav' });
}

const AudioConvertTool = () => {
  const [outUrl, setOutUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  const onFile = async (file: File) => {
    setFileName(file.name);
    const arrayBuffer = await file.arrayBuffer();
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer.slice(0));
    // Downmix to mono
    const channelData = audioBuffer.numberOfChannels > 1 ? (() => {
      const l = audioBuffer.getChannelData(0);
      const r = audioBuffer.getChannelData(1);
      const mono = new Float32Array(audioBuffer.length);
      for (let i=0;i<mono.length;i++) mono[i] = (l[i] + r[i]) / 2;
      return mono;
    })() : audioBuffer.getChannelData(0);
    const wav = encodeWav(channelData, audioBuffer.sampleRate);
    setOutUrl(URL.createObjectURL(wav));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">音频格式转换（转 WAV）</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          将各种音频格式转换为WAV格式
        </p>

        <div className="mb-6">
          <label htmlFor="audioUpload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            选择音频文件
          </label>
          <input
            id="audioUpload"
            type="file"
            accept="audio/*,video/*"
            onChange={(e)=>{const f=e.target.files?.[0]; if (f) onFile(f);}}
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        {outUrl && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              转换结果
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">文件名:</span> {fileName}
                </div>
                <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs rounded">
                  WAV
                </div>
              </div>
              <audio controls src={outUrl} className="w-full rounded-lg">
                <track kind="captions" />
              </audio>
              <a
                href={outUrl}
                download="converted.wav"
                className="inline-block mt-4 px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                下载 WAV 文件
              </a>
            </div>
          </div>
        )}

        {!outUrl && (
          <div className="mt-8 text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-all duration-300">
            <div className="mx-auto w-16 h-16 text-gray-400 dark:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h4 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">请上传音频文件</h4>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              支持MP3、OGG、FLAC等音频格式
            </p>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            使用说明
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>选择音频文件进行转换</li>
            <li>支持MP3、OGG、FLAC、AAC等多种音频格式</li>
            <li>转换后的文件为WAV格式，兼容性更好</li>
            <li>点击&quot;下载WAV文件&quot;按钮保存转换结果</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AudioConvertTool;

