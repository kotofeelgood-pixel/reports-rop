import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SelectMenuComponent from '../../components/select-menu/SelectMenuComponent.vue'
import type { SelectMenuModel, SelectMenuColor, SelectMenuSize, SelectMenuTagColor } from '../../components/select-menu/model'
import type { SelectMenuItem } from '@bitrix24/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/main/SettingsIcon'
import MyPlanIcon from '@bitrix24/b24icons-vue/main/MyPlanIcon'
import Shield2DefendedIcon from '@bitrix24/b24icons-vue/main/Shield2DefendedIcon'
import { ref } from 'vue'

const meta = {
  title: 'UI/SelectMenu',
  component: SelectMenuComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    color: {
      control: 'select',
      options: [
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-warning',
        'air-primary-copilot',
      ] as SelectMenuColor[],
    },
    size: {
      control: 'select',
      options: ['xss', 'xs', 'sm', 'md', 'lg', 'xl'] as SelectMenuSize[],
    },
    tagColor: {
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
        'air-selection',
      ] as SelectMenuTagColor[],
    },
    items: { control: 'object' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    highlight: { control: 'boolean' },
    noBorder: { control: 'boolean' },
    underline: { control: 'boolean' },
    rounded: { control: 'boolean' },
    noPadding: { control: 'boolean' },
  },
  args: {
    placeholder: 'Выберите статус',
    color: 'air-primary',
    size: 'md',
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
  } as Partial<SelectMenuModel>,
} as Meta<typeof SelectMenuComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<SelectMenuModel>
}

export const Default: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithObjects: Story = {
  args: {
    items: [
      { label: 'Backlog', value: 'backlog' },
      { label: 'Todo', value: 'todo' },
      { label: 'In Progress', value: 'in_progress' },
      { label: 'Done', value: 'done' },
    ] as SelectMenuItem[],
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref({ label: 'Backlog', value: 'backlog' })
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithValueKey: Story = {
  args: {
    items: [
      { label: 'Backlog', id: 'backlog' },
      { label: 'Todo', id: 'todo' },
      { label: 'In Progress', id: 'in_progress' },
      { label: 'Done', id: 'done' },
    ] as SelectMenuItem[],
    valueKey: 'id',
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref('todo')
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
      />
    `,
  }),
}

export const Multiple: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
    multiple: true,
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref(['Backlog', 'Todo'])
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Выберите статус',
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithCustomSearchInput: Story = {
  args: {
    items: [
      { label: 'Backlog' },
      { label: 'Todo' },
      { label: 'In Progress' },
      { label: 'Done' },
    ] as SelectMenuItem[],
    searchInput: { placeholder: 'Фильтр...' },
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref({ label: 'Backlog' })
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithoutSearchInput: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
    searchInput: false,
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithArrow: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
    arrow: true,
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithColor: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
    color: 'air-primary-copilot',
    highlight: true,
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithTag: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
    tag: 'note',
    tagColor: 'air-primary-warning',
    color: 'air-primary-warning',
    highlight: true,
    placeholder: 'Поиск...',
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithSize: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
    size: 'xl',
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithIcon: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
    icon: RocketIcon,
    size: 'md',
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithTrailingIcon: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
    trailingIcon: RocketIcon,
    size: 'md',
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithSelectedIcon: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
    selectedIcon: RocketIcon,
    size: 'md',
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithAvatar: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
    avatar: { src: '/b24ui/avatar/employee.png' },
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithLoading: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
    loading: true,
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
      />
    `,
  }),
}

export const Disabled: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
    disabled: true,
    placeholder: 'Выберите статус',
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        class="w-[192px]"
      />
    `,
  }),
}

export const NoPadding: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
    noPadding: true,
    highlight: true,
    placeholder: 'Выберите статус',
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        class="w-[192px]"
      />
    `,
  }),
}

export const NoBorder: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
    noBorder: true,
    highlight: true,
    placeholder: 'Выберите статус',
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        class="w-[192px]"
      />
    `,
  }),
}

export const Underline: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
    underline: true,
    highlight: true,
    placeholder: 'Выберите статус',
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        class="w-[192px]"
      />
    `,
  }),
}

