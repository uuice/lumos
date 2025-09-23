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
import PlaceholderImageTool from "./components/random/PlaceholderImageTool";
import FakeUserTool from "./components/random/FakeUserTool";
import NameGeneratorTool from "./components/random/NameGeneratorTool";
import QuoteGeneratorTool from "./components/random/QuoteGeneratorTool";
import ColorPickerTool from "./components/color/ColorPickerTool";
import SlugGeneratorTool from "./components/text/SlugGeneratorTool";
import LoremIpsumTool from "./components/text/LoremIpsumTool";
import YamlToJsonTool from "./components/text/YamlToJsonTool";
import HtmlToTextTool from "./components/text/HtmlToTextTool";
import RegexTesterTool from "./components/text/RegexTesterTool";
import MarkdownPreviewTool from "./components/text/MarkdownPreviewTool";
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
import JsonToCsvTool from "./components/file/JsonToCsvTool";
import ImageToPdfTool from "./components/file/ImageToPdfTool";

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
import ExifViewerTool from "./components/image/ExifViewerTool";
import SvgMinifyTool from "./components/image/SvgMinifyTool";
import GifSplitTool from "./components/image/GifSplitTool";
import VideoTrimTool from "./components/image/VideoTrimTool";
import AudioConvertTool from "./components/image/AudioConvertTool";
import IconSpriterTool from "./components/image/IconSpriterTool";

// 日期/时间工具
import AgeCalculatorTool from "./components/date/AgeCalculatorTool";
import TimeDiffTool from "./components/date/TimeDiffTool";
import TimezoneConvertTool from "./components/date/TimezoneConvertTool";
import WeekNumberTool from "./components/date/WeekNumberTool";
import CountdownTimerTool from "./components/date/CountdownTimerTool";
import DateAddTool from "./components/date/DateAddTool";
import WorkingDaysTool from "./components/date/WorkingDaysTool";
import CalendarMakerTool from "./components/date/CalendarMakerTool";

// 数学/单位工具
import PercentageCalculatorTool from "./components/math/PercentageCalculatorTool";
import TriangleSolverTool from "./components/math/TriangleSolverTool";
import PrimeCheckerTool from "./components/math/PrimeCheckerTool";
import QuadraticSolverTool from "./components/math/QuadraticSolverTool";
import MatrixMathTool from "./components/math/MatrixMathTool";
import CurrencyConvertTool from "./components/math/CurrencyConvertTool";
import RomanNumeralTool from "./components/math/RomanNumeralTool";
import BaseNConvertTool from "./components/math/BaseNConvertTool";
import RandomNumberTool from "./components/math/RandomNumberTool";

// 编码/加密工具
import JwtDecodeTool from "./components/encode/JwtDecodeTool";
import Sha256HashTool from "./components/encode/Sha256HashTool";
import BcryptHashTool from "./components/encode/BcryptHashTool";
import QrGeneratorTool from "./components/encode/QrGeneratorTool";
import BarcodeGeneratorTool from "./components/encode/BarcodeGeneratorTool";
import PasswordStrengthTool from "./components/encode/PasswordStrengthTool";

// Web/DevTools工具
import JsonToTsTool from "./components/web/JsonToTsTool";

// 数据/可视化工具
import JsonPlotTool from "./components/data/JsonPlotTool";
import CsvPreviewTool from "./components/data/CsvPreviewTool";
import Base64ImageTool from "./components/data/Base64ImageTool";
import HtmlPreviewTool from "./components/data/HtmlPreviewTool";
import TableSorterTool from "./components/data/TableSorterTool";

// 添加缺失的导入
import DiffViewerTool from "./components/text/DiffViewerTool";
import CronParserTool from "./components/date/CronParserTool";
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
import UrlParserTool from "./components/web/UrlParserTool";
import EmailValidatorTool from "./components/web/EmailValidatorTool";
import CreditCardCheckTool from "./components/web/CreditCardCheckTool";
import MarkdownTocTool from "./components/text/MarkdownTocTool";

