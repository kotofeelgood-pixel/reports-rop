import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TableComponent from '../../components/table/TableComponent.vue'
import type { TableModel, TableLoadingColor, TableLoadingAnimation, TableSticky } from '../../components/table/model'
import type { TableColumn } from '@bitrix24/b24ui-nuxt'
import { h, resolveComponent } from 'vue'

const meta = {
  title: 'UI/Table',
  component: TableComponent,
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object' },
    columns: { control: 'object' },
    caption: { control: 'text' },
    empty: { control: 'text' },
    sticky: {
      control: 'select',
      options: [true, false, 'header', 'footer'] as (TableSticky | boolean)[],
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
      ] as TableLoadingColor[],
    },
    loadingAnimation: {
      control: 'select',
      options: ['loading', 'carousel', 'carousel-inverse', 'swing', 'elastic'] as TableLoadingAnimation[],
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
  } as Partial<TableModel>,
} as Meta<typeof TableComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<TableModel>
}

export const Default: Story = {
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
}

export const WithColumns: Story = {
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
    ],
    columns: [
      {
        accessorKey: 'id',
        header: '#',
        cell: ({ row }: any) => `#${row.getValue('id')}`,
      },
      {
        accessorKey: 'date',
        header: 'Дата',
        cell: ({ row }: any) => {
          return new Date(row.getValue('date')).toLocaleString('ru-RU', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        },
      },
      {
        accessorKey: 'status',
        header: 'Статус',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'amount',
        header: 'Сумма',
        cell: ({ row }: any) => {
          const amount = Number.parseFloat(row.getValue('amount'))
          const formatted = new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
          }).format(amount)
          return h('div', { class: 'text-right font-medium' }, formatted)
        },
      },
    ] as TableColumn[],
  },
}

export const Loading: Story = {
  args: {
    loading: true,
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
    ],
  },
}

export const LoadingWithColor: Story = {
  args: {
    loading: true,
    loadingColor: 'air-primary-success',
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
    ],
  },
}

export const Sticky: Story = {
  args: {
    sticky: true,
    data: Array(20).fill(0).map((_, i) => ({
      id: `460${i}`,
      date: '2024-03-11T15:30:00',
      status: 'paid',
      email: `user${i}@example.com`,
      amount: 594 + i * 10,
    })),
    columns: [
      {
        accessorKey: 'id',
        header: '#',
        cell: ({ row }: any) => `#${row.getValue('id')}`,
      },
      {
        accessorKey: 'date',
        header: 'Дата',
      },
      {
        accessorKey: 'status',
        header: 'Статус',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'amount',
        header: 'Сумма',
      },
    ] as TableColumn[],
  },
  render: (args) => ({
    components: { TableComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="h-[400px] overflow-auto">
        <TableComponent v-bind="args" />
      </div>
    `,
  }),
}

export const StickyHeader: Story = {
  args: {
    sticky: 'header',
    data: Array(20).fill(0).map((_, i) => ({
      id: `460${i}`,
      date: '2024-03-11T15:30:00',
      status: 'paid',
      email: `user${i}@example.com`,
      amount: 594 + i * 10,
    })),
    columns: [
      {
        accessorKey: 'id',
        header: '#',
        cell: ({ row }: any) => `#${row.getValue('id')}`,
      },
      {
        accessorKey: 'date',
        header: 'Дата',
      },
      {
        accessorKey: 'status',
        header: 'Статус',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'amount',
        header: 'Сумма',
      },
    ] as TableColumn[],
  },
  render: (args) => ({
    components: { TableComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="h-[400px] overflow-auto">
        <TableComponent v-bind="args" />
      </div>
    `,
  }),
}

export const Empty: Story = {
  args: {
    data: [],
    empty: 'Нет данных для отображения',
  },
}

export const WithCaption: Story = {
  args: {
    caption: 'Таблица платежей',
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
    ],
  },
}

export const WithComplexColumns: Story = {
  render: () => {
    const B24Badge = resolveComponent('B24Badge')
    
    return {
      components: { TableComponent },
      setup() {
        const data = [
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
        ]
        
        const columns: TableColumn[] = [
          {
            accessorKey: 'id',
            header: '#',
            cell: ({ row }: any) => `#${row.getValue('id')}`,
          },
          {
            accessorKey: 'date',
            header: 'Дата',
            cell: ({ row }: any) => {
              return new Date(row.getValue('date')).toLocaleString('ru-RU', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })
            },
          },
          {
            accessorKey: 'status',
            header: 'Статус',
            cell: ({ row }: any) => {
              const color = ({
                paid: 'air-primary-success',
                failed: 'air-primary-alert',
                refunded: 'air-primary',
              } as Record<string, string>)[row.getValue('status') as string]
              
              return h(B24Badge, { class: 'capitalize', color }, () => row.getValue('status'))
            },
          },
          {
            accessorKey: 'email',
            header: 'Email',
          },
          {
            accessorKey: 'amount',
            header: () => h('div', { class: 'text-right' }, 'Сумма'),
            cell: ({ row }: any) => {
              const amount = Number.parseFloat(row.getValue('amount'))
              const formatted = new Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency: 'RUB',
              }).format(amount)
              return h('div', { class: 'text-right font-medium' }, formatted)
            },
          },
        ]
        
        return { data, columns }
      },
      template: `
        <TableComponent :data="data" :columns="columns" />
      `,
    }
  },
}
