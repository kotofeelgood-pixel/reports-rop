import type { Preview } from '@storybook/vue3-vite'
import '../src/assets/main.css'
import { setup } from '@storybook/vue3'
import b24UiPlugin from '@bitrix24/b24ui-nuxt/vue-plugin'

setup((app) => {
  app.use(b24UiPlugin)
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
