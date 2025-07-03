import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, Edit3, Move, Plus, Trash2, Download, RotateCcw, BookOpen, X, Save } from 'lucide-react';

const ScatteredThesisTimeline = () => {
  const [tasks, setTasks] = useState([
    // Chapter 1
    { id: 1, title: "Bioacústica - Más allá del antropocentrismo sonoro", chapter: 1, startWeek: 1, duration: 1, color: "#3B82F6", priority: "high", x: 150, y: 120, notes: "" },
    { id: 2, title: "Encuentro Entre Especies y Espectros [e4]", chapter: 1, startWeek: 2, duration: 1, color: "#3B82F6", priority: "high", x: 320, y: 80, notes: "" },
    { id: 3, title: "Artes de la Transmisión (Full spectrum radio)", chapter: 1, startWeek: 3, duration: 1, color: "#3B82F6", priority: "medium", x: 480, y: 140, notes: "" },
    { id: 4, title: "Inteligencia de máquinas y arte (Google AMI)", chapter: 1, startWeek: 4, duration: 1, color: "#3B82F6", priority: "high", x: 680, y: 100, notes: "" },
    { id: 5, title: "Monitoreo y Sonificación (Wildlabs)", chapter: 1, startWeek: 5, duration: 1, color: "#3B82F6", priority: "medium", x: 820, y: 160, notes: "" },
    
    // Chapter 2
    { id: 6, title: "Sub/culturas - Reinventar/reconstruir", chapter: 2, startWeek: 6, duration: 1, color: "#10B981", priority: "high", x: 180, y: 280, notes: "" },
    { id: 7, title: "Tec-sincretismo (EGS)", chapter: 2, startWeek: 7, duration: 1, color: "#10B981", priority: "medium", x: 350, y: 320, notes: "" },
    { id: 8, title: "Espectros sonoros", chapter: 2, startWeek: 8, duration: 1, color: "#10B981", priority: "medium", x: 520, y: 260, notes: "" },
    { id: 9, title: "De IAP a DAO", chapter: 2, startWeek: 9, duration: 1, color: "#10B981", priority: "high", x: 720, y: 300, notes: "" },
    { id: 10, title: "Parlamento de lo vivo - Édouard Glissant", chapter: 2, startWeek: 10, duration: 1, color: "#10B981", priority: "high", x: 890, y: 240, notes: "" },
    { id: 11, title: "Agenciamientos multiespecie", chapter: 2, startWeek: 11, duration: 1, color: "#10B981", priority: "medium", x: 1000, y: 320, notes: "" },
    
    // Chapter 3
    { id: 12, title: "Biocracia - Nueva Gobernanza Inter-especies", chapter: 3, startWeek: 12, duration: 1, color: "#F59E0B", priority: "high", x: 120, y: 450, notes: "" },
    { id: 13, title: "Sistemas de información geográfica (SIG)", chapter: 3, startWeek: 13, duration: 1, color: "#F59E0B", priority: "high", x: 300, y: 480, notes: "" },
    { id: 14, title: "El jaguar y el ocelote", chapter: 3, startWeek: 14, duration: 1, color: "#F59E0B", priority: "medium", x: 480, y: 420, notes: "" },
    { id: 15, title: "Redes de comunicación interespecífica", chapter: 3, startWeek: 15, duration: 1, color: "#F59E0B", priority: "medium", x: 650, y: 460, notes: "" },
    { id: 16, title: "Archivos híbridos", chapter: 3, startWeek: 16, duration: 1, color: "#F59E0B", priority: "high", x: 820, y: 400, notes: "" },
    { id: 17, title: "Arte y Sensibilización Ecológica", chapter: 3, startWeek: 17, duration: 1, color: "#F59E0B", priority: "medium", x: 980, y: 480, notes: "" },
    { id: 18, title: "Tokenización de participación ecosistémica", chapter: 3, startWeek: 18, duration: 1, color: "#F59E0B", priority: "high", x: 150, y: 580, notes: "" },
    { id: 19, title: "LiquidIce - Desarrollo y programación", chapter: 3, startWeek: 19, duration: 1, color: "#F59E0B", priority: "high", x: 380, y: 600, notes: "" },
    { id: 20, title: "Sistema PAM como base para DAO", chapter: 3, startWeek: 20, duration: 1, color: "#F59E0B", priority: "high", x: 580, y: 540, notes: "" },
    { id: 21, title: "Espacialización sonora", chapter: 3, startWeek: 21, duration: 1, color: "#F59E0B", priority: "medium", x: 750, y: 580, notes: "" },
    { id: 22, title: "Monitoreo, IA y análisis de redes", chapter: 3, startWeek: 22, duration: 1, color: "#F59E0B", priority: "high", x: 920, y: 620, notes: "" },
    
    // Review phases
    { id: 23, title: "Revisión integral Capítulo 1", chapter: 4, startWeek: 23, duration: 1, color: "#EF4444", priority: "high", x: 200, y: 720, notes: "" },
    { id: 24, title: "Revisión integral Capítulo 2", chapter: 4, startWeek: 24, duration: 1, color: "#EF4444", priority: "high", x: 450, y: 750, notes: "" },
    { id: 25, title: "Revisión integral Capítulo 3", chapter: 4, startWeek: 25, duration: 1, color: "#EF4444", priority: "high", x: 700, y: 720, notes: "" },
    { id: 26, title: "Integración y conclusiones generales", chapter: 4, startWeek: 26, duration: 1, color: "#EF4444", priority: "high", x: 500, y: 820, notes: "" },
    { id: 27, title: "Revisión final y preparación de presentación", chapter: 4, startWeek: 27, duration: 1, color: "#EF4444", priority: "high", x: 750, y: 800, notes: "" }
  ]);

  const [connections, setConnections] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);
  const [hoveredTask, setHoveredTask] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [notesText, setNotesText] = useState('');
  const [connectingFrom, setConnectingFrom] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clickStartPos, setClickStartPos] = useState(null);
  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const chapters = {
    1: { name: "Encuentro Entre Especies y Espectros", color: "#3B82F6" },
    2: { name: "Poéticas de la relación", color: "#10B981" },
    3: { name: "Mediaciones e interfaces", color: "#F59E0B" },
    4: { name: "Revisión y Consolidación", color: "#EF4444" }
  };

  // Helper functions
  const getDistance = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  const blendColors = (color1, color2) => {
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
  };

  const getTaskUnderMouse = (mouseX, mouseY) => {
    return tasks.find(task => {
      const size = getTaskSize(task.priority);
      const distance = getDistance(mouseX, mouseY, task.x, task.y);
      return distance <= size / 2;
    });
  };

  const getWeekDate = (weekNumber) => {
    const startDate = new Date('2025-06-23');
    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);
    return targetDate.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
  };

  const handleMouseDown = (e, task) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    setClickStartPos({ x: mouseX, y: mouseY });
    
    if (e.shiftKey) {
      if (connectingFrom) {
        if (connectingFrom.id !== task.id) {
          // Check if connection already exists
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
  };

  const handleMouseMove = (e) => {
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
  };

  const handleMouseUp = (e) => {
    if (clickStartPos && draggedTask) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const dragDistance = getDistance(clickStartPos.x, clickStartPos.y, mouseX, mouseY);
      
      // If mouse didn't move much, treat as click
      if (dragDistance < 5) {
        setTimeout(() => {
          setSelectedTask(draggedTask);
          setNotesText(draggedTask.notes || '');
        }, 50);
      }
      
      // Apply color blend if hovering over another task
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
  };

  const handleTaskClick = (task, e) => {
    e.stopPropagation();
    // This will be handled by mouseUp now
  };

  const handleConnectionClick = (connection, e) => {
    e.stopPropagation();
    setSelectedConnection(connection);
  };

  const deleteConnection = () => {
    if (selectedConnection) {
      setConnections(connections.filter(conn => conn.id !== selectedConnection.id));
      setSelectedConnection(null);
    }
  };

  const handleCanvasClick = (e) => {
    // Only clear connecting state if clicking on empty space
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const taskUnder = getTaskUnderMouse(mouseX, mouseY);
    
    if (!taskUnder) {
      setConnectingFrom(null);
      setSelectedConnection(null);
      setSelectedTask(null);
    }
  };

  const saveNotes = () => {
    setTasks(tasks.map(task => 
      task.id === selectedTask.id 
        ? { ...task, notes: notesText }
        : task
    ));
    setSelectedTask(null);
    setNotesText('');
  };

  const addNewTask = () => {
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
        notes: ""
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setConnections(connections.filter(conn => conn.from !== taskId && conn.to !== taskId));
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null);
    }
  };

  const changePriority = (taskId) => {
    const priorities = ['low', 'medium', 'high'];
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const currentIndex = priorities.indexOf(task.priority);
        const nextIndex = (currentIndex + 1) % priorities.length;
        return { ...task, priority: priorities[nextIndex] };
      }
      return task;
    }));
  };

  const randomizePositions = () => {
    setTasks(tasks.map(task => ({
      ...task,
      x: 100 + Math.random() * 900,
      y: 100 + Math.random() * 700
    })));
  };

  const exportToCSV = () => {
    const csv = tasks.map(task => 
      `"${task.title}","${getWeekDate(task.startWeek)}","${task.duration}","Chapter ${task.chapter}","${task.priority}","${task.notes.replace(/"/g, '""')}"`
    ).join('\n');
    
    const blob = new Blob([`Title,Start Date,Duration (weeks),Chapter,Priority,Notes\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thesis_timeline_scattered.csv';
    a.click();
  };

  const filteredTasks = selectedChapter === 'all' 
    ? tasks 
    : tasks.filter(task => task.chapter === parseInt(selectedChapter));

  const getTaskSize = (priority, isHovered = false, isDragged = false) => {
    let baseSize;
    switch (priority) {
      case 'high': baseSize = 80; break;
      case 'medium': baseSize = 65; break;
      case 'low': baseSize = 50; break;
      default: baseSize = 65;
    }
    if (isHovered && isDragged) return baseSize * 1.5;
    return baseSize;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Visualización Dispersa - Tesis Doctoral
        </h1>
        <p className="text-gray-600">
          Explora tu investigación de forma no-lineal. Shift+Click para conectar tareas.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Capítulo:</label>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="border rounded px-3 py-1"
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
            className="border rounded px-3 py-1"
          />
          <button
            onClick={addNewTask}
            className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex space-x-2 ml-auto">
          {connectingFrom && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-700 rounded">
              <span className="text-sm">Conectando desde: {connectingFrom.title.substring(0, 20)}...</span>
              <button
                onClick={() => setConnectingFrom(null)}
                className="text-purple-500 hover:text-purple-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {selectedConnection && (
            <button
              onClick={deleteConnection}
              className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <Trash2 className="w-4 h-4" />
              <span>Eliminar conexión</span>
            </button>
          )}

          <button
            onClick={randomizePositions}
            className="flex items-center space-x-1 px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reorganizar</span>
          </button>

          <button
            onClick={exportToCSV}
            className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Connection Stats */}
      {connections.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <span className="text-sm text-blue-700">
            {connections.length} conexión{connections.length !== 1 ? 'es' : ''} establecida{connections.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Legend */}
      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
        {Object.entries(chapters).map(([num, chapter]) => (
          <div key={num} className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: chapter.color }}
            />
            <span>Cap. {num}: {chapter.name}</span>
          </div>
        ))}
        <div className="ml-4 flex items-center space-x-4 text-xs text-gray-600">
          <span>Tamaño: Prioridad | Shift+Click: Conectar | Arrastra para mover</span>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="relative border rounded-lg bg-gradient-to-br from-gray-50 to-white shadow-sm overflow-hidden">
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
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
            </pattern>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
             refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
            </marker>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Custom connections - Always show all connections */}
          {connections.map(connection => {
            const fromTask = tasks.find(t => t.id === connection.from);
            const toTask = tasks.find(t => t.id === connection.to);
            
            if (!fromTask || !toTask) return null;
            
            // Calculate connection points on circle edges
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
              <g key={connection.id}>
                <line
                  x1={fromX}
                  y1={fromY}
                  x2={toX}
                  y2={toY}
                  stroke={isSelected ? "#EF4444" : "#6B7280"}
                  strokeWidth={isSelected ? "4" : "2"}
                  strokeOpacity="0.8"
                  markerEnd="url(#arrowhead)"
                  className="cursor-pointer hover:stroke-blue-500 hover:stroke-opacity-100"
                  onClick={(e) => handleConnectionClick(connection, e)}
                />
                {/* Connection label */}
                <text
                  x={(fromX + toX) / 2}
                  y={(fromY + toY) / 2 - 5}
                  textAnchor="middle"
                  className="text-xs fill-gray-600 pointer-events-none"
                  style={{ fontSize: '10px' }}
                >
                  {isSelected ? 'Seleccionada' : ''}
                </text>
              </g>
            );
          })}

          {/* Connecting line while dragging */}
          {connectingFrom && (
            <line
              x1={connectingFrom.x}
              y1={connectingFrom.y}
              x2={mousePos.x}
              y2={mousePos.y}
              stroke="#8B5CF6"
              strokeWidth="3"
              strokeDasharray="5,5"
              opacity="0.7"
            />
          )}

{/* Tasks as circles */}
{filteredTasks.map(task => {
  const isHovered = hoveredTask?.id === task.id;
  const isDragged = draggedTask?.id === task.id;
  const isConnecting = connectingFrom?.id === task.id;
  const size = getTaskSize(task.priority, isHovered, isDragged);
  const displayColor = isHovered && draggedTask && draggedTask.id !== task.id 
    ? blendColors(task.color, draggedTask.color)
    : task.color;
  
  return (
    <g key={task.id}>
      <circle
        cx={task.x}
        cy={task.y}
        r={size / 2}
        fill={displayColor}
        stroke={isConnecting ? "#8B5CF6" : "white"}
        strokeWidth={isConnecting ? "4" : "3"}
        className={`cursor-pointer transition-all duration-200 ${
          isDragged ? 'opacity-80' : 'hover:opacity-80'
        } ${task.priority === 'high' ? 'drop-shadow-lg' : ''}`}
        onMouseDown={(e) => handleMouseDown(e, task)}
      />
      
      <text
        x={task.x}
        y={task.y - 5}
        textAnchor="middle"
        className="text-xs font-bold fill-white pointer-events-none"
      >
        {task.startWeek}
      </text>
      
      <text
        x={task.x}
        y={task.y + size/2 + 15}
        textAnchor="middle"
        className="text-xs fill-gray-700 pointer-events-none font-medium"
        style={{ fontSize: '10px', maxWidth: '120px' }}
      >
        {task.title.length > 25 ? task.title.substring(0, 25) + '...' : task.title}
      </text>
      
      <circle
        cx={task.x + size/3}
        cy={task.y - size/3}
        r="4"
        fill={task.priority === 'high' ? '#EF4444' : 
              task.priority === 'medium' ? '#F59E0B' : '#10B981'}
        stroke="white"
        strokeWidth="1"
      />

      {task.notes && (
        <circle
          cx={task.x - size/3}
          cy={task.y - size/3}
          r="3"
          fill="#8B5CF6"
          stroke="white"
          strokeWidth="1"
        />
      )}
      
      <title>{task.title}</title>
    </g>
  );
})}
</svg>


{/* Floating Task Details Modal */}
        {selectedTask && (
          <div 
            className="bg-black bg-opacity-30 z-50 p-4"
            onClick={() => setSelectedTask(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              display: 'flex !important',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'left',
              zIndex: 9999,
              backgroundColor: 'rgba(0, 0, 0, 0.3)'
            }}
          >
            <div 
              className="border border-gray-300 rounded-lg shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              style={{ 
                width: '800px',
                maxWidth: '85vw',
                maxHeight: '75vh',
                position: 'relative',
                textAlign: 'left',
                backgroundColor: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(8px)',
                color: '#000000'
              }}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <h3 className="font-bold text-2xl text-gray-800">Detalles de Tarea</h3>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-200 text-xl"
                >
                  <X size={24} />
                </button>
              </div>
            
              <div className="p-8">
                <div className="mb-6">
                  <div className="text-xl text-gray-800 mb-4 font-semibold">
                    {selectedTask.title}
                  </div>
                  <div className="grid grid-cols-3 gap-6 text-base text-gray-600 bg-gray-100 p-6 rounded-lg border">
                    <div className="text-center">
                      <div className="font-medium text-gray-700">Capítulo</div>
                      <div className="text-lg font-semibold text-blue-600">{selectedTask.chapter}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-700">Semana</div>
                      <div className="text-lg font-semibold text-green-600">{selectedTask.startWeek}</div>
                      <div className="text-sm text-gray-500">({getWeekDate(selectedTask.startWeek)})</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-700">Prioridad</div>
                      <div className="text-lg font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 inline-block">{selectedTask.priority}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Notas:
                  </label>
                  <textarea
                    value={notesText}
                    onChange={(e) => setNotesText(e.target.value)}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg text-base resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    rows="8"
                    placeholder="Agrega notas detalladas sobre esta tarea...

• Usa markdown para formatear tu texto
• **Negrita** para puntos importantes  
• `código` para snippets
• - Lista con viñetas
• ### Subtítulos para organizarte mejor"
                    style={{ 
                      minHeight: '200px',
                      maxHeight: '300px'
                    }}
                  />
                  <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                    <span>💡</span>
                    <span>Tip: Puedes usar Markdown para formatear tu texto</span>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={saveNotes}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg text-base font-medium hover:bg-blue-600 transition-colors shadow-lg"
                  >
                    <Save size={20} />
                    <span>Guardar Notas</span>
                  </button>
                  
                  <button
                    onClick={() => changePriority(selectedTask.id)}
                    className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-lg text-base font-medium hover:bg-yellow-600 transition-colors shadow-lg"
                  >
                    <RotateCcw size={20} />
                    <span>Cambiar Prioridad</span>
                  </button>
                  
                  <button
                    onClick={() => deleteTask(selectedTask.id)}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg text-base font-medium hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <Trash2 size={20} />
                    <span>Eliminar Tarea</span>
                  </button>
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
