import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SidebarLayoutComponent from '../../../components/layout/sidebar-layout/SidebarLayoutComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Layout/SidebarLayout',
  component: SidebarLayoutComponent,
  argTypes: {},
  args: {,},
} as Meta<typeof SidebarLayoutComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { SidebarLayoutComponent },
    setup() {
      return { args }
    },
    template: `
      <SidebarLayoutComponent v-bind="args">
        <template #sidebar>
          <div class="p-4 bg-gray-100">
            <h2 class="font-bold mb-2">Боковая панель</h2>
            <ul>
              <li>Пункт 1</li>
              <li>Пункт 2</li>
              <li>Пункт 3</li>
            </ul>
          </div>
        </template>
        <div class="p-8">
          <h1 class="text-2xl font-bold mb-4">Основной контент</h1>
          <p>Контент с боковой панелью</p>
        </div>
      </SidebarLayoutComponent>
    `,
  }),
