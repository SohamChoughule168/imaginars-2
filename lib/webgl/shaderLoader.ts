// WebGL Shader Loader Utilities
// For loading and compiling GLSL shaders with hot reload support

import * as THREE from 'three';

export interface ShaderUniforms {
  [key: string]: THREE.IUniform<any>;
}

export interface ShaderDefinition {
  vertexShader: string;
  fragmentShader: string;
  uniforms?: ShaderUniforms;
  defines?: { [key: string]: any };
  extensions?: { [key: string]: boolean };
}

export class ShaderManager {
  private cache: Map<string, THREE.ShaderMaterial> = new Map();
  private pending: Map<string, Promise<THREE.ShaderMaterial>> = new Map();

  async loadShader(name: string, definition: ShaderDefinition): Promise<THREE.ShaderMaterial> {
    // Check cache
    if (this.cache.has(name)) {
      return this.cache.get(name)!;
    }

    // Check if already loading
    if (this.pending.has(name)) {
      return this.pending.get(name)!;
    }

    // Create loading promise
    const promise = this.compileShader(definition);
    this.pending.set(name, promise);

    try {
      const material = await promise;
      this.cache.set(name, material);
      this.pending.delete(name);
      return material;
    } catch (error) {
      this.pending.delete(name);
      throw error;
    }
  }

  private async compileShader(definition: ShaderDefinition): Promise<THREE.ShaderMaterial> {
    // Process includes and defines
    const vertexShader = this.processIncludes(definition.vertexShader);
    const fragmentShader = this.processIncludes(definition.fragmentShader);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: definition.uniforms || {},
      defines: definition.defines || {},
      extensions: definition.extensions || {
        derivatives: true,
        fragDepth: true,
        drawBuffers: true,
        shaderTextureLOD: true,
      },
      transparent: true,
      depthWrite: false,
    });

    // Compile synchronously to catch errors early
    material.needsUpdate = true;
    
    return material;
  }

  private processIncludes(shader: string): string {
    // Simple include processor for @include "path"
    return shader.replace(/@include\s+"([^"]+)"/g, (match, path) => {
      // In a real implementation, this would load the included file
      console.warn(`Include not implemented: ${path}`);
      return '';
    });
  }

  getShader(name: string): THREE.ShaderMaterial | undefined {
    return this.cache.get(name);
  }

  dispose(): void {
    this.cache.forEach(material => material.dispose());
    this.cache.clear();
    this.pending.clear();
  }
}

export const shaderManager = new ShaderManager();

// Uniform helpers
export const createUniform = (value: any): THREE.IUniform<any> => ({ value });

export const commonUniforms = {
  time: createUniform(0),
  resolution: createUniform(new THREE.Vector2()),
  mouse: createUniform(new THREE.Vector2()),
  scrollProgress: createUniform(0),
  cameraPos: createUniform(new THREE.Vector3()),
} as const;

// Shader chunks for reuse
export const shaderChunks = {
  // Noise functions
  noise: `
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    
    float noise(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      
      float a = hash(i.xy);
      float b = hash(i.xy + vec2(1.0, 0.0));
      float c = hash(i.xy + vec2(0.0, 1.0));
      float d = hash(i.xy + vec2(1.0, 1.0));
      
      return mix(mix(mix(a, b, f.x), mix(c, d, f.x), f.y),
                 mix(mix(a, b, f.x), mix(c, d, f.x), f.y), f.z);
    }
    
    float fbm(vec3 p, int octaves) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      for(int i = 0; i < 6; i++) {
        if(i >= octaves) break;
        value += amplitude * noise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }
  `,
  
  // Easing functions
  easing: `
    float easeInOutCubic(float t) {
      return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
    }
    
    float easeOutExpo(float t) {
      return t == 1.0 ? 1.0 : 1.0 - pow(2.0, -10.0 * t);
    }
    
    float easeInOutExpo(float t) {
      return t == 0.0 ? 0.0 : t == 1.0 ? 1.0 :
        t < 0.5 ? pow(2.0, 20.0 * t - 10.0) / 2.0 :
        (2.0 - pow(2.0, -20.0 * t + 10.0)) / 2.0;
    }
  `,
  
  // Color utilities
  colorUtils: `
    vec3 hsv2rgb(vec3 c) {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }
    
    vec3 rgb2hsv(vec3 c) {
      vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
      vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
      vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
      float d = q.x - min(q.w, q.y);
      float e = 1.0e-10;
      return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
    }
    
    vec3 lerpColor(vec3 a, vec3 b, float t) {
      return mix(a, b, t);
    }
  `,
  
  // Math utilities
  mathUtils: `
    #define PI 3.14159265359
    #define TAU 6.28318530718
    #define GOLDEN_RATIO 1.61803398875
    
    float remap(float value, float inMin, float inMax, float outMin, float outMax) {
      return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin);
    }
    
    vec3 rotateX(vec3 v, float angle) {
      float c = cos(angle), s = sin(angle);
      return vec3(v.x, v.y * c - v.z * s, v.y * s + v.z * c);
    }
    
    vec3 rotateY(vec3 v, float angle) {
      float c = cos(angle), s = sin(angle);
      return vec3(v.x * c + v.z * s, v.y, -v.x * s + v.z * c);
    }
    
    vec3 rotateZ(vec3 v, float angle) {
      float c = cos(angle), s = sin(angle);
      return vec3(v.x * c - v.y * s, v.x * s + v.y * c, v.z);
    }
  `,
};

// Create a full shader with chunks
export function createShaderWithChunks(
  vertexChunks: string[],
  fragmentChunks: string[],
  additionalVert = '',
  additionalFrag = ''
): { vertexShader: string; fragmentShader: string } {
  const vert = [
    shaderChunks.mathUtils,
    shaderChunks.easing,
    shaderChunks.noise,
    ...vertexChunks,
    additionalVert,
  ].join('\n');

  const frag = [
    shaderChunks.mathUtils,
    shaderChunks.easing,
    shaderChunks.noise,
    shaderChunks.colorUtils,
    ...fragmentChunks,
    additionalFrag,
  ].join('\n');

  return { vertexShader: vert, fragmentShader: frag };
}