import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DropdownMenuComponent from '../../../components/overlay/dropdown-menu/DropdownMenuComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Overlay/DropdownMenu',
  component: DropdownMenuComponent,
  argTypes: {
    modal: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    modal: true,
    disabled: false,
  },
} as Meta<typeof DropdownMenuComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

