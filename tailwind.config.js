/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        fg: 'var(--color-fg)',
        accent: 'var(--color-accent)',
        primary: 'var(--color-primary)',
        surface: 'var(--color-surface)',
        textPrimary: 'var(--color-text-primary)',
        textSecondary: 'var(--color-text-secondary)',
        border: 'var(--color-border)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '10px',
        'sm': '6px',
        'pill': '9999px',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(220, 25%, 40%, 0.1)',
        'finance': '0 8px 32px rgba(255, 215, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-gold': 'pulseGold 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 215, 0, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(255, 215, 0, 0)' },
        },
      },
    },
  },
  plugins: [],
}
