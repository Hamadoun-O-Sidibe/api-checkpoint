import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages sert ce dépôt sous /api-checkpoint/.
  base: process.env.GITHUB_ACTIONS ? '/api-checkpoint/' : '/',
  plugins: [react(), tailwindcss()],
})
