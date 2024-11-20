import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import path from 'path';

export default defineConfig({
  base: '',
  plugins: [
    react(),
    tsconfigPaths(),
    NodeGlobalsPolyfillPlugin({
      buffer: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: 'buffer', // Alias buffer for compatibility
      process: 'process/browser',
    },
  },
  define: {
    global: 'globalThis',  // Define global for Node compatibility
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
  },
  server: {
    host: true,  // Expose dev server to network if needed
  },
});
