/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        pitch: {
          50: '#f0fdf4',
          100: '#dcfce7',
          300: '#86efac',
          500: '#22c55e',
          700: '#15803d',
          900: '#052e16'
        },
        turf: '#14532d',
        stadium: '#0f172a',
        floodlight: '#facc15'
      },
      boxShadow: {
        stadium: '0 18px 45px -20px rgba(20, 83, 45, 0.75)'
      },
      backgroundImage: {
        'pitch-lines':
          'linear-gradient(90deg, transparent 24.5%, rgba(255,255,255,0.12) 25%, rgba(255,255,255,0.12) 25.8%, transparent 26.2%, transparent 74%, rgba(255,255,255,0.12) 74.2%, rgba(255,255,255,0.12) 75%, transparent 75.4%), linear-gradient(transparent 48.7%, rgba(255,255,255,0.12) 49%, rgba(255,255,255,0.12) 51%, transparent 51.3%)'
      }
    }
  },
  plugins: []
};
