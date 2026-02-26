import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/sky-hooley-portfolio/', // required for GitHub Pages subpath
})
