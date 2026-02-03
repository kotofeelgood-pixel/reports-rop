import { fileURLToPath, URL } from 'node:url'
import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import bitrix24UIPluginVite from '@bitrix24/b24ui-nuxt/vite'

// Плагин для замены jiti на пустой модуль в браузерном контексте
const jitiPlugin = (): Plugin => {
  return {
    name: 'vite-plugin-jiti-stub',
    resolveId(id) {
      if (id.includes('jiti') && !id.startsWith('node:')) {
        return '\0jiti-stub'
      }
      return null
    },
    load(id) {
      if (id === '\0jiti-stub') {
        return 'export default {};'
      }
      return null
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/calls/',
  plugins: [
    vue(),
    jitiPlugin(),
    bitrix24UIPluginVite()
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['jiti'],
  },
  ssr: {
    noExternal: [],
  },
  build: {
    outDir: '.output/public',
    rollupOptions: {
      external: (id) => {
        return id.includes('jiti') || id.includes('node:');
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
      defaultIsModuleExports: 'auto',
      exclude: [/jiti/],
    },
  },
})
