import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ProgressComponent from '../../components/progress/ProgressComponent.vue'
const meta = {
  title: 'Element/Progress',
  component: ProgressComponent,
  tags: ['autodocs'],
  argTypes: {
    max: { control: 'number' },
    status: { control: 'boolean' },
    inverted: { control: 'boolean' },
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
        'air-secondary',
      ],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    animation: {
      control: 'select',
      options: ['carousel', 'loading', 'carousel-inverse', 'swing', 'elastic'],
    },
    modelValue: { control: 'number' },
  },
  args: {
    modelValue: 24,
    max: 100,
    size: 'md',
    color: 'air-primary',
    orientation: 'horizontal',
    animation: 'loading',
    status: false,
    inverted: false,
  },
} as Meta<typeof ProgressComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

