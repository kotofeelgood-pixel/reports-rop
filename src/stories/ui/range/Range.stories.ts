import type { Meta, StoryObj } from '@storybook/vue3-vite'
import RangeComponent from './RangeComponent.vue'
import type { RangeModel, RangeColor, RangeSize, RangeOrientation } from './model'
import { ref } from 'vue'

const meta = {
  title: 'UI/Range',
  component: RangeComponent,
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
      ] as RangeColor[],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'] as RangeSize[],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'] as RangeOrientation[],
    },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    inverted: { control: 'boolean' },
    tooltip: { control: 'boolean' },
  },
  args: {
    color: 'air-primary',
    size: 'md',
    orientation: 'horizontal',
    min: 0,
    max: 100,
    step: 1,
  } as Partial<RangeModel>,
} as Meta<typeof RangeComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<RangeModel>
}

export const Default: Story = {
  render: (args) => ({
    components: { RangeComponent },
    setup() {
      const value = ref(50)
      return { args, value }
    },
    template: `
      <div class="w-full max-w-md">
        <RangeComponent
          v-bind="args"
          v-model="value"
        />
        <div class="mt-4 text-sm text-gray-600">
          Значение: {{ value }}
        </div>
      </div>
    `,
  }),
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 50,
  },
  render: (args) => ({
    components: { RangeComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="w-full max-w-md">
        <RangeComponent
          v-bind="args"
        />
      </div>
    `,
  }),
}

export const WithMinMax: Story = {
  args: {
    min: 0,
    max: 50,
    defaultValue: 25,
  },
  render: (args) => ({
    components: { RangeComponent },
    setup() {
      const value = ref(25)
      return { args, value }
    },
    template: `
      <div class="w-full max-w-md">
        <RangeComponent
          v-bind="args"
          v-model="value"
        />
        <div class="mt-4 text-sm text-gray-600">
          Значение: {{ value }} (мин: {{ args.min }}, макс: {{ args.max }})
        </div>
      </div>
    `,
  }),
}

export const WithStep: Story = {
  args: {
    step: 10,
    defaultValue: 50,
  },
  render: (args) => ({
    components: { RangeComponent },
    setup() {
      const value = ref(50)
      return { args, value }
    },
    template: `
      <div class="w-full max-w-md">
        <RangeComponent
          v-bind="args"
          v-model="value"
        />
        <div class="mt-4 text-sm text-gray-600">
          Значение: {{ value }} (шаг: {{ args.step }})
        </div>
      </div>
    `,
  }),
}

export const Multiple: Story = {
  render: (args) => ({
    components: { RangeComponent },
    setup() {
      const value = ref([25, 75])
      return { args, value }
    },
    template: `
      <div class="w-full max-w-md">
        <RangeComponent
          v-bind="args"
          v-model="value"
        />
        <div class="mt-4 text-sm text-gray-600">
          Значение: {{ value[0] }} - {{ value[1] }}
        </div>
      </div>
    `,
  }),
}

export const MultipleWithMinSteps: Story = {
  args: {
    minStepsBetweenThumbs: 10,
  },
  render: (args) => ({
    components: { RangeComponent },
    setup() {
      const value = ref([25, 50, 75])
      return { args, value }
    },
    template: `
      <div class="w-full max-w-md">
        <RangeComponent
          v-bind="args"
          v-model="value"
        />
        <div class="mt-4 text-sm text-gray-600">
          Значения: {{ value.join(', ') }}
        </div>
      </div>
    `,
  }),
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => ({
    components: { RangeComponent },
    setup() {
      const value = ref(50)
      return { args, value }
    },
    template: `
      <div class="h-48">
        <RangeComponent
          v-bind="args"
          v-model="value"
        />
      </div>
      <div class="mt-4 text-sm text-gray-600">
        Значение: {{ value }}
      </div>
    `,
  }),
}

export const WithColor: Story = {
  args: {
    color: 'air-primary-copilot',
    defaultValue: 50,
  },
  render: (args) => ({
    components: { RangeComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="w-full max-w-md">
        <RangeComponent
          v-bind="args"
        />
      </div>
    `,
  }),
}

