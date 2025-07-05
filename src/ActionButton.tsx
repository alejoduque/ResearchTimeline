import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  icon: LucideIcon;
  className?: string;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, children, icon: Icon, className = '', disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {children && <span>{children}</span>}
  </button>
);

export default ActionButton;
