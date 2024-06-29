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
      open: true, // 빌드 완료 후 자동으로 브라우저에서 파일 열기
    }),
  ],
  build: {
    chunkSizeWarningLimit: 2100,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three'],
          'react-three-fiber-vendor': ['@react-three/fiber'],
          'react-three-drei-vendor': ['@react-three/drei'],
          'dimforge-rapier3d-compat-vendor': ['@dimforge/rapier3d-compat'],
          'three-stdlib-vendor': ['three-stdlib'],
          'use-asset-vendor': ['use-asset'],
          'three-rapier-vendor': ['@react-three/rapier'],
        },
      },
    },
  },
});
