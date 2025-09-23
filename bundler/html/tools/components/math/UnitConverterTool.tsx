import React, { useState } from "react";

const UnitConverterTool = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("cm");
  const [result, setResult] = useState("");

  // 单位转换映射表
  const conversionFactors: any = {
    // 长度单位
    "mm": 0.001,
    "cm": 0.01,
    "m": 1,
    "km": 1000,
    "in": 0.0254,
    "ft": 0.3048,
    "yd": 0.9144,
    "mi": 1609.344,

    // 重量单位
    "mg": 0.000001,
    "g": 0.001,
    "kg": 1,
    "t": 1000,
    "oz": 0.0283495,
    "lb": 0.453592,

    // 体积单位
    "ml": 0.001,
    "l": 1,
    "gal": 3.78541,
    "pt": 0.473176,
    "qt": 0.946353,

    // 温度单位 (特殊处理)
    "c": "celsius",
    "f": "fahrenheit",
    "k": "kelvin"
  };

  const unitTypes = {
    "长度": ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
    "重量": ["mg", "g", "kg", "t", "oz", "lb"],
    "体积": ["ml", "l", "gal", "pt", "qt"],
    "温度": ["c", "f", "k"]
  };

  const convertUnits = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setResult("请输入有效的数字");
      return;
    }

    // 特殊处理温度转换
    if (["c", "f", "k"].includes(fromUnit) || ["c", "f", "k"].includes(toUnit)) {
      let celsius: number;

      // 转换到摄氏度
      if (fromUnit === "c") {
        celsius = numValue;
      } else if (fromUnit === "f") {
        celsius = (numValue - 32) * 5/9;
      } else if (fromUnit === "k") {
        celsius = numValue - 273.15;
      } else {
        celsius = numValue * conversionFactors[fromUnit];
      }

      // 从摄氏度转换到目标单位
      if (toUnit === "c") {
        setResult(celsius.toFixed(2));
      } else if (toUnit === "f") {
        setResult(((celsius * 9/5) + 32).toFixed(2));
      } else if (toUnit === "k") {
        setResult((celsius + 273.15).toFixed(2));
      } else {
        setResult((celsius / conversionFactors[toUnit]).toFixed(2));
      }
    } else {
      // 普通单位转换
      const baseValue = numValue * conversionFactors[fromUnit];
      const convertedValue = baseValue / conversionFactors[toUnit];
      setResult(convertedValue.toFixed(6));
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="space-y-5 p-1">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
          <label htmlFor="value-input" className="block mb-2 font-medium text-gray-800 dark:text-gray-200">数值:</label>
          <input
            id="value-input"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="输入数值"
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
          <label htmlFor="from-unit" className="block mb-2 font-medium text-gray-800 dark:text-gray-200">从:</label>
          <select
            id="from-unit"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            {Object.entries(unitTypes).map(([type, units]) => (
              <optgroup key={type} label={type} className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {units.map(unit => (
                  <option key={unit} value={unit} className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">{unit}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
          <label htmlFor="to-unit" className="block mb-2 font-medium text-gray-800 dark:text-gray-200">到:</label>
          <select
            id="to-unit"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            {Object.entries(unitTypes).map(([type, units]) => (
              <optgroup key={type} label={type} className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {units.map(unit => (
                  <option key={unit} value={unit} className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">{unit}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={convertUnits}
          className="px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          转换
        </button>
        <button
          onClick={swapUnits}
          className="px-5 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          交换单位
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!result || isNaN(parseFloat(result))}
          className={`px-5 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
            result && !isNaN(parseFloat(result))
              ? "bg-gradient-to-r from-green-500 to-teal-600 text-white hover:from-green-600 hover:to-teal-700"
              : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
          }`}
        >
          复制结果
        </button>
      </div>

      {result && (
        <div className="mt-4 p-5 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-300 dark:border-gray-700 shadow-sm">
          <div className="text-center">
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">{value || "0"}</span>
            <span className="mx-3 text-gray-600 dark:text-gray-400">{fromUnit}</span>
            <span className="text-2xl text-gray-800 dark:text-gray-200">=</span>
            <span className="mx-3 text-2xl font-bold text-gray-800 dark:text-gray-200">{result}</span>
            <span className="text-gray-600 dark:text-gray-400">{toUnit}</span>
          </div>
        </div>
      )}

      <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl">
        <p className="font-semibold text-gray-800 dark:text-gray-200 mb-3">支持的单位:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>长度: mm, cm, m, km, in, ft, yd, mi</li>
          <li>重量: mg, g, kg, t, oz, lb</li>
          <li>体积: ml, l, gal, pt, qt</li>
          <li>温度: c (摄氏度), f (华氏度), k (开尔文)</li>
        </ul>
      </div>
    </div>
  );
};

export default UnitConverterTool;
