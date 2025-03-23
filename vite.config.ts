/// <reference types="vitest" />
import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    open: true,
  },
  test: {
    exclude: ['node_modules'],
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.ts',
  },
  build: {
    outDir: 'dist',
    cssMinify: true,
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: 'Parcel React Library Starter',
      formats: ['es', 'cjs'],
      fileName: format => `index.${format}.js`,
    },
  },
}) satisfies UserConfig;
