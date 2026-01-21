import type { Meta, StoryObj } from '@storybook/vue3-vite'
import InputTimeComponent from '../../../components/form/input-time/InputTimeComponent.vue'
import type { InputTimeModel } from '../../../components/form/input-time/model'
import { commonMeta } from '../../meta'
import { ref } from 'vue'

const meta = {
  ...commonMeta,
  title: 'Form/InputTime',
  component: InputTimeComponent,
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    placeholder: 'Выберите время',
    disabled: false,
    readonly: false,
    required: false,
  } as Partial<InputTimeModel>,
} as Meta<typeof InputTimeComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<InputTimeModel>
}

export const Default: Story = {
  args: {
    placeholder: 'Выберите время',
  },
  render: (args) => ({
    components: { InputTimeComponent },
    setup() {
      const time = ref<string | null>(null)
      return { args, time }
    },
    template: `
      <InputTimeComponent v-bind="args" v-model="time" />
    `,
  }),
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: '14:30',
  },
  render: (args) => ({
    components: { InputTimeComponent },
    setup() {
      const time = ref<string | null>(args.defaultValue || null)
      return { args, time }
    },
    template: `
      <InputTimeComponent v-bind="args" v-model="time" />
    `,
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { InputTimeComponent },
    setup() {
      const time = ref<string | null>('14:30')
      return { args, time }
    },
    template: `
      <InputTimeComponent v-bind="args" v-model="time" />
    `,
  }),
}

export const Required: Story = {
  args: {
    required: true,
    placeholder: 'Выберите время *',
  },
  render: (args) => ({
    components: { InputTimeComponent },
    setup() {
      const time = ref<string | null>(null)
      return { args, time }
    },
    template: `
      <InputTimeComponent v-bind="args" v-model="time" />
    `,
  }),
}
