import React, { useState, useEffect, useRef } from 'react';

interface SearchResult {
  url: string;
  title: string;
  abstract: string;
  _highlight?: {
    title?: string;
    abstract?: string;
  };
}

export const Search: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // 防抖函数
  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // 执行搜索
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery || searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/content/search/articles?q=${encodeURIComponent(searchQuery)}`, {
        headers: {
          'x-access-token': 'web_token_123456789',
          'x-app-name': 'WebApp',
          'x-channel': 'web'
        }
      });

      const data = await response.json();
      setResults(data.data || []);
    } catch (error) {
      console.error('搜索请求失败:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 防抖搜索
  const debouncedSearch = useRef(debounce(performSearch, 300)).current;

  // 监听查询变化
  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  // 处理点击外部关闭面板
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsPanelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 渲染搜索结果
  const renderResults = () => {
    if (isLoading) {
      return <div className="text-center py-4 text-black/75 dark:text-white/75">搜索中...</div>;
    }

    if (results.length === 0) {
      return <div className="text-center py-4 text-black/75 dark:text-white/75">没有找到相关结果</div>;
    }

    return results.map((item) => {
      // 安全地解析HTML内容
      const titleContent = item._highlight?.title || item.title || '';
      const abstractContent = item._highlight?.abstract || item.abstract || '';

      return (
        <a
          key={item.url}
          className="transition first-of-type:mt-2 lg:first-of-type:mt-0 group block rounded-xl text-lg px-3 py-2 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)]"
          href={`/archives/${item.url}`}
        >
          <div className="transition text-90 inline-flex font-bold group-hover:text-[var(--primary)]">
            <span dangerouslySetInnerHTML={{ __html: titleContent }} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="transition text-[0.75rem] translate-x-1 my-auto text-[var(--primary)] iconify iconify--fa6-solid"
              width="0.63em"
              height="1em"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
              ></path>
            </svg>
          </div>
          <div
            className="transition text-sm text-50 abstract-content"
            dangerouslySetInnerHTML={{ __html: abstractContent }}
          />
        </a>
      );
    });
  };

  return (
    <>
      <div
        id="search-bar"
        className="hidden lg:flex transition-all items-center h-11 mr-2 rounded-lg bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06] dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          className="absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30 iconify iconify--material-symbols"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
          ></path>
        </svg>
        <input
          id="search-input"
          className="transition-all pl-10 text-sm bg-transparent !outline-none !border-none !shadow-none h-full w-40 active:w-60 focus:w-60 text-black/50 dark:text-white/50"
          placeholder="Search"
          style={{ outline: 'none !important', boxShadow: 'none !important', border: 'none !important' }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button
        aria-label="Search Panel"
        id="search-switch"
        className="btn-plain scale-animation lg:!hidden rounded-lg w-11 h-11 active:scale-90"
        onClick={() => setIsPanelOpen(!isPanelOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          className="text-[1.25rem] iconify iconify--material-symbols"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
          ></path>
        </svg>
      </button>

      <div
        ref={panelRef}
        id="search-panel"
        className={`float-panel search-panel absolute md:w-[30rem] top-20 left-4 md:left-[unset] right-4 shadow-2xl rounded-2xl p-2 ${isPanelOpen ? '' : 'float-panel-closed'}`}
      >
        <div
          id="search-bar-inside"
          className="flex relative lg:hidden transition-all items-center h-11 rounded-xl bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06] dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            className="absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30 iconify iconify--material-symbols"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
            ></path>
          </svg>
          <input
            id="search-input-inside"
            placeholder="Search"
            className="pl-10 absolute inset-0 text-sm bg-transparent !outline-none !border-none !shadow-none focus:w-60 text-black/50 dark:text-white/50"
            style={{ outline: 'none !important', boxShadow: 'none !important', border: 'none !important' }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                performSearch(query);
              }
            }}
          />
        </div>
        <div id="search-results" className="mt-2">
          {renderResults()}
        </div>
      </div>
    </>
  );
};
