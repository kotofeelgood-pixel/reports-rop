import type { Meta, StoryObj } from '@storybook/vue3-vite'
import InputTagsComponent from '../../components/input-tags/InputTagsComponent.vue'


const meta = {
  title: 'Form/InputTags',
  component: InputTagsComponent,
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
    maxLength: { control: 'number' },
    max: { control: 'number' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    highlight: { control: 'boolean' },
    noBorder: { control: 'boolean' },
    underline: { control: 'boolean' },
    rounded: { control: 'boolean' },
    duplicate: { control: 'boolean' },
    addOnPaste: { control: 'boolean' },
    addOnTab: { control: 'boolean' },
    addOnBlur: { control: 'boolean' },
  },
  args: {
    placeholder: 'Введите теги...',
    color: 'air-primary',
    size: 'md',
  },
} as Meta<typeof InputTagsComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

