import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TextareaComponent from '../../components/textarea/TextareaComponent.vue'
import type { TextareaModel, TextareaColor, TextareaTagColor } from '../../components/textarea/model'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import { ref } from 'vue'

const meta = {
  title: 'Form/Textarea',
  component: TextareaComponent,
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
      ] as TextareaColor[],
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
      ] as TextareaTagColor[],
    },
    rows: { control: 'number' },
    maxrows: { control: 'number' },
    autoresize: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    highlight: { control: 'boolean' },
    noBorder: { control: 'boolean' },
    underline: { control: 'boolean' },
    rounded: { control: 'boolean' },
    noPadding: { control: 'boolean' },
    readonly: { control: 'boolean' },
    maxlength: { control: 'number' },
    minlength: { control: 'number' },
  },
  args: {
    placeholder: 'Введите текст...',
    color: 'air-primary',
    rows: 3,
  } as Partial<TextareaModel>,
} as Meta<typeof TextareaComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<TextareaModel>
}

export const Default: Story = {
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextareaComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithRows: Story = {
  args: {
    rows: 12,
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextareaComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Введите что-нибудь...',
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextareaComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithAutoresize: Story = {
  args: {
    autoresize: true,
    rows: 1,
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('Это длинный текст, который будет автоматически изменять высоту Textarea.')
      return { args, value }
    },
    template: `
      <TextareaComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithMaxRows: Story = {
  args: {
    autoresize: true,
    maxrows: 4,
    rows: 1,
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('Это длинный текст, который будет автоматически изменять высоту Textarea с максимумом в 4 строки.')
      return { args, value }
    },
    template: `
      <TextareaComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithColor: Story = {
  args: {
    color: 'air-primary-copilot',
    highlight: true,
    placeholder: 'Введите что-нибудь...',
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextareaComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithTag: Story = {
  args: {
    tag: 'note',
    tagColor: 'air-primary-warning',
    color: 'air-primary-warning',
    highlight: true,
    placeholder: 'Поиск...',
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextareaComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithIcon: Story = {
  args: {
    icon: RocketIcon,
    placeholder: 'Поиск...',
    rows: 1,
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextareaComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: RocketIcon,
    placeholder: 'Введите ваш email',
    rows: 1,
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextareaComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithAvatar: Story = {
  args: {
    avatar: { src: '/b24ui/avatar/employee.png' },
    placeholder: 'Поиск...',
    rows: 1,
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextareaComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithLoading: Story = {
  args: {
    loading: true,
    placeholder: 'Поиск...',
    rows: 1,
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextareaComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Введите что-нибудь...',
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextareaComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const NoPadding: Story = {
  args: {
    noPadding: true,
    highlight: true,
    placeholder: 'Введите что-нибудь...',
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextareaComponent
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
    placeholder: 'Введите что-нибудь...',
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextareaComponent
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
    placeholder: 'Введите что-нибудь...',
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextareaComponent
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
    placeholder: 'Введите что-нибудь...',
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextareaComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithMaxLength: Story = {
  args: {
    placeholder: 'Максимум 100 символов',
    maxlength: 100,
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div class="space-y-2">
        <TextareaComponent
          v-bind="args"
          v-model="value"
        />
        <div class="text-sm text-gray-600">
          Символов: {{ value.length }} / {{ args.maxlength }}
        </div>
      </div>
    `,
  }),
}

export const WithMinLength: Story = {
  args: {
    placeholder: 'Минимум 10 символов',
    minlength: 10,
    required: true,
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextareaComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const Readonly: Story = {
  args: {
    readonly: true,
    modelValue: 'Этот текст доступен только для чтения.',
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      return { args }
    },
    template: `
      <TextareaComponent
        v-bind="args"
      />
    `,
  }),
}

export const Required: Story = {
  args: {
    required: true,
    placeholder: 'Обязательное поле',
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <form @submit.prevent>
        <TextareaComponent
          v-bind="args"
          v-model="value"
        />
        <button
          type="submit"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Отправить
        </button>
      </form>
    `,
  }),
}

export const LongText: Story = {
  args: {
    rows: 6,
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('Это пример длинного текста, который занимает несколько строк в компоненте Textarea. Вы можете использовать этот компонент для ввода многострочного текста, такого как комментарии, описания или другие текстовые данные.')
      return { args, value }
    },
    template: `
      <TextareaComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const InContext: Story = {
  args: {
    placeholder: 'Введите ваше сообщение...',
    rows: 4,
  },
  render: (args) => ({
    components: { TextareaComponent },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div class="max-w-md space-y-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">Textarea</h1>
          <p class="text-gray-600">
            Компонент для ввода многострочного текста. Поддерживает автоматическое изменение размера, ограничение длины и различные стили.
          </p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Ваше сообщение</label>
          <TextareaComponent
            v-bind="args"
            v-model="value"
          />
        </div>
        <div class="text-sm text-gray-600">
          Длина: {{ value.length }} символов
        </div>
      </div>
    `,
  }),
}
