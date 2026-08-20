// Cinematic Page Transitions
// WebGL-based page transitions with custom shaders

'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  Canvas, 
  useFrame, 
  useThree, 
  useLoader,
} from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

// Transition shader - circular reveal with distortion
const transitionVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const transitionFragment = `
  uniform sampler2D uFromTexture;
  uniform sampler2D uToTexture;
  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uCenter;
  uniform float uRadius;
  uniform float uDistortion;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  
  varying vec2 vUv;
  
  #define PI 3.14159265359
  
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }
  
  void main() {
    vec2 uv = vUv;
    vec2 center = uCenter / uResolution;
    float dist = length(uv - center);
    
    // Animated radius with easing
    float progress = uProgress;
    float eased = progress < 0.5 
      ? 2.0 * progress * progress 
      : 1.0 - pow(-2.0 * progress + 2.0, 2.0) / 2.0;
    
    float maxRadius = 1.5;
    float currentRadius = uRadius * eased * maxRadius;
    
    // Edge distortion
    float distortion = uDistortion * (1.0 - eased) * 
      sin(dist * 20.0 + uTime * 3.0) * 0.02;
    
    float mask = smoothstep(currentRadius - 0.05, currentRadius + 0.05, dist + distortion);
    
    // Color blend at edge
    vec3 edgeColor = mix(uColorA, uColorB, sin(dist * 50.0 + uTime * 2.0) * 0.5 + 0.5);
    
    vec4 fromColor = texture2D(uFromTexture, uv);
    vec4 toColor = texture2D(uToTexture, uv);
    
    vec3 result = mix(fromColor.rgb, toColor.rgb, mask);
    
    // Gold edge highlight
    float edgeGlow = smoothstep(currentRadius - 0.02, currentRadius, dist) * 
                     (1.0 - smoothstep(currentRadius, currentRadius + 0.02, dist));
    result += vec3(0.85, 0.65, 0.15) * edgeGlow * 0.5;
    
    gl_FragColor = vec4(result, 1.0);
  }
`;

// Page Capture - renders a page to texture
const PageCapture = ({ 
  children, 
  onCapture 
}: { 
  children: React.ReactNode; 
  onCapture: (texture: THREE.Texture) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const captured = useRef(false);

  useEffect(() => {
    if (ref.current && !captured.current) {
      // In a real implementation, we'd use html2canvas or similar
      // For now, we create a placeholder texture
      const texture = new THREE.DataTexture(
        new Uint8Array(4 * 1024 * 1024), // placeholder
        1024, 1024,
        THREE.RGBAFormat,
        THREE.UnsignedByteType
      );
      texture.needsUpdate = true;
      onCapture(texture);
      captured.current = true;
    }
  }, [children, onCapture]);

  return <div ref={ref}>{children}</div>;
};

// Transition Overlay Component
const TransitionOverlay = ({
  isActive,
  fromTexture,
  toTexture,
  progress,
  onComplete,
  center = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  radius = 1.0,
  distortion = 1.0,
  colorA = '#C9A34E',
  colorB = '#3B82F6',
}: {
  isActive: boolean;
  fromTexture: THREE.Texture | null;
  toTexture: THREE.Texture | null;
  progress: number;
  onComplete: () => void;
  center?: { x: number; y: number };
  radius?: number;
  distortion?: number;
  colorA?: string;
  colorB?: string;
}) => {
  const { gl, size } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!materialRef.current) {
      materialRef.current = new THREE.ShaderMaterial({
        vertexShader: transitionVertex,
        fragmentShader: transitionFragment,
        uniforms: {
          uFromTexture: { value: fromTexture },
          uToTexture: { value: toTexture },
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(size.width, size.height) },
          uCenter: { value: new THREE.Vector2(center.x, center.y) },
          uRadius: { value: radius },
          uDistortion: { value: distortion },
          uColorA: { value: new THREE.Color(colorA) },
          uColorB: { value: new THREE.Color(colorB) },
        },
        transparent: true,
        depthWrite: false,
      });
    }
  }, [fromTexture, toTexture, center, radius, distortion, colorA, colorB]);

  useFrame((state, delta) => {
    timeRef.current += delta;
    
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = timeRef.current;
      materialRef.current.uniforms.uProgress.value = progress;
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      
      if (fromTexture) materialRef.current.uniforms.uFromTexture.value = fromTexture;
      if (toTexture) materialRef.current.uniforms.uToTexture.value = toTexture;
    }
    
    if (progress >= 1.0 && isActive) {
      onComplete();
    }
  });

  if (!isActive) return null;
  if (!materialRef.current) return null;

  return (
    <mesh
      ref={meshRef}
      geometry={new THREE.PlaneGeometry(2, 2)}
      material={materialRef.current}
      position={[0, 0, 100]}
      renderOrder={999}
    />
  );
};

