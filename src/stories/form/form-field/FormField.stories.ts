import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FormFieldComponent from '../../../components/form/form-field/FormFieldComponent.vue'
import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Form/FormField',
  component: FormFieldComponent,
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
  },
  args: {
    name: 'email',
    label: 'Email',
    description: 'Введите ваш email адрес',
    required: false,
  },
} as Meta<typeof FormFieldComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

