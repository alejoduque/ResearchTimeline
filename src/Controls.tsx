import React from 'react';
import { Plus, X, Trash2, RotateCcw, Download } from 'lucide-react';
import ActionButton from './ActionButton';

const Controls = ({
  chapters,
  selectedChapter,
  setSelectedChapter,
  newTaskTitle,
  setNewTaskTitle,
  addNewTask,
  connectingFrom,
  setConnectingFrom,
  selectedConnection,
  deleteConnection,
  randomizePositions,
  exportToCSV,
  exportToJSON,
  importFromJSON
}) => {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center space-x-2">
          <label htmlFor="chapter-select" className="text-sm font-medium text-gray-600">Capítulo:</label>
          <select
            id="chapter-select"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Todos</option>
            {Object.entries(chapters).map(([num, { name }]) => (
              <option key={num} value={num}>{`Cap. ${num}: ${name}`}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Nueva tarea..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
            className="border-gray-300 rounded-md px-3 py-1.5 text-sm w-48 focus:ring-blue-500 focus:border-blue-500"
          />
          <button onClick={addNewTask} className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {connectingFrom && (
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-md text-sm">

            <button onClick={() => setConnectingFrom(null)} className="text-purple-500 hover:text-purple-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        {selectedConnection && (
          <ActionButton
            onClick={deleteConnection}
            icon={Trash2}
            className="bg-red-100 text-red-700 hover:bg-red-200"
          >
            Eliminar Conexión
          </ActionButton>
        )}
        <ActionButton
          onClick={randomizePositions}
          icon={RotateCcw}
          className="bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          Aleatorizar
        </ActionButton>
        <ActionButton
          onClick={exportToCSV}
          icon={Download}
          className="bg-green-600 text-white hover:bg-green-700"
        >
          CSV
        </ActionButton>
        <ActionButton
          onClick={exportToJSON}
          icon={Download}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          JSON
        </ActionButton>
        <label className="cursor-pointer" title="Importar JSON">
          <input
            type="file"
            accept=".json"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                importFromJSON(file);
                e.target.value = ''; // Reset input
              }
            }}
            className="hidden"
          />
          <div className="bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition-colors cursor-pointer">
            <Download className="w-4 h-4 rotate-180" />
          </div>
        </label>
      </div>
    </div>
  );
};

export default Controls;