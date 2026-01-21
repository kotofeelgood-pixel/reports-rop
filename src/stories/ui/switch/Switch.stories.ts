import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SwitchComponent from './SwitchComponent.vue'
import type { SwitchModel, SwitchColor, SwitchSize } from './model'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import { ref } from 'vue'

const meta = {
  title: 'UI/Switch',
  component: SwitchComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    color: {
      control: 'select',
      options: [
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-warning',
        'air-primary-copilot',
      ] as SwitchColor[],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'] as SwitchSize[],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    color: 'air-primary',
    size: 'md',
  } as Partial<SwitchModel>,
} as Meta<typeof SwitchComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<SwitchModel>
}

export const Default: Story = {
  render: (args) => ({
    components: { SwitchComponent },
    setup() {
      const value = ref(true)
      return { args, value }
    },
    template: `
      <SwitchComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: true,
  },
  render: (args) => ({
    components: { SwitchComponent },
    setup() {
      return { args }
    },
    template: `
      <SwitchComponent
        v-bind="args"
      />
    `,
  }),
}

export const WithLabel: Story = {
  args: {
    label: 'Включи меня',
  },
  render: (args) => ({
    components: { SwitchComponent },
    setup() {
      const value = ref(false)
      return { args, value }
    },
    template: `
      <SwitchComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithRequired: Story = {
  args: {
    label: 'Включи меня',
    required: true,
  },
  render: (args) => ({
    components: { SwitchComponent },
    setup() {
      const value = ref(false)
      return { args, value }
    },
    template: `
      <SwitchComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithDescription: Story = {
  args: {
    label: 'Включи меня',
    description: 'Это переключатель.',
  },
  render: (args) => ({
    components: { SwitchComponent },
    setup() {
      const value = ref(false)
      return { args, value }
    },
    template: `
      <SwitchComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithIcon: Story = {
  args: {
    checkedIcon: RocketIcon,
    defaultValue: true,
    label: 'Включи меня',
  },
  render: (args) => ({
    components: { SwitchComponent },
    setup() {
      return { args }
    },
    template: `
      <SwitchComponent
        v-bind="args"
      />
    `,
  }),
}

export const WithCheckedAndUncheckedIcons: Story = {
  args: {
    checkedIcon: RocketIcon,
    uncheckedIcon: RocketIcon,
    label: 'Включи меня',
  },
  render: (args) => ({
    components: { SwitchComponent },
    setup() {
      const value = ref(false)
      return { args, value }
    },
    template: `
      <SwitchComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithLoading: Story = {
  args: {
    loading: true,
    defaultValue: true,
    label: 'Включи меня',
  },
  render: (args) => ({
    components: { SwitchComponent },
    setup() {
      return { args }
    },
    template: `
      <SwitchComponent
        v-bind="args"
      />
    `,
  }),
}

export const WithColor: Story = {
  args: {
    color: 'air-primary-copilot',
    defaultValue: true,
    label: 'Включи меня',
  },
  render: (args) => ({
    components: { SwitchComponent },
    setup() {
      return { args }
    },
    template: `
      <SwitchComponent
        v-bind="args"
      />
    `,
  }),
}

export const WithSize: Story = {
  args: {
    size: 'lg',
    defaultValue: true,
    label: 'Включи меня',
  },
  render: (args) => ({
    components: { SwitchComponent },
    setup() {
      return { args }
    },
    template: `
      <SwitchComponent
        v-bind="args"
      />
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { SwitchComponent },
    setup() {
      const values = {
        xs: ref(true),
        sm: ref(true),
        md: ref(true),
        lg: ref(true),
      }
      return { values }
    },
    template: `
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <SwitchComponent
            v-model="values.xs"
            size="xs"
            label="Extra Small"
          />
        </div>
        <div class="flex items-center gap-4">
          <SwitchComponent
            v-model="values.sm"
            size="sm"
            label="Small"
          />
        </div>
        <div class="flex items-center gap-4">
          <SwitchComponent
            v-model="values.md"
            size="md"
            label="Medium"
          />
        </div>
        <div class="flex items-center gap-4">
          <SwitchComponent
            v-model="values.lg"
            size="lg"
            label="Large"
          />
        </div>
      </div>
    `,
  }),
}

export const AllColors: Story = {
  render: () => ({
    components: { SwitchComponent },
    setup() {
      const values = {
        primary: ref(true),
        success: ref(true),
        alert: ref(true),
        warning: ref(true),
        copilot: ref(true),
      }
      return { values }
    },
    template: `
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <SwitchComponent
            v-model="values.primary"
            color="air-primary"
            label="Primary"
          />
        </div>
        <div class="flex items-center gap-4">
          <SwitchComponent
            v-model="values.success"
            color="air-primary-success"
            label="Success"
          />
        </div>
        <div class="flex items-center gap-4">
          <SwitchComponent
            v-model="values.alert"
            color="air-primary-alert"
            label="Alert"
          />
        </div>
        <div class="flex items-center gap-4">
          <SwitchComponent
            v-model="values.warning"
            color="air-primary-warning"
            label="Warning"
          />
        </div>
        <div class="flex items-center gap-4">
          <SwitchComponent
            v-model="values.copilot"
            color="air-primary-copilot"
            label="Copilot"
          />
        </div>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Включи меня',
  },
  render: (args) => ({
    components: { SwitchComponent },
    setup() {
      const value = ref(false)
      return { args, value }
    },
    template: `
      <div class="space-y-4">
        <SwitchComponent
          v-bind="args"
          v-model="value"
        />
        <SwitchComponent
          v-bind="args"
          :default-value="true"
        />
      </div>
    `,
  }),
}

export const WithCustomSlots: Story = {
  args: {
    label: 'Включи меня',
    description: 'Это переключатель.',
  },
  render: (args) => ({
    components: { SwitchComponent },
    setup() {
      const value = ref(false)
      return { args, value }
    },
    template: `
      <SwitchComponent
        v-bind="args"
        v-model="value"
      >
        <template #label>
          <span class="font-bold text-blue-600">Кастомная метка</span>
        </template>
        <template #description>
          <span class="text-sm text-gray-500">Кастомное описание</span>
        </template>
      </SwitchComponent>
    `,
  }),
}

export const InForm: Story = {
  args: {
    label: 'Согласен с условиями',
    description: 'Я принимаю условия использования',
    required: true,
  },
  render: (args) => ({
    components: { SwitchComponent },
    setup() {
      const value = ref(false)
      return { args, value }
    },
    template: `
      <form @submit.prevent class="space-y-4">
        <SwitchComponent
          v-bind="args"
          v-model="value"
          name="agreement"
        />
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          :disabled="!value"
        >
          Отправить
        </button>
        <div class="text-sm text-gray-600">
          Значение: {{ value ? 'Включено' : 'Выключено' }}
        </div>
      </form>
    `,
  }),
}

export const InContext: Story = {
  args: {
    label: 'Уведомления',
    description: 'Получать уведомления по email',
  },
  render: (args) => ({
    components: { SwitchComponent },
    setup() {
      const value = ref(true)
      return { args, value }
    },
    template: `
      <div class="max-w-md space-y-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">Switch</h1>
          <p class="text-gray-600">
            Переключатель для переключения между двумя состояниями. Используется для включения/выключения опций.
          </p>
        </div>
        <div class="space-y-4">
          <SwitchComponent
            v-bind="args"
            v-model="value"
          />
          <div class="text-sm text-gray-600">
            Статус: <strong>{{ value ? 'Включено' : 'Выключено' }}</strong>
          </div>
        </div>
      </div>
    `,
  }),
}

export const MultipleSwitches: Story = {
  render: () => ({
    components: { SwitchComponent },
    setup() {
      const settings = {
        notifications: ref(true),
        email: ref(false),
        sms: ref(true),
        push: ref(false),
      }
      return { settings }
    },
    template: `
      <div class="max-w-md space-y-4">
        <h2 class="text-xl font-semibold">Настройки уведомлений</h2>
        <div class="space-y-3">
          <SwitchComponent
            v-model="settings.notifications"
            label="Уведомления"
            description="Включить все уведомления"
          />
          <SwitchComponent
            v-model="settings.email"
            label="Email уведомления"
            description="Получать уведомления на email"
          />
          <SwitchComponent
            v-model="settings.sms"
            label="SMS уведомления"
            description="Получать уведомления по SMS"
          />
          <SwitchComponent
            v-model="settings.push"
            label="Push уведомления"
            description="Получать push уведомления"
          />
        </div>
      </div>
    `,
  }),
}
