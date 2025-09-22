import React, { useState } from "react";

const StoryPromptTool = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);

  // 故事元素数据库
  const characters = [
    "一位年迈的图书管理员", "一个好奇的机器人", "一名失忆的侦探", "一位隐居的艺术家",
    "一个拥有超能力的孩子", "一名太空探险家", "一位古代武士", "一个来自未来的访客",
    "一位神秘的陌生人", "一名音乐家", "一个害羞的发明家", "一位退休的超级英雄"
  ];

  const settings = [
    "在一个被遗忘的图书馆里", "在遥远的未来城市中", "在一个魔法森林深处",
    "在一艘星际飞船上", "在一个小镇的咖啡馆里", "在一座废弃的城堡中",
    "在一个梦境世界里", "在一座海底城市中", "在一个平行宇宙里",
    "在一个时间循环中", "在一个虚拟现实世界里", "在一个末日后的世界中"
  ];

  const conflicts = [
    "发现了一个改变现实的秘密", "必须在24小时内解决一个谜题", "意外获得了一种超能力",
    "遇到了来自另一个维度的生物", "发现了一本预言未来的书", "必须阻止一场即将发生的灾难",
    "丢失了最重要的物品", "被卷入了一场阴谋", "必须做出一个艰难的道德选择",
    "发现了一个隐藏的文明", "必须面对自己的恐惧", "意外触发了一个古老的诅咒"
  ];

  const objects = [
    "一把会说话的钥匙", "一面能预知未来的镜子", "一本空白的日记本",
    "一个永远不满的杯子", "一张通往任何地方的地图", "一颗能实现愿望的宝石",
    "一台能录制梦境的设备", "一件隐形斗篷", "一个时间沙漏",
    "一支能画出真实事物的笔", "一本能打开任何门的书", "一个能控制天气的水晶"
  ];

  const generatePrompt = () => {
    // 随机选择故事元素
    const character = characters[Math.floor(Math.random() * characters.length)];
    const setting = settings[Math.floor(Math.random() * settings.length)];
    const conflict = conflicts[Math.floor(Math.random() * conflicts.length)];
    const object = objects[Math.floor(Math.random() * objects.length)];

    // 构造故事提示
    const newPrompt = `${character} ${setting}，${conflict}，并拥有了${object}。`;
    setPrompt(newPrompt);

    // 添加到历史记录
    setHistory(prev => [newPrompt, ...prev.slice(0, 9)]); // 保留最近10条记录
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">写作灵感生成器</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          随机生成创意写作提示，帮助你克服写作障碍
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={generatePrompt}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            生成写作灵感
          </button>
        </div>

        {prompt && (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              你的写作灵感
            </h3>

            <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-6 mb-4">
              <p className="text-lg text-gray-800 dark:text-gray-200 text-center">
                {prompt}
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => navigator.clipboard.writeText(prompt)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                复制到剪贴板
              </button>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                灵感历史
              </h3>
              <button
                onClick={clearHistory}
                className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                清空历史
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <ul className="space-y-3">
                {history.map((entry, index) => (
                  <li
                    key={index}
                    className="py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                  >
                    <p className="text-gray-700 dark:text-gray-300">{entry}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryPromptTool;
