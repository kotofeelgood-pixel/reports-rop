import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SwitchComponent from '../../components/switch/SwitchComponent.vue'


const meta = {
  title: 'Form/Switch',
  component: SwitchComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    color: {
      control: 'select',
      options: [
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-warning',
        'air-primary-copilot',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    color: 'air-primary',
    size: 'md',
  },
} as Meta<typeof SwitchComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

