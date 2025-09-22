import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route, useNavigate } from "react-router";

// 导入工具组件
import WordCountTool from "./components/text/WordCountTool";
import CaseConverterTool from "./components/text/CaseConverterTool";
import Base64Tool from "./components/encode/Base64Tool";
import JsonFormatterTool from "./components/text/JsonFormatterTool";
import UuidGeneratorTool from "./components/encode/UuidGeneratorTool";
import PasswordGeneratorTool from "./components/random/PasswordGeneratorTool";
import UuidBatchTool from "./components/random/UuidBatchTool";
import DiceRollerTool from "./components/random/DiceRollerTool";
import LotteryPickerTool from "./components/random/LotteryPickerTool";
import StoryPromptTool from "./components/random/StoryPromptTool";
import ColorPickerTool from "./components/color/ColorPickerTool";
import SlugGeneratorTool from "./components/text/SlugGeneratorTool";
import LoremIpsumTool from "./components/text/LoremIpsumTool";
import YamlToJsonTool from "./components/text/YamlToJsonTool";
import HtmlToTextTool from "./components/text/HtmlToTextTool";
import RegexTesterTool from "./components/text/RegexTesterTool";
import HexRgbConverterTool from "./components/color/HexRgbConverterTool";
import UrlEncodeTool from "./components/encode/UrlEncodeTool";
import Md5HashTool from "./components/encode/Md5HashTool";
import UnixTimestampTool from "./components/date/UnixTimestampTool";
import UnitConverterTool from "./components/math/UnitConverterTool";
import RandomColorTool from "./components/random/RandomColorTool";
import CsvToJsonTool from "./components/file/CsvToJsonTool";
import FileHashTool from "./components/file/FileHashTool";
import PdfMergerTool from "./components/file/PdfMergerTool";
import PdfSplitterTool from "./components/file/PdfSplitterTool";
import ExcelToJsonTool from "./components/file/ExcelToJsonTool";
import ZipExtractorTool from "./components/file/ZipExtractorTool";
import TextToPdfTool from "./components/file/TextToPdfTool";

// 颜色/设计工具
import ContrastCheckerTool from "./components/color/ContrastCheckerTool";
import ShadowGeneratorTool from "./components/color/ShadowGeneratorTool";
import BorderRadiusPreviewTool from "./components/color/BorderRadiusPreviewTool";
import PaletteGeneratorTool from "./components/color/PaletteGeneratorTool";
import GradientMakerTool from "./components/color/GradientMakerTool";
import FaviconGeneratorTool from "./components/image/FaviconGeneratorTool";
import CssClampTool from "./components/css/CssClampTool";
import TailwindLookupTool from "./components/css/TailwindLookupTool";

// 图片/多媒体工具
import ImageCompressorTool from "./components/image/ImageCompressorTool";
import ImageResizeTool from "./components/image/ImageResizeTool";
import ImageConvertTool from "./components/image/ImageConvertTool";
import ImageCropTool from "./components/image/ImageCropTool";

// 日期/时间工具
import AgeCalculatorTool from "./components/date/AgeCalculatorTool";
import TimeDiffTool from "./components/date/TimeDiffTool";
import TimezoneConvertTool from "./components/date/TimezoneConvertTool";

// 数学/单位工具
import PercentageCalculatorTool from "./components/math/PercentageCalculatorTool";
import TriangleSolverTool from "./components/math/TriangleSolverTool";
import PrimeCheckerTool from "./components/math/PrimeCheckerTool";

// 编码/加密工具
import JwtDecodeTool from "./components/encode/JwtDecodeTool";
import Sha256HashTool from "./components/encode/Sha256HashTool";
import BcryptHashTool from "./components/encode/BcryptHashTool";

// Web/DevTools工具
import JsonToTsTool from "./components/web/JsonToTsTool";

