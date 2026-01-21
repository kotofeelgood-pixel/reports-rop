import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CommandPaletteComponent from './CommandPaletteComponent.vue'
import type { CommandPaletteModel, CommandPaletteGroup, CommandPaletteItem } from './model'
import { ref, computed } from 'vue'
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'
import FolderPlusIcon from '@bitrix24/b24icons-vue/outline/FolderPlusIcon'
import TagIcon from '@bitrix24/b24icons-vue/outline/TagIcon'
import StageIcon from '@bitrix24/b24icons-vue/outline/StageIcon'
import SearchIcon from '@bitrix24/b24icons-vue/outline/SearchIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import CirclePlusIcon from '@bitrix24/b24icons-vue/outline/CirclePlusIcon'
import AddProductIcon from '@bitrix24/b24icons-vue/outline/AddProductIcon'
import ShareIcon from '@bitrix24/b24icons-vue/button/ShareIcon'
import LinkIcon from '@bitrix24/b24icons-vue/outline/LinkIcon'
import MailSendIcon from '@bitrix24/b24icons-vue/outline/MailSendIcon'
import Share2Icon from '@bitrix24/b24icons-vue/main/Share2Icon'
import TwitterIcon from '@bitrix24/b24icons-vue/common-service/TwitterIcon'
import TelegramIcon from '@bitrix24/b24icons-vue/social/TelegramIcon'
import SettingsLIcon from '@bitrix24/b24icons-vue/outline/SettingsLIcon'
import Filter1Icon from '@bitrix24/b24icons-vue/main/Filter1Icon'
import PaletteIcon from '@bitrix24/b24icons-vue/outline/PaletteIcon'
import ShieldIcon from '@bitrix24/b24icons-vue/outline/ShieldIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import VueIcon from '@bitrix24/b24icons-vue/file-type/VueIcon'
import MarkdownIcon from '@bitrix24/b24icons-vue/file-type/MarkdownIcon'
import NodeIcon from '@bitrix24/b24icons-vue/file-type/NodeIcon'
import CrmSearchIcon from '@bitrix24/b24icons-vue/crm/CrmSearchIcon'

const meta = {
  title: 'UI/CommandPalette',
  component: CommandPaletteComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    autofocus: { control: 'boolean' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    highlightOnHover: { control: 'boolean' },
    preserveGroupOrder: { control: 'boolean' },
    close: { control: 'boolean' },
    back: { control: 'boolean' },
  },
  args: {
    placeholder: 'Поиск...',
    autofocus: true,
  } as Partial<CommandPaletteModel>,
} as Meta<typeof CommandPaletteComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<CommandPaletteModel>
}

const basicGroups: CommandPaletteGroup[] = [
  {
    id: 'users',
    label: 'Пользователи',
    items: [
      {
        label: 'Имя ассистента',
        suffix: 'assistant',
        avatar: {
          src: '/b24ui/avatar/assistant.png'
        }
      },
      {
        label: 'Bitrix24',
        suffix: 'bitrix24',
        avatar: {
          src: 'https://github.com/bitrix24.png'
        }
      },
      {
        label: 'Имя сотрудника',
        suffix: 'employee',
        avatar: {
          src: '/b24ui/avatar/employee.png'
        }
      }
    ]
  }
]

export const Default: Story = {
  render: () => ({
    components: { CommandPaletteComponent },
    setup() {
      const value = ref({})
      const groups = ref(basicGroups)
      return { value, groups }
    },
    template: `
      <CommandPaletteComponent
        v-model="value"
        :groups="groups"
        class="flex-1 h-[320px]"
      />
    `,
  }),
}

export const WithDefaultValue: Story = {
  render: () => ({
    components: { CommandPaletteComponent },
    setup() {
      const value = ref({
        label: 'Bitrix24',
        suffix: 'bitrix24',
        avatar: {
          src: 'https://github.com/bitrix24.png'
        }
      })
      const groups = ref(basicGroups)
      return { value, groups }
    },
    template: `
      <CommandPaletteComponent
        v-model="value"
        :groups="groups"
        class="flex-1 h-[320px]"
      />
    `,
  }),
}

