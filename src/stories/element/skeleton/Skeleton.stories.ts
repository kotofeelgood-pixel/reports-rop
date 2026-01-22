import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SkeletonComponent from '../../../components/element/skeleton/SkeletonComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Element/Skeleton',
  component: SkeletonComponent,
  argTypes: {},
  args: {},
} as Meta<typeof SkeletonComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

