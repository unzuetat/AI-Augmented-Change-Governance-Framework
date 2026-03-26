/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cf: {
          50:  '#f0f4ff',
          100: '#dbe4ff',
          200: '#bac8ff',
          300: '#91a7ff',
          400: '#748ffc',
          500: '#5c7cfa',
          600: '#4c6ef5',
          700: '#4263eb',
          800: '#3b5bdb',
          900: '#364fc7',
        },
        stage: {
          request:   '#868e96',
          classify:  '#ae3ec9',
          assess:    '#f76707',
          approve:   '#1098ad',
          implement: '#4263eb',
          review:    '#2b8a3e',
          close:     '#495057',
        },
        risk: {
          low:      '#51cf66',
          medium:   '#fcc419',
          high:     '#ff6b6b',
          critical: '#e03131',
        },
        scope: {
          project:     '#748ffc',
          operational: '#20c997',
          cross:       '#f783ac',
        },
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
