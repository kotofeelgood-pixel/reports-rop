import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ColorModeAvatarComponent from '../../../components/color-mode/color-mode-avatar/ColorModeAvatarComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Color Mode/ColorModeAvatar',
  component: ColorModeAvatarComponent,
  argTypes: {
    light: { control: 'text' },
    dark: { control: 'text' },
  },
  args: {
    light: 'https://via.placeholder.com/100/ffffff/000000?text=Light',
    dark: 'https://via.placeholder.com/100/000000/ffffff?text=Dark',
  },
} as Meta<typeof ColorModeAvatarComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
