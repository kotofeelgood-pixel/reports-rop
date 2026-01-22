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

export const Default: Story = {
  args: {
    name: 'email',
    label: 'Email',
    description: 'Введите ваш email адрес',
  },
  render: (args) => ({
    components: { FormFieldComponent },
    setup() {
      return { args }
    },
    template: `
      <FormFieldComponent v-bind="args">
        <input type="email" class="w-full px-3 py-2 border rounded" />
      </FormFieldComponent>
    `,
  }),
}

export const WithError: Story = {
  args: {
    name: 'email',
    label: 'Email',
    error: 'Некорректный email адрес',
  },
  render: (args) => ({
    components: { FormFieldComponent },
    setup() {
      return { args }
    },
    template: `
      <FormFieldComponent v-bind="args">
        <input type="email" class="w-full px-3 py-2 border border-red-500 rounded" />
      </FormFieldComponent>
    `,
  }),
}

export const Required: Story = {
  args: {
    name: 'name',
    label: 'Имя',
    required: true,
  },
  render: (args) => ({
    components: { FormFieldComponent },
    setup() {
      return { args }
    },
    template: `
      <FormFieldComponent v-bind="args">
        <input type="text" class="w-full px-3 py-2 border rounded" />
      </FormFieldComponent>
    `,
  }),
