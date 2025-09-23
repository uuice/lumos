import React, { useState, useEffect } from 'react';

// Tailwind CSS 类参考数据
const tailwindClasses = [
  // Layout
  { category: 'Layout', classes: [
    'container', 'block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid',
    'flow-root', 'hidden', 'float-right', 'float-left', 'float-none', 'clear-left', 'clear-right',
    'clear-both', 'clear-none', 'object-contain', 'object-cover', 'object-fill', 'object-none',
    'object-scale-down', 'overflow-auto', 'overflow-hidden', 'overflow-visible', 'overflow-scroll',
    'overflow-x-auto', 'overflow-y-auto', 'overflow-x-hidden', 'overflow-y-hidden', 'overflow-x-visible',
    'overflow-y-visible', 'overflow-x-scroll', 'overflow-y-scroll', 'overscroll-auto', 'overscroll-contain',
    'overscroll-none', 'static', 'fixed', 'absolute', 'relative', 'sticky', 'inset-0', 'inset-y-0',
    'inset-x-0', 'top-0', 'right-0', 'bottom-0', 'left-0', 'z-0', 'z-10', 'z-20', 'z-30', 'z-40', 'z-50'
  ]},

  // Flexbox & Grid
  { category: 'Flexbox & Grid', classes: [
    'flex', 'inline-flex', 'flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse',
    'flex-wrap', 'flex-wrap-reverse', 'flex-nowrap', 'flex-1', 'flex-auto', 'flex-initial',
    'flex-none', 'flex-grow', 'flex-grow-0', 'flex-shrink', 'flex-shrink-0', 'order-1', 'order-2',
    'order-3', 'order-4', 'order-5', 'order-6', 'order-7', 'order-8', 'order-9', 'order-10',
    'order-11', 'order-12', 'order-first', 'order-last', 'order-none', 'grid', 'grid-cols-1',
    'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6', 'grid-cols-7',
    'grid-cols-8', 'grid-cols-9', 'grid-cols-10', 'grid-cols-11', 'grid-cols-12', 'grid-cols-none',
    'col-auto', 'col-span-1', 'col-span-2', 'col-span-3', 'col-span-4', 'col-span-5', 'col-span-6',
    'col-span-7', 'col-span-8', 'col-span-9', 'col-span-10', 'col-span-11', 'col-span-12',
    'col-span-full', 'col-start-1', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5',
    'col-start-6', 'col-start-7', 'col-start-8', 'col-start-9', 'col-start-10', 'col-start-11',
    'col-start-12', 'col-start-13', 'col-start-auto', 'col-end-1', 'col-end-2', 'col-end-3',
    'col-end-4', 'col-end-5', 'col-end-6', 'col-end-7', 'col-end-8', 'col-end-9', 'col-end-10',
    'col-end-11', 'col-end-12', 'col-end-13', 'col-end-auto', 'grid-rows-1', 'grid-rows-2',
    'grid-rows-3', 'grid-rows-4', 'grid-rows-5', 'grid-rows-6', 'grid-rows-none', 'row-auto',
    'row-span-1', 'row-span-2', 'row-span-3', 'row-span-4', 'row-span-5', 'row-span-6',
    'row-span-full', 'row-start-1', 'row-start-2', 'row-start-3', 'row-start-4', 'row-start-5',
    'row-start-6', 'row-start-7', 'row-start-auto', 'row-end-1', 'row-end-2', 'row-end-3',
    'row-end-4', 'row-end-5', 'row-end-6', 'row-end-7', 'row-end-auto', 'gap-0', 'gap-1',
    'gap-2', 'gap-3', 'gap-4', 'gap-5', 'gap-6', 'gap-8', 'gap-10', 'gap-12', 'gap-16',
    'gap-20', 'gap-24', 'gap-32', 'gap-40', 'gap-48', 'gap-56', 'gap-64', 'gap-px'
  ]},

  // Spacing
  { category: 'Spacing', classes: [
    'p-0', 'p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'p-6', 'p-8', 'p-10', 'p-12', 'p-16', 'p-20',
    'p-24', 'p-32', 'p-40', 'p-48', 'p-56', 'p-64', 'p-px', 'px-0', 'px-1', 'px-2', 'px-3',
    'px-4', 'px-5', 'px-6', 'px-8', 'px-10', 'px-12', 'px-16', 'px-20', 'px-24', 'px-32',
    'px-40', 'px-48', 'px-56', 'px-64', 'px-px', 'py-0', 'py-1', 'py-2', 'py-3', 'py-4',
    'py-5', 'py-6', 'py-8', 'py-10', 'py-12', 'py-16', 'py-20', 'py-24', 'py-32', 'py-40',
    'py-48', 'py-56', 'py-64', 'py-px', 'pt-0', 'pt-1', 'pt-2', 'pt-3', 'pt-4', 'pt-5',
    'pt-6', 'pt-8', 'pt-10', 'pt-12', 'pt-16', 'pt-20', 'pt-24', 'pt-32', 'pt-40', 'pt-48',
    'pt-56', 'pt-64', 'pt-px', 'pr-0', 'pr-1', 'pr-2', 'pr-3', 'pr-4', 'pr-5', 'pr-6',
    'pr-8', 'pr-10', 'pr-12', 'pr-16', 'pr-20', 'pr-24', 'pr-32', 'pr-40', 'pr-48', 'pr-56',
    'pr-64', 'pr-px', 'pb-0', 'pb-1', 'pb-2', 'pb-3', 'pb-4', 'pb-5', 'pb-6', 'pb-8',
    'pb-10', 'pb-12', 'pb-16', 'pb-20', 'pb-24', 'pb-32', 'pb-40', 'pb-48', 'pb-56', 'pb-64',
    'pb-px', 'pl-0', 'pl-1', 'pl-2', 'pl-3', 'pl-4', 'pl-5', 'pl-6', 'pl-8', 'pl-10',
    'pl-12', 'pl-16', 'pl-20', 'pl-24', 'pl-32', 'pl-40', 'pl-48', 'pl-56', 'pl-64', 'pl-px',
    'm-0', 'm-1', 'm-2', 'm-3', 'm-4', 'm-5', 'm-6', 'm-8', 'm-10', 'm-12', 'm-16', 'm-20',
    'm-24', 'm-32', 'm-40', 'm-48', 'm-56', 'm-64', 'm-auto', 'm-px', '-m-0', '-m-1', '-m-2',
    '-m-3', '-m-4', '-m-5', '-m-6', '-m-8', '-m-10', '-m-12', '-m-16', '-m-20', '-m-24',
    '-m-32', '-m-40', '-m-48', '-m-56', '-m-64', '-m-px', 'mx-0', 'mx-1', 'mx-2', 'mx-3',
    'mx-4', 'mx-5', 'mx-6', 'mx-8', 'mx-10', 'mx-12', 'mx-16', 'mx-20', 'mx-24', 'mx-32',
    'mx-40', 'mx-48', 'mx-56', 'mx-64', 'mx-auto', 'mx-px', '-mx-0', '-mx-1', '-mx-2',
    '-mx-3', '-mx-4', '-mx-5', '-mx-6', '-mx-8', '-mx-10', '-mx-12', '-mx-16', '-mx-20',
    '-mx-24', '-mx-32', '-mx-40', '-mx-48', '-mx-56', '-mx-64', '-mx-px', 'my-0', 'my-1',
    'my-2', 'my-3', 'my-4', 'my-5', 'my-6', 'my-8', 'my-10', 'my-12', 'my-16', 'my-20',
    'my-24', 'my-32', 'my-40', 'my-48', 'my-56', 'my-64', 'my-auto', 'my-px', '-my-0',
    '-my-1', '-my-2', '-my-3', '-my-4', '-my-5', '-my-6', '-my-8', '-my-10', '-my-12',
    '-my-16', '-my-20', '-my-24', '-my-32', '-my-40', '-my-48', '-my-56', '-my-64', '-my-px'
  ]},

  // Sizing
  { category: 'Sizing', classes: [
    'w-0', 'w-1', 'w-2', 'w-3', 'w-4', 'w-5', 'w-6', 'w-8', 'w-10', 'w-12', 'w-16', 'w-20',
    'w-24', 'w-32', 'w-40', 'w-48', 'w-56', 'w-64', 'w-auto', 'w-px', 'w-1/2', 'w-1/3', 'w-2/3',
    'w-1/4', 'w-2/4', 'w-3/4', 'w-1/5', 'w-2/5', 'w-3/5', 'w-4/5', 'w-1/6', 'w-2/6', 'w-3/6',
    'w-4/6', 'w-5/6', 'w-1/12', 'w-2/12', 'w-3/12', 'w-4/12', 'w-5/12', 'w-6/12', 'w-7/12',
    'w-8/12', 'w-9/12', 'w-10/12', 'w-11/12', 'w-full', 'w-screen', 'w-min', 'w-max', 'h-0',
    'h-1', 'h-2', 'h-3', 'h-4', 'h-5', 'h-6', 'h-8', 'h-10', 'h-12', 'h-16', 'h-20', 'h-24',
    'h-32', 'h-40', 'h-48', 'h-56', 'h-64', 'h-auto', 'h-px', 'h-1/2', 'h-1/3', 'h-2/3',
    'h-1/4', 'h-2/4', 'h-3/4', 'h-1/5', 'h-2/5', 'h-3/5', 'h-4/5', 'h-1/6', 'h-2/6', 'h-3/6',
    'h-4/6', 'h-5/6', 'h-full', 'h-screen', 'h-min', 'h-max', 'min-w-0', 'min-w-full',
    'min-w-min', 'min-w-max', 'min-h-0', 'min-h-full', 'min-h-screen', 'max-w-xs', 'max-w-sm',
    'max-w-md', 'max-w-lg', 'max-w-xl', 'max-w-2xl', 'max-w-3xl', 'max-w-4xl', 'max-w-5xl',
    'max-w-6xl', 'max-w-7xl', 'max-w-full', 'max-w-min', 'max-w-max', 'max-w-prose', 'max-w-none',
    'max-h-0', 'max-h-1', 'max-h-2', 'max-h-3', 'max-h-4', 'max-h-5', 'max-h-6', 'max-h-8',
    'max-h-10', 'max-h-12', 'max-h-16', 'max-h-20', 'max-h-24', 'max-h-32', 'max-h-40',
    'max-h-48', 'max-h-56', 'max-h-64', 'max-h-px', 'max-h-full', 'max-h-screen'
  ]},

  // Typography
  { category: 'Typography', classes: [
    'font-sans', 'font-serif', 'font-mono', 'text-xs', 'text-sm', 'text-base', 'text-lg',
    'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl',
    'text-8xl', 'text-9xl', 'antialiased', 'subpixel-antialiased', 'italic', 'not-italic',
    'font-thin', 'font-extralight', 'font-light', 'font-normal', 'font-medium', 'font-semibold',
    'font-bold', 'font-extrabold', 'font-black', 'normal-nums', 'ordinal', 'slashed-zero',
    'lining-nums', 'oldstyle-nums', 'proportional-nums', 'tabular-nums', 'diagonal-fractions',
    'stacked-fractions', 'leading-3', 'leading-4', 'leading-5', 'leading-6', 'leading-7',
    'leading-8', 'leading-9', 'leading-10', 'leading-none', 'leading-tight', 'leading-snug',
    'leading-normal', 'leading-relaxed', 'leading-loose', 'tracking-tighter', 'tracking-tight',
    'tracking-normal', 'tracking-wide', 'tracking-wider', 'tracking-widest', 'text-left',
    'text-center', 'text-right', 'text-justify', 'text-start', 'text-end', 'underline',
    'line-through', 'no-underline', 'uppercase', 'lowercase', 'capitalize', 'normal-case',
    'text-inherit', 'text-current', 'text-transparent', 'text-black', 'text-white', 'text-slate-50',
    'text-slate-100', 'text-slate-200', 'text-slate-300', 'text-slate-400', 'text-slate-500',
    'text-slate-600', 'text-slate-700', 'text-slate-800', 'text-slate-900', 'text-gray-50',
    'text-gray-100', 'text-gray-200', 'text-gray-300', 'text-gray-400', 'text-gray-500',
    'text-gray-600', 'text-gray-700', 'text-gray-800', 'text-gray-900', 'text-zinc-50',
    'text-zinc-100', 'text-zinc-200', 'text-zinc-300', 'text-zinc-400', 'text-zinc-500',
    'text-zinc-600', 'text-zinc-700', 'text-zinc-800', 'text-zinc-900', 'text-neutral-50',
    'text-neutral-100', 'text-neutral-200', 'text-neutral-300', 'text-neutral-400',
    'text-neutral-500', 'text-neutral-600', 'text-neutral-700', 'text-neutral-800',
    'text-neutral-900', 'text-stone-50', 'text-stone-100', 'text-stone-200', 'text-stone-300',
    'text-stone-400', 'text-stone-500', 'text-stone-600', 'text-stone-700', 'text-stone-800',
    'text-stone-900', 'text-red-50', 'text-red-100', 'text-red-200', 'text-red-300',
    'text-red-400', 'text-red-500', 'text-red-600', 'text-red-700', 'text-red-800',
    'text-red-900', 'text-orange-50', 'text-orange-100', 'text-orange-200', 'text-orange-300',
    'text-orange-400', 'text-orange-500', 'text-orange-600', 'text-orange-700', 'text-orange-800',
    'text-orange-900', 'text-amber-50', 'text-amber-100', 'text-amber-200', 'text-amber-300',
    'text-amber-400', 'text-amber-500', 'text-amber-600', 'text-amber-700', 'text-amber-800',
    'text-amber-900', 'text-yellow-50', 'text-yellow-100', 'text-yellow-200', 'text-yellow-300',
    'text-yellow-400', 'text-yellow-500', 'text-yellow-600', 'text-yellow-700', 'text-yellow-800',
    'text-yellow-900', 'text-lime-50', 'text-lime-100', 'text-lime-200', 'text-lime-300',
    'text-lime-400', 'text-lime-500', 'text-lime-600', 'text-lime-700', 'text-lime-800',
    'text-lime-900', 'text-green-50', 'text-green-100', 'text-green-200', 'text-green-300',
    'text-green-400', 'text-green-500', 'text-green-600', 'text-green-700', 'text-green-800',
    'text-green-900', 'text-emerald-50', 'text-emerald-100', 'text-emerald-200', 'text-emerald-300',
    'text-emerald-400', 'text-emerald-500', 'text-emerald-600', 'text-emerald-700',
    'text-emerald-800', 'text-emerald-900', 'text-teal-50', 'text-teal-100', 'text-teal-200',
    'text-teal-300', 'text-teal-400', 'text-teal-500', 'text-teal-600', 'text-teal-700',
    'text-teal-800', 'text-teal-900', 'text-cyan-50', 'text-cyan-100', 'text-cyan-200',
    'text-cyan-300', 'text-cyan-400', 'text-cyan-500', 'text-cyan-600', 'text-cyan-700',
    'text-cyan-800', 'text-cyan-900', 'text-sky-50', 'text-sky-100', 'text-sky-200',
    'text-sky-300', 'text-sky-400', 'text-sky-500', 'text-sky-600', 'text-sky-700',
    'text-sky-800', 'text-sky-900', 'text-blue-50', 'text-blue-100', 'text-blue-200',
    'text-blue-300', 'text-blue-400', 'text-blue-500', 'text-blue-600', 'text-blue-700',
    'text-blue-800', 'text-blue-900', 'text-indigo-50', 'text-indigo-100', 'text-indigo-200',
    'text-indigo-300', 'text-indigo-400', 'text-indigo-500', 'text-indigo-600', 'text-indigo-700',
    'text-indigo-800', 'text-indigo-900', 'text-violet-50', 'text-violet-100', 'text-violet-200',
    'text-violet-300', 'text-violet-400', 'text-violet-500', 'text-violet-600', 'text-violet-700',
    'text-violet-800', 'text-violet-900', 'text-purple-50', 'text-purple-100', 'text-purple-200',
    'text-purple-300', 'text-purple-400', 'text-purple-500', 'text-purple-600', 'text-purple-700',
    'text-purple-800', 'text-purple-900', 'text-fuchsia-50', 'text-fuchsia-100', 'text-fuchsia-200',
    'text-fuchsia-300', 'text-fuchsia-400', 'text-fuchsia-500', 'text-fuchsia-600',
    'text-fuchsia-700', 'text-fuchsia-800', 'text-fuchsia-900', 'text-pink-50', 'text-pink-100',
    'text-pink-200', 'text-pink-300', 'text-pink-400', 'text-pink-500', 'text-pink-600',
    'text-pink-700', 'text-pink-800', 'text-pink-900', 'text-rose-50', 'text-rose-100',
    'text-rose-200', 'text-rose-300', 'text-rose-400', 'text-rose-500', 'text-rose-600',
    'text-rose-700', 'text-rose-800', 'text-rose-900'
  ]}
];

