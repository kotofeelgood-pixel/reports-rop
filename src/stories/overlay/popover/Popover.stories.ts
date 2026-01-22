import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PopoverComponent from '../../../components/overlay/popover/PopoverComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Overlay/Popover',
  component: PopoverComponent,
  argTypes: {
    modal: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    modal: false,
    disabled: false,
  },
} as Meta<typeof PopoverComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

