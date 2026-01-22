import type { Meta, StoryObj } from '@storybook/vue3-vite'
import InputDateComponent from '../../../components/form/input-date/InputDateComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Form/InputDate',
  component: InputDateComponent,
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    placeholder: 'Выберите дату',
    disabled: false,
    readonly: false,
    required: false,
  },
} as Meta<typeof InputDateComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

