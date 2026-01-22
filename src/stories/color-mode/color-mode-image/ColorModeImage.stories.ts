import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ColorModeImageComponent from '../../../components/color-mode/color-mode-image/ColorModeImageComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Color Mode/ColorModeImage',
  component: ColorModeImageComponent,
  argTypes: {
    light: { control: 'text' },
    dark: { control: 'text' },
    alt: { control: 'text' },
  },
  args: {
    light: 'https://via.placeholder.com/400/ffffff/000000?text=Light+Mode',
    dark: 'https://via.placeholder.com/400/000000/ffffff?text=Dark+Mode',
    alt: 'Color mode image',
  },
} as Meta<typeof ColorModeImageComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
