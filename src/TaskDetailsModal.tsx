import { X, Save, Trash2, BellOff, Bold, Italic, Link, Zap } from 'lucide-react';
import ActionButton from './ActionButton';
import type { Task } from './types';

interface TaskDetailsModalProps {
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  notesText: string;
  setNotesText: (text: string) => void;
  calendarAlert: boolean;
  setCalendarAlert: (alert: boolean) => void;
  saveNotes: () => void;
  changePriority: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  getWeekDate: (week: number) => string;
  handleAiResearch: () => Promise<void>;
  isResearching: boolean;
  aiResearchResult: string | null;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  selectedTask,
  setSelectedTask,
  notesText,
  setNotesText,
  calendarAlert,
  setCalendarAlert,
  saveNotes,
  changePriority,
  deleteTask,
  getWeekDate,
  handleAiResearch,
  isResearching,
  aiResearchResult
}) => {
  if (!selectedTask) return null;

  const handleMarkdownAction = (action: 'bold' | 'italic' | 'link') => {
    let newText = notesText;
    const selectedText = window.getSelection()?.toString() || '';

    switch (action) {
      case 'bold':
        newText = newText.replace(selectedText, `**${selectedText}**`);
        break;
      case 'italic':
        newText = newText.replace(selectedText, `*${selectedText}*`);
        break;
      case 'link':
        const url = prompt("Enter URL:");
        if (url) {
          newText = newText.replace(selectedText, `[${selectedText}](${url})`);
        }
        break;
    }
    setNotesText(newText);
  };

  return (
    <div 
      className="bg-black bg-opacity-50 flex items-center justify-center p-4" 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        width: '100vw',
        height: '100vh'
      }} 
      onClick={() => setSelectedTask(null)}
    >
      <div 
        className="bg-white rounded-lg shadow-xl overflow-hidden" 
        style={{
          width: '90vw',
          maxWidth: '1200px',
          height: '90vh',
          maxHeight: '800px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h3 className="text-xl font-bold text-gray-800">{selectedTask.title}</h3>
          <button 
            onClick={() => setSelectedTask(null)} 
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto" style={{ height: 'calc(90vh - 80px)', maxHeight: 'calc(800px - 80px)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Capítulo</div>
                    <div className="text-lg font-semibold text-blue-600">{selectedTask.chapter}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Semana</div>
                    <div className="text-lg font-semibold text-green-600">{selectedTask.startWeek}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Prioridad</div>
                    <div 
                      className={`text-lg font-semibold cursor-pointer px-3 py-1 rounded-full text-xs ${
                        selectedTask.priority === 'high' 
                          ? 'bg-red-100 text-red-700' 
                          : selectedTask.priority === 'medium' 
                          ? 'bg-yellow-100 text-yellow-700' 
                          : 'bg-green-100 text-green-700'
                      }`}
                      onClick={() => changePriority(selectedTask.id)}
                    >
                      {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Fecha:</strong> {getWeekDate(selectedTask.startWeek)}
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={saveNotes} 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Save size={16} />
                  Guardar
                </button>
                <button 
                  onClick={() => changePriority(selectedTask.id)} 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cambiar Prioridad
                </button>
                <button 
                  onClick={() => deleteTask(selectedTask.id)} 
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={calendarAlert}
                  onChange={(e) => setCalendarAlert(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <BellOff size={16} />
                  Alerta de Calendario
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Notas y Observaciones</h3>
                    <div className="flex gap-2">
                      <button 
                        className="px-2 py-1 bg-white border rounded text-xs hover:bg-gray-50 flex items-center gap-1" 
                        onClick={() => handleMarkdownAction('bold')}
                      >
                        <Bold size={12} /> Bold
                      </button>
                      <button 
                        className="px-2 py-1 bg-white border rounded text-xs hover:bg-gray-50 flex items-center gap-1" 
                        onClick={() => handleMarkdownAction('italic')}
                      >
                        <Italic size={12} /> Italic
                      </button>
                      <button 
                        className="px-2 py-1 bg-white border rounded text-xs hover:bg-gray-50 flex items-center gap-1" 
                        onClick={() => handleMarkdownAction('link')}
                      >
                        <Link size={12} /> Link
                      </button>
                    </div>
                  </div>
                </div>
                <textarea
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  className="w-full p-3 border-none outline-none resize-none"
                  style={{ height: '400px' }}
                  placeholder="Escribe tus notas aquí. Puedes usar Markdown:&#10;&#10;# Encabezado 1&#10;## Encabezado 2&#10;**Negrita**&#10;*Cursiva*&#10;- Lista de elementos&#10;[Enlace](http://ejemplo.com)"
                />
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 font-semibold text-gray-800">
                      <Zap size={18} /> Asistente AI
                    </h3>
                    <button 
                      onClick={handleAiResearch} 
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm flex items-center gap-2 disabled:opacity-50" 
                      disabled={isResearching}
                    >
                      {isResearching ? (
                        <>
                          <div className="animate-spin">⟳</div>
                          Investigando...
                        </>
                      ) : (
                        <>
                          <Zap size={16} />
                          Investigar
                        </>
                      )}
                    </button>
                  </div>
                </div>
                {aiResearchResult && (
                  <div className="p-3 bg-blue-50 text-sm leading-relaxed">
                    <div dangerouslySetInnerHTML={{ __html: aiResearchResult.replace(/\n/g, '<br/>') }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
