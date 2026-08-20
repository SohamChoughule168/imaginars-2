'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SeparatorProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'gold' | 'dashed';
}

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(
  ({ orientation = 'horizontal', variant = 'default', className, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-border',
      gold: 'bg-gradient-to-r from-transparent via-gold/50 to-transparent',
      dashed: 'bg-border border-dashed',
    };

    const orientationClasses = {
      horizontal: 'w-full h-[0.5px]',
      vertical: 'h-full w-[0.5px]',
    };

    return (
      <hr
        ref={ref}
        className={cn(
          orientationClasses[orientation],
          variantClasses[variant],
          className,
          'transform transition-transform duration-800 ease-expo'
        )}
        style={{
          transformOrigin: orientation === 'horizontal' ? 'left center' : 'center top',
          transform: 'scaleX(1)',
        }}
        {...props}
        aria-hidden="true"
      />
    );
  }
);

Separator.displayName = 'Separator';