export const Multiple: Story = {
  render: () => ({
    components: { CommandPaletteComponent },
    setup() {
      const value = ref([])
      const groups = ref(basicGroups)
      return { value, groups }
    },
    template: `
      <CommandPaletteComponent
        v-model="value"
        :groups="groups"
        multiple
        class="flex-1 h-[320px]"
      />
    `,
  }),
}

export const WithPlaceholder: Story = {
  render: () => ({
    components: { CommandPaletteComponent },
    setup() {
      const value = ref({})
      const groups = ref([
        {
          id: 'apps',
          items: [
            { label: 'Календарь' },
            { label: 'Музыка' },
            { label: 'Карты' }
          ]
        }
      ])
      return { value, groups }
    },
    template: `
      <CommandPaletteComponent
        v-model="value"
        :groups="groups"
        placeholder="Поиск приложения..."
        class="flex-1 h-[320px]"
      />
    `,
  }),
}

export const WithIcon: Story = {
  render: () => ({
    components: { CommandPaletteComponent },
    setup() {
      const value = ref({})
      const groups = ref([
        {
          id: 'apps',
          items: [
            { label: 'Календарь' },
            { label: 'Музыка' },
            { label: 'Карты' }
          ]
        }
      ])
      return { value, groups, RocketIcon }
    },
    template: `
      <CommandPaletteComponent
        v-model="value"
        :groups="groups"
        :icon="RocketIcon"
        class="flex-1 h-[320px]"
      />
    `,
  }),
}

export const WithSelectedIcon: Story = {
  render: () => ({
    components: { CommandPaletteComponent },
    setup() {
      const value = ref([
        {
          label: 'Bitrix24',
          suffix: 'bitrix24',
          avatar: {
            src: 'https://github.com/bitrix24.png'
          }
        }
      ])
      const groups = ref(basicGroups)
      return { value, groups, RocketIcon }
    },
    template: `
      <CommandPaletteComponent
        v-model="value"
        :groups="groups"
        multiple
        :selected-icon="RocketIcon"
        class="flex-1 h-[320px]"
      />
    `,
  }),
}

export const WithTrailingIcon: Story = {
  render: () => ({
    components: { CommandPaletteComponent },
    setup() {
      const value = ref({})
      const groups = ref([
        {
          id: 'actions',
          items: [
            {
              label: 'Поделиться',
              children: [
                { label: 'Email' },
                { label: 'Копировать' },
                { label: 'Ссылка' }
              ]
            }
          ]
        }
      ])
      return { value, groups, RocketIcon }
    },
    template: `
      <CommandPaletteComponent
        v-model="value"
        :groups="groups"
        :trailing-icon="RocketIcon"
        class="flex-1 h-[320px]"
      />
    `,
  }),
}

export const Loading: Story = {
  render: () => ({
    components: { CommandPaletteComponent },
    setup() {
      const value = ref({})
      const groups = ref([
        {
          id: 'apps',
          items: [
            { label: 'Календарь' },
            { label: 'Музыка' },
            { label: 'Карты' }
          ]
        }
      ])
      return { value, groups }
    },
    template: `
      <CommandPaletteComponent
        v-model="value"
        :groups="groups"
        loading
        class="flex-1 h-[320px]"
      />
    `,
  }),
}

export const WithClose: Story = {
  render: () => ({
    components: { CommandPaletteComponent },
    setup() {
      const value = ref({})
      const groups = ref([
        {
          id: 'apps',
          items: [
            { label: 'Календарь' },
            { label: 'Музыка' },
            { label: 'Карты' }
          ]
        }
      ])
      return { value, groups }
    },
    template: `
      <CommandPaletteComponent
        v-model="value"
        :groups="groups"
        close
        class="flex-1 h-[320px]"
      />
    `,
  }),
}

