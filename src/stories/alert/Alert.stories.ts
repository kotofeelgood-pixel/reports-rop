import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AlertComponent from '../../components/alert/AlertComponent.vue'
import { commonMeta } from '../meta'

const meta = {
  ...commonMeta,
  title: 'Element/Alert',
  component: AlertComponent,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'object' },
    avatar: { control: 'object' },
    color: {
      control: 'select',
      options: [
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-warning',
        'air-primary-copilot',
        'air-secondary',
        'air-secondary-alert',
        'air-secondary-accent',
        'air-secondary-accent-1',
        'air-secondary-accent-2',
        'air-tertiary',
      ],
    },
    inverted: { control: 'boolean' },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    size: {
      control: 'select',
      options: ['md', 'sm'],
    },
    actions: { control: 'object' },
    close: { control: 'boolean' },
    closeIcon: { control: 'object' },
  },
  args: {
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
    color: 'air-secondary-accent',
    size: 'md',
    orientation: 'vertical',
    inverted: false,
  },
} as Meta<typeof AlertComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

