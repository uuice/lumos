import React, { useState } from 'react';

const PasswordStrengthTool = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState('');

  // 评估密码强度
  const evaluatePasswordStrength = (pwd: string) => {
    let score = 0;
    const feedbackText = [];

    // 长度检查
    if (pwd.length >= 8) score += 1;
    else feedbackText.push('至少8个字符');

    // 大写字母检查
    if (/[A-Z]/.test(pwd)) score += 1;
    else feedbackText.push('包含大写字母');

    // 小写字母检查
    if (/[a-z]/.test(pwd)) score += 1;
    else feedbackText.push('包含小写字母');

    // 数字检查
    if (/\d/.test(pwd)) score += 1;
    else feedbackText.push('包含数字');

    // 特殊字符检查
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    else feedbackText.push('包含特殊字符');

    // 长度额外加分
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;

    setStrength(Math.min(score, 6));

    if (score <= 2) {
      setFeedback(`很弱: ${feedbackText.join(', ')}`);
    } else if (score <= 4) {
      setFeedback(`一般: ${feedbackText.join(', ')}`);
    } else {
      setFeedback('很强: 密码安全性高');
    }
  };

  // 处理密码输入变化
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value) {
      evaluatePasswordStrength(value);
    } else {
      setStrength(0);
      setFeedback('');
    }
  };

  // 获取强度条颜色
  const getStrengthColor = () => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // 获取强度文本
  const getStrengthText = () => {
    if (strength <= 2) return '弱';
    if (strength <= 4) return '中';
    return '强';
  };

  // 生成安全密码
  const generateSecurePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    evaluatePasswordStrength(result);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">密码强度检测器</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="password-input" className="block text-sm font-medium mb-1">输入密码</label>
            <input
              id="password-input"
              type="text"
              value={password}
              onChange={handlePasswordChange}
              placeholder="输入要检测的密码"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {password && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>密码强度</span>
                <span className={strength <= 2 ? 'text-red-500' : strength <= 4 ? 'text-yellow-500' : 'text-green-500'}>
                  {getStrengthText()}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${getStrengthColor()}`}
                  style={{ width: `${(strength / 6) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {feedback}
              </div>
            </div>
          )}

          <div className="pt-4">
            <button
              onClick={generateSecurePassword}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"
            >
              生成安全密码
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">密码安全建议</h2>

        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>使用至少8个字符的密码</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>包含大小写字母、数字和特殊字符</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>避免使用常见的单词或个人信息</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>为每个账户使用不同的密码</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>定期更换密码</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>使用密码管理器来生成和存储密码</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordStrengthTool;
