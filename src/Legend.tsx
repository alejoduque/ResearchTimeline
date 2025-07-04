import React from 'react';

const Legend = ({ chapters }) => {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
      <span className="font-medium text-gray-700">Capítulos:</span>
      {Object.entries(chapters).map(([num, chapter]) => (
        <div key={num} className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chapter.color }} />
          <span>{num}. {chapter.name}</span>
        </div>
      ))}
      <div className="ml-auto flex items-center space-x-4 text-xs text-gray-500">
        <span>Prioridad: Alta (grande), Media, Baja (pequeño)</span>
      </div>
    </div>
  );
};

export default Legend;
