import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AvatarComponent from '../../components/avatar/AvatarComponent.vue'

const meta = {
  title: 'Element/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    icon: { control: 'object' },
    text: { control: 'text' },
    size: {
      control: 'select',
      options: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    chip: { control: 'object' },
  },
  args: {
    src: '/b24ui/avatar/employee.png',
    alt: 'Employee',
    size: 'md',
  },
} as Meta<typeof AvatarComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

