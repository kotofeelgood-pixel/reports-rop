import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TimelineComponent from '../../components/timeline/TimelineComponent.vue'

import { ref, onMounted } from 'vue'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'
import InfoIcon from '@bitrix24/b24icons-vue/button/InfoIcon'

const meta = {
  title: 'Data/Timeline',
  component: TimelineComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
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
    reverse: { control: 'boolean' },
  },
  args: {
    size: 'md',
    color: 'air-primary',
    orientation: 'vertical',
    reverse: false,
  },
} as Meta<typeof TimelineComponent>

export default meta
type Story = StoryObj<typeof meta>

const basicItems= [] = [
  {
    date: '15 марта 2025',
    title: 'Запуск проекта',
    description: 'Запуск проекта с командой. Установлены вехи проекта и выделены ресурсы.',
  },
  {
    date: '22 марта 2025',
    title: 'Фаза дизайна',
    description: 'Исследование пользователей и воркшопы по дизайну. Созданы макеты и прототипы для тестирования пользователей.',
  },
  {
    date: '29 марта 2025',
    title: 'Спринт разработки',
    description: 'Разработка фронтенда и бэкенда. Реализованы основные функции и интеграция с API.',
  },
  {
    date: '5 апреля 2025',
    title: 'Тестирование и развертывание',
    description: 'QA тестирование и оптимизация производительности. Развернуто приложение в продакшн.',
  },
]

export const Default: Story = {
  args: {
    items: basicItems,
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      {
        date: '15 марта 2025',
        title: 'Запуск проекта',
        description: 'Запуск проекта с командой. Установлены вехи проекта и выделены ресурсы.',
        icon: RocketIcon,
        value: 'kickoff',
      },
      {
        date: '22 марта 2025',
        title: 'Фаза дизайна',
        description: 'Исследование пользователей и воркшопы по дизайну. Созданы макеты и прототипы для тестирования пользователей.',
        icon: SignIcon,
        value: 'design',
      },
      {
        date: '29 марта 2025',
        title: 'Спринт разработки',
        description: 'Разработка фронтенда и бэкенда. Реализованы основные функции и интеграция с API.',
        icon: MoreMIcon,
        value: 'development',
      },
      {
        date: '5 апреля 2025',
        title: 'Тестирование и развертывание',
        description: 'QA тестирование и оптимизация производительности. Развернуто приложение в продакшн.',
        icon: InfoIcon,
        value: 'deployment',
      },
    ],
  },
}

export const WithAvatars: Story = {
  args: {
    items: [
      {
        date: '15 марта 2025',
        title: 'Запуск проекта',
        description: 'Запуск проекта с командой.',
        avatar: {
          src: '/b24ui/avatar/employee.png',
        },
      },
      {
        date: '22 марта 2025',
        title: 'Фаза дизайна',
        description: 'Исследование пользователей и воркшопы по дизайну.',
        avatar: {
          src: '/b24ui/avatar/assistant.png',
        },
      },
      {
        date: '29 марта 2025',
        title: 'Спринт разработки',
        description: 'Разработка фронтенда и бэкенда.',
        avatar: {
          src: '/b24ui/avatar/employee.png',
        },
      },
    ],
  },
}

export const WithActiveItem: Story = {
  render: () => ({
    components: { TimelineComponent },
    setup() {
      const active = ref(2)

      const items= [] = [
        {
          date: '15 марта 2025',
          title: 'Запуск проекта',
          description: 'Запуск проекта с командой. Установлены вехи проекта и выделены ресурсы.',
          icon: RocketIcon,
          value: 'kickoff',
        },
        {
          date: '22 марта 2025',
          title: 'Фаза дизайна',
          description: 'Исследование пользователей и воркшопы по дизайну. Созданы макеты и прототипы для тестирования пользователей.',
          icon: SignIcon,
          value: 'design',
        },
        {
          date: '29 марта 2025',
          title: 'Спринт разработки',
          description: 'Разработка фронтенда и бэкенда. Реализованы основные функции и интеграция с API.',
          icon: MoreMIcon,
          value: 'development',
        },
        {
          date: '5 апреля 2025',
          title: 'Тестирование и развертывание',
          description: 'QA тестирование и оптимизация производительности. Развернуто приложение в продакшн.',
          icon: InfoIcon,
          value: 'deployment',
        },
      ]

      onMounted(() => {
        setInterval(() => {
          active.value = (active.value + 1) % items.length
        }, 2000)
      })

      return { items, active }
    },
    template: `
      <div class="w-[384px]">
        <TimelineComponent v-model="active" :items="items" />
      </div>
    `,
  }),
}

