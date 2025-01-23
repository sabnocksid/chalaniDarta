import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],

  base:'/',
  server: {
    host:true,
    port:5173,
    proxy: {
      '/api': 'http://52.66.247.124:2020/',
    },
    hmr: true, 
    watch: {
      usePolling: true, 
    }
  },
  logLevel: 'info',
};


