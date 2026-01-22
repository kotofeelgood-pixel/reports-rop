import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CountdownComponent from '../../../components/element/countdown/CountdownComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Element/Countdown',
  component: CountdownComponent,
  argTypes: {
    targetDate: { control: 'date' },
    autoStart: { control: 'boolean' },
  },
  args: {
    targetDate: new Date(Date.now() + 60 * 1000),
    autoStart: true,
  },
} as Meta<typeof CountdownComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

