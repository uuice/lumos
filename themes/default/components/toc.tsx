import React, { useState, useEffect, useRef } from 'react';

interface Heading {
  element: HTMLElement;
  depth: number;
  text: string;
  id: string;
  index: number;
}

export const TOC: React.FC = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const tocContainerRef = useRef<HTMLDivElement>(null);
  const activeIndicatorRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 收集标题
  useEffect(() => {
    const collectHeadings = () => {
      // 查找内容中的所有标题
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const proseElement = document.querySelector('.prose');

      if (!proseElement) return [];

      const filteredHeadings = Array.from(headingElements).filter(heading =>
        proseElement.contains(heading)
      ) as HTMLElement[]; // 添加类型断言

      if (filteredHeadings.length === 0) return [];

      // 找到最小深度
      const minDepth = Math.min(...filteredHeadings.map(h =>
        parseInt(h.tagName.substring(1))
      ));

      // 处理标题
      return filteredHeadings.map((element, index) => {
        const depth = parseInt(element.tagName.substring(1));
        const text = element.textContent?.trim() || '';
        const id = element.id || `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

        // 确保标题有ID
        if (!element.id) {
          element.id = id;
        }

        return {
          element, // 现在 element 是 HTMLElement 类型
          depth,
          text,
          id,
          index
        };
      }).filter(heading => heading.depth < minDepth + 3); // 只包含最大深度内的标题
    };

    const headings = collectHeadings();
    setHeadings(headings);

    // 设置交叉观察器
    if (headings.length > 0 && window.IntersectionObserver) {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const id = entry.target.id;
          const index = headings.findIndex(h => h.id === id);

          if (index !== -1 && entry.isIntersecting) {
            setActiveIndex(index);
          }
        });
      }, {
        rootMargin: '-10% 0px -80% 0px'
      });

      // 观察所有标题元素
      headings.forEach(heading => {
        observerRef.current?.observe(heading.element);
      });
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // 滚动到标题
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  // 创建TOC条目
  const createTOCEntry = (heading: Heading, minDepth: number, heading1Count: number) => {
    const depth = heading.depth;
    const isFirstLevel = depth === minDepth;
    const isSecondLevel = depth === minDepth + 1;
    const isThirdLevel = depth === minDepth + 2;

    let badgeContent = '';
    let badgeClass = 'transition w-5 h-5 shrink-0 rounded-lg text-xs flex items-center justify-center font-bold';

    if (isFirstLevel) {
      badgeContent = String(heading1Count);
      badgeClass += ' bg-[var(--toc-badge-bg)] text-[var(--btn-content)]';
    } else if (isSecondLevel) {
      badgeContent = '<div class="transition w-2 h-2 rounded-[0.1875rem] bg-[var(--toc-badge-bg)]"></div>';
      badgeClass += ' ml-4';
    } else if (isThirdLevel) {
      badgeContent = '<div class="transition w-1.5 h-1.5 rounded-sm bg-black/5 dark:bg-white/10"></div>';
      badgeClass += ' ml-8';
    }

    const textClass = `transition text-sm ${isFirstLevel || isSecondLevel ? 'text-50' : 'text-30'}`;

    return (
      <a
        key={heading.id}
        href={`#${heading.id}`}
        className={`px-2 flex gap-2 relative transition w-full min-h-9 rounded-xl hover:bg-[var(--toc-btn-hover)] active:bg-[var(--toc-btn-active)] py-2 ${activeIndex === heading.index ? 'visible' : ''}`}
        data-index={heading.index}
        onClick={(e) => {
          e.preventDefault();
          scrollToHeading(heading.id);
        }}
      >
        <div className={badgeClass} dangerouslySetInnerHTML={{ __html: badgeContent }} />
        <div className={textClass}>{heading.text.replace(/#$/, '')}</div>
      </a>
    );
  };

  // 更新活动指示器位置
  useEffect(() => {
    if (activeIndex === null || !tocContainerRef.current || !activeIndicatorRef.current) return;

    const activeEntry = tocContainerRef.current.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement;

    if (activeEntry) {
      // 添加相对定位类到容器
      tocContainerRef.current.classList.add('relative');

      // 计算指示器位置和高度
      const entryRect = activeEntry.getBoundingClientRect();
      const containerRect = tocContainerRef.current.getBoundingClientRect();

      const top = entryRect.top - containerRect.top;
      const height = entryRect.height;

      activeIndicatorRef.current.style.top = `${top}px`;
      activeIndicatorRef.current.style.height = `${height}px`;
      activeIndicatorRef.current.style.display = 'block';
    } else {
      if (activeIndicatorRef.current) {
        activeIndicatorRef.current.style.display = 'none';
      }
    }
  }, [activeIndex]);

  if (headings.length === 0) {
    return null;
  }

  const minDepth = Math.min(...headings.map(h => h.depth));
  let heading1Count = 1;

  return (
    <div ref={tocContainerRef} className="group" id="toc-container">
      {headings.map((heading, index) => {
        const entry = createTOCEntry(heading, minDepth, heading1Count);
        if (heading.depth === minDepth) {
          heading1Count++;
        }
        return entry;
      })}

      {/* Active indicator */}
      <div
        ref={activeIndicatorRef}
        id="active-indicator"
        className="-z-10 absolute bg-[var(--toc-btn-hover)] left-0 right-0 rounded-xl transition-all group-hover:bg-transparent border-2 border-[var(--toc-btn-hover)] group-hover:border-[var(--toc-btn-active)] border-dashed"
        style={{ display: 'none' }}
      ></div>
    </div>
  );
};
