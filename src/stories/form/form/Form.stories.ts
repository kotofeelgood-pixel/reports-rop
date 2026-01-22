import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FormComponent from '../../../components/form/form/FormComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Form/Form',
  component: FormComponent,
  argTypes: {},
  args: {},
} as Meta<typeof FormComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
