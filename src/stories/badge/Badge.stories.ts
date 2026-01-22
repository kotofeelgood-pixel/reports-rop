import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BadgeComponent from '../../components/badge/BadgeComponent.vue'


const meta = {
  title: 'Element/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
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
        'air-selection',
      ],
    },
    inverted: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['xss', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    square: { control: 'boolean' },
    useLink: { control: 'boolean' },
    useClose: { control: 'boolean' },
    icon: { control: 'object' },
    avatar: { control: 'object' },
    trailing: { control: 'boolean' },
    trailingIcon: { control: 'object' },
  },
  args: {
    label: 'Badge',
    color: 'air-primary',
    size: 'md',
    inverted: false,
    square: false,
    useLink: false,
    useClose: false,
  },
} as Meta<typeof BadgeComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

