import type { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig, type Plugin } from 'vite';

// Плагин для замены jiti на пустой модуль в браузерном контексте
const jitiStubPlugin = (): Plugin => {
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
        return 'export default {}; export const createJiti = () => ({});'
      }
      return null
    },
  }
}

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/vue3-vite",
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [jitiStubPlugin()],
      optimizeDeps: {
        exclude: ['jiti'],
      },
      build: {
        rollupOptions: {
          external: (id) => {
            return id.includes('jiti') || id.includes('node:');
          },
        },
        commonjsOptions: {
          exclude: [/jiti/],
        },
      },
    });
  },
};
export default config;
