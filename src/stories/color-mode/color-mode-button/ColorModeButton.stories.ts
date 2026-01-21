import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ColorModeButtonComponent from '../../../components/color-mode/color-mode-button/ColorModeButtonComponent.vue'
import type { ColorModeButtonModel } from '../../../components/color-mode/color-mode-button/model'
import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Color Mode/ColorModeButton',
  component: ColorModeButtonComponent,
  argTypes: {},
  args: {} as Partial<ColorModeButtonModel>,
} as Meta<typeof ColorModeButtonComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<ColorModeButtonModel>
}

export const Default: Story = {
  args: {},
}
