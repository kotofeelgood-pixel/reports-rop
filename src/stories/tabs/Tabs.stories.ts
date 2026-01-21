import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TabsComponent from '../../components/tabs/TabsComponent.vue'
import type { TabsModel, TabsItem, TabsSize, TabsOrientation, TabsVariant } from '../../components/tabs/model'
import { ref } from 'vue'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import Shield2ContourIcon from '@bitrix24/b24icons-vue/main/Shield2ContourIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/main/SettingsIcon'
import FileIcon from '@bitrix24/b24icons-vue/outline/FileIcon'
import FolderIcon from '@bitrix24/b24icons-vue/outline/FolderIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

const meta = {
  title: 'Navigation/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['link'] as TabsVariant[],
    },
    size: {
      control: 'select',
      options: ['xss', 'xs', 'sm', 'md', 'lg', 'xl'] as TabsSize[],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'] as TabsOrientation[],
    },
    content: { control: 'boolean' },
    unmountOnHide: { control: 'boolean' },
    activationMode: {
      control: 'select',
      options: ['automatic', 'manual'],
    },
  },
  args: {
    variant: 'link',
    size: 'md',
    orientation: 'horizontal',
    content: true,
    unmountOnHide: true,
  } as Partial<TabsModel>,
} as Meta<typeof TabsComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<TabsModel>
}

const basicItems: TabsItem[] = [
  {
    label: 'Аккаунт',
    content: 'Это содержимое вкладки "Аккаунт".',
  },
  {
    label: 'Пароль',
    content: 'Это содержимое вкладки "Пароль".',
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
        label: 'Аккаунт',
        icon: UserIcon,
        content: 'Настройки аккаунта.',
      },
      {
        label: 'Пароль',
        icon: Shield2ContourIcon,
        content: 'Настройки пароля.',
      },
      {
        label: 'Настройки',
        icon: SettingsIcon,
        content: 'Общие настройки.',
      },
    ],
  },
}

export const WithContent: Story = {
  args: {
    items: [
      {
        label: 'Файлы',
        icon: FileIcon,
        content: 'Список файлов будет здесь.',
      },
      {
        label: 'Папки',
        icon: FolderIcon,
        content: 'Список папок будет здесь.',
      },
    ],
  },
}

export const WithoutContent: Story = {
  args: {
    content: false,
    items: [
      {
        label: 'Аккаунт',
      },
      {
        label: 'Пароль',
      },
      {
        label: 'Настройки',
      },
    ],
  },
}

export const WithModelValue: Story = {
  args: {
    items: [
      {
        label: 'Аккаунт',
        value: 'account',
        content: 'Содержимое вкладки "Аккаунт".',
      },
      {
        label: 'Пароль',
        value: 'password',
        content: 'Содержимое вкладки "Пароль".',
      },
      {
        label: 'Настройки',
        value: 'settings',
        content: 'Содержимое вкладки "Настройки".',
      },
    ],
  },
  render: (args) => ({
    components: { TabsComponent },
    setup() {
      const activeTab = ref('account')
      return { args, activeTab }
    },
    template: `
      <div class="space-y-4">
        <TabsComponent
          v-bind="args"
          v-model="activeTab"
        />
        <div class="text-sm text-gray-600">
          Активная вкладка: <strong>{{ activeTab }}</strong>
        </div>
      </div>
    `,
  }),
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'password',
    items: [
      {
        label: 'Аккаунт',
        value: 'account',
        content: 'Содержимое вкладки "Аккаунт".',
      },
      {
        label: 'Пароль',
        value: 'password',
        content: 'Содержимое вкладки "Пароль".',
      },
      {
        label: 'Настройки',
        value: 'settings',
        content: 'Содержимое вкладки "Настройки".',
      },
    ],
  },
}

export const WithBadges: Story = {
  args: {
    items: [
      {
        label: 'Сообщения',
        badge: 5,
        content: 'У вас 5 непрочитанных сообщений.',
      },
      {
        label: 'Уведомления',
        badge: 12,
        content: 'У вас 12 новых уведомлений.',
      },
      {
        label: 'Задачи',
        badge: 3,
        content: 'У вас 3 активные задачи.',
      },
    ],
  },
}

