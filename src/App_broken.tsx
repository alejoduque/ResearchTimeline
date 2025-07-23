import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Box, AppBar, Toolbar, Typography, IconButton, Paper, Chip, Select, MenuItem, FormControl, InputLabel, Button, Switch, FormControlLabel } from '@mui/material';
import { Brightness4, Brightness7, Add, Casino, GetApp, Upload, Delete } from '@mui/icons-material';
import TimelineCanvas from './TimelineCanvas';
import TaskDetailsModal from './TaskDetailsModal';
import { createAppTheme } from './theme';
import './App.css';

const ScatteredThesisTimeline = () => {
  // Load saved tasks from localStorage or use default tasks
  const getInitialTasks = () => {
    const savedTasks = localStorage.getItem('thesis-timeline-tasks');
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        // Merge saved notes with default task structure
        const defaultTasks = [
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
        ];
        
        // Merge saved notes and calendar alerts with default tasks
        return defaultTasks.map(defaultTask => {
          const savedTask = parsed.find(t => t.id === defaultTask.id);
          return savedTask 
            ? { ...defaultTask, notes: savedTask.notes || "", calendarAlert: savedTask.calendarAlert || false }
            : defaultTask;
        });
      } catch (error) {
        console.error('Error loading saved tasks:', error);
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
      { id: 26, title: "Integración y conclusiones generales", chapter: 4, startWeek: 26, duration: 1, color: "#EF4444", priority: "high", x: 500, y: 820, notes: "", calendarAlert: false },
      { id: 27, title: "Revisión final y preparación de presentación", chapter: 4, startWeek: 27, duration: 1, color: "#EF4444", priority: "high", x: 750, y: 800, notes: "", calendarAlert: false }
    ];
  };

  const [tasks, setTasks] = useState(getInitialTasks);

  // Load saved connections from localStorage
  const getInitialConnections = () => {
    const savedConnections = localStorage.getItem('thesis-timeline-connections');
    if (savedConnections) {
      try {
        return JSON.parse(savedConnections);
      } catch (error) {
        console.error('Error loading saved connections:', error);
      }
    }
    return [];
  };

  const [connections, setConnections] = useState(getInitialConnections);
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
  const [darkMode, setDarkMode] = useState(false);

  // Create Material UI theme
  const theme = useMemo(() => createAppTheme(darkMode ? 'dark' : 'light'), [darkMode]);

  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (selectedTask) {
      setNotesText(selectedTask.notes || '');
      setCalendarAlert(selectedTask.calendarAlert || false);

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
            const updatedConnections = [...connections, newConnection];
            setConnections(updatedConnections);
            localStorage.setItem('thesis-timeline-connections', JSON.stringify(updatedConnections));
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

  // Handle double-click on tasks to open modal
  const handleTaskDoubleClick = useCallback((task) => {
    setSelectedTask(task);
  }, []);

  const handleMouseUp = useCallback((e) => {
    if (clickStartPos && draggedTask) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const dragDistance = getDistance(clickStartPos.x, clickStartPos.y, mouseX, mouseY);
      
      // Removed single-click modal opening - now only double-click opens modal
      
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
      const updatedConnections = connections.filter(conn => conn.id !== selectedConnection.id);
      setConnections(updatedConnections);
      localStorage.setItem('thesis-timeline-connections', JSON.stringify(updatedConnections));
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
    const updatedTasks = tasks.map(task => 
      task.id === selectedTask.id 
        ? { ...task, notes: notesText, calendarAlert: calendarAlert }
        : task
    );
    setTasks(updatedTasks);
    
    // Save to localStorage
    localStorage.setItem('thesis-timeline-tasks', JSON.stringify(updatedTasks));
    
    setSelectedTask(null);
    setNotesText('');
  }, [selectedTask, notesText, calendarAlert, tasks]);

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
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem('thesis-timeline-tasks', JSON.stringify(updatedTasks));
      setNewTaskTitle('');
    }
  }, [newTaskTitle, tasks]);

  const deleteTask = useCallback((taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('thesis-timeline-tasks', JSON.stringify(updatedTasks));
    
    const updatedConnections = connections.filter(conn => conn.from !== taskId && conn.to !== taskId);
    setConnections(updatedConnections);
    localStorage.setItem('thesis-timeline-connections', JSON.stringify(updatedConnections));
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null);
    }
  }, [selectedTask, tasks]);

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

  const exportToJSON = useCallback(() => {
    const data = {
      tasks: tasks,
      connections: connections,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `research-timeline-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  }, [tasks, connections]);

  const importFromJSON = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (data.tasks && Array.isArray(data.tasks)) {
          setTasks(data.tasks);
          localStorage.setItem('thesis-timeline-tasks', JSON.stringify(data.tasks));
        }
        
        if (data.connections && Array.isArray(data.connections)) {
          setConnections(data.connections);
          localStorage.setItem('thesis-timeline-connections', JSON.stringify(data.connections));
        }
        
        alert('Datos importados exitosamente!');
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Error al importar los datos. Verifica que el archivo sea válido.');
      }
    };
    reader.readAsText(file);
  }, []);



  const filteredTasks = useMemo(() => 
    selectedChapter === 'all' 
      ? tasks 
      : tasks.filter(task => task.chapter === parseInt(selectedChapter))
  , [tasks, selectedChapter]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Material UI App Bar */}
        <AppBar position="static" elevation={1}>
          <Toolbar>
            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
              Cronograma de Investigación Distribuida
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  color="default"
                />
              }
              label={darkMode ? <Brightness4 /> : <Brightness7 />}
              sx={{ mr: 2 }}
            />
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Explora tu investigación de forma no-lineal. Arrastra para mover, doble-click para abrir detalles, Shift+Click para conectar.
          </Typography>

          {/* Controls Panel */}
          <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
                {/* Chapter Filter */}
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Capítulo</InputLabel>
                  <Select
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(e.target.value)}
                    label="Capítulo"
                  >
                    <MenuItem value="all">Todos</MenuItem>
                    {Object.entries(chapters).map(([num, { name }]) => (
                      <MenuItem key={num} value={num}>{`Cap. ${num}: ${name}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* New Task Input */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">Nueva tarea:</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <input
                      type="text"
                      placeholder="Título de la tarea..."
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
                      style={{
                        padding: '8px 12px',
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: '8px',
                        fontSize: '14px',
                        width: '200px',
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                      }}
                    />
                    <IconButton onClick={addNewTask} color="primary" size="small">
                      <Add />
                    </IconButton>
                  </Box>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  onClick={randomizePositions}
                  startIcon={<Casino />}
                  variant="outlined"
                  size="small"
                >
                  Aleatorizar
                </Button>
                <Button
                  onClick={exportToCSV}
                  startIcon={<GetApp />}
                  variant="outlined"
                  size="small"
                  color="success"
                >
                  CSV
                </Button>
                <Button
                  onClick={exportToJSON}
                  startIcon={<GetApp />}
                  variant="outlined"
                  size="small"
                  color="secondary"
                >
                  JSON
                </Button>
                <input
                  type="file"
                  accept=".json"
                  onChange={importFromJSON}
                  style={{ display: 'none' }}
                  id="json-import"
                />
                <label htmlFor="json-import">
                  <Button
                    component="span"
                    startIcon={<Upload />}
                    variant="outlined"
                    size="small"
                    color="warning"
                  >
                    Importar
                  </Button>
                </label>
              </Box>
            </Box>
          </Paper>

          {/* Connection Status */}
          {connectingFrom && (
            <Paper elevation={1} sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">
                  🔗 Conectando: {connectingFrom.title.substring(0, 20)}...
                </Typography>
                <IconButton 
                  onClick={() => setConnectingFrom(null)} 
                  size="small" 
                  sx={{ color: 'inherit' }}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Paper>
          )}

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
              handleCanvasClick={handleCanvasClick}
              handleConnectionClick={handleConnectionClick}
              handleMouseDown={handleMouseDown}
              handleTaskDoubleClick={handleTaskDoubleClick}
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
