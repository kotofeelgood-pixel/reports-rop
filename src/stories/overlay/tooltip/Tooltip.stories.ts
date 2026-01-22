import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TooltipComponent from '../../../components/overlay/tooltip/TooltipComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Overlay/Tooltip',
  component: TooltipComponent,
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
  },
} as Meta<typeof TooltipComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

