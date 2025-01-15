import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://darta.bimal1412.com.np',
    },
    hmr: true, 
    watch: {
      usePolling: true, 
    }
  },
  logLevel: 'info',
};
