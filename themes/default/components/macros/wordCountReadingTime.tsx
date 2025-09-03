import React from 'react';

interface Item {
  content?: string;
}

interface WordCountReadingTimeProps {
  item: Item;
}

// Simple word count function
const wordCount = (text: string = ''): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

// Function to format number with 2 decimal places
const toFixed = (num: number, digits: number): string => {
  return num.toFixed(digits);
};

export const WordCountReadingTime: React.FC<WordCountReadingTimeProps> = ({ item }) => {
  const words = wordCount(item.content || '');
  const readingTime = toFixed(words / 60, 2);

  return (
    <div
      className="text-sm text-black/30 dark:text-white/30 flex gap-4 transition"
      style={{ '--coverWidth': '28%' } as React.CSSProperties}
    >
      <div style={{ '--coverWidth': '28%' } as React.CSSProperties}>{words} words</div>
      <div style={{ '--coverWidth': '28%' } as React.CSSProperties}>|</div>
      <div style={{ '--coverWidth': '28%' } as React.CSSProperties}>{readingTime} 分钟</div>
    </div>
  );
};
