import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CheckboxGroupComponent from '../../../components/inputs/CheckboxGroup/CheckboxGroupComponent.vue'
const meta = {
  title: 'Form/CheckboxGroup',
  component: CheckboxGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    valueKey: { control: 'text' },
    labelKey: { control: 'text' },
    descriptionKey: { control: 'text' },
    items: { control: 'object' },
    modelValue: { control: 'object' },
    defaultValue: { control: 'object' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['card', 'list', 'table'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
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
      ],
    },
    indicator: {
      control: 'select',
      options: ['start', 'end', 'hidden'],
    },
  },
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    size: 'md',
    variant: 'list',
    orientation: 'vertical',
    color: 'air-primary',
    indicator: 'start',
  },
} as Meta<typeof CheckboxGroupComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const WithDescriptions: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1', description: 'Описание первой опции' },
      { value: 'option2', label: 'Опция 2', description: 'Описание второй опции' },
      { value: 'option3', label: 'Опция 3', description: 'Описание третьей опции' },
    ],
  },
}

export const WithSelectedValues: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    modelValue: ['option1', 'option3'],
  },
}

export const CardVariant: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1', description: 'Описание первой опции' },
      { value: 'option2', label: 'Опция 2', description: 'Описание второй опции' },
      { value: 'option3', label: 'Опция 3', description: 'Описание третьей опции' },
    ],
    variant: 'card',
  },
}

export const TableVariant: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1', description: 'Описание первой опции' },
      { value: 'option2', label: 'Опция 2', description: 'Описание второй опции' },
      { value: 'option3', label: 'Опция 3', description: 'Описание третьей опции' },
    ],
    variant: 'table',
  },
}

export const Horizontal: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    orientation: 'horizontal',
  },
}

export const Vertical: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    orientation: 'vertical',
  },
}

export const Disabled: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    disabled: true,
  },
}

export const WithDisabledItems: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2', disabled: true },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const Required: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    required: true,
  },
}

export const Small: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    size: 'xs',
  },
}

export const Large: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    size: 'lg',
  },
}

export const IndicatorEnd: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    indicator: 'end',
  },
}

export const IndicatorHidden: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    indicator: 'hidden',
  },
}

export const PrimarySuccess: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    color: 'air-primary-success',
  },
}

export const PrimaryAlert: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    color: 'air-primary-alert',
  },
}

export const PrimaryWarning: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    color: 'air-primary-warning',
  },
}

export const PrimaryCopilot: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    color: 'air-primary-copilot',
  },
}

export const WithCustomKeys: Story = {
  args: {
    items: [
      { id: 1, title: 'Опция 1', desc: 'Описание первой опции' },
      { id: 2, title: 'Опция 2', desc: 'Описание второй опции' },
      { id: 3, title: 'Опция 3', desc: 'Описание третьей опции' },
    ],
    valueKey: 'id',
    labelKey: 'title',
    descriptionKey: 'desc',
    modelValue: [1, 3],
  },
}

export const WithLoop: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    loop: true,
  },
}

export const WithLabelSlot: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
  render: (args) => ({
    components: { CheckboxGroupComponent },
    setup() {
      return { args }
    },
    template: `
      <CheckboxGroupComponent v-bind="args">
        <template #label="{ label }">
          <strong>Кастомный лейбл:</strong> {{ label }}
        </template>
      </CheckboxGroupComponent>
    `,
  }),
}

export const WithDescriptionSlot: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1', description: 'Описание первой опции' },
      { value: 'option2', label: 'Опция 2', description: 'Описание второй опции' },
      { value: 'option3', label: 'Опция 3', description: 'Описание третьей опции' },
    ],
  },
  render: (args) => ({
    components: { CheckboxGroupComponent },
    setup() {
      return { args }
    },
    template: `
      <CheckboxGroupComponent v-bind="args">
        <template #description="{ description }">
          <em>Кастомное описание:</em> {{ description }}
        </template>
      </CheckboxGroupComponent>
    `,
  }),
}

export const WithBothSlots: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Опция 1', description: 'Описание первой опции' },
      { value: 'option2', label: 'Опция 2', description: 'Описание второй опции' },
      { value: 'option3', label: 'Опция 3', description: 'Описание третьей опции' },
    ],
  },
  render: (args) => ({
    components: { CheckboxGroupComponent },
    setup() {
      return { args }
    },
    template: `
      <CheckboxGroupComponent v-bind="args">
        <template #label="{ label }">
          <strong>{{ label }}</strong>
        </template>
        <template #description="{ description }">
          <em>{{ description }}</em>
        </template>
      </CheckboxGroupComponent>
    `,
  }),
