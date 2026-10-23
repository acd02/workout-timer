import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), cloudflare()],
  resolve: {
    alias: [
      {
        find: '@utils',
        replacement: fileURLToPath(new URL('./src/utils', import.meta.url)),
      },
      {
        find: '@components',
        replacement: fileURLToPath(new URL('./src/components', import.meta.url)),
      },
      {
        find: '@styles',
        replacement: fileURLToPath(new URL('./src/styles', import.meta.url)),
      },
    ],
  },
})