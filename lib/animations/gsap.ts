import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const easings = {
  expo: 'expo.out',
  expoIn: 'expo.in',
  expoInOut: 'expo.inOut',
  power2: 'power2.out',
  power3: 'power3.out',
  power4: 'power4.out',
  elastic: 'elastic.out(1, 0.5)',
  bounce: 'bounce.out',
  circ: 'circ.out',
  back: 'back.out(1.5)',
} as const;

export const durations = {
  fast: 0.24,
  normal: 0.4,
  slow: 0.8,
  slower: 1.2,
} as const;

export function fadeInUp(
  elements: gsap.TweenTarget,
  options: {
    delay?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
    from?: number;
  } = {}
) {
  const {
    delay = 0,
    stagger = 0.1,
    duration = durations.slow,
    ease = easings.expo,
    from = 40,
  } = options;

  return gsap.fromTo(
    elements,
    { opacity: 0, y: from },
    {
      opacity: 1,
      y: 0,
      duration,
      ease,
      delay,
      stagger,
      clearProps: 'transform,opacity',
    }
  );
}

export function fadeIn(
  elements: gsap.TweenTarget,
  options: {
    delay?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
  } = {}
) {
  const { delay = 0, stagger = 0.1, duration = durations.normal, ease = easings.expo } = options;

  return gsap.fromTo(
    elements,
    { opacity: 0 },
    {
      opacity: 1,
      duration,
      ease,
      delay,
      stagger,
    }
  );
}

export function slideInFromLeft(
  elements: gsap.TweenTarget,
  options: {
    delay?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
    from?: number;
  } = {}
) {
  const { delay = 0, stagger = 0.1, duration = durations.slow, ease = easings.expo, from = -60 } = options;

  return gsap.fromTo(
    elements,
    { opacity: 0, x: from },
    {
      opacity: 1,
      x: 0,
      duration,
      ease,
      delay,
      stagger,
      clearProps: 'transform,opacity',
    }
  );
}

export function slideInFromRight(
  elements: gsap.TweenTarget,
  options: {
    delay?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
    from?: number;
  } = {}
) {
  const { delay = 0, stagger = 0.1, duration = durations.slow, ease = easings.expo, from = 60 } = options;

  return gsap.fromTo(
    elements,
    { opacity: 0, x: from },
    {
      opacity: 1,
      x: 0,
      duration,
      ease,
      delay,
      stagger,
      clearProps: 'transform,opacity',
    }
  );
}

export function scaleIn(
  elements: gsap.TweenTarget,
  options: {
    delay?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
    from?: number;
  } = {}
) {
  const { delay = 0, stagger = 0.1, duration = durations.normal, ease = easings.expo, from = 0.9 } = options;

  return gsap.fromTo(
    elements,
    { opacity: 0, scale: from },
    {
      opacity: 1,
      scale: 1,
      duration,
      ease,
      delay,
      stagger,
      clearProps: 'transform,opacity',
    }
  );
}

export function textReveal(
  elements: gsap.TweenTarget,
  options: {
    delay?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
  } = {}
) {
  const { delay = 0, stagger = 0.05, duration = durations.slow, ease = easings.expo } = options;

  return gsap.fromTo(
    elements,
    { opacity: 0, y: '100%' },
    {
      opacity: 1,
      y: '0%',
      duration,
      ease,
      delay,
      stagger,
      clearProps: 'transform,opacity',
    }
  );
}

export function createScrollTrigger(
  trigger: string | Element | NodeListOf<Element> | Element[],
  animation: gsap.core.Timeline | gsap.core.Tween,
  options: {
    start?: string;
    end?: string;
    scrub?: number | boolean;
    pin?: boolean;
    markers?: boolean;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
  } = {}
) {
  const { start = 'top 80%', end = 'bottom 20%', scrub, pin, markers = false, ...callbacks } = options;

  return ScrollTrigger.create({
    trigger,
    animation,
    start,
    end,
    scrub,
    pin,
    markers,
    ...callbacks,
  });
}

export function createParallax(
  element: string | Element,
  options: {
    speed?: number;
    start?: string;
    end?: string;
  } = {}
) {
  const { speed = 0.5, start = 'top bottom', end = 'bottom top' } = options;

  return gsap.to(element, {
    yPercent: -100 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: true,
    },
  });
}

export function magneticEffect(
  element: HTMLElement,
  options: {
    strength?: number;
    area?: number;
  } = {}
) {
  const { strength = 0.3, area = 150 } = options;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.4,
      ease: easings.expo,
      overwrite: true,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: easings.elastic,
      overwrite: true,
    });
  };

  const handleMouseEnter = () => {
    const handleMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - rect.left - rect.width / 2, e.clientY - rect.top - rect.height / 2);
      if (dist > area) {
        handleMouseLeave();
        element.removeEventListener('mousemove', handleMove);
      }
    };
    element.addEventListener('mousemove', handleMove);
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
  element.addEventListener('mouseenter', handleMouseEnter);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
    element.removeEventListener('mouseenter', handleMouseEnter);
  };
}

export function countUp(
  element: HTMLElement,
  endValue: number,
  options: {
    duration?: number;
    ease?: string;
    decimals?: number;
    suffix?: string;
    prefix?: string;
    onComplete?: () => void;
  } = {}
) {
  const { duration = 2, ease = easings.expo, decimals = 0, suffix = '', prefix = '', onComplete } = options;

  const obj = { value: 0 };
  return gsap.to(obj, {
    value: endValue,
    duration,
    ease,
    onUpdate: () => {
      element.textContent = `${prefix}${obj.value.toFixed(decimals)}${suffix}`;
    },
    onComplete: () => {
      element.textContent = `${prefix}${endValue.toFixed(decimals)}${suffix}`;
      onComplete?.();
    },
  });
}

export function splitTextReveal(
  element: HTMLElement,
  options: {
    type?: 'lines' | 'words' | 'chars';
    delay?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
  } = {}
) {
  const { type = 'lines', delay = 0, stagger = 0.05, duration = durations.slow, ease = easings.expo } = options;

  const text = element.textContent || '';
  element.innerHTML = '';

  const spans = text.split(type === 'lines' ? '\n' : type === 'words' ? ' ' : '').map((part, i) => {
    const span = document.createElement('span');
    span.style.display = 'inline-block';
    span.style.overflow = 'hidden';
    span.innerHTML = `<span style="display: inline-block; transform: translateY(100%);">${part}${type === 'words' ? ' ' : ''}</span>`;
    return span;
  });

  spans.forEach((span) => element.appendChild(span));

  const innerSpans = element.querySelectorAll('span > span');
  return gsap.fromTo(
    innerSpans,
    { y: '100%' },
    { y: '0%', duration, ease, delay, stagger, clearProps: 'transform' }
  );
}

export function initSmoothScroll() {
  if (typeof window === 'undefined') return;

  let lenis: any;
  try {
    const { default: Lenis } = require('lenis');
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } catch (e) {
    console.warn('Lenis not available, using native scroll');
  }

  return lenis;
}

export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
}

export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}