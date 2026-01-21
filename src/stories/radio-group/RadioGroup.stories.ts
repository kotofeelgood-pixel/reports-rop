import type { Meta, StoryObj } from '@storybook/vue3-vite'
import RadioGroupComponent from '../../components/radio-group/RadioGroupComponent.vue'
import type { RadioGroupModel, RadioGroupSize, RadioGroupColor, RadioGroupVariant, RadioGroupOrientation, RadioGroupIndicator } from '../../components/radio-group/model'
import type { RadioGroupItem } from '@bitrix24/b24ui-nuxt'
import { ref } from 'vue'

const meta = {
  title: 'Form/RadioGroup',
  component: RadioGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    legend: { control: 'text' },
    valueKey: { control: 'text' },
    labelKey: { control: 'text' },
    descriptionKey: { control: 'text' },
    items: { control: 'object' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'] as RadioGroupSize[],
    },
    variant: {
      control: 'select',
      options: ['card', 'list', 'table'] as RadioGroupVariant[],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'] as RadioGroupOrientation[],
    },
    indicator: {
      control: 'select',
      options: ['start', 'end', 'hidden'] as RadioGroupIndicator[],
    },
    disabled: { control: 'boolean' },
    loop: { control: 'boolean' },
    name: { control: 'text' },
    required: { control: 'boolean' },
    color: {
      control: 'select',
      options: [
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-warning',
        'air-primary-copilot',
      ] as RadioGroupColor[],
    },
  },
  args: {
    items: [
      'System',
      'Light',
      'Dark',
    ],
    size: 'md',
    variant: 'list',
    orientation: 'vertical',
    color: 'air-primary',
    indicator: 'start',
  } as Partial<RadioGroupModel>,
} as Meta<typeof RadioGroupComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<RadioGroupModel>
}

