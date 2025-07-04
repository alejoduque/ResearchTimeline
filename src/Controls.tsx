import React from 'react';
import { Plus, X, Trash2, RotateCcw, Download } from 'lucide-react';

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
  exportToCSV
}) => {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-600">Capítulo:</label>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Todos</option>
            {Object.entries(chapters).map(([num, chapter]) => (
              <option key={num} value={num}>Cap. {num}: {chapter.name}</option>
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
          <button
            onClick={addNewTask}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {connectingFrom && (
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-md text-sm">
            <span>Conectando: {connectingFrom.title.substring(0, 20)}...</span>
            <button onClick={() => setConnectingFrom(null)} className="text-purple-500 hover:text-purple-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {selectedConnection && (
          <button onClick={deleteConnection} className="flex items-center space-x-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm font-medium">
            <Trash2 className="w-4 h-4" />
            <span>Eliminar Conexión</span>
          </button>
        )}

        <button onClick={randomizePositions} className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium">
          <RotateCcw className="w-4 h-4" />
        </button>

        <button onClick={exportToCSV} className="flex items-center space-x-2 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium">
          <Download className="w-4 h-4" />
          <span>Exportar</span>
        </button>
      </div>
    </div>
  );
};

export default Controls;