export const WithBack: Story = {
  render: () => ({
    components: { CommandPaletteComponent },
    setup() {
      const value = ref({})
      const groups = ref([
        {
          id: 'actions',
          items: [
            {
              label: 'Поделиться',
              children: [
                { label: 'Email' },
                { label: 'Копировать' },
                { label: 'Ссылка' }
              ]
            }
          ]
        }
      ])
      return { value, groups }
    },
    template: `
      <CommandPaletteComponent
        v-model="value"
        :groups="groups"
        :back="{ color: 'air-primary' }"
        class="flex-1 h-[320px]"
      />
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { CommandPaletteComponent },
    setup() {
      const value = ref({})
      const groups = ref([
        {
          id: 'apps',
          items: [
            { label: 'Календарь' },
            { label: 'Музыка' },
            { label: 'Карты' }
          ]
        }
      ])
      return { value, groups }
    },
    template: `
      <CommandPaletteComponent
        v-model="value"
        :groups="groups"
        disabled
        class="flex-1 h-[320px]"
      />
    `,
  }),
}

export const WithActions: Story = {
  render: () => ({
    components: { CommandPaletteComponent },
    setup() {
      const value = ref({})
      const groups = ref<CommandPaletteGroup[]>([
        {
          id: 'users',
          label: 'Пользователи',
          items: [
            {
              label: 'Имя ассистента',
              suffix: 'assistant',
              to: 'https://github.com/bitrix24',
              target: '_blank',
              avatar: {
                src: '/b24ui/avatar/assistant.png'
              }
            },
            {
              label: 'Bitrix24',
              suffix: 'bitrix24',
              to: 'https://github.com/bitrix24',
              target: '_blank',
              avatar: {
                src: 'https://github.com/bitrix24.png'
              }
            },
            {
              label: 'Имя сотрудника',
              suffix: 'employee',
              to: 'https://github.com/bitrix24',
              target: '_blank',
              avatar: {
                src: '/b24ui/avatar/employee.png'
              }
            }
          ]
        },
        {
          id: 'actions',
          items: [
            {
              label: 'Добавить новый файл',
              suffix: 'Создать новый файл в текущей директории или рабочем пространстве.',
              icon: FileUploadIcon,
              kbds: ['meta', 'I'],
              onSelect() {
                console.log('Добавить новый файл')
              }
            },
            {
              label: 'Добавить новую папку',
              suffix: 'Создать новую папку в текущей директории или рабочем пространстве.',
              icon: FolderPlusIcon,
              kbds: ['meta', 'F'],
              onSelect() {
                console.log('Добавить новую папку')
              }
            },
            {
              label: 'Добавить хэштег',
              suffix: 'Добавить хэштег к текущему элементу.',
              icon: TagIcon,
              kbds: ['meta', 'H'],
              onSelect() {
                console.log('Добавить хэштег')
              }
            },
            {
              label: 'Добавить метку',
              suffix: 'Добавить метку к текущему элементу.',
              icon: StageIcon,
              kbds: ['meta', 'L'],
              onSelect() {
                console.log('Добавить метку')
              }
            }
          ]
        }
      ])

      function onSelect(item: any) {
        console.log('Выбрано:', item)
      }

      return { value, groups, onSelect }
    },
    template: `
      <CommandPaletteComponent
        v-model="value"
        :groups="groups"
        class="flex-1 h-[320px]"
        @update:model-value="onSelect"
      />
    `,
  }),
}

export const WithChildren: Story = {
  render: () => ({
    components: { CommandPaletteComponent },
    setup() {
      const value = ref({})
      const groups = ref<CommandPaletteGroup[]>([
        {
          id: 'actions',
          label: 'Действия',
          items: [
            {
              label: 'Создать новое',
              icon: CirclePlusIcon,
              children: [
                {
                  label: 'Новый файл',
                  icon: FileUploadIcon,
                  suffix: 'Создать новый файл в текущей директории',
                  kbds: ['meta', 'I'],
                  onSelect(e: Event) {
                    e.preventDefault()
                    console.log('Новый файл создан!')
                  }
                },
                {
                  label: 'Новая папка',
                  icon: FolderPlusIcon,
                  suffix: 'Создать новую папку в текущей директории',
                  kbds: ['meta', 'F'],
                  onSelect(e: Event) {
                    e.preventDefault()
                    console.log('Новая папка создана!')
                  }
                },
                {
                  label: 'Новый проект',
                  icon: AddProductIcon,
                  suffix: 'Создать новый проект из шаблона',
                  kbds: ['meta', 'P'],
                  onSelect(e: Event) {
                    e.preventDefault()
                    console.log('Новый проект создан!')
                  }
                }
              ]
            },
            {
              label: 'Поделиться',
              icon: ShareIcon,
              children: [
                {
                  label: 'Копировать ссылку',
                  icon: LinkIcon,
                  suffix: 'Скопировать ссылку на текущий элемент',
                  kbds: ['meta', 'L'],
                  onSelect(e: Event) {
                    e.preventDefault()
                    console.log('Ссылка скопирована в буфер обмена!')
                  }
                },
                {
                  label: 'Поделиться по email',
                  icon: MailSendIcon,
                  suffix: 'Поделиться текущим элементом по email',
                  onSelect(e: Event) {
                    e.preventDefault()
                    console.log('Диалог отправки email открыт!')
                  }
                },
                {
                  label: 'Поделиться в соцсетях',
                  icon: Share2Icon,
                  suffix: 'Поделиться текущим элементом в соцсетях',
                  children: [
                    {
                      label: 'Twitter',
                      icon: TwitterIcon,
                      onSelect(e: Event) {
                        e.preventDefault()
                        console.log('Поделились в Twitter!')
                      }
                    },
                    {
                      label: 'Telegram',
                      icon: TelegramIcon,
                      onSelect(e: Event) {
                        e.preventDefault()
                        console.log('Поделились в Telegram!')
                      }
                    }
                  ]
                }
              ]
            },
            {
              label: 'Настройки',
              icon: SettingsLIcon,
              children: [
                {
                  label: 'Общие',
                  icon: Filter1Icon,
                  suffix: 'Настроить общие параметры',
                  onSelect(e: Event) {
                    e.preventDefault()
                    console.log('Общие настройки открыты!')
                  }
                },
                {
                  label: 'Внешний вид',
                  icon: PaletteIcon,
                  suffix: 'Настроить внешний вид',
                  onSelect(e: Event) {
                    e.preventDefault()
                    console.log('Настройки внешнего вида открыты!')
                  }
                },
                {
                  label: 'Безопасность',
                  icon: ShieldIcon,
                  suffix: 'Управление настройками безопасности',
                  onSelect(e: Event) {
                    e.preventDefault()
                    console.log('Настройки безопасности открыты!')
                  }
                }
              ]
            }
          ]
        }
      ])

      return { value, groups }
    },
    template: `
      <CommandPaletteComponent
        v-model="value"
        :groups="groups"
        class="flex-1 h-[320px]"
      />
    `,
  }),
}

export const WithSearchTerm: Story = {
  render: () => ({
    components: { CommandPaletteComponent },
    setup() {
      const value = ref({})
      const searchTerm = ref('B')
      const users = [
        {
          label: 'Имя ассистента',
          suffix: 'assistant',
          to: 'https://github.com/bitrix24',
          target: '_blank',
          avatar: {
            src: '/b24ui/avatar/assistant.png'
          }
        },
        {
          label: 'Bitrix24',
          suffix: 'bitrix24',
          to: 'https://github.com/bitrix24',
          target: '_blank',
          avatar: {
            src: 'https://github.com/bitrix24.png'
          }
        },
        {
          label: 'Имя сотрудника',
          suffix: 'employee',
          to: 'https://github.com/bitrix24',
          target: '_blank',
          avatar: {
            src: '/b24ui/avatar/employee.png'
          }
        }
      ]

      function onSelect() {
        searchTerm.value = ''
      }

      return { value, searchTerm, users, onSelect }
    },
    template: `
      <CommandPaletteComponent
        v-model="value"
        v-model:search-term="searchTerm"
        :groups="[{ id: 'users', items: users }]"
        class="flex-1 h-[320px]"
        @update:model-value="onSelect"
      />
    `,
  }),
}

export const WithFooter: Story = {
  render: () => ({
    components: { CommandPaletteComponent },
    setup() {
      const value = ref({})
      const groups = ref<CommandPaletteGroup[]>([
        {
          id: 'actions',
          items: [
            {
              label: 'Добавить новый файл',
              suffix: 'Создать новый файл в текущей директории',
              icon: FileUploadIcon,
              kbds: ['meta', 'I']
            },
            {
              label: 'Добавить новую папку',
              suffix: 'Создать новую папку в текущей директории',
              icon: FolderPlusIcon,
              kbds: ['meta', 'F']
            },
            {
              label: 'Поиск файлов',
              suffix: 'Поиск по всем файлам в проекте',
              icon: CrmSearchIcon,
              kbds: ['meta', 'P']
            },
            {
              label: 'Настройки',
              suffix: 'Открыть настройки приложения',
              icon: SettingsLIcon,
              kbds: ['meta', ',']
            }
          ]
        },
        {
          id: 'recent',
          label: 'Недавние',
          items: [
            {
              label: 'project.vue',
              suffix: 'components/',
              icon: VueIcon
            },
            {
              label: 'readme.md',
              suffix: 'docs/',
              icon: MarkdownIcon
            },
            {
              label: 'package.json',
              suffix: 'root/',
              icon: NodeIcon
            }
          ]
        }
      ])

      return { value, groups, Bitrix24Icon }
    },
    template: `
      <CommandPaletteComponent
        v-model="value"
        :groups="groups"
        class="flex-1 h-80"
      >
        <template #footer>
          <div class="flex items-center justify-between gap-2">
            <Bitrix24Icon class="size-5 text-(--b24ui-typography-label-color) ml-1" />
            <div class="flex items-center gap-1">
              <span class="text-sm text-gray-600">Открыть команду</span>
              <kbd class="px-2 py-1 text-xs bg-gray-100 rounded">Enter</kbd>
              <span class="text-sm text-gray-600 ml-2">Действия</span>
              <kbd class="px-2 py-1 text-xs bg-gray-100 rounded">⌘</kbd>
              <kbd class="px-2 py-1 text-xs bg-gray-100 rounded">K</kbd>
            </div>
          </div>
        </template>
      </CommandPaletteComponent>
    `,
  }),
}

export const WithVirtualization: Story = {
  render: () => ({
    components: { CommandPaletteComponent },
    setup() {
      const value = ref({})
      const items: CommandPaletteItem[] = Array(1000)
        .fill(0)
        .map((_, index) => ({
          label: `Элемент-${index}`,
          value: index
        }))

      const groups = ref<CommandPaletteGroup[]>([
        {
          id: 'items',
          items
        }
      ])

      return { value, groups }
    },
    template: `
      <CommandPaletteComponent
        v-model="value"
        :groups="groups"
        virtualize
        :fuse="{ resultLimit: 1000 }"
        class="flex-1 h-[320px]"
      />
    `,
  }),
}

export const InContext: Story = {
  render: () => ({
    components: { CommandPaletteComponent },
    setup() {
      const value = ref({})
      const groups = ref<CommandPaletteGroup[]>([
        {
          id: 'quick-actions',
          label: 'Быстрые действия',
          items: [
            {
              label: 'Создать задачу',
              icon: FileUploadIcon,
              suffix: 'Создать новую задачу',
              kbds: ['meta', 'T']
            },
            {
              label: 'Открыть календарь',
              icon: FolderPlusIcon,
              suffix: 'Просмотреть календарь',
              kbds: ['meta', 'C']
            }
          ]
        },
        {
          id: 'recent',
          label: 'Недавние файлы',
          items: [
            {
              label: 'Отчет.pdf',
              suffix: 'Документы/',
              icon: FileUploadIcon
            },
            {
              label: 'Презентация.pptx',
              suffix: 'Презентации/',
              icon: FileUploadIcon
            }
          ]
        }
      ])

      return { value, groups, SearchIcon }
    },
    template: `
      <div class="max-w-2xl space-y-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">CommandPalette</h1>
          <p class="text-gray-600">
            Компонент палитры команд с поиском. Позволяет быстро находить и выполнять действия через поиск.
          </p>
        </div>
        <div class="border rounded-lg p-4">
          <CommandPaletteComponent
            v-model="value"
            :groups="groups"
            :icon="SearchIcon"
            placeholder="Поиск команд..."
            class="h-[320px]"
          />
        </div>
      </div>
    `,
  }),
}
