// Atmosphere/Background Shader
// Volumetric fog with gold dust particles

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uCameraPos;
uniform float uScrollProgress;
uniform vec2 uMouse;

varying vec3 vWorldPosition;
varying vec2 vUv;

#define PI 3.14159265359
#define TAU 6.28318530718

// Hash function
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// 3D noise
float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i.xy);
    float b = hash(i.xy + vec2(1.0, 0.0));
    float c = hash(i.xy + vec2(0.0, 1.0));
    float d = hash(i.xy + vec2(1.0, 1.0));
    
    float e = hash(i.xy + vec2(0.0, 0.0) + i.z);
    float f1 = hash(i.xy + vec2(1.0, 0.0) + i.z);
    float g = hash(i.xy + vec2(0.0, 1.0) + i.z);
    float h = hash(i.xy + vec2(1.0, 1.0) + i.z);
    
    return mix(mix(mix(a, b, f.x), mix(c, d, f.x), f.y),
               mix(mix(e, f1, f.x), mix(g, h, f.x), f.y), f.z);
}

// Fractal Brownian Motion
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

// Gold dust particles
float goldDust(vec3 pos, float time) {
    vec3 p = pos * 0.5;
    p.x += time * 0.02;
    p.y += sin(time * 0.3 + pos.x * 0.1) * 0.1;
    p.z += cos(time * 0.2 + pos.y * 0.1) * 0.1;
    
    float n = fbm(p, 4);
    float particles = step(0.98, n + sin(pos.x * 10.0 + time) * 0.02);
    
    return particles;
}

vec3 atmosphereColor(vec3 dir, float time, float scroll) {
    // Base atmosphere gradient
    float horizon = max(0.0, dir.y);
    float zenith = 1.0 - horizon;
    
    vec3 nightColor = vec3(0.04, 0.05, 0.08);
    vec3 horizonColor = vec3(0.15, 0.1, 0.05);
    vec3 goldGlow = vec3(0.8, 0.6, 0.2) * 0.15;
    
    vec3 color = mix(nightColor, horizonColor, pow(horizon, 0.5));
    color += goldGlow * pow(horizon, 3.0);
    
    // Scroll influence - darker as we scroll
    color *= 1.0 - scroll * 0.3;
    
    // Time-based subtle breathing
    float breath = sin(time * 0.5) * 0.02 + 0.98;
    color *= breath;
    
    return color;
}

void main() {
    vec3 color = atmosphereColor(normalize(vWorldPosition), uTime, uScrollProgress);
    
    // Add gold dust
    float dust = goldDust(vWorldPosition, uTime);
    color += vec3(0.8, 0.6, 0.2) * dust * 0.5;
    
    // Subtle vignette
    float vignette = 1.0 - length(vUv - 0.5) * 0.5;
    color *= vignette;
    
    gl_FragColor = vec4(color, 1.0);
}