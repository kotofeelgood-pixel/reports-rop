import type { Meta, StoryObj } from '@storybook/vue3-vite'
import RadioGroupComponent from '../../components/radio-group/RadioGroupComponent.vue'


const meta = {
  title: 'Form/RadioGroup',
  component: RadioGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    legend: { control: 'text' },
    valueKey: { control: 'text' },
    labelKey: { control: 'text' },
    descriptionKey: { control: 'text' },
    items: { control: 'object' },
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
    indicator: {
      control: 'select',
      options: ['start', 'end', 'hidden'],
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
  },
  args: {
    items: [
      'System',
      'Light',
      'Dark',
    ],
    size: 'md',
    variant: 'list',
    orientation: 'vertical',
    color: 'air-primary',
    indicator: 'start',
  },
} as Meta<typeof RadioGroupComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

