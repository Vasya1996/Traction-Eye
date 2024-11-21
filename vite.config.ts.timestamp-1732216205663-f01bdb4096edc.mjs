// vite.config.ts
import { defineConfig } from "file:///Users/badbadnotgood/Documents/JavaScript/traction/Traction-Eye/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///Users/badbadnotgood/Documents/JavaScript/traction/Traction-Eye/node_modules/vite-tsconfig-paths/dist/index.mjs";
import react from "file:///Users/badbadnotgood/Documents/JavaScript/traction/Traction-Eye/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { NodeGlobalsPolyfillPlugin } from "file:///Users/badbadnotgood/Documents/JavaScript/traction/Traction-Eye/node_modules/@esbuild-plugins/node-globals-polyfill/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "/Users/badbadnotgood/Documents/JavaScript/traction/Traction-Eye";
var vite_config_default = defineConfig({
  base: "",
  plugins: [
    react(),
    tsconfigPaths(),
    NodeGlobalsPolyfillPlugin({
      buffer: true
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      buffer: "buffer",
      // Alias buffer for compatibility
      process: "process/browser"
    }
  },
  define: {
    global: "globalThis"
    // Define global for Node compatibility
  },
  optimizeDeps: {
    include: ["buffer", "process"]
  },
  server: {
    host: true
    // Expose dev server to network if needed
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYmFkYmFkbm90Z29vZC9Eb2N1bWVudHMvSmF2YVNjcmlwdC90cmFjdGlvbi9UcmFjdGlvbi1FeWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9iYWRiYWRub3Rnb29kL0RvY3VtZW50cy9KYXZhU2NyaXB0L3RyYWN0aW9uL1RyYWN0aW9uLUV5ZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYmFkYmFkbm90Z29vZC9Eb2N1bWVudHMvSmF2YVNjcmlwdC90cmFjdGlvbi9UcmFjdGlvbi1FeWUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3Yyc7XG5pbXBvcnQgeyBOb2RlR2xvYmFsc1BvbHlmaWxsUGx1Z2luIH0gZnJvbSAnQGVzYnVpbGQtcGx1Z2lucy9ub2RlLWdsb2JhbHMtcG9seWZpbGwnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6ICcnLFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB0c2NvbmZpZ1BhdGhzKCksXG4gICAgTm9kZUdsb2JhbHNQb2x5ZmlsbFBsdWdpbih7XG4gICAgICBidWZmZXI6IHRydWUsXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgICBidWZmZXI6ICdidWZmZXInLCAvLyBBbGlhcyBidWZmZXIgZm9yIGNvbXBhdGliaWxpdHlcbiAgICAgIHByb2Nlc3M6ICdwcm9jZXNzL2Jyb3dzZXInLFxuICAgIH0sXG4gIH0sXG4gIGRlZmluZToge1xuICAgIGdsb2JhbDogJ2dsb2JhbFRoaXMnLCAgLy8gRGVmaW5lIGdsb2JhbCBmb3IgTm9kZSBjb21wYXRpYmlsaXR5XG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFsnYnVmZmVyJywgJ3Byb2Nlc3MnXSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogdHJ1ZSwgIC8vIEV4cG9zZSBkZXYgc2VydmVyIHRvIG5ldHdvcmsgaWYgbmVlZGVkXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1csU0FBUyxvQkFBb0I7QUFDNVksT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsaUNBQWlDO0FBQzFDLE9BQU8sVUFBVTtBQUpqQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsSUFDZCwwQkFBMEI7QUFBQSxNQUN4QixRQUFRO0FBQUEsSUFDVixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3BDLFFBQVE7QUFBQTtBQUFBLE1BQ1IsU0FBUztBQUFBLElBQ1g7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixRQUFRO0FBQUE7QUFBQSxFQUNWO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsVUFBVSxTQUFTO0FBQUEsRUFDL0I7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
