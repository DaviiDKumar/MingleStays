// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <--- Re-add this import

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], // <--- Re-add tailwindcss() here
})