import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // We'll generate DTS separately
  clean: true,
  external: ['react', 'react-dom', '@sapiently/core', '@sapiently/design-tokens'],
  sourcemap: true,
});
