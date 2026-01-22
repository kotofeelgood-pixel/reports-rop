import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SidebarLayoutComponent from '../../../components/layout/sidebar-layout/SidebarLayoutComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Layout/SidebarLayout',
  component: SidebarLayoutComponent,
  argTypes: {},
  args: {},
} as Meta<typeof SidebarLayoutComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
