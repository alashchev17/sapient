import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', '@sapiently/core', '@sapiently/design-tokens'],
  sourcemap: true,
  publicDir: 'src/fonts',
  loader: {
    '.css': 'copy',
  },
  onSuccess: async () => {
    // Copy CSS file to dist root for easier importing
    const fs = await import('fs');
    const path = await import('path');
    
    const srcCssPath = path.join(__dirname, 'src/fonts/fonts.css');
    const distCssPath = path.join(__dirname, 'dist/fonts.css');
    
    if (fs.existsSync(srcCssPath)) {
      await fs.promises.copyFile(srcCssPath, distCssPath);
    }
  },
});
