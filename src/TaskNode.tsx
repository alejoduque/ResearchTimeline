import React from 'react';
import type { Task } from './types';

interface TaskNodeProps {
  task: Task;
  isHovered: boolean;
  isDragged: boolean;
  isConnecting: boolean;
  getTaskSize: (task: Task, isHovered?: boolean, isDragged?: boolean) => number;
  blendColors: (color1: string, color2: string) => string;
  draggedTask: Task | null;
  handleMouseDown: (e: React.MouseEvent, task: Task) => void;
}

const TaskNode: React.FC<TaskNodeProps> = ({
  task,
  isHovered,
  isDragged,
  isConnecting,
  getTaskSize,
  blendColors,
  draggedTask,
  handleMouseDown
}) => {
  const size = getTaskSize(task, isHovered, isDragged);
  const displayColor = isHovered && draggedTask && draggedTask.id !== task.id 
    ? blendColors(task.color, draggedTask.color)
    : task.color;

  return (
    <g onMouseDown={(e) => handleMouseDown(e, task)} className={`cursor-grab ${isDragged ? 'cursor-grabbing' : ''}`}>
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
      <text x={task.x} y={task.y} textAnchor="middle" dy="0.3em" className="text-sm font-bold fill-white pointer-events-none select-none" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
        {task.startWeek}
      </text>
      <text x={task.x} y={task.y + size/2 + 15} textAnchor="middle" className="text-xs fill-gray-800 pointer-events-none font-medium select-none" style={{ fontSize: '9px', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
        {task.title.length > 25 ? task.title.substring(0, 25) + '...' : task.title}
      </text>
      {task.notes && (
        <circle cx={task.x - size/3.5} cy={task.y - size/3.5} r="4" fill="#8B5CF6" stroke="white" strokeWidth="1.5" />
      )}
      <title>{task.title}</title>
    </g>
  );
};

export default TaskNode;
