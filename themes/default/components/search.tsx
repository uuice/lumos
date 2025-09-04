import React from 'react';

export const Search: React.FC = () => {

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
        />
      </div>
      <button
        aria-label="Search Panel"
        id="search-switch"
        className="btn-plain scale-animation lg:!hidden rounded-lg w-11 h-11 active:scale-90"
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
        id="search-panel"
        className="float-panel search-panel absolute md:w-[30rem] top-20 left-4 md:left-[unset] right-4 shadow-2xl rounded-2xl p-2 float-panel-closed"
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

          />
        </div>
        <div id="search-results" className="mt-2">
        {/* <!-- 搜索结果将在这里动态生成 --> */}
        </div>
      </div>
    </>
  );
};