export const Default: Story = {
  args: {
    items: [
      'System',
      'Light',
      'Dark',
    ],
  },
  render: (args) => ({
    components: { RadioGroupComponent },
    setup() {
      const value = ref('System')
      return { args, value }
    },
    template: `
      <RadioGroupComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithObjects: Story = {
  args: {
    items: [
      {
        label: 'System',
        description: 'Это первая опция.',
        value: 'system',
      },
      {
        label: 'Light',
        description: 'Это вторая опция.',
        value: 'light',
      },
      {
        label: 'Dark',
        description: 'Это третья опция.',
        value: 'dark',
      },
    ] as RadioGroupItem[],
  },
  render: (args) => ({
    components: { RadioGroupComponent },
    setup() {
      const value = ref('system')
      return { args, value }
    },
    template: `
      <RadioGroupComponent
        v-bind="args"
        v-model="value"
        value-key="value"
      />
    `,
  }),
}

export const WithValueKey: Story = {
  args: {
    items: [
      {
        label: 'System',
        description: 'Это первая опция.',
        id: 'system',
      },
      {
        label: 'Light',
        description: 'Это вторая опция.',
        id: 'light',
      },
      {
        label: 'Dark',
        description: 'Это третья опция.',
        id: 'dark',
      },
    ] as RadioGroupItem[],
    valueKey: 'id',
  },
  render: (args) => ({
    components: { RadioGroupComponent },
    setup() {
      const value = ref('light')
      return { args, value }
    },
    template: `
      <RadioGroupComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithLegend: Story = {
  args: {
    legend: 'Тема',
    items: [
      'System',
      'Light',
      'Dark',
    ],
    defaultValue: 'System',
  },
  render: (args) => ({
    components: { RadioGroupComponent },
    setup() {
      return { args }
    },
    template: `
      <RadioGroupComponent
        v-bind="args"
      />
    `,
  }),
}

export const WithColor: Story = {
  args: {
    items: [
      'System',
      'Light',
      'Dark',
    ],
    color: 'air-primary-copilot',
    defaultValue: 'System',
  },
  render: (args) => ({
    components: { RadioGroupComponent },
    setup() {
      return { args }
    },
    template: `
      <RadioGroupComponent
        v-bind="args"
      />
    `,
  }),
}

export const CardVariant: Story = {
  args: {
    items: [
      {
        label: 'Pro',
        value: 'pro',
        description: 'Для независимых разработчиков, фрилансеров и основателей.',
      },
      {
        label: 'Startup',
        value: 'startup',
        description: 'Идеально подходит для небольших команд, стартапов и агентств.',
      },
      {
        label: 'Enterprise',
        value: 'enterprise',
        description: 'Идеально для больших команд и организаций.',
      },
    ] as RadioGroupItem[],
    variant: 'card',
    color: 'air-primary-copilot',
    defaultValue: 'pro',
  },
  render: (args) => ({
    components: { RadioGroupComponent },
    setup() {
      const value = ref('pro')
      return { args, value }
    },
    template: `
      <RadioGroupComponent
        v-bind="args"
        v-model="value"
        value-key="value"
      />
    `,
  }),
}

export const TableVariant: Story = {
  args: {
    items: [
      {
        label: 'Опция 1',
        description: 'Описание первой опции',
        value: 'option1',
      },
      {
        label: 'Опция 2',
        description: 'Описание второй опции',
        value: 'option2',
      },
      {
        label: 'Опция 3',
        description: 'Описание третьей опции',
        value: 'option3',
      },
    ] as RadioGroupItem[],
    variant: 'table',
  },
  render: (args) => ({
    components: { RadioGroupComponent },
    setup() {
      const value = ref('option1')
      return { args, value }
    },
    template: `
      <RadioGroupComponent
        v-bind="args"
        v-model="value"
        value-key="value"
      />
    `,
  }),
}

export const WithSize: Story = {
  args: {
    items: [
      'System',
      'Light',
      'Dark',
    ],
    size: 'lg',
    variant: 'list',
    defaultValue: 'System',
  },
  render: (args) => ({
    components: { RadioGroupComponent },
    setup() {
      return { args }
    },
    template: `
      <RadioGroupComponent
        v-bind="args"
      />
    `,
  }),
}

export const Horizontal: Story = {
  args: {
    items: [
      'System',
      'Light',
      'Dark',
    ],
    orientation: 'horizontal',
    variant: 'list',
    defaultValue: 'System',
  },
  render: (args) => ({
    components: { RadioGroupComponent },
    setup() {
      return { args }
    },
    template: `
      <RadioGroupComponent
        v-bind="args"
      />
    `,
  }),
}

export const Vertical: Story = {
  args: {
    items: [
      'System',
      'Light',
      'Dark',
    ],
    orientation: 'vertical',
    variant: 'list',
    defaultValue: 'System',
  },
  render: (args) => ({
    components: { RadioGroupComponent },
    setup() {
      return { args }
    },
    template: `
      <RadioGroupComponent
        v-bind="args"
      />
    `,
  }),
}

export const WithIndicator: Story = {
  args: {
    items: [
      'System',
      'Light',
      'Dark',
    ],
    indicator: 'end',
    variant: 'card',
    defaultValue: 'System',
  },
  render: (args) => ({
    components: { RadioGroupComponent },
    setup() {
      return { args }
    },
    template: `
      <RadioGroupComponent
        v-bind="args"
      />
    `,
  }),
}

export const HiddenIndicator: Story = {
  args: {
    items: [
      'System',
      'Light',
      'Dark',
    ],
    indicator: 'hidden',
    variant: 'card',
    defaultValue: 'System',
  },
  render: (args) => ({
    components: { RadioGroupComponent },
    setup() {
      return { args }
    },
    template: `
      <RadioGroupComponent
        v-bind="args"
      />
    `,
  }),
}

export const Disabled: Story = {
  args: {
    items: [
      'System',
      'Light',
      'Dark',
    ],
    disabled: true,
    variant: 'list',
    defaultValue: 'System',
  },
  render: (args) => ({
    components: { RadioGroupComponent },
    setup() {
      return { args }
    },
    template: `
      <RadioGroupComponent
        v-bind="args"
      />
    `,
  }),
}

export const WithDisabledItems: Story = {
  args: {
    items: [
      {
        label: 'System',
        value: 'system',
        disabled: false,
      },
      {
        label: 'Light',
        value: 'light',
        disabled: true,
      },
      {
        label: 'Dark',
        value: 'dark',
        disabled: false,
      },
    ] as RadioGroupItem[],
  },
  render: (args) => ({
    components: { RadioGroupComponent },
    setup() {
      const value = ref('system')
      return { args, value }
    },
    template: `
      <RadioGroupComponent
        v-bind="args"
        v-model="value"
        value-key="value"
      />
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { RadioGroupComponent },
    setup() {
      const values = {
        xs: ref('System'),
        sm: ref('System'),
        md: ref('System'),
        lg: ref('System'),
      }
      return { values }
    },
    template: `
      <div class="space-y-6">
        <div>
          <div class="mb-2 text-sm font-medium">Extra Small</div>
          <RadioGroupComponent
            v-model="values.xs"
            :items="['System', 'Light', 'Dark']"
            size="xs"
            variant="list"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Small</div>
          <RadioGroupComponent
            v-model="values.sm"
            :items="['System', 'Light', 'Dark']"
            size="sm"
            variant="list"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Medium</div>
          <RadioGroupComponent
            v-model="values.md"
            :items="['System', 'Light', 'Dark']"
            size="md"
            variant="list"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Large</div>
          <RadioGroupComponent
            v-model="values.lg"
            :items="['System', 'Light', 'Dark']"
            size="lg"
            variant="list"
          />
        </div>
      </div>
    `,
  }),
}

export const AllColors: Story = {
  render: () => ({
    components: { RadioGroupComponent },
    setup() {
      const values = {
        primary: ref('System'),
        success: ref('System'),
        alert: ref('System'),
        warning: ref('System'),
        copilot: ref('System'),
      }
      return { values }
    },
    template: `
      <div class="space-y-6">
        <div>
          <div class="mb-2 text-sm font-medium">Primary</div>
          <RadioGroupComponent
            v-model="values.primary"
            :items="['System', 'Light', 'Dark']"
            color="air-primary"
            variant="list"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Success</div>
          <RadioGroupComponent
            v-model="values.success"
            :items="['System', 'Light', 'Dark']"
            color="air-primary-success"
            variant="list"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Alert</div>
          <RadioGroupComponent
            v-model="values.alert"
            :items="['System', 'Light', 'Dark']"
            color="air-primary-alert"
            variant="list"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Warning</div>
          <RadioGroupComponent
            v-model="values.warning"
            :items="['System', 'Light', 'Dark']"
            color="air-primary-warning"
            variant="list"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Copilot</div>
          <RadioGroupComponent
            v-model="values.copilot"
            :items="['System', 'Light', 'Dark']"
            color="air-primary-copilot"
            variant="list"
          />
        </div>
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { RadioGroupComponent },
    setup() {
      const values = {
        list: ref('System'),
        card: ref('System'),
        table: ref('System'),
      }
      return { values }
    },
    template: `
      <div class="space-y-6">
        <div>
          <div class="mb-2 text-sm font-medium">List</div>
          <RadioGroupComponent
            v-model="values.list"
            :items="['System', 'Light', 'Dark']"
            variant="list"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Card</div>
          <RadioGroupComponent
            v-model="values.card"
            :items="['System', 'Light', 'Dark']"
            variant="card"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Table</div>
          <RadioGroupComponent
            v-model="values.table"
            :items="['System', 'Light', 'Dark']"
            variant="table"
          />
        </div>
      </div>
    `,
  }),
}

export const WithCustomSlots: Story = {
  args: {
    legend: 'Тема',
    items: [
      {
        label: 'System',
        description: 'Использовать системную тему',
        value: 'system',
      },
      {
        label: 'Light',
        description: 'Светлая тема',
        value: 'light',
      },
      {
        label: 'Dark',
        description: 'Темная тема',
        value: 'dark',
      },
    ] as RadioGroupItem[],
  },
  render: (args) => ({
    components: { RadioGroupComponent },
    setup() {
      const value = ref('system')
      return { args, value }
    },
    template: `
      <RadioGroupComponent
        v-bind="args"
        v-model="value"
        value-key="value"
      >
        <template #legend>
          <span class="font-bold text-blue-600">Кастомная легенда</span>
        </template>
      </RadioGroupComponent>
    `,
  }),
}

export const InForm: Story = {
  args: {
    legend: 'Выберите тему',
    items: [
      {
        label: 'System',
        value: 'system',
      },
      {
        label: 'Light',
        value: 'light',
      },
      {
        label: 'Dark',
        value: 'dark',
      },
    ] as RadioGroupItem[],
    required: true,
  },
  render: (args) => ({
    components: { RadioGroupComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <form @submit.prevent class="space-y-4">
        <RadioGroupComponent
          v-bind="args"
          v-model="value"
          value-key="value"
          name="theme"
        />
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          :disabled="!value"
        >
          Отправить
        </button>
        <div class="text-sm text-gray-600">
          Выбрано: <strong>{{ value || 'Ничего не выбрано' }}</strong>
        </div>
      </form>
    `,
  }),
}

export const InContext: Story = {
  args: {
    legend: 'Тема',
    items: [
      'System',
      'Light',
      'Dark',
    ],
  },
  render: (args) => ({
    components: { RadioGroupComponent },
    setup() {
      const value = ref('System')
      return { args, value }
    },
    template: `
      <div class="max-w-md space-y-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">RadioGroup</h1>
          <p class="text-gray-600">
            Коллекция радиокнопок для выбора одной опции из нескольких. Используется для выбора единственного значения из группы опций.
          </p>
        </div>
        <RadioGroupComponent
          v-bind="args"
          v-model="value"
        />
        <div class="text-sm text-gray-600">
          Выбрано: <strong>{{ value }}</strong>
        </div>
      </div>
    `,
  }),
}

export const ThemeSelector: Story = {
  args: {
    legend: 'Выберите тему оформления',
  },
  render: (args) => ({
    components: { RadioGroupComponent },
    setup() {
      const theme = ref('system')
      const items = [
        {
          label: 'System',
          description: 'Использовать системную тему устройства',
          value: 'system',
        },
        {
          label: 'Light',
          description: 'Светлая тема',
          value: 'light',
        },
        {
          label: 'Dark',
          description: 'Темная тема',
          value: 'dark',
        },
      ]
      return { args, theme, items }
    },
    template: `
      <div class="max-w-md space-y-4">
        <RadioGroupComponent
          v-bind="args"
          :items="items"
          v-model="theme"
          value-key="value"
          variant="card"
        />
        <div class="p-4 bg-gray-100 rounded-lg">
          <p class="text-sm text-gray-600">
            Текущая тема: <strong>{{ theme }}</strong>
          </p>
        </div>
      </div>
    `,
  }),
}
