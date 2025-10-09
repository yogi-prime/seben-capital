import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
        container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',

    // 👇 ye do missing the
    primary: 'hsl(var(--primary))',
    'primary-foreground': 'hsl(var(--primary-foreground))',

    // (optional but useful)
    secondary: 'hsl(var(--secondary))',
    'secondary-foreground': 'hsl(var(--secondary-foreground))',

    copper: {
      primary: 'hsl(var(--copper-primary))',
      secondary: 'hsl(var(--copper-secondary))',
      accent: 'hsl(var(--copper-accent))',
    },
    card: {
      DEFAULT: 'hsl(var(--card))',
      foreground: 'hsl(var(--card-foreground))',
    },
    success: 'hsl(var(--success))',
    destructive: 'hsl(var(--destructive))',
    muted: 'hsl(var(--muted))',
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
  },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
      boxShadow: {
        copper: 'var(--shadow-copper)',
        elegant: 'var(--shadow-elegant)',
      },
      backgroundImage: {
        'gradient-copper': 'var(--gradient-copper)',
        'gradient-subtle': 'var(--gradient-subtle)',
      },
      transitionProperty: {
        smooth: 'var(--transition-smooth)',
      },
      keyframes: {
        'pulse-copper': {
          '0%, 100%': { boxShadow: '0 0 0 0 hsl(var(--copper-primary) / 0.4)' },
          '50%': { boxShadow: '0 0 0 10px hsl(var(--copper-primary) / 0)' },
        },
      },
      animation: {
        'pulse-copper': 'pulse-copper 2s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
