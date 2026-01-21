import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CountdownComponent from '../../../components/element/countdown/CountdownComponent.vue'
import type { CountdownModel } from '../../../components/element/countdown/model'
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
  } as Partial<CountdownModel>,
} as Meta<typeof CountdownComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<CountdownModel>
}

export const Default: Story = {
  args: {
    targetDate: new Date(Date.now() + 60 * 1000),
    autoStart: true,
  },
}

export const FiveMinutes: Story = {
  args: {
    targetDate: new Date(Date.now() + 5 * 60 * 1000),
    autoStart: true,
  },
}

export const OneHour: Story = {
  args: {
    targetDate: new Date(Date.now() + 60 * 60 * 1000),
    autoStart: true,
  },
}

export const ManualStart: Story = {
  args: {
    targetDate: new Date(Date.now() + 60 * 1000),
    autoStart: false,
  },
}
