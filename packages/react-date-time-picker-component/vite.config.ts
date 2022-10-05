import react from '@vitejs/plugin-react';
import type { UserConfigExport } from 'vite';
import { defineConfig } from 'vite';

const devConfig: UserConfigExport = {
  build: {
    outDir: 'build',
  },
  plugins: [react()],
};

const libConfig: UserConfigExport = {
  build: {
    lib: {
      entry: 'src/lib/index.ts',
      name: 'react-typist-component',
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'build' && mode === 'lib') {
    return libConfig;
  }

  return devConfig;
});