// 数据/可视化工具
import JsonPlotTool from "./components/data/JsonPlotTool";
import MermaidPreviewTool from "./components/data/MermaidPreviewTool";
import GeoJsonViewerTool from "./components/data/GeoJsonViewerTool";
import HttpStatusLookupTool from "./components/web/HttpStatusLookupTool";
import UserAgentParserTool from "./components/web/UserAgentParserTool";
import MimeSearchTool from "./components/web/MimeSearchTool";
import DnsLookupTool from "./components/web/DnsLookupTool";
import IpInfoTool from "./components/web/IpInfoTool";
import JwtGeneratorTool from "./components/web/JwtGeneratorTool";
import UuidNamespaceTool from "./components/web/UuidNamespaceTool";
import RegexCheatsheetTool from "./components/web/RegexCheatsheetTool";
import JsonDiffViewerTool from "./components/web/JsonDiffViewerTool";

// 工具列表数据
const toolsList = [
  // 文本处理
  { id: "word-count", name: "Word Count", description: "实时统计文本字数", category: "文本处理" },
  { id: "char-case", name: "Case Converter", description: "大小写转换", category: "文本处理" },
  { id: "slugify", name: "Slug Generator", description: "生成 URL-slug", category: "文本处理" },
  { id: "lorem-ipsum", name: "Lorem Ipsum", description: "假文生成", category: "文本处理" },
  { id: "lorem-image", name: "Placeholder Img", description: "占位图片", category: "文本处理" },
  { id: "fake-user", name: "Fake User", description: "虚拟人资料", category: "文本处理" },
  { id: "name-generator", name: "Name Gen", description: "名字生成", category: "文本处理" },
  { id: "quote-generator", name: "Quote Gen", description: "随机名言", category: "文本处理" },
  { id: "uuid-batch", name: "UUID Batch", description: "批量UUID生成", category: "随机生成" },
  { id: "dice-roller", name: "Dice Roll", description: "RPG骰子", category: "随机生成" },
  { id: "lottery-picker", name: "Lottery Pick", description: "抽奖器", category: "随机生成" },
  { id: "story-prompt", name: "Writing Prompt", description: "写作灵感", category: "随机生成" },
  { id: "diff-viewer", name: "Text Diff", description: "文本差异对比", category: "文本处理" },
  { id: "json-pretty", name: "JSON Formatter", description: "JSON 美化 / 压缩", category: "文本处理" },
  { id: "yaml-to-json", name: "YAML→JSON", description: "格式互转", category: "文本处理" },
  { id: "html-to-text", name: "HTML Stripper", description: "提取纯文本", category: "文本处理" },
  { id: "regex-tester", name: "RegEx Tester", description: "正则实时匹配", category: "文本处理" },
  { id: "exif-viewer", name: "EXIF Viewer", description: "查看 / 去除元数据", category: "文本处理" },
  { id: "svg-minify", name: "SVG Minifier", description: "压缩 SVG", category: "文本处理" },
  { id: "gif-split", name: "GIF Splitter", description: "GIF 帧拆分", category: "文本处理" },
  { id: "video-trim", name: "Video Trim", description: "浏览器端剪辑", category: "文本处理" },
  { id: "audio-convert", name: "Audio Convert", description: "音频格式转换", category: "文本处理" },
  { id: "icon-spriter", name: "SVG Sprite Gen", description: "生成雪碧图", category: "文本处理" },
  { id: "cron-parser", name: "Cron Parser", description: "解析 Cron 表达式", category: "文本处理" },
  { id: "week-number", name: "Week No.", description: "ISO 周数", category: "文本处理" },
  { id: "countdown-timer", name: "Countdown", description: "倒计时", category: "文本处理" },
  { id: "date-add", name: "Date Plus", description: "日期加减", category: "文本处理" },
  { id: "working-days", name: "Workdays Calc", description: "工作日计算", category: "文本处理" },
  { id: "calendar-maker", name: "Mini Calendar", description: "生成月历 PNG", category: "文本处理" },
  { id: "unit-convert", name: "Unit Convert", description: "单位换算", category: "文本处理" },
  { id: "percentage-calc", name: "Percentage", description: "百分比计算", category: "文本处理" },
  { id: "triangle-solver", name: "Triangle Solve", description: "三角形求边角", category: "文本处理" },
  { id: "prime-checker", name: "Prime Check", description: "判断质数", category: "文本处理" },
  { id: "quadratic-solver", name: "Quadratic", description: "解一元二次方程", category: "文本处理" },
  { id: "matrix-math", name: "Matrix Ops", description: "矩阵运算", category: "文本处理" },
  { id: "currency-convert", name: "Currency FX", description: "静态汇率换算", category: "文本处理" },
  { id: "roman-numeral", name: "Roman↔Arab", description: "罗马数字转换", category: "文本处理" },
  { id: "base-n", name: "Base-N Convert", description: "进制转换", category: "文本处理" },
  { id: "random-number", name: "RNG", description: "随机数生成", category: "文本处理" },
  { id: "base64-encode", name: "Base64⇄Text", description: "Base64编码/解码", category: "文本处理" },
  { id: "url-encode", name: "URL Encode / Decode", description: "URL编码/解码", category: "文本处理" },
  { id: "jwt-decode", name: "JWT Decoder", description: "解析 JWT", category: "文本处理" },
  { id: "md5-hash", name: "MD5 Hash", description: "计算摘要", category: "文本处理" },
  { id: "sha256-hash", name: "SHA-256 Hash", description: "SHA-256哈希", category: "文本处理" },
  { id: "uuid-generator", name: "UUID v4", description: "UUID生成器", category: "文本处理" },
  { id: "bcrypt-hash", name: "Bcrypt Hash", description: "Bcrypt哈希", category: "文本处理" },
  { id: "qr-generator", name: "QR Maker", description: "二维码生成", category: "文本处理" },
  { id: "barcode-generator", name: "Barcode Maker", description: "条形码生成", category: "文本处理" },
  { id: "password-strength", name: "Pw Strength", description: "密码强度检测", category: "文本处理" },
  { id: "json-to-ts", name: "JSON→TS Interface", description: "JSON转TypeScript接口", category: "文本处理" },
  { id: "http-status", name: "HTTP Status Lookup", description: "HTTP状态码查询", category: "文本处理" },
  { id: "user-agent", name: "UA Parser", description: "用户代理解析", category: "文本处理" },
  { id: "mime-search", name: "MIME Type Search", description: "MIME类型查询", category: "文本处理" },
  { id: "dns-lookup", name: "DNS Lookup", description: "DNS查询", category: "文本处理" },
  { id: "ip-info", name: "IP Info", description: "公网 IP & whois", category: "文本处理" },
  { id: "jwt-generator", name: "JWT Signer", description: "JWT签名", category: "文本处理" },
  { id: "uuid-namespace", name: "UUID v5 生成", description: "UUID v5生成", category: "文本处理" },
  { id: "regex-cheatsheet", name: "RegEx 速查", description: "正则表达式速查", category: "文本处理" },
  { id: "json-diff", name: "JSON Diff Viewer", description: "JSON差异查看器", category: "文本处理" },
  { id: "csv-to-json", name: "CSV→JSON", description: "CSV转JSON", category: "文件处理" },
  { id: "json-to-csv", name: "JSON→CSV", description: "JSON转CSV", category: "文件处理" },
  { id: "text-to-pdf", name: "Text→PDF", description: "文本转PDF", category: "文件处理" },
  { id: "merge-pdf", name: "PDF Merger", description: "PDF合并", category: "文件处理" },
  { id: "split-pdf", name: "PDF Split", description: "PDF分割", category: "文件处理" },
  { id: "excel-to-json", name: "XLSX→JSON", description: "Excel转JSON", category: "文件处理" },
  { id: "zip-extract", name: "ZIP Extract", description: "ZIP解压", category: "文件处理" },
  { id: "image-to-pdf", name: "Img→PDF", description: "图片转PDF", category: "文件处理" },
  { id: "file-hash", name: "File Checksum", description: "文件校验和", category: "文件处理" },
  { id: "csv-preview", name: "CSV Viewer", description: "CSV查看器", category: "文件处理" },
  { id: "json-plot", name: "JSON Plot", description: "JSON图表绘制", category: "数据可视化" },
  { id: "markdown-mermaid", name: "Mermaid Preview", description: "Mermaid预览", category: "数据可视化" },
  { id: "geojson-viewer", name: "GeoJSON Map", description: "GeoJSON地图", category: "数据可视化" },
  { id: "base64-image", name: "Base64 Img Preview", description: "Base64图片预览", category: "文本处理" },
  { id: "html-preview", name: "Live HTML", description: "HTML实时预览", category: "文本处理" },
  { id: "table-sorter", name: "Table Sorter / Filter", description: "表格排序/筛选", category: "文本处理" },
  { id: "url-parser", name: "URL Inspector", description: "URL解析器", category: "文本处理" },
  { id: "email-validator", name: "Email Regex Check", description: "邮箱验证", category: "文本处理" },
  { id: "credit-card-check", name: "Luhn Validator", description: "信用卡号验证", category: "文本处理" }
];

