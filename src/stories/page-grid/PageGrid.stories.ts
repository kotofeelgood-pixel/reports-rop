import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PageGridComponent from '../../components/page-grid/PageGridComponent.vue'

import CopilotIcon from '@bitrix24/b24icons-vue/outline/CopilotIcon'
import CrmLettersIcon from '@bitrix24/b24icons-vue/outline/CrmLettersIcon'
import TaskIcon from '@bitrix24/b24icons-vue/outline/TaskIcon'
import HrAutomationIcon from '@bitrix24/b24icons-vue/main/HrAutomationIcon'

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

export const Default: Story = {
  render: () => ({
    components: { PageGridComponent },
    setup() {
      const cards = [
        {
          title: 'Онлайн рабочее пространство для всей команды',
          description: 'Благодаря широкому спектру инструментов для общения и совместной работы, Bitrix24 позволяет командам эффективно работать где угодно – дома, в офисе или в дороге.',
          icon: CopilotIcon,
          to: 'https://www.bitrix24.com/tools/communications/',
        },
        {
          title: 'Бесплатная CRM для вашего бизнеса',
          description: 'Продавайте больше. Продавайте лучше. Продавайте быстрее с Bitrix24 – единой платформой для всех ваших потребностей.',
          icon: CrmLettersIcon,
          to: 'https://www.bitrix24.com/tools/crm/',
        },
        {
          title: 'Бесплатное ПО для управления задачами',
          description: 'Ставьте задачи, управляйте сроками, собирайте отчеты, отслеживайте KPI и управляйте проектами откуда угодно.',
          icon: TaskIcon,
          to: 'https://www.bitrix24.com/tools/tasks_and_projects/',
        },
      ]

      return { cards }
    },
    template: `
      <PageGridComponent>
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
        >
          <component
            :is="card.icon"
            class="size-8 mb-4 text-blue-500"
          />
          <h3 class="text-xl font-semibold mb-2">{{ card.title }}</h3>
          <p class="text-gray-600">{{ card.description }}</p>
          <a
            :href="card.to"
            target="_blank"
            class="mt-4 inline-block text-blue-500 hover:underline"
          >
            Узнать больше →
          </a>
        </div>
      </PageGridComponent>
    `,
  }),
}

export const WithPageCards: Story = {
  render: () => ({
    components: { PageGridComponent },
    setup() {
      const cards = [
        {
          title: 'Онлайн рабочее пространство для всей команды',
          description: 'Благодаря широкому спектру инструментов для общения и совместной работы, Bitrix24 позволяет командам эффективно работать где угодно – дома, в офисе или в дороге.',
          icon: CopilotIcon,
          to: 'https://www.bitrix24.com/tools/communications/',
        },
        {
          title: 'Бесплатная CRM для вашего бизнеса',
          description: 'Продавайте больше. Продавайте лучше. Продавайте быстрее с Bitrix24 – единой платформой для всех ваших потребностей.',
          icon: CrmLettersIcon,
          to: 'https://www.bitrix24.com/tools/crm/',
        },
        {
          title: 'Бесплатное ПО для управления задачами',
          description: 'Ставьте задачи, управляйте сроками, собирайте отчеты, отслеживайте KPI и управляйте проектами откуда угодно.',
          icon: TaskIcon,
          to: 'https://www.bitrix24.com/tools/tasks_and_projects/',
        },
      ]

      return { cards }
    },
    template: `
      <PageGridComponent>
        <B24PageCard
          v-for="(card, index) in cards"
          :key="index"
          :title="card.title"
          :description="card.description"
          :icon="card.icon"
          :to="card.to"
        />
      </PageGridComponent>
    `,
  }),
}