export const AllColors: Story = {
  render: () => ({
    components: { TimelineComponent },
    setup() {
      const items= [] = [
        {
          date: '15 марта 2025',
          title: 'Primary',
          description: 'Timeline с цветом Primary.',
        },
        {
          date: '22 марта 2025',
          title: 'Success',
          description: 'Timeline с цветом Success.',
        },
        {
          date: '29 марта 2025',
          title: 'Alert',
          description: 'Timeline с цветом Alert.',
        },
        {
          date: '5 апреля 2025',
          title: 'Warning',
          description: 'Timeline с цветом Warning.',
        },
      ]

      const colors= [] = [
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-warning',
      ]

      return { items, colors }
    },
    template: `
      <div class="space-y-8">
        <div v-for="(color, index) in colors" :key="color">
          <div class="mb-2 text-sm font-medium">{{ color }}</div>
          <TimelineComponent :items="items" :color="color" :default-value="2" class="w-[384px]" />
        </div>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { TimelineComponent },
    setup() {
      const items= [] = [
        {
          date: '15 марта 2025',
          title: 'Запуск проекта',
          description: 'Запуск проекта с командой.',
        },
        {
          date: '22 марта 2025',
          title: 'Фаза дизайна',
          description: 'Исследование пользователей.',
        },
        {
          date: '29 марта 2025',
          title: 'Спринт разработки',
          description: 'Разработка фронтенда и бэкенда.',
        },
      ]

      const sizes= [] = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']

      return { items, sizes }
    },
    template: `
      <div class="space-y-8">
        <div v-for="size in sizes" :key="size">
          <div class="mb-2 text-sm font-medium">{{ size }}</div>
          <TimelineComponent :items="items" :size="size" :default-value="2" class="w-[384px]" />
        </div>
      </div>
    `,
  }),
}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    items: [
      {
        date: '15 марта',
        title: 'Запуск',
        description: 'Запуск проекта с командой.',
      },
      {
        date: '22 марта',
        title: 'Дизайн',
        description: 'Исследование пользователей.',
      },
      {
        date: '29 марта',
        title: 'Разработка',
        description: 'Разработка фронтенда и бэкенда.',
      },
      {
        date: '5 апреля',
        title: 'Тестирование',
        description: 'QA тестирование и оптимизация.',
      },
    ],
  },
  render: (args) => ({
    components: { TimelineComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="w-full">
        <TimelineComponent v-bind="args" :default-value="2" />
      </div>
    `,
  }),
}

export const Reverse: Story = {
  args: {
    reverse: true,
    items: basicItems,
  },
  render: (args) => ({
    components: { TimelineComponent },
    setup() {
      const active = ref(2)
      return { args, active }
    },
    template: `
      <div class="w-[384px]">
        <TimelineComponent v-bind="args" v-model="active" />
      </div>
    `,
  }),
}

export const WithCustomSlots: Story = {
  render: () => ({
    components: { TimelineComponent },
    setup() {
      const items= [] = [
        {
          date: '15 марта 2025',
          title: 'Запуск проекта',
          subtitle: 'Инициация проекта',
          description: 'Запуск проекта с командой. Установлены вехи проекта и выделены ресурсы.',
          icon: RocketIcon,
          value: 'kickoff',
        },
        {
          date: '22 марта 2025',
          title: 'Фаза дизайна',
          description: 'Исследование пользователей и воркшопы по дизайну. Созданы макеты и прототипы для тестирования пользователей.',
          icon: SignIcon,
          value: 'design',
        },
        {
          date: '29 марта 2025',
          title: 'Спринт разработки',
          description: 'Разработка фронтенда и бэкенда. Реализованы основные функции и интеграция с API.',
          icon: MoreMIcon,
          value: 'development',
          slot: 'development',
          developers: [
            {
              src: 'https://github.com/bitrix-tools.png',
            },
            {
              src: 'https://github.com/bitrix24.png',
            },
          ],
        },
        {
          date: '5 апреля 2025',
          title: 'Тестирование и развертывание',
          description: 'QA тестирование и оптимизация производительности. Развернуто приложение в продакшн.',
          icon: InfoIcon,
          value: 'deployment',
        },
      ]

      return { items }
    },
    template: `
      <div class="w-[384px]">
        <TimelineComponent :items="items" :default-value="2">
          <template #development-title="{ item }">
            <div class="flex items-center gap-1">
              <span>{{ item.title }}</span>
              <div class="flex -space-x-1">
                <img
                  v-for="(developer, index) in item.developers"
                  :key="index"
                  :src="developer.src"
                  alt="Developer"
                  class="w-5 h-5 rounded-full border-2 border-white"
                />
              </div>
            </div>
          </template>
        </TimelineComponent>
      </div>
    `,
  }),
}

