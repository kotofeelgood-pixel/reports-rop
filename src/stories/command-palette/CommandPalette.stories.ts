import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CommandPaletteComponent from '../../components/command-palette/CommandPaletteComponent.vue'

const meta = {
  title: 'Navigation/CommandPalette',
  component: CommandPaletteComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    autofocus: { control: 'boolean' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    highlightOnHover: { control: 'boolean' },
    preserveGroupOrder: { control: 'boolean' },
    close: { control: 'boolean' },
    back: { control: 'boolean' },
  },
  args: {
    placeholder: 'Поиск...',
    autofocus: true,
  },
} as Meta<typeof CommandPaletteComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

