import type { Config } from 'tailwindcss'

/**
 * Tailwind config with DESIGN.md tokens
 * 이 파일의 theme.extend는 docs/DESIGN.md Section 2/3/5/6과 1:1 매핑되어야 함
 * DESIGN.md 변경 시 이 파일도 함께 업데이트
 */
export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#5E6AD2',
          hover: '#7170FF',
          subtle: '#F4F5FB',
        },
        bg: {
          page: '#FFFFFF',
          'page-dark': '#08090A',
          subtle: '#FAFBFC',
          'subtle-dark': '#0F1011',
          card: '#FFFFFF',
          'card-dark': '#131416',
          elevated: '#FFFFFF',
          'elevated-dark': '#1C1D1F',
        },
        text: {
          primary: '#0E0E10',
          'primary-dark': '#F7F8F8',
          secondary: '#3C3E44',
          'secondary-dark': '#B4B5B8',
          tertiary: '#6B6F76',
          'tertiary-dark': '#8A8D93',
        },
        border: {
          DEFAULT: '#EBEEF2',
          'DEFAULT-dark': '#26272B',
          strong: '#D8DBE0',
          'strong-dark': '#393A3E',
        },
        success: '#4CB782',
        warning: '#F2994A',
        danger: '#F7425D',
        info: '#0081F1',
      },
      fontFamily: {
        display: ['"Inter Display"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-xl': ['72px', { lineHeight: '1.05', letterSpacing: '-0.04em', fontWeight: '600' }],
        'display-lg': ['56px', { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-md': ['44px', { lineHeight: '1.10', letterSpacing: '-0.025em', fontWeight: '600' }],
        'h1': ['32px', { lineHeight: '1.20', letterSpacing: '-0.02em', fontWeight: '600' }],
        'h2': ['24px', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '600' }],
        'h3': ['20px', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h4': ['17px', { lineHeight: '1.40', fontWeight: '600' }],
        'body-lg': ['17px', { lineHeight: '1.55', letterSpacing: '-0.005em' }],
        'body-md': ['15px', { lineHeight: '1.50', letterSpacing: '-0.005em' }],
        'body-sm': ['13px', { lineHeight: '1.50' }],
        'label': ['12px', { lineHeight: '1.40', letterSpacing: '0.02em', fontWeight: '500' }],
        'code': ['13px', { lineHeight: '1.60' }],
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(0,0,0,0.04)',
        'sm': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'md': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'lg': '0 16px 32px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.05)',
        'focus': '0 0 0 3px rgba(94,106,210,0.12)',
      },
      spacing: {
        // 4px 기준 스케일은 기본 tailwind가 이미 제공 (1=4px, 2=8px, ...)
        // 추가 항목만
        'section': '96px',
        'section-md': '64px',
        'section-sm': '48px',
      },
    },
  },
  plugins: [],
} satisfies Config
