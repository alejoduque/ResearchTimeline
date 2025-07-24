import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Box, AppBar, Toolbar, Typography, IconButton, Paper, Chip, Select, MenuItem, FormControl, InputLabel, Button, Switch, FormControlLabel } from '@mui/material';
import { Brightness4, Brightness7, Add, GetApp, Upload, Delete } from '@mui/icons-material';
import TimelineCanvas from './TimelineCanvas';
import TaskDetailsModal from './TaskDetailsModal';
import { createAppTheme } from './theme';
import './App.css';

// Task interface
interface Task {
  id: number;
  title: string;
  chapter: number;
  startWeek: number;
  duration: number;
  color: string;
  priority: string;
  x: number;
  y: number;
  notes?: string;
  calendarAlert?: boolean;
}

interface Connection {
  id: number;
  from: number;
  to: number;
}

const ScatteredThesisTimeline = () => {
  // Load saved tasks from localStorage or use default tasks
  const getInitialTasks = () => {
    const savedTasks = localStorage.getItem('thesis-timeline-tasks');
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        // Merge saved notes with default task structure
        const defaultTasks = [
          // Chapter 1 - Material UI Blue
          { id: 1, title: "Bioacústica - Más allá del antropocentrismo sonoro", chapter: 1, startWeek: 1, duration: 1, color: "#3B82F6", priority: "high", x: 150, y: 120, notes: "", calendarAlert: false },
          { id: 2, title: "Encuentro Entre Especies y Espectros [e4]", chapter: 1, startWeek: 2, duration: 1, color: "#3B82F6", priority: "high", x: 320, y: 80, notes: "", calendarAlert: false },
          { id: 3, title: "Artes de la Transmisión (Full spectrum radio)", chapter: 1, startWeek: 3, duration: 1, color: "#3B82F6", priority: "medium", x: 480, y: 140, notes: "", calendarAlert: false },
          { id: 4, title: "Inteligencia de máquinas y arte (Google AMI)", chapter: 1, startWeek: 4, duration: 1, color: "#3B82F6", priority: "high", x: 680, y: 100, notes: "", calendarAlert: false },
          { id: 5, title: "Monitoreo y Sonificación (Wildlabs)", chapter: 1, startWeek: 5, duration: 1, color: "#3B82F6", priority: "medium", x: 820, y: 160, notes: "", calendarAlert: false },
          
          // Chapter 2 - Material UI Green
          { id: 6, title: "Sub/culturas - Reinventar/reconstruir", chapter: 2, startWeek: 6, duration: 1, color: "#10B981", priority: "high", x: 180, y: 280, notes: "", calendarAlert: false },
          { id: 7, title: "Ecologías de la escucha", chapter: 2, startWeek: 7, duration: 1, color: "#10B981", priority: "medium", x: 350, y: 240, notes: "", calendarAlert: false },
          { id: 8, title: "Paisajes sonoros y cartografías acústicas", chapter: 2, startWeek: 8, duration: 1, color: "#10B981", priority: "high", x: 520, y: 300, notes: "", calendarAlert: false },
          { id: 9, title: "Tecnologías de grabación y archivo", chapter: 2, startWeek: 9, duration: 1, color: "#10B981", priority: "medium", x: 720, y: 260, notes: "", calendarAlert: false },
          { id: 10, title: "Parlamento de lo vivo - Édouard Glissant", chapter: 2, startWeek: 10, duration: 1, color: "#10B981", priority: "high", x: 890, y: 240, notes: "", calendarAlert: false },
          { id: 11, title: "Agenciamientos multiespecie", chapter: 2, startWeek: 11, duration: 1, color: "#10B981", priority: "medium", x: 1000, y: 320, notes: "", calendarAlert: false },
          
          // Chapter 3 - Material UI Amber
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
          
          // Chapter 4 - Material UI Red
          { id: 23, title: "Revisión integral Capítulo 1", chapter: 4, startWeek: 23, duration: 1, color: "#EF4444", priority: "high", x: 200, y: 720, notes: "", calendarAlert: false },
          { id: 24, title: "Revisión integral Capítulo 2", chapter: 4, startWeek: 24, duration: 1, color: "#EF4444", priority: "high", x: 450, y: 750, notes: "", calendarAlert: false },
          { id: 25, title: "Revisión integral Capítulo 3", chapter: 4, startWeek: 25, duration: 1, color: "#EF4444", priority: "high", x: 700, y: 720, notes: "", calendarAlert: false },
          
          // Chapter 5 - Material UI Purple
          { id: 26, title: "Integración y síntesis final", chapter: 5, startWeek: 26, duration: 1, color: "#8B5CF6", priority: "high", x: 300, y: 850, notes: "", calendarAlert: false },
          { id: 27, title: "Revisión y correcciones finales", chapter: 5, startWeek: 27, duration: 1, color: "#8B5CF6", priority: "high", x: 600, y: 880, notes: "", calendarAlert: false },
          { id: 28, title: "Preparación para defensa", chapter: 5, startWeek: 28, duration: 1, color: "#8B5CF6", priority: "high", x: 450, y: 950, notes: "", calendarAlert: false }
        ];
        
        // Force Material UI colors by only preserving specific fields from localStorage
        const tasksWithMaterialColors = defaultTasks.map(defaultTask => {
          const savedTask = parsed.find((t: any) => t.id === defaultTask.id);
          if (savedTask) {
            return { 
              ...defaultTask, // Use all defaults including Material UI color
              notes: savedTask.notes || defaultTask.notes,
              x: savedTask.x || defaultTask.x,
              y: savedTask.y || defaultTask.y,
              calendarAlert: savedTask.calendarAlert || defaultTask.calendarAlert
              // color, priority, and other properties come from defaultTask (Material UI palette)
            };
          }
          return defaultTask;
        });
        
        // Save the updated tasks with Material UI colors back to localStorage
        localStorage.setItem('thesis-timeline-tasks', JSON.stringify(tasksWithMaterialColors));
        
        return tasksWithMaterialColors;
      } catch (error) {
        console.error('Error parsing saved tasks:', error);
      }
    }
    
    // Return default tasks if no saved data
    return [
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
      
      // Final phases
      { id: 26, title: "Integración y síntesis final", chapter: 5, startWeek: 26, duration: 1, color: "#8B5CF6", priority: "high", x: 300, y: 850, notes: "", calendarAlert: false },
      { id: 27, title: "Revisión y correcciones finales", chapter: 5, startWeek: 27, duration: 1, color: "#8B5CF6", priority: "high", x: 600, y: 880, notes: "", calendarAlert: false },
      { id: 28, title: "Preparación para defensa", chapter: 5, startWeek: 28, duration: 1, color: "#8B5CF6", priority: "high", x: 450, y: 950, notes: "", calendarAlert: false }
    ];
  };

  // Load saved connections from localStorage
  const getInitialConnections = () => {
    const savedConnections = localStorage.getItem('thesis-timeline-connections');
    if (savedConnections) {
      try {
        return JSON.parse(savedConnections);
      } catch (error) {
        console.error('Error parsing saved connections:', error);
      }
    }
    return [];
  };

  // Theme state - default to dark mode
  const [darkMode, setDarkMode] = useState(true);
  const theme = useMemo(() => createAppTheme(darkMode ? 'dark' : 'light'), [darkMode]);

  // Task and connection data
  const [tasks, setTasks] = useState<Task[]>(getInitialTasks());
  const [connections, setConnections] = useState<Connection[]>(getInitialConnections());

  // UI state
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [notesText, setNotesText] = useState('');
  const [calendarAlert, setCalendarAlert] = useState(false);
  const [connectingFrom, setConnectingFrom] = useState<Task | null>(null);
  const [hoveredTask, setHoveredTask] = useState<Task | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [chapterFilter, setChapterFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const canvasRef = useRef<HTMLDivElement>(null);

  // Chapter definitions
  const chapters = {
    1: { name: "Bioacústica y Transmisión", color: "#3B82F6" },
    2: { name: "Subculturas y Agenciamientos", color: "#10B981" },
    3: { name: "Biocracia y Desarrollo", color: "#F59E0B" },
    4: { name: "Revisión Integral", color: "#EF4444" },
    5: { name: "Síntesis Final", color: "#8B5CF6" }
  };

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('thesis-timeline-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save connections to localStorage whenever connections change
  useEffect(() => {
    localStorage.setItem('thesis-timeline-connections', JSON.stringify(connections));
  }, [connections]);

  // Update data-theme attribute for CSS variables
  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Utility functions
  const getTaskSize = (priority: string) => {
    switch (priority) {
      case 'high':
      case 'alta': return 50;
      case 'medium':
      case 'media': return 35;
      case 'low':
      case 'baja': return 25;
      default: return 35;
    }
  };

  const distance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  const blendColors = (color1: string, color2: string) => {
    // Simple color blending - convert hex to RGB, blend, convert back
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

  // Check if two tasks are overlapping
  const getOverlappingTask = (draggedTask: Task, currentPos: { x: number, y: number }) => {
    const draggedSize = getTaskSize(draggedTask.priority);
    
    return tasks.find(task => {
      if (task.id === draggedTask.id) return false;
      
      const taskSize = getTaskSize(task.priority);
      const dx = currentPos.x - task.x;
      const dy = currentPos.y - task.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Check if circles are overlapping
      return distance < (draggedSize + taskSize) / 2;
    });
  };

  const findTaskAtPosition = (mouseX: number, mouseY: number) => {
    return tasks.find(task => {
      const size = getTaskSize(task.priority);
      return distance(mouseX, mouseY, task.x, task.y) <= size / 2;
    });
  };

  const getWeekDate = (weekNumber: number) => {
    const startDate = new Date(2024, 0, 1);
    const weekDate = new Date(startDate.getTime() + (weekNumber - 1) * 7 * 24 * 60 * 60 * 1000);
    return weekDate.toLocaleDateString();
  };

  // Drag state tracking
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [dragStartTime, setDragStartTime] = useState(0);

  // Helper function to convert screen coordinates to SVG coordinates
  const screenToSVG = (screenX: number, screenY: number) => {
    if (!canvasRef.current) return { x: screenX, y: screenY };
    
    const rect = canvasRef.current.getBoundingClientRect();
    const svgX = ((screenX - rect.left) / rect.width) * 1200;
    const svgY = ((screenY - rect.top) / rect.height) * 900;
    
    return { x: svgX, y: svgY };
  };

  // State for double-click detection
  const [clickTimeout, setClickTimeout] = useState<number | null>(null);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [lastClickedTask, setLastClickedTask] = useState<Task | null>(null);

  // Event handlers
  const handleMouseDown = (e: React.MouseEvent, task: Task) => {
    e.preventDefault();
    e.stopPropagation();
    
    const currentTime = Date.now();
    const timeDiff = currentTime - lastClickTime;
    
    // Check if this is a potential double-click (within 500ms and same task)
    if (timeDiff < 500 && lastClickedTask?.id === task.id) {
      // This is a double-click, cancel any pending drag setup
      if (clickTimeout) {
        clearTimeout(clickTimeout);
        setClickTimeout(null);
      }
      // Don't set up drag for double-clicks
      setLastClickTime(currentTime);
      setLastClickedTask(task);
      return;
    }
    
    if (canvasRef.current) {
      const startPos = screenToSVG(e.clientX, e.clientY);
      setMousePos(startPos);
      setLastClickTime(currentTime);
      setLastClickedTask(task);
      
      // Set up drag with a small delay to allow double-click detection
      const timeout = setTimeout(() => {
        setDragStartPos(startPos);
        setDragStartTime(Date.now());
        setDraggedTask(task);
        setIsDragging(false);
        setClickTimeout(null);
      }, 150); // Shorter delay for better responsiveness
      
      setClickTimeout(timeout);
      
      // Check for shift+click to start connection
      if (e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        
        // Prevent any browser tooltips or context menus
        document.body.style.userSelect = 'none';
        (document.body.style as any).webkitUserSelect = 'none';
        (document.body.style as any).mozUserSelect = 'none';
        (document.body.style as any).msUserSelect = 'none';
        
        // Disable any potential browser tooltips or banners
        document.body.setAttribute('title', '');
        document.documentElement.style.setProperty('--webkit-tap-highlight-color', 'transparent');
        
        // Hide any existing tooltips
        const tooltips = document.querySelectorAll('[title]');
        tooltips.forEach(el => {
          el.setAttribute('data-original-title', el.getAttribute('title') || '');
          el.removeAttribute('title');
        });
        
        if (connectingFrom && connectingFrom.id === task.id) {
          // Cancel connection if clicking same task
          setConnectingFrom(null);
        } else if (!connectingFrom) {
          // Start connection (only if not already connecting)
          setConnectingFrom(task);
        }
        // Connection completion now happens in handleMouseUp
        
        // Restore user selection after a delay
        setTimeout(() => {
          document.body.style.userSelect = '';
        }, 100);
        
        return;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (canvasRef.current) {
      const currentMousePos = screenToSVG(e.clientX, e.clientY);

      // Always update mouse position for connection line
      setMousePos(currentMousePos);

      // Handle dragging
      if (draggedTask && !isDragging && !connectingFrom) {
        const dragDistance = distance(currentMousePos.x, currentMousePos.y, dragStartPos.x, dragStartPos.y);
        if (dragDistance > 3) { // Reduced threshold for smoother dragging
          setIsDragging(true);
        }
      }

      // Update task position in real-time while dragging
      if (isDragging && draggedTask) {
        const overlappingTask = getOverlappingTask(draggedTask, currentMousePos);
        
        setTasks(prevTasks => 
          prevTasks.map(task => {
            if (task.id === draggedTask.id) {
              // If overlapping with another task, blend colors
              const newColor = overlappingTask 
                ? blendColors(draggedTask.color, overlappingTask.color)
                : draggedTask.color;
              
              return { 
                ...task, 
                x: currentMousePos.x, 
                y: currentMousePos.y,
                color: newColor
              };
            }
            return task;
          })
        );
      }
    }
  };

  const handleTaskDoubleClick = (task: Task) => {
    // Only open modal if not dragging and not connecting
    if (!isDragging && !connectingFrom) {
      setSelectedTask(task);
      setNotesText(task.notes || '');
      setCalendarAlert(task.calendarAlert || false);
    }
  };

  const handleTaskResize = (taskId: number, newPriority: 'low' | 'medium' | 'high') => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, priority: newPriority }
          : task
      )
    );
    console.log(`Task ${taskId} resized to ${newPriority}`);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    handlePointerUp(e.clientX, e.clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches.length > 0) {
      const touch = e.changedTouches[0];
      handlePointerUp(touch.clientX, touch.clientY);
    }
  };

  const handlePointerUp = (clientX: number, clientY: number) => {
    // Handle connection completion on mouse/touch release
    if (connectingFrom) {
      // Find task under mouse/touch position
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        // Convert screen coordinates to SVG coordinates
        const screenX = clientX - rect.left;
        const screenY = clientY - rect.top;
        
        // Transform to SVG viewBox coordinates (0 0 1200 900)
        const svgX = (screenX / rect.width) * 1200;
        const svgY = (screenY / rect.height) * 900;
        
        // Find the task closest to the release position
        const targetTask = tasks.find(task => {
          const distance = Math.sqrt((task.x - svgX) ** 2 + (task.y - svgY) ** 2);
          return distance <= 50; // Increased tolerance to 50px in SVG coordinates
        });
        
        if (targetTask && targetTask.id !== connectingFrom.id) {
          // Complete connection
          const connectionExists = connections.some(conn => 
            (conn.from === connectingFrom.id && conn.to === targetTask.id) ||
            (conn.from === targetTask.id && conn.to === connectingFrom.id)
          );
          
          if (!connectionExists) {
            const newConnection: Connection = {
              id: Math.max(...connections.map(c => c.id), 0) + 1,
              from: connectingFrom.id,
              to: targetTask.id
            };
            
            const updatedConnections = [...connections, newConnection];
            setConnections(updatedConnections);
            localStorage.setItem('thesis-timeline-connections', JSON.stringify(updatedConnections));
          }
        }
      }
      
      // Always clear connecting state on release
      setConnectingFrom(null);
      return;
    }
    
    // Handle regular drag completion
    if (draggedTask && !connectingFrom) {
      const dragTime = Date.now() - dragStartTime;
      const dragDist = distance(mousePos.x, mousePos.y, dragStartPos.x, dragStartPos.y);
      
      // If it was a short click without much movement, don't treat as drag
      if (!isDragging && dragTime < 200 && dragDist < 3) {
        // Just a click, don't move the task
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === draggedTask.id 
              ? { ...task, x: dragStartPos.x, y: dragStartPos.y }
              : task
          )
        );
      }
      // If dragging, position is already updated in real-time
    }
    setDraggedTask(null);
    setIsDragging(false);
  };

  const handleConnectionClick = (connection: Connection) => {
    setSelectedConnection(connection);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      const clickedTask = findTaskAtPosition(clickX, clickY);
      if (!clickedTask) {
        setSelectedConnection(null);
        setConnectingFrom(null);
      }
    }
  };

  // Task management functions
  const saveNotes = () => {
    if (selectedTask) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === selectedTask.id
            ? { ...task, notes: notesText, calendarAlert }
            : task
        )
      );
    }
  };

  const deleteTask = () => {
    if (selectedTask) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== selectedTask.id));
      setConnections(prevConnections => 
        prevConnections.filter(conn => 
          conn.from !== selectedTask.id && conn.to !== selectedTask.id
        )
      );
      setSelectedTask(null);
    }
  };

  const changePriority = (priority: string) => {
    if (selectedTask) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === selectedTask.id
            ? { ...task, priority }
            : task
        )
      );
      setSelectedTask(prev => prev ? { ...prev, priority } : null);
    }
  };

  const deleteConnection = () => {
    if (selectedConnection) {
      const updatedConnections = connections.filter(conn => conn.id !== selectedConnection.id);
      setConnections(updatedConnections);
      localStorage.setItem('thesis-timeline-connections', JSON.stringify(updatedConnections));
      setSelectedConnection(null);
    }
  };

  const addTask = () => {
    const newTask: Task = {
      id: Math.max(...tasks.map(t => t.id)) + 1,
      title: "Nueva Tarea",
      chapter: 1,
      startWeek: 1,
      duration: 1,
      color: "#3498db",
      priority: "media",
      x: 200,
      y: 200,
      notes: "",
      calendarAlert: false
    };
    setTasks(prev => [...prev, newTask]);
  };

  const exportToJSON = () => {
    const data = { tasks, connections };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'timeline.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importFromJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.tasks) setTasks(data.tasks);
        if (data.connections) setConnections(data.connections);
      } catch (error) {
        console.error('Error importing JSON:', error);
      }
    };
    reader.readAsText(file);
  };

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const chapterMatch = chapterFilter === 'all' || task.chapter.toString() === chapterFilter;
      const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;
      return chapterMatch && priorityMatch;
    });
  }, [tasks, chapterFilter, priorityFilter]);

  // Update selected task when tasks change
  useEffect(() => {
    if (selectedTask) {
      const updatedTask = tasks.find(t => t.id === selectedTask.id);
      if (updatedTask) {
        setSelectedTask(updatedTask);
        setNotesText(updatedTask.notes || '');
        setCalendarAlert(updatedTask.calendarAlert || false);
      }
    }
  }, [tasks, selectedTask]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* App Bar */}
        <AppBar position="static" elevation={2}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              📊 Research Timeline
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  color="default"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                  {darkMode ? 'Light' : 'Dark'}
                </Box>
              }
            />
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Controls */}
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
              {/* Filters */}
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Capítulo</InputLabel>
                <Select
                  value={chapterFilter}
                  label="Capítulo"
                  onChange={(e) => setChapterFilter(e.target.value)}
                >
                  <MenuItem value="all">Todos</MenuItem>
                  {Object.entries(chapters).map(([num, chapter]) => (
                    <MenuItem key={num} value={num}>{num}. {chapter.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Prioridad</InputLabel>
                <Select
                  value={priorityFilter}
                  label="Prioridad"
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <MenuItem value="all">Todas</MenuItem>
                  <MenuItem value="high">Alta</MenuItem>
                  <MenuItem value="medium">Media</MenuItem>
                  <MenuItem value="low">Baja</MenuItem>
                </Select>
              </FormControl>

              {/* Action Buttons */}
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={addTask}
                size="small"
              >
                Nueva Tarea
              </Button>

              <Button
                variant="outlined"
                startIcon={<GetApp />}
                onClick={exportToJSON}
                size="small"
              >
                Exportar
              </Button>

              <input
                type="file"
                accept=".json"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    importFromJSON(file);
                    e.target.value = '';
                  }
                }}
                style={{ display: 'none' }}
                id="import-file"
              />
              <label htmlFor="import-file">
                <Button
                  variant="outlined"
                  startIcon={<Upload />}
                  component="span"
                  size="small"
                >
                  Importar
                </Button>
              </label>
            </Box>
          </Paper>



          {/* Selected Connection Actions */}
          {selectedConnection && (
            <Paper elevation={1} sx={{ p: 2, bgcolor: 'error.light', color: 'error.contrastText' }}>
              <Button
                onClick={deleteConnection}
                startIcon={<Delete />}
                variant="contained"
                color="error"
                size="small"
              >
                Eliminar Conexión
              </Button>
            </Paper>
          )}

          {/* Chapter Legend */}
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">📊 Capítulos:</Typography>
              {Object.entries(chapters).map(([num, chapter]) => (
                <Chip
                  key={num}
                  label={`${num}. ${chapter.name}`}
                  size="small"
                  sx={{
                    bgcolor: chapter.color,
                    color: 'white',
                    '& .MuiChip-label': { fontSize: '0.75rem' }
                  }}
                />
              ))}
              <Typography variant="caption" color="text.secondary">
                📏 Prioridad: Alta (grande), Media, Baja (pequeño)
              </Typography>
            </Box>
          </Paper>

          {/* Canvas Area with Material UI styling */}
          <Paper elevation={3} sx={{ overflow: 'hidden', bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50' }}>
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
              handleTouchEnd={handleTouchEnd}
              handleCanvasClick={handleCanvasClick}
              handleConnectionClick={handleConnectionClick}
              handleMouseDown={handleMouseDown}
              handleTaskDoubleClick={handleTaskDoubleClick}
              handleTaskResize={handleTaskResize}
              getTaskSize={getTaskSize}
              blendColors={blendColors}
              filteredTasks={filteredTasks}
              deleteConnection={deleteConnection}
            />
          </Paper>
        </Box>
      </Box>

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
      />
    </ThemeProvider>
  );
};

export default ScatteredThesisTimeline;
