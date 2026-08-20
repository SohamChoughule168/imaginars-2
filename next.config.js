/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'three', 'gsap', 'framer-motion'],
  },
  webpack: (config, { isServer }) => {
    // GLSL shader loader
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source',
    });

    // Handle canvas for node environment
    if (isServer) {
      config.externals = [...(config.externals || []), 'canvas'];
    }

    return config;
  },
};

module.exports = nextConfig