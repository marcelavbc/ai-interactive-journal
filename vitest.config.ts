import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'url';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
    globals: true,
    css: true,
    coverage: { provider: 'v8', reporter: ['text', 'html'] },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
