import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TextareaComponent from '../../components/textarea/TextareaComponent.vue'


const meta = {
  title: 'Form/Textarea',
  component: TextareaComponent,
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
    rows: { control: 'number' },
    maxrows: { control: 'number' },
    autoresize: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    highlight: { control: 'boolean' },
    noBorder: { control: 'boolean' },
    underline: { control: 'boolean' },
    rounded: { control: 'boolean' },
    noPadding: { control: 'boolean' },
    readonly: { control: 'boolean' },
    maxlength: { control: 'number' },
    minlength: { control: 'number' },
  },
  args: {
    placeholder: 'Введите текст...',
    color: 'air-primary',
    rows: 3,
  },
} as Meta<typeof TextareaComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

