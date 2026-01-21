import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CheckboxComponent from './CheckboxComponent.vue'
import type { CheckboxSize, CheckboxColor, CheckboxVariant, CheckboxIndicator } from './model'

const meta = {
  title: 'UI/Inputs/Checkbox',
  component: CheckboxComponent,
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
      ] as CheckboxColor[],
    },
    variant: {
      control: 'select',
      options: ['card', 'list'] as CheckboxVariant[],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'] as CheckboxSize[],
    },
    indicator: {
      control: 'select',
      options: ['start', 'end', 'hidden'] as CheckboxIndicator[],
    },
    disabled: { control: 'boolean' },
    name: { control: 'text' },
    required: { control: 'boolean' },
    id: { control: 'text' },
    defaultValue: {
      control: 'select',
      options: [true, false, 'indeterminate'],
    },
    value: { control: 'text' },
    autofocus: {
      control: 'select',
      options: [false, true, 'true', 'false'],
    },
    modelValue: {
      control: 'select',
      options: [true, false, 'indeterminate', undefined],
    },
  },
  args: {
    label: 'Checkbox',
    color: 'air-primary',
    variant: 'list',
    size: 'md',
    indicator: 'start',
  },
} as Meta<typeof CheckboxComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Checkbox',
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Checkbox с описанием',
    description: 'Это описание чекбокса',
  },
}

export const Checked: Story = {
  args: {
    label: 'Отмеченный чекбокс',
    modelValue: true,
  },
}

export const Indeterminate: Story = {
  args: {
    label: 'Неопределенный чекбокс',
    modelValue: 'indeterminate',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Отключенный чекбокс',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    label: 'Отключенный отмеченный чекбокс',
    disabled: true,
    modelValue: true,
  },
}

export const Required: Story = {
  args: {
    label: 'Обязательный чекбокс',
    required: true,
  },
}

export const CardVariant: Story = {
  args: {
    label: 'Чекбокс в варианте card',
    variant: 'card',
  },
}

export const ListVariant: Story = {
  args: {
    label: 'Чекбокс в варианте list',
    variant: 'list',
  },
}

export const IndicatorEnd: Story = {
  args: {
    label: 'Индикатор справа',
    indicator: 'end',
  },
}

export const IndicatorHidden: Story = {
  args: {
    label: 'Скрытый индикатор',
    indicator: 'hidden',
  },
}

export const Small: Story = {
  args: {
    label: 'Маленький чекбокс',
    size: 'xs',
  },
}

export const Large: Story = {
  args: {
    label: 'Большой чекбокс',
    size: 'lg',
  },
}

export const PrimarySuccess: Story = {
  args: {
    label: 'Чекбокс с цветом success',
    color: 'air-primary-success',
  },
}

export const PrimaryAlert: Story = {
  args: {
    label: 'Чекбокс с цветом alert',
    color: 'air-primary-alert',
  },
}

export const PrimaryWarning: Story = {
  args: {
    label: 'Чекбокс с цветом warning',
    color: 'air-primary-warning',
  },
}

export const PrimaryCopilot: Story = {
  args: {
    label: 'Чекбокс с цветом copilot',
    color: 'air-primary-copilot',
  },
}

export const WithLabelSlot: Story = {
  args: {},
  render: (args) => ({
    components: { CheckboxComponent },
    setup() {
      return { args }
    },
    template: `
      <CheckboxComponent v-bind="args">
        <template #label="{ label }">
          <strong>Кастомный лейбл:</strong> {{ label || 'Чекбокс' }}
        </template>
      </CheckboxComponent>
    `,
  }),
}

export const WithDescriptionSlot: Story = {
  args: {},
  render: (args) => ({
    components: { CheckboxComponent },
    setup() {
      return { args }
    },
    template: `
      <CheckboxComponent v-bind="args">
        <template #description="{ description }">
          <em>Кастомное описание:</em> {{ description || 'Описание чекбокса' }}
        </template>
      </CheckboxComponent>
    `,
  }),
}

export const WithBothSlots: Story = {
  args: {},
  render: (args) => ({
    components: { CheckboxComponent },
    setup() {
      return { args }
    },
    template: `
      <CheckboxComponent v-bind="args">
        <template #label="{ label }">
          <strong>{{ label || 'Чекбокс' }}</strong>
        </template>
        <template #description="{ description }">
          <em>{{ description || 'Описание чекбокса' }}</em>
        </template>
      </CheckboxComponent>
    `,
  }),
}
