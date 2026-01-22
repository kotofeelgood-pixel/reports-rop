import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DescriptionListComponent from '../../components/description-list/DescriptionListComponent.vue'



const meta = {
  title: 'Data/DescriptionList',
  component: DescriptionListComponent,
  tags: ['autodocs'],
  argTypes: {
    legend: { control: 'text' },
    text: { control: 'text' },
    labelKey: { control: 'text' },
    descriptionKey: { control: 'text' },
    items: { control: 'object' },
    size: {
      control: 'select',
      options: ['md', 'sm'],
    },
  },
  args: {
    legend: 'Информация о заявителе',
    text: 'Личные данные и заявка.',
    items: [
      {
        label: 'Полное имя',
        description: 'Михаил Фостер',
      },
      {
        label: 'Событие',
        description: 'Оплата производится через Atol online',
      },
    ],
    size: 'md',
  },
} as Meta<typeof DescriptionListComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

