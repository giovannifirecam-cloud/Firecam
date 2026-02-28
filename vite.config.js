import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                alarme: resolve(__dirname, 'alarme-incendio.html'),
                cftv: resolve(__dirname, 'cftv.html'),
                controle: resolve(__dirname, 'controle-acesso.html'),
                cabeamento: resolve(__dirname, 'cabeamento-estruturado.html'),
                sobre: resolve(__dirname, 'sobre.html')
            },
        },
    },
})
