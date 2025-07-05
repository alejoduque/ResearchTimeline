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
        <div className="floating-modal-header">
          <h3>{selectedTask.title}</h3>
          <button onClick={() => setSelectedTask(null)} className="floating-modal-close">
            <X size={20} />
          </button>
        </div>

        <div className="floating-modal-body">
          <div className="modal-main-content">
            <div className="modal-columns">
              <div className="modal-left-column">
                <div className="task-info-compact">
                  <div className="task-info-grid">
                    <div className="task-info-item">
                      <div className="task-info-label">Capítulo</div>
                      <div className="task-info-value task-info-chapter">{selectedTask.chapter}</div>
                    </div>
                    <div className="task-info-item">
                      <div className="task-info-label">Semana</div>
                      <div className="task-info-value task-info-week">{selectedTask.startWeek}</div>
                    </div>
                    <div className="task-info-item">
                      <div className="task-info-label">Prioridad</div>
                      <div 
                        className="task-info-value task-info-priority"
                        onClick={() => changePriority(selectedTask.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    <strong>Fecha:</strong> {getWeekDate(selectedTask.startWeek)}
                  </div>
                </div>

                <div className="task-actions-compact">
                  <button 
                    onClick={saveNotes} 
                    className="compact-action-button action-button save"
                  >
                    <Save size={16} />
                    Guardar
                  </button>
                  <button 
                    onClick={() => changePriority(selectedTask.id)} 
                    className="compact-action-button action-button priority"
                  >
                    Cambiar Prioridad
                  </button>
                  <button 
                    onClick={() => deleteTask(selectedTask.id)} 
                    className="compact-action-button action-button delete"
                  >
                    <Trash2 size={16} />
                    Eliminar
                  </button>
                </div>

                <div className="calendar-alert-section">
                  <input
                    type="checkbox"
                    checked={calendarAlert}
                    onChange={(e) => setCalendarAlert(e.target.checked)}
                    className="calendar-checkbox"
                  />
                  <label className="calendar-label">
                    <BellOff size={16} />
                    Alerta de Calendario
                  </label>
                </div>
              </div>

              <div className="modal-right-column">
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
                      placeholder="Escribe tus notas aquí. Puedes usar Markdown:&#10;&#10;# Encabezado 1&#10;## Encabezado 2&#10;**Negrita**&#10;*Cursiva*&#10;- Lista de elementos&#10;[Enlace](http://ejemplo.com)"
                    />
                  </div>
                </div>
                
                <div className="ai-research-section">
                  <div className="ai-research-header">
                    <h3 className="ai-research-title">
                      <Zap size={18} /> Asistente AI
                    </h3>
                    <button 
                      onClick={handleAiResearch} 
                      className="ai-research-button" 
                      disabled={isResearching}
                    >
                      {isResearching ? (
                        <>
                          <div className="spinning-loader">⟳</div>
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
                  {aiResearchResult && (
                    <div className="ai-research-result">
                      <div style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                        {aiResearchResult}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-resize-handle"></div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
