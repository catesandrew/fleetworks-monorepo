import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.banner = { js: '"use client";' };
  },
  onSuccess: async () => {
    const fs = await import('node:fs');
    fs.copyFileSync('src/tokens.css', 'dist/tokens.css');
  },
});
