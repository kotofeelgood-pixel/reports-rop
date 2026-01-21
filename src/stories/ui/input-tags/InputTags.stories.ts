import type { Meta, StoryObj } from '@storybook/vue3-vite'
import InputTagsComponent from './InputTagsComponent.vue'
import type { InputTagsModel, InputTagsColor, InputTagsSize, InputTagsTagColor } from './model'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import { ref } from 'vue'

const meta = {
  title: 'UI/InputTags',
  component: InputTagsComponent,
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
      ] as InputTagsColor[],
    },
    size: {
      control: 'select',
      options: ['xss', 'xs', 'sm', 'md', 'lg', 'xl'] as InputTagsSize[],
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
      ] as InputTagsTagColor[],
    },
    maxLength: { control: 'number' },
    max: { control: 'number' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    highlight: { control: 'boolean' },
    noBorder: { control: 'boolean' },
    underline: { control: 'boolean' },
    rounded: { control: 'boolean' },
    duplicate: { control: 'boolean' },
    addOnPaste: { control: 'boolean' },
    addOnTab: { control: 'boolean' },
    addOnBlur: { control: 'boolean' },
  },
  args: {
    placeholder: 'Введите теги...',
    color: 'air-primary',
    size: 'md',
  } as Partial<InputTagsModel>,
} as Meta<typeof InputTagsComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<InputTagsModel>
}

export const Default: Story = {
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref(['Bitrix24'])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: ['Bitrix24'],
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      return { args }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
      />
    `,
  }),
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Введите теги...',
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithMaxLength: Story = {
  args: {
    maxLength: 4,
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithColor: Story = {
  args: {
    color: 'air-primary',
    highlight: true,
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref(['Bitrix24'])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithTag: Story = {
  args: {
    tag: 'note',
    tagColor: 'air-primary',
    color: 'air-primary',
    highlight: true,
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref(['Bitrix24'])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithSize: Story = {
  args: {
    size: 'xl',
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref(['Bitrix24'])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithIcon: Story = {
  args: {
    icon: RocketIcon,
    size: 'md',
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref(['Bitrix24'])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: RocketIcon,
    size: 'md',
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref(['Bitrix24'])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithAvatar: Story = {
  args: {
    avatar: { src: '/b24ui/avatar/employee.png' },
    size: 'md',
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref(['Bitrix24'])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithDeleteIcon: Story = {
  args: {
    deleteIcon: RocketIcon,
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref(['Bitrix24', 'Vue', 'TypeScript'])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithLoading: Story = {
  args: {
    loading: true,
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref(['Bitrix24'])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref(['Bitrix24'])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const NoBorder: Story = {
  args: {
    noBorder: true,
    highlight: true,
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref(['Bitrix24'])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const Underline: Story = {
  args: {
    underline: true,
    highlight: true,
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref(['Bitrix24'])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const Rounded: Story = {
  args: {
    rounded: true,
    highlight: true,
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref(['Bitrix24'])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithMaxTags: Story = {
  args: {
    max: 3,
    placeholder: 'Максимум 3 тега',
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref(['Bitrix24', 'Vue'])
      return { args, value }
    },
    template: `
      <div class="space-y-2">
        <InputTagsComponent
          v-bind="args"
          v-model="value"
        />
        <div class="text-sm text-gray-600">
          Тегов: {{ value.length }} / {{ args.max }}
        </div>
      </div>
    `,
  }),
}

export const WithDuplicate: Story = {
  args: {
    duplicate: true,
    placeholder: 'Разрешены дубликаты',
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithDelimiter: Story = {
  args: {
    delimiter: ',',
    placeholder: 'Введите теги через запятую',
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const AddOnPaste: Story = {
  args: {
    addOnPaste: true,
    delimiter: ',',
    placeholder: 'Вставьте теги через запятую',
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <div class="space-y-2">
        <InputTagsComponent
          v-bind="args"
          v-model="value"
        />
        <p class="text-sm text-gray-600">
          Попробуйте вставить текст: "tag1, tag2, tag3"
        </p>
      </div>
    `,
  }),
}

