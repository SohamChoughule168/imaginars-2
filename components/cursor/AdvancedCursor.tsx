// Advanced Cursor System
// Physics-based cursor with magnetic attraction, trails, and particle effects

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface CursorPosition {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface MagneticElement {
  element: HTMLElement;
  strength: number;
  radius: number;
  onEnter?: () => void;
  onLeave?: () => void;
}

export function useAdvancedCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0, vx: 0, vy: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [clickEffect, setClickEffect] = useState<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  
  const magneticElements = useRef<Map<HTMLElement, MagneticElement>>(new Map());
  const animationFrame = useRef<number>();
  const lastTime = useRef<number>(performance.now());
  const trail = useRef<Array<{ x: number; y: number; time: number; size: number }>>([]);
  const clickRipples = useRef<Array<{ x: number; y: number; radius: number; opacity: number }>>([]);

  // Register magnetic element
  const registerMagnetic = useCallback((
    element: HTMLElement,
    options: { strength?: number; radius?: number; onEnter?: () => void; onLeave?: () => void } = {}
  ) => {
    magneticElements.current.set(element, {
      element,
      strength: options.strength || 0.3,
      radius: options.radius || 150,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
    });
  }, []);

  const unregisterMagnetic = useCallback((element: HTMLElement) => {
    magneticElements.current.delete(element);
  }, []);

  // Physics simulation loop
  useEffect(() => {
    const simulate = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime.current) / 1000, 1/60);
      lastTime.current = currentTime;

      // Update cursor physics (spring to target)
      const spring = 0.15;
      const damping = 0.85;
      
      // Apply magnetic forces
      let magneticForceX = 0;
      let magneticForceY = 0;
      let hoveredElement: HTMLElement | null = null;
      
      magneticElements.current.forEach(({ element, strength, radius, onEnter, onLeave }) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dx = centerX - position.x;
        const dy = centerY - position.y;
        const distance = Math.hypot(dx, dy);
        
        if (distance < radius && distance > 0) {
          const force = strength * (1 - distance / radius);
          magneticForceX += (dx / distance) * force * 50;
          magneticForceY += (dy / distance) * force * 50;
          
          if (distance < radius * 0.3) {
            hoveredElement = element;
          }
        }
      });

      // Update velocity with magnetic forces
      position.vx = position.vx * damping + magneticForceX * dt;
      position.vy = position.vy * damping + magneticForceY * dt;
      
      // Spring back to actual mouse position when no magnetic influence
      if (magneticForceX === 0 && magneticForceY === 0) {
        // This will be set by mouse move event
      }

      // Update position
      position.x += position.vx * dt;
      position.y += position.vy * dt;

      // Add to trail
      if (Math.hypot(position.vx, position.vy) > 5) {
        trail.current.push({
          x: position.x,
          y: position.y,
          time: currentTime,
          size: 4 + Math.random() * 3,
        });
      }

      // Clean old trail points
      const trailLifetime = 800; // ms
      trail.current = trail.current.filter(p => currentTime - p.time < trailLifetime);

      // Update click ripples
      clickRipples.current = clickRipples.current.map(ripple => ({
        ...ripple,
        radius: ripple.radius + dt * 300,
        opacity: ripple.opacity - dt * 2,
      })).filter(r => r.opacity > 0);

      // Update hover state
      const wasHovering = isHovering;
      const nowHovering = !!hoveredElement;
      if (wasHovering !== nowHovering) {
        setIsHovering(nowHovering);
      }

      // Trigger enter/leave callbacks
      magneticElements.current.forEach(({ element, onEnter, onLeave }) => {
        const wasHovered = element === (magneticElements.current.get(element)?.element);
        const isHovered = element === hoveredElement;
        if (!wasHovered && isHovered && onEnter) onEnter();
        if (wasHovered && !isHovered && onLeave) onLeave();
      });

      setPosition({ ...position });
      animationFrame.current = requestAnimationFrame(simulate);
    };

    animationFrame.current = requestAnimationFrame(simulate);
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [position, isHovering]);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Direct position update for responsiveness
      setPosition(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleClick = (e: MouseEvent) => {
      setClickEffect({ x: e.clientX, y: e.clientY, active: true });
      clickRipples.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        opacity: 0.6,
      });
      
      // Add trail burst
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        trail.current.push({
          x: e.clientX + Math.cos(angle) * 10,
          y: e.clientY + Math.sin(angle) * 10,
          time: performance.now(),
          size: 6 + Math.random() * 4,
        });
      }

      // Reset click effect
      setTimeout(() => setClickEffect(prev => ({ ...prev, active: false })), 150);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  // Respect reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      // Disable physics for reduced motion
      magneticElements.current.clear();
    }
    
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        magneticElements.current.clear();
      }
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return {
    position,
    isVisible,
    isHovering,
    clickEffect,
    trail: trail.current,
    clickRipples: clickRipples.current,
    registerMagnetic,
    unregisterMagnetic,
  };
}

