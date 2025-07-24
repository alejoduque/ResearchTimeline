import React from 'react';

const TaskNode = ({
  task,
  isHovered,
  isDragged,
  isConnecting,
  getTaskSize,
  blendColors,
  draggedTask,
  handleMouseDown,
  handleTaskDoubleClick,
  handleTaskResize
}) => {
  const size = getTaskSize(task.priority, isHovered, isDragged);
  const displayColor = isHovered && draggedTask && draggedTask.id !== task.id 
    ? blendColors(task.color, draggedTask.color)
    : task.color;

  return (
    <g className="cursor-pointer">
      {/* Larger invisible clickable area for easier connection creation - only active during connection mode */}
      {isConnecting && (
        <circle 
          cx={task.x} 
          cy={task.y} 
          r={size * 0.8} 
          fill="transparent" 
          stroke="none"
          onMouseDown={(e) => handleMouseDown(e, task)}
          className="cursor-pointer clickable-area"
        />
      )}
      <circle
        cx={task.x} cy={task.y} r={size / 2 + 3} fill={displayColor}
        className={`transition-all duration-200 ${isDragged ? 'opacity-30' : 'opacity-20'}`}
      />
      <circle
        cx={task.x} cy={task.y} r={size / 2} fill={displayColor}
        stroke={isConnecting ? "#8B5CF6" : "white"}
        strokeWidth={isConnecting ? "4" : "3"}
        className={`transition-all duration-200 ${isDragged ? 'opacity-80 scale-105' : isHovered && isConnecting ? 'brightness-150 scale-110' : 'hover:scale-105'} drop-shadow-md`}
        onMouseDown={(e) => handleMouseDown(e, task)}
        onDoubleClick={() => handleTaskDoubleClick(task)}
      />
      <text x={task.x} y={task.y} textAnchor="middle" dy="0.3em" className="text-sm font-bold fill-white pointer-events-none select-none">
        {task.startWeek}
      </text>
      <text 
        x={task.x} 
        y={task.y + size/2 + 15} 
        textAnchor="middle" 
        className="pointer-events-none font-medium select-none" 
        style={{ 
          fontSize: '18px',
          fill: 'var(--task-label-color, #374151)'
        }}
      >
        {task.title.length > 20 ? task.title.substring(0, 20) + '...' : task.title}
      </text>
      {task.notes && (
        <circle cx={task.x - size/3.5} cy={task.y - size/3.5} r="4" fill="#8B5CF6" stroke="white" strokeWidth="1.5" />
      )}
      
      {/* Resize dot for adjusting task importance/size */}
      <circle 
        cx={task.x + size/2 - 3} 
        cy={task.y + size/2 - 3} 
        r="4" 
        fill="#6B7280" 
        stroke="white" 
        strokeWidth="1.5" 
        className="cursor-nw-resize hover:fill-blue-500 transition-colors"
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          
          if (e.shiftKey) {
            // Shift+Drag resize mode - start resize operation
            // For now, cycle through priorities as fallback
            const priorities = ['low', 'medium', 'high'] as const;
            const currentIndex = priorities.indexOf(task.priority as any);
            const nextIndex = (currentIndex + 1) % priorities.length;
            const newPriority = priorities[nextIndex];
            
            if (handleTaskResize) {
              handleTaskResize(task.id, newPriority);
            }
          } else {
            // Simple click - cycle through priority levels
            const priorities = ['low', 'medium', 'high'] as const;
            const currentIndex = priorities.indexOf(task.priority as any);
            const nextIndex = (currentIndex + 1) % priorities.length;
            const newPriority = priorities[nextIndex];
            
            if (handleTaskResize) {
              handleTaskResize(task.id, newPriority);
            }
          }
        }}
      />
      {/* Disable title tooltip during connection mode to prevent interference */}
      {!isConnecting && <title>{task.title}</title>}
    </g>
  );
};

export default TaskNode;
