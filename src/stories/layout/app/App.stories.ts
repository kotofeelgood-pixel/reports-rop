import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AppComponent from '../../../components/layout/app/AppComponent.vue'
import type { AppModel } from '../../../components/layout/app/model'
import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Layout/App',
  component: AppComponent,
  argTypes: {},
  args: {} as Partial<AppModel>,
} as Meta<typeof AppComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<AppModel>
}

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
}
