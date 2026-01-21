import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BreadcrumbComponent from './BreadcrumbComponent.vue'
import type { BreadcrumbModel } from './model'
import type { BreadcrumbItem } from '@bitrix24/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import MoreLIcon from '@bitrix24/b24icons-vue/outline/MoreLIcon'
import HomeIcon from '@bitrix24/b24icons-vue/outline/HomeIcon'
import ProductIcon from '@bitrix24/b24icons-vue/outline/ProductIcon'
import LinkIcon from '@bitrix24/b24icons-vue/outline/LinkIcon'

const meta = {
  title: 'UI/Breadcrumb',
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
    ] as BreadcrumbItem[],
  } as Partial<BreadcrumbModel>,
} as Meta<typeof BreadcrumbComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<BreadcrumbModel>
}

export const Default: Story = {
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
    ] as BreadcrumbItem[],
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      {
        label: 'Главная',
        to: '/',
        icon: HomeIcon,
      },
      {
        label: 'Компоненты',
        to: '/docs/components',
        icon: ProductIcon,
      },
      {
        label: 'Breadcrumb',
        to: '/docs/components/breadcrumb',
        icon: LinkIcon,
      },
    ] as BreadcrumbItem[],
  },
}

export const WithSeparatorIcon: Story = {
  args: {
    separatorIcon: RocketIcon,
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
    ] as BreadcrumbItem[],
  },
}

export const WithLastItemAsSpan: Story = {
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
        // Нет to, поэтому будет span
      },
    ] as BreadcrumbItem[],
  },
}

export const WithAvatars: Story = {
  args: {
    items: [
      {
        label: 'Пользователь',
        avatar: { src: '/b24ui/avatar/employee.png' },
        to: '/user',
      },
      {
        label: 'Профиль',
        avatar: { src: '/b24ui/avatar/employee.png' },
        to: '/user/profile',
      },
      {
        label: 'Настройки',
      },
    ] as BreadcrumbItem[],
  },
}

export const LongLabels: Story = {
  args: {
    items: [
      {
        label: 'Очень длинное название раздела документации',
        to: '/docs',
      },
      {
        label: 'Еще одно длинное название компонента',
        to: '/docs/components',
      },
      {
        label: 'И наконец, название текущей страницы с очень длинным текстом',
        to: '/docs/components/breadcrumb',
      },
    ] as BreadcrumbItem[],
  },
}

export const WithCustomSeparator: Story = {
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
    ] as BreadcrumbItem[],
  },
  render: (args) => ({
    components: { BreadcrumbComponent },
    setup() {
      return { args }
    },
    template: `
      <BreadcrumbComponent v-bind="args">
        <template #separator>
          <span class="mx-2 text-gray-400">/</span>
        </template>
      </BreadcrumbComponent>
    `,
  }),
}

export const WithCustomSlot: Story = {
  args: {
    items: [
      {
        label: 'Главная',
        to: '/',
        icon: HomeIcon,
      },
      {
        slot: 'dropdown' as const,
        icon: MoreLIcon,
        children: [
          {
            label: 'Документация',
            to: '/docs',
          },
          {
            label: 'Темы',
          },
          {
            label: 'GitHub',
          },
        ],
      },
      {
        label: 'Компоненты',
        to: '/docs/components',
        icon: ProductIcon,
      },
      {
        label: 'Breadcrumb',
        to: '/docs/components/breadcrumb',
        icon: LinkIcon,
      },
    ] as BreadcrumbItem[],
  },
  render: (args) => ({
    components: { BreadcrumbComponent },
    setup() {
      return { args }
    },
    template: `
      <BreadcrumbComponent v-bind="args">
        <template #dropdown="{ item }">
          <div class="inline-flex items-center">
            <button class="p-1 rounded hover:bg-gray-100">
              <component :is="item.icon" class="size-5" />
            </button>
            <div class="ml-2 text-sm text-gray-600">
              Dropdown: {{ item.children?.length }} элементов
            </div>
          </div>
        </template>
      </BreadcrumbComponent>
    `,
  }),
}

export const WithItemSlots: Story = {
  args: {
    items: [
      {
        label: 'Документация',
        to: '/docs',
        icon: HomeIcon,
      },
      {
        label: 'Компоненты',
        to: '/docs/components',
        icon: ProductIcon,
      },
      {
        label: 'Breadcrumb',
        to: '/docs/components/breadcrumb',
        icon: LinkIcon,
      },
    ] as BreadcrumbItem[],
  },
  render: (args) => ({
    components: { BreadcrumbComponent },
    setup() {
      return { args }
    },
    template: `
      <BreadcrumbComponent v-bind="args">
        <template #item-leading="{ item }">
          <span class="text-blue-500">→</span>
        </template>
        <template #item-label="{ item }">
          <span class="font-bold">{{ item.label }}</span>
        </template>
      </BreadcrumbComponent>
    `,
  }),
}

export const InContext: Story = {
  args: {
    items: [
      {
        label: 'Главная',
        to: '/',
        icon: HomeIcon,
      },
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
    ] as BreadcrumbItem[],
  },
  render: (args) => ({
    components: { BreadcrumbComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-4xl space-y-4">
        <BreadcrumbComponent v-bind="args" />
        <div class="border-t pt-4">
          <h1 class="text-3xl font-bold mb-2">Breadcrumb</h1>
          <p class="text-gray-600">
            Компонент навигации для отображения текущего местоположения на странице.
          </p>
        </div>
      </div>
    `,
  }),
}
