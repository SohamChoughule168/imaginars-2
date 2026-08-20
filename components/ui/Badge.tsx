'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'gold' | 'outline' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className, children, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-white/10 text-text-secondary border border-border',
      gold: 'bg-gold/10 text-gold border border-gold/30',
      outline: 'bg-transparent text-text-primary border border-border',
      success: 'bg-green-500/10 text-green-400 border border-green-500/30',
      warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
      error: 'bg-red-500/10 text-red-400 border border-red-500/30',
    };

    const sizeClasses = {
      sm: 'px-2 py-0.5 text-micro',
      md: 'px-3 py-1 text-caption',
      lg: 'px-4 py-1.5 text-body-sm',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 font-medium uppercase tracking-wider rounded-full transition-all duration-300 ease-expo',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        style={{ opacity: 1, transform: 'scale(1)' }}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';