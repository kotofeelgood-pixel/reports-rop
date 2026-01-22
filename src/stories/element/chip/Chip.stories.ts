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
  ,},
} as Meta<typeof ChipComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: (args) => ({
    components: { ChipComponent },
    setup() {
      return { args }
    },
    template: `
      <ChipComponent v-bind="args">5</ChipComponent>
    `,
  }),
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => ({
    components: { ChipComponent },
    setup() {
      return { args }
    },
    template: `
      <ChipComponent v-bind="args">12</ChipComponent>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { ChipComponent },
    template: `
      <div class="flex gap-4 items-center">
        <ChipComponent size="sm">3</ChipComponent>
        <ChipComponent size="md">5</ChipComponent>
        <ChipComponent size="lg">12</ChipComponent>
      </div>
    `,
  }),
}

export const WithText: Story = {
  args: {},
  render: (args) => ({
    components: { ChipComponent },
    setup() {
      return { args }
    },
    template: `
      <ChipComponent v-bind="args">Новое</ChipComponent>
    `,
  }),
