import React from 'react';
import type { Chapters } from './types';

interface LegendProps {
  chapters: Chapters;
}

const Legend: React.FC<LegendProps> = ({ chapters }) => {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
      {Object.entries(chapters).map(([num, chapter]) => (
        <div key={num} className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chapter.color }} />
          <span>{num}. {chapter.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;