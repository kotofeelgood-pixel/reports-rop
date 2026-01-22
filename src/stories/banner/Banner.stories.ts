import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BannerComponent from '../../components/banner/BannerComponent.vue'

import type { ButtonProps } from '@bitrix24/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import CircleCrossIcon from '@bitrix24/b24icons-vue/outline/CircleCrossIcon'

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

export const Default: Story = {
  args: {
    title: 'Пробный период подписки закончился. Подпишитесь, чтобы продолжить использование всех приложений.',
  },
}

export const WithTitle: Story = {
  args: {
    title: 'Пробный период подписки закончился. Подпишитесь, чтобы продолжить использование всех приложений.',
  },
}

export const WithIcon: Story = {
  args: {
    icon: RocketIcon,
    title: 'Пробный период подписки закончился. Подпишитесь, чтобы продолжить использование всех приложений.',
  },
}

export const AirPrimary: Story = {
  args: {
    color: 'air-primary',
    icon: RocketIcon,
    title: 'Пробный период подписки закончился. Подпишитесь, чтобы продолжить использование всех приложений.',
  },
}

export const AirPrimarySuccess: Story = {
  args: {
    color: 'air-primary-success',
    icon: RocketIcon,
    title: 'Операция выполнена успешно.',
  },
}

export const AirPrimaryAlert: Story = {
  args: {
    color: 'air-primary-alert',
    icon: RocketIcon,
    title: 'Пробный период подписки закончился. Подпишитесь, чтобы продолжить использование всех приложений.',
  },
}

export const AirPrimaryWarning: Story = {
  args: {
    color: 'air-primary-warning',
    icon: RocketIcon,
    title: 'Внимание! Пробный период подписки скоро закончится.',
  },
}

export const AirPrimaryCopilot: Story = {
  args: {
    color: 'air-primary-copilot',
    icon: RocketIcon,
    title: 'Сообщение от Copilot.',
  },
}

export const AirSecondary: Story = {
  args: {
    color: 'air-secondary',
    title: 'Пробный период подписки закончился. Подпишитесь, чтобы продолжить использование всех приложений.',
  },
}

export const AirSecondaryAlert: Story = {
  args: {
    color: 'air-secondary-alert',
    title: 'Произошла ошибка при выполнении операции.',
  },
}

export const AirSecondaryAccent: Story = {
  args: {
    color: 'air-secondary-accent',
    title: 'Пробный период подписки закончился. Подпишитесь, чтобы продолжить использование всех приложений.',
  },
}

export const AirSecondaryAccent1: Story = {
  args: {
    color: 'air-secondary-accent-1',
    title: 'Пробный период подписки закончился. Подпишитесь, чтобы продолжить использование всех приложений.',
  },
}

export const AirSecondaryAccent2: Story = {
  args: {
    color: 'air-secondary-accent-2',
    title: 'Пробный период подписки закончился. Подпишитесь, чтобы продолжить использование всех приложений.',
  },
}

export const AirTertiary: Story = {
  args: {
    color: 'air-tertiary',
    title: 'Пробный период подписки закончился. Подпишитесь, чтобы продолжить использование всех приложений.',
  },
}

export const WithClose: Story = {
  args: {
    title: 'Пробный период подписки закончился. Подпишитесь, чтобы продолжить использование всех приложений.',
    close: true,
  },
}

export const WithCloseIcon: Story = {
  args: {
    title: 'Пробный период подписки закончился. Подпишитесь, чтобы продолжить использование всех приложений.',
    close: true,
    closeIcon: CircleCrossIcon,
  },
}

export const WithActions: Story = {
  args: {
    title: 'Пробный период подписки закончился. Подпишитесь, чтобы продолжить использование всех приложений.',
    actions: [
      {
        label: 'Купить подписку',
        color: 'air-primary',
        icon: RocketIcon,
      },
      {
        label: 'Открыть сканер',
        color: 'air-secondary-accent-2',
      },
    ],
  },
}

export const WithLink: Story = {
  args: {
    title: 'Изучите Bitrix24 REST API',
    to: 'https://apidocs.bitrix24.com/',
    target: '_blank',
    color: 'air-primary',
  },
}

export const WithId: Story = {
  args: {
    id: 'example-banner',
    title: 'Это закрываемый баннер',
    close: true,
  },
}

export const WithAllFeatures: Story = {
  args: {
    id: 'full-banner',
    icon: RocketIcon,
    title: 'Пробный период подписки закончился. Подпишитесь, чтобы продолжить использование всех приложений.',
    color: 'air-primary-alert',
    actions: [
      {
        label: 'Купить подписку',
        color: 'air-primary',
        icon: RocketIcon,
      },
      {
        label: 'Открыть сканер',
        color: 'air-secondary-accent-2',
      },
    ],
    close: true,
    closeIcon: CircleCrossIcon,
  },
}

export const WithCloseHandler: Story = {
  args: {
    title: 'Это закрываемый баннер с обработчиком',
    close: true,
  },
  render: (args) => ({
    components: { BannerComponent },
    setup() {
      return {
        args,
        onClose: () => {
          console.log('Banner closed')
        },
      }
    },
    template: `
      <BannerComponent v-bind="args" @close="onClose" />
    `,
  }),
