import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/context': path.resolve(__dirname, './src/context'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/constants': path.resolve(__dirname, './src/constants'),
      '@/styles': path.resolve(__dirname, './src/styles'),
    },
  },
  server: {
    port: 5173,
    host: true, // Permet l'accès depuis le réseau local
  },
  preview: {
    port: 4173,
    host: true, // Permet l'accès depuis le réseau local
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    css: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