// 首页组件 - 工具列表
function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTools, setFilteredTools] = useState(toolsList);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // 检查系统偏好或本地存储的主题设置
    const isDark = localStorage.getItem("darkMode") === "true" ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches && localStorage.getItem("darkMode") !== "false");
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    // 应用主题
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  useEffect(() => {
    // 根据搜索词过滤工具
    if (!searchTerm) {
      setFilteredTools(toolsList);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = toolsList.filter(tool =>
        tool.name.toLowerCase().includes(term) ||
        tool.description.toLowerCase().includes(term) ||
        tool.category.toLowerCase().includes(term) ||
        tool.id.toLowerCase().includes(term)
      );
      setFilteredTools(filtered);
    }
  }, [searchTerm]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">🛠️ 工具箱</h1>
              <button
                onClick={toggleDarkMode}
                className="md:hidden ml-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>

            <div className="mt-4 md:mt-0 flex-1 md:ml-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索工具..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-2 text-gray-500 dark:text-gray-400"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={toggleDarkMode}
              className="hidden md:block ml-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">共 {filteredTools.length} 个工具</h2>
          <p className="text-gray-600 dark:text-gray-400">
            包含文本处理、颜色设计、图片处理、日期时间、数学单位、编码加密、Web开发、随机生成、文件处理、数据可视化等10个分类
          </p>
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">没有找到匹配的工具</p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              清除搜索
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} darkMode={darkMode} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} 工具箱 - 100个实用工具</p>
        </div>
      </footer>
    </div>
  );
}

