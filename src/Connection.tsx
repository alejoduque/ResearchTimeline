import React from 'react';
import type { Task } from './types';

interface ConnectionProps {
  fromNode: Task | undefined;
  toNode: Task | undefined;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
  getTaskSize: (priority: 'high' | 'medium' | 'low', isHovered?: boolean, isDragged?: boolean) => number;
}

const Connection: React.FC<ConnectionProps> = ({ fromNode, toNode, isSelected, onClick, getTaskSize }) => {
  if (!fromNode || !toNode) return null;

  const fromSize = getTaskSize(fromNode.priority);
  const toSize = getTaskSize(toNode.priority);

  const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
  const x1 = fromNode.x + (fromSize / 2) * Math.cos(angle);
  const y1 = fromNode.y + (fromSize / 2) * Math.sin(angle);
  const x2 = toNode.x - (toSize / 2) * Math.cos(angle);
  const y2 = toNode.y - (toSize / 2) * Math.sin(angle);

  return (
    <g onClick={onClick} className="cursor-pointer">
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={isSelected ? "#F59E0B" : "#9CA3AF"}
        strokeWidth={isSelected ? "3" : "2"}
        className="transition-all duration-200"
      />
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="transparent"
        strokeWidth="10"
      />
    </g>
  );
};

export default Connection;
