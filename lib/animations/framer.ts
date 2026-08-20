import { Variants, Transition } from 'framer-motion';

export const transitions = {
  fast: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
  normal: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  slow: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  slower: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  spring: { type: 'spring', stiffness: 300, damping: 30 },
  springGentle: { type: 'spring', stiffness: 200, damping: 25 },
  springBouncy: { type: 'spring', stiffness: 400, damping: 20 },
} as const satisfies Record<string, Transition>;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.slow },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: transitions.slow },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: transitions.slow },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: transitions.slow },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: transitions.slow },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: transitions.normal },
};

export const slideUp: Variants = {
  hidden: { y: '100%' },
  visible: { y: 0, transition: transitions.slow },
};

export const slideDown: Variants = {
  hidden: { y: '-100%' },
  visible: { y: 0, transition: transitions.slow },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: transitions.slow },
};

export const textReveal: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: '0%', transition: transitions.slow },
};

export const textRevealStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const clipPathReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: { clipPath: 'inset(0 0 0 0)', transition: transitions.slow },
};

export const cardHover: Variants = {
  rest: { y: 0, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' },
  hover: { y: -8, boxShadow: '0 12px 28px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.2)', transition: transitions.normal },
};

export const magneticButton: Variants = {
  rest: { x: 0, y: 0, scale: 1 },
  hover: { scale: 1.02, transition: transitions.fast },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
};

export const navLink: Variants = {
  rest: { x: 0, opacity: 0.7 },
  hover: { x: 4, opacity: 1, color: '#C9A34E', transition: transitions.fast },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: transitions.slow },
  exit: { opacity: 0, y: -20, transition: transitions.fast },
};

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const floatAnimation: Variants = {
  animate: {
    y: [-20, 20, -20],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const pulseGlow: Variants = {
  animate: {
    boxShadow: [
      '0 0 30px -10px rgba(201, 163, 78, 0.2)',
      '0 0 60px -20px rgba(201, 163, 78, 0.4)',
      '0 0 30px -10px rgba(201, 163, 78, 0.2)',
    ],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -180, scale: 0.5 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: transitions.slower },
};

export const drawSVG: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } },
};

export function createStaggerVariants(
  baseVariants: Variants,
  staggerDelay = 0.1
): Variants {
  const baseVisible = baseVariants.visible as { transition?: any } | undefined;
  return {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...baseVisible?.transition,
        staggerChildren: staggerDelay,
      },
    },
  };
}

export function createScrollVariants(
  baseVariants: Variants,
  viewport = { once: true, margin: '-100px' }
): Variants {
  const baseVisible = baseVariants.visible as { transition?: any } | undefined;
  return {
    ...baseVariants,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...baseVisible?.transition,
      },
    },
  };
}