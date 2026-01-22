import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PinInputComponent from '../../components/pin-input/PinInputComponent.vue'



const meta = {
  title: 'Form/PinInput',
  component: PinInputComponent,
  tags: ['autodocs'],
  argTypes: {
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
      options: ['xss', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    type: {
      control: 'select',
      options: ['text', 'number'],
    },
    length: { control: 'number' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    mask: { control: 'boolean' },
    otp: { control: 'boolean' },
    highlight: { control: 'boolean' },
    noBorder: { control: 'boolean' },
    underline: { control: 'boolean' },
    rounded: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    color: 'air-primary',
    size: 'md',
    type: 'text',
    length: 5,
    placeholder: '○',
  },
} as Meta<typeof PinInputComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

