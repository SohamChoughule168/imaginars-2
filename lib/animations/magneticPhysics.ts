/* eslint-disable */
// Magnetic Physics System
// Realistic magnetic attraction/repulsion with spring physics

import { useRef, useState, useEffect, useCallback } from 'react';

export interface PhysicsVector {
  x: number;
  y: number;
}

export interface MagneticConfig {
  strength: number;
  radius: number;
  maxForce: number;
  damping: number;
  stiffness: number;
  mass: number;
}

export interface PhysicsState {
  position: PhysicsVector;
  velocity: PhysicsVector;
  acceleration: PhysicsVector;
}

const DEFAULT_CONFIG: MagneticConfig = {
  strength: 1.0,
  radius: 200,
  maxForce: 500,
  damping: 0.15,
  stiffness: 0.8,
  mass: 1.0,
};

export class MagneticPhysics {
  private config: MagneticConfig;
  private state: PhysicsState;
  private attractors: Array<{ position: PhysicsVector; strength: number; radius: number }> = [];
  private repellors: Array<{ position: PhysicsVector; strength: number; radius: number }> = [];
  private bounds: { min: PhysicsVector; max: PhysicsVector } | null = null;
  private lastTime: number = 0;
  private isRunning: boolean = false;
  private animationId: number | null = null;
  private onUpdate: ((state: PhysicsState) => void) | null = null;

  constructor(config: Partial<MagneticConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.state = {
      position: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
    };
  }

  setConfig(config: Partial<MagneticConfig>) {
    this.config = { ...this.config, ...config };
  }

  setOnUpdate(callback: (state: PhysicsState) => void) {
    this.onUpdate = callback;
  }

  setPosition(position: PhysicsVector) {
    this.state.position = { ...position };
  }

  setVelocity(velocity: PhysicsVector) {
    this.state.velocity = { ...velocity };
  }

  addAttractor(position: PhysicsVector, strength = 1.0, radius?: number) {
    this.attractors.push({
      position,
      strength,
      radius: radius || this.config.radius,
    });
  }

  addRepellor(position: PhysicsVector, strength = 1.0, radius?: number) {
    this.repellors.push({
      position,
      strength,
      radius: radius || this.config.radius,
    });
  }

  clearAttractors() {
    this.attractors = [];
  }

  clearRepellors() {
    this.repellors = [];
  }

