// Custom Bloom/Godrays Shader
// High-quality separable bloom with chromatic aberration

uniform sampler2D uTexture;
uniform float uTime;
uniform float uIntensity;
uniform float uThreshold;
uniform vec2 uResolution;
uniform vec2 uMouse;

varying vec2 vUv;

// High-quality Gaussian blur (separable)
vec3 blur9(sampler2D tex, vec2 uv, vec2 dir, float sigma) {
    vec3 color = vec3(0.0);
    float totalWeight = 0.0;
    
    // 9-tap Gaussian weights
    float weights[5] = float[](0.227027, 0.1945946, 0.1216216, 0.054054, 0.016216);
    float offsets[5] = float[](0.0, 1.384615, 3.230769, 5.076923, 6.923077);
    
    // Center tap
    color += texture2D(tex, uv).rgb * weights[0];
    totalWeight += weights[0];
    
    for(int i = 1; i < 5; i++) {
        float offset = offsets[i];
        vec2 sampleOffset = dir * offset;
        
        color += texture2D(tex, uv + sampleOffset).rgb * weights[i];
        color += texture2D(tex, uv - sampleOffset).rgb * weights[i];
        totalWeight += weights[i] * 2.0;
    }
    
    return color / totalWeight;
}

// Chromatic aberration
vec3 chromaticAberration(sampler2D tex, vec2 uv, float amount) {
    vec2 center = vec2(0.5);
    vec2 dir = uv - center;
    float dist = length(dir);
    
    float aberration = dist * amount * 0.005;
    
    float r = texture2D(tex, uv + dir * aberration * 1.0).r;
    float g = texture2D(tex, uv).g;
    float b = texture2D(tex, uv - dir * aberration * 1.0).b;
    
    return vec3(r, g, b);
}

// Lens dirt/scratches
float lensDirt(vec2 uv, float time) {
    // Procedural lens imperfections
    float dirt = 0.0;
    
    // Scratches
    for(int i = 0; i < 3; i++) {
        float scratch = sin(uv.x * 50.0 + float(i) * 2.0 + time * 0.1) * 0.5;
        scratch = step(0.99, abs(scratch));
        dirt += scratch * 0.01;
    }
    
    // Dust spots
    vec2 dustUv = uv * 3.0;
    for(int i = 0; i < 5; i++) {
        vec2 p = fract(dustUv + vec2(float(i) * 1.7, float(i) * 2.3));
        float d = length(p - 0.5);
        dirt += step(0.48, d) * step(0.5, d) * 0.005;
    }
    
    return dirt;
}

void main() {
    vec2 uv = vUv;
    vec3 color = texture2D(uTexture, uv).rgb;
    
    // Extract bright areas for bloom
    float brightness = dot(color, vec3(0.2126, 0.7152, 0.0722));
    vec3 bloomColor = vec3(0.0);
    
    if(brightness > uThreshold) {
        // Multi-pass bloom
        vec2 blurDir = vec2(1.0 / uResolution.x, 0.0);
        vec3 hBlur = blur9(uTexture, uv, blurDir, 2.0);
        
        blurDir = vec2(0.0, 1.0 / uResolution.y);
        bloomColor = blur9(uTexture, uv, blurDir, 2.0);
        
        // Tint bloom with gold
        bloomColor *= vec3(1.0, 0.85, 0.4) * uIntensity;
    }
    
    // Combine original with bloom
    color += bloomColor;
    
    // Subtle chromatic aberration at edges
    color = chromaticAberration(uTexture, uv, 0.5);
    
    // Lens imperfections
    float dirt = lensDirt(uv, uTime);
    color += vec3(1.0, 0.9, 0.7) * dirt * 0.3;
    
    // Vignette
    float vignette = 1.0 - length(uv - 0.5) * 0.3;
    color *= vignette;
    
    // Film grain
    float grain = (fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.01;
    color += grain;
    
    // Tone mapping (ACES approximation)
    color = color / (color + vec3(0.15));
    color = pow(color, vec3(1.0 / 2.2));
    
    gl_FragColor = vec4(color, 1.0);
}