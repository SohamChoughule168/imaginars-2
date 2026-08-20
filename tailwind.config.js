/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#0A0E14',
          light: '#111827',
        },
        surface: {
          DEFAULT: '#FAF8F2',
          dark: '#1F2937',
        },
        gold: {
          DEFAULT: '#C9A34E',
          light: '#D4B56E',
          dark: '#A6853A',
        },
        text: {
          primary: '#F5F3EC',
          secondary: '#9CA3AF',
          muted: '#6B7280',
          inverse: '#0A0E14',
        },
        border: {
          DEFAULT: 'rgba(245, 243, 236, 0.1)',
          light: 'rgba(245, 243, 236, 0.2)',
        },
      },
      fontFamily: {
        display: ['var(--font-clash)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero-desktop': ['clamp(96px, 12vw, 176px)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'hero-tablet': ['clamp(64px, 10vw, 96px)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'hero-mobile': ['clamp(40px, 8vw, 64px)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'heading-1': ['clamp(48px, 6vw, 72px)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading-2': ['clamp(36px, 4vw, 48px)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'heading-3': ['clamp(28px, 3vw, 36px)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-4': ['clamp(24px, 2.5vw, 30px)', { lineHeight: '1.25' }],
        'body-lg': ['clamp(18px, 2vw, 20px)', { lineHeight: '1.6' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],
        'caption': ['12px', { lineHeight: '1.4', letterSpacing: '0.05em' }],
        'micro': ['11px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
      spacing: {
        '0': '0',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
        '40': '160px',
        '48': '192px',
      },
      maxWidth: {
        'content': '1440px',
        'prose': '720px',
      },
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'DEFAULT': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      },
      borderWidth: {
        'hairline': '0.5px',
        'thin': '1px',
      },
      transitionDuration: {
        'micro': '120ms',
        'fast': '240ms',
        'normal': '400ms',
        'slow': '800ms',
        'slower': '1200ms',
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      boxShadow: {
        'glow': '0 0 60px -20px rgba(201, 163, 78, 0.3)',
        'glow-sm': '0 0 30px -10px rgba(201, 163, 78, 0.2)',
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
        'elevation-2': '0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)',
        'elevation-3': '0 12px 28px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.2)',
        'inner-glow': 'inset 0 0 60px -20px rgba(201, 163, 78, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'atmospheric': 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201, 163, 78, 0.08) 0%, transparent 70%)',
        'atmospheric-dark': 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201, 163, 78, 0.04) 0%, transparent 70%)',
        'mesh': 'linear-gradient(135deg, rgba(201, 163, 78, 0.03) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(201, 163, 78, 0.05) 0%, transparent 70%)',
      },
      animation: {
        'fade-in': 'fadeIn 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'count-up': 'countUp 2000ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2000ms linear infinite',
        'float': 'float 6000ms ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3000ms ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}