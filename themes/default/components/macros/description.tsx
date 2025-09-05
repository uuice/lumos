import React from 'react';
import { POST } from '../../../../src/types';

interface DescriptionProps {
  item: POST;
}

export const Description: React.FC<DescriptionProps> = ({ item }) => {
  return (
    <div
      className="transition text-75 mb-3.5 pr-4"
      style={{ '--coverWidth': '28%' } as React.CSSProperties}
    >
      {item.excerpt}
    </div>
  );
};
