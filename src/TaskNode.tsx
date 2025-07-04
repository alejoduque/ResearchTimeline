import React from 'react';

const TaskNode = ({
  task,
  isHovered,
  isDragged,
  isConnecting,
  getTaskSize,
  blendColors,
  draggedTask,
  handleMouseDown
}) => {
  const size = getTaskSize(task.priority, isHovered, isDragged);
  const displayColor = isHovered && draggedTask && draggedTask.id !== task.id 
    ? blendColors(task.color, draggedTask.color)
    : task.color;

  return (
    <g onMouseDown={(e) => handleMouseDown(e, task)} className="cursor-grab">
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
};

export default TaskNode;
