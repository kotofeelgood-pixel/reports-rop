import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ContextMenuComponent from '../../components/context-menu/ContextMenuComponent.vue'

import { ref, computed } from 'vue'
import OpenedEyeIcon from '@bitrix24/b24icons-vue/main/OpenedEyeIcon'
import TrashBinIcon from '@bitrix24/b24icons-vue/main/TrashBinIcon'
import CopyPlatesIcon from '@bitrix24/b24icons-vue/actions/CopyPlatesIcon'
import PencilDrawIcon from '@bitrix24/b24icons-vue/actions/PencilDrawIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/main/SettingsIcon'
import FolderIcon from '@bitrix24/b24icons-vue/outline/FolderIcon'
import FileIcon from '@bitrix24/b24icons-vue/outline/FileIcon'
import SpinnerIcon from '@bitrix24/b24icons-vue/specialized/SpinnerIcon'

const meta = {
  title: 'Overlay/ContextMenu',
  component: ContextMenuComponent,
  tags: ['autodocs'],
  argTypes: {
    modal: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    modal: true,
    disabled: false,
  },
} as Meta<typeof ContextMenuComponent>

export default meta
type Story = StoryObj<typeof meta>

const basicItems= [][] = [
  [
    {
      label: 'Просмотр',
      icon: OpenedEyeIcon,
    },
    {
      label: 'Копировать',
      icon: CopyPlatesIcon,
    },
    {
      label: 'Редактировать',
      icon: PencilDrawIcon,
    },
  ],
  [
    {
      label: 'Удалить',
      color: 'air-primary-alert',
      icon: TrashBinIcon,
    },
  ],
]

