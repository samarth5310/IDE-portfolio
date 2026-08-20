/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ide: {
          bg: 'var(--ide-bg)',
          sidebar: 'var(--ide-sidebar)',
          activity: 'var(--ide-activity)',
          editor: 'var(--ide-editor)',
          tabActive: 'var(--ide-tab-active)',
          tabInactive: 'var(--ide-tab-inactive)',
          tabHover: 'var(--ide-tab-hover)',
          border: 'var(--ide-border)',
          borderLight: 'var(--ide-border-light)',
          status: 'var(--ide-status)',
          accent: 'var(--ide-accent)',
          accentHover: 'var(--ide-accent-hover)',
          terminal: 'var(--ide-terminal)',
          panel: 'var(--ide-panel)',
          selection: 'var(--ide-selection)',
          text: 'var(--ide-text)',
          muted: 'var(--ide-muted)',
          keyword: 'var(--ide-keyword)',
          string: 'var(--ide-string)',
          function: 'var(--ide-function)',
          comment: 'var(--ide-comment)',
          number: 'var(--ide-number)',
          variable: 'var(--ide-variable)',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', '"Cascadia Code"', 'Consolas', 'monospace'],
        display: ['"Syne"', '"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'cursor-blink': 'blink 1s step-start infinite',
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
