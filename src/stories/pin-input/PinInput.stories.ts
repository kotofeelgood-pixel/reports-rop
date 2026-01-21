import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PinInputComponent from '../../components/pin-input/PinInputComponent.vue'
import type { PinInputModel, PinInputColor, PinInputSize, PinInputType } from '../../components/pin-input/model'
import { ref } from 'vue'

const meta = {
  title: 'UI/PinInput',
  component: PinInputComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-warning',
        'air-primary-copilot',
      ] as PinInputColor[],
    },
    size: {
      control: 'select',
      options: ['xss', 'xs', 'sm', 'md', 'lg', 'xl'] as PinInputSize[],
    },
    type: {
      control: 'select',
      options: ['text', 'number'] as PinInputType[],
    },
    length: { control: 'number' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    mask: { control: 'boolean' },
    otp: { control: 'boolean' },
    highlight: { control: 'boolean' },
    noBorder: { control: 'boolean' },
    underline: { control: 'boolean' },
    rounded: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    color: 'air-primary',
    size: 'md',
    type: 'text',
    length: 5,
    placeholder: '○',
  } as Partial<PinInputModel>,
} as Meta<typeof PinInputComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<PinInputModel>
}

export const Default: Story = {
  render: (args) => ({
    components: { PinInputComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <PinInputComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: ['1', '2', '3', '4', '5'],
  },
  render: (args) => ({
    components: { PinInputComponent },
    setup() {
      return { args }
    },
    template: `
      <PinInputComponent
        v-bind="args"
      />
    `,
  }),
}

export const WithType: Story = {
  args: {
    type: 'number',
  },
  render: (args) => ({
    components: { PinInputComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <PinInputComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithMask: Story = {
  args: {
    mask: true,
    defaultValue: ['1', '2', '3', '4', '5'],
  },
  render: (args) => ({
    components: { PinInputComponent },
    setup() {
      return { args }
    },
    template: `
      <PinInputComponent
        v-bind="args"
      />
    `,
  }),
}

export const WithOTP: Story = {
  args: {
    otp: true,
    length: 6,
  },
  render: (args) => ({
    components: { PinInputComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <div class="space-y-2">
        <PinInputComponent
          v-bind="args"
          v-model="value"
        />
        <p class="text-sm text-gray-600">
          На мобильных устройствах OTP код будет автоматически определен из SMS или буфера обмена.
        </p>
      </div>
    `,
  }),
}

export const WithLength: Story = {
  args: {
    length: 6,
  },
  render: (args) => ({
    components: { PinInputComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <PinInputComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: '○',
  },
  render: (args) => ({
    components: { PinInputComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <PinInputComponent
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
    placeholder: '○',
  },
  render: (args) => ({
    components: { PinInputComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <PinInputComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithSize: Story = {
  args: {
    size: 'xl',
    placeholder: '○',
  },
  render: (args) => ({
    components: { PinInputComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <PinInputComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { PinInputComponent },
    setup() {
      const values = {
        xss: ref<string[]>([]),
        xs: ref<string[]>([]),
        sm: ref<string[]>([]),
        md: ref<string[]>([]),
        lg: ref<string[]>([]),
        xl: ref<string[]>([]),
      }
      return { values }
    },
    template: `
      <div class="space-y-6">
        <div>
          <div class="mb-2 text-sm font-medium">Extra Extra Small</div>
          <PinInputComponent
            v-model="values.xss"
            size="xss"
            placeholder="○"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Extra Small</div>
          <PinInputComponent
            v-model="values.xs"
            size="xs"
            placeholder="○"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Small</div>
          <PinInputComponent
            v-model="values.sm"
            size="sm"
            placeholder="○"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Medium</div>
          <PinInputComponent
            v-model="values.md"
            size="md"
            placeholder="○"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Large</div>
          <PinInputComponent
            v-model="values.lg"
            size="lg"
            placeholder="○"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Extra Large</div>
          <PinInputComponent
            v-model="values.xl"
            size="xl"
            placeholder="○"
          />
        </div>
      </div>
    `,
  }),
}

export const AllColors: Story = {
  render: () => ({
    components: { PinInputComponent },
    setup() {
      const values = {
        primary: ref<string[]>([]),
        success: ref<string[]>([]),
        alert: ref<string[]>([]),
        warning: ref<string[]>([]),
        copilot: ref<string[]>([]),
      }
      return { values }
    },
    template: `
      <div class="space-y-6">
        <div>
          <div class="mb-2 text-sm font-medium">Primary</div>
          <PinInputComponent
            v-model="values.primary"
            color="air-primary"
            highlight
            placeholder="○"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Success</div>
          <PinInputComponent
            v-model="values.success"
            color="air-primary-success"
            highlight
            placeholder="○"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Alert</div>
          <PinInputComponent
            v-model="values.alert"
            color="air-primary-alert"
            highlight
            placeholder="○"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Warning</div>
          <PinInputComponent
            v-model="values.warning"
            color="air-primary-warning"
            highlight
            placeholder="○"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Copilot</div>
          <PinInputComponent
            v-model="values.copilot"
            color="air-primary-copilot"
            highlight
            placeholder="○"
          />
        </div>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '○',
  },
  render: (args) => ({
    components: { PinInputComponent },
    setup() {
      return { args }
    },
    template: `
      <PinInputComponent
        v-bind="args"
      />
    `,
  }),
}

export const NoBorder: Story = {
  args: {
    noBorder: true,
    highlight: true,
    size: 'xl',
    placeholder: '○',
  },
  render: (args) => ({
    components: { PinInputComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <PinInputComponent
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
    size: 'xl',
    placeholder: '○',
  },
  render: (args) => ({
    components: { PinInputComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <PinInputComponent
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
    size: 'xl',
    placeholder: '○',
  },
  render: (args) => ({
    components: { PinInputComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <PinInputComponent
        v-bind="args"
        v-model="value"
      />
    `,
  }),
}

export const WithCompleteEvent: Story = {
  args: {
    length: 4,
  },
  render: (args) => ({
    components: { PinInputComponent },
    setup() {
      const value = ref<string[]>([])
      const isComplete = ref(false)

      function handleComplete(completeValue: string[]) {
        isComplete.value = true
        console.log('PIN код введен:', completeValue.join(''))
      }

      return { args, value, isComplete, handleComplete }
    },
    template: `
      <div class="space-y-4">
        <PinInputComponent
          v-bind="args"
          v-model="value"
          @complete="handleComplete"
        />
        <div v-if="isComplete" class="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-green-800 font-semibold">PIN код введен полностью!</p>
          <p class="text-sm text-green-600 mt-1">Значение: {{ value.join('') }}</p>
        </div>
      </div>
    `,
  }),
}

export const NumberType: Story = {
  args: {
    type: 'number',
    length: 6,
    placeholder: '0',
  },
  render: (args) => ({
    components: { PinInputComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <div class="space-y-2">
        <PinInputComponent
          v-bind="args"
          v-model="value"
        />
        <p class="text-sm text-gray-600">
          Принимает только цифры
        </p>
      </div>
    `,
  }),
}

export const PasswordMask: Story = {
  args: {
    mask: true,
    length: 4,
    placeholder: '●',
  },
  render: (args) => ({
    components: { PinInputComponent },
    setup() {
      const value = ref<string[]>([])
      return { args, value }
    },
    template: `
      <div class="space-y-2">
        <PinInputComponent
          v-bind="args"
          v-model="value"
        />
        <p class="text-sm text-gray-600">
          Введенные символы скрыты
        </p>
      </div>
    `,
  }),
}

export const InContext: Story = {
  args: {
    length: 6,
    placeholder: '○',
  },
  render: (args) => ({
    components: { PinInputComponent },
    setup() {
      const pin = ref<string[]>([])
      const isComplete = ref(false)

      function handleComplete(completeValue: string[]) {
        isComplete.value = true
      }

      return { args, pin, isComplete, handleComplete }
    },
    template: `
      <div class="max-w-md space-y-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">PinInput</h1>
          <p class="text-gray-600">
            Компонент для ввода PIN кода. Состоит из нескольких полей ввода для ввода кода посимвольно.
          </p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Введите PIN код</label>
          <PinInputComponent
            v-bind="args"
            v-model="pin"
            @complete="handleComplete"
          />
        </div>
        <div v-if="isComplete" class="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-green-800 font-semibold">PIN код введен!</p>
        </div>
        <div class="text-sm text-gray-600">
          Введено символов: <strong>{{ pin.length }}</strong> / {{ args.length }}
        </div>
      </div>
    `,
  }),
}

export const OTPCode: Story = {
  args: {
    otp: true,
    length: 6,
    type: 'number',
  },
  render: (args) => ({
    components: { PinInputComponent },
    setup() {
      const otpCode = ref<string[]>([])
      const isComplete = ref(false)

      function handleComplete(completeValue: string[]) {
        isComplete.value = true
      }

      return { args, otpCode, isComplete, handleComplete }
    },
    template: `
      <div class="max-w-md space-y-4">
        <div>
          <h2 class="text-xl font-semibold mb-2">Введите код подтверждения</h2>
          <p class="text-sm text-gray-600">
            Код отправлен на ваш номер телефона. На мобильных устройствах код будет определен автоматически.
          </p>
        </div>
        <PinInputComponent
          v-bind="args"
          v-model="otpCode"
          @complete="handleComplete"
        />
        <div v-if="isComplete" class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p class="text-blue-800 font-semibold">Код подтвержден!</p>
          <p class="text-sm text-blue-600 mt-1">Код: {{ otpCode.join('') }}</p>
        </div>
      </div>
    `,
  }),
}
