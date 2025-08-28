// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

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
    // Ensure CSS is processed and extracted
    cssCodeSplit: false,
  },

  // Configure CSS processing
  css: {
    // Enable CSS modules if needed
    modules: false,
    // Enable source maps for easier debugging
    devSourcemap: true,
    // Configure PostCSS with Tailwind
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },

  // Configure serving of static files during development
  server: {
    open: true,
    watch: {
      // Watch for CSS changes
      include: ['src/**/*.css', 'index.html'],
    },
  },

  // Configure asset handling
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