const TailwindLookupTool = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClasses, setFilteredClasses] = useState(tailwindClasses);
  const [copiedClass, setCopiedClass] = useState('');

  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const filtered = tailwindClasses.map(category => ({
        ...category,
        classes: category.classes.filter(cls => cls.toLowerCase().includes(term))
      })).filter(category => category.classes.length > 0);

      setFilteredClasses(filtered);
    } else {
      setFilteredClasses(tailwindClasses);
    }
  }, [searchTerm]);

  const copyToClipboard = (className: string) => {
    navigator.clipboard.writeText(className);
    setCopiedClass(className);
    setTimeout(() => setCopiedClass(''), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Tailwind CSS 类名速查</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          快速查找和复制常用的 Tailwind CSS 类名
        </p>

        <div className="mb-6 bg-white dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索类名..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {filteredClasses.map((category, index) => (
            <div key={index} className="bg-white dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                {category.category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {category.classes.map((className, clsIndex) => (
                  <div
                    key={clsIndex}
                    onClick={() => copyToClipboard(className)}
                    className={`p-2 text-sm rounded-lg cursor-pointer transition-all duration-300 ${
                      copiedClass === className
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                        : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 hover:shadow-sm'
                    }`}
                  >
                    {className}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300">
            <p className="text-gray-500 dark:text-gray-400 text-lg">没有找到匹配的类名</p>
          </div>
        )}

        <div className="mt-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-2xl p-5 border border-blue-200 dark:border-blue-700/50 shadow-sm transition-all duration-300">
          <h3 className="font-semibold text-lg text-blue-800 dark:text-blue-200 mb-3">使用提示</h3>
          <ul className="space-y-2 text-blue-700 dark:text-blue-300">
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
              点击任何类名即可复制到剪贴板
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
              使用搜索框快速查找特定类名
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
              复制成功后会显示绿色高亮提示
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
              支持按类别浏览所有常用 Tailwind CSS 类
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TailwindLookupTool;
