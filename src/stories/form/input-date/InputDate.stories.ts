import type { Meta, StoryObj } from '@storybook/vue3-vite'
import InputDateComponent from '../../../components/form/input-date/InputDateComponent.vue'

import { commonMeta } from '../../meta'
import { ref } from 'vue'

const meta = {
  ...commonMeta,
  title: 'Form/InputDate',
  component: InputDateComponent,
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    placeholder: 'Выберите дату',
    disabled: false,
    readonly: false,
    required: false,
  ,},
} as Meta<typeof InputDateComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Выберите дату',
  },
  render: (args) => ({
    components: { InputDateComponent },
    setup() {
      const date = ref<string | null>(null)
      return { args, date }
    },
    template: `
      <InputDateComponent v-bind="args" v-model="date" />
    `,
  }),
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: '2024-01-15',
  },
  render: (args) => ({
    components: { InputDateComponent },
    setup() {
      const date = ref<string | null>(args.defaultValue || null)
      return { args, date }
    },
    template: `
      <InputDateComponent v-bind="args" v-model="date" />
    `,
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { InputDateComponent },
    setup() {
      const date = ref<string | null>('2024-01-15')
      return { args, date }
    },
    template: `
      <InputDateComponent v-bind="args" v-model="date" />
    `,
  }),
}

export const Required: Story = {
  args: {
    required: true,
    placeholder: 'Выберите дату *',
  },
  render: (args) => ({
    components: { InputDateComponent },
    setup() {
      const date = ref<string | null>(null)
      return { args, date }
    },
    template: `
      <InputDateComponent v-bind="args" v-model="date" />
    `,
  }),
