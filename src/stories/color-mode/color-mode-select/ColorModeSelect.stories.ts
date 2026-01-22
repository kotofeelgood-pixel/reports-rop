import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ColorModeSelectComponent from '../../../components/color-mode/color-mode-select/ColorModeSelectComponent.vue'
import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Color Mode/ColorModeSelect',
  component: ColorModeSelectComponent,
  argTypes: {},
  args: {},
} as Meta<typeof ColorModeSelectComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
