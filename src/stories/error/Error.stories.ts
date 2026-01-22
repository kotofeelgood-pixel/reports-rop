import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ErrorComponent from '../../components/error/ErrorComponent.vue'

import type { ButtonProps } from '@bitrix24/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import HomeIcon from '@bitrix24/b24icons-vue/outline/HomeIcon'
import { commonMeta } from '../meta'

const meta = {
  ...commonMeta,
  title: 'Layout/Error',
  component: ErrorComponent,
  argTypes: {
    error: { control: 'object' },
    redirect: { control: 'text' },
    clear: { control: 'object' },
  },
  args: {
    error: {
      statusCode: 404,
      statusMessage: 'Page not found',
      message: 'Страница, которую вы ищете, не существует.',
    },
    redirect: '/',
    clear: true,
  },
} as Meta<typeof ErrorComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    error: {
      statusCode: 404,
      statusMessage: 'Page not found',
      message: 'Страница, которую вы ищете, не существует.',
    },
  },
}

export const Error500: Story = {
  args: {
    error: {
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Произошла внутренняя ошибка сервера. Пожалуйста, попробуйте позже.',
    },
  },
}

export const Error403: Story = {
  args: {
    error: {
      statusCode: 403,
      statusMessage: 'Forbidden',
      message: 'У вас нет доступа к этой странице.',
    },
  },
}

export const Error401: Story = {
  args: {
    error: {
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Для доступа к этой странице необходимо авторизоваться.',
    },
  },
}

export const WithCustomRedirect: Story = {
  args: {
    error: {
      statusCode: 404,
      statusMessage: 'Page not found',
      message: 'Страница, которую вы ищете, не существует.',
    },
    redirect: '/docs/getting-started/',
  },
}

export const WithCustomClearButton: Story = {
  args: {
    error: {
      statusCode: 404,
      statusMessage: 'Page not found',
      message: 'Страница, которую вы ищете, не существует.',
    },
    clear: {
      color: 'air-primary-alert',
      size: 'xl',
      icon: RocketIcon,
      label: 'Вернуться на главную',
      class: 'rounded-full',
    } as ButtonProps,
  },
}

export const WithoutClearButton: Story = {
  args: {
    error: {
      statusCode: 404,
      statusMessage: 'Page not found',
      message: 'Страница, которую вы ищете, не существует.',
    },
    clear: false,
  },
}

export const WithCustomSlots: Story = {
  args: {
    error: {
      statusCode: 404,
      statusMessage: 'Page not found',
      message: 'Страница, которую вы ищете, не существует.',
    },
  },
  render: (args) => ({
    components: { ErrorComponent },
    setup() {
      return { args }
    },
    template: `
      <ErrorComponent v-bind="args">
        <template #statusCode>
          <span class="text-2xl font-bold text-red-500">{{ args.error?.statusCode }}</span>
        </template>
        <template #statusMessage>
          <h1 class="text-4xl font-bold">{{ args.error?.statusMessage }}</h1>
        </template>
        <template #message>
          <p class="text-lg text-gray-600">{{ args.error?.message }}</p>
        </template>
        <template #links>
          <a
            href="/"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            На главную
          </a>
        </template>
      </ErrorComponent>
    `,
  }),
}

export const LongMessage: Story = {
  args: {
    error: {
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Произошла внутренняя ошибка сервера. Это может быть вызвано временными проблемами с сервером, неправильной конфигурацией или ошибкой в коде приложения. Пожалуйста, попробуйте обновить страницу через несколько минут. Если проблема сохраняется, свяжитесь с администратором.',
    },
  },
}

export const MinimalError: Story = {
  args: {
    error: {
      statusCode: 404,
    },
    clear: false,
  },
}

export const InContext: Story = {
  args: {
    error: {
      statusCode: 404,
      statusMessage: 'Page not found',
      message: 'Страница, которую вы ищете, не существует.',
    },
    redirect: '/',
    clear: {
      icon: HomeIcon,
      label: 'На главную',
    } as ButtonProps,
  },
  render: (args) => ({
    components: { ErrorComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="min-h-screen bg-gray-50">
        <ErrorComponent v-bind="args" />
      </div>
    `,
  }),
}

export const WithDefaultSlot: Story = {
  args: {
    error: {
      statusCode: 404,
      statusMessage: 'Page not found',
      message: 'Страница, которую вы ищете, не существует.',
    },
  },
  render: (args) => ({
    components: { ErrorComponent },
    setup() {
      return { args }
    },
    template: `
      <ErrorComponent v-bind="args">
        <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p class="text-blue-800">
            <strong>Совет:</strong> Проверьте правильность URL или вернитесь на главную страницу.
          </p>
        </div>
      </ErrorComponent>
    `,
  }),
