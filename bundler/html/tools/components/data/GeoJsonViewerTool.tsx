import React, { useState } from "react";

const GeoJsonViewerTool = () => {
  const [geoJsonInput, setGeoJsonInput] = useState<string>('');
  const [mapData, setMapData] = useState<any>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const renderMap = () => {
    if (!geoJsonInput.trim()) return;
    
    setIsRendering(true);
    setError(null);
    
    try {
      // 解析GeoJSON输入
      const parsedData = JSON.parse(geoJsonInput);
      
      // 验证是否为有效的GeoJSON
      if (!parsedData.type || !['FeatureCollection', 'Feature', 'Point', 'LineString', 'Polygon'].includes(parsedData.type)) {
        throw new Error('无效的GeoJSON格式');
      }
      
      // 在实际应用中，这里会使用地图库（如Leaflet或Mapbox）来渲染地图
      // 由于浏览器环境限制，我们在这里模拟渲染过程
      setMapData(parsedData);
    } catch (err) {
      setError('GeoJSON格式错误: ' + (err instanceof Error ? err.message : '未知错误'));
    } finally {
      setIsRendering(false);
    }
  };

  const loadSampleData = () => {
    const sampleData = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "name": "北京",
            "population": 21540000
          },
          "geometry": {
            "type": "Point",
            "coordinates": [116.4074, 39.9042]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "上海",
            "population": 24280000
          },
          "geometry": {
            "type": "Point",
            "coordinates": [121.4737, 31.2304]
          }
        }
      ]
    };
    
    setGeoJsonInput(JSON.stringify(sampleData, null, 2));
  };

  const clearMap = () => {
    setGeoJsonInput('');
    setMapData(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">GeoJSON地图</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          可视化GeoJSON地理数据，在地图上显示点、线、面等地理要素
        </p>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              GeoJSON数据
            </label>
            <button
              onClick={loadSampleData}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              加载示例数据
            </button>
          </div>
          <textarea
            value={geoJsonInput}
            onChange={(e) => setGeoJsonInput(e.target.value)}
            rows={12}
            placeholder='输入GeoJSON格式的地理数据，例如：
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "地点名称"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [经度, 纬度]
      }
    }
  ]
}'
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={renderMap}
            disabled={isRendering || !geoJsonInput.trim()}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
              isRendering || !geoJsonInput.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
            }`}
          >
            {isRendering ? '渲染中...' : '渲染地图'}
          </button>
          
          <button
            onClick={clearMap}
            disabled={!geoJsonInput && !mapData}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
              !geoJsonInput && !mapData
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
                : 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800'
            }`}
          >
            清除地图
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

        {mapData && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              地图预览
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-center h-96 bg-white dark:bg-gray-600 rounded">
                <div className="text-center">
                  <div className="text-5xl mb-4">🌍</div>
                  <p className="text-gray-600 dark:text-gray-300">
                    在实际应用中，这里将显示交互式地图
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    (由于浏览器环境限制，此处显示占位符)
                  </p>
                  <div className="mt-4 text-left bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs font-mono max-w-md overflow-x-auto">
                    <pre>{JSON.stringify(mapData, null, 2)}</pre>
                  </div>
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
            <li>输入符合GeoJSON标准的地理数据</li>
            <li>支持点(Point)、线(LineString)、面(Polygon)等地理要素</li>
            <li>点击"渲染地图"按钮在地图上可视化地理数据</li>
            <li>使用"加载示例数据"按钮快速查看效果</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GeoJsonViewerTool;