export const BentoLayout: Story = {
  render: () => ({
    components: { PageGridComponent },
    setup() {
      const cards = [
        {
          title: 'Онлайн рабочее пространство для всей команды',
          description: 'Благодаря широкому спектру инструментов для общения и совместной работы, Bitrix24 позволяет командам эффективно работать где угодно – дома, в офисе или в дороге.',
          icon: CopilotIcon,
          to: 'https://www.bitrix24.com/tools/communications/',
          class: 'lg:col-span-2',
          variant: 'filled' as const,
          orientation: 'horizontal' as const,
        },
        {
          title: 'Бесплатная CRM для вашего бизнеса',
          description: 'Продавайте больше. Продавайте лучше. Продавайте быстрее с Bitrix24 – единой платформой для всех ваших потребностей.',
          icon: CrmLettersIcon,
          to: 'https://www.bitrix24.com/tools/crm/',
          variant: 'tinted-no-accent' as const,
        },
        {
          title: 'Бесплатное ПО для управления задачами',
          description: 'Ставьте задачи, управляйте сроками, собирайте отчеты, отслеживайте KPI и управляйте проектами откуда угодно.',
          icon: TaskIcon,
          to: 'https://www.bitrix24.com/tools/tasks_and_projects/',
          variant: 'tinted-no-accent' as const,
        },
        {
          title: 'HR управление и автоматизация процессов',
          description: 'Оптимизируйте рабочие процессы, автоматизируйте бизнес-процессы и управляйте данными сотрудников как профессионал.',
          icon: HrAutomationIcon,
          to: 'https://www.bitrix24.com/tools/hr_automation/',
          class: 'lg:col-span-2',
          variant: 'tinted' as const,
          orientation: 'horizontal' as const,
          reverse: true,
        },
      ]

      return { cards }
    },
    template: `
      <PageGridComponent>
        <B24PageCard
          v-for="(card, index) in cards"
          :key="index"
          :title="card.title"
          :description="card.description"
          :icon="card.icon"
          :to="card.to"
          :variant="card.variant"
          :orientation="card.orientation"
          :reverse="card.reverse"
          :class="card.class"
        />
      </PageGridComponent>
    `,
  }),
}

export const ManyCards: Story = {
  render: () => ({
    components: { PageGridComponent },
    setup() {
      const cards = Array.from({ length: 9 }, (_, i) => ({
        title: `Карточка ${i + 1}`,
        description: `Описание для карточки ${i + 1}. Это демонстрация адаптивной сетки, которая автоматически настраивается от 1 до 3 колонок в зависимости от размера экрана.`,
        icon: CopilotIcon,
      }))

      return { cards }
    },
    template: `
      <PageGridComponent>
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
        >
          <component
            :is="card.icon"
            class="size-8 mb-4 text-blue-500"
          />
          <h3 class="text-xl font-semibold mb-2">{{ card.title }}</h3>
          <p class="text-gray-600">{{ card.description }}</p>
        </div>
      </PageGridComponent>
    `,
  }),
}

export const WithCustomContent: Story = {
  render: () => ({
    components: { PageGridComponent },
    setup() {
      return {}
    },
    template: `
      <PageGridComponent>
        <div class="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 class="text-xl font-semibold mb-2 text-blue-900">Кастомный контент 1</h3>
          <p class="text-blue-700">Это пример кастомного контента в сетке.</p>
        </div>
        <div class="p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 class="text-xl font-semibold mb-2 text-green-900">Кастомный контент 2</h3>
          <p class="text-green-700">Сетка автоматически адаптируется под размер экрана.</p>
        </div>
        <div class="p-6 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 class="text-xl font-semibold mb-2 text-purple-900">Кастомный контент 3</h3>
          <p class="text-purple-700">От 1 колонки на мобильных до 3 на больших экранах.</p>
        </div>
        <div class="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 class="text-xl font-semibold mb-2 text-yellow-900">Кастомный контент 4</h3>
          <p class="text-yellow-700">Используйте utility классы для создания bento layout.</p>
        </div>
      </PageGridComponent>
    `,
  }),
}

export const InContext: Story = {
  render: () => ({
    components: { PageGridComponent },
    setup() {
      const cards = [
        {
          title: 'Онлайн рабочее пространство для всей команды',
          description: 'Благодаря широкому спектру инструментов для общения и совместной работы, Bitrix24 позволяет командам эффективно работать где угодно.',
          icon: CopilotIcon,
        },
        {
          title: 'Бесплатная CRM для вашего бизнеса',
          description: 'Продавайте больше. Продавайте лучше. Продавайте быстрее с Bitrix24.',
          icon: CrmLettersIcon,
        },
        {
          title: 'Бесплатное ПО для управления задачами',
          description: 'Ставьте задачи, управляйте сроками, собирайте отчеты и отслеживайте KPI.',
          icon: TaskIcon,
        },
      ]

      return { cards }
    },
    template: `
      <div class="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 class="text-3xl font-bold mb-2">PageGrid</h1>
          <p class="text-gray-600">
            Адаптивная система сетки для создания гибких макетов контента. Автоматически настраивается от 1 до 3 колонок в зависимости от размера экрана.
          </p>
        </div>
        <PageGridComponent>
          <div
            v-for="(card, index) in cards"
            :key="index"
            class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
          >
            <component
              :is="card.icon"
              class="size-8 mb-4 text-blue-500"
            />
            <h3 class="text-xl font-semibold mb-2">{{ card.title }}</h3>
            <p class="text-gray-600">{{ card.description }}</p>
          </div>
        </PageGridComponent>
      </div>
    `,
  }),
