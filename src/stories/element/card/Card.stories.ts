import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CardComponent from '../../../components/element/card/CardComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Element/Card',
  component: CardComponent,
  argTypes: {},
  args: {},
} as Meta<typeof CardComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

