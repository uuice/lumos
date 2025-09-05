import React from 'react';

interface SiteConfig {
  siteName: string;
}

interface RecordSettings {
  showRecord?: boolean;
  icpNumber?: string;
  icpLink?: string;
  policeNumber?: string;
  policeLink?: string;
  recordText?: string;
}

interface FooterProps {
  currentYear: number;
  siteConfig: SiteConfig;
  recordSettings?: RecordSettings;
}

export const Footer: React.FC<FooterProps> = ({ currentYear, siteConfig, recordSettings }) => {
  return (
    <div className="footer col-span-2 onload-animation">
      <div
        className="transition border-t border-black/10 dark:border-white/15 my-10 border-dashed mx-32"
      ></div>
      <div
        className="transition border-dashed border-[oklch(85%_0.01_var(--hue))] dark:border-white/15 rounded-2xl mb-12 flex flex-col items-center justify-center px-6"
      >
        <div className="transition text-50 text-sm text-center">
          &copy; <span id="copyright-year">{currentYear}</span> 轻盈的鱼. All Rights Reserved. /
          <a className="transition link text-[var(--primary)] font-medium" target="_blank" href="/rss.xml"
          >
            RSS
          </a>
          /
          <a
            className="transition link text-[var(--primary)] font-medium"
            target="_blank"
            href="/sitemap.xml"
          >
            Sitemap
          </a>
          <br />
          Powered by
          <a
            className="transition link text-[var(--primary)] font-medium"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/uuice"
          >
            UUICE
          </a>
          &
          <a
            className="transition link text-[var(--primary)] font-medium"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/uuice/lumos"
          >
            Lumos
          </a>
          Theme 移植自
          <a
            className="transition link text-[var(--primary)] font-medium"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/saicaca/fuwari"
          >
            fuwari
          </a>
        </div>
        {recordSettings && recordSettings.showRecord && (
          <div className="transition text-50 text-sm text-center">
            {recordSettings.icpNumber && (
              <a
                className="transition link text-[var(--primary)] font-medium"
                target="_blank"
                rel="noopener noreferrer"
                href={recordSettings.icpLink}
              >
                {recordSettings.icpNumber}
              </a>
            )}
            {recordSettings.policeNumber && (
              <>
                {' '}
                <a
                  className="transition link text-[var(--primary)] font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={recordSettings.policeLink}
                >
                  {recordSettings.policeNumber}
                </a>
              </>
            )}
            {recordSettings.recordText && (
              <span className="transition link text-[var(--primary)] font-medium" >
                {recordSettings.recordText}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
