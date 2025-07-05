import React, { useState, useRef, useEffect } from 'react';
import { X, Save, Trash2, BellOff, Bold, Italic, Link, Zap, Move } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  chapter: number;
  startWeek: number;
  priority: 'high' | 'medium' | 'low';
}

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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Center modal on initial load
  useEffect(() => {
    if (modalRef.current && !isInitialized) {
      // Use setTimeout to ensure the modal is fully rendered
      setTimeout(() => {
        const rect = modalRef.current?.getBoundingClientRect();
        if (rect) {
          setPosition({
            x: Math.max(0, (window.innerWidth - rect.width) / 2),
            y: Math.max(0, (window.innerHeight - rect.height) / 2)
          });
          setIsInitialized(true);
        }
      }, 10);
    }
  }, [selectedTask, isInitialized]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && modalRef.current) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        // Keep modal within viewport bounds
        const rect = modalRef.current.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;
        
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
      e.preventDefault();
    }
  };

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

  if (!selectedTask) return null;

  return (
    <div 
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(2px)'
      }}
    >
      <div
        ref={modalRef}
        className="absolute pointer-events-auto"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '85vw',
          maxWidth: '1200px',
          minWidth: '700px',
          height: '80vh',
          maxHeight: '600px',
          minHeight: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          borderRadius: '2px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          cursor: isDragging ? 'grabbing' : 'default',
          opacity: isInitialized ? 1 : 0,
          transition: 'opacity 0.2s ease'
        }}
      >
        {/* Header with drag handle */}
        <div 
          className="flex items-center justify-between p-4 border-b border-black border-opacity-10 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          style={{ userSelect: 'none' }}
        >
          <div className="flex items-center gap-3">
            <Move size={18} className="text-black opacity-40" />
            <h3 className="text-xl font-light text-black">{selectedTask.title}</h3>
          </div>
          <button 
            onClick={() => setSelectedTask(null)} 
            className="p-2 hover:bg-black hover:bg-opacity-5 rounded-none transition-colors"
          >
            <X size={20} className="text-black opacity-60" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ height: 'calc(80vh - 80px)', maxHeight: 'calc(700px - 80px)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left column - Task info (1/4 width) */}
            <div className="lg:col-span-1 space-y-6">
              {/* Task info in one line */}
              <div className="border border-black border-opacity-10 p-4">
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="min-w-0">
                    <div className="text-xs text-black opacity-60 mb-1 whitespace-nowrap">Capítulo</div>
                    <div className="text-sm font-normal text-black">{selectedTask.chapter}</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-black opacity-60 mb-1 whitespace-nowrap">Semana</div>
                    <div className="text-sm font-normal text-black">{selectedTask.startWeek}</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-black opacity-60 mb-1 whitespace-nowrap">Prioridad</div>
                    <div 
                      className={`text-sm font-normal cursor-pointer px-2 py-1 text-xs border border-black border-opacity-20 whitespace-nowrap ${
                        selectedTask.priority === 'high' 
                          ? 'bg-black bg-opacity-25 text-black' 
                          : selectedTask.priority === 'medium' 
                          ? 'bg-black bg-opacity-15 text-black' 
                          : 'bg-black bg-opacity-8 text-black'
                      }`}
                      onClick={() => changePriority(selectedTask.id)}
                    >
                      {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-black opacity-60 mb-1 whitespace-nowrap">Fecha</div>
                    <div className="text-sm font-normal text-black whitespace-nowrap">{getWeekDate(selectedTask.startWeek)}</div>
                  </div>
                </div>
              </div>

              {/* Action buttons in one line */}
              <div className="grid grid-cols-1 gap-2">
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={saveNotes} 
                    className="bg-black text-white px-3 py-2 hover:bg-black hover:bg-opacity-80 flex items-center justify-center gap-1 transition-colors font-light text-sm"
                  >
                    <Save size={14} />
                    Guardar
                  </button>
                  <button 
                    onClick={() => changePriority(selectedTask.id)} 
                    className="border border-black border-opacity-20 bg-white bg-opacity-60 text-black px-3 py-2 hover:bg-black hover:bg-opacity-8 transition-colors font-light text-sm"
                  >
                    Cambiar P.
                  </button>
                  <button 
                    onClick={() => deleteTask(selectedTask.id)} 
                    className="border border-black border-opacity-20 bg-white bg-opacity-60 text-black px-3 py-2 hover:bg-black hover:bg-opacity-8 flex items-center justify-center gap-1 transition-colors font-light text-sm"
                  >
                    <Trash2 size={14} />
                    Eliminar
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border border-black border-opacity-10">
                <input
                  type="checkbox"
                  checked={calendarAlert}
                  onChange={(e) => setCalendarAlert(e.target.checked)}
                  className="w-4 h-4 accent-black"
                />
                <label className="flex items-center gap-2 text-sm text-black opacity-70 font-light">
                  <BellOff size={16} />
                  Alerta de Calendario
                </label>
              </div>
            </div>

            {/* Right column - Notes area (3/4 width) */}
            <div className="lg:col-span-3 space-y-6">
              <div className="border border-black border-opacity-10 overflow-hidden">
                <div className="p-3 border-b border-black border-opacity-10">
                  <div className="flex items-center justify-between">
                    <h3 className="font-light text-black">Notas y Observaciones</h3>
                    <div className="flex gap-2">
                      <button 
                        className="px-2 py-1 border border-black border-opacity-20 text-xs hover:bg-black hover:bg-opacity-8 flex items-center gap-1 font-light text-black" 
                        onClick={() => handleMarkdownAction('bold')}
                      >
                        <Bold size={12} /> Bold
                      </button>
                      <button 
                        className="px-2 py-1 border border-black border-opacity-20 text-xs hover:bg-black hover:bg-opacity-8 flex items-center gap-1 font-light text-black" 
                        onClick={() => handleMarkdownAction('italic')}
                      >
                        <Italic size={12} /> Italic
                      </button>
                      <button 
                        className="px-2 py-1 border border-black border-opacity-20 text-xs hover:bg-black hover:bg-opacity-8 flex items-center gap-1 font-light text-black" 
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
                  className="w-full p-3 border-none outline-none resize-vertical bg-transparent text-black font-light placeholder-black placeholder-opacity-50"
                  style={{ minHeight: '300px', maxHeight: '400px' }}
                  placeholder="Escribe tus notas aquí. Puedes usar Markdown:&#10;&#10;# Encabezado 1&#10;## Encabezado 2&#10;**Negrita**&#10;*Cursiva*&#10;- Lista de elementos&#10;[Enlace](http://ejemplo.com)"
                />
              </div>
              
              <div className="border border-black border-opacity-10 overflow-hidden">
                <div className="p-3 border-b border-black border-opacity-10">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 font-light text-black">
                      <Zap size={18} /> Asistente AI
                    </h3>
                    <button 
                      onClick={handleAiResearch} 
                      className="px-3 py-1 bg-black text-white text-sm flex items-center gap-2 disabled:opacity-50 font-light hover:bg-opacity-80 transition-colors" 
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
                  <div className="p-3 bg-black bg-opacity-8 text-sm leading-relaxed font-light text-black">
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

// Demo component with sample data
const App = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>({
    id: 1,
    title: "Encuentro Entre Especies",
    chapter: 2,
    startWeek: 1,
    priority: 'high'
  });
  const [notesText, setNotesText] = useState("# Notas del encuentro\n\n**Observaciones importantes:**\n- Primer contacto establecido\n- Protocolo de comunicación iniciado\n\n*Requiere seguimiento próxima semana*");
  const [calendarAlert, setCalendarAlert] = useState(false);
  const [isResearching, setIsResearching] = useState(false);
  const [aiResearchResult, setAiResearchResult] = useState<string | null>("Información relevante sobre el encuentro entre especies encontrada en base de datos...");

  const saveNotes = () => {
    console.log("Notas guardadas:", notesText);
  };

  const changePriority = (taskId: number) => {
    if (selectedTask) {
      const priorities: ('high' | 'medium' | 'low')[] = ['low', 'medium', 'high'];
      const currentIndex = priorities.indexOf(selectedTask.priority);
      const newPriority = priorities[(currentIndex + 1) % 3];
      setSelectedTask({...selectedTask, priority: newPriority});
    }
  };

  const deleteTask = (taskId: number) => {
    console.log("Tarea eliminada:", taskId);
    setSelectedTask(null);
  };

  const getWeekDate = (week: number) => {
    const date = new Date();
    date.setDate(date.getDate() + (week * 7));
    return date.toLocaleDateString('es-ES');
  };

  const handleAiResearch = async () => {
    setIsResearching(true);
    setTimeout(() => {
      setAiResearchResult("Investigación completada: Se han encontrado 5 referencias relacionadas con el encuentro entre especies. Recomendaciones adicionales disponibles.");
      setIsResearching(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <TaskDetailsModal
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        notesText={notesText}
        setNotesText={setNotesText}
        calendarAlert={calendarAlert}
        setCalendarAlert={setCalendarAlert}
        saveNotes={saveNotes}
        changePriority={changePriority}
        deleteTask={deleteTask}
        getWeekDate={getWeekDate}
        handleAiResearch={handleAiResearch}
        isResearching={isResearching}
        aiResearchResult={aiResearchResult}
      />
    </div>
  );
};

export default App;
