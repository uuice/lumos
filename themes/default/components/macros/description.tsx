import React from 'react';

interface Item {
  abstract?: string;
}

interface DescriptionProps {
  item: Item;
}

export const Description: React.FC<DescriptionProps> = ({ item }) => {
  return (
    <div 
      className="transition text-75 mb-3.5 pr-4" 
      style={{ '--coverWidth': '28%' } as React.CSSProperties}
    >
      {item.abstract}
    </div>
  );
};