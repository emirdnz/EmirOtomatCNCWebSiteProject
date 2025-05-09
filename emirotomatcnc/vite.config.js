import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    define: {
      'process.env.VITE_API_DOMAIN': JSON.stringify(env.VITE_API_DOMAIN),
      'process.env.VITE_API_PORT': JSON.stringify(env.VITE_API_PORT)
    }
  }
})
