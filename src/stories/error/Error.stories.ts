import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ErrorComponent from '../../components/error/ErrorComponent.vue'

import { commonMeta } from '../meta'

const meta = {
  ...commonMeta,
  title: 'Layout/Error',
  component: ErrorComponent,
  argTypes: {
    error: { control: 'object' },
    redirect: { control: 'text' },
    clear: { control: 'object' },
  },
  args: {
    error: {
      statusCode: 404,
      statusMessage: 'Page not found',
      message: 'Страница, которую вы ищете, не существует.',
    },
    redirect: '/',
    clear: true,
  },
} as Meta<typeof ErrorComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

