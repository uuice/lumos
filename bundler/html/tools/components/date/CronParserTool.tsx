import React, { useState } from 'react';

const CronParserTool = () => {
  const [cronExpression, setCronExpression] = useState('* * * * *');
  const [parsedDescription, setParsedDescription] = useState('');

  // Cron表达式解析函数
  const parseCron = (cron: string) => {
    const parts = cron.split(' ');
    if (parts.length !== 5) {
      return '无效的Cron表达式，请输入5个字段的表达式（分钟 小时 日 月 周）';
    }

    const [minute, hour, day, month, weekday] = parts;

    let description = '任务将在 ';

    // 解析分钟
    if (minute === '*') {
      description += '每分钟 ';
    } else if (minute.includes('/')) {
      const interval = minute.split('/')[1];
      description += `每隔${interval}分钟 `;
    } else {
      description += `${minute}分 `;
    }

    // 解析小时
    if (hour === '*') {
      description += '每小时 ';
    } else if (hour.includes('/')) {
      const interval = hour.split('/')[1];
      description += `每隔${interval}小时 `;
    } else {
      description += `${hour}时 `;
    }

    // 解析日期
    if (day === '*') {
      description += '每日 ';
    } else {
      description += `${day}日 `;
    }

    // 解析月份
    if (month === '*') {
      description += '每月 ';
    } else {
      const monthNames = [
        '一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月'
      ];
      const monthIndex = parseInt(month) - 1;
      if (!isNaN(monthIndex) && monthIndex >= 0 && monthIndex < 12) {
        description += `${monthNames[monthIndex]} `;
      } else {
        description += `${month}月 `;
      }
    }

    // 解析星期
    if (weekday === '*') {
      description += '每周 ';
    } else {
      const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      const weekdayIndex = parseInt(weekday);
      if (!isNaN(weekdayIndex) && weekdayIndex >= 0 && weekdayIndex < 7) {
        description += `${weekdays[weekdayIndex]} `;
      } else {
        description += `${weekday} `;
      }
    }

    description += '执行';
    return description;
  };

  // 处理输入变化
  const handleCronChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCronExpression(value);
    setParsedDescription(parseCron(value));
  };

  // 常用Cron表达式示例
  const commonExamples = [
    { expression: '* * * * *', description: '每分钟执行' },
    { expression: '0 * * * *', description: '每小时执行' },
    { expression: '0 0 * * *', description: '每天午夜执行' },
    { expression: '0 0 * * 0', description: '每周日午夜执行' },
    { expression: '0 0 1 * *', description: '每月1号午夜执行' },
    { expression: '0 0 1 1 *', description: '每年1月1日午夜执行' },
    { expression: '*/5 * * * *', description: '每5分钟执行' },
    { expression: '0 */2 * * *', description: '每2小时执行' }
  ];

  // 使用示例
  const handleUseExample = (expression: string) => {
    setCronExpression(expression);
    setParsedDescription(parseCron(expression));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Cron表达式解析器</h2>

        <div className="mb-6">
          <label htmlFor="cron-input" className="block text-sm font-medium mb-2">输入Cron表达式</label>
          <input
            id="cron-input"
            type="text"
            value={cronExpression}
            onChange={handleCronChange}
            placeholder="例如: 0 0 * * *"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono"
          />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            格式: 分钟 小时 日 月 周 (例如: 0 0 * * * 表示每天午夜执行)
          </p>
        </div>

        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-md">
          <h3 className="font-medium mb-2">解析结果:</h3>
          <p className="text-lg">{parsedDescription || '请输入一个Cron表达式进行解析'}</p>
        </div>

        <div>
          <h3 className="font-medium mb-2">常用Cron表达式示例:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {commonExamples.map((example, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                onClick={() => handleUseExample(example.expression)}
              >
                <div className="font-mono text-sm">{example.expression}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{example.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Cron表达式语法说明</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">字段</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">允许的值</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">特殊字符</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">分钟</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">0-59</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">* , - /</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">小时</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">0-23</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">* , - /</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">日期</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">1-31</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">* , - / ? L W</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">月份</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">1-12 或 JAN-DEC</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">* , - /</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">星期</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">0-7 或 SUN-SAT (0和7都表示周日)</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">* , - / ? L #</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <h3 className="font-medium mb-2">特殊字符说明:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li><code>*</code> - 匹配该字段的所有值</li>
            <li><code>?</code> - 不指定值，用于日期和星期字段</li>
            <li><code>-</code> - 表示范围，如 1-5 表示 1到5</li>
            <li><code>,</code> - 表示列举，如 1,3,5 表示 1、3、5</li>
            <li><code>/</code> - 表示间隔，如 */5 表示每隔5个单位</li>
            <li><code>L</code> - 表示最后，如 L 在日期字段表示该月最后一天</li>
            <li><code>W</code> - 表示工作日，如 15W 表示离15号最近的工作日</li>
            <li><code>#</code> - 表示第几个，如 3#2 表示该月第二个周三</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CronParserTool;