// Main Transition Manager
export function PageTransitionManager({
  children,
  transitionType = 'circular',
  duration = 800,
}: {
  children: React.ReactNode;
  transitionType?: 'circular' | 'slide' | 'fade' | 'morph';
  duration?: number;
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fromTexture, setFromTexture] = useState<THREE.Texture | null>(null);
  const [toTexture, setToTexture] = useState<THREE.Texture | null>(null);
  const [progress, setProgress] = useState(0);
  const [transitionCenter, setTransitionCenter] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  
  const startTransition = useCallback(async (center?: { x: number; y: number }) => {
    setIsTransitioning(true);
    setProgress(0);
    
    if (center) setTransitionCenter(center);
    
    // Animate progress
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const p = Math.min(elapsed / duration, 1);
      
      // Easing
      const eased = p < 0.5 
        ? 2 * p * p 
        : 1 - Math.pow(-2 * p + 2, 2) / 2;
      
      setProgress(eased);
      
      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsTransitioning(false);
        setProgress(0);
      }
    };
    
    requestAnimationFrame(animate);
  }, [duration]);

  // Provide transition context to children
  const transitionContext = {
    startTransition,
    isTransitioning,
    progress,
  };

  return (
    <TransitionContext.Provider value={transitionContext}>
      {children}
      {isTransitioning && (
        <Canvas
          camera={{ position: [0, 0, 1], fov: 50 }}
          gl={{ alpha: true }}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            pointerEvents: 'none',
            zIndex: 9999 
          }}
        >
          <TransitionOverlay
            isActive={isTransitioning}
            fromTexture={fromTexture}
            toTexture={toTexture}
            progress={progress}
            onComplete={() => {}}
            center={transitionCenter}
          />
        </Canvas>
      )}
    </TransitionContext.Provider>
  );
}

// Context for accessing transitions
const TransitionContext = React.createContext<{
  startTransition: (center?: { x: number; y: number }) => Promise<void>;
  isTransitioning: boolean;
  progress: number;
} | null>(null);

export function usePageTransition() {
  const context = React.useContext(TransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within PageTransitionManager');
  }
  return context;
}

// Link wrapper with transition
export function TransitionLink({
  href,
  children,
  center,
  transitionType = 'circular',
  ...props
}: {
  href: string;
  children: React.ReactNode;
  center?: { x: number; y: number };
  transitionType?: 'circular' | 'slide' | 'fade' | 'morph';
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { startTransition, isTransitioning } = usePageTransition();
  const ref = useRef<HTMLAnchorElement>(null);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const clickCenter = center || {
      x: e.clientX,
      y: e.clientY,
    };
    
    await startTransition(clickCenter);
    
    // Navigate after transition
    window.location.href = href;
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={handleClick}
      style={{ pointerEvents: isTransitioning ? 'none' : 'auto' }}
      {...props}
    >
      {children}
    </a>
  );
}

// Scroll-triggered transition sections
export function ScrollTransitionSection({
  children,
  triggerStart = 'top 80%',
  triggerEnd = 'bottom 20%',
  onEnter,
  onLeave,
}: {
  children: React.ReactNode;
  triggerStart?: string;
  triggerEnd?: string;
  onEnter?: () => void;
  onLeave?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        const nowVisible = entry.isIntersecting;
        
        if (wasVisible !== nowVisible) {
          setIsVisible(nowVisible);
          if (nowVisible && onEnter) onEnter();
          if (!nowVisible && onLeave) onLeave();
        }
      },
      {
        rootMargin: '0px',
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible, onEnter, onLeave]);

  return (
    <div ref={ref} data-scroll-transition={isVisible ? 'active' : 'inactive'}>
      {children}
    </div>
  );
}

// Parallax Scroll Component
export function ParallaxScroll({
  children,
  speed = 0.5,
  direction = 'vertical',
  offset = 0,
}: {
  children: React.ReactNode;
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translateY(0)');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elementTop = element.getBoundingClientRect().top + scrollY;
      const windowHeight = window.innerHeight;
      const elementHeight = element.offsetHeight;
      
      // Calculate progress through element
      const progress = (scrollY + windowHeight - elementTop) / (windowHeight + elementHeight);
      const clampedProgress = Math.max(0, Math.min(1, progress));
      
      const translateValue = (clampedProgress - 0.5) * speed * 100 + offset;
      
      if (direction === 'vertical') {
        setTransform(`translateY(${translateValue}px)`);
      } else {
        setTransform(`translateX(${translateValue}px)`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction, offset]);

  return (
    <div 
      ref={ref} 
      style={{ 
        transform, 
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}