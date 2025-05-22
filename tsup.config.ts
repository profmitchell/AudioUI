import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    // Disable incremental to fix the TS5074 error
    compilerOptions: {
      incremental: false
    }
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
});
