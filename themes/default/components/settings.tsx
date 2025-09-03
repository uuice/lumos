import React, { useState, useEffect, useRef } from 'react';

export const Settings: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [hue, setHue] = useState('225');
  const panelRef = useRef<HTMLDivElement>(null);

  // 初始化色调值
  useEffect(() => {
    const savedHue = localStorage.getItem('hue');
    if (savedHue) {
      setHue(savedHue);
      const root = document.documentElement;
      if (root) {
        root.style.setProperty('--hue', savedHue);
      }
    }
  }, []);

  // 处理色调变化
  const handleHueChange = (newHue: string) => {
    setHue(newHue);
    localStorage.setItem('hue', newHue);
    const root = document.documentElement;
    if (root) {
      root.style.setProperty('--hue', newHue);
    }
  };

  // 重置为默认值
  const resetToDefault = () => {
    handleHueChange('225');
  };

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

  return (
    <>
      <button
        aria-label="Display Settings"
        className="btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
        id="display-settings-switch"
        onClick={() => setIsPanelOpen(!isPanelOpen)}
      >
        <svg width="1em" height="1em" className="text-[1.25rem]" data-icon="material-symbols:palette-outline">
          <symbol id="ai:material-symbols:palette-outline" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 22q-2.05 0-3.875-.788t-3.187-2.15t-2.15-3.187T2 12q0-2.075.813-3.9t2.2-3.175T8.25 2.788T12.2 2q2 0 3.775.688t3.113 1.9t2.125 2.875T22 11.05q0 2.875-1.75 4.413T16 17h-1.85q-.225 0-.312.125t-.088.275q0 .3.375.863t.375 1.287q0 1.25-.687 1.85T12 22m-5.5-9q.65 0 1.075-.425T8 11.5t-.425-1.075T6.5 10t-1.075.425T5 11.5t.425 1.075T6.5 13m3-4q.65 0 1.075-.425T11 7.5t-.425-1.075T9.5 6t-1.075.425T8 7.5t.425 1.075T9.5 9m5 0q.65 0 1.075-.425T16 7.5t-.425-1.075T14.5 6t-1.075.425T13 7.5t.425 1.075T14.5 9m3 4q.65 0 1.075-.425T19 11.5t-.425-1.075T17.5 10t-1.075.425T16 11.5t.425 1.075T17.5 13M12 20q.225 0 .363-.125t.137-.325q0-.35-.375-.825T11.75 17.3q0-1.05.725-1.675T14.25 15H16q1.65 0 2.825-.962T20 11.05q0-3.025-2.312-5.038T12.2 4Q8.8 4 6.4 6.325T4 12q0 3.325 2.338 5.663T12 20"
            />
          </symbol>
          <use href="#ai:material-symbols:palette-outline"></use>
        </svg>
      </button>

      <div
        ref={panelRef}
        id="display-setting"
        className={`float-panel absolute transition-all w-80 right-4 px-4 py-4 ${isPanelOpen ? '' : 'float-panel-closed'}`}
      >
        <div className="flex flex-row gap-2 mb-3 items-center justify-between">
          <div
            className="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3 before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)] before:absolute before:-left-3 before:top-[0.33rem]"
          >
            Theme Color
            <button
              aria-label="Reset to Default"
              className="btn-regular w-7 h-7 rounded-md active:scale-90"
              onClick={resetToDefault}
            >
              <div className="text-[var(--btn-content)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  className="text-[0.875rem] iconify iconify--fa6-solid"
                  width="1em"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2l17.6-17.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0z"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
          <div className="flex gap-1">
            <div
              id="hueValue"
              className="transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center font-bold text-sm items-center text-[var(--btn-content)]"
            >
              {hue}
            </div>
          </div>
        </div>
        <div
          className="w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded select-none"
        >
          <input
            type="range"
            min="0"
            max="360"
            className="slider"
            id="colorSlider"
            step="1"
            style={{ width: '100%' }}
            aria-label="Theme Color"
            value={hue}
            onChange={(e) => handleHueChange(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};
