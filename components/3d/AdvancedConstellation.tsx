'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { 
  Points, 
  Html,
  OrthographicCamera,
  useFBO
} from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { cn, getScrollProgress } from '@/lib/utils';
import atmosphereVert from './shaders/atmosphere.glsl';
import atmosphereFrag from './shaders/atmosphere.glsl';
import particleVert from './shaders/particles.glsl';
import particleFrag from './shaders/particles-frag.glsl';
import bloomFrag from './shaders/bloom.glsl';

const PARTICLE_COUNT = 5000;
const SERVICES_COUNT = 6;

const servicePositions = [
  new THREE.Vector3(-10, 5, -2),
  new THREE.Vector3(0, 8, -2),
  new THREE.Vector3(10, 5, -2),
  new THREE.Vector3(-10, -5, -2),
  new THREE.Vector3(0, -8, -2),
  new THREE.Vector3(10, -5, -2),
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

interface ParticleData {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  serviceIds: Float32Array;
  initialPos: Float32Array;
  targetPos: Float32Array;
  phases: Float32Array;
  ids: Float32Array;
}

function generateParticleData(count: number): ParticleData {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const serviceIds = new Float32Array(count);
  const initialPos = new Float32Array(count * 3);
  const targetPos = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const ids = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // Initial: sphere shell
    const radius = 18 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    initialPos[i * 3] = x;
    initialPos[i * 3 + 1] = y;
    initialPos[i * 3 + 2] = z;

    const serviceId = Math.floor(Math.random() * SERVICES_COUNT);
    serviceIds[i] = serviceId;
    ids[i] = i;

    const target = servicePositions[serviceId].clone();
    target.x += (Math.random() - 0.5) * 4;
    target.y += (Math.random() - 0.5) * 4;
    target.z += (Math.random() - 0.5) * 4;

    targetPos[i * 3] = target.x;
    targetPos[i * 3 + 1] = target.y;
    targetPos[i * 3 + 2] = target.z;

    const color = serviceColors[serviceId].clone();
    color.lerp(new THREE.Color('#C9A34E'), 0.2);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    sizes[i] = 0.8 + Math.random() * 1.2;
    phases[i] = Math.random() * Math.PI * 2;
  }

  return { positions, colors, sizes, serviceIds, initialPos, targetPos, phases, ids };
}

const particleData = generateParticleData(PARTICLE_COUNT);

// Atmosphere Skybox
const Atmosphere = () => {
  const { scrollProgress } = useThree() as any;
  const time = useRef(0);
  
  useFrame((_, delta) => {
    time.current += delta;
  });

  return (
    <mesh geometry={new THREE.SphereGeometry(100, 32, 32)}>
      <AtmosphereMaterial time={time.current} scrollProgress={scrollProgress || 0} />
    </mesh>
  );
};

const AtmosphereMaterial = ({
  time,
  scrollProgress
}: { time: number; scrollProgress: number }) => {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    materialRef.current = new THREE.ShaderMaterial({
      vertexShader: atmosphereVert,
      fragmentShader: atmosphereFrag,
      uniforms: {
        uTime: { value: time },
        uScrollProgress: { value: scrollProgress },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uCameraPos: { value: new THREE.Vector3() },
        uMouse: { value: new THREE.Vector2() },
      },
      side: THREE.BackSide,
      depthWrite: false,
    });
  }, []);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
      materialRef.current.uniforms.uScrollProgress.value = scrollProgress || 0;
    }
  });

  if (!materialRef.current) return null;

  return <primitive object={materialRef.current} />;
};

// Advanced Particle System
const ConstellationParticles = ({
  scrollProgress = 0,
  activeService = -1,
}: {
  scrollProgress: number;
  activeService: number;
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!pointsRef.current) return;
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(particleData.positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(particleData.colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(particleData.sizes, 1));
    geometry.setAttribute('serviceId', new THREE.BufferAttribute(particleData.serviceIds, 1));
    geometry.setAttribute('initialPos', new THREE.BufferAttribute(particleData.initialPos, 3));
    geometry.setAttribute('targetPos', new THREE.BufferAttribute(particleData.targetPos, 3));
    geometry.setAttribute('phase', new THREE.BufferAttribute(particleData.phases, 1));
    geometry.setAttribute('particleId', new THREE.BufferAttribute(particleData.ids, 1));
    geometryRef.current = geometry;

    materialRef.current = new THREE.ShaderMaterial({
      vertexShader: particleVert,
      fragmentShader: particleFrag,
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: scrollProgress },
        uActiveService: { value: activeService },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uCameraPos: { value: new THREE.Vector3() },
      },
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
    });

    pointsRef.current.geometry = geometryRef.current;
    pointsRef.current.material = materialRef.current;

    return () => {
      geometryRef.current?.dispose();
      materialRef.current?.dispose();
    };
  }, []);

  useFrame((state, delta) => {
    timeRef.current += delta;
    
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = timeRef.current;
      materialRef.current.uniforms.uScrollProgress.value = scrollProgress;
      materialRef.current.uniforms.uActiveService.value = activeService;
    }
    
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
      pointsRef.current.rotation.x = Math.sin(timeRef.current * 0.08) * 0.08;
    }
  });

  if (!geometryRef.current || !materialRef.current) return null;

  return (
    <Points ref={pointsRef} position={[0, 0, -8]}>
      <primitive object={geometryRef.current} />
      <primitive object={materialRef.current} />
    </Points>
  );
};

