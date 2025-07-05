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
    <div className="floating-modal-overlay" onClick={() => setSelectedTask(null)}>
      <div className="floating-modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setSelectedTask(null)} className="floating-modal-close">
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedTask.title}</h2>
            <div className="text-sm text-gray-500 mb-4 space-y-1">
              <p><strong>Capítulo:</strong> {selectedTask.chapter}</p>
              <p><strong>Semana de Inicio:</strong> {selectedTask.startWeek} ({getWeekDate(selectedTask.startWeek)})</p>
              <p><strong>Prioridad:</strong> 
                <span 
                  onClick={() => changePriority(selectedTask.id)}
                  className={`cursor-pointer font-semibold px-2 py-1 rounded-full text-xs ml-2 ${selectedTask.priority === 'high' ? 'bg-red-100 text-red-700' : selectedTask.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                  {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                </span>
              </p>
            </div>

            <div className="space-y-4">
              <ActionButton onClick={saveNotes} icon={Save} className="w-full bg-blue-500 hover:bg-blue-600">
                Guardar Cambios
              </ActionButton>
              <ActionButton onClick={() => setCalendarAlert(!calendarAlert)} icon={BellOff} className={`w-full ${calendarAlert ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-300 hover:bg-gray-400'}`}>
                {calendarAlert ? 'Quitar Alerta' : 'Añadir Alerta de Calendario'}
              </ActionButton>
              <ActionButton onClick={() => deleteTask(selectedTask.id)} icon={Trash2} className="w-full bg-red-500 hover:bg-red-600">
                Borrar Tarea
              </ActionButton>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="markdown-section">
              <div className="markdown-header">
                <h3 className="markdown-label">Notas y Observaciones</h3>
                <div className="markdown-toolbar">
                  <button className="toolbar-button bold" onClick={() => handleMarkdownAction('bold')}>
                    <Bold size={16} /> Bold
                  </button>
                  <button className="toolbar-button italic" onClick={() => handleMarkdownAction('italic')}>
                    <Italic size={16} /> Italic
                  </button>
                  <button className="toolbar-button link" onClick={() => handleMarkdownAction('link')}>
                    <Link size={16} /> Link
                  </button>
                </div>
              </div>
              <div className="markdown-editor-container">
                <textarea
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  className="markdown-textarea"
                  placeholder="Escribe tus notas aquí. Puedes usar Markdown:\n\n# Encabezado 1\n## Encabezado 2\n**Negrita**\n*Cursiva*\n- Lista de elementos\n[Enlace](http://ejemplo.com)"
                />
              </div>
            </div>
            
            <div className="ai-research-section">
              <div className="ai-research-header">
                <h3 className="ai-research-title">
                  <Zap size={20} /> Asistente de Investigación AI
                </h3>
                <button 
                  onClick={handleAiResearch} 
                  className="ai-research-button" 
                  disabled={isResearching}
                >
                  {isResearching ? 'Investigando...' : 'Investigar con AI'}
                </button>
              </div>
              {aiResearchResult && (
                <div className="ai-research-result">
                  {aiResearchResult}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
