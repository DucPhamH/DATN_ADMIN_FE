import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      path: 'path-browserify'
    }
  }
})
