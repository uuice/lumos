import React, { useState } from 'react';

const NameGeneratorTool = () => {
  const [nameType, setNameType] = useState('chinese');
  const [count, setCount] = useState(5);
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);

  // 中文姓氏
  const chineseLastNames = [
    '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈',
    '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许',
    '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏'
  ];

  // 中文名字
  const chineseFirstNames = [
    '伟', '芳', '娜', '敏', '静', '丽', '强', '磊', '军', '洋',
    '勇', '艳', '杰', '娟', '涛', '明', '超', '秀英', '霞', '平',
    '刚', '桂英', '亮', '红', '丽华', '小红', '小明', '小丽', '小强', '小军',
    '建华', '建国', '建军', '艳华', '丽娟', '丽华', '丽丽', '丽敏', '丽娜', '丽芳'
  ];

  // 英文名字
  const englishNames = [
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
    'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
    'Matthew', 'Betty', 'Anthony', 'Helen', 'Mark', 'Sandra', 'Donald', 'Donna',
    'Steven', 'Carol', 'Paul', 'Ruth', 'Andrew', 'Sharon', 'Joshua', 'Michelle'
  ];

  // 英文姓氏
  const englishSurnames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
    'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'
  ];

  // 生成中文名字
  const generateChineseNames = () => {
    const names = [];
    for (let i = 0; i < count; i++) {
      const lastName = chineseLastNames[Math.floor(Math.random() * chineseLastNames.length)];
      // 随机生成1个或2个字的名字
      const nameLength = Math.random() > 0.5 ? 1 : 2;
      let firstName = '';
      for (let j = 0; j < nameLength; j++) {
        firstName += chineseFirstNames[Math.floor(Math.random() * chineseFirstNames.length)];
      }
      names.push(lastName + firstName);
    }
    return names;
  };

  // 生成英文名字
  const generateEnglishNames = () => {
    const names = [];
    for (let i = 0; i < count; i++) {
      const firstName = englishNames[Math.floor(Math.random() * englishNames.length)];
      const lastName = englishSurnames[Math.floor(Math.random() * englishSurnames.length)];
      names.push(`${firstName} ${lastName}`);
    }
    return names;
  };

  // 生成名字
  const generateNames = () => {
    let names: string[] = [];
    if (nameType === 'chinese') {
      names = generateChineseNames();
    } else {
      names = generateEnglishNames();
    }
    setGeneratedNames(names);
  };

  // 复制到剪贴板
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedNames.join('\n'));
  };

  // 下载为文本文件
  const downloadAsText = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedNames.join('\n')], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${nameType}-names.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">名字生成器</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">名字类型</label>
            <select
              value={nameType}
              onChange={(e) => setNameType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="chinese">中文名字</option>
              <option value="english">英文名字</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">生成数量</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              min="1"
              max="100"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={generateNames}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"
            >
              生成名字
            </button>
          </div>
        </div>
      </div>

      {generatedNames.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">生成的名字</h2>
            <div className="space-x-2">
              <button
                onClick={copyToClipboard}
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md text-sm transition duration-200"
              >
                复制
              </button>
              <button
                onClick={downloadAsText}
                className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded-md text-sm transition duration-200"
              >
                下载
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {generatedNames.map((name, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600"
              >
                <div className="text-center font-medium">{name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NameGeneratorTool;
