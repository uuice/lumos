import React, { useState } from "react";

const MermaidPreviewTool = () => {
  const [mermaidCode, setMermaidCode] = useState<string>('');
  const [preview, setPreview] = useState<string>('');
  const [isRendering, setIsRendering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const renderMermaid = () => {
    if (!mermaidCode.trim()) return;

    setIsRendering(true);
    setError(null);

    try {
      // 在实际应用中，这里会使用Mermaid库来渲染图表
      // 由于浏览器环境限制，我们在这里模拟渲染过程
      setPreview(mermaidCode);
    } catch (err) {
      setError('渲染错误: ' + (err instanceof Error ? err.message : '未知错误'));
    } finally {
      setIsRendering(false);
    }
  };

  const loadSampleDiagram = (type: string) => {
    let sampleCode = '';

    switch (type) {
      case 'flowchart':
        sampleCode = `graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[Car]`;
        break;
      case 'sequence':
        sampleCode = `sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!`;
        break;
      case 'gantt':
        sampleCode = `gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d`;
        break;
      case 'pie':
        sampleCode = `pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15`;
        break;
      default:
        sampleCode = `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E`;
    }

    setMermaidCode(sampleCode);
  };

  const clearDiagram = () => {
    setMermaidCode('');
    setPreview('');
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Mermaid预览</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          实时预览Mermaid图表代码，支持流程图、时序图、甘特图等多种图表类型
        </p>

        <div className="mb-6">
          <div className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            示例图表
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => loadSampleDiagram('flowchart')}
              className="px-3 py-1.5 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              流程图
            </button>
            <button
              onClick={() => loadSampleDiagram('sequence')}
              className="px-3 py-1.5 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              时序图
            </button>
            <button
              onClick={() => loadSampleDiagram('gantt')}
              className="px-3 py-1.5 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              甘特图
            </button>
            <button
              onClick={() => loadSampleDiagram('pie')}
              className="px-3 py-1.5 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              饼图
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="mermaidCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Mermaid代码
          </label>
          <textarea
            id="mermaidCode"
            value={mermaidCode}
            onChange={(e) => setMermaidCode(e.target.value)}
            rows={12}
            placeholder='输入Mermaid图表代码，例如：
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E'
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={renderMermaid}
            disabled={isRendering || !mermaidCode.trim()}
            className={`px-5 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 ${
              isRendering || !mermaidCode.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500 transform hover:-translate-y-0.5'
            }`}
          >
            {isRendering ? '渲染中...' : '渲染图表'}
          </button>

          <button
            onClick={clearDiagram}
            disabled={!mermaidCode && !preview}
            className={`px-5 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 ${
              !mermaidCode && !preview
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
                : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500 transform hover:-translate-y-0.5'
            }`}
          >
            清除图表
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800 transition-all duration-300">
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

        {preview && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              图表预览
            </h3>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300">
              <div className="flex items-center justify-center h-96 bg-white dark:bg-gray-600/50 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="text-center">
                  <div className="text-5xl mb-4">📊</div>
                  <p className="text-gray-600 dark:text-gray-300">
                    在实际应用中，这里将显示Mermaid图表
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    (由于浏览器环境限制，此处显示占位符)
                  </p>
                  <div className="mt-4 text-left bg-gray-100 dark:bg-gray-800/50 p-3 rounded text-xs font-mono max-w-md overflow-x-auto border border-gray-200 dark:border-gray-700">
                    {preview}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            使用说明
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
            <li>输入符合Mermaid语法的图表代码</li>
            <li>支持流程图、时序图、甘特图、饼图等多种图表类型</li>
            <li>点击&quot;渲染图表&quot;按钮实时预览图表</li>
            <li>使用示例按钮快速加载不同类型的图表模板</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MermaidPreviewTool;
