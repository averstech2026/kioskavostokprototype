import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  // GitHub Pages project site: /kioskavostokprototype/
  base: process.env.GITHUB_PAGES === 'true' ? '/kioskavostokprototype/' : './',
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
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        productImages: resolve(__dirname, 'product-images.html'),
      },
    },
  },
});
