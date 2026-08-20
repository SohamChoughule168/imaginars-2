// Advanced Particle Shader for Constellation
// GPU-simulated particles with physics

uniform float uTime;
uniform float uScrollProgress;
uniform int uActiveService;
uniform vec2 uResolution;
uniform vec3 uCameraPos;

attribute vec3 position;
attribute vec3 color;
attribute float size;
attribute float serviceId;
attribute vec3 initialPos;
attribute vec3 targetPos;
attribute float phase;

varying vec3 vColor;
attribute float particleId;

varying float vSize;
varying float vServiceId;
varying float vPhase;
varying vec3 vInitialPos;
varying vec3 vTargetPos;

#define PI 3.14159265359

void main() {
    vColor = color;
    vSize = size;
    vServiceId = serviceId;
    vPhase = phase;
    vInitialPos = initialPos;
    vTargetPos = targetPos;
    
    // Base position
    vec3 pos = position;
    
    // Scroll progress with easing
    float progress = uScrollProgress;
    float serviceProgress = progress;
    
    // Service-specific activation
    if(uActiveService >= 0) {
        if(int(serviceId) == uActiveService) {
            serviceProgress = min(1.0, progress * 2.5);
        } else {
            float serviceOrder = serviceId + 1.0;
            serviceProgress = max(0.0, (progress - 0.12 * serviceOrder) * 1.8);
        }
    }
    
    // Smooth easing
    float eased = serviceProgress < 0.5 
        ? 2.0 * serviceProgress * serviceProgress 
        : 1.0 - pow(-2.0 * serviceProgress + 2.0, 2.0) / 2.0;
    
    // Morph from initial to target
    pos = mix(initialPos, targetPos, eased);
    
    // Add organic motion
    float id = particleId;
    float t = uTime;
    
    // Multi-layered noise motion
    pos.x += sin(t * 0.3 + id * 0.1) * 0.03 * (1.0 - eased * 0.5);
    pos.y += cos(t * 0.25 + id * 0.15) * 0.03 * (1.0 - eased * 0.5);
    pos.z += sin(t * 0.2 + id * 0.07) * 0.03 * (1.0 - eased * 0.5);
    
    // Orbital motion around service centers when active
    if(int(serviceId) == uActiveService && uActiveService >= 0) {
        float orbitSpeed = 0.15 + id * 0.001;
        float orbitRadius = 0.5 + sin(id * 1.7) * 0.3;
        float orbitAngle = t * orbitSpeed + id * 2.0;
        pos.x += cos(orbitAngle) * orbitRadius * eased * 0.3;
        pos.z += sin(orbitAngle) * orbitRadius * eased * 0.3;
    }
    
    // Breathing pulse
    float pulse = 1.0 + sin(t * 1.5 + id * 0.5) * 0.08;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * pulse * (0.4 + eased * 0.6) * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}