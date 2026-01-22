import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BannerComponent from '../../components/banner/BannerComponent.vue'

const meta = {
  title: 'Element/Banner',
  component: BannerComponent,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    icon: { control: 'object' },
    title: { control: 'text' },
    actions: { control: 'object' },
    to: { control: 'text' },
    target: {
      control: 'select',
      options: ['_blank', '_parent', '_self', '_top'],
    },
    color: {
      control: 'select',
      options: [
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-warning',
        'air-primary-copilot',
        'air-secondary',
        'air-secondary-alert',
        'air-secondary-accent',
        'air-secondary-accent-1',
        'air-secondary-accent-2',
        'air-tertiary',
      ],
    },
    close: { control: 'boolean' },
    closeIcon: { control: 'object' },
  },
  args: {
    title: 'Пробный период подписки закончился. Подпишитесь, чтобы продолжить использование всех приложений.',
    color: 'air-primary-alert',
    close: false,
  },
} as Meta<typeof BannerComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