export const Default: Story = {
  args: {
    items: basicItems,
  },
  render: (args) => ({
    components: { ContextMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <ContextMenuComponent v-bind="args">
        <div class="flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-sm aspect-video w-72">
          Правый клик здесь
        </div>
      </ContextMenuComponent>
    `,
  }),
}

export const WithNestedMenu: Story = {
  args: {
    items: [
      [
        {
          label: 'Внешний вид',
          children: [
            {
              label: 'Системная',
            },
            {
              label: 'Светлая',
            },
            {
              label: 'Темная',
            },
          ],
        },
      ],
      [
        {
          label: 'Показать боковую панель',
          kbds: ['meta', 's'],
        },
        {
          label: 'Показать панель инструментов',
          kbds: ['shift', 'meta', 'd'],
        },
        {
          label: 'Свернуть закрепленные вкладки',
          disabled: true,
        },
      ],
      [
        {
          label: 'Обновить страницу',
        },
        {
          label: 'Очистить cookies и обновить',
        },
        {
          label: 'Очистить кэш и обновить',
        },
        {
          type: 'separator',
        },
        {
          label: 'Разработчик',
          children: [
            [
              {
                label: 'Просмотр исходного кода',
                kbds: ['meta', 'shift', 'u'],
              },
              {
                label: 'Инструменты разработчика',
                kbds: ['option', 'meta', 'i'],
              },
              {
                label: 'Инспектировать элементы',
                kbds: ['option', 'meta', 'c'],
              },
            ],
            [
              {
                label: 'Консоль JavaScript',
                kbds: ['option', 'meta', 'j'],
              },
            ],
          ],
        },
      ],
    ],
  },
  render: (args) => ({
    components: { ContextMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <ContextMenuComponent v-bind="args">
        <div class="flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-sm aspect-video w-72">
          Правый клик здесь для вложенного меню
        </div>
      </ContextMenuComponent>
    `,
  }),
}

export const WithCheckboxItems: Story = {
  render: () => ({
    components: { ContextMenuComponent },
    setup() {
      const showSidebar = ref(true)
      const showToolbar = ref(false)

      const items = computed<ContextMenuItem[]>(() => [
        {
          label: 'Вид',
          type: 'label',
        },
        {
          label: 'Показать боковую панель',
          type: 'checkbox',
          checked: showSidebar.value,
          onUpdateChecked(checked: boolean) {
            showSidebar.value = checked
          },
          onSelect(e: Event) {
            e.preventDefault()
          },
        },
        {
          label: 'Показать панель инструментов',
          type: 'checkbox',
          checked: showToolbar.value,
          onUpdateChecked(checked: boolean) {
            showToolbar.value = checked
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Свернуть закрепленные вкладки',
          type: 'checkbox',
          disabled: true,
        },
      ])

      return { items, showSidebar, showToolbar }
    },
    template: `
      <div class="space-y-4">
        <ContextMenuComponent :items="items">
          <div class="flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-sm aspect-video w-72">
            Правый клик здесь
          </div>
        </ContextMenuComponent>
        <div class="text-sm text-gray-600">
          Показать боковую панель: <strong>{{ showSidebar }}</strong><br>
          Показать панель инструментов: <strong>{{ showToolbar }}</strong>
        </div>
      </div>
    `,
  }),
}

export const WithColorItems: Story = {
  args: {
    items: [
      [
        {
          label: 'Просмотр',
          icon: OpenedEyeIcon,
        },
        {
          label: 'Копировать',
          icon: CopyPlatesIcon,
        },
        {
          label: 'Редактировать',
          icon: PencilDrawIcon,
        },
      ],
      [
        {
          label: 'Удалить',
          color: 'air-primary-alert',
          icon: TrashBinIcon,
        },
      ],
    ],
  },
  render: (args) => ({
    components: { ContextMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <ContextMenuComponent v-bind="args">
        <div class="flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-sm aspect-video w-72">
          Правый клик здесь
        </div>
      </ContextMenuComponent>
    `,
  }),
}

export const WithCustomSlot: Story = {
  render: () => ({
    components: { ContextMenuComponent },
    setup() {
      const loading = ref(true)

      const items= [] = [
        {
          label: 'Обновить страницу',
          slot: 'refresh',
        },
        {
          label: 'Очистить cookies и обновить',
        },
        {
          label: 'Очистить кэш и обновить',
        },
      ]

      return { items, loading, SpinnerIcon }
    },
    template: `
      <ContextMenuComponent :items="items">
        <div class="flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-sm aspect-video w-72">
          Правый клик здесь
        </div>

        <template #refresh-label>
          {{ loading ? 'Обновление...' : 'Обновить страницу' }}
        </template>

        <template #refresh-trailing>
          <SpinnerIcon v-if="loading" class="shrink-0 size-5 text-blue-500 animate-spin" />
        </template>
      </ContextMenuComponent>
    `,
  }),
}

export const WithSeparators: Story = {
  args: {
    items: [
      [
        {
          label: 'Новый файл',
          icon: FileIcon,
        },
        {
          label: 'Новая папка',
          icon: FolderIcon,
        },
      ],
      [
        {
          type: 'separator',
        },
        {
          label: 'Копировать',
          icon: CopyPlatesIcon,
        },
        {
          label: 'Вставить',
        },
      ],
      [
        {
          type: 'separator',
        },
        {
          label: 'Настройки',
          icon: SettingsIcon,
        },
      ],
    ],
  },
  render: (args) => ({
    components: { ContextMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <ContextMenuComponent v-bind="args">
        <div class="flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-sm aspect-video w-72">
          Правый клик здесь
        </div>
      </ContextMenuComponent>
    `,
  }),
}

export const WithKeyboardShortcuts: Story = {
  args: {
    items: [
      [
        {
          label: 'Показать боковую панель',
          kbds: ['meta', 's'],
        },
        {
          label: 'Показать панель инструментов',
          kbds: ['shift', 'meta', 'd'],
        },
      ],
      [
        {
          label: 'Сохранить',
          kbds: ['meta', 's'],
        },
        {
          label: 'Открыть',
          kbds: ['meta', 'o'],
        },
        {
          label: 'Закрыть',
          kbds: ['meta', 'w'],
        },
      ],
    ],
  },
  render: (args) => ({
    components: { ContextMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <ContextMenuComponent v-bind="args">
        <div class="flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-sm aspect-video w-72">
          Правый клик здесь
        </div>
      </ContextMenuComponent>
    `,
  }),
}

export const WithDisabledItems: Story = {
  args: {
    items: [
      [
        {
          label: 'Доступное действие',
        },
        {
          label: 'Отключенное действие',
          disabled: true,
        },
        {
          label: 'Еще одно доступное действие',
        },
      ],
    ],
  },
  render: (args) => ({
    components: { ContextMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <ContextMenuComponent v-bind="args">
        <div class="flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-sm aspect-video w-72">
          Правый клик здесь
        </div>
      </ContextMenuComponent>
    `,
  }),
}

export const NonModal: Story = {
  args: {
    modal: false,
    items: basicItems,
  },
  render: (args) => ({
    components: { ContextMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-4">
        <ContextMenuComponent v-bind="args">
          <div class="flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-sm aspect-video w-72">
            Правый клик здесь (не модальное меню)
          </div>
        </ContextMenuComponent>
        <p class="text-sm text-gray-600">
          В не модальном режиме можно взаимодействовать с контентом за меню
        </p>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    items: basicItems,
  },
  render: (args) => ({
    components: { ContextMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <ContextMenuComponent v-bind="args">
        <div class="flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-sm aspect-video w-72">
          Правый клик здесь (меню отключено)
        </div>
      </ContextMenuComponent>
    `,
  }),
}

export const FileContextMenu: Story = {
  args: {
    items: [
      [
        {
          label: 'Открыть',
          icon: OpenedEyeIcon,
        },
        {
          label: 'Редактировать',
          icon: PencilDrawIcon,
        },
        {
          label: 'Копировать',
          icon: CopyPlatesIcon,
        },
      ],
      [
        {
          type: 'separator',
        },
        {
          label: 'Переименовать',
        },
        {
          label: 'Переместить',
          icon: FolderIcon,
        },
      ],
      [
        {
          type: 'separator',
        },
        {
          label: 'Удалить',
          color: 'air-primary-alert',
          icon: TrashBinIcon,
        },
      ],
    ],
  },
  render: (args) => ({
    components: { ContextMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <ContextMenuComponent v-bind="args">
        <div class="flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-sm aspect-video w-72">
          Правый клик на файле
        </div>
      </ContextMenuComponent>
    `,
  }),
}

export const InContext: Story = {
  args: {
    items: [
      [
        {
          label: 'Просмотр',
          icon: OpenedEyeIcon,
        },
        {
          label: 'Редактировать',
          icon: PencilDrawIcon,
        },
        {
          label: 'Копировать',
          icon: CopyPlatesIcon,
        },
      ],
      [
        {
          label: 'Удалить',
          color: 'air-primary-alert',
          icon: TrashBinIcon,
        },
      ],
    ],
  },
  render: (args) => ({
    components: { ContextMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-4xl space-y-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">ContextMenu</h1>
          <p class="text-gray-600">
            Компонент контекстного меню, которое появляется при правом клике на элементе. Предоставляет релевантные действия для выбранного элемента.
          </p>
        </div>
        <div class="border rounded-lg p-8">
          <ContextMenuComponent v-bind="args">
            <div class="flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-sm aspect-video">
              Правый клик здесь для открытия контекстного меню
            </div>
          </ContextMenuComponent>
        </div>
      </div>
    `,
  }),
}

export const TableRowContextMenu: Story = {
  args: {
    items: [
      [
        {
          label: 'Просмотр',
          icon: OpenedEyeIcon,
        },
        {
          label: 'Редактировать',
          icon: PencilDrawIcon,
        },
        {
          label: 'Копировать',
          icon: CopyPlatesIcon,
        },
      ],
      [
        {
          type: 'separator',
        },
        {
          label: 'Дублировать',
        },
        {
          label: 'Экспортировать',
        },
      ],
      [
        {
          type: 'separator',
        },
        {
          label: 'Удалить',
          color: 'air-primary-alert',
          icon: TrashBinIcon,
        },
      ],
    ],
  },
  render: (args) => ({
    components: { ContextMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-4xl">
        <div class="border rounded-lg overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-4 py-2 text-left">ID</th>
                <th class="px-4 py-2 text-left">Название</th>
                <th class="px-4 py-2 text-left">Статус</th>
              </tr>
            </thead>
            <tbody>
              <ContextMenuComponent v-bind="args">
                <tr class="border-t hover:bg-gray-50 cursor-pointer">
                  <td class="px-4 py-2">1</td>
                  <td class="px-4 py-2">Запись 1</td>
                  <td class="px-4 py-2">Активна</td>
                </tr>
              </ContextMenuComponent>
              <tr class="border-t hover:bg-gray-50">
                <td class="px-4 py-2">2</td>
                <td class="px-4 py-2">Запись 2</td>
                <td class="px-4 py-2">Неактивна</td>
              </tr>
              <tr class="border-t hover:bg-gray-50">
                <td class="px-4 py-2">3</td>
                <td class="px-4 py-2">Запись 3</td>
                <td class="px-4 py-2">Активна</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-4 text-sm text-gray-600">
          Правый клик на строке таблицы для открытия контекстного меню
        </p>
      </div>
    `,
  }),
