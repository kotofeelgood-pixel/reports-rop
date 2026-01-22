import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ContainerComponent from '../../../components/layout/container/ContainerComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Layout/Container',
  component: ContainerComponent,
  argTypes: {},
  args: {},
} as Meta<typeof ContainerComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
