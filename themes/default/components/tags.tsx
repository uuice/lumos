import React from 'react';

interface Tag {
  url: string;
  title: string;
}

interface TagsProps {
  tags: Tag[];
}

export const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div className="pb-4 card-base onload-animation">
      <div
        className="font-bold transition text-lg text-neutral-900 dark:text-neutral-100 relative ml-8 mt-4 mb-2 before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)] before:absolute before:left-[-16px] before:top-[5.5px]"
      >
        标签
      </div>
      <div id="tags" className="collapse-wrapper px-4 overflow-hidden">
        <div className="flex gap-2 flex-wrap">
          {tags.map((t) => (
            <a
              key={t.url}
              href={`/tags/${t.url}`}
              aria-label={`View all posts with the ${t.title} tag`}
              className="btn-regular h-8 text-sm px-3 rounded-lg"
            >
              {t.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
