import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Calendar, Clock, Edit3, Move, Plus, Trash2, Download, RotateCcw, BookOpen, X, Save, Zap, Bell } from 'lucide-react';

const ScatteredThesisTimeline = () => {
  const [tasks, setTasks] = useState([
    // Chapter 1
    { id: 1, title: "Bioacústica - Más allá del antropocentrismo sonoro", chapter: 1, startWeek: 1, duration: 1, color: "#3B82F6", priority: "high", x: 150, y: 120, notes: "", calendarAlert: false },
    { id: 2, title: "Encuentro Entre Especies y Espectros [e4]", chapter: 1, startWeek: 2, duration: 1, color: "#3B82F6", priority: "high", x: 320, y: 80, notes: "", calendarAlert: false },
    { id: 3, title: "Artes de la Transmisión (Full spectrum radio)", chapter: 1, startWeek: 3, duration: 1, color: "#3B82F6", priority: "medium", x: 480, y: 140, notes: "", calendarAlert: false },
    { id: 4, title: "Inteligencia de máquinas y arte (Google AMI)", chapter: 1, startWeek: 4, duration: 1, color: "#3B82F6", priority: "high", x: 680, y: 100, notes: "", calendarAlert: false },
    { id: 5, title: "Monitoreo y Sonificación (Wildlabs)", chapter: 1, startWeek: 5, duration: 1, color: "#3B82F6", priority: "medium", x: 820, y: 160, notes: "", calendarAlert: false },
    
    // Chapter 2
    { id: 6, title: "Sub/culturas - Reinventar/reconstruir", chapter: 2, startWeek: 6, duration: 1, color: "#10B981", priority: "high", x: 180, y: 280, notes: "", calendarAlert: false },
    { id: 7, title: "Tec-sincretismo (EGS)", chapter: 2, startWeek: 7, duration: 1, color: "#10B981", priority: "medium", x: 350, y: 320, notes: "", calendarAlert: false },
    { id: 8, title: "Espectros sonoros", chapter: 2, startWeek: 8, duration: 1, color: "#10B981", priority: "medium", x: 520, y: 260, notes: "", calendarAlert: false },
    { id: 9, title: "De IAP a DAO", chapter: 2, startWeek: 9, duration: 1, color: "#10B981", priority: "high", x: 720, y: 300, notes: "", calendarAlert: false },
    { id: 10, title: "Parlamento de lo vivo - Édouard Glissant", chapter: 2, startWeek: 10, duration: 1, color: "#10B981", priority: "high", x: 890, y: 240, notes: "", calendarAlert: false },
    { id: 11, title: "Agenciamientos multiespecie", chapter: 2, startWeek: 11, duration: 1, color: "#10B981", priority: "medium", x: 1000, y: 320, notes: "", calendarAlert: false },
    
    // Chapter 3
    { id: 12, title: "Biocracia - Nueva Gobernanza Inter-especies", chapter: 3, startWeek: 12, duration: 1, color: "#F59E0B", priority: "high", x: 120, y: 450, notes: "", calendarAlert: false },
    { id: 13, title: "Sistemas de información geográfica (SIG)", chapter: 3, startWeek: 13, duration: 1, color: "#F59E0B", priority: "high", x: 300, y: 480, notes: "", calendarAlert: false },
    { id: 14, title: "El jaguar y el ocelote", chapter: 3, startWeek: 14, duration: 1, color: "#F59E0B", priority: "medium", x: 480, y: 420, notes: "", calendarAlert: false },
    { id: 15, title: "Redes de comunicación interespecífica", chapter: 3, startWeek: 15, duration: 1, color: "#F59E0B", priority: "medium", x: 650, y: 460, notes: "", calendarAlert: false },
    { id: 16, title: "Archivos híbridos", chapter: 3, startWeek: 16, duration: 1, color: "#F59E0B", priority: "high", x: 820, y: 400, notes: "", calendarAlert: false },
    { id: 17, title: "Arte y Sensibilización Ecológica", chapter: 3, startWeek: 17, duration: 1, color: "#F59E0B", priority: "medium", x: 980, y: 480, notes: "", calendarAlert: false },
    { id: 18, title: "Tokenización de participación ecosistémica", chapter: 3, startWeek: 18, duration: 1, color: "#F59E0B", priority: "high", x: 150, y: 580, notes: "", calendarAlert: false },
    { id: 19, title: "LiquidIce - Desarrollo y programación", chapter: 3, startWeek: 19, duration: 1, color: "#F59E0B", priority: "high", x: 380, y: 600, notes: "", calendarAlert: false },
    { id: 20, title: "Sistema PAM como base para DAO", chapter: 3, startWeek: 20, duration: 1, color: "#F59E0B", priority: "high", x: 580, y: 540, notes: "", calendarAlert: false },
    { id: 21, title: "Espacialización sonora", chapter: 3, startWeek: 21, duration: 1, color: "#F59E0B", priority: "medium", x: 750, y: 580, notes: "", calendarAlert: false },
    { id: 22, title: "Monitoreo, IA y análisis de redes", chapter: 3, startWeek: 22, duration: 1, color: "#F59E0B", priority: "high", x: 920, y: 620, notes: "", calendarAlert: false },
    
    // Review phases
    { id: 23, title: "Revisión integral Capítulo 1", chapter: 4, startWeek: 23, duration: 1, color: "#EF4444", priority: "high", x: 200, y: 720, notes: "", calendarAlert: false },
    { id: 24, title: "Revisión integral Capítulo 2", chapter: 4, startWeek: 24, duration: 1, color: "#EF4444", priority: "high", x: 450, y: 750, notes: "", calendarAlert: false },
    { id: 25, title: "Revisión integral Capítulo 3", chapter: 4, startWeek: 25, duration: 1, color: "#EF4444", priority: "high", x: 700, y: 720, notes: "", calendarAlert: false },
    { id: 26, title: "Integración y conclusiones generales", chapter: 4, startWeek: 26, duration: 1, color: "#EF4444", priority: "high", x: 500, y: 820, notes: "", calendarAlert: false },
    { id: 27, title: "Revisión final y preparación de presentación", chapter: 4, startWeek: 27, duration: 1, color: "#EF4444", priority: "high", x: 750, y: 800, notes: "", calendarAlert: false }
  ]);

  const [connections, setConnections] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);
  const [hoveredTask, setHoveredTask] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [notesText, setNotesText] = useState('');
  const [calendarAlert, setCalendarAlert] = useState(false);
  const [connectingFrom, setConnectingFrom] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clickStartPos, setClickStartPos] = useState(null);
  const [isResearching, setIsResearching] = useState(false);
  const [aiResearchResult, setAiResearchResult] = useState(null);
  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (selectedTask) {
      setNotesText(selectedTask.notes || '');
      setCalendarAlert(selectedTask.calendarAlert || false);
      setAiResearchResult(null);
      setIsResearching(false);
    }
  }, [selectedTask]);

  const chapters = {
    1: { name: "Encuentro Entre Especies y Espectros", color: "#3B82F6" },
    2: { name: "Poéticas de la relación", color: "#10B981" },
    3: { name: "Mediaciones e interfaces", color: "#F59E0B" },
    4: { name: "Revisión y Consolidación", color: "#EF4444" }
  };

  const getTaskSize = useCallback((priority, isHovered = false, isDragged = false) => {
    let baseSize;
    switch (priority) {
      case 'high': baseSize = 80; break;
      case 'medium': baseSize = 65; break;
      case 'low': baseSize = 50; break;
      default: baseSize = 65;
    }
    if (isHovered && isDragged) return baseSize * 1.5;
    return baseSize;
  }, []);

  const getDistance = useCallback((x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }, []);

  const blendColors = useCallback((color1, color2) => {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);
    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);
    const r = Math.round((r1 + r2) / 2);
    const g = Math.round((g1 + g2) / 2);
    const b = Math.round((b1 + b2) / 2);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }, []);

  const getTaskUnderMouse = useCallback((mouseX, mouseY) => {
    return tasks.find(task => {
      const size = getTaskSize(task.priority);
      const distance = getDistance(mouseX, mouseY, task.x, task.y);
      return distance <= size / 2;
    });
  }, [tasks, getTaskSize, getDistance]);

  const getWeekDate = useCallback((weekNumber) => {
    const startDate = new Date('2025-06-23');
    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);
    return targetDate.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
  }, []);

  const handleMouseDown = useCallback((e, task) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    setClickStartPos({ x: mouseX, y: mouseY });
    
    if (e.shiftKey) {
      if (connectingFrom) {
        if (connectingFrom.id !== task.id) {
          const existingConnection = connections.find(conn => 
            (conn.from === connectingFrom.id && conn.to === task.id) ||
            (conn.from === task.id && conn.to === connectingFrom.id)
          );
          
          if (!existingConnection) {
            const newConnection = {
              id: Date.now(),
              from: connectingFrom.id,
              to: task.id
            };
            setConnections(prev => [...prev, newConnection]);
          }
        }
        setConnectingFrom(null);
      } else {
        setConnectingFrom(task);
      }
      return;
    }
    
    dragOffset.current = {
      x: mouseX - task.x,
      y: mouseY - task.y
    };
    
    setDraggedTask(task);
    isDragging.current = true;
  }, [connections, connectingFrom]);

  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    setMousePos({ x: mouseX, y: mouseY });
    
    if (!isDragging.current || !draggedTask) {
      const taskUnder = getTaskUnderMouse(mouseX, mouseY);
      setHoveredTask(taskUnder);
      return;
    }
    
    const newX = mouseX - dragOffset.current.x;
    const newY = mouseY - dragOffset.current.y;
    
    const taskUnder = getTaskUnderMouse(mouseX, mouseY);
    setHoveredTask(taskUnder && taskUnder.id !== draggedTask.id ? taskUnder : null);
    
    setTasks(tasks.map(task => 
      task.id === draggedTask.id 
        ? { ...task, x: Math.max(50, Math.min(newX, 1100)), y: Math.max(50, Math.min(newY, 850)) }
        : task
    ));
  }, [draggedTask, getTaskUnderMouse, tasks]);

  const handleMouseUp = useCallback((e) => {
    if (clickStartPos && draggedTask) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const dragDistance = getDistance(clickStartPos.x, clickStartPos.y, mouseX, mouseY);
      
      if (dragDistance < 5) {
        setSelectedTask(draggedTask);
      }
      
      if (hoveredTask && draggedTask && hoveredTask.id !== draggedTask.id) {
        const blendedColor = blendColors(draggedTask.color, hoveredTask.color);
        setTasks(prev => prev.map(task => 
          task.id === hoveredTask.id 
            ? { ...task, color: blendedColor }
            : task
        ));
      }
    }
    
    isDragging.current = false;
    setDraggedTask(null);
    setHoveredTask(null);
    setClickStartPos(null);
  }, [clickStartPos, draggedTask, getDistance, hoveredTask, blendColors]);

  const handleConnectionClick = useCallback((connection, e) => {
    e.stopPropagation();
    setSelectedConnection(connection);
  }, []);

  const deleteConnection = useCallback(() => {
    if (selectedConnection) {
      setConnections(connections.filter(conn => conn.id !== selectedConnection.id));
      setSelectedConnection(null);
    }
  }, [connections, selectedConnection]);

  const handleCanvasClick = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const taskUnder = getTaskUnderMouse(mouseX, mouseY);
    
    if (!taskUnder) {
      setConnectingFrom(null);
      setSelectedConnection(null);
      setSelectedTask(null);
    }
  }, [getTaskUnderMouse]);

  const saveNotes = useCallback(() => {
    setTasks(tasks => tasks.map(task => 
      task.id === selectedTask.id 
        ? { ...task, notes: notesText, calendarAlert: calendarAlert }
        : task
    ));
    setSelectedTask(null);
    setNotesText('');
  }, [selectedTask, notesText, calendarAlert]);

  const addNewTask = useCallback(() => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Math.max(...tasks.map(t => t.id)) + 1,
        title: newTaskTitle,
        chapter: 1,
        startWeek: Math.max(...tasks.map(t => t.startWeek)) + 1,
        duration: 1,
        color: "#8B5CF6",
        priority: "medium",
        x: 300 + Math.random() * 400,
        y: 300 + Math.random() * 200,
        notes: "",
        calendarAlert: false
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
      setNewTaskTitle('');
    }
  }, [newTaskTitle, tasks]);

  const deleteTask = useCallback((taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    setConnections(prev => prev.filter(conn => conn.from !== taskId && conn.to !== taskId));
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null);
    }
  }, [selectedTask]);

  const changePriority = useCallback((taskId) => {
    const priorities = ['low', 'medium', 'high'];
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const currentIndex = priorities.indexOf(task.priority);
        const nextIndex = (currentIndex + 1) % priorities.length;
        return { ...task, priority: priorities[nextIndex] };
      }
      return task;
    }));
  }, []);

  const randomizePositions = useCallback(() => {
    setTasks(prev => prev.map(task => ({
      ...task,
      x: 100 + Math.random() * 900,
      y: 100 + Math.random() * 700
    })));
  }, []);

  const exportToCSV = useCallback(() => {
    const csvHeader = `"Title","Start Date","Duration (weeks)","Chapter","Priority","Notes","Calendar Alert"
`;
    const csvRows = tasks.map(task => 
      `"${task.title}","${getWeekDate(task.startWeek)}","${task.duration}","Chapter ${task.chapter}","${task.priority}","${task.notes.replace(/"/g, '""')}","${task.calendarAlert ? 'Yes' : 'No'}"`
    ).join('
');
    
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thesis_timeline_scattered.csv';
    a.click();
  }, [tasks, getWeekDate]);

  const handleAiResearch = useCallback(async () => {
    if (!notesText.trim()) {
      setAiResearchResult("Por favor, escribe algunas notas antes de investigar.");
      return;
    }

    setIsResearching(true);
    setAiResearchResult(null);

    // Simulación de llamada a la API de Gemini
    console.log("Iniciando investigación con AI para:", notesText);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simular delay de red

    // --- INICIO: Lógica de la API de Gemini (para reemplazar) ---
    // Aquí es donde harías la llamada real a tu backend o directamente a la API de Gemini
    /*
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=TU_API_KEY_AQUI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Basado en las siguientes notas de una tesis, por favor, proporciona un breve resumen de investigación, sugiere 3 autores clave relacionados y 2 posibles líneas de exploración futura:

---

${notesText}`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Error de API: ${response.statusText}`);
      }

      const data = await response.json();
      const resultText = data.candidates[0].content.parts[0].text;
      setAiResearchResult(resultText);

    } catch (error) {
      console.error("Error al contactar la API de Gemini:", error);
      setAiResearchResult("Hubo un error al realizar la investigación. Por favor, revisa la consola.");
    }
    */
    // --- FIN: Lógica de la API de Gemini ---

    // --- INICIO: Respuesta simulada (para eliminar al implementar la API) ---
    const mockResponse = `**Resumen de Investigación:**
Las notas exploran la intersección entre bioacústica, arte y gobernanza interespecies, proponiendo un nuevo modelo de "biocracia".

**Autores Clave:**
1. **Donna Haraway:** Por sus trabajos sobre relaciones multiespecies.
2. **Bruno Latour:** Por la Teoría del Actor-Red y el "Parlamento de las Cosas".
3. **Eduardo Kohn:** Por su concepto de "cómo piensan los bosques".

**Exploración Futura:**
1. Desarrollar un prototipo de DAO para la gestión de un ecosistema específico.
2. Investigar las implicaciones éticas de la tokenización de la participación no-humana.`;
    setAiResearchResult(mockResponse);
    // --- FIN: Respuesta simulada ---

    setIsResearching(false);
  }, [notesText]);

  const filteredTasks = useMemo(() => 
    selectedChapter === 'all' 
      ? tasks 
      : tasks.filter(task => task.chapter === parseInt(selectedChapter))
  , [tasks, selectedChapter]);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50 font-sans">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-1">
          Visualización Dispersa - Tesis Doctoral
        </h1>
        <p className="text-gray-500">
          Explora tu investigación de forma no-lineal. Arrastra para mover, Shift+Click para conectar.
        </p>
      </div>

      {/* Controls */}
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
      
      {/* Legend */}
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

      {/* Main Canvas */}
      <div className="relative border border-gray-200 rounded-lg bg-white shadow-md overflow-hidden">
        <svg 
          ref={canvasRef}
          width="1200" 
          height="900"
          className="cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleCanvasClick}
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#E5E7EB" />
            </pattern>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
             refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF" />
            </marker>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5" />

          {/* Connections */}
          {connections.map(connection => {
            const fromTask = tasks.find(t => t.id === connection.from);
            const toTask = tasks.find(t => t.id === connection.to);
            if (!fromTask || !toTask) return null;
            
            const dx = toTask.x - fromTask.x;
            const dy = toTask.y - fromTask.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const fromRadius = getTaskSize(fromTask.priority) / 2;
            const toRadius = getTaskSize(toTask.priority) / 2;
            const fromX = fromTask.x + (dx / distance) * fromRadius;
            const fromY = fromTask.y + (dy / distance) * fromRadius;
            const toX = toTask.x - (dx / distance) * toRadius;
            const toY = toTask.y - (dy / distance) * toRadius;
            const isSelected = selectedConnection?.id === connection.id;
            
            return (
              <g key={connection.id} onClick={(e) => handleConnectionClick(connection, e)} className="cursor-pointer">
                <line x1={fromX} y1={fromY} x2={toX} y2={toY} stroke="#9CA3AF" strokeWidth="8" strokeOpacity="0" />
                <line
                  x1={fromX}
                  y1={fromY}
                  x2={toX}
                  y2={toY}
                  stroke={isSelected ? "#F59E0B" : "#6B7280"}
                  strokeWidth={isSelected ? "3" : "1.5"}
                  strokeOpacity="0.9"
                  markerEnd="url(#arrowhead)"
                  className="transition-all"
                />
              </g>
            );
          })}

          {/* Connecting line */}
          {connectingFrom && (
            <line
              x1={connectingFrom.x} y1={connectingFrom.y}
              x2={mousePos.x} y2={mousePos.y}
              stroke="#8B5CF6" strokeWidth="2" strokeDasharray="6,6"
            />
          )}

          {/* Tasks */}
          {filteredTasks.map(task => {
            const isHovered = hoveredTask?.id === task.id;
            const isDragged = draggedTask?.id === task.id;
            const isConnecting = connectingFrom?.id === task.id;
            const size = getTaskSize(task.priority, isHovered, isDragged);
            const displayColor = isHovered && draggedTask && draggedTask.id !== task.id 
              ? blendColors(task.color, draggedTask.color)
              : task.color;
            
            return (
              <g key={task.id} onMouseDown={(e) => handleMouseDown(e, task)} className="cursor-grab">
                <circle
                  cx={task.x} cy={task.y} r={size / 2 + 3} fill={displayColor}
                  className={`transition-all duration-200 ${isDragged ? 'opacity-30' : 'opacity-20'}`}
                />
                <circle
                  cx={task.x} cy={task.y} r={size / 2} fill={displayColor}
                  stroke={isConnecting ? "#8B5CF6" : "white"}
                  strokeWidth={isConnecting ? "4" : "3"}
                  className={`transition-all duration-200 ${isDragged ? 'opacity-80 scale-105' : 'hover:scale-105'} drop-shadow-md`}
                />
                <text x={task.x} y={task.y} textAnchor="middle" dy="0.3em" className="text-sm font-bold fill-white pointer-events-none select-none">
                  {task.startWeek}
                </text>
                <text x={task.x} y={task.y + size/2 + 15} textAnchor="middle" className="text-xs fill-gray-700 pointer-events-none font-medium select-none" style={{ fontSize: '9px' }}>
                  {task.title.length > 25 ? task.title.substring(0, 25) + '...' : task.title}
                </text>
                {task.notes && (
                  <circle cx={task.x - size/3.5} cy={task.y - size/3.5} r="4" fill="#8B5CF6" stroke="white" strokeWidth="1.5" />
                )}
                <title>{task.title}</title>
              </g>
            );
          })}
        </svg>

        {/* Floating Task Details Modal */}
        {selectedTask && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTask(null)}
            style={{ backdropFilter: 'blur(4px)' }}
          >
            <div 
              className="w-full max-w-4xl max-h-[80vh] bg-white rounded-xl shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-200">
                <h3 className="font-bold text-xl text-gray-800">Detalles de Tarea</h3>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={22} />
                </button>
              </div>
            
              <div className="p-6 grid grid-cols-3 gap-6 overflow-y-auto flex-grow">
                {/* Notes Section (Main Focus) */}
                <div className="col-span-3 md:col-span-2 flex flex-col">
                  <label className="block text-base font-semibold text-gray-800 mb-2">
                    Notas (Markdown Habilitado)
                  </label>
                  <textarea
                    value={notesText}
                    onChange={(e) => setNotesText(e.target.value)}
                    className="w-full flex-grow p-4 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    placeholder="Agrega notas detalladas sobre esta tarea..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    **Negrita**, *itálica*, `código`, y - listas son soportados.
                  </p>
                </div>
                
                {/* Details and Actions Section */}
                <div className="col-span-3 md:col-span-1 flex flex-col gap-6">
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 mb-2">Detalles</h4>
                    <div className="space-y-3 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Capítulo:</span>
                        <span className="font-semibold text-blue-600">{selectedTask.chapter}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Semana:</span>
                        <span className="font-semibold text-green-600">{selectedTask.startWeek} ({getWeekDate(selectedTask.startWeek)})</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Prioridad:</span>
                        <span className="font-semibold capitalize px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">{selectedTask.priority}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-200">
                        <label htmlFor="calendar-alert" className="font-medium flex items-center gap-2">
                          <Bell size={16} />
                          Alerta Calendario
                        </label>
                        <input 
                          type="checkbox" 
                          id="calendar-alert"
                          checked={calendarAlert}
                          onChange={(e) => setCalendarAlert(e.target.checked)}
                          className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 mb-2">Acciones</h4>
                    <div className="flex flex-col gap-3">
                      <button onClick={saveNotes} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow">
                        <Save size={16} />
                        <span>Guardar Notas</span>
                      </button>
                      <button onClick={() => changePriority(selectedTask.id)} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors">
                        <RotateCcw size={16} />
                        <span>Cambiar Prioridad</span>
                      </button>
                      <button onClick={() => deleteTask(selectedTask.id)} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                        <Trash2 size={16} />
                        <span>Eliminar Tarea</span>
                      </button>
                      <button onClick={handleAiResearch} disabled={isResearching} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors shadow disabled:bg-purple-300 disabled:cursor-not-allowed">
                        <Zap size={16} />
                        <span>{isResearching ? 'Investigando...' : 'Investigar con IA'}</span>
                      </button>
                    </div>
                  </div>

                  {/* AI Research Results Section */}
                  {(isResearching || aiResearchResult) && (
                    <div>
                      <h4 className="text-base font-semibold text-gray-800 mb-2">Asistente de IA</h4>
                      <div className="space-y-3 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[150px] whitespace-pre-wrap">
                        {isResearching && (
                          <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                          </div>
                        )}
                        {aiResearchResult && (
                          <div className="prose prose-sm max-w-none">{aiResearchResult}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ScatteredThesisTimeline;