export const WithSize: Story = {
  args: {
    size: 'lg',
    defaultValue: 50,
  },
  render: (args) => ({
    components: { RangeComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="w-full max-w-md">
        <RangeComponent
          v-bind="args"
        />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { RangeComponent },
    setup() {
      const values = {
        xs: ref(50),
        sm: ref(50),
        md: ref(50),
        lg: ref(50),
      }
      return { values }
    },
    template: `
      <div class="space-y-6 w-full max-w-md">
        <div>
          <div class="mb-2 text-sm font-medium">Extra Small</div>
          <RangeComponent
            v-model="values.xs"
            size="xs"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Small</div>
          <RangeComponent
            v-model="values.sm"
            size="sm"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Medium</div>
          <RangeComponent
            v-model="values.md"
            size="md"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Large</div>
          <RangeComponent
            v-model="values.lg"
            size="lg"
          />
        </div>
      </div>
    `,
  }),
}

export const AllColors: Story = {
  render: () => ({
    components: { RangeComponent },
    setup() {
      const values = {
        primary: ref(50),
        success: ref(50),
        alert: ref(50),
        warning: ref(50),
        copilot: ref(50),
      }
      return { values }
    },
    template: `
      <div class="space-y-6 w-full max-w-md">
        <div>
          <div class="mb-2 text-sm font-medium">Primary</div>
          <RangeComponent
            v-model="values.primary"
            color="air-primary"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Success</div>
          <RangeComponent
            v-model="values.success"
            color="air-primary-success"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Alert</div>
          <RangeComponent
            v-model="values.alert"
            color="air-primary-alert"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Warning</div>
          <RangeComponent
            v-model="values.warning"
            color="air-primary-warning"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Copilot</div>
          <RangeComponent
            v-model="values.copilot"
            color="air-primary-copilot"
          />
        </div>
      </div>
    `,
  }),
}

export const WithTooltip: Story = {
  args: {
    tooltip: true,
    defaultValue: 50,
  },
  render: (args) => ({
    components: { RangeComponent },
    setup() {
      const value = ref(50)
      return { args, value }
    },
    template: `
      <div class="w-full max-w-md">
        <RangeComponent
          v-bind="args"
          v-model="value"
        />
      </div>
    `,
  }),
}

export const WithCustomTooltip: Story = {
  args: {
    tooltip: {
      disableClosingTrigger: true,
    },
    defaultValue: 50,
  },
  render: (args) => ({
    components: { RangeComponent },
    setup() {
      const value = ref(50)
      return { args, value }
    },
    template: `
      <div class="w-full max-w-md">
        <RangeComponent
          v-bind="args"
          v-model="value"
        />
      </div>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 50,
  },
  render: (args) => ({
    components: { RangeComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="w-full max-w-md">
        <RangeComponent
          v-bind="args"
        />
      </div>
    `,
  }),
}

export const Inverted: Story = {
  args: {
    inverted: true,
    defaultValue: 25,
  },
  render: (args) => ({
    components: { RangeComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="w-full max-w-md">
        <RangeComponent
          v-bind="args"
        />
      </div>
    `,
  }),
}

export const VolumeControl: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
  },
  render: (args) => ({
    components: { RangeComponent },
    setup() {
      const volume = ref(50)
      return { args, volume }
    },
    template: `
      <div class="w-full max-w-md space-y-4">
        <div>
          <div class="mb-2 flex items-center justify-between">
            <span class="text-sm font-medium">Громкость</span>
            <span class="text-sm text-gray-600">{{ volume }}%</span>
          </div>
          <RangeComponent
            v-bind="args"
            v-model="volume"
          />
        </div>
      </div>
    `,
  }),
}

export const PriceRange: Story = {
  args: {
    min: 0,
    max: 1000,
    step: 10,
  },
  render: (args) => ({
    components: { RangeComponent },
    setup() {
      const priceRange = ref([200, 800])
      return { args, priceRange }
    },
    template: `
      <div class="w-full max-w-md space-y-4">
        <div>
          <div class="mb-2 flex items-center justify-between">
            <span class="text-sm font-medium">Диапазон цен</span>
            <span class="text-sm text-gray-600">{{ '$' + priceRange[0] }} - {{ '$' + priceRange[1] }}</span>
          </div>
          <RangeComponent
            v-bind="args"
            v-model="priceRange"
          />
        </div>
      </div>
    `,
  }),
}

export const InContext: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
  },
  render: (args) => ({
    components: { RangeComponent },
    setup() {
      const value = ref(50)
      return { args, value }
    },
    template: `
      <div class="max-w-md space-y-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">Range</h1>
          <p class="text-gray-600">
            Компонент для выбора числового значения в указанном диапазоне. Поддерживает одиночные и множественные значения.
          </p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Уровень прогресса</label>
          <RangeComponent
            v-bind="args"
            v-model="value"
          />
          <div class="text-sm text-gray-600">
            Текущее значение: <strong>{{ value }}%</strong>
          </div>
        </div>
      </div>
    `,
  }),
}
