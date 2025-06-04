import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', '@sapiently/core', '@sapiently/design-tokens', '@sapiently/theme'],
  sourcemap: true,
});
