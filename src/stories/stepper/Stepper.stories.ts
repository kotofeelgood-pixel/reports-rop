import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StepperComponent from '../../components/stepper/StepperComponent.vue'

import type { StepperItem } from '@bitrix24/b24ui-nuxt'
import LocationIcon from '@bitrix24/b24icons-vue/outline/LocationIcon'
import DeliveryIcon from '@bitrix24/b24icons-vue/outline/DeliveryIcon'

const meta = {
  title: 'Navigation/Stepper',
  component: StepperComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: [
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-warning',
        'air-primary-copilot',
      ],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    defaultValue: { control: 'number' },
    disabled: { control: 'boolean' },
    linear: { control: 'boolean' },
    modelValue: { control: 'number' },
  },
  args: {
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ],
    size: 'md',
    color: 'air-primary',
    orientation: 'horizontal',
    linear: true,
  },
} as Meta<typeof StepperComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