export const AllSizes: Story = {
  render: () => ({
    components: { TabsComponent },
    setup() {
      const items: TabsItem[] = [
        { label: 'Вкладка 1', content: 'Содержимое 1' },
        { label: 'Вкладка 2', content: 'Содержимое 2' },
        { label: 'Вкладка 3', content: 'Содержимое 3' },
      ]
      return { items }
    },
    template: `
      <div class="space-y-8">
        <div>
          <div class="mb-2 text-sm font-medium">Extra Extra Small</div>
          <TabsComponent :items="items" size="xss" content />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Extra Small</div>
          <TabsComponent :items="items" size="xs" content />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Small</div>
          <TabsComponent :items="items" size="sm" content />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Medium</div>
          <TabsComponent :items="items" size="md" content />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Large</div>
          <TabsComponent :items="items" size="lg" content />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Extra Large</div>
          <TabsComponent :items="items" size="xl" content />
        </div>
      </div>
    `,
  }),
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    content: false,
    items: [
      {
        label: 'Аккаунт',
        icon: UserIcon,
      },
      {
        label: 'Пароль',
        icon: Shield2ContourIcon,
      },
      {
        label: 'Настройки',
        icon: SettingsIcon,
      },
    ],
  },
  render: (args) => ({
    components: { TabsComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="flex gap-8">
        <TabsComponent v-bind="args" />
        <div class="flex-1 p-4 bg-gray-50 rounded">
          <p class="text-gray-600">Контент будет отображаться здесь</p>
        </div>
      </div>
    `,
  }),
}

export const WithDisabled: Story = {
  args: {
    items: [
      {
        label: 'Аккаунт',
        content: 'Содержимое вкладки "Аккаунт".',
      },
      {
        label: 'Пароль',
        disabled: true,
        content: 'Эта вкладка отключена.',
      },
      {
        label: 'Настройки',
        content: 'Содержимое вкладки "Настройки".',
      },
    ],
  },
}

export const WithCustomSlots: Story = {
  args: {
    items: [
      {
        label: 'Аккаунт',
        slot: 'account',
      },
      {
        label: 'Пароль',
        slot: 'password',
      },
    ],
  },
  render: (args) => ({
    components: { TabsComponent },
    setup() {
      const state = ref({
        name: 'Системный пользователь',
        username: 'system-user',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      return { args, state }
    },
    template: `
      <TabsComponent v-bind="args">
        <template #account>
          <div class="p-4 space-y-4">
            <h3 class="text-lg font-semibold">Настройки аккаунта</h3>
            <div class="space-y-2">
              <label class="block text-sm font-medium">Имя</label>
              <input
                v-model="state.name"
                type="text"
                class="w-full px-3 py-2 border rounded"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium">Имя пользователя</label>
              <input
                v-model="state.username"
                type="text"
                class="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>
        </template>
        <template #password>
          <div class="p-4 space-y-4">
            <h3 class="text-lg font-semibold">Изменение пароля</h3>
            <div class="space-y-2">
              <label class="block text-sm font-medium">Текущий пароль</label>
              <input
                v-model="state.currentPassword"
                type="password"
                class="w-full px-3 py-2 border rounded"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium">Новый пароль</label>
              <input
                v-model="state.newPassword"
                type="password"
                class="w-full px-3 py-2 border rounded"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium">Подтвердите пароль</label>
              <input
                v-model="state.confirmPassword"
                type="password"
                class="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>
        </template>
      </TabsComponent>
    `,
  }),
}

export const WithContentSlot: Story = {
  args: {
    items: [
      {
        label: 'Аккаунт',
        icon: UserIcon,
      },
      {
        label: 'Пароль',
        icon: Shield2ContourIcon,
      },
    ],
  },
  render: (args) => ({
    components: { TabsComponent },
    setup() {
      return { args }
    },
    template: `
      <TabsComponent v-bind="args">
        <template #content="{ item }">
          <div class="p-4">
            <p>Это содержимое вкладки "{{ item.label }}".</p>
          </div>
        </template>
      </TabsComponent>
    `,
  }),
}

export const WithUnmountOnHide: Story = {
  args: {
    unmountOnHide: false,
    items: [
      {
        label: 'Вкладка 1',
        content: 'Содержимое вкладки 1 (не будет размонтировано при скрытии).',
      },
      {
        label: 'Вкладка 2',
        content: 'Содержимое вкладки 2 (не будет размонтировано при скрытии).',
      },
      {
        label: 'Вкладка 3',
        content: 'Содержимое вкладки 3 (не будет размонтировано при скрытии).',
      },
    ],
  },
}

export const ManualActivation: Story = {
  args: {
    activationMode: 'manual',
    items: [
      {
        label: 'Вкладка 1',
        content: 'Эта вкладка активируется только по клику, а не при фокусе.',
      },
      {
        label: 'Вкладка 2',
        content: 'Эта вкладка активируется только по клику, а не при фокусе.',
      },
      {
        label: 'Вкладка 3',
        content: 'Эта вкладка активируется только по клику, а не при фокусе.',
      },
    ],
  },
}

export const WithAvatars: Story = {
  args: {
    items: [
      {
        label: 'Пользователь 1',
        avatar: {
          src: 'https://github.com/bitrix24.png',
        },
        content: 'Профиль пользователя 1.',
      },
      {
        label: 'Пользователь 2',
        avatar: {
          src: '/b24ui/avatar/employee.png',
        },
        content: 'Профиль пользователя 2.',
      },
    ],
  },
}

export const InContext: Story = {
  args: {
    items: [
      {
        label: 'Обзор',
        icon: RocketIcon,
        content: 'Общая информация о проекте.',
      },
      {
        label: 'Задачи',
        icon: FileIcon,
        content: 'Список задач проекта.',
      },
      {
        label: 'Настройки',
        icon: SettingsIcon,
        content: 'Настройки проекта.',
      },
    ],
  },
  render: (args) => ({
    components: { TabsComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-4xl space-y-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">Tabs</h1>
          <p class="text-gray-600">
            Компонент для отображения контента в виде вкладок. Позволяет организовать информацию в несколько разделов.
          </p>
        </div>
        <div class="border rounded-lg p-4">
          <TabsComponent v-bind="args" />
        </div>
      </div>
    `,
  }),
}