// React component for rendering cursor visuals
interface CursorRendererProps {
  position: CursorPosition;
  isVisible: boolean;
  isHovering: boolean;
  clickEffect: { x: number; y: number; active: boolean };
  trail: Array<{ x: number; y: number; time: number; size: number }>;
  clickRipples: Array<{ x: number; y: number; radius: number; opacity: number }>;
}

export function CursorRenderer({
  position,
  isVisible,
  isHovering,
  clickEffect,
  trail,
  clickRipples,
}: CursorRendererProps) {
  if (!isVisible) return null;

  return (
    <>
      {/* Trail particles */}
      <div 
        style={{ 
          pointerEvents: 'none', 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 9998,
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        {trail.map((point, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: point.x,
              top: point.y,
              width: point.size,
              height: point.size,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #C9A34E, transparent 70%)',
              transform: 'translate(-50%, -50%)',
              opacity: 0.4,
              pointerEvents: 'none',
              filter: 'blur(1px)',
            }}
          />
        ))}
        
        {/* Click ripples */}
        {clickRipples.map((ripple, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: ripple.x,
              top: ripple.y,
              width: ripple.radius * 2,
              height: ripple.radius * 2,
              borderRadius: '50%',
              border: `1px solid rgba(201, 163, 78, ${ripple.opacity})`,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />
        ))}
      </div>

      {/* Main cursor */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: isHovering ? 32 : 20,
          height: isHovering ? 32 : 20,
          borderRadius: '50%',
          border: `1px solid ${isHovering ? '#C9A34E' : 'rgba(245, 243, 236, 0.6)'}`,
          background: isHovering ? 'rgba(201, 163, 78, 0.1)' : 'transparent',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, background-color 0.2s ease',
          boxShadow: isHovering ? '0 0 20px rgba(201, 163, 78, 0.3)' : 'none',
        }}
        aria-hidden="true"
      >
        {/* Inner dot */}
        <div
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#C9A34E',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: isHovering ? 1 : 0.6,
          }}
        />
      </div>

      {/* Click effect */}
      {clickEffect.active && (
        <div
          style={{
            position: 'fixed',
            left: clickEffect.x,
            top: clickEffect.y,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '2px solid #C9A34E',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9999,
            animation: 'clickRipple 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
          aria-hidden="true"
        />
      )}

      <style jsx>{`
        @keyframes clickRipple {
          0% { width: 0; height: 0; opacity: 1; }
          100% { width: 60px; height: 60px; opacity: 0; }
        }
      `}</style>
    </>
  );
}

// Hook for magnetic button behavior
export function useMagneticButton(options: { strength?: number; radius?: number } = {}) {
  const ref = useRef<HTMLButtonElement>(null);
  const { registerMagnetic, unregisterMagnetic } = useAdvancedCursor();

  useEffect(() => {
    if (ref.current) {
      registerMagnetic(ref.current, {
        strength: options.strength || 0.4,
        radius: options.radius || 120,
      });
    }
    return () => {
      if (ref.current) unregisterMagnetic(ref.current);
    };
  }, [registerMagnetic, unregisterMagnetic, options.strength, options.radius]);

  return ref;
}