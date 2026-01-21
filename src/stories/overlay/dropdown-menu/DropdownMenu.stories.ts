import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DropdownMenuComponent from '../../../components/overlay/dropdown-menu/DropdownMenuComponent.vue'
import type { DropdownMenuModel } from '../../../components/overlay/dropdown-menu/model'
import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Overlay/DropdownMenu',
  component: DropdownMenuComponent,
  argTypes: {
    modal: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    modal: true,
    disabled: false,
  } as Partial<DropdownMenuModel>,
} as Meta<typeof DropdownMenuComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<DropdownMenuModel>
}

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { DropdownMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <DropdownMenuComponent v-bind="args">
        <template #trigger>
          <button class="px-4 py-2 bg-blue-500 text-white rounded">Открыть меню</button>
        </template>
        <div class="p-2 bg-white border rounded shadow">
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">Пункт 1</a>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">Пункт 2</a>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">Пункт 3</a>
        </div>
      </DropdownMenuComponent>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { DropdownMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <DropdownMenuComponent v-bind="args">
        <template #trigger>
          <button class="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed">Отключено</button>
        </template>
        <div class="p-2 bg-white border rounded shadow">
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">Пункт 1</a>
        </div>
      </DropdownMenuComponent>
    `,
  }),
}
