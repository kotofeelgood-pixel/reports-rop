import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AdviceComponent from '../../components/advice/AdviceComponent.vue'

import { commonMeta } from '../meta'

const meta = {
  ...commonMeta,
  title: 'Element/Advice',
  component: AdviceComponent,
  argTypes: {
    description: { control: 'text' },
    icon: { control: 'object' },
    avatar: { control: 'object' },
    angle: {
      control: 'select',
      options: ['bottom', 'top'],
    },
  },
  args: {
    description: 'Давайте сообщим менеджеру, что сделка не двигается, менеджер не перезванивает клиенту и не отвечает на его сообщения. Давайте назначим задачу менеджеру от имени менеджера',
    angle: 'bottom',
  },
} as Meta<typeof AdviceComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

