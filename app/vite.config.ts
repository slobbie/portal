import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portal/',
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    tsconfigPaths(),
    visualizer({
      filename: './dist/stats.html', // 생성될 파일 경로
      open: process.env.ANALYZE === 'true', // ANALYZE=true 로 빌드할 때만 브라우저에서 열기
    }),
  ],
  build: {
    chunkSizeWarningLimit: 2600,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three'],
          'react-three-fiber-vendor': ['@react-three/fiber'],
          'react-three-drei-vendor': ['@react-three/drei'],
          'three-rapier-vendor': ['@react-three/rapier'],
        },
      },
    },
  },
});
