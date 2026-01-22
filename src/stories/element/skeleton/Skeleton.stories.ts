import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SkeletonComponent from '../../../components/element/skeleton/SkeletonComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Element/Skeleton',
  component: SkeletonComponent,
  argTypes: {},
  args: {,},
} as Meta<typeof SkeletonComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { SkeletonComponent },
    setup() {
      return { args }
    },
    template: `
      <SkeletonComponent v-bind="args" class="h-4 w-48" />
    `,
  }),
}

export const Text: Story = {
  args: {},
  render: (args) => ({
    components: { SkeletonComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-2">
        <SkeletonComponent v-bind="args" class="h-4 w-full" />
        <SkeletonComponent v-bind="args" class="h-4 w-5/6" />
        <SkeletonComponent v-bind="args" class="h-4 w-4/6" />
      </div>
    `,
  }),
}

export const Avatar: Story = {
  args: {},
  render: (args) => ({
    components: { SkeletonComponent },
    setup() {
      return { args }
    },
    template: `
      <SkeletonComponent v-bind="args" class="h-12 w-12 rounded-full" />
    `,
  }),
}

export const Card: Story = {
  args: {},
  render: (args) => ({
    components: { SkeletonComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="border rounded-lg p-4 space-y-3">
        <SkeletonComponent v-bind="args" class="h-4 w-3/4" />
        <SkeletonComponent v-bind="args" class="h-4 w-full" />
        <SkeletonComponent v-bind="args" class="h-4 w-5/6" />
        <SkeletonComponent v-bind="args" class="h-32 w-full" />
      </div>
    `,
  }),
