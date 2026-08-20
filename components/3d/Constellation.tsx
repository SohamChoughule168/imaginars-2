'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial as DreiPointMaterial, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { cn, getScrollProgress } from '@/lib/utils';

const PARTICLE_COUNT = 3000;
const SERVICES_COUNT = 6;

const servicePositions = [
  new THREE.Vector3(-8, 4, 0),
  new THREE.Vector3(0, 6, 0),
  new THREE.Vector3(8, 4, 0),
  new THREE.Vector3(-8, -4, 0),
  new THREE.Vector3(0, -6, 0),
  new THREE.Vector3(8, -4, 0),
];

const serviceColors = [
  new THREE.Color('#3B82F6'),
  new THREE.Color('#10B981'),
  new THREE.Color('#8B5CF6'),
  new THREE.Color('#F59E0B'),
  new THREE.Color('#EC4899'),
  new THREE.Color('#06B6D4'),
];

const serviceNames = ['Web Development', 'Mobile Apps', 'AI Solutions', 'Digital Marketing', 'Video Editing', 'Brand Management'];

function generateParticleData(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const serviceIds = new Float32Array(count);
  const targetPositions = new Float32Array(count * 3);
  const initialPositions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const radius = 15 + Math.random() * 10;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    initialPositions[i * 3] = x;
    initialPositions[i * 3 + 1] = y;
    initialPositions[i * 3 + 2] = z;

    const serviceId = Math.floor(Math.random() * SERVICES_COUNT);
    serviceIds[i] = serviceId;

    const targetPos = servicePositions[serviceId].clone();
    targetPos.x += (Math.random() - 0.5) * 3;
    targetPos.y += (Math.random() - 0.5) * 3;
    targetPos.z += (Math.random() - 0.5) * 3;

    targetPositions[i * 3] = targetPos.x;
    targetPositions[i * 3 + 1] = targetPos.y;
    targetPositions[i * 3 + 2] = targetPos.z;

    const color = serviceColors[serviceId].clone();
    color.lerp(new THREE.Color('#C9A34E'), 0.3);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    sizes[i] = 0.5 + Math.random() * 1.5;
  }

  return { positions, colors, sizes, serviceIds, targetPositions, initialPositions };
}

const particleData = generateParticleData(PARTICLE_COUNT);

const ConstellationPoints = ({
  scrollProgress,
  activeService,
}: {
  scrollProgress: number;
  activeService: number;
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry as THREE.BufferGeometry;
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    const colorAttr = geometry.getAttribute('color') as THREE.BufferAttribute;
    const sizeAttr = geometry.getAttribute('size') as THREE.BufferAttribute;

    const time = state.clock.getElapsedTime();
    const progress = scrollProgress;
    const active = activeService;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const sid = particleData.serviceIds[i];
      const initX = particleData.initialPositions[i * 3];
      const initY = particleData.initialPositions[i * 3 + 1];
      const initZ = particleData.initialPositions[i * 3 + 2];

      const targetX = particleData.targetPositions[i * 3];
      const targetY = particleData.targetPositions[i * 3 + 1];
      const targetZ = particleData.targetPositions[i * 3 + 2];

      let targetProgress = progress;

      if (active >= 0 && sid === active) {
        targetProgress = Math.min(1, progress * 2);
      } else if (active >= 0 && sid !== active) {
        targetProgress = Math.max(0, (progress - 0.15 * (active + 1)) * 1.5);
      }

      const easeProgress = targetProgress < 0.5
        ? 2 * targetProgress * targetProgress
        : 1 - Math.pow(-2 * targetProgress + 2, 2) / 2;

      const noiseX = Math.sin(time * 0.5 + i * 0.1) * 0.02;
      const noiseY = Math.cos(time * 0.3 + i * 0.15) * 0.02;
      const noiseZ = Math.sin(time * 0.4 + i * 0.05) * 0.02;

      const newX = THREE.MathUtils.lerp(initX, targetX, easeProgress) + noiseX;
      const newY = THREE.MathUtils.lerp(initY, targetY, easeProgress) + noiseY;
      const newZ = THREE.MathUtils.lerp(initZ, targetZ, easeProgress) + noiseZ;

      posAttr.setXYZ(i, newX, newY, newZ);

      const color = serviceColors[sid].clone();
      const goldInfluence = Math.sin(time + i) * 0.1 + 0.1;
      color.lerp(new THREE.Color('#C9A34E'), goldInfluence * easeProgress);
      colorAttr.setXYZ(i, color.r, color.g, color.b);

      const baseSize = particleData.sizes[i];
      const pulseSize = 1 + Math.sin(time * 2 + i) * 0.1;
      sizeAttr.setX(i, baseSize * pulseSize * (0.5 + easeProgress * 0.5));
    }

    posAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
  });

  return (
    <Points
      ref={pointsRef}
      position={[0, 0, -5]}
    >
      <bufferGeometry>
        <bufferAttribute name="position" array={particleData.positions} itemSize={3} />
        <bufferAttribute name="color" array={particleData.colors} itemSize={3} />
        <bufferAttribute name="size" array={particleData.sizes} itemSize={1} />
      </bufferGeometry>
      <DreiPointMaterial
        size={1}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const ServiceLabels = ({ activeService }: { activeService: number }) => {
  return (
    <>
      {servicePositions.map((pos, index) => (
        <Html
          key={index}
          position={[pos.x, pos.y, pos.z]}
          style={{
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            opacity: activeService === index ? 1 : 0.3,
            transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: activeService === index ? 'none' : 'blur(2px)',
          }}
          className="text-caption text-text-secondary font-display uppercase tracking-widest text-center"
        >
          {serviceNames[index]}
          {activeService === index && <span className="text-gold ml-1">●</span>}
        </Html>
      ))}
    </>
  );
};

const ConstellationScene = ({
  scrollProgress = 0,
  activeService = -1,
}: {
  scrollProgress: number;
  activeService: number;
}) => {
  return (
    <>
      <Stars radius={100} depth={50} />
      <ConstellationPoints scrollProgress={scrollProgress} activeService={activeService} />
      <ServiceLabels activeService={activeService} />
      <ambientLight intensity={0.5} color="#F5F3EC" />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#C9A34E" />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#3B82F6" decay={2} />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#8B5CF6" decay={2} />
    </>
  );
};

export function ConstellationCanvas({
  scrollProgress = 0,
  activeService = -1,
  className,
}: {
  scrollProgress?: number;
  activeService?: number;
  className?: string;
}) {
  return (
    <div className={cn('relative w-full h-full', className)} style={{ touchAction: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 25], fov: 50 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false, powerPreference: 'high-performance' }}
        shadows={false}
        style={{ touchAction: 'none' }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <ConstellationScene
          scrollProgress={scrollProgress}
          activeService={activeService}
        />
      </Canvas>
    </div>
  );
}

export function useConstellationScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeService, setActiveService] = useState(-1);

  useEffect(() => {
    const handleScroll = () => {
      const progress = getScrollProgress();
      setScrollProgress(progress);

      const serviceIndex = Math.floor(progress * SERVICES_COUNT * 1.2);
      setActiveService(Math.min(Math.max(serviceIndex, -1), SERVICES_COUNT - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress, activeService };
}