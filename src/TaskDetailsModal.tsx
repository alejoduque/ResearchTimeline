import React from 'react';
import { X, Save, RotateCcw, Trash2, BookOpen, Bell, Zap } from 'lucide-react';

const TaskDetailsModal = ({
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

  return (
    <div 
      className="floating-modal-overlay"
      onClick={() => setSelectedTask(null)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        padding: '2rem'
      }}
    >
      <div 
        className="floating-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          width: '100%',
          maxWidth: '90vw',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div className="floating-modal-header">
          <h3>Detalles de Tarea</h3>
          <button
            onClick={() => setSelectedTask(null)}
            className="floating-modal-close"
          >
            <X size={24} />
          </button>
        </div>
      
        {/* Content */}
        <div 
          className="floating-modal-body"
          style={{
            padding: '2rem',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
          {/* Task Title */}
          <div 
            style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1e293b',
              textAlign: 'center',
              marginBottom: '0.5rem'
            }}
          >
            {selectedTask.title}
          </div>
          
          {/* Task Info Grid with Calendar Alert */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
              background: 'rgba(248, 250, 252, 0.8)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              textAlign: 'center'
            }}
          >
            <div>
              <div style={{ fontWeight: '600', color: '#475569', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                Capítulo
              </div>
              <div style={{ fontSize: '1.125rem', fontWeight: '700', color: '#3b82f6' }}>
                {selectedTask.chapter}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: '600', color: '#475569', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                Semana
              </div>
              <div style={{ fontSize: '1.125rem', fontWeight: '700', color: '#10b981' }}>
                {selectedTask.startWeek}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                ({getWeekDate(selectedTask.startWeek)})
              </div>
            </div>
            <div>
              <div style={{ fontWeight: '600', color: '#475569', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                Prioridad
              </div>
              <div style={{ 
                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                color: '#1e40af',
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                display: 'inline-block',
                fontSize: '1rem',
                fontWeight: '600'
              }}>
                {selectedTask.priority}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: '600', color: '#475569', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                Alerta
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="calendarAlert"
                  checked={calendarAlert}
                  onChange={(e) => setCalendarAlert(e.target.checked)}
                  style={{ width: '1.25rem', height: '1.25rem', accentColor: '#3b82f6' }}
                />
                <label htmlFor="calendarAlert" style={{ fontSize: '0.875rem', color: '#374151', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Bell size={14} />
                  Calendario
                </label>
              </div>
            </div>
          </div>
          
          {/* Action Bar - Fixed between info and content */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              padding: '1rem',
              background: 'rgba(248, 250, 252, 0.6)',
              borderRadius: '12px',
              border: '1px solid rgba(226, 232, 240, 0.3)'
            }}
          >
            <button
              onClick={saveNotes}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <Save size={20} />
              <span>Guardar Notas</span>
            </button>
            
            <button
              onClick={() => changePriority(selectedTask.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <RotateCcw size={20} />
              <span>Cambiar Prioridad</span>
            </button>
            
            <button
              onClick={() => deleteTask(selectedTask.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <Trash2 size={20} />
              <span>Eliminar Tarea</span>
            </button>
            
            <button
              onClick={() => setSelectedTask(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <X size={20} />
              <span>Cerrar</span>
            </button>
          </div>
          
          {/* Markdown Section */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '300px' }}>
            {/* Markdown Header with Toolbar */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#374151' }}>
                Notas:
              </div>
              <div 
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                  padding: '0.75rem',
                  background: 'rgba(248, 250, 252, 0.8)',
                  borderRadius: '12px',
                  border: '1px solid rgba(226, 232, 240, 0.3)'
                }}
              >
                <button
                  onClick={() => setNotesText(notesText + '\n**Texto en negrita**')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(209, 213, 219, 0.5)',
                    color: '#374151',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '700'
                  }}
                >
                  B
                </button>
                <button
                  onClick={() => setNotesText(notesText + '\n*Texto en cursiva*')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(209, 213, 219, 0.5)',
                    color: '#374151',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontStyle: 'italic'
                  }}
                >
                  I
                </button>
                <button
                  onClick={() => setNotesText(notesText + '\n### Subtítulo')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(209, 213, 219, 0.5)',
                    color: '#374151',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  H3
                </button>
                <button
                  onClick={() => setNotesText(notesText + '\n- Elemento de lista')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(209, 213, 219, 0.5)',
                    color: '#374151',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  •
                </button>
                <button
                  onClick={() => setNotesText(notesText + '\n`código`')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(209, 213, 219, 0.5)',
                    color: '#374151',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  &lt;/&gt;
                </button>
                <button
                  onClick={() => {
                    const url = prompt('Ingresa la URL:');
                    const title = prompt('Ingresa el título del enlace:');
                    if (url && title) {
                      setNotesText(notesText + `\n[${title}](${url})`);
                    }
                  }}
                  style={{
                    background: 'rgba(219, 234, 254, 0.8)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    color: '#1d4ed8',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  🔗 URL
                </button>
              </div>
            </div>
            
            {/* Full-width Textarea */}
            <textarea
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              style={{
                width: '100%',
                minHeight: '250px',
                flex: 1,
                padding: '1.5rem',
                border: '2px solid rgba(209, 213, 219, 0.5)',
                borderRadius: '8px',
                fontSize: '1rem',
                resize: 'vertical',
                fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
                background: 'rgba(255, 255, 255, 0.9)',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              placeholder="Agrega notas detalladas sobre esta tarea...\n\n• Usa markdown para formatear tu texto\n• **Negrita** para puntos importantes  \n• `código` para snippets\n• - Lista con viñetas\n• ### Subtítulos para organizarte mejor\n• [Enlaces](https://ejemplo.com) para referencias\n\nEscribe tus ideas, investigación, recursos y cualquier información relevante para esta tarea."
              onFocus={(e) => e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(209, 213, 219, 0.5)'}
            />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
              <BookOpen size={16} />
              <span>Tip: El área de texto se expande para una mejor experiencia de escritura</span>
            </div>
          </div>
          
          {/* AI Research Section - At the bottom */}
          <div 
            style={{
              background: 'linear-gradient(135deg, rgba(219, 234, 254, 0.6) 0%, rgba(191, 219, 254, 0.6) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '16px',
              padding: '1.5rem'
            }}
          >
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={20} />
                Investigación con IA
              </div>
              <button
                onClick={handleAiResearch}
                disabled={isResearching || !notesText.trim()}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  opacity: isResearching || !notesText.trim() ? 0.5 : 1
                }}
              >
                {isResearching ? (
                  <>
                    <div style={{ 
                      width: '16px', 
                      height: '16px', 
                      border: '2px solid white', 
                      borderTop: '2px solid transparent', 
                      borderRadius: '50%', 
                      animation: 'spin 1s linear infinite' 
                    }}></div>
                    <span>Investigando...</span>
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    <span>Investigar con Claude</span>
                  </>
                )}
              </button>
            </div>
            
            {aiResearchResult && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '12px',
                padding: '1.5rem',
                whiteSpace: 'pre-wrap',
                color: '#374151'
              }}>
                {aiResearchResult}
              </div>
            )}
            
            {!notesText.trim() && (
              <p style={{ color: '#1e40af', fontSize: '0.875rem', fontStyle: 'italic', marginTop: '0.5rem' }}>
                Escribe algunas notas primero para habilitar la investigación con IA.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
