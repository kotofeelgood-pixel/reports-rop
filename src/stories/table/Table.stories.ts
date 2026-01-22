import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TableComponent from '../../components/table/TableComponent.vue'


const meta = {
  title: 'Data/Table',
  component: TableComponent,
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object' },
    columns: { control: 'object' },
    caption: { control: 'text' },
    empty: { control: 'text' },
    sticky: {
      control: 'select',
      options: [true, false, 'header', 'footer'],
    },
    loading: { control: 'boolean' },
    loadingColor: {
      control: 'select',
      options: [
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-copilot',
        'air-primary-warning',
      ],
    },
    loadingAnimation: {
      control: 'select',
      options: ['loading', 'carousel', 'carousel-inverse', 'swing', 'elastic'],
    },
    virtualize: { control: 'boolean' },
  },
  args: {
    data: [
      {
        id: '4600',
        date: '2024-03-11T15:30:00',
        status: 'paid',
        email: 'james.anderson@example.com',
        amount: 594,
      },
      {
        id: '4599',
        date: '2024-03-11T10:10:00',
        status: 'failed',
        email: 'mia.white@example.com',
        amount: 276,
      },
      {
        id: '4598',
        date: '2024-03-11T08:50:00',
        status: 'refunded',
        email: 'william.brown@example.com',
        amount: 315,
      },
      {
        id: '4597',
        date: '2024-03-10T19:45:00',
        status: 'paid',
        email: 'emma.davis@example.com',
        amount: 529,
      },
      {
        id: '4596',
        date: '2024-03-10T15:55:00',
        status: 'paid',
        email: 'ethan.harris@example.com',
        amount: 639,
      },
    ],
  },
} as Meta<typeof TableComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

