import React from 'react';

interface Category {
  url: string;
  title: string;
  article_count: number;
}

interface CategoriesProps {
  categories: Category[];
}

export const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <div className="pb-4 card-base onload-animation">
      <div
        className="font-bold transition text-lg text-neutral-900 dark:text-neutral-100 relative ml-8 mt-4 mb-2 before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)] before:absolute before:left-[-16px] before:top-[5.5px]"
      >
        分类
      </div>
      <div id="categories" className="collapse-wrapper px-4 overflow-hidden">
        {categories.map((c) => (
          <a key={c.url} href={`/categories/${c.url}`} aria-label={c.title}>
            <button
              className="w-full h-10 rounded-lg bg-none hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)] transition-all pl-2 hover:pl-3 text-neutral-700 hover:text-[var(--primary)] dark:text-neutral-300 dark:hover:text-[var(--primary)]"
            >
              <div className="flex items-center justify-between relative mr-2">
                <div className="overflow-hidden text-left whitespace-nowrap overflow-ellipsis">
                  {c.title}
                </div>
                <div
                  className="transition px-2 h-7 ml-4 min-w-[2rem] rounded-lg text-sm font-bold text-[var(--btn-content)] dark:text-[var(--deep-text)] bg-[oklch(0.95_0.025_var(--hue))] dark:bg-[var(--primary)] flex items-center justify-center"
                >
                  {c.article_count}
                </div>
              </div>
            </button>
          </a>
        ))}
      </div>
    </div>
  );
};
