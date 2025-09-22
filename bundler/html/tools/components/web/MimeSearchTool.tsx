import React, { useState } from "react";

const MimeSearchTool: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // 常见MIME类型数据库
  const mimeTypes = [
    { extension: ".aac", type: "audio/aac", description: "AAC音频文件" },
    { extension: ".abw", type: "application/x-abiword", description: "AbiWord文档" },
    { extension: ".arc", type: "application/x-freearc", description: "归档文档" },
    { extension: ".avi", type: "video/x-msvideo", description: "AVI视频" },
    { extension: ".azw", type: "application/vnd.amazon.ebook", description: "Amazon Kindle电子书格式" },
    { extension: ".bin", type: "application/octet-stream", description: "二进制数据" },
    { extension: ".bmp", type: "image/bmp", description: "Windows OS/2位图图片" },
    { extension: ".bz", type: "application/x-bzip", description: "BZip归档" },
    { extension: ".bz2", type: "application/x-bzip2", description: "BZip2归档" },
    { extension: ".csh", type: "application/x-csh", description: "C-Shell脚本" },
    { extension: ".css", type: "text/css", description: "层叠样式表(CSS)" },
    { extension: ".csv", type: "text/csv", description: "逗号分隔值(CSV)" },
    { extension: ".doc", type: "application/msword", description: "Microsoft Word" },
    { extension: ".docx", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", description: "Microsoft Word (OpenXML)" },
    { extension: ".eot", type: "application/vnd.ms-fontobject", description: "MS Embedded OpenType字体" },
    { extension: ".epub", type: "application/epub+zip", description: "Electronic publication (EPUB)" },
    { extension: ".gz", type: "application/gzip", description: "GZip压缩档案" },
    { extension: ".gif", type: "image/gif", description: "图形交换格式(GIF)" },
    { extension: ".htm", type: "text/html", description: "超文本标记语言(HTML)" },
    { extension: ".html", type: "text/html", description: "超文本标记语言(HTML)" },
    { extension: ".ico", type: "image/vnd.microsoft.icon", description: "图标格式" },
    { extension: ".ics", type: "text/calendar", description: "iCalendar格式" },
    { extension: ".jar", type: "application/java-archive", description: "Java归档(JAR)" },
    { extension: ".jpeg", type: "image/jpeg", description: "JPEG图像" },
    { extension: ".jpg", type: "image/jpeg", description: "JPEG图像" },
    { extension: ".js", type: "text/javascript", description: "JavaScript" },
    { extension: ".json", type: "application/json", description: "JSON格式" },
    { extension: ".jsonld", type: "application/ld+json", description: "JSON-LD格式" },
    { extension: ".mid", type: "audio/midi", description: "乐器数字接口(MIDI)" },
    { extension: ".midi", type: "audio/midi", description: "乐器数字接口(MIDI)" },
    { extension: ".mjs", type: "text/javascript", description: "JavaScript模块" },
    { extension: ".mp3", type: "audio/mpeg", description: "MP3音频" },
    { extension: ".mpeg", type: "video/mpeg", description: "MPEG视频" },
    { extension: ".mpkg", type: "application/vnd.apple.installer+xml", description: "Apple安装程序包" },
    { extension: ".odp", type: "application/vnd.oasis.opendocument.presentation", description: "OpenDocument演示文稿文档" },
    { extension: ".ods", type: "application/vnd.oasis.opendocument.spreadsheet", description: "OpenDocument电子表格文档" },
    { extension: ".odt", type: "application/vnd.oasis.opendocument.text", description: "OpenDocument文本文档" },
    { extension: ".oga", type: "audio/ogg", description: "OGG音频" },
    { extension: ".ogv", type: "video/ogg", description: "OGG视频" },
    { extension: ".ogx", type: "application/ogg", description: "OGG" },
    { extension: ".opus", type: "audio/opus", description: "Opus音频" },
    { extension: ".otf", type: "font/otf", description: "OpenType字体" },
    { extension: ".png", type: "image/png", description: "便携式网络图形(PNG)" },
    { extension: ".pdf", type: "application/pdf", description: "Adobe可移植文档格式(PDF)" },
    { extension: ".php", type: "application/x-httpd-php", description: "Hypertext Preprocessor (PHP)" },
    { extension: ".ppt", type: "application/vnd.ms-powerpoint", description: "Microsoft PowerPoint" },
    { extension: ".pptx", type: "application/vnd.openxmlformats-officedocument.presentationml.presentation", description: "Microsoft PowerPoint (OpenXML)" },
    { extension: ".rar", type: "application/vnd.rar", description: "RAR归档" },
    { extension: ".rtf", type: "application/rtf", description: "富文本格式(RTF)" },
    { extension: ".sh", type: "application/x-sh", description: "Bourne shell脚本" },
    { extension: ".svg", type: "image/svg+xml", description: "可缩放矢量图形(SVG)" },
    { extension: ".swf", type: "application/x-shockwave-flash", description: "Small web format (SWF) or Adobe Flash document" },
    { extension: ".tar", type: "application/x-tar", description: "Tape Archive (TAR)" },
    { extension: ".tif", type: "image/tiff", description: "标记图像文件格式(TIFF)" },
    { extension: ".tiff", type: "image/tiff", description: "标记图像文件格式(TIFF)" },
    { extension: ".ts", type: "video/mp2t", description: "MPEG传输流" },
    { extension: ".ttf", type: "font/ttf", description: "TrueType字体" },
    { extension: ".txt", type: "text/plain", description: "文本文件(通常为ASCII或ISO-8859-1)" },
    { extension: ".vsd", type: "application/vnd.visio", description: "Microsoft Visio" },
    { extension: ".wav", type: "audio/wav", description: "波形音频格式(WAV)" },
    { extension: ".weba", type: "audio/webm", description: "WEBM音频" },
    { extension: ".webm", type: "video/webm", description: "WEBM视频" },
    { extension: ".webp", type: "image/webp", description: "WEBP图像" },
    { extension: ".woff", type: "font/woff", description: "Web开放字体格式(WOFF)" },
    { extension: ".woff2", type: "font/woff2", description: "Web开放字体格式(WOFF)" },
    { extension: ".xhtml", type: "application/xhtml+xml", description: "XHTML" },
    { extension: ".xls", type: "application/vnd.ms-excel", description: "Microsoft Excel" },
    { extension: ".xlsx", type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", description: "Microsoft Excel (OpenXML)" },
    { extension: ".xml", type: "application/xml", description: "XML" },
    { extension: ".xul", type: "application/vnd.mozilla.xul+xml", description: "XUL" },
    { extension: ".zip", type: "application/zip", description: "ZIP归档" },
    { extension: ".3gp", type: "video/3gpp", description: "3GPP音频/视频容器" },
    { extension: ".3g2", type: "video/3gpp2", description: "3GPP2音频/视频容器" },
    { extension: ".7z", type: "application/x-7z-compressed", description: "7-zip归档" }
  ];

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = mimeTypes.filter(item =>
      item.extension.toLowerCase().includes(term) ||
      item.type.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term)
    );

    setSearchResults(results);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">MIME类型查询工具</h2>
        <p className="text-gray-600 dark:text-gray-400">
          查询文件扩展名对应的MIME类型，或根据MIME类型查找文件扩展名
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="输入文件扩展名、MIME类型或描述..."
            className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            搜索
          </button>
        </div>
      </div>

      {searchResults.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">扩展名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">MIME类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">描述</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {searchResults.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {item.extension}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => copyToClipboard(item.type)}
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        复制MIME
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">MIME类型查询</h3>
          <p className="text-gray-500 dark:text-gray-400">
            在上方输入框中输入文件扩展名、MIME类型或描述进行搜索
          </p>
        </div>
      )}

      {searchTerm && searchResults.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">未找到匹配结果</h3>
          <p className="text-gray-500 dark:text-gray-400">
            没有找到与 "{searchTerm}" 相关的MIME类型信息
          </p>
        </div>
      )}
    </div>
  );
};

export default MimeSearchTool;