export const AddOnTab: Story = {
  args: {
    addOnTab: true,
    placeholder: 'Нажмите Tab для добавления тега',
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const AddOnBlur: Story = {
  args: {
    addOnBlur: true,
    placeholder: 'Тег добавится при потере фокуса',
  },
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const MultipleTags: Story = {
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref(['Bitrix24', 'Vue', 'TypeScript', 'TailwindCSS'])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
        placeholder="Введите теги..."
      />
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { InputTagsComponent },
    setup() {
      const values = {
        xss: ref(['Tag']),
        xs: ref(['Tag']),
        sm: ref(['Tag']),
        md: ref(['Tag']),
        lg: ref(['Tag']),
        xl: ref(['Tag']),
      }
      return { values }
    },
    template: `
      <div class="space-y-6 w-full max-w-md">
        <div>
          <div class="mb-2 text-sm font-medium">Extra Extra Small</div>
          <InputTagsComponent
            v-model="values.xss"
            size="xss"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Extra Small</div>
          <InputTagsComponent
            v-model="values.xs"
            size="xs"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Small</div>
          <InputTagsComponent
            v-model="values.sm"
            size="sm"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Medium</div>
          <InputTagsComponent
            v-model="values.md"
            size="md"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Large</div>
          <InputTagsComponent
            v-model="values.lg"
            size="lg"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Extra Large</div>
          <InputTagsComponent
            v-model="values.xl"
            size="xl"
          />
        </div>
      </div>
    `,
  }),
}

export const AllColors: Story = {
  render: () => ({
    components: { InputTagsComponent },
    setup() {
      const values = {
        primary: ref(['Tag']),
        success: ref(['Tag']),
        alert: ref(['Tag']),
        warning: ref(['Tag']),
        copilot: ref(['Tag']),
      }
      return { values }
    },
    template: `
      <div class="space-y-6 w-full max-w-md">
        <div>
          <div class="mb-2 text-sm font-medium">Primary</div>
          <InputTagsComponent
            v-model="values.primary"
            color="air-primary"
            highlight
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Success</div>
          <InputTagsComponent
            v-model="values.success"
            color="air-primary-success"
            highlight
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Alert</div>
          <InputTagsComponent
            v-model="values.alert"
            color="air-primary-alert"
            highlight
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Warning</div>
          <InputTagsComponent
            v-model="values.warning"
            color="air-primary-warning"
            highlight
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Copilot</div>
          <InputTagsComponent
            v-model="values.copilot"
            color="air-primary-copilot"
            highlight
          />
        </div>
      </div>
    `,
  }),
}

export const WithCustomSlots: Story = {
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref(['Bitrix24', 'Vue'])
      return { args, value }
    },
    template: `
      <InputTagsComponent
        v-bind="args"
        v-model="value"
        placeholder="Введите теги..."
      >
        <template #item-text="{ value: tagValue }">
          <span class="font-bold">{{ tagValue }}</span>
        </template>
      </InputTagsComponent>
    `,
  }),
}

export const WithEvents: Story = {
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const value = ref<string[]>([])
      const events = ref<string[]>([])

      function handleAddTag(tag: string) {
        events.value.push(`Добавлен тег: ${tag}`)
      }

      function handleRemoveTag(tag: string) {
        events.value.push(`Удален тег: ${tag}`)
      }

      function handleChange() {
        events.value.push('Изменение значения')
      }

      return { args, value, events, handleAddTag, handleRemoveTag, handleChange }
    },
    template: `
      <div class="space-y-4 w-full max-w-md">
        <InputTagsComponent
          v-bind="args"
          v-model="value"
          placeholder="Введите теги..."
          @add-tag="handleAddTag"
          @remove-tag="handleRemoveTag"
          @change="handleChange"
        />
        <div class="p-4 bg-gray-100 rounded-lg">
          <div class="text-sm font-medium mb-2">События:</div>
          <div class="text-sm text-gray-600 space-y-1">
            <div v-for="(event, index) in events.slice(-5)" :key="index">
              {{ event }}
            </div>
            <div v-if="events.length === 0" class="text-gray-400">
              Нет событий
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

export const InContext: Story = {
  render: (args) => ({
    components: { InputTagsComponent },
    setup() {
      const tags = ref(['Bitrix24'])
      return { args, tags }
    },
    template: `
      <div class="max-w-md space-y-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">InputTags</h1>
          <p class="text-gray-600">
            Компонент ввода тегов с интерактивными элементами тегов. Позволяет добавлять и удалять теги.
          </p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Теги</label>
          <InputTagsComponent
            v-bind="args"
            v-model="tags"
            placeholder="Введите теги..."
          />
        </div>
        <div class="text-sm text-gray-600">
          Количество тегов: <strong>{{ tags.length }}</strong>
        </div>
      </div>
    `,
  }),
}
