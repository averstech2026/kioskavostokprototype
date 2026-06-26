import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: './',
  publicDir: resolve(__dirname, 'public'),
  server: {
    host: true,
    port: 5173,
    open: true,
  },
  preview: {
    host: true,
    port: 8765,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
