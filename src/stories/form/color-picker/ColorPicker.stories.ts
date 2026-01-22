import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ColorPickerComponent from '../../../components/form/color-picker/ColorPickerComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Form/ColorPicker',
  component: ColorPickerComponent,
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
  },
} as Meta<typeof ColorPickerComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

