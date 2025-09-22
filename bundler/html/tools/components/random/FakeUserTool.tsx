import React, { useState } from 'react';

// 虚拟用户数据生成器
const FakeUserTool = () => {
  const [userCount, setUserCount] = useState(5);
  const [users, setUsers] = useState<any[]>([]);
  const [includeAvatar, setIncludeAvatar] = useState(true);

  // 姓氏列表
  const lastNames = [
    '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈',
    '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许',
    '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏'
  ];

  // 名字列表
  const firstNames = [
    '伟', '芳', '娜', '敏', '静', '丽', '强', '磊', '军', '洋',
    '勇', '艳', '杰', '娟', '涛', '明', '超', '秀英', '霞', '平',
    '刚', '桂英', '亮', '红', '丽华', '小红', '小明', '小丽', '小强', '小军'
  ];

  // 城市列表
  const cities = [
    '北京', '上海', '广州', '深圳', '杭州', '南京', '成都', '武汉', '西安', '重庆',
    '天津', '苏州', '长沙', '郑州', '青岛', '宁波', '无锡', '福州', '合肥', '东莞'
  ];

  // 职业列表
  const occupations = [
    '软件工程师', '产品经理', '设计师', '市场专员', '销售代表', '财务分析师',
    '人力资源', '运营专员', '数据分析师', '客服代表', '项目经理', '测试工程师',
    '系统管理员', '网络工程师', 'UI设计师', '前端开发', '后端开发', '全栈开发'
  ];

  // 生成随机用户
  const generateUsers = () => {
    const newUsers = [];

    for (let i = 0; i < userCount; i++) {
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const name = lastName + firstName;

      const user = {
        id: i + 1,
        name: name,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@example.com`,
        phone: `1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
        city: cities[Math.floor(Math.random() * cities.length)],
        occupation: occupations[Math.floor(Math.random() * occupations.length)],
        age: Math.floor(Math.random() * 40) + 20, // 20-60岁
        avatar: includeAvatar ? `https://i.pravatar.cc/150?u=${i + 1}` : null
      };

      newUsers.push(user);
    }

    setUsers(newUsers);
  };

  // 复制用户数据到剪贴板
  const copyToClipboard = () => {
    const userData = users.map(user => {
      return `姓名: ${user.name}
邮箱: ${user.email}
电话: ${user.phone}
城市: ${user.city}
职业: ${user.occupation}
年龄: ${user.age}
`;
    }).join('\n---\n');

    navigator.clipboard.writeText(userData);
  };

  // 导出为JSON
  const exportToJson = () => {
    const dataStr = JSON.stringify(users, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = 'fake-users.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">虚拟用户资料生成器</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">用户数量</label>
            <input
              type="number"
              value={userCount}
              onChange={(e) => setUserCount(Math.max(1, Math.min(100, Number(e.target.value))))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              min="1"
              max="100"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeAvatar}
                onChange={(e) => setIncludeAvatar(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">包含头像</span>
            </label>
          </div>

          <div className="flex items-end">
            <button
              onClick={generateUsers}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"
            >
              生成用户
            </button>
          </div>

          <div className="flex items-end space-x-2">
            {users.length > 0 && (
              <>
                <button
                  onClick={copyToClipboard}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-200"
                >
                  复制数据
                </button>
                <button
                  onClick={exportToJson}
                  className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md transition duration-200"
                >
                  导出JSON
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {users.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">生成的用户 ({users.length} 个)</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {includeAvatar && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">头像</th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">姓名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">邮箱</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">电话</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">城市</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">职业</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">年龄</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    {includeAvatar && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.avatar && (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-10 w-10 rounded-full"
                          />
                        )}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.occupation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FakeUserTool;
