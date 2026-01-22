import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SelectComponent from '../../components/select/SelectComponent.vue'

const meta = {
  title: 'Form/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
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
    tagColor: {
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
    items: { control: 'object' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    highlight: { control: 'boolean' },
    noBorder: { control: 'boolean' },
    underline: { control: 'boolean' },
    rounded: { control: 'boolean' },
    noPadding: { control: 'boolean' },
  },
  args: {
    placeholder: 'Выберите статус',
    color: 'air-primary',
    size: 'md',
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
  },
} as Meta<typeof SelectComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

