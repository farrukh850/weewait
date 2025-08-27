// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Preserve the public folder structure
  publicDir: 'public',

  // Configure build output to match existing structure
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },

  // Configure serving of static files during development
  server: {
    open: true,
  },

  // Configure asset handling
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
