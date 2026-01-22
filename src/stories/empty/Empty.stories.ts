import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EmptyComponent from '../../components/empty/EmptyComponent.vue'

import type { ButtonProps } from '@bitrix24/b24ui-nuxt'
import FolderIcon from '@bitrix24/b24icons-vue/outline/FolderIcon'
import SearchIcon from '@bitrix24/b24icons-vue/outline/SearchIcon'
import FileIcon from '@bitrix24/b24icons-vue/outline/FileIcon'
import MailSendIcon from '@bitrix24/b24icons-vue/outline/MailSendIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import PlusLIcon from '@bitrix24/b24icons-vue/outline/PlusLIcon'

const meta = {
  title: 'Data/Empty',
  component: EmptyComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'object' },
    action: { control: 'object' },
  },
  args: {
    title: 'Нет данных',
    description: 'Здесь пока ничего нет',
  },
} as Meta<typeof EmptyComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Нет данных',
    description: 'Здесь пока ничего нет',
  },
}

export const WithIcon: Story = {
  args: {
    title: 'Папка пуста',
    description: 'В этой папке пока нет файлов',
    icon: FolderIcon,
  },
}

export const WithAction: Story = {
  args: {
    title: 'Нет элементов',
    description: 'Создайте первый элемент, чтобы начать работу',
    icon: PlusLIcon,
    action: {
      label: 'Создать элемент',
      icon: PlusLIcon,
      color: 'air-primary',
    } as ButtonProps,
  },
}

export const WithCustomAction: Story = {
  args: {
    title: 'Нет результатов поиска',
    description: 'Попробуйте изменить параметры поиска',
    icon: SearchIcon,
    action: {
      label: 'Очистить фильтры',
      icon: SearchIcon,
      color: 'air-primary',
      size: 'lg',
    } as ButtonProps,
  },
}

export const NoAction: Story = {
  args: {
    title: 'Нет данных',
    description: 'Здесь пока ничего нет',
    icon: FileIcon,
    action: false,
  },
}

export const Minimal: Story = {
  args: {
    title: 'Пусто',
  },
}

export const OnlyDescription: Story = {
  args: {
    description: 'Здесь пока ничего нет. Добавьте первый элемент, чтобы начать работу.',
  },
}

export const WithCustomSlots: Story = {
  args: {
    title: 'Нет данных',
    description: 'Здесь пока ничего нет',
  },
  render: (args) => ({
    components: { EmptyComponent },
    setup() {
      return { args, FolderIcon }
    },
    template: `
      <EmptyComponent v-bind="args">
        <template #icon>
          <FolderIcon class="w-24 h-24 text-gray-400" />
        </template>
        <template #title>
          <h2 class="text-2xl font-bold text-gray-800">Кастомный заголовок</h2>
        </template>
        <template #description>
          <p class="text-gray-600 mt-2">Кастомное описание с дополнительной информацией</p>
        </template>
        <template #action>
          <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Кастомная кнопка
          </button>
        </template>
      </EmptyComponent>
    `,
  }),
}

export const EmptyFolder: Story = {
  args: {
    title: 'Папка пуста',
    description: 'В этой папке пока нет файлов или папок',
    icon: FolderIcon,
    action: {
      label: 'Добавить файл',
      icon: PlusLIcon,
      color: 'air-primary',
    } as ButtonProps,
  },
}

export const EmptySearch: Story = {
  args: {
    title: 'Ничего не найдено',
    description: 'Попробуйте изменить параметры поиска или использовать другие ключевые слова',
    icon: SearchIcon,
    action: {
      label: 'Очистить поиск',
      icon: SearchIcon,
      color: 'air-primary',
    } as ButtonProps,
  },
}

export const EmptyInbox: Story = {
  args: {
    title: 'Входящие пусты',
    description: 'У вас пока нет новых сообщений',
    icon: MailSendIcon,
  },
}

export const EmptyWithLongDescription: Story = {
  args: {
    title: 'Нет данных для отображения',
    description: 'Здесь пока ничего нет. Это может быть связано с тем, что вы еще не создали ни одного элемента, или все элементы были удалены. Вы можете создать новый элемент, используя кнопку ниже, или вернуться к списку всех элементов.',
    icon: FileIcon,
    action: {
      label: 'Создать элемент',
      icon: PlusLIcon,
      color: 'air-primary',
      size: 'lg',
    } as ButtonProps,
  },
}

export const EmptyList: Story = {
  args: {
    title: 'Список пуст',
    description: 'Добавьте первый элемент в список',
    icon: PlusLIcon,
    action: {
      label: 'Добавить элемент',
      icon: PlusLIcon,
      color: 'air-primary',
    } as ButtonProps,
  },
}

export const InContext: Story = {
  args: {
    title: 'Нет задач',
    description: 'У вас пока нет активных задач. Создайте первую задачу, чтобы начать работу.',
    icon: RocketIcon,
    action: {
      label: 'Создать задачу',
      icon: PlusLIcon,
      color: 'air-primary',
    } as ButtonProps,
  },
  render: (args) => ({
    components: { EmptyComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="min-h-[400px] flex items-center justify-center bg-gray-50 p-8">
        <div class="w-full max-w-md">
          <EmptyComponent v-bind="args" />
        </div>
      </div>
    `,
  }),
}

export const EmptyTable: Story = {
  args: {
    title: 'Нет данных',
    description: 'В таблице пока нет записей. Добавьте первую запись, чтобы начать работу.',
    icon: FileIcon,
    action: {
      label: 'Добавить запись',
      icon: PlusLIcon,
      color: 'air-primary',
    } as ButtonProps,
  },
  render: (args) => ({
    components: { EmptyComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="border rounded-lg">
        <table class="w-full">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-left">Название</th>
              <th class="px-4 py-2 text-left">Статус</th>
              <th class="px-4 py-2 text-left">Дата</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="3" class="p-8">
                <EmptyComponent v-bind="args" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  }),
}

export const EmptyCard: Story = {
  args: {
    title: 'Нет элементов',
    description: 'Создайте первый элемент, чтобы начать работу',
    icon: PlusLIcon,
    action: {
      label: 'Создать',
      icon: PlusLIcon,
      color: 'air-primary',
    } as ButtonProps,
  },
  render: (args) => ({
    components: { EmptyComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="border rounded-lg p-8 bg-white shadow-sm">
        <EmptyComponent v-bind="args" />
      </div>
    `,
  }),
