import type { Meta, StoryObj } from '@storybook/vue3-vite'
import InputNumberComponent from '../../../../components/inputs/InputNumber/InputNumberComponent.vue'
import type { InputSize, InputColor, TagColor, InputNumberOrientation } from '../../../components/inputs/InputNumber/model'

const meta = {
  title: 'UI/Inputs/InputNumber',
  component: InputNumberComponent,
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
      ] as InputColor[],
    },
    size: {
      control: 'select',
      options: ['xss', 'xs', 'sm', 'md', 'lg', 'xl'] as InputSize[],
    },
    noBorder: { control: 'boolean' },
    underline: { control: 'boolean' },
    rounded: { control: 'boolean' },
    tag: { control: 'text' },
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
      ] as TagColor[],
    },
    highlight: { control: 'boolean' },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'] as InputNumberOrientation[],
    },
    increment: { control: 'boolean' },
    incrementDisabled: { control: 'boolean' },
    decrement: { control: 'boolean' },
    decrementDisabled: { control: 'boolean' },
    autofocus: { control: 'boolean' },
    autofocusDelay: { control: 'number' },
    modelValue: { control: 'number' },
    defaultValue: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    stepSnapping: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    id: { control: 'text' },
    name: { control: 'text' },
    disableWheelChange: { control: 'boolean' },
    invertWheelChange: { control: 'boolean' },
    readonly: { control: 'boolean' },
    autocomplete: { control: 'text' },
    list: { control: 'text' },
  },
  args: {
    placeholder: 'Введите число',
    color: 'air-primary',
    size: 'md',
    orientation: 'horizontal',
  },
} as Meta<typeof InputNumberComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Введите число',
  },
}

export const WithValue: Story = {
  args: {
    placeholder: 'Введите число',
    modelValue: 42,
  },
}

export const WithMinMax: Story = {
  args: {
    placeholder: 'От 0 до 100',
    min: 0,
    max: 100,
    modelValue: 50,
  },
}

export const WithStep: Story = {
  args: {
    placeholder: 'Шаг 5',
    step: 5,
    modelValue: 10,
  },
}

export const WithoutStepSnapping: Story = {
  args: {
    placeholder: 'Без привязки к шагу',
    step: 5,
    stepSnapping: false,
    modelValue: 12,
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Отключенное поле',
    disabled: true,
    modelValue: 42,
  },
}

export const Required: Story = {
  args: {
    placeholder: 'Обязательное поле',
    required: true,
  },
}

export const Readonly: Story = {
  args: {
    placeholder: 'Только для чтения',
    readonly: true,
    modelValue: 42,
  },
}

export const Vertical: Story = {
  args: {
    placeholder: 'Вертикальная ориентация',
    orientation: 'vertical',
    modelValue: 10,
  },
}

export const Horizontal: Story = {
  args: {
    placeholder: 'Горизонтальная ориентация',
    orientation: 'horizontal',
    modelValue: 10,
  },
}

export const WithoutIncrement: Story = {
  args: {
    placeholder: 'Без кнопки увеличения',
    increment: false,
    modelValue: 10,
  },
}

export const WithoutDecrement: Story = {
  args: {
    placeholder: 'Без кнопки уменьшения',
    decrement: false,
    modelValue: 10,
  },
}

export const DisabledIncrement: Story = {
  args: {
    placeholder: 'Кнопка увеличения отключена',
    incrementDisabled: true,
    modelValue: 10,
  },
}

export const DisabledDecrement: Story = {
  args: {
    placeholder: 'Кнопка уменьшения отключена',
    decrementDisabled: true,
    modelValue: 10,
  },
}

export const Small: Story = {
  args: {
    placeholder: 'Маленькое поле',
    size: 'xs',
    modelValue: 10,
  },
}

export const Large: Story = {
  args: {
    placeholder: 'Большое поле',
    size: 'lg',
    modelValue: 10,
  },
}

export const NoBorder: Story = {
  args: {
    placeholder: 'Без рамки',
    noBorder: true,
    modelValue: 10,
  },
}

export const Underline: Story = {
  args: {
    placeholder: 'С подчеркиванием',
    underline: true,
    modelValue: 10,
  },
}

export const Rounded: Story = {
  args: {
    placeholder: 'С закругленными углами',
    rounded: true,
    modelValue: 10,
  },
}

export const PrimarySuccess: Story = {
  args: {
    placeholder: 'Цвет success',
    color: 'air-primary-success',
    modelValue: 10,
  },
}

export const PrimaryAlert: Story = {
  args: {
    placeholder: 'Цвет alert',
    color: 'air-primary-alert',
    modelValue: 10,
  },
}

export const PrimaryWarning: Story = {
  args: {
    placeholder: 'Цвет warning',
    color: 'air-primary-warning',
    modelValue: 10,
  },
}

export const PrimaryCopilot: Story = {
  args: {
    placeholder: 'Цвет copilot',
    color: 'air-primary-copilot',
    modelValue: 10,
  },
}

export const WithTag: Story = {
  args: {
    placeholder: 'С тегом',
    tag: 'Руб.',
    tagColor: 'air-primary-success',
    modelValue: 1000,
  },
}

export const Highlight: Story = {
  args: {
    placeholder: 'С подсветкой',
    highlight: true,
    modelValue: 10,
  },
}

export const DisableWheelChange: Story = {
  args: {
    placeholder: 'Без изменения колесиком',
    disableWheelChange: true,
    modelValue: 10,
  },
}

export const InvertWheelChange: Story = {
  args: {
    placeholder: 'Инвертированное колесико',
    invertWheelChange: true,
    modelValue: 10,
  },
}

export const WithFormatOptions: Story = {
  args: {
    placeholder: 'С форматированием',
    modelValue: 1234.56,
    formatOptions: {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2,
    },
  },
}

export const WithAutofocus: Story = {
  args: {
    placeholder: 'С автофокусом',
    autofocus: true,
  },
}

export const WithAutofocusDelay: Story = {
  args: {
    placeholder: 'С задержкой автофокуса',
    autofocus: true,
    autofocusDelay: 500,
  },
}
