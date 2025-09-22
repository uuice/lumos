import React, { useState, useEffect } from "react";

const QuoteGeneratorTool = () => {
  const [currentQuote, setCurrentQuote] = useState({ text: '', author: '' });
  const [favorites, setFavorites] = useState<any[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // 名人名言数据
  const quotes = [
    { text: "生活就像一盒巧克力，你永远不知道下一颗是什么味道。", author: "阿甘正传" },
    { text: "成功的秘诀在于坚持不懈奋斗。", author: "佚名" },
    { text: "书山有路勤为径，学海无涯苦作舟。", author: "韩愈" },
    { text: "天道酬勤。", author: "佚名" },
    { text: "宝剑锋从磨砺出，梅花香自苦寒来。", author: "佚名" },
    { text: "路漫漫其修远兮，吾将上下而求索。", author: "屈原" },
    { text: "山重水复疑无路，柳暗花明又一村。", author: "陆游" },
    { text: "长风破浪会有时，直挂云帆济沧海。", author: "李白" },
    { text: "千磨万击还坚劲，任尔东西南北风。", author: "郑燮" },
    { text: "不积跬步，无以至千里；不积小流，无以成江海。", author: "荀子" },
    { text: "业精于勤，荒于嬉；行成于思，毁于随。", author: "韩愈" },
    { text: "少壮不努力，老大徒伤悲。", author: "汉乐府" },
    { text: "欲穷千里目，更上一层楼。", author: "王之涣" },
    { text: "会当凌绝顶，一览众山小。", author: "杜甫" },
    { text: "海纳百川，有容乃大；壁立千仞，无欲则刚。", author: "林则徐" },
    { text: "非淡泊无以明志，非宁静无以致远。", author: "诸葛亮" },
    { text: "勿以恶小而为之，勿以善小而不为。", author: "刘备" },
    { text: "纸上得来终觉浅，绝知此事要躬行。", author: "陆游" },
    { text: "问渠那得清如许？为有源头活水来。", author: "朱熹" },
    { text: "人生自古谁无死？留取丹心照汗青。", author: "文天祥" }
  ];

  // 英文名言数据
  const englishQuotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "In this life we cannot do great things. We can only do small things with great love.", author: "Mother Teresa" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt" },
    { text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa" },
    { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt" }
  ];

  // 生成随机名言
  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  // 复制名言到剪贴板
  const copyQuote = (quote: any) => {
    const quoteText = `"${quote.text}" — ${quote.author}`;
    navigator.clipboard.writeText(quoteText);
  };

  // 添加到收藏
  const addToFavorites = (quote: any) => {
    if (!favorites.some(fav => fav.text === quote.text && fav.author === quote.author)) {
      setFavorites([...favorites, quote]);
    }
  };

  // 从收藏中移除
  const removeFromFavorites = (quote: any) => {
    setFavorites(favorites.filter(fav => fav.text !== quote.text || fav.author !== quote.author));
  };

  // 检查是否已收藏
  const isFavorite = (quote: any) => {
    return favorites.some(fav => fav.text === quote.text && fav.author === quote.author);
  };

  // 初始化第一个名言
  useEffect(() => {
    const quote = generateRandomQuote();
    setCurrentQuote(quote);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">随机名言生成器</h2>
        <p className="text-gray-600 dark:text-gray-400">
          获取来自不同文化和语言的智慧名言，激励你的每一天
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              语言
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="zh-CN">中文</option>
              <option value="en-US">English</option>
              <option value="ja-JP">日本語</option>
            </select>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              分类
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {getCategories().map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "全部" : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setCurrentQuote(generateRandomQuote())}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              获取新名言
            </button>
          </div>
        </div>
      </div>

      {currentQuote ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-6 text-center">
          <div className="text-2xl italic mb-6 text-gray-800 dark:text-gray-200">
            "{currentQuote.text}"
          </div>
          <div className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-6">
            — {currentQuote.author}
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => copyQuote(currentQuote)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              复制名言
            </button>
            <button
              onClick={() => isFavorite(currentQuote) ? removeFromFavorites(currentQuote) : addToFavorites(currentQuote)}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                isFavorite(currentQuote)
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {isFavorite(currentQuote) ? "取消收藏" : "添加收藏"}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">暂无名言</h3>
          <p className="text-gray-500 dark:text-gray-400">
            请调整筛选条件或点击"获取新名言"按钮
          </p>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">我的收藏 ({favorites.length})</h3>
            <button
              onClick={() => setFavorites([])}
              className="text-sm px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded hover:bg-red-200 dark:hover:bg-red-800"
            >
              清空收藏
            </button>
          </div>
          <div className="space-y-4">
            {favorites.map((quote, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                <div className="flex justify-between">
                  <div className="italic text-gray-800 dark:text-gray-200">
                    "{quote.text}"
                  </div>
                  <button
                    onClick={() => removeFromFavorites(quote)}
                    className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  — {quote.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-900 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">使用说明</h3>
        <ul className="list-disc list-inside space-y-2 text-blue-700 dark:text-blue-300">
          <li>选择语言和分类后点击"获取新名言"按钮获取随机名言</li>
          <li>点击"复制名言"可将当前名言复制到剪贴板</li>
          <li>点击"添加收藏"可将喜欢的名言添加到收藏夹</li>
          <li>在收藏夹中可以查看所有收藏的名言，并可随时删除</li>
        </ul>
      </div>
    </div>
  );
};

export default QuoteGeneratorTool;
