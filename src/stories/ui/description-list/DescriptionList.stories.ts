import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DescriptionListComponent from './DescriptionListComponent.vue'
import type { DescriptionListModel, DescriptionListSize } from './model'
import type { DescriptionListItem, ButtonProps } from '@bitrix24/b24ui-nuxt'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import DotsIcon from '@bitrix24/b24icons-vue/button/DotsIcon'
import DownloadDoubleIcon from '@bitrix24/b24icons-vue/actions/DownloadDoubleIcon'
import Calendar1Icon from '@bitrix24/b24icons-vue/main/Calendar1Icon'
import CreditDebitCardIcon from '@bitrix24/b24icons-vue/main/CreditDebitCardIcon'

const meta = {
  title: 'UI/DescriptionList',
  component: DescriptionListComponent,
  tags: ['autodocs'],
  argTypes: {
    legend: { control: 'text' },
    text: { control: 'text' },
    labelKey: { control: 'text' },
    descriptionKey: { control: 'text' },
    items: { control: 'object' },
    size: {
      control: 'select',
      options: ['md', 'sm'] as DescriptionListSize[],
    },
  },
  args: {
    legend: 'Информация о заявителе',
    text: 'Личные данные и заявка.',
    items: [
      {
        label: 'Полное имя',
        description: 'Михаил Фостер',
      },
      {
        label: 'Событие',
        description: 'Оплата производится через Atol online',
      },
    ] as DescriptionListItem[],
    size: 'md',
  } as Partial<DescriptionListModel>,
} as Meta<typeof DescriptionListComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<DescriptionListModel>
}

export const Default: Story = {
  args: {
    legend: 'Информация о заявителе',
    text: 'Личные данные и заявка.',
    items: [
      {
        label: 'Полное имя',
        description: 'Михаил Фостер',
      },
      {
        label: 'Событие',
        description: 'Оплата производится через Atol online',
      },
    ] as DescriptionListItem[],
  },
}

export const WithoutLegend: Story = {
  args: {
    items: [
      {
        label: 'Полное имя',
        description: 'Михаил Фостер',
      },
      {
        label: 'Событие',
        description: 'Оплата производится через Atol online',
      },
    ] as DescriptionListItem[],
  },
}

export const WithoutText: Story = {
  args: {
    legend: 'Информация о заявителе',
    items: [
      {
        label: 'Полное имя',
        description: 'Михаил Фостер',
      },
      {
        label: 'Событие',
        description: 'Оплата производится через Atol online',
      },
    ] as DescriptionListItem[],
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    legend: 'Информация о заявителе',
    text: 'Личные данные и заявка.',
    items: [
      {
        label: 'Полное имя',
        description: 'Михаил Фостер',
      },
      {
        label: 'Событие',
        description: 'Оплата производится через Atol online',
      },
    ] as DescriptionListItem[],
  },
}

export const WithIcons: Story = {
  args: {
    legend: 'Информация о заявителе',
    text: 'Личные данные и заявка.',
    items: [
      {
        label: 'Строка 1.1',
        description: 'Описание 1.1',
        icon: SignIcon,
      },
      {
        label: 'Строка 1.2',
        description: 'Описание 1.2',
        avatar: {
          icon: PersonIcon,
        },
      },
      {
        description: 'Описание 1.3',
        icon: SignIcon,
      },
    ] as DescriptionListItem[],
  },
}

export const WithAvatars: Story = {
  args: {
    legend: 'Информация о заявителе',
    text: 'Личные данные и заявка.',
    items: [
      {
        label: 'Строка 1.1',
        description: 'Описание 1.1',
        avatar: {
          src: '/b24ui/avatar/employee.png',
        },
      },
      {
        label: 'Строка 1.2',
        description: 'Описание 1.2',
        avatar: {
          src: '/b24ui/avatar/assistant.png',
        },
      },
      {
        description: 'Описание 1.3',
        avatar: {
          src: 'https://github.com/bitrix24.png',
        },
      },
    ] as DescriptionListItem[],
  },
}

