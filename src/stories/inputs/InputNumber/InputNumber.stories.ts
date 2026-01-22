import type { Meta, StoryObj } from '@storybook/vue3-vite'
import InputNumberComponent from '../../../components/inputs/InputNumber/InputNumberComponent.vue'
const meta = {
  title: 'Form/InputNumber',
  component: InputNumberComponent,
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
    noBorder: { control: 'boolean' },
    underline: { control: 'boolean' },
    rounded: { control: 'boolean' },
    tag: { control: 'text' },
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
    highlight: { control: 'boolean' },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    increment: { control: 'boolean' },
    incrementDisabled: { control: 'boolean' },
    decrement: { control: 'boolean' },
    decrementDisabled: { control: 'boolean' },
    autofocus: { control: 'boolean' },
    autofocusDelay: { control: 'number' },
    modelValue: { control: 'number' },
    defaultValue: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    stepSnapping: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    id: { control: 'text' },
    name: { control: 'text' },
    disableWheelChange: { control: 'boolean' },
    invertWheelChange: { control: 'boolean' },
    readonly: { control: 'boolean' },
    autocomplete: { control: 'text' },
    list: { control: 'text' },
  },
  args: {
    placeholder: 'Введите число',
    color: 'air-primary',
    size: 'md',
    orientation: 'horizontal',
  },
} as Meta<typeof InputNumberComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