// 工具列表数据（100项）
const toolsList = [
  // 文本处理
  { id: "word-count", name: "Word Count", description: "实时统计文本字数", category: "文本处理" },
  { id: "char-case", name: "Case Converter", description: "大小写转换", category: "文本处理" },
  { id: "slugify", name: "Slug Generator", description: "生成 URL-slug", category: "文本处理" },
  { id: "lorem-ipsum", name: "Lorem Ipsum", description: "假文生成", category: "文本处理" },
  { id: "markdown-preview", name: "Markdown Preview", description: "MD→HTML 预览", category: "文本处理" },
  { id: "json-pretty", name: "JSON Formatter", description: "JSON 美化 / 压缩", category: "文本处理" },
  { id: "yaml-to-json", name: "YAML→JSON", description: "格式互转", category: "文本处理" },
  { id: "html-to-text", name: "HTML Stripper", description: "提取纯文本", category: "文本处理" },
  { id: "regex-tester", name: "RegEx Tester", description: "正则实时匹配", category: "文本处理" },
  { id: "diff-viewer", name: "Text Diff", description: "文本差异对比", category: "文本处理" },

  // 颜色 / 设计
  { id: "color-picker", name: "Color Picker", description: "取色并复制十六进制", category: "颜色/设计" },
  { id: "hex-rgb", name: "HEX↔RGB", description: "颜色格式互转", category: "颜色/设计" },
  { id: "palette-generator", name: "Palette Maker", description: "自动配色", category: "颜色/设计" },
  { id: "contrast-checker", name: "Contrast Checker", description: "对比度检测", category: "颜色/设计" },
  { id: "gradient-maker", name: "Gradient Maker", description: "CSS 渐变生成", category: "颜色/设计" },
  { id: "shadow-generator", name: "Shadow CSS", description: "盒阴影调配", category: "颜色/设计" },
  { id: "border-radius", name: "Radius Preview", description: "圆角可视化", category: "颜色/设计" },
  { id: "favicon-generator", name: "Favicon Maker", description: "生成多尺寸 ICO", category: "颜色/设计" },
  { id: "css-clamp", name: "CSS Clamp", description: "Fluid size 计算", category: "颜色/设计" },
  { id: "tailwind-cheatsheet", name: "Tailwind Lookup", description: "类名速查", category: "颜色/设计" },

  // 图片 / 多媒体
  { id: "image-compress", name: "Image Compressor", description: "客户端压缩 JPG/PNG/WebP", category: "图片/多媒体" },
  { id: "image-resize", name: "Resize Image", description: "图像等比缩放", category: "图片/多媒体" },
  { id: "image-convert", name: "Format Convert", description: "PNG↔WebP↔JPG", category: "图片/多媒体" },
  { id: "image-crop", name: "Crop Image", description: "裁剪并导出", category: "图片/多媒体" },
  { id: "exif-viewer", name: "EXIF Viewer", description: "查看 / 去除元数据", category: "图片/多媒体" },
  { id: "svg-minify", name: "SVG Minifier", description: "压缩 SVG", category: "图片/多媒体" },
  { id: "gif-split", name: "GIF Splitter", description: "GIF 帧拆分", category: "图片/多媒体" },
  { id: "video-trim", name: "Video Trim", description: "浏览器端剪辑", category: "图片/多媒体" },
  { id: "audio-convert", name: "Audio Convert", description: "音频格式转换", category: "图片/多媒体" },
  { id: "icon-spriter", name: "SVG Sprite Gen", description: "生成雪碧图", category: "图片/多媒体" },

  // 日期 / 时间
  { id: "unix-timestamp", name: "Timestamp↔Date", description: "时间戳互转", category: "日期/时间" },
  { id: "cron-parser", name: "Cron Parser", description: "解析 Cron 表达式", category: "日期/时间" },
  { id: "age-calculator", name: "Age Calc", description: "计算年龄", category: "日期/时间" },
  { id: "time-diff", name: "Time Diff", description: "日期间隔", category: "日期/时间" },
  { id: "timezone-convert", name: "TZ Convert", description: "时区换算", category: "日期/时间" },
  { id: "week-number", name: "Week No.", description: "ISO 周数", category: "日期/时间" },
  { id: "countdown-timer", name: "Countdown", description: "倒计时", category: "日期/时间" },
  { id: "date-add", name: "Date Plus", description: "日期加减", category: "日期/时间" },
  { id: "working-days", name: "Workdays Calc", description: "工作日计算", category: "日期/时间" },
  { id: "calendar-maker", name: "Mini Calendar", description: "生成月历 PNG", category: "日期/时间" },

  // 数学 / 单位
  { id: "unit-convert", name: "Unit Convert", description: "单位换算", category: "数学/单位" },
  { id: "percentage-calc", name: "Percentage", description: "百分比计算", category: "数学/单位" },
  { id: "triangle-solver", name: "Triangle Solve", description: "三角形求边角", category: "数学/单位" },
  { id: "prime-checker", name: "Prime Check", description: "判断质数", category: "数学/单位" },
  { id: "quadratic-solver", name: "Quadratic", description: "解一元二次方程", category: "数学/单位" },
  { id: "matrix-math", name: "Matrix Ops", description: "矩阵运算", category: "数学/单位" },
  { id: "currency-convert", name: "Currency FX", description: "静态汇率换算", category: "数学/单位" },
  { id: "roman-numeral", name: "Roman↔Arab", description: "罗马数字转换", category: "数学/单位" },
  { id: "base-n", name: "Base-N Convert", description: "进制转换", category: "数学/单位" },
  { id: "random-number", name: "RNG", description: "随机数生成", category: "数学/单位" },

  // 编码 / 加密
  { id: "base64-encode", name: "Base64⇄Text", description: "Base64 编解码", category: "编码/加密" },
  { id: "url-encode", name: "URL Encode / Decode", description: "URL 编解码", category: "编码/加密" },
  { id: "jwt-decode", name: "JWT Decoder", description: "解析 JWT", category: "编码/加密" },
  { id: "md5-hash", name: "MD5 Hash", description: "计算摘要", category: "编码/加密" },
  { id: "sha256-hash", name: "SHA-256 Hash", description: "SHA-256 哈希", category: "编码/加密" },
  { id: "uuid-generator", name: "UUID v4", description: "UUID v4 生成", category: "编码/加密" },
  { id: "bcrypt-hash", name: "Bcrypt Hash", description: "Bcrypt 哈希", category: "编码/加密" },
  { id: "qr-generator", name: "QR Maker", description: "二维码生成", category: "编码/加密" },
  { id: "barcode-generator", name: "Barcode Maker", description: "条形码生成", category: "编码/加密" },
  { id: "password-strength", name: "Pw Strength", description: "密码强度检测", category: "编码/加密" },

  // Web/DevTools
  { id: "dns-lookup", name: "DNS Lookup", description: "DNS Lookup", category: "Web/DevTools" },
  { id: "ip-info", name: "IP Info", description: "公网 IP & whois", category: "Web/DevTools" },
  { id: "jwt-generator", name: "JWT Signer", description: "本地 HS256", category: "Web/DevTools" },
  { id: "uuid-namespace", name: "UUID v5 生成", description: "UUID v5 生成", category: "Web/DevTools" },
  { id: "regex-cheatsheet", name: "RegEx 速查", description: "正则速查", category: "Web/DevTools" },
  { id: "json-diff", name: "JSON Diff Viewer", description: "JSON Diff Viewer", category: "Web/DevTools" },
  { id: "http-status", name: "HTTP Status Lookup", description: "HTTP 状态码查询", category: "Web/DevTools" },
  { id: "user-agent", name: "User Agent Parser", description: "User Agent 解析", category: "Web/DevTools" },
  { id: "mime-search", name: "MIME Type Search", description: "MIME 类型查询", category: "Web/DevTools" },
  { id: "json-to-ts", name: "JSON to TypeScript", description: "JSON 转 TypeScript", category: "Web/DevTools" },
  { id: "url-parser", name: "URL Inspector", description: "URL 解析", category: "Web/DevTools" },
  { id: "email-validator", name: "Email Regex Check", description: "邮箱校验", category: "Web/DevTools" },
  { id: "credit-card-check", name: "Luhn Validator", description: "信用卡校验", category: "Web/DevTools" },

  // 随机 / 生成器
  { id: "lorem-image", name: "Placeholder Img", description: "Placeholder Img", category: "随机/生成器" },
  { id: "fake-user", name: "Fake User", description: "虚拟人资料", category: "随机/生成器" },
  { id: "random-color", name: "Random Color", description: "随机颜色", category: "随机/生成器" },
  { id: "name-generator", name: "Name Gen", description: "名字生成", category: "随机/生成器" },
  { id: "quote-generator", name: "Quote Gen", description: "随机名言", category: "随机/生成器" },
  { id: "password-generator", name: "Password Gen", description: "密码生成", category: "随机/生成器" },
  { id: "uuid-batch", name: "UUID Batch", description: "批量生成 UUID", category: "随机/生成器" },
  { id: "dice-roller", name: "Dice Roll", description: "RPG 骰子", category: "随机/生成器" },
  { id: "lottery-picker", name: "Lottery Pick", description: "抽奖器", category: "随机/生成器" },
  { id: "story-prompt", name: "Writing Prompt", description: "写作灵感", category: "随机/生成器" },

  // 文件 / 文档
  { id: "csv-to-json", name: "CSV→JSON", description: "CSV→JSON", category: "文件/文档" },
  { id: "json-to-csv", name: "JSON→CSV", description: "JSON→CSV", category: "文件/文档" },
  { id: "text-to-pdf", name: "Text→PDF", description: "Text→PDF", category: "文件/文档" },
  { id: "merge-pdf", name: "PDF Merger", description: "PDF 合并", category: "文件/文档" },
  { id: "split-pdf", name: "PDF Split", description: "PDF 拆分", category: "文件/文档" },
  { id: "excel-to-json", name: "XLSX→JSON", description: "XLSX→JSON", category: "文件/文档" },
  { id: "zip-extract", name: "ZIP Extract", description: "ZIP 解压", category: "文件/文档" },
  { id: "image-to-pdf", name: "Img→PDF", description: "图片→PDF", category: "文件/文档" },
  { id: "file-hash", name: "File Checksum", description: "文件校验", category: "文件/文档" },
  { id: "markdown-toc", name: "MD TOC", description: "MD 目录生成", category: "文件/文档" },

  // 数据 / 可视化
  { id: "csv-preview", name: "CSV Viewer", description: "CSV 预览", category: "数据/可视化" },
  { id: "json-plot", name: "JSON Plot", description: "Chart.js", category: "数据/可视化" },
  { id: "markdown-mermaid", name: "Mermaid Preview", description: "Mermaid 预览", category: "数据/可视化" },
  { id: "geojson-viewer", name: "GeoJSON Map", description: "GeoJSON 地图", category: "数据/可视化" },
  { id: "base64-image", name: "Base64 Img Preview", description: "Base64 图片预览", category: "数据/可视化" },
  { id: "html-preview", name: "Live HTML", description: "iframe 预览", category: "数据/可视化" },
  { id: "table-sorter", name: "Table Sorter / Filter", description: "表格排序/筛选", category: "数据/可视化" },
];