export const WithActions: Story = {
  args: {
    legend: 'Информация о заявителе',
    text: 'Личные данные и заявка.',
    items: [
      {
        label: 'Строка 1.1',
        description: 'Описание 1.1',
        actions: [
          {
            icon: DotsIcon,
            color: 'air-secondary-no-accent' as any,
            onClick() {
              console.log('Действие нажато')
            },
          },
        ] as ButtonProps[],
        orientation: 'horizontal' as DescriptionListItem['orientation'],
      },
      {
        label: 'Строка 1.2',
        description: 'Описание 1.2',
        actions: [
          {
            icon: DotsIcon,
            color: 'air-primary' as any,
            onClick() {
              console.log('Действие нажато')
            },
          },
        ] as ButtonProps[],
        orientation: 'horizontal' as DescriptionListItem['orientation'],
      },
      {
        label: 'Строка 1.3',
        description: 'Описание 1.3',
        actions: [
          {
            icon: DotsIcon,
            color: 'air-tertiary-no-accent' as any,
            onClick() {
              console.log('Действие нажато')
            },
          },
        ] as ButtonProps[],
        orientation: 'horizontal' as DescriptionListItem['orientation'],
      },
      {
        description: 'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.',
        actions: [
          {
            label: 'Действие',
            color: 'default' as any,
            onClick() {
              console.log('Действие нажато')
            },
          },
          {
            label: 'Другое действие',
            color: 'default' as any,
            onClick() {
              console.log('Другое действие нажато')
            },
          },
          {
            label: 'Еще одно действие',
            color: 'default' as any,
            icon: SignIcon,
            onClick() {
              console.log('Еще одно действие нажато')
            },
          },
          {
            label: 'И еще одно',
            color: 'default' as any,
            icon: DotsIcon,
            onClick() {
              console.log('И еще одно нажато')
            },
          },
        ] as ButtonProps[],
        orientation: 'vertical' as DescriptionListItem['orientation'],
      },
    ] as DescriptionListItem[],
  },
}

export const WithCustomKeys: Story = {
  args: {
    legend: 'Информация о заявителе',
    text: 'Личные данные и заявка.',
    labelKey: 'title',
    descriptionKey: 'info',
    items: [
      {
        title: 'Полное имя',
        info: 'Михаил Фостер',
      },
      {
        title: 'Событие',
        info: 'Оплата производится через Atol online',
      },
    ] as any[],
  },
}

export const WithCustomSlot: Story = {
  args: {
    legend: 'Информация о заявителе',
    text: 'Личные данные и заявка.',
    items: [
      {
        id: 'amount',
        slot: 'amount',
        label: 'Сумма',
        value: '10 560,00 ₽',
        description: 'Оплачено',
        b24ui: {
          label: 'font-(--ui-font-weight-semi-bold) text-(length:--ui-font-size-md)/(--ui-font-line-height-md)',
          description: 'font-(--ui-font-weight-semi-bold) text-(length:--ui-font-size-lg) block w-full',
        },
      },
      {
        id: 'client',
        label: 'Клиент',
        avatar: {
          icon: PersonIcon,
        },
        description: 'Имя сотрудника',
        b24ui: {
          description: 'font-(--ui-font-weight-semi-bold)',
        },
      },
      {
        id: 'date',
        label: 'Срок оплаты',
        icon: Calendar1Icon,
        value: new Date('2023-01-31T03:24:00'),
      },
      {
        id: 'payment',
        label: 'Способ оплаты',
        icon: CreditDebitCardIcon,
        description: 'Оплачено картой MasterCard',
      },
    ] as any[],
  },
  render: (args) => ({
    components: { DescriptionListComponent },
    setup() {
      return { args }
    },
    template: `
      <DescriptionListComponent v-bind="args">
        <template #amount="{ index }">
          <dt class="col-start-1 flex flex-nowrap flex-row items-center justify-start gap-1.5 pt-2 sm:py-1 px-4">
            <h4 class="mb-0 font-semibold">
              Сумма
            </h4>
          </dt>
          <dd class="pb-3 pt-1 sm:py-3 px-4">
            <div class="flex flex-wrap flex-row items-center justify-start gap-4">
              <div>
                {{ args.items[index]?.value }}
              </div>
              <span class="px-2 py-1 text-sm font-semibold bg-green-100 text-green-800 rounded">
                {{ args.items[index]?.description }}
              </span>
            </div>
          </dd>
        </template>
        <template #description="{ item }">
          <template v-if="item.id === 'date'">
            <time :datetime="(item?.value as Date)?.toISOString()">{{ (item?.value as Date)?.toDateString() }}</time>
          </template>
          <template v-else>
            {{ item.description }}
          </template>
        </template>
        <template #footer>
          <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Скачать квитанцию
          </button>
        </template>
      </DescriptionListComponent>
    `,
  }),
}
