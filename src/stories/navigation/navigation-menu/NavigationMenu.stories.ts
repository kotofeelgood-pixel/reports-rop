import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NavigationMenuComponent from '../../../components/navigation/navigation-menu/NavigationMenuComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Navigation/NavigationMenu',
  component: NavigationMenuComponent,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    orientation: 'horizontal',
  },
} as Meta<typeof NavigationMenuComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

