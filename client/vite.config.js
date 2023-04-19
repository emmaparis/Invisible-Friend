import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': 'http://127.0.0.1:3001',
      '/api': 'http://127.0.0.1:3001',
    },
  },
});
