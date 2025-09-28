import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://35.171.154.62.nip.io',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
