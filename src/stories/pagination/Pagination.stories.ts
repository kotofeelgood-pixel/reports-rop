import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PaginationComponent from '../../components/pagination/PaginationComponent.vue'



const meta = {
  title: 'Navigation/Pagination',
  component: PaginationComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-copilot',
        'air-secondary',
        'air-secondary-alert',
        'air-secondary-accent',
        'air-secondary-accent-1',
        'air-secondary-accent-2',
        'air-secondary-no-accent',
        'air-tertiary',
        'air-tertiary-accent',
        'air-tertiary-no-accent',
        'air-selection',
        'air-boost',
        'link',
      ],
    },
    activeColor: {
      control: 'select',
      options: [
        'default',
        'air-secondary-no-accent',
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-copilot',
        'air-secondary',
        'air-secondary-alert',
        'air-secondary-accent',
        'air-secondary-accent-1',
        'air-secondary-accent-2',
        'air-tertiary',
        'air-tertiary-accent',
        'air-tertiary-no-accent',
        'air-selection',
        'air-boost',
        'danger',
        'success',
        'warning',
        'primary',
        'secondary',
        'collab',
        'ai',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['xss', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    total: { control: 'number' },
    itemsPerPage: { control: 'number' },
    siblingCount: { control: 'number' },
    showEdges: { control: 'boolean' },
    showControls: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    total: 100,
    itemsPerPage: 10,
    siblingCount: 2,
    showEdges: false,
    showControls: true,
    color: 'air-secondary-no-accent',
    activeColor: 'air-primary',
    size: 'md',
  },
} as Meta<typeof PaginationComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

