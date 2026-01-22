import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ContainerComponent from '../../../components/layout/container/ContainerComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Layout/Container',
  component: ContainerComponent,
  argTypes: {},
  args: {,},
} as Meta<typeof ContainerComponent>

export default meta
type Story = StoryObj<typeof meta>

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
