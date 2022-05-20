import { defineConfig, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';

const devConfig: UserConfigExport = {
  build: {
    outDir: 'build',
  },
  plugins: [react()],
};

const libConfig: UserConfigExport = {
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'react-typer-component',
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
