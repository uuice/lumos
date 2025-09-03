/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./templates/**/*.{js,ts,jsx,tsx}",
    "./source/**/*.md",
    "./themes/default/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            a: {
              color: '#3b82f6',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              color: '#e11d48',
              backgroundColor: '#f3f4f6',
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '4px',
              fontSize: '0.875em',
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#f9fafb',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
            },
            h1: {
              color: '#111827',
              fontWeight: '800',
            },
            h2: {
              color: '#111827',
              fontWeight: '700',
            },
            h3: {
              color: '#111827',
              fontWeight: '600',
            },
            h4: {
              color: '#111827',
              fontWeight: '600',
            },
            blockquote: {
              color: '#6b7280',
              borderLeftColor: '#d1d5db',
            },
            hr: {
              borderColor: '#e5e7eb',
            },
            strong: {
              color: '#111827',
            },
            'ul > li::marker': {
              color: '#6b7280',
            },
            'ol > li::marker': {
              color: '#6b7280',
            },
          },
        },
        dark: {
          css: {
            color: '#d1d5db',
            a: {
              color: '#60a5fa',
            },
            h1: {
              color: '#f9fafb',
            },
            h2: {
              color: '#f9fafb',
            },
            h3: {
              color: '#f9fafb',
            },
            h4: {
              color: '#f9fafb',
            },
            code: {
              color: '#f472b6',
              backgroundColor: '#374151',
            },
            blockquote: {
              color: '#9ca3af',
              borderLeftColor: '#4b5563',
            },
            hr: {
              borderColor: '#4b5563',
            },
            strong: {
              color: '#f9fafb',
            },
            'ul > li::marker': {
              color: '#9ca3af',
            },
            'ol > li::marker': {
              color: '#9ca3af',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  darkMode: 'class',
}