export const SettingsExample: Story = {
  args: {
    items: [
      {
        label: 'Аккаунт',
        icon: UserIcon,
        slot: 'account',
      },
      {
        label: 'Пароль',
        icon: Shield2ContourIcon,
        slot: 'password',
      },
      {
        label: 'Настройки',
        icon: SettingsIcon,
        slot: 'settings',
      },
    ],
  },
  render: (args) => ({
    components: { TabsComponent },
    setup() {
      const state = ref({
        name: 'Системный пользователь',
        username: 'system-user',
        email: 'user@example.com',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        theme: 'light',
        notifications: true,
      })
      return { args, state }
    },
    template: `
      <div class="max-w-2xl">
        <TabsComponent v-bind="args" variant="link">
          <template #account>
            <div class="p-6 space-y-4">
              <h2 class="text-xl font-semibold">Настройки аккаунта</h2>
              <p class="text-sm text-gray-600 mb-4">
                Внесите изменения в настройки аккаунта здесь. Нажмите "Сохранить", когда закончите.
              </p>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Имя</label>
                  <input
                    v-model="state.name"
                    type="text"
                    class="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Имя пользователя</label>
                  <input
                    v-model="state.username"
                    type="text"
                    class="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Email</label>
                  <input
                    v-model="state.email"
                    type="email"
                    class="w-full px-3 py-2 border rounded"
                  />
                </div>
                <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Сохранить изменения
                </button>
              </div>
            </div>
          </template>
          <template #password>
            <div class="p-6 space-y-4">
              <h2 class="text-xl font-semibold">Изменение пароля</h2>
              <p class="text-sm text-gray-600 mb-4">
                Измените свой пароль здесь. После сохранения вы будете разлогинены.
              </p>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Текущий пароль</label>
                  <input
                    v-model="state.currentPassword"
                    type="password"
                    class="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Новый пароль</label>
                  <input
                    v-model="state.newPassword"
                    type="password"
                    class="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Подтвердите пароль</label>
                  <input
                    v-model="state.confirmPassword"
                    type="password"
                    class="w-full px-3 py-2 border rounded"
                  />
                </div>
                <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Изменить пароль
                </button>
              </div>
            </div>
          </template>
          <template #settings>
            <div class="p-6 space-y-4">
              <h2 class="text-xl font-semibold">Общие настройки</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Тема</label>
                  <select v-model="state.theme" class="w-full px-3 py-2 border rounded">
                    <option value="light">Светлая</option>
                    <option value="dark">Темная</option>
                    <option value="auto">Автоматически</option>
                  </select>
                </div>
                <div class="flex items-center gap-2">
                  <input
                    v-model="state.notifications"
                    type="checkbox"
                    id="notifications"
                  />
                  <label for="notifications" class="text-sm font-medium">
                    Включить уведомления
                  </label>
                </div>
                <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Сохранить настройки
                </button>
              </div>
            </div>
          </template>
        </TabsComponent>
      </div>
    `,
  }),
}