// Service Labels with 3D positioning
const ServiceLabels = ({ activeService }: { activeService: number }) => {
  return (
    <>
      {servicePositions.map((pos, index) => (
        <Html
          key={index}
          position={[pos.x, pos.y, pos.z - 2]}
          style={{
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            opacity: activeService === index ? 1 : 0.25,
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: activeService === index ? 'none' : 'blur(4px) grayscale(0.5)',
            transformOrigin: 'center center',
          }}
          className="text-caption text-text-secondary font-display uppercase tracking-widest text-center pointer-events-none select-none"
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span>{serviceNames[index]}</span>
            {activeService === index && (
              <span className="text-gold" style={{ fontSize: '10px', fontWeight: 600 }}>
                ◈ ACTIVE
              </span>
            )}
          </div>
        </Html>
      ))}
    </>
  );
};

// Bloom Effect Pass
const BloomPass = () => {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef<EffectComposer | null>(null);
  const bloomPassRef = useRef<ShaderPass | null>(null);

  useEffect(() => {
    const renderTarget = new THREE.WebGLRenderTarget(size.width, size.height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
    });

    const composer = new EffectComposer(gl, renderTarget);
    composer.addPass(new RenderPass(scene, camera));

    const bloomMaterial = new THREE.ShaderMaterial({
      fragmentShader: bloomFrag,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      uniforms: {
        uTexture: { value: null },
        uTime: { value: 0 },
        uIntensity: { value: 0.4 },
        uThreshold: { value: 0.7 },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      },
    });

    const bloomPass = new ShaderPass(bloomMaterial);
    composer.addPass(bloomPass);

    composerRef.current = composer;
    bloomPassRef.current = bloomPass;

    return () => {
      composer.dispose();
      renderTarget.dispose();
      bloomMaterial.dispose();
    };
  }, [gl, scene, camera, size]);

  useFrame((state, delta) => {
    if (composerRef.current && bloomPassRef.current) {
      bloomPassRef.current.material.uniforms.uTexture.value = composerRef.current.readBuffer.texture;
      bloomPassRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
      bloomPassRef.current.material.uniforms.uResolution.value.set(size.width, size.height);
      
      composerRef.current.render(delta);
    }
  }, 1);

  return null;
};

// Main Constellation Scene
const ConstellationScene = ({
  scrollProgress = 0,
  activeService = -1,
}: {
  scrollProgress: number;
  activeService: number;
}) => {
  return (
    <>
      <Atmosphere />
      <ConstellationParticles scrollProgress={scrollProgress} activeService={activeService} />
      <ServiceLabels activeService={activeService} />
      
      <ambientLight intensity={0.3} color="#F5F3EC" />
      <directionalLight position={[15, 15, 10]} intensity={0.8} color="#C9A34E" castShadow />
      <pointLight position={[-8, 8, 8]} intensity={0.6} color="#3B82F6" decay={2} distance={50} />
      <pointLight position={[8, -8, 8]} intensity={0.6} color="#8B5CF6" decay={2} distance={50} />
      <pointLight position={[0, 0, 20]} intensity={0.3} color="#C9A34E" decay={2} distance={100} />
      
      <BloomPass />
    </>
  );
};

// Export the main canvas component
export function AdvancedConstellationCanvas({
  scrollProgress = 0,
  activeService = -1,
  className,
  onReady,
}: {
  scrollProgress?: number;
  activeService?: number;
  className?: string;
  onReady?: () => void;
}) {
  return (
    <div className={cn('relative w-full h-full', className)} style={{ touchAction: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 50, near: 0.1, far: 200 }}
        gl={{ 
          antialias: true, 
          alpha: true, 
          preserveDrawingBuffer: false, 
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
          premultipliedAlpha: true,
        }}
        shadows={false}
        style={{ touchAction: 'none' }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;
          onReady?.();
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

// Hook for scroll progress
export function useConstellationScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeService, setActiveService] = useState(-1);

  useEffect(() => {
    const handleScroll = () => {
      const progress = getScrollProgress();
      setScrollProgress(progress);

      const serviceIndex = Math.floor(progress * SERVICES_COUNT * 1.3);
      setActiveService(Math.min(Math.max(serviceIndex, -1), SERVICES_COUNT - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress, activeService };
}