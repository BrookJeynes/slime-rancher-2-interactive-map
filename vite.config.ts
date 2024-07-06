import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { fileURLToPath } from 'url'
// import { resolve } from 'path'

// const __filename = fileURLToPath(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // assetsInclude: ["**/tilemapresource.xml"],
  build: {
    rollupOptions: {
      external: [
        // new RegExp(resolve('datadump-merging', __filename)),
        'datadump-merging/**',
      ],
    },
  },
})
