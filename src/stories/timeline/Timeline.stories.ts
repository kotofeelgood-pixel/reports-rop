import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TimelineComponent from '../../components/timeline/TimelineComponent.vue'


const meta = {
  title: 'Data/Timeline',
  component: TimelineComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
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
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    reverse: { control: 'boolean' },
  },
  args: {
    size: 'md',
    color: 'air-primary',
    orientation: 'vertical',
    reverse: false,
  },
} as Meta<typeof TimelineComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

