import React from 'react';
import { Plus, Download, Shuffle, Trash2 } from 'lucide-react';
import ActionButton from './ActionButton';
import type { Chapters, Connection, Task } from './types';

interface ControlsProps {
  chapters: Chapters;
  selectedChapter: string;
  setSelectedChapter: (chapter: string) => void;
  newTaskTitle: string;
  setNewTaskTitle: (title: string) => void;
  addNewTask: () => void;
  exportToCSV: () => void;
  baseTaskSize: number;
  setBaseTaskSize: (size: number) => void;
  randomizePositions: () => void;
  deleteConnection: () => void;
  selectedConnection: Connection | null;
  setConnectingFrom: (task: Task | null) => void;
  connectingFrom: Task | null;
}

const Controls: React.FC<ControlsProps> = ({
  chapters,
  selectedChapter,
  setSelectedChapter,
  newTaskTitle,
  setNewTaskTitle,
  addNewTask,
  exportToCSV,
  baseTaskSize,
  setBaseTaskSize,
  randomizePositions,
  deleteConnection,
  selectedConnection,
  setConnectingFrom,
  connectingFrom
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6 flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <select
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
          className="bg-gray-100 border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">Todos los Capítulos</option>
          {Object.entries(chapters).map(([num, chapter]) => (
            <option key={num} value={num}>Capítulo {num}: {chapter.name}</option>
          ))}
        </select>
      </div>

      <div className="flex-grow flex items-center gap-2">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Nueva tarea..."
          className="flex-grow p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-500"
        />
        <ActionButton onClick={addNewTask} icon={Plus} className="bg-blue-500 hover:bg-blue-600">
          Añadir
        </ActionButton>
      </div>

      <div className="flex items-center gap-2">
        <ActionButton onClick={exportToCSV} icon={Download} className="bg-green-500 hover:bg-green-600">
          Exportar CSV
        </ActionButton>
        <ActionButton onClick={randomizePositions} icon={Shuffle} className="bg-purple-500 hover:bg-purple-600">
          Aleatorizar
        </ActionButton>
        {connectingFrom && (
          <button onClick={() => setConnectingFrom(null)} className="text-sm text-red-500 hover:text-red-700">
            Cancelar Conexión
          </button>
        )}
        {selectedConnection && (
          <ActionButton onClick={deleteConnection} icon={Trash2} className="bg-red-500 hover:bg-red-600">
            Borrar Conexión
          </ActionButton>
        )}
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="taskSize" className="text-sm text-gray-600">Tamaño de Tarea:</label>
        <input
          id="taskSize"
          type="range"
          min="30"
          max="100"
          value={baseTaskSize}
          onChange={(e) => setBaseTaskSize(Number(e.target.value))}
          className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <span className="text-sm text-gray-600">{baseTaskSize}px</span>
      </div>
    </div>
  );
};

export default Controls;
