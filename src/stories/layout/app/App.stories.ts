import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AppComponent from '../../../components/layout/app/AppComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Layout/App',
  component: AppComponent,
  argTypes: {},
  args: {,},
} as Meta<typeof AppComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { AppComponent },
    setup() {
      return { args }
    },
    template: `
      <AppComponent v-bind="args">
        <div class="p-8">
          <h1 class="text-2xl font-bold mb-4">Приложение</h1>
          <p>Контент приложения</p>
        </div>
      </AppComponent>
    `,
  }),
