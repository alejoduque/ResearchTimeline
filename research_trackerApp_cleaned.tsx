import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Filter, Eye, EyeOff } from 'lucide-react';

const ResearchProjectTracker = () => {
  // ===========================================
  // PART 1: STATE MANAGEMENT & INITIAL DATA
  // ===========================================
  
  // Core state variables
  const [showLabels, setShowLabels] = useState(true);
  const [draggedTask, setDraggedTask] = useState(null);
  const [dynamicConnections, setDynamicConnections] = useState([]);
  const [hoveredLine, setHoveredLine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  // Refs for drag and drop functionality
  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Initial tasks data with all properties needed
  const [tasks, setTasks] = useState([
    // Chapter 1 - Blue theme
    { id: 1, title: "Bioacústica - Más allá del antropocentrismo sonoro", chapter: 1, startWeek: 1, duration: 1, color: "#3B82F6", originalColor: "#3B82F6", priority: "high", x: 150, y: 120, scale: 1 },
    { id: 2, title: "Encuentro Entre Especies y Espectros [e4]", chapter: 1, startWeek: 2, duration: 1, color: "#3B82F6", originalColor: "#3B82F6", priority: "high", x: 320, y: 80, scale: 1 },
    { id: 3, title: "Artes de la Transmisión (Full spectrum radio)", chapter: 1, startWeek: 3, duration: 1, color: "#3B82F6", originalColor: "#3B82F6", priority: "medium", x: 480, y: 140, scale: 1 },
    { id: 4, title: "Inteligencia de máquinas y arte (Google AMI)", chapter: 1, startWeek: 4, duration: 1, color: "#3B82F6", originalColor: "#3B82F6", priority: "high", x: 680, y: 100, scale: 1 },
    { id: 5, title: "Monitoreo y Sonificación (Wildlabs)", chapter: 1, startWeek: 5, duration: 1, color: "#3B82F6", originalColor: "#3B82F6", priority: "medium", x: 820, y: 160, scale: 1 },
    
    // Chapter 2 - Green theme
    { id: 6, title: "Sub/culturas - Reinventar/reconstruir", chapter: 2, startWeek: 6, duration: 1, color: "#10B981", originalColor: "#10B981", priority: "high", x: 180, y: 280, scale: 1 },
    { id: 7, title: "Tec-sincretismo (EGS)", chapter: 2, startWeek: 7, duration: 1, color: "#10B981", originalColor: "#10B981", priority: "medium", x: 350, y: 320, scale: 1 },
    { id: 8, title: "Espectros sonoros", chapter: 2, startWeek: 8, duration: 1, color: "#10B981", originalColor: "#10B981", priority: "medium", x: 520, y: 260, scale: 1 },
    { id: 9, title: "De IAP a DAO", chapter: 2, startWeek: 9, duration: 1, color: "#10B981", originalColor: "#10B981", priority: "high", x: 720, y: 300, scale: 1 },
    { id: 10, title: "Parlamento de lo vivo - Édouard Glissant", chapter: 2, startWeek: 10, duration: 1, color: "#10B981", originalColor: "#10B981", priority: "high", x: 890, y: 240, scale: 1 },
    { id: 11, title: "Agenciamientos multiespecie", chapter: 2, startWeek: 11, duration: 1, color: "#10B981", originalColor: "#10B981", priority: "medium", x: 1000, y: 320, scale: 1 },
    
    // Chapter 3 - Orange theme
    { id: 12, title: "Biocracia - Nueva Gobernanza Inter-especies", chapter: 3, startWeek: 12, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "high", x: 120, y: 450, scale: 1 },
    { id: 13, title: "Sistemas de información geográfica (SIG)", chapter: 3, startWeek: 13, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "high", x: 300, y: 480, scale: 1 },
    { id: 14, title: "El jaguar y el ocelote", chapter: 3, startWeek: 14, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "medium", x: 480, y: 420, scale: 1 },
    { id: 15, title: "Redes de comunicación interespecífica", chapter: 3, startWeek: 15, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "medium", x: 650, y: 460, scale: 1 },
    { id: 16, title: "Archivos híbridos", chapter: 3, startWeek: 16, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "high", x: 820, y: 400, scale: 1 },
    { id: 17, title: "Arte y Sensibilización Ecológica", chapter: 3, startWeek: 17, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "medium", x: 980, y: 480, scale: 1 },
    { id: 18, title: "Tokenización de participación ecosistémica", chapter: 3, startWeek: 18, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "high", x: 150, y: 580, scale: 1 },
    { id: 19, title: "LiquidIce - Desarrollo y programación", chapter: 3, startWeek: 19, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "high", x: 380, y: 600, scale: 1 },
    { id: 20, title: "Sistema PAM como base para DAO", chapter: 3, startWeek: 20, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "high", x: 580, y: 540, scale: 1 },
    { id: 21, title: "Espacialización sonora", chapter: 3, startWeek: 21, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "medium", x: 750, y: 580, scale: 1 },
    { id: 22, title: "Monitoreo, IA y análisis de redes", chapter: 3, startWeek: 22, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "high", x: 920, y: 620, scale: 1 },
    
    // Chapter 4 - Review phases (Red theme)
    { id: 23, title: "Revisión integral Capítulo 1", chapter: 4, startWeek: 23, duration: 1, color: "#EF4444", originalColor: "#EF4444", priority: "high", x: 200, y: 720, scale: 1 },
    { id: 24, title: "Revisión integral Capítulo 2", chapter: 4, startWeek: 24, duration: 1, color: "#EF4444", originalColor: "#EF4444", priority: "high", x: 450, y: 750, scale: 1 },
    { id: 25, title: "Revisión integral Capítulo 3", chapter: 4, startWeek: 25, duration: 1, color: "#EF4444", originalColor: "#EF4444", priority: "high", x: 700, y: 720, scale: 1 },
    { id: 26, title: "Integración y conclusiones generales", chapter: 4, startWeek: 26, duration: 1, color: "#EF4444", originalColor: "#EF4444", priority: "high", x: 500, y: 820, scale: 1 },
    { id: 27, title: "Revisión final y preparación de presentación", chapter: 4, startWeek: 27, duration: 1, color: "#EF4444", originalColor: "#EF4444", priority: "high", x: 750, y: 800, scale: 1 }
  ]);

  // ===========================================
  // HELPER FUNCTIONS
  // ===========================================
  
  // Get task size based on priority
  const getTaskSize = (priority) => {
    switch(priority) {
      case 'high': return 60;
      case 'medium': return 45;
      case 'low': return 35;
      default: return 45;
    }
  };

  // Color blending function
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

  // Filter tasks based on search and chapter selection
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChapter = selectedChapter === 'all' || task.chapter.toString() === selectedChapter;
    return matchesSearch && matchesChapter;
  });

  // ===========================================
  // PART 2: EVENT HANDLERS & INTERACTIVE FUNCTIONS
  // ===========================================
  
  // Check if dragged task intersects with any connection line
  const checkLineIntersection = (draggedTask) => {
    const threshold = 20; // Distance threshold for intersection
    
    // Check intersections with existing task connections (based on sequential weeks)
    for (let i = 0; i < tasks.length - 1; i++) {
      const task1 = tasks[i];
      const task2 = tasks[i + 1];
      
      if (task1.id === draggedTask.id || task2.id === draggedTask.id) continue;
      
      // Calculate distance from point to line
      const A = draggedTask.x - task1.x;
      const B = draggedTask.y - task1.y;
      const C = task2.x - task1.x;
      const D = task2.y - task1.y;
      
      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      
      if (lenSq === 0) continue;
      
      const param = dot / lenSq;
      
      let xx, yy;
      if (param < 0) {
        xx = task1.x;
        yy = task1.y;
      } else if (param > 1) {
        xx = task2.x;
        yy = task2.y;
      } else {
        xx = task1.x + param * C;
        yy = task1.y + param * D;
      }
      
      const dx = draggedTask.x - xx;
      const dy = draggedTask.y - yy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < threshold) {
        return { task1, task2, distance };
      }
    }
    
    return null;
  };

  // Mouse event handlers
  const handleMouseDown = (e, task) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    dragOffset.current = {
      x: mouseX - task.x,
      y: mouseY - task.y
    };
    
    setDraggedTask(task);
    isDragging.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !draggedTask) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const newX = mouseX - dragOffset.current.x;
    const newY = mouseY - dragOffset.current.y;
    
    // Increased canvas bounds for bigger space
    const updatedTask = { 
      ...draggedTask, 
      x: Math.max(50, Math.min(newX, 1400)), 
      y: Math.max(50, Math.min(newY, 1000)) 
    };
    
    // Check for line intersection
    const intersection = checkLineIntersection(updatedTask);
    let newScale = draggedTask.scale;
    let newColor = draggedTask.color;
    
    if (intersection) {
      newScale = Math.max(draggedTask.scale, 1.5);
      newColor = blendColors(draggedTask.originalColor, intersection.task1.color);
      setHoveredLine({ from: intersection.task1.id, to: intersection.task2.id });
    } else {
      setHoveredLine(null);
    }
    
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === draggedTask.id 
        ? { ...task, x: updatedTask.x, y: updatedTask.y, scale: newScale, color: newColor }
        : task
    ));
  };

  const handleMouseUp = () => {
    if (draggedTask && hoveredLine) {
      // Create new dynamic connection
      const newConnection = {
        id: Date.now(),
        from: draggedTask.id,
        to: hoveredLine.from,
        color: blendColors(draggedTask.originalColor, tasks.find(t => t.id === hoveredLine.from)?.originalColor || '#000000')
      };
      
      setDynamicConnections(prev => [...prev, newConnection]);
      
      // Add another connection to the second task
      const newConnection2 = {
        id: Date.now() + 1,
        from: draggedTask.id,
        to: hoveredLine.to,
        color: blendColors(draggedTask.originalColor, tasks.find(t => t.id === hoveredLine.to)?.originalColor || '#000000')
      };
      
      setDynamicConnections(prev => [...prev, newConnection2]);
      
      // Keep the blended color and scale
      setTasks(prevTasks => prevTasks.map(task => 
        task.id === draggedTask.id 
          ? { ...task, color: blendColors(draggedTask.originalColor, tasks.find(t => t.id === hoveredLine.from)?.originalColor || '#000000'), scale: Math.max(task.scale, 1.5) }
          : task
      ));
    }
    
    // Reset drag state
    isDragging.current = false;
    setDraggedTask(null);
    setHoveredLine(null);
  };

  // Line click handler for deleting connections
  const handleLineClick = (e, connectionId) => {
    e.stopPropagation();
    deleteDynamicConnection(connectionId);
  };

  // Connection management
  const deleteDynamicConnection = (connectionId) => {
    setDynamicConnections(prev => prev.filter(conn => conn.id !== connectionId));
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
        originalColor: "#8B5CF6",
        priority: "medium",
        x: 300 + Math.random() * 400,
        y: 300 + Math.random() * 200,
        scale: 1
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
      setNewTaskTitle('');
    }
  };

  // Setup mouse event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseup', handleMouseUp);
      canvas.addEventListener('mouseleave', handleMouseUp);
      
      return () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('mouseleave', handleMouseUp);
      };
    }
  }, [draggedTask, hoveredLine, tasks]);

  // ===========================================
  // UI JSX WITH HEADER AND CONTROL PANEL
  // ===========================================
  
  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Research Project Tracker</h1>
            <p className="text-sm text-gray-600">Interactive project visualization and management</p>
          </div>
          
          {/* Header Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-xs text-gray-600">Chapter 1</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-xs text-gray-600">Chapter 2</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-xs text-gray-600">Chapter 3</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-xs text-gray-600">Chapter 4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white border-b border-gray-200 p-3 flex-shrink-0">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Left side controls */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
              />
            </div>

            {/* Chapter Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Chapters</option>
                <option value="1">Chapter 1</option>
                <option value="2">Chapter 2</option>
                <option value="3">Chapter 3</option>
                <option value="4">Chapter 4</option>
              </select>
            </div>

            {/* Toggle Labels */}
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                showLabels 
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {showLabels ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>{showLabels ? 'Hide Labels' : 'Show Labels'}</span>
            </button>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* Add New Task */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="New task title..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
              />
              <button
                onClick={addNewTask}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-1 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>

            {/* Task Count */}
            <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
              {filteredTasks.length} tasks
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Canvas Area */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="relative">
          <svg
            ref={canvasRef}
            width="1500"
            height="1200"
            className="bg-white border border-gray-200 cursor-crosshair"
            style={{ minWidth: '1500px', minHeight: '1200px' }}
          >
            {/* Background Grid */}
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Sequential Connections (Chapter flow) */}
            {tasks.slice(0, -1).map((task, index) => {
              const nextTask = tasks[index + 1];
              if (!nextTask) return null;
              
              const isHighlighted = hoveredLine?.from === task.id && hoveredLine?.to === nextTask.id;
              
              return (
                <line
                  key={`seq-${task.id}-${nextTask.id}`}
                  x1={task.x}
                  y1={task.y}
                  x2={nextTask.x}
                  y2={nextTask.y}
                  stroke={isHighlighted ? "#ff6b6b" : "#e0e0e0"}
                  strokeWidth={isHighlighted ? "3" : "2"}
                  strokeDasharray={isHighlighted ? "5,5" : "none"}
                  opacity={isHighlighted ? "0.8" : "0.3"}
                  className="hover:stroke-gray-400 cursor-pointer transition-all duration-200"
                />
              );
            })}

            {/* Dynamic Connections */}
            {dynamicConnections.map((connection) => {
              const fromTask = tasks.find(t => t.id === connection.from);
              const toTask = tasks.find(t => t.id === connection.to);
              
              if (!fromTask || !toTask) return null;
              
              return (
                <line
                  key={`dyn-${connection.id}`}
                  x1={fromTask.x}
                  y1={fromTask.y}
                  x2={toTask.x}
                  y2={toTask.y}
                  stroke={connection.color}
                  strokeWidth="3"
                  opacity="0.7"
                  className="hover:stroke-red-500 cursor-pointer transition-all duration-200"
                  onClick={(e) => handleLineClick(e, connection.id)}
                />
              );
            })}

            {/* Task Circles */}
            {filteredTasks.map((task) => {
              const size = getTaskSize(task.priority) * task.scale;
              const isDragging = draggedTask?.id === task.id;
              
              return (
                <g key={task.id}>
                  {/* Task Circle */}
                  <circle
                    cx={task.x}
                    cy={task.y}
                    r={size / 2}
                    fill={task.color}
                    stroke={isDragging ? "#333" : "#fff"}
                    strokeWidth={isDragging ? "3" : "2"}
                    opacity={isDragging ? "0.8" : "0.9"}
                    className="cursor-move hover:opacity-100 transition-all duration-200"
                    style={{ 
                      filter: isDragging ? "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                      transform: `scale(${isDragging ? 1.1 : 1})`,
                      transformOrigin: `${task.x}px ${task.y}px`
                    }}
                    onMouseDown={(e) => handleMouseDown(e, task)}
                  />
                  
                  {/* Priority Indicator */}
                  {task.priority === 'high' && (
                    <circle
                      cx={task.x + size/3}
                      cy={task.y - size/3}
                      r="4"
                      fill="#ff4444"
                      stroke="#fff"
                      strokeWidth="1"
                      className="pointer-events-none"
                    />
                  )}
                  
                  {/* Week Number */}
                  <text
                    x={task.x}
                    y={task.y + 4}
                    textAnchor="middle"
                    className="text-xs font-bold fill-white pointer-events-none select-none"
                    style={{ fontSize: `${10 * task.scale}px` }}
                  >
                    {task.startWeek}
                  </text>
                </g>
              );
            })}

            {/* Task Labels - Positioned below circles */}
            {showLabels && filteredTasks.map((task) => {
              const size = getTaskSize(task.priority) * task.scale;
              const maxWidth = 150;
              const words = task.title.split(' ');
              const lines = [];
              let currentLine = '';
              
              // Simple word wrapping
              words.forEach(word => {
                const testLine = currentLine + (currentLine ? ' ' : '') + word;
                if (testLine.length > 20) {
                  if (currentLine) lines.push(currentLine);
                  currentLine = word;
                } else {
                  currentLine = testLine;
                }
              });
              if (currentLine) lines.push(currentLine);
              
              return (
                <g key={`label-${task.id}`} className="pointer-events-none">
                  {/* Background rectangle for better readability */}
                  <rect
                    x={task.x - maxWidth/2}
                    y={task.y + size/2 + 8}
                    width={maxWidth}
                    height={lines.length * 14 + 8}
                    fill="rgba(255,255,255,0.9)"
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth="1"
                    rx="4"
                    className="pointer-events-none"
                  />
                  
                  {/* Multi-line text */}
                  {lines.map((line, index) => (
                    <text
                      key={index}
                      x={task.x}
                      y={task.y + size/2 + 22 + (index * 14)}
                      textAnchor="middle"
                      className="text-xs fill-gray-700 pointer-events-none select-none"
                      style={{ fontSize: `${9 * Math.min(task.scale, 1.2)}px` }}
                    >
                      {line}
                    </text>
                  ))}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ResearchProjectTracker;
