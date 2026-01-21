import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SelectComponent from '../../components/select/SelectComponent.vue'
import type { SelectModel, SelectColor, SelectSize, SelectTagColor } from '../../components/select/model'
import type { SelectItem } from '@bitrix24/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/main/SettingsIcon'
import MyPlanIcon from '@bitrix24/b24icons-vue/main/MyPlanIcon'
import Shield2DefendedIcon from '@bitrix24/b24icons-vue/main/Shield2DefendedIcon'
import { ref, computed } from 'vue'

const meta = {
  title: 'UI/Select',
  component: SelectComponent,
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
      ] as SelectColor[],
    },
    size: {
      control: 'select',
      options: ['xss', 'xs', 'sm', 'md', 'lg', 'xl'] as SelectSize[],
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
      ] as SelectTagColor[],
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
  } as Partial<SelectModel>,
} as Meta<typeof SelectComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<SelectModel>
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
    components: { SelectComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectComponent
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
    ] as SelectItem[],
  },
  render: (args) => ({
    components: { SelectComponent },
    setup() {
      const value = ref('backlog')
      return { args, value }
    },
    template: `
      <SelectComponent
        v-bind="args"
        v-model="value"
        value-key="value"
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
    ] as SelectItem[],
    valueKey: 'id',
  },
  render: (args) => ({
    components: { SelectComponent },
    setup() {
      const value = ref('todo')
      return { args, value }
    },
    template: `
      <SelectComponent
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
    components: { SelectComponent },
    setup() {
      const value = ref(['Backlog', 'Todo'])
      return { args, value }
    },
    template: `
      <SelectComponent
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
    components: { SelectComponent },
    setup() {
      return { args }
    },
    template: `
      <SelectComponent
        v-bind="args"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithContent: Story = {
  args: {
    items: [
      'Backlog',
      'Todo',
      'In Progress',
      'Done',
    ],
    content: { align: 'center', side: 'bottom', sideOffset: 8 },
  },
  render: (args) => ({
    components: { SelectComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectComponent
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
    components: { SelectComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectComponent
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
    components: { SelectComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectComponent
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
    components: { SelectComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectComponent
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
    components: { SelectComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectComponent
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
    components: { SelectComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectComponent
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
    components: { SelectComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectComponent
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
    components: { SelectComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectComponent
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
    components: { SelectComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectComponent
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
    components: { SelectComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <SelectComponent
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
    components: { SelectComponent },
    setup() {
      return { args }
    },
    template: `
      <SelectComponent
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
    components: { SelectComponent },
    setup() {
      return { args }
    },
    template: `
      <SelectComponent
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
    components: { SelectComponent },
    setup() {
      return { args }
    },
    template: `
      <SelectComponent
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
    components: { SelectComponent },
    setup() {
      return { args }
    },
    template: `
      <SelectComponent
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
    components: { SelectComponent },
    setup() {
      return { args }
    },
    template: `
      <SelectComponent
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
    ] as SelectItem[],
  },
  render: (args) => ({
    components: { SelectComponent },
    setup() {
      const value = ref('Apple')
      return { args, value }
    },
    template: `
      <SelectComponent
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
    ] as SelectItem[],
  },
  render: (args) => ({
    components: { SelectComponent },
    setup() {
      const value = ref('settings')
      const icon = computed(() => {
        const item = args.items?.find((item: any) => item.value === value.value)
        return item?.icon
      })
      return { args, value, icon }
    },
    template: `
      <SelectComponent
        v-bind="args"
        v-model="value"
        :icon="icon"
        value-key="value"
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
    ] as SelectItem[],
  },
  render: (args) => ({
    components: { SelectComponent },
    setup() {
      const value = ref('settings')
      const icon = computed(() => {
        const item = args.items?.find((item: any) => item.value === value.value)
        return item?.icon
      })
      return { args, value, icon }
    },
    template: `
      <SelectComponent
        v-bind="args"
        v-model="value"
        :icon="icon"
        value-key="value"
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
    ] as SelectItem[],
  },
  render: (args) => ({
    components: { SelectComponent },
    setup() {
      const value = ref('assistant')
      const avatar = computed(() => {
        const item = args.items?.find((item: any) => item.value === value.value)
        return item?.avatar
      })
      return { args, value, avatar }
    },
    template: `
      <SelectComponent
        v-bind="args"
        v-model="value"
        :avatar="avatar"
        value-key="value"
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
    ] as SelectItem[][],
  },
  render: (args) => ({
    components: { SelectComponent },
    setup() {
      const value = ref('Apple')
      return { args, value }
    },
    template: `
      <SelectComponent
        v-bind="args"
        v-model="value"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithRotatingIcon: Story = {
  args: {
    items: [
      'Настройки CRM',
      'Детали моей компании',
      'Права доступа',
    ],
  },
  render: (args) => ({
    components: { SelectComponent },
    setup() {
      const value = ref('Детали моей компании')
      return { args, value }
    },
    template: `
      <SelectComponent
        v-bind="args"
        v-model="value"
        :b24ui="{
          trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
        }"
        class="w-[192px]"
      />
    `,
  }),
}

export const WithOpenControl: Story = {
  args: {
    items: [
      'Настройки CRM',
      'Детали моей компании',
      'Права доступа',
    ],
  },
  render: (args) => ({
    components: { SelectComponent },
    setup() {
      const value = ref('Детали моей компании')
      const open = ref(false)
      return { args, value, open }
    },
    template: `
      <div class="space-y-4">
        <SelectComponent
          v-bind="args"
          v-model="value"
          v-model:open="open"
          class="w-[192px]"
        />
        <div class="text-sm text-gray-600">
          Открыто: {{ open ? 'Да' : 'Нет' }}
        </div>
      </div>
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
    components: { SelectComponent },
    setup() {
      const value = ref('Backlog')
      return { args, value }
    },
    template: `
      <div class="max-w-md space-y-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">Select</h1>
          <p class="text-gray-600">
            Компонент выбора для выбора из различных опций. Базовый компонент без поиска.
          </p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Статус задачи</label>
          <SelectComponent
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
