import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CalendarComponent from '../../../components/element/calendar/CalendarComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Element/Calendar',
  component: CalendarComponent,
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range', 'multiple'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    mode: 'single',
    disabled: false,
  },
} as Meta<typeof CalendarComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

