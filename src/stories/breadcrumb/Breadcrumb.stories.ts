import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BreadcrumbComponent from '../../components/breadcrumb/BreadcrumbComponent.vue'

const meta = {
  title: 'Navigation/Breadcrumb',
  component: BreadcrumbComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    separatorIcon: { control: 'object' },
    labelKey: { control: 'text' },
  },
  args: {
    items: [
      {
        label: 'Документация',
        to: '/docs',
      },
      {
        label: 'Компоненты',
        to: '/docs/components',
      },
      {
        label: 'Breadcrumb',
        to: '/docs/components/breadcrumb',
      },
    ],
  },
} as Meta<typeof BreadcrumbComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
