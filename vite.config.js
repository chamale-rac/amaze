import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import eslintPlugin from 'vite-plugin-eslint'

// eslint-disable-next-line import/no-extraneous-dependencies
import prettierPlugin from 'vite-plugin-prettier'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      fix: true,
    }),
    prettierPlugin(),
  ],
})
