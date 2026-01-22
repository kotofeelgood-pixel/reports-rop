import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PageColumnsComponent from '../../../components/page/page-columns/PageColumnsComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Page/PageColumns',
  component: PageColumnsComponent,
  argTypes: {
    columns: { control: 'number' },
  },
  args: {
    columns: 2,
  },
} as Meta<typeof PageColumnsComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

