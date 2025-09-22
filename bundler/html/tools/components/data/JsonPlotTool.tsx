import React, { useState } from "react";

const JsonPlotTool = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [chartType, setChartType] = useState<string>('bar');
  const [chartData, setChartData] = useState<any>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseJsonAndGenerateChart = () => {
    if (!jsonInput.trim()) return;
    
    setIsParsing(true);
    setError(null);
    
    try {
      // 解析JSON输入
      const parsedData = JSON.parse(jsonInput);
      
      // 在实际应用中，这里会根据数据结构生成适合图表库的数据格式
      // 由于浏览器环境限制，我们在这里模拟生成过程
      setChartData(parsedData);
    } catch (err) {
      setError('JSON格式错误: ' + (err instanceof Error ? err.message : '未知错误'));
    } finally {
      setIsParsing(false);
    }
  };

  const generateSampleData = () => {
    const sampleData = {
      labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
      datasets: [
        {
          label: '销售额',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };
    
    setJsonInput(JSON.stringify(sampleData, null, 2));
  };

  const clearData = () => {
    setJsonInput('');
    setChartData(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">JSON图表绘制</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          将JSON数据转换为可视化图表，支持多种图表类型
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              图表类型
            </label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="bar">柱状图</option>
              <option value="line">折线图</option>
              <option value="pie">饼图</option>
              <option value="doughnut">环形图</option>
              <option value="radar">雷达图</option>
              <option value="polarArea">极坐标图</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={generateSampleData}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
            >
              生成示例数据
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            JSON数据
          </label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={10}
            placeholder='输入JSON格式的数据，例如：
{
  "labels": ["一月", "二月", "三月"],
  "datasets": [
    {
      "label": "销售额",
      "data": [12, 19, 3]
    }
  ]
}'
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={parseJsonAndGenerateChart}
            disabled={isParsing || !jsonInput.trim()}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
              isParsing || !jsonInput.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
            }`}
          >
            {isParsing ? '生成中...' : '生成图表'}
          </button>
          
          <button
            onClick={clearData}
            disabled={!jsonInput && !chartData}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
              !jsonInput && !chartData
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
                : 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800'
            }`}
          >
            清除数据
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  {error}
                </h3>
              </div>
            </div>
          </div>
        )}

        {chartData && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              图表预览
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-600 rounded">
                <div className="text-center">
                  <div className="text-5xl mb-4">📊</div>
                  <p className="text-gray-600 dark:text-gray-300">
                    在实际应用中，这里将显示 {chartType === 'bar' ? '柱状图' : 
                    chartType === 'line' ? '折线图' : 
                    chartType === 'pie' ? '饼图' : 
                    chartType === 'doughnut' ? '环形图' : 
                    chartType === 'radar' ? '雷达图' : '极坐标图'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    (由于浏览器环境限制，此处显示占位符)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            使用说明
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>输入符合图表库要求的JSON格式数据</li>
            <li>选择要生成的图表类型</li>
            <li>点击"生成图表"按钮创建可视化图表</li>
            <li>支持的图表类型：柱状图、折线图、饼图、环形图、雷达图、极坐标图</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JsonPlotTool;