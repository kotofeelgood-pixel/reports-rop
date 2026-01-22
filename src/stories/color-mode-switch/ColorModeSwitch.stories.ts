import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ColorModeSwitchComponent from '../../components/color-mode-switch/ColorModeSwitchComponent.vue'
const meta = {
  title: 'Color Mode/ColorModeSwitch',
  component: ColorModeSwitchComponent,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
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
    autofocus: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    defaultValue: { control: 'boolean' },
    required: { control: 'boolean' },
    id: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    modelValue: { control: 'boolean' },
  },
  args: {
    size: 'md',
    color: 'air-primary',
  },
} as Meta<typeof ColorModeSwitchComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

