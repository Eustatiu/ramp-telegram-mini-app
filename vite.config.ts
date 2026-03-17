import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  // Base path for GitHub Pages (repo name subpath)
  base: process.env.GITHUB_ACTIONS ? '/ramp-telegram-mini-app/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 7485,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