// 首页组件 - 工具列表
function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTools, setFilteredTools] = useState(toolsList);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("全部");

  // 获取所有分类
  const categories = ["全部", ...new Set(toolsList.map(tool => tool.category))];

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
    // 根据搜索词和分类过滤工具
    let filtered = toolsList;

    // 按分类过滤
    if (selectedCategory !== "全部") {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    // 按搜索词过滤
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(term) ||
        tool.description.toLowerCase().includes(term) ||
        tool.category.toLowerCase().includes(term) ||
        tool.id.toLowerCase().includes(term)
      );
    }

    setFilteredTools(filtered);
  }, [searchTerm, selectedCategory]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gradient-to-br from-gray-900 to-gray-800 text-white" : "bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-900"}`}>
      <header className={`sticky top-0 z-10 shadow-md transition-colors duration-300 ${darkMode ? "bg-gray-800/90 backdrop-blur-sm" : "bg-white/90 backdrop-blur-sm"}`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                🛠️ 工具箱
              </h1>
              <button
                onClick={toggleDarkMode}
                className="md:hidden ml-4 p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label={darkMode ? "切换到浅色模式" : "切换到深色模式"}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>

            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索工具..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white shadow-sm transition-all duration-200"
                />
                {searchTerm ? (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    aria-label="清除搜索"
                  >
                    ✕
                  </button>
                ) : (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    🔍
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={toggleDarkMode}
              className="hidden md:flex items-center gap-2 px-4 py-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {darkMode ? "☀️ 浅色模式" : "🌙 深色模式"}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center fade-in">
          <h2 className="text-2xl font-bold mb-2">共 <span className="gradient-text">{filteredTools.length}</span> 个实用工具</h2>
          <p className={`max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            包含文本处理、颜色设计、图片处理、日期时间、数学单位、编码加密、Web开发、随机生成、文件处理、数据可视化等10个分类
          </p>
        </div>

        {/* 分类导航 */}
        <div className="mb-8 overflow-x-auto pb-2 fade-in">
          <div className="flex justify-center gap-2 min-w-max">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : darkMode
                      ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                      : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-16 fade-in">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold mb-4">没有找到匹配的工具</h3>
            <p className={`mb-6 max-w-md mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              请尝试调整搜索关键词或选择其他分类
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("全部");
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              清除筛选
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool, index) => (
              <div key={tool.id} className="fade-in" style={{animationDelay: `${index * 0.05}s`}}>
                <ToolCard tool={tool} darkMode={darkMode} />
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className={`border-t transition-colors duration-300 ${darkMode ? "bg-gray-800/80 border-gray-700 text-gray-400" : "bg-white/80 border-gray-200 text-gray-600"}`}>
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="mb-2">© {new Date().getFullYear()} 工具箱 - 100个实用工具</p>
          <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            让工作更高效，让生活更便捷
          </p>
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

  // 根据分类设置不同的标签颜色
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      "文本处理": "bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/80 dark:to-blue-800/80 text-blue-800 dark:text-blue-200",
      "颜色/设计": "bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/80 dark:to-purple-800/80 text-purple-800 dark:text-purple-200",
      "图片/多媒体": "bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900/80 dark:to-pink-800/80 text-pink-800 dark:text-pink-200",
      "日期/时间": "bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/80 dark:to-green-800/80 text-green-800 dark:text-green-200",
      "数学/单位": "bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/80 dark:to-yellow-800/80 text-yellow-800 dark:text-yellow-200",
      "编码/加密": "bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/80 dark:to-red-800/80 text-red-800 dark:text-red-200",
      "Web/DevTools": "bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-indigo-900/80 dark:to-indigo-800/80 text-indigo-800 dark:text-indigo-200",
      "随机/生成器": "bg-gradient-to-r from-teal-100 to-teal-200 dark:from-teal-900/80 dark:to-teal-800/80 text-teal-800 dark:text-teal-200",
      "文件/文档": "bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/80 dark:to-orange-800/80 text-orange-800 dark:text-orange-200",
      "数据/可视化": "bg-gradient-to-r from-cyan-100 to-cyan-200 dark:from-cyan-900/80 dark:to-cyan-800/80 text-cyan-800 dark:text-cyan-200",
    };
    return categoryColors[category] || "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
  };

  return (
    <div
      onClick={handleClick}
      className={`rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover-lift fade-in ${
        darkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50"
      } shadow-lg hover:shadow-2xl`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-xl mb-2">{tool.name}</h3>
            <p className={`text-sm mb-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{tool.description}</p>
          </div>
          <span className={`text-xs px-3 py-1.5 rounded-full ${getCategoryColor(tool.category)}`}>
            {tool.category}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className={`text-xs px-3 py-1.5 rounded-full ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"}`}>
            ID: {tool.id}
          </span>
          <span className="text-xl">→</span>
        </div>
      </div>
    </div>
  );
}

// 工具详情页面组件
function ToolPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // 检查系统偏好或本地存储的主题设置
    const isDark = localStorage.getItem("darkMode") === "true" ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches && localStorage.getItem("darkMode") !== "false");
    setDarkMode(isDark);
  }, []);

  // 获取当前路由参数
  const path = window.location.hash.replace("#/tool/", "");
  const tool = toolsList.find(t => t.id === path);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-2xl font-bold mb-4">工具未找到</h1>
          <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            抱歉，您要查找的工具不存在或已被移除
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  // 根据分类设置不同的标签颜色
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      "文本处理": "bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/80 dark:to-blue-800/80 text-blue-800 dark:text-blue-200",
      "颜色/设计": "bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/80 dark:to-purple-800/80 text-purple-800 dark:text-purple-200",
      "图片/多媒体": "bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900/80 dark:to-pink-800/80 text-pink-800 dark:text-pink-200",
      "日期/时间": "bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/80 dark:to-green-800/80 text-green-800 dark:text-green-200",
      "数学/单位": "bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/80 dark:to-yellow-800/80 text-yellow-800 dark:text-yellow-200",
      "编码/加密": "bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/80 dark:to-red-800/80 text-red-800 dark:text-red-200",
      "Web/DevTools": "bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-indigo-900/80 dark:to-indigo-800/80 text-indigo-800 dark:text-indigo-200",
      "随机/生成器": "bg-gradient-to-r from-teal-100 to-teal-200 dark:from-teal-900/80 dark:to-teal-800/80 text-teal-800 dark:text-teal-200",
      "文件/文档": "bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/80 dark:to-orange-800/80 text-orange-800 dark:text-orange-200",
      "数据/可视化": "bg-gradient-to-r from-cyan-100 to-cyan-200 dark:from-cyan-900/80 dark:to-cyan-800/80 text-cyan-800 dark:text-cyan-200",
    };
    return categoryColors[category] || "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <header className="sticky top-0 z-10 shadow-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="mr-4 p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="返回首页"
            >
              ←
            </button>
            <h1 className="text-2xl font-bold truncate">{tool.name}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className={`px-4 py-2 text-sm rounded-full ${getCategoryColor(tool.category)}`}>
                {tool.category}
              </span>
              <span className={`px-4 py-2 text-sm rounded-full ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"}`}>
                ID: {tool.id}
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-4">{tool.name}</h2>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{tool.description}</p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-2xl font-semibold mb-6">工具功能</h3>
            <div className="min-h-[400px] rounded-xl bg-gray-50 dark:bg-gray-750 p-6">
              {/* 这里将实现具体的工具功能 */}
              <ToolComponent toolId={tool.id} />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} 工具箱 - 让工作更高效</p>
        </div>
      </footer>
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
    case "markdown-preview":
      return <MarkdownPreviewTool />;
    case "json-pretty":
      return <JsonFormatterTool />;
    case "yaml-to-json":
      return <YamlToJsonTool />;
    case "html-to-text":
      return <HtmlToTextTool />;
    case "regex-tester":
      return <RegexTesterTool />;
    case "diff-viewer":
      return <DiffViewerTool />;
    case "markdown-toc":
      return <MarkdownTocTool />;

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
    case "qr-generator":
      return <QrGeneratorTool />;
    case "barcode-generator":
      return <BarcodeGeneratorTool />;
    case "password-strength":
      return <PasswordStrengthTool />;

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
    case "cron-parser":
      return <CronParserTool />;
    case "age-calculator":
      return <AgeCalculatorTool />;
    case "time-diff":
      return <TimeDiffTool />;
    case "timezone-convert":
      return <TimezoneConvertTool />;
    case "week-number":
      return <WeekNumberTool />;
    case "countdown-timer":
      return <CountdownTimerTool />;
    case "date-add":
      return <DateAddTool />;
    case "working-days":
      return <WorkingDaysTool />;
    case "calendar-maker":
      return <CalendarMakerTool />;

    // 数学/单位工具
    case "unit-convert":
      return <UnitConverterTool />;
    case "percentage-calc":
      return <PercentageCalculatorTool />;
    case "triangle-solver":
      return <TriangleSolverTool />;
    case "prime-checker":
      return <PrimeCheckerTool />;
    case "quadratic-solver":
      return <QuadraticSolverTool />;
    case "matrix-math":
      return <MatrixMathTool />;
    case "currency-convert":
      return <CurrencyConvertTool />;
    case "roman-numeral":
      return <RomanNumeralTool />;
    case "base-n":
      return <BaseNConvertTool />;
    case "random-number":
      return <RandomNumberTool />;

    // 随机/生成器工具
    case "lorem-image":
      return <PlaceholderImageTool />;
    case "fake-user":
      return <FakeUserTool />;
    case "name-generator":
      return <NameGeneratorTool />;
    case "quote-generator":
      return <QuoteGeneratorTool />;
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
    case "json-to-csv":
      return <JsonToCsvTool />;
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
    case "image-to-pdf":
      return <ImageToPdfTool />;

    // 图片/多媒体工具
    case "image-compress":
      return <ImageCompressorTool />;
    case "image-resize":
      return <ImageResizeTool />;
    case "image-convert":
      return <ImageConvertTool />;
    case "image-crop":
      return <ImageCropTool />;
    case "exif-viewer":
      return <ExifViewerTool />;
    case "svg-minify":
      return <SvgMinifyTool />;
    case "gif-split":
      return <GifSplitTool />;
    case "video-trim":
      return <VideoTrimTool />;
    case "audio-convert":
      return <AudioConvertTool />;
    case "icon-spriter":
      return <IconSpriterTool />;

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
    case "url-parser":
      return <UrlParserTool />;
    case "email-validator":
      return <EmailValidatorTool />;
    case "credit-card-check":
      return <CreditCardCheckTool />;

    // 数据/可视化工具
    case "csv-preview":
      return <CsvPreviewTool />;
    case "json-plot":
      return <JsonPlotTool />;
    case "markdown-mermaid":
      return <MermaidPreviewTool />;
    case "geojson-viewer":
      return <GeoJsonViewerTool />;
    case "base64-image":
      return <Base64ImageTool />;
    case "html-preview":
      return <HtmlPreviewTool />;
    case "table-sorter":
      return <TableSorterTool />;

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

// 添加全局样式
const globalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }

  .fade-in-up {
    animation: fadeInUp 0.5s ease-out forwards;
  }

  .gradient-text {
    background: linear-gradient(90deg, #4f46e5, #7c3aed, #db2777);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .hover-lift:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  /* 滚动条样式 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(156, 163, 175, 0.8);
  }

  .dark ::-webkit-scrollbar-thumb {
    background-color: rgba(75, 85, 99, 0.5);
  }

  .dark ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(75, 85, 99, 0.8);
  }

  /* 自定义阴影 */
  .shadow-xl {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .shadow-2xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  /* 响应式圆角 */
  @media (min-width: 768px) {
    .rounded-2xl {
      border-radius: 1.25rem;
    }
  }
`;

// 注入全局样式
const styleElement = document.createElement('style');
styleElement.textContent = globalStyles;
document.head.appendChild(styleElement);
