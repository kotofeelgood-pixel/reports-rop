import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ChipComponent from '../../../components/element/chip/ChipComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Element/Chip',
  component: ChipComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    variant: 'default',
    size: 'md',
  },
} as Meta<typeof ChipComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

