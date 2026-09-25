'use client';

import React from 'react';

export interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  tooltip?: string;
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onClick,
  position = 'bottom-right',
  variant = 'primary',
  size = 'md',
  tooltip,
  className = '',
}) => {
  const positionStyles = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const variantStyles = {
    primary: 'bg-gradient-to-b from-[#FFD361] to-[#FFC52E] text-[#943000]',
    secondary: 'bg-white text-slate-900 border-2 border-slate-900',
  };

  const sizeStyles = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`fixed ${positionStyles[position]} z-50`}>
      <button
        onClick={onClick}
        className={`${sizeStyles[size]} ${variantStyles[variant]} rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-110 active:scale-95 ${className}`}
        title={tooltip}
        aria-label={tooltip}
      >
        {icon}
      </button>
    </div>
  );
};
