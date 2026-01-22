import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SeparatorComponent from '../../components/separator/SeparatorComponent.vue'


const meta = {
  title: 'Element/Separator',
  component: SeparatorComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    icon: { control: 'object' },
    avatar: { control: 'object' },
    accent: {
      control: 'select',
      options: ['default', 'accent', 'less'],
    },
    size: {
      control: 'select',
      options: ['thin', 'thick'],
    },
    type: {
      control: 'select',
      options: ['solid', 'double', 'dashed', 'dotted'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    decorative: { control: 'boolean' },
  },
  args: {
    orientation: 'horizontal',
    accent: 'default',
    size: 'thin',
    type: 'solid',
  },
} as Meta<typeof SeparatorComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

