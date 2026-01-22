import type { Meta, StoryObj } from '@storybook/vue3-vite'
import InputComponent from '../../components/inputs/InputComponent.vue'

const meta = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  title: 'Form/Input',
  component: InputComponent,
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    type: {
      control: 'select',
      options: [
        'number',
        'image',
        'text',
        'button',
        'search',
        'time',
        'color',
        'checkbox',
        'date',
        'datetime-local',
        'email',
        'file',
        'hidden',
        'month',
        'password',
        'radio',
        'range',
        'reset',
        'submit',
        'tel',
        'url',
        'week',
      ],
    },
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
    noPadding: { control: 'boolean' },
    noBorder: { control: 'boolean' },
    underline: { control: 'boolean' },
    rounded: { control: 'boolean' },
    required: { control: 'boolean' },
    autocomplete: { control: 'text' },
    autofocus: { control: 'boolean' },
    autofocusDelay: { control: 'number' },
    disabled: { control: 'boolean' },
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
    modelValue: { control: 'text' },
    defaultValue: { control: 'text' },
    loading: { control: 'boolean' },
    trailing: { control: 'boolean' },
    readonly: { control: 'boolean' },
    max: { control: 'text' },
    maxlength: { control: 'number' },
    min: { control: 'text' },
    minlength: { control: 'number' },
    pattern: { control: 'text' },
    step: { control: 'text' },
    list: { control: 'text' },
  },
  args: {
    placeholder: 'Введите текст',
    type: 'text',
    color: 'air-primary',
    size: 'md',
  },
} as Meta<typeof InputComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