// 工具卡片组件
function ToolCard({ tool, darkMode }: { tool: any; darkMode: boolean }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tool/${tool.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg mb-1">{tool.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{tool.description}</p>
          </div>
          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
            {tool.category}
          </span>
        </div>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          ID: {tool.id}
        </div>
      </div>
    </div>
  );
}

// 工具详情页面组件
function ToolPage() {
  const navigate = useNavigate();

  // 获取当前路由参数
  const path = window.location.hash.replace("#/tool/", "");
  const tool = toolsList.find(t => t.id === path);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">工具未找到</h1>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="mr-4 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              ← 返回
            </button>
            <h1 className="text-xl font-bold">{tool.name}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mb-2">
              {tool.category}
            </span>
            <h2 className="text-2xl font-bold mt-2">{tool.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{tool.description}</p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold mb-4">工具功能</h3>
            <div className="min-h-[300px]">
              {/* 这里将实现具体的工具功能 */}
              <ToolComponent toolId={tool.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// 工具组件 - 根据工具ID渲染不同的功能
function ToolComponent({ toolId }: { toolId: string }) {
  switch (toolId) {
    // 文本处理工具
    case "word-count":
      return <WordCountTool />;
    case "char-case":
      return <CaseConverterTool />;
    case "slugify":
      return <SlugGeneratorTool />;
    case "lorem-ipsum":
      return <LoremIpsumTool />;
    case "json-pretty":
      return <JsonFormatterTool />;
    case "yaml-to-json":
      return <YamlToJsonTool />;
    case "html-to-text":
      return <HtmlToTextTool />;
    case "regex-tester":
      return <RegexTesterTool />;

    // 编码/加密工具
    case "base64-encode":
      return <Base64Tool />;
    case "url-encode":
      return <UrlEncodeTool />;
    case "md5-hash":
      return <Md5HashTool />;
    case "uuid-generator":
      return <UuidGeneratorTool />;
    case "jwt-decode":
      return <JwtDecodeTool />;
    case "sha256-hash":
      return <Sha256HashTool />;
    case "bcrypt-hash":
      return <BcryptHashTool />;

    // 颜色/设计工具
    case "color-picker":
      return <ColorPickerTool />;
    case "hex-rgb":
      return <HexRgbConverterTool />;
    case "palette-generator":
      return <PaletteGeneratorTool />;
    case "contrast-checker":
      return <ContrastCheckerTool />;
    case "gradient-maker":
      return <GradientMakerTool />;
    case "shadow-generator":
      return <ShadowGeneratorTool />;
    case "border-radius":
      return <BorderRadiusPreviewTool />;
    case "favicon-generator":
      return <FaviconGeneratorTool />;
    case "css-clamp":
      return <CssClampTool />;
    case "tailwind-cheatsheet":
      return <TailwindLookupTool />;

    // 日期/时间工具
    case "unix-timestamp":
      return <UnixTimestampTool />;
    case "age-calculator":
      return <AgeCalculatorTool />;
    case "time-diff":
      return <TimeDiffTool />;
    case "timezone-convert":
      return <TimezoneConvertTool />;

    // 数学/单位工具
    case "unit-convert":
      return <UnitConverterTool />;
    case "percentage-calc":
      return <PercentageCalculatorTool />;
    case "triangle-solver":
      return <TriangleSolverTool />;
    case "prime-checker":
      return <PrimeCheckerTool />;

    // 随机/生成器工具
    case "password-generator":
      return <PasswordGeneratorTool />;
    case "random-color":
      return <RandomColorTool />;
    case "uuid-batch":
      return <UuidBatchTool />;
    case "dice-roller":
      return <DiceRollerTool />;
    case "lottery-picker":
      return <LotteryPickerTool />;
    case "story-prompt":
      return <StoryPromptTool />;

    // 文件/文档工具
    case "csv-to-json":
      return <CsvToJsonTool />;
    case "file-hash":
      return <FileHashTool />;
    case "merge-pdf":
      return <PdfMergerTool />;
    case "split-pdf":
      return <PdfSplitterTool />;
    case "excel-to-json":
      return <ExcelToJsonTool />;
    case "zip-extract":
      return <ZipExtractorTool />;
    case "text-to-pdf":
      return <TextToPdfTool />;

    // 图片/多媒体工具
    case "image-compress":
      return <ImageCompressorTool />;
    case "image-resize":
      return <ImageResizeTool />;
    case "image-convert":
      return <ImageConvertTool />;
    case "image-crop":
      return <ImageCropTool />;

    // Web/DevTools工具
    case "json-to-ts":
      return <JsonToTsTool />;
    case "http-status":
      return <HttpStatusLookupTool />;
    case "user-agent":
      return <UserAgentParserTool />;
    case "mime-search":
      return <MimeSearchTool />;
    case "dns-lookup":
      return <DnsLookupTool />;
    case "ip-info":
      return <IpInfoTool />;
    case "jwt-generator":
      return <JwtGeneratorTool />;
    case "uuid-namespace":
      return <UuidNamespaceTool />;
    case "regex-cheatsheet":
      return <RegexCheatsheetTool />;
    case "json-diff":
      return <JsonDiffViewerTool />;

    // 数据/可视化工具
    case "json-plot":
      return <JsonPlotTool />;
    case "markdown-mermaid":
      return <MermaidPreviewTool />;
    case "geojson-viewer":
      return <GeoJsonViewerTool />;

    // 以下工具尚未实现，显示占位符
    default:
      return (
        <div className="flex flex-col items-center justify-center h-full text-center py-12">
          <div className="text-5xl mb-4">🛠️</div>
          <h3 className="text-xl font-semibold mb-2">{toolId} 工具</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            这个工具正在开发中，我们将尽快为您呈现完整的功能。
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-4">
            工具ID: {toolId}
          </p>
        </div>
      );
  }
}

// 主应用组件
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tool/:id" element={<ToolPage />} />
      </Routes>
    </Router>
  );
}

// 渲染应用
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
  }
});
