import React from 'react';
import { POST } from '../../../../src/types';
import { titleToUrl } from '../../../../src/utils';
import dayjs from 'dayjs';
interface MetadataProps {
  item: POST;
}

export const Metadata: React.FC<MetadataProps> = ({ item }) => {
  return (
    <div className="flex flex-wrap text-neutral-500 dark:text-neutral-400 items-center gap-4 gap-x-4 gap-y-2 mb-4">
      {/* publish date */}
      <div className="flex items-center">
        <div className="meta-icon">
          <svg
            width="1em"
            height="1em"
            className="text-xl"
            data-icon="material-symbols:calendar-today-outline-rounded"
          >
            <symbol id="ai:material-symbols:calendar-today-outline-rounded" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6z"
              ></path>
            </symbol>
            <use href="#ai:material-symbols:calendar-today-outline-rounded"></use>
          </svg>
        </div>
        <span className="text-50 text-sm font-medium">
          {dayjs(item.created_time).format('YYYY-MM-DD')}
        </span>
      </div>

      {/* categories */}
      <div className="flex items-center">
        <div className="meta-icon">
          <svg
            width="1em"
            height="1em"
            className="text-xl"
            data-icon="material-symbols:book-2-outline-rounded"
          >
            <symbol id="ai:material-symbols:book-2-outline-rounded" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M6 15.325q.35-.175.725-.25T7.5 15H8V4h-.5q-.625 0-1.062.438T6 5.5zM10 15h8V4h-8zm-4 .325V4zM7.5 22q-1.45 0-2.475-1.025T4 18.5v-13q0-1.45 1.025-2.475T7.5 2H18q.825 0 1.413.587T20 4v12.525q0 .2-.162.363t-.588.362q-.35.175-.55.5t-.2.75t.2.763t.55.487t.55.413t.2.562v.25q0 .425-.288.725T19 22zm0-2h9.325q-.15-.35-.237-.712T16.5 18.5q0-.4.075-.775t.25-.725H7.5q-.65 0-1.075.438T6 18.5q0 .65.425 1.075T7.5 20"
              ></path>
            </symbol>
            <use href="#ai:material-symbols:book-2-outline-rounded"></use>
          </svg>
        </div>
        <div className="flex flex-row flex-nowrap items-center">
        {item.categories && item.categories.map((c, index) => (
            <React.Fragment key={c}>
          <a
            href={`/categories/${titleToUrl(c)}`}
            aria-label={`View all posts in the ${c} category`}
            className="link-lg transition text-50 text-sm font-medium hover:text-[var(--primary)] dark:hover:text-[var(--primary)] whitespace-nowrap"
          >
            {c}
            </a>
            {index < item.categories.length - 1 && (
                <div className="mx-1.5 text-[var(--meta-divider)] text-sm">/</div>
              )}
          </React.Fragment>
           ))}
        </div>
      </div>

      {/* tags */}
      <div className="items-center hidden md:flex">
        <div className="meta-icon">
          <svg width="1em" height="1em" className="text-xl" data-icon="material-symbols:tag-rounded">
            <symbol id="ai:material-symbols:tag-rounded" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="m9 16l-.825 3.275q-.075.325-.325.525t-.6.2q-.475 0-.775-.375T6.3 18.8L7 16H4.275q-.5 0-.8-.387T3.3 14.75q.075-.35.35-.55t.625-.2H7.5l1-4H5.775q-.5 0-.8-.387T4.8 8.75q.075-.35.35-.55t.625-.2H9l.825-3.275Q9.9 4.4 10.15 4.2t.6-.2q.475 0 .775.375t.175.825L11 8h4l.825-3.275q.075-.325.325-.525t.6-.2q.475 0 .775.375t.175.825L17 8h2.725q.5 0 .8.387t.175.863q-.075.35-.35.55t-.625.2H16.5l-1 4h2.725q.5 0 .8.388t.175.862q-.075.35-.35.55t-.625.2H15l-.825 3.275q-.075.325-.325.525t-.6.2q-.475 0-.775-.375T12.3 18.8L13 16zm.5-2h4l1-4h-4z"
              ></path>
            </symbol>
            <use href="#ai:material-symbols:tag-rounded"></use>
          </svg>
        </div>
        <div className="flex flex-row flex-nowrap items-center">
          <div className="hidden mx-1.5 text-[var(--meta-divider)] text-sm">/</div>
          {item.tags && item.tags.map((tag, index) => (
            <React.Fragment key={tag}>
              <a
                href={`/tags/${titleToUrl(tag)}`}
                aria-label={`View all posts with the ${tag} tag`}
                className="link-lg transition text-50 text-sm font-medium hover:text-[var(--primary)] dark:hover:text-[var(--primary)] whitespace-nowrap"
              >
                {tag}
              </a>
              {index < item.tags.length - 1 && (
                <div className="mx-1.5 text-[var(--meta-divider)] text-sm">/</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
