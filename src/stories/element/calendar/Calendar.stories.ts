import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CalendarComponent from '../../../components/element/calendar/CalendarComponent.vue'

import { commonMeta } from '../../meta'
import { ref } from 'vue'

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
  ,},
} as Meta<typeof CalendarComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    mode: 'single',
  },
  render: (args) => ({
    components: { CalendarComponent },
    setup() {
      const date = ref<Date | undefined>(new Date())
      return { args, date }
    },
    template: `
      <CalendarComponent v-bind="args" v-model="date" />
    `,
  }),
}

export const Range: Story = {
  args: {
    mode: 'range',
  },
  render: (args) => ({
    components: { CalendarComponent },
    setup() {
      const dates = ref<Date[] | undefined>([new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)])
      return { args, dates }
    },
    template: `
      <CalendarComponent v-bind="args" v-model="dates" />
    `,
  }),
}

export const Multiple: Story = {
  args: {
    mode: 'multiple',
  },
  render: (args) => ({
    components: { CalendarComponent },
    setup() {
      const dates = ref<Date[] | undefined>([new Date()])
      return { args, dates }
    },
    template: `
      <CalendarComponent v-bind="args" v-model="dates" />
    `,
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { CalendarComponent },
    setup() {
      const date = ref<Date | undefined>(new Date())
      return { args, date }
    },
    template: `
      <CalendarComponent v-bind="args" v-model="date" />
    `,
  }),
