import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SlideoverComponent from '../../../components/overlay/slideover/SlideoverComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Overlay/Slideover',
  component: SlideoverComponent,
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    dismissible: { control: 'boolean' },
    overlay: { control: 'boolean' },
  },
  args: {
    side: 'right',
    dismissible: true,
    overlay: true,
  },
} as Meta<typeof SlideoverComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

