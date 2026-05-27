/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode
        cream: '#FAF8F3',
        ivory: '#F5F1EB',
        beige: '#E8DED3',
        gold: '#D4AF37',
        charcoal: '#2C2C2C',
        brown: '#5C4033',
        
        // Dark mode
        'dark-bg': '#0F0F0F',
        'dark-surface': '#1A1A1A',
        'dark-gold': '#C9A961',
      },
      fontFamily: {
        'serif-heading': ['Crimson Text', 'Georgia', 'serif'],
        'serif-body': ['Lora', 'Georgia', 'serif'],
        'sans-modern': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '44px'],
        '5xl': ['48px', '52px'],
        '6xl': ['60px', '68px'],
      },
      spacing: {
        gutter: '2rem',
        'gutter-lg': '4rem',
      },
      boxShadow: {
        'elevation-1': '0 2px 8px rgba(0,0,0,0.08)',
        'elevation-2': '0 4px 16px rgba(0,0,0,0.12)',
        'elevation-3': '0 8px 32px rgba(0,0,0,0.16)',
        'premium': '0 20px 50px rgba(212, 175, 55, 0.15)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
};
