import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FieldGroupComponent from '../../../components/element/field-group/FieldGroupComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Element/FieldGroup',
  component: FieldGroupComponent,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    orientation: 'horizontal',
  },
} as Meta<typeof FieldGroupComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

