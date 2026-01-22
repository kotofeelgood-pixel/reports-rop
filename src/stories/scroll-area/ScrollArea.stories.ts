import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ScrollAreaComponent from '../../components/scroll-area/ScrollAreaComponent.vue'



const meta = {
  title: 'Data/ScrollArea',
  component: ScrollAreaComponent,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    items: { control: 'object' },
    virtualize: { control: 'object' },
  },
  args: {
    orientation: 'vertical',
    items: Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      title: `Элемент ${i + 1}`,
      description: `Описание для элемента ${i + 1}`,
    })),
  },
} as Meta<typeof ScrollAreaComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

