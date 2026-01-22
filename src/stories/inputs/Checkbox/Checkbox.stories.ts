import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CheckboxComponent from '../../../components/inputs/Checkbox/CheckboxComponent.vue'
const meta = {
  title: 'Form/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
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
      ],
    },
    variant: {
      control: 'select',
      options: ['card', 'list'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    indicator: {
      control: 'select',
      options: ['start', 'end', 'hidden'],
    },
    disabled: { control: 'boolean' },
    name: { control: 'text' },
    required: { control: 'boolean' },
    id: { control: 'text' },
    defaultValue: {
      control: 'select',
      options: [true, false, 'indeterminate'],
    },
    value: { control: 'text' },
    autofocus: {
      control: 'select',
      options: [false, true, 'true', 'false'],
    },
    modelValue: {
      control: 'select',
      options: [true, false, 'indeterminate', undefined],
    },
  },
  args: {
    label: 'Checkbox',
    color: 'air-primary',
    variant: 'list',
    size: 'md',
    indicator: 'start',
  },
} as Meta<typeof CheckboxComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

