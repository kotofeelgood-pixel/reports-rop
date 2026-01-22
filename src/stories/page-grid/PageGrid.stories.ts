import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PageGridComponent from '../../components/page-grid/PageGridComponent.vue'


const meta = {
  title: 'Page/PageGrid',
  component: PageGridComponent,
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'text' },
  },
} as Meta<typeof PageGridComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

