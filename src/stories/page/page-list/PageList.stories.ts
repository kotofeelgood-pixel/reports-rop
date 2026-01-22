import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PageListComponent from '../../../components/page/page-list/PageListComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Page/PageList',
  component: PageListComponent,
  argTypes: {},
  args: {},
} as Meta<typeof PageListComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

