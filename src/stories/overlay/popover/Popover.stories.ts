import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PopoverComponent from '../../../components/overlay/popover/PopoverComponent.vue'
import type { PopoverModel } from '../../../components/overlay/popover/model'
import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Overlay/Popover',
  component: PopoverComponent,
  argTypes: {
    modal: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    modal: false,
    disabled: false,
  } as Partial<PopoverModel>,
} as Meta<typeof PopoverComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<PopoverModel>
}

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { PopoverComponent },
    setup() {
      return { args }
    },
    template: `
      <PopoverComponent v-bind="args">
        <template #trigger>
          <button class="px-4 py-2 bg-blue-500 text-white rounded">Открыть Popover</button>
        </template>
        <div class="p-4 bg-white border rounded shadow-lg max-w-xs">
          <h3 class="font-bold mb-2">Заголовок</h3>
          <p>Это немодальное всплывающее окно с контентом.</p>
        </div>
      </PopoverComponent>
    `,
  }),
}

export const WithRichContent: Story = {
  args: {},
  render: (args) => ({
    components: { PopoverComponent },
    setup() {
      return { args }
    },
    template: `
      <PopoverComponent v-bind="args">
        <template #trigger>
          <button class="px-4 py-2 bg-green-500 text-white rounded">Информация</button>
        </template>
        <div class="p-4 bg-white border rounded shadow-lg max-w-sm">
          <h3 class="font-bold mb-2">Дополнительная информация</h3>
          <p class="text-sm text-gray-600 mb-3">Здесь может быть любой контент: текст, изображения, кнопки и т.д.</p>
          <button class="px-3 py-1 bg-blue-500 text-white text-sm rounded">Действие</button>
        </div>
      </PopoverComponent>
    `,
  }),
}
