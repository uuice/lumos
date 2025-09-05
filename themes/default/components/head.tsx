import React from 'react';
import { Search } from './search';
import { Settings } from './settings';

interface SiteConfig {
  siteName: string;
}

interface HeadProps {
  siteConfig: SiteConfig;
}

export const Head: React.FC<HeadProps> = ({ siteConfig }) => {
  return (
    <div id="navbar" className="z-50 onload-animation">
      <div className="absolute h-8 left-0 right-0 -top-8 bg-[var(--card-bg)] transition"></div>
      <div className="card-base !overflow-visible max-w-[var(--page-width)] h-[4.5rem] !rounded-t-none mx-auto flex items-center justify-between px-4">
        <a href="/" className="btn-plain scale-animation rounded-lg h-[3.25rem] px-5 font-bold active:scale-95">
          <div className="flex flex-row text-[var(--primary)] items-center text-md">
            <svg width="1em" height="1em" className="text-[1.75rem] mb-1 mr-2" data-icon="material-symbols:home-outline-rounded">
              <symbol id="ai:material-symbols:home-outline-rounded" viewBox="0 0 24 24">
                <path fill="currentColor" d="M6 19h3v-5q0-.425.288-.712T10 13h4q.425 0 .713.288T15 14v5h3v-9l-6-4.5L6 10zm-2 0v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-4q-.425 0-.712-.288T13 20v-5h-2v5q0 .425-.288.713T10 21H6q-.825 0-1.412-.587T4 19m8-6.75" />
              </symbol>
              <use href="#ai:material-symbols:home-outline-rounded"></use>
            </svg>
            {siteConfig.siteName}
          </div>
        </a>
        <div className="hidden md:flex">
          <a aria-label="Home" href="/" className="btn-plain scale-animation rounded-lg h-11 font-bold px-5 active:scale-95">
            <div className="flex items-center">首页</div>
          </a>
          <a aria-label="Archive" href="/archives" className="btn-plain scale-animation rounded-lg h-11 font-bold px-5 active:scale-95">
            <div className="flex items-center">归档</div>
          </a>
          {/* <a aria-label="Daily Libs" href="/daily-libs" className="btn-plain scale-animation rounded-lg h-11 font-bold px-5 active:scale-95"> */}
            {/* <div className="flex items-center">每日一库</div>
          </a> */}
          <a aria-label="Links" href="/links" className="btn-plain scale-animation rounded-lg h-11 font-bold px-5 active:scale-95">
            <div className="flex items-center">友情链接</div>
          </a>
          <a aria-label="About" href="/about" className="btn-plain scale-animation rounded-lg h-11 font-bold px-5 active:scale-95">
            <div className="flex items-center">关于</div>
          </a>
          <a aria-label="GitHub" href="https://github.com/uuice/" target="_blank" rel="noopener noreferrer" className="btn-plain scale-animation rounded-lg h-11 font-bold px-5 active:scale-95">
            <div className="flex items-center">
              GitHub
              <svg width="1em" height="1em" viewBox="0 0 512 512" className="text-[0.875rem] transition -translate-y-[1px] ml-1 text-black/[0.2] dark:text-white/[0.2]" data-icon="fa6-solid:arrow-up-right-from-square">
                <use href="#ai:fa6-solid:arrow-up-right-from-square"></use>
              </svg>
            </div>
          </a>
        </div>
        <div className="flex">
          <Search />
          <Settings/>
          <button
            aria-label="Light/Dark Mode"
            role="menuitem"
            className="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
            id="scheme-switch"
          >
            <div className="absolute opacity-0">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="text-[1.25rem] iconify iconify--material-symbols" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M11 3V2q0-.425.288-.712T12 1t.713.288T13 2v1q0 .425-.288.713T12 4t-.712-.288T11 3m0 19v-1q0-.425.288-.712T12 20t.713.288T13 21v1q0 .425-.288.713T12 23t-.712-.288T11 22m11-9h-1q-.425 0-.712-.288T20 12t.288-.712T21 11h1q.425 0 .713.288T23 12t-.288.713T22 13M3 13H2q-.425 0-.712-.288T1 12t.288-.712T2 11h1q.425 0 .713.288T4 12t-.288.713T3 13m16.75-7.325l-.35.35q-.275.275-.687.275T18 6q-.275-.275-.288-.687t.263-.713l.375-.375q.275-.3.7-.3t.725.3t.288.725t-.313.725M6.025 19.4l-.375.375q-.275.3-.7.3t-.725-.3t-.288-.725t.313-.725l.35-.35q.275-.275.688-.275T6 18q.275.275.288.688t-.263.712m12.3.35l-.35-.35q-.275-.275-.275-.687T18 18q.275-.275.688-.287t.712.262l.375.375q.3.275.3.7t-.3.725t-.725.288t-.725-.313M4.6 6.025l-.375-.375q-.3-.275-.3-.7t.3-.725t.725-.288t.725.313l.35.35q.275.275.275.688T6 6q-.275.275-.687.288T4.6 6.025M12 18q-2.5 0-4.25-1.75T6 12t1.75-4.25T12 6t4.25 1.75T18 12t-1.75 4.25T12 18m0-2q1.675 0 2.95-1.162T16 12t-1.05-2.838T12 8T9.05 9.163T8 12t1.05 2.838T12 16m0-4"></path>
              </svg>
            </div>
            <div className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="text-[1.25rem] iconify iconify--material-symbols" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 21q-3.775 0-6.387-2.613T3 12q0-3.45 2.25-5.988T11 3.05q.325-.05.575.088t.4.362t.163.525t-.188.575q-.425.65-.638 1.375T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q.775 0 1.538-.225t1.362-.625q.275-.175.563-.162t.512.137q.25.125.388.375t.087.6q-.35 3.45-2.937 5.725T12 21m0-2q2.2 0 3.95-1.213t2.55-3.162q-.5.125-1 .2t-1 .075q-3.075 0-5.238-2.163T9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.163 2.55T5 12q0 2.9 2.05 4.95T12 19m-.25-6.75"></path>
              </svg>
            </div>
            <div className="absolute opacity-0">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="text-[1.25rem] iconify iconify--material-symbols" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 17V7Q9.925 7 8.463 8.463T7 12t1.463 3.538T12 17m0 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"></path>
              </svg>
            </div>
          </button>

          <button
            aria-label="Menu"
            name="Nav Menu"
            className="btn-plain scale-animation rounded-lg w-11 h-11 active:scale-90 md:!hidden"
            id="nav-menu-switch"
          >
            <svg width="1em" height="1em" className="text-[1.25rem]" data-icon="material-symbols:menu-rounded">
              <symbol id="ai:material-symbols:menu-rounded" viewBox="0 0 24 24">
                <path fill="currentColor" d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"></path>
              </symbol>
              <use href="#ai:material-symbols:menu-rounded"></use>
            </svg>
          </button>
        </div>
        <div id="nav-menu-panel" className="float-panel float-panel-closed transition-all fixed right-4 px-2 py-2">
          <a href="/" className="group flex justify-between items-center py-2 pl-3 pr-1 rounded-lg gap-8 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)] transition">
            <div className="transition text-black/75 dark:text-white/75 font-bold group-hover:text-[var(--primary)] group-active:text-[var(--primary)]">
              首页
            </div>
            <svg width="1em" height="1em" className="transition text-[1.25rem] text-[var(--primary)]" data-icon="material-symbols:chevron-right-rounded">
              <symbol id="ai:material-symbols:chevron-right-rounded" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7z" />
              </symbol>
              <use href="#ai:material-symbols:chevron-right-rounded"></use>
            </svg>
          </a>
          <a href="/archives" className="group flex justify-between items-center py-2 pl-3 pr-1 rounded-lg gap-8 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)] transition">
            <div className="transition text-black/75 dark:text-white/75 font-bold group-hover:text-[var(--primary)] group-active:text-[var(--primary)]">
              归档
            </div>
            <svg width="1em" height="1em" viewBox="0 0 24 24" className="transition text-[1.25rem] text-[var(--primary)]" data-icon="material-symbols:chevron-right-rounded">
              <use href="#ai:material-symbols:chevron-right-rounded"></use>
            </svg>
          </a>

          {/* <a href="/daily-libs" className="group flex justify-between items-center py-2 pl-3 pr-1 rounded-lg gap-8 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)] transition">
            <div className="transition text-black/75 dark:text-white/75 font-bold group-hover:text-[var(--primary)] group-active:text-[var(--primary)]">
              每日一库
            </div>
            <svg width="1em" height="1em" viewBox="0 0 24 24" className="transition text-[1.25rem] text-[var(--primary)]" data-icon="material-symbols:chevron-right-rounded">
              <use href="#ai:material-symbols:chevron-right-rounded"></use>
            </svg>
          </a> */}
          <a href="/links" className="group flex justify-between items-center py-2 pl-3 pr-1 rounded-lg gap-8 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)] transition">
            <div className="transition text-black/75 dark:text-white/75 font-bold group-hover:text-[var(--primary)] group-active:text-[var(--primary)]">
              友情链接
            </div>
            <svg width="1em" height="1em" viewBox="0 0 24 24" className="transition text-[1.25rem] text-[var(--primary)]" data-icon="material-symbols:chevron-right-rounded">
              <use href="#ai:material-symbols:chevron-right-rounded"></use>
            </svg>
          </a>
          <a href="/about/" className="group flex justify-between items-center py-2 pl-3 pr-1 rounded-lg gap-8 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)] transition">
            <div className="transition text-black/75 dark:text-white/75 font-bold group-hover:text-[var(--primary)] group-active:text-[var(--primary)]">
              关于
            </div>
            <svg width="1em" height="1em" viewBox="0 0 24 24" className="transition text-[1.25rem] text-[var(--primary)]" data-icon="material-symbols:chevron-right-rounded">
              <use href="#ai:material-symbols:chevron-right-rounded"></use>
            </svg>
          </a>
          <a href="https://github.com/uuice/" className="group flex justify-between items-center py-2 pl-3 pr-1 rounded-lg gap-8 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)] transition" target="_blank" rel="noreferrer">
            <div className="transition text-black/75 dark:text-white/75 font-bold group-hover:text-[var(--primary)] group-active:text-[var(--primary)]">
              GitHub
            </div>
            <svg width="1em" height="1em" viewBox="0 0 512 512" className="transition text-[0.75rem] text-black/25 dark:text-white/25 -translate-x-1" data-icon="fa6-solid:arrow-up-right-from-square">
              <use href="#ai:fa6-solid:arrow-up-right-from-square"></use>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
