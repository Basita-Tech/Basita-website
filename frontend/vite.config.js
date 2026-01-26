import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['react', 'react-dom']
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-select',
      'axios',
      'react-router-dom',
      'lucide-react',
      'framer-motion'
    ],
    exclude: ['country-state-city']
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', 'framer-motion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'form-libs': ['react-select', 'react-phone-input-2'],
          'utils': ['axios', 'js-cookie', 'validator', 'dompurify']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild' // Use esbuild for faster builds
  },
  server: {
    port: 5173,
    strictPort: false,
    host: true
  }
});
