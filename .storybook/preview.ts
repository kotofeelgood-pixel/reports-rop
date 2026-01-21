import type { Preview } from '@storybook/vue3-vite'
import '../src/assets/main.css'
import { setup } from '@storybook/vue3'
import { createRouter, createMemoryHistory } from 'vue-router'
import b24UiPlugin from '@bitrix24/b24ui-nuxt/vue-plugin'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: { template: '<div>Home</div>' },
    },
    {
      path: '/docs',
      name: 'docs',
      component: { template: '<div>Docs</div>' },
    },
    {
      path: '/docs/components',
      name: 'docs-components',
      component: { template: '<div>Components</div>' },
    },
    {
      path: '/docs/components/breadcrumb',
      name: 'breadcrumb',
      component: { template: '<div>Breadcrumb</div>' },
    },
    {
      path: '/user',
      name: 'user',
      component: { template: '<div>User</div>' },
    },
    {
      path: '/user/profile',
      name: 'user-profile',
      component: { template: '<div>Profile</div>' },
    },
  ],
})

setup((app) => {
  app.use(b24UiPlugin)
  app.use(router)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
