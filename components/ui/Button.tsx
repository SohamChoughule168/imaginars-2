'use client';

import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, BaseButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      magnetic = false,
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      className,
      disabled,
      asChild = false,
      onMouseEnter,
      onMouseLeave,
      href,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'inline-flex items-center justify-center gap-3 font-medium font-body transition-all duration-fast ease-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden';
    
    const variantClasses = {
      primary: 'bg-gold text-text-inverse hover:bg-gold-light active:scale-[0.98] shadow-glow-sm',
      secondary: 'bg-transparent border border-border text-text-primary hover:bg-white/5 hover:border-text-muted active:scale-[0.98]',
      ghost: 'bg-transparent text-text-primary hover:text-gold active:scale-[0.98]',
    };

    const sizeClasses = {
      sm: 'px-5 py-2.5 text-body-sm',
      md: 'px-8 py-4 text-body',
      lg: 'px-10 py-5 text-body-lg',
    };

    const magneticClasses = magnetic ? 'magnetic' : '';

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {icon && iconPosition === 'left' && !loading && <span className="flex-shrink-0">{icon}</span>}
        <span className={loading ? 'opacity-0' : ''}>{children}</span>
        {icon && iconPosition === 'right' && !loading && <span className="flex-shrink-0">{icon}</span>}
      </>
    );

    const isAnchor = asChild;
    const Component = isAnchor ? 'a' : 'button';

    const commonProps = {
      ref: ref as any,
      className: cn(baseClasses, variantClasses[variant], sizeClasses[size], fullWidth && 'w-full', className),
      disabled: disabled || loading,
      onMouseEnter,
      onMouseLeave,
      ...(isAnchor ? { href: href || (props as any).href } : {}),
      ...props,
    } as any;

    if (magnetic) {
      return (
        <motion.button
          {...commonProps}
          whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
          whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
        >
          <span className="relative z-10 flex items-center justify-center gap-3 w-full h-full">
            {content}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-slow" aria-hidden="true" />
        </motion.button>
      );
    }

    if (isAnchor) {
      return (
        <motion.a
          {...commonProps}
          whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
          whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        {...commonProps}
        whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
        whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';