  setBounds(min: PhysicsVector, max: PhysicsVector) {
    this.bounds = { min, max };
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.tick();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private tick = () => {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const dt = Math.min((currentTime - this.lastTime) / 1000, 1 / 60);
    this.lastTime = currentTime;

    this.step(dt);

    if (this.onUpdate) {
      this.onUpdate({ ...this.state });
    }

    this.animationId = requestAnimationFrame(this.tick);
  }

  private step(dt: number) {
    // Reset acceleration
    this.state.acceleration = { x: 0, y: 0 };

    // Apply attractor forces
    this.attractors.forEach(attractor => {
      const force = this.calculateForce(
        this.state.position,
        attractor.position,
        attractor.strength * this.config.strength,
        attractor.radius
      );
      this.state.acceleration.x += force.x / this.config.mass;
      this.state.acceleration.y += force.y / this.config.mass;
    });

    // Apply repellor forces
    this.repellors.forEach(repellor => {
      const force = this.calculateForce(
        this.state.position,
        repellor.position,
        -repellor.strength * this.config.strength,
        repellor.radius
      );
      this.state.acceleration.x += force.x / this.config.mass;
      this.state.acceleration.y += force.y / this.config.mass;
    });

    // Spring force to origin (when no attractors)
    if (this.attractors.length === 0) {
      const springForce = {
        x: -this.state.position.x * this.config.stiffness,
        y: -this.state.position.y * this.config.stiffness,
      };
      this.state.acceleration.x += springForce.x / this.config.mass;
      this.state.acceleration.y += springForce.y / this.config.mass;
    }

    // Damping
    this.state.acceleration.x -= this.state.velocity.x * this.config.damping;
    this.state.acceleration.y -= this.state.velocity.y * this.config.damping;

    // Integrate
    this.state.velocity.x += this.state.acceleration.x * dt;
    this.state.velocity.y += this.state.acceleration.y * dt;

    // Clamp velocity
    const maxVel = this.config.maxForce / this.config.mass;
    const velMagnitude = Math.hypot(this.state.velocity.x, this.state.velocity.y);
    if (velMagnitude > maxVel) {
      const scale = maxVel / velMagnitude;
      this.state.velocity.x *= scale;
      this.state.velocity.y *= scale;
    }

    // Update position
    this.state.position.x += this.state.velocity.x * dt;
    this.state.position.y += this.state.velocity.y * dt;

    // Apply bounds
    if (this.bounds) {
      this.state.position.x = Math.max(this.bounds.min.x, Math.min(this.bounds.max.x, this.state.position.x));
      this.state.position.y = Math.max(this.bounds.min.y, Math.min(this.bounds.max.y, this.state.position.y));
      
      // Bounce off bounds
      if (this.state.position.x <= this.bounds.min.x || this.state.position.x >= this.bounds.max.x) {
        this.state.velocity.x *= -0.5;
      }
      if (this.state.position.y <= this.bounds.min.y || this.state.position.y >= this.bounds.max.y) {
        this.state.velocity.y *= -0.5;
      }
    }
  }

  private calculateForce(
    from: PhysicsVector,
    to: PhysicsVector,
    strength: number,
    radius: number
  ): PhysicsVector {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.hypot(dx, dy);

    if (distance === 0) return { x: 0, y: 0 };

    // Force falls off with distance
    const falloff = Math.max(0, 1 - distance / radius);
    const forceMagnitude = strength * falloff * falloff; // Quadratic falloff

    // Cap force
    const cappedForce = Math.min(forceMagnitude, this.config.maxForce);

    return {
      x: (dx / distance) * cappedForce,
      y: (dy / distance) * cappedForce,
    };
  }

  getState(): PhysicsState {
    return { ...this.state };
  }

  getDistanceTo(position: PhysicsVector): number {
    return Math.hypot(position.x - this.state.position.x, position.y - this.state.position.y);
  }
}

// React hook for magnetic physics
export function useMagneticPhysics(config: Partial<MagneticConfig> = {}) {
  const physicsRef = useRef<MagneticPhysics | null>(null);
  const [state, setState] = useState<PhysicsState>({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    acceleration: { x: 0, y: 0 },
  });

  useEffect(() => {
    physicsRef.current = new MagneticPhysics(config);
    physicsRef.current.setOnUpdate(setState);
    physicsRef.current.start();

    return () => {
      physicsRef.current?.stop();
    };
  }, []);

  const addAttractor = useCallback((position: PhysicsVector, strength = 1.0, radius?: number) => {
    physicsRef.current?.addAttractor(position, strength, radius);
  }, []);

  const addRepellor = useCallback((position: PhysicsVector, strength = 1.0, radius?: number) => {
    physicsRef.current?.addRepellor(position, strength, radius);
  }, []);

  const clearAttractors = useCallback(() => {
    physicsRef.current?.clearAttractors();
  }, []);

  const clearRepellors = useCallback(() => {
    physicsRef.current?.clearRepellors();
  }, []);

  const setPosition = useCallback((position: PhysicsVector) => {
    physicsRef.current?.setPosition(position);
  }, []);

  const setVelocity = useCallback((velocity: PhysicsVector) => {
    physicsRef.current?.setVelocity(velocity);
  }, []);

  return {
    state,
    addAttractor,
    addRepellor,
    clearAttractors,
    clearRepellors,
    setPosition,
    setVelocity,
  };
}

// Spring physics for smooth animations
export class SpringPhysics {
  private position: number = 0;
  private velocity: number = 0;
  private target: number = 0;
  private stiffness: number;
  private damping: number;
  private mass: number;
  private onUpdate: ((value: number) => void) | null = null;
  private animationId: number | null = null;
  private lastTime: number = 0;

  constructor(stiffness = 180, damping = 12, mass = 1) {
    this.stiffness = stiffness;
    this.damping = damping;
    this.mass = mass;
  }

  setTarget(target: number) {
    this.target = target;
  }

  setPosition(position: number) {
    this.position = position;
  }

  setOnUpdate(callback: (value: number) => void) {
    this.onUpdate = callback;
  }

  start() {
    if (this.animationId) return;
    this.lastTime = performance.now();
    this.tick();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private tick = () => {
    const currentTime = performance.now();
    const dt = Math.min((currentTime - this.lastTime) / 1000, 1 / 60);
    this.lastTime = currentTime;

    // Spring force: F = -k * x
    const displacement = this.position - this.target;
    const springForce = -this.stiffness * displacement;
    
    // Damping force: F = -c * v
    const dampingForce = -this.damping * this.velocity;
    
    // Acceleration
    const acceleration = (springForce + dampingForce) / this.mass;
    
    // Integrate
    this.velocity += acceleration * dt;
    this.position += this.velocity * dt;

    if (this.onUpdate) {
      this.onUpdate(this.position);
    }

    // Continue if not settled
    if (Math.abs(this.velocity) > 0.01 || Math.abs(displacement) > 0.01) {
      this.animationId = requestAnimationFrame(this.tick);
    } else {
      this.animationId = null;
    }
  }

  getValue(): number {
    return this.position;
  }

  isSettled(): boolean {
    return Math.abs(this.velocity) < 0.01 && Math.abs(this.position - this.target) < 0.01;
  }
}

// React hook for spring animation
export function useSpring(initialValue = 0, stiffness = 180, damping = 12) {
  const [value, setValue] = useState(initialValue);
  const springRef = useRef<SpringPhysics | null>(null);

  useEffect(() => {
    springRef.current = new SpringPhysics(stiffness, damping);
    springRef.current.setPosition(initialValue);
    springRef.current.setOnUpdate(setValue);
    springRef.current.start();

    return () => springRef.current?.stop();
  }, [stiffness, damping]);

  const setTarget = useCallback((target: number) => {
    springRef.current?.setTarget(target);
  }, []);

  const setPosition = useCallback((position: number) => {
    springRef.current?.setPosition(position);
    setValue(position);
  }, []);

  return [value, setTarget, setPosition] as const;
}

// Magnetic trail for cursor
export class MagneticTrail {
  private points: Array<{
    position: PhysicsVector;
    velocity: PhysicsVector;
    life: number;
    maxLife: number;
    size: number;
    color: string;
  }> = [];
  private maxPoints: number;
  private gravity: number = 0;

  constructor(maxPoints = 50) {
    this.maxPoints = maxPoints;
  }

  addPoint(position: PhysicsVector, velocity: PhysicsVector, options: {
    life?: number;
    size?: number;
    color?: string;
  } = {}) {
    this.points.push({
      position: { ...position },
      velocity: { ...velocity },
      life: options.life || 1.0,
      maxLife: options.life || 1.0,
      size: options.size || 4,
      color: options.color || '#C9A34E',
    });

    if (this.points.length > this.maxPoints) {
      this.points.shift();
    }
  }

  update(dt: number) {
    this.points.forEach(point => {
      point.position.x += point.velocity.x * dt;
      point.position.y += point.velocity.y * dt;
      point.velocity.y += this.gravity * dt;
      point.life -= dt;
    });

    this.points = this.points.filter(p => p.life > 0);
  }

  getPoints() {
    return this.points.map(p => ({
      x: p.position.x,
      y: p.position.y,
      size: p.size * (p.life / p.maxLife),
      opacity: p.life / p.maxLife,
      color: p.color,
    }));
  }

  clear() {
    this.points = [];
  }
}