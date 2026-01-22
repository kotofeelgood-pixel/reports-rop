import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TabsComponent from '../../components/tabs/TabsComponent.vue'


const meta = {
  title: 'Navigation/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['link'],
    },
    size: {
      control: 'select',
      options: ['xss', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    content: { control: 'boolean' },
    unmountOnHide: { control: 'boolean' },
    activationMode: {
      control: 'select',
      options: ['automatic', 'manual'],
    },
  },
  args: {
    variant: 'link',
    size: 'md',
    orientation: 'horizontal',
    content: true,
    unmountOnHide: true,
  },
} as Meta<typeof TabsComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

