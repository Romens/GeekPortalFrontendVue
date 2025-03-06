import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(),
        vue()
    ],
    server: {
      watch: {
        usePolling: true
      }
    },
    resolve: {
        alias: {
            '@': '/src', // Убедитесь, что алиас '@' настроен правильно
        },
    },
    optimizeDeps: {
        force: true
    },
    build: {
        sourcemap: true
    }
})
