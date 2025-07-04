import React from 'react';

const ActionButton = ({ onClick, children, icon: Icon, className = '' }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${className}`}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {children && <span>{children}</span>}
  </button>
);

export default ActionButton;
