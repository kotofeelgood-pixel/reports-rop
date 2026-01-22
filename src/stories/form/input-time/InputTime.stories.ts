import type { Meta, StoryObj } from '@storybook/vue3-vite'
import InputTimeComponent from '../../../components/form/input-time/InputTimeComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Form/InputTime',
  component: InputTimeComponent,
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    placeholder: 'Выберите время',
    disabled: false,
    readonly: false,
    required: false,
  },
} as Meta<typeof InputTimeComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

