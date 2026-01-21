import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ColorPickerComponent from '../../../components/form/color-picker/ColorPickerComponent.vue'
import type { ColorPickerModel } from '../../../components/form/color-picker/model'
import { commonMeta } from '../../meta'
import { ref } from 'vue'

const meta = {
  ...commonMeta,
  title: 'Form/ColorPicker',
  component: ColorPickerComponent,
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
  } as Partial<ColorPickerModel>,
} as Meta<typeof ColorPickerComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<ColorPickerModel>
}

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { ColorPickerComponent },
    setup() {
      const color = ref<string | undefined>('#3b82f6')
      return { args, color }
    },
    template: `
      <ColorPickerComponent v-bind="args" v-model="color" />
    `,
  }),
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: '#ef4444',
  },
  render: (args) => ({
    components: { ColorPickerComponent },
    setup() {
      const color = ref<string | undefined>(args.defaultValue)
      return { args, color }
    },
    template: `
      <ColorPickerComponent v-bind="args" v-model="color" />
    `,
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { ColorPickerComponent },
    setup() {
      const color = ref<string | undefined>('#3b82f6')
      return { args, color }
    },
    template: `
      <ColorPickerComponent v-bind="args" v-model="color" />
    `,
  }),
}
