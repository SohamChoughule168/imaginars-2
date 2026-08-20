'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'md', className, children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-[1440px]',
      full: 'max-w-full',
    };

    return (
      <div
        ref={ref}
        className={cn('mx-auto px-6 md:px-12 lg:px-16', sizeClasses[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  size?: 'default' | 'lg' | 'xl';
  className?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ size = 'default', className, children, ...props }, ref) => {
    const sizeClasses = {
      default: 'py-24 md:py-32 lg:py-40',
      lg: 'py-32 md:py-40 lg:py-48',
      xl: 'py-40 md:py-48 lg:py-56',
    };

    return (
      <section
        ref={ref}
        className={cn(sizeClasses[size], className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ columns = 12, gap = 'md', responsive = true, className, children, ...props }, ref) => {
    const gapClasses = {
      none: 'gap-0',
      sm: 'gap-4',
      md: 'gap-6 md:gap-8 lg:gap-12',
      lg: 'gap-8 md:gap-12 lg:gap-16',
      xl: 'gap-12 md:gap-16 lg:gap-24',
    };

    const columnClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
      12: 'grid-cols-12',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          responsive ? columnClasses[columns] : `grid-cols-${columns}`,
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
  fullWidth?: boolean;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({
    direction = 'row',
    align = 'stretch',
    justify = 'start',
    gap = 'md',
    wrap = false,
    fullWidth = false,
    className,
    children,
    ...props
  }, ref) => {
    const directionClasses = {
      row: 'flex-row',
      col: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'col-reverse': 'flex-col-reverse',
    };

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    };

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };

    const gapClasses = {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          directionClasses[direction],
          alignClasses[align],
          justifyClasses[justify],
          gapClasses[gap],
          wrap && 'flex-wrap',
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = 'Flex';