import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AvatarGroupComponent from '../../components/avatar-group/AvatarGroupComponent.vue'

const meta = {
  title: 'Element/AvatarGroup',
  component: AvatarGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    max: { control: 'number' },
  },
  args: {
    size: 'md',
  },
} as Meta<typeof AvatarGroupComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