export const WithSlots: Story = {
  render: () => ({
    components: { TimelineComponent },
    setup() {
      const items= [] = [
        {
          username: 'Имя сотрудника',
          date: '2025-05-24T14:58:55Z',
          action: 'открыл это',
          avatar: {
            src: '/b24ui/avatar/employee.png',
          },
        },
        {
          username: 'Имя сотрудника',
          date: '2025-05-26T19:30:14+02:00',
          action: 'отметил этот pull request как готовый к проверке',
          icon: RocketIcon,
        },
        {
          username: 'Имя ассистента',
          date: '2025-05-27T11:01:20Z',
          action: 'прокомментировал это',
          description: 'Я внес несколько изменений, дайте знать, что вы думаете! В основном я обновил дизайн, убрал ненужные div, использовал компонент Avatar для индикатора, так как он уже поддерживает иконку.',
          avatar: {
            src: '/b24ui/avatar/assistant.png',
          },
        },
        {
          username: 'Имя сотрудника',
          date: '2025-05-27T11:01:20Z',
          action: 'прокомментировал это',
          description: 'Выглядит отлично! Хорошая работа по очистке.',
          avatar: {
            src: '/b24ui/avatar/employee.png',
          },
        },
        {
          username: 'Имя ассистента',
          date: '2025-05-27T11:01:20Z',
          action: 'объединил это',
          icon: MoreMIcon,
        },
      ]

      function formatDate(dateString: string) {
        const date = new Date(dateString)
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        
        if (days === 0) return 'сегодня'
        if (days === 1) return 'вчера'
        if (days < 7) return `${days} дней назад`
        if (days < 30) return `${Math.floor(days / 7)} недель назад`
        return `${Math.floor(days / 30)} месяцев назад`
      }

      return { items, formatDate }
    },
    template: `
      <div class="w-[384px]">
        <TimelineComponent
          :items="items"
          size="xs"
          :b24ui="{
            date: 'float-end ms-1',
            description: 'px-3 py-2 ring ring-gray-200 mt-2 rounded-md text-gray-600'
          }"
        >
          <template #title="{ item }">
            <span>{{ item.username }}</span>
            <span class="font-normal text-gray-500">&nbsp;{{ item.action }}</span>
          </template>

          <template #date="{ item }">
            {{ formatDate(item.date) }}
          </template>
        </TimelineComponent>
      </div>
    `,
  }),
}

export const WithAlternatingLayout: Story = {
  render: () => ({
    components: { TimelineComponent },
    setup() {
      const items= [] = [
        {
          date: '15 марта 2025',
          title: 'Запуск проекта',
          icon: RocketIcon,
          value: 'kickoff',
        },
        {
          date: '22 марта 2025',
          title: 'Фаза дизайна',
          icon: SignIcon,
          value: 'design',
        },
        {
          date: '29 марта 2025',
          title: 'Спринт разработки',
          icon: MoreMIcon,
          value: 'development',
        },
        {
          date: '5 апреля 2025',
          title: 'Тестирование и развертывание',
          icon: InfoIcon,
          value: 'deployment',
        },
      ]

      return { items }
    },
    template: `
      <div class="translate-x-[calc(50%-1rem)]">
        <TimelineComponent
          :items="items"
          :default-value="2"
          :b24ui="{ item: 'even:flex-row-reverse even:-translate-x-[calc(100%-2rem)] even:text-right' }"
        />
      </div>
    `,
  }),
