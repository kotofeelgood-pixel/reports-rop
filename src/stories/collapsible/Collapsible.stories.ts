import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CollapsibleComponent from '../../components/collapsible/CollapsibleComponent.vue'
const meta = {
  title: 'Element/Collapsible',
  component: CollapsibleComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    open: { control: 'boolean' },
    unmountOnHide: { control: 'boolean' },
  },
  args: {
    unmountOnHide: true,
  },
} as Meta<typeof CollapsibleComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

