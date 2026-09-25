/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-yellow': '#FFB800',
        'primary-yellow-hover': '#F59E0B',
        'primary-orange': '#FF8A00',
        'text-slate-primary': '#0F172A',
        'text-slate-muted': '#475569',
        'bg-cream-soft': '#FFFDF7',
        'bg-surface-soft': '#F8FAFC',
        'border-neutral-light': '#E2E8F0',
        brand: {
          science: '#0A7A51',
          coding: '#2E5CFF',
          math: '#8A600D',
          english: '#12706B',
          finance: '#AF1DE2',
          robotics: '#E51A32',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'Figtree', 'sans-serif'],
        satoshi: ['var(--font-satoshi)', 'Satoshi', 'sans-serif'],
        display: ['var(--font-plus-jakarta-sans)', 'Plus Jakarta Sans', 'sans-serif'],
        heading: ['var(--font-plus-jakarta-sans)', 'Plus Jakarta Sans', 'var(--font-satoshi)', 'sans-serif'],
      },
      boxShadow: {
        'pill-hover': '0 10px 25px -5px rgba(255, 184, 0, 0.4), 0 8px 10px -6px rgba(255, 184, 0, 0.2)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        'card-soft': '0 4px 24px -2px rgba(15, 23, 42, 0.06)',
        'card-modern': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 20px 35px -5px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 20px rgba(245, 158, 11, 0.3)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};
