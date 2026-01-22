import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EmptyComponent from '../../components/empty/EmptyComponent.vue'

const meta = {
  title: 'Data/Empty',
  component: EmptyComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'object' },
    action: { control: 'object' },
  },
  args: {
    title: 'Нет данных',
    description: 'Здесь пока ничего нет',
  },
} as Meta<typeof EmptyComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

