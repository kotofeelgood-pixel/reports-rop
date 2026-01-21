import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ContainerComponent from '../../../components/layout/container/ContainerComponent.vue'
import type { ContainerModel } from '../../../components/layout/container/model'
import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Layout/Container',
  component: ContainerComponent,
  argTypes: {},
  args: {} as Partial<ContainerModel>,
} as Meta<typeof ContainerComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<ContainerModel>
}

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { ContainerComponent },
    setup() {
      return { args }
    },
    template: `
      <ContainerComponent v-bind="args">
        <div class="p-8">
          <h1 class="text-2xl font-bold mb-4">Контейнер</h1>
          <p>Центрированный контент</p>
        </div>
      </ContainerComponent>
    `,
  }),
}
