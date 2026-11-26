import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
export default defineConfig({ plugins: [react(), tailwindcss()], build: { outDir: 'dist-preview', rollupOptions: { input: 'preview.html' }, modulePreload: false } })
