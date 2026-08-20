// Particle Fragment Shader
// With glow, color shifting, and depth

uniform float uTime;
uniform float uScrollProgress;
uniform int uActiveService;

varying vec3 vColor;
varying float vSize;
varying float vServiceId;
varying float vPhase;

#define PI 3.14159265359

void main() {
    // Circular particle with soft edges
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    
    // Soft circular falloff
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha = pow(alpha, 1.5);
    
    // Gold influence based on scroll and time
    float goldInfluence = sin(uTime * 0.8 + vPhase * 10.0) * 0.15 + 0.2;
    float scrollGold = uScrollProgress * 0.3;
    goldInfluence += scrollGold;
    
    // Service activation glow
    float serviceGlow = 0.0;
    if(int(vServiceId) == uActiveService && uActiveService >= 0) {
        serviceGlow = 0.5 + sin(uTime * 2.0 + vPhase * 5.0) * 0.3;
    }
    
    // Color mixing
    vec3 baseColor = vColor;
    vec3 goldColor = vec3(0.85, 0.65, 0.15);
    vec3 activeColor = vec3(1.0, 0.8, 0.2);
    
    vec3 finalColor = mix(baseColor, goldColor, goldInfluence);
    finalColor = mix(finalColor, activeColor, serviceGlow * 0.5);
    
    // Additive glow for active service
    float glow = serviceGlow * (1.0 - dist * 2.0);
    finalColor += activeColor * glow * 0.3;
    
    // Radial gradient for depth
    float radial = 1.0 - dist * 0.5;
    finalColor *= radial;
    alpha *= radial;
    
    // Output with additive blending
    gl_FragColor = vec4(finalColor, alpha * 0.9);
    
    // Discard invisible particles
    if(alpha < 0.01) discard;
}