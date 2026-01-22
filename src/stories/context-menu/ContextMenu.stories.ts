import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ContextMenuComponent from '../../components/context-menu/ContextMenuComponent.vue'



const meta = {
  title: 'Overlay/ContextMenu',
  component: ContextMenuComponent,
  tags: ['autodocs'],
  argTypes: {
    modal: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    modal: true,
    disabled: false,
  },
} as Meta<typeof ContextMenuComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

