import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TooltipComponent from '../../../components/overlay/tooltip/TooltipComponent.vue'
import type { TooltipModel } from '../../../components/overlay/tooltip/model'
import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Overlay/Tooltip',
  component: TooltipComponent,
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
  } as Partial<TooltipModel>,
} as Meta<typeof TooltipComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<TooltipModel>
}

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { TooltipComponent },
    setup() {
      return { args }
    },
    template: `
      <TooltipComponent v-bind="args">
        <template #trigger>
          <button class="px-4 py-2 bg-blue-500 text-white rounded">Наведите на меня</button>
        </template>
        Подсказка при наведении
      </TooltipComponent>
    `,
  }),
}

export const WithLongText: Story = {
  args: {},
  render: (args) => ({
    components: { TooltipComponent },
    setup() {
      return { args }
    },
    template: `
      <TooltipComponent v-bind="args">
        <template #trigger>
          <button class="px-4 py-2 bg-green-500 text-white rounded">Информация</button>
        </template>
        Это более длинная подсказка с дополнительной информацией для пользователя
      </TooltipComponent>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { TooltipComponent },
    setup() {
      return { args }
    },
    template: `
      <TooltipComponent v-bind="args">
        <template #trigger>
          <button class="px-4 py-2 bg-gray-400 text-white rounded">Отключено</button>
        </template>
        Подсказка не отобразится
      </TooltipComponent>
    `,
  }),
}
