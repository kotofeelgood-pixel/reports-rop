import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CheckboxGroupComponent from '../../../components/inputs/CheckboxGroup/CheckboxGroupComponent.vue'
const meta = {
  title: 'Form/CheckboxGroup',
  component: CheckboxGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    valueKey: { control: 'text' },
    labelKey: { control: 'text' },
    descriptionKey: { control: 'text' },
    items: { control: 'object' },
    modelValue: { control: 'object' },
    defaultValue: { control: 'object' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['card', 'list', 'table'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    disabled: { control: 'boolean' },
    loop: { control: 'boolean' },
    name: { control: 'text' },
    required: { control: 'boolean' },
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
    indicator: {
      control: 'select',
      options: ['start', 'end', 'hidden'],
    },
  },
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    size: 'md',
    variant: 'list',
    orientation: 'vertical',
    color: 'air-primary',
    indicator: 'start',
  },
} as Meta<typeof CheckboxGroupComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

