import React from 'react';
import TaskNode from './TaskNode';

const TimelineCanvas = ({
  tasks,
  connections,
  connectingFrom,
  hoveredTask,
  draggedTask,
  selectedConnection,
  mousePos,
  canvasRef,
  handleMouseMove,
  handleMouseUp,
  handleCanvasClick,
  handleConnectionClick,
  handleMouseDown,
  handleTaskDoubleClick,
  handleTaskResize,
  getTaskSize,
  blendColors,
  filteredTasks,
  deleteConnection
}) => {
  return (
    <div className="relative w-full h-[800px] bg-white overflow-hidden">
      <svg 
        ref={canvasRef}
        width="100%" 
        height="100%"
        viewBox="0 0 1200 900"
        className={`cursor-crosshair ${connectingFrom ? 'no-tooltips suppress-tooltips' : ''}`}
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
              {isSelected && (
                <g>
                  <circle
                    cx={(fromX + toX) / 2}
                    cy={(fromY + toY) / 2}
                    r="12"
                    fill="#EF4444"
                    stroke="white"
                    strokeWidth="2"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConnection();
                    }}
                    className="cursor-pointer hover:fill-red-600"
                  />
                  <text
                    x={(fromX + toX) / 2}
                    y={(fromY + toY) / 2}
                    textAnchor="middle"
                    dy="0.35em"
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConnection();
                    }}
                    className="cursor-pointer"
                  >
                    ×
                  </text>
                </g>
              )}
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
        {filteredTasks.map(task => (
          <TaskNode
            key={task.id}
            task={task}
            isHovered={hoveredTask?.id === task.id}
            isDragged={draggedTask?.id === task.id}
            isConnecting={connectingFrom?.id === task.id}
            getTaskSize={getTaskSize}
            blendColors={blendColors}
            draggedTask={draggedTask}
            handleMouseDown={handleMouseDown}
            handleTaskDoubleClick={handleTaskDoubleClick}
            handleTaskResize={handleTaskResize}
          />
        ))}
      </svg>
    </div>
  );
};

export default TimelineCanvas;
