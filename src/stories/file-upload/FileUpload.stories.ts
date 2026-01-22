import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FileUploadComponent from '../../components/file-upload/FileUploadComponent.vue'
import { commonMeta } from '../meta'

const meta = {
  ...commonMeta,
  title: 'Form/FileUpload',
  component: FileUploadComponent,
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    icon: { control: 'object' },
    label: { control: 'text' },
    description: { control: 'text' },
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
      ],
    },
    variant: {
      control: 'select',
      options: ['button', 'area'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    layout: {
      control: 'select',
      options: ['list', 'grid'],
    },
    position: {
      control: 'select',
      options: ['inside', 'outside'],
    },
    highlight: { control: 'boolean' },
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    reset: { control: 'boolean' },
    dropzone: { control: 'boolean' },
    interactive: { control: 'boolean' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fileIcon: { control: 'object' },
    fileDelete: { control: 'boolean' },
    fileDeleteIcon: { control: 'object' },
    preview: { control: 'boolean' },
  },
  args: {
    variant: 'area',
    size: 'md',
    dropzone: true,
    interactive: true,
    preview: true,
  },
} as Meta<typeof FileUploadComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