export const Rounded: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
    rounded: true,
    highlight: true,
    placeholder: 'Выберите статус',
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithItemsType: Story = {
  args: {
    items: [
      { type: 'label', label: 'Фрукты' },
      'Apple',
      'Banana',
      { type: 'separator' },
      'Blueberry',
      'Grapes',
      'Pineapple',
      { type: 'label', label: 'Овощи' },
      'Aubergine',
      'Broccoli',
      'Carrot',
      'Courgette',
      'Leek',
    ] as SelectMenuItem[],
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref('Apple')
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithColorsInItems: Story = {
  args: {
    items: [
      {
        label: 'Настройки CRM',
        value: 'settings',
        color: 'air-primary',
        icon: SettingsIcon,
      },
      {
        label: 'Детали моей компании',
        value: 'my_company_details',
        color: 'air-primary-success',
        icon: MyPlanIcon,
      },
      {
        label: 'In Progress',
        value: 'in_progress',
      },
      {
        label: 'Права доступа',
        value: 'access_permissions',
        color: 'air-primary-alert',
        icon: Shield2DefendedIcon,
      },
    ] as SelectMenuItem[],
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref(args.items![0])
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        :icon="value?.icon"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithIconsInItems: Story = {
  args: {
    items: [
      {
        label: 'Настройки CRM',
        value: 'settings',
        icon: SettingsIcon,
      },
      {
        label: 'Детали моей компании',
        value: 'my_company_details',
        icon: MyPlanIcon,
      },
      {
        label: 'In Progress',
        value: 'in_progress',
      },
      {
        label: 'Права доступа',
        value: 'access_permissions',
        icon: Shield2DefendedIcon,
      },
    ] as SelectMenuItem[],
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref(args.items![0])
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        :icon="value?.icon"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithAvatarsInItems: Story = {
  args: {
    items: [
      {
        label: 'Assistant',
        value: 'assistant',
        avatar: {
          src: '/b24ui/avatar/assistant.png',
          alt: 'assistant',
        },
      },
      {
        label: 'Employee',
        value: 'employee',
        avatar: {
          src: '/b24ui/avatar/employee.png',
          alt: 'employee',
        },
      },
    ] as SelectMenuItem[],
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref(args.items![0])
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        :avatar="value?.avatar"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithNestedItems: Story = {
  args: {
    items: [
      [
        'Apple',
        'Banana',
        'Blueberry',
        'Grapes',
        'Pineapple',
      ],
      [
        { type: 'separator' },
        'Aubergine',
        'Broccoli',
        'Carrot',
        'Courgette',
        'Leek',
      ],
    ] as SelectMenuItem[][],
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref('Apple')
      return { args, value }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithVirtualization: Story = {
  args: {
    items: Array.from({ length: 1000 }, (_, i) => ({
      label: `item-${i}`,
      value: i,
    })) as SelectMenuItem[],
    virtualize: { estimateSize: 32, overscan: 12 },
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithCreateItem: Story = {
  args: {
    items: [
      'Настройки CRM',
      'Детали моей компании',
      'Права доступа',
    ],
    createItem: true,
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const items = ref(args.items as string[])
      const value = ref('Детали моей компании')

      function onCreate(item: string) {
        items.value.push(item)
        value.value = item
      }

      return { args: { ...args, items }, value, onCreate }
    },
    template: `
      <SelectMenuComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
        @create="onCreate"
      />
    `,
  }),
}

export const InContext: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
  },
  render: (args) => ({
    components: { SelectMenuComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <div class="max-w-md space-y-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">SelectMenu</h1>
          <p class="text-gray-600">
            Улучшенный компонент выбора с возможностью поиска. Использует Combobox из Reka UI для поиска и множественного выбора.
          </p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Статус задачи</label>
          <SelectMenuComponent
            v-bind="args"
            v-model="value"
            class="w-full"
          />
        </div>
        <div class="text-sm text-gray-600">
          Выбранное значение: <strong>{{ value }}</strong>
        </div>
      </div>
    `,
  }),
}
