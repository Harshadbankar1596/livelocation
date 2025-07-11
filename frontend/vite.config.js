import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // dev only
    },
  },
  // If you need backend base URL for production
  define: {
    'process.env': {
      BACKEND_URL: '"https://livelocation-backend.onrender.com"' // example
    }
  }
});
