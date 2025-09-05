import React from 'react';

export const ScrollToTop: React.FC = () => {
  return (
    <div className="back-to-top-wrapper hidden lg:block">
      <div
        id="back-to-top-btn"
        className="back-to-top-btn  flex items-center rounded-2xl overflow-hidden transition"
      >
        <button aria-label="Back to Top" className="btn-card h-[3.75rem] w-[3.75rem]">
          <svg
            width="1em"
            height="1em"
            className="mx-auto"
            data-icon="material-symbols:keyboard-arrow-up-rounded"
          >
            <symbol id="ai:material-symbols:keyboard-arrow-up-rounded" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
              />
            </symbol>
            <use href="#ai:material-symbols:keyboard-arrow-up-rounded"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};
