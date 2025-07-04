import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Controls from './Controls';
import Legend from './Legend';
import TimelineCanvas from './TimelineCanvas';
import TaskDetailsModal from './TaskDetailsModal';

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
    const csvHeader = `"Title","Start Date","Duration (weeks)","Chapter","Priority","Notes","Calendar Alert"\n`;
    const csvRows = tasks.map(task => 
      `"${task.title}","${getWeekDate(task.startWeek)}","${task.duration}","Chapter ${task.chapter}","${task.priority}","${task.notes.replace(/"/g, '""')}","${task.calendarAlert ? 'Yes' : 'No'}"`
    ).join('\n');
    
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
              text: `Basado en las siguientes notas de una tesis, por favor, proporciona un breve resumen de investigación, sugiere 3 autores clave relacionados y 2 posibles líneas de exploración futura:\n\n---\n\n${notesText}`
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
    const mockResponse = `**Resumen de Investigación:**\nLas notas exploran la intersección entre bioacústica, arte y gobernanza interespecies, proponiendo un nuevo modelo de "biocracia".\n\n**Autores Clave:**\n1. **Donna Haraway:** Por sus trabajos sobre relaciones multiespecies.\n2. **Bruno Latour:** Por la Teoría del Actor-Red y el "Parlamento de las Cosas".\n3. **Eduardo Kohn:** Por su concepto de "cómo piensan los bosques".\n\n**Exploración Futura:**\n1. Desarrollar un prototipo de DAO para la gestión de un ecosistema específico.\n2. Investigar las implicaciones éticas de la tokenización de la participación no-humana.`;
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

      <Controls
        chapters={chapters}
        selectedChapter={selectedChapter}
        setSelectedChapter={setSelectedChapter}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        addNewTask={addNewTask}
        connectingFrom={connectingFrom}
        setConnectingFrom={setConnectingFrom}
        selectedConnection={selectedConnection}
        deleteConnection={deleteConnection}
        randomizePositions={randomizePositions}
        exportToCSV={exportToCSV}
      />

      <Legend chapters={chapters} />

      <TimelineCanvas
        tasks={tasks}
        connections={connections}
        connectingFrom={connectingFrom}
        hoveredTask={hoveredTask}
        draggedTask={draggedTask}
        selectedConnection={selectedConnection}
        mousePos={mousePos}
        canvasRef={canvasRef}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        handleCanvasClick={handleCanvasClick}
        handleConnectionClick={handleConnectionClick}
        handleMouseDown={handleMouseDown}
        getTaskSize={getTaskSize}
        blendColors={blendColors}
        filteredTasks={filteredTasks}
      />

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

export default ScatteredThesisTimeline;

