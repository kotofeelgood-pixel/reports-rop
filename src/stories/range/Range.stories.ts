import type { Meta, StoryObj } from '@storybook/vue3-vite'
import RangeComponent from '../../components/range/RangeComponent.vue'


const meta = {
  title: 'Form/Range',
  component: RangeComponent,
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
      options: ['xs', 'sm', 'md', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    inverted: { control: 'boolean' },
    tooltip: { control: 'boolean' },
  },
  args: {
    color: 'air-primary',
    size: 'md',
    orientation: 'horizontal',
    min: 0,
    max: 100,
    step: 1,
  },
} as Meta<typeof RangeComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
