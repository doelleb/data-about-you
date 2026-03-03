import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Replace 'data-about-you' with whatever you name your GitHub repo
  base: '/data-about-you/',
})
