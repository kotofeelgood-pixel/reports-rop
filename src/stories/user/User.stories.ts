import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UserComponent from '../../components/user/UserComponent.vue'
const meta = {
  title: 'Data/User',
  component: UserComponent,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    description: { control: 'text' },
    size: {
      control: 'select',
      options: ['md', '3xs', '2xs', 'xs', 'sm', 'lg', 'xl', '2xl', '3xl'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    chip: { control: 'object' },
    avatar: { control: 'object' },
    to: { control: 'text' },
    target: {
      control: 'select',
      options: ['_blank', '_parent', '_self', '_top'],
    },
  },
  args: {
    name: 'John Doe',
    description: 'Software Engineer',
    size: 'md',
    orientation: 'horizontal',
  },
} as Meta<typeof UserComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

