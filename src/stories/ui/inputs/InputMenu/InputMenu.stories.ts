import type { Meta, StoryObj } from '@storybook/vue3-vite'
import InputMenuComponent from './InputMenuComponent.vue'
import type { InputSize, InputColor, TagColor, InputMenuModel } from './model'

const meta = {
  title: 'UI/Inputs/InputMenu',
  component: InputMenuComponent,
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
    required: { control: 'boolean' },
    autofocus: { control: 'boolean' },
    autofocusDelay: { control: 'number' },
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
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
    valueKey: { control: 'text' },
    labelKey: { control: 'text' },
    descriptionKey: { control: 'text' },
    items: { control: 'object' },
    modelValue: { control: 'text' },
    defaultValue: { control: 'text' },
    filterFields: { control: 'object' },
    ignoreFilter: { control: 'boolean' },
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    name: { control: 'text' },
    resetSearchTermOnBlur: { control: 'boolean' },
    resetSearchTermOnSelect: { control: 'boolean' },
    highlightOnHover: { control: 'boolean' },
    openOnClick: { control: 'boolean' },
    openOnFocus: { control: 'boolean' },
    loading: { control: 'boolean' },
    trailing: { control: 'boolean' },
    autocomplete: { control: 'text' },
    list: { control: 'text' },
    readonly: { control: 'boolean' },
    searchTerm: { control: 'text' },
  } as Record<string, unknown>,
  args: {
    placeholder: 'Выберите опцию',
    color: 'air-primary',
    size: 'md',
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  } as Partial<InputMenuModel>,
} as Meta<typeof InputMenuComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<InputMenuModel>
}

export const Default: Story = {
  args: {
    placeholder: 'Выберите опцию',
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const WithDescriptions: Story = {
  args: {
    placeholder: 'Выберите опцию',
    items: [
      { value: 'option1', label: 'Опция 1', description: 'Описание первой опции' },
      { value: 'option2', label: 'Опция 2', description: 'Описание второй опции' },
      { value: 'option3', label: 'Опция 3', description: 'Описание третьей опции' },
    ],
  },
}

export const Multiple: Story = {
  args: {
    placeholder: 'Выберите опции',
    multiple: true,
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
      { value: 'option4', label: 'Опция 4' },
    ],
  },
}

export const WithSelectedValue: Story = {
  args: {
    placeholder: 'Выберите опцию',
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    modelValue: 'option2',
  },
}

export const WithSelectedValues: Story = {
  args: {
    placeholder: 'Выберите опции',
    multiple: true,
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
      { value: 'option4', label: 'Опция 4' },
    ],
    modelValue: ['option1', 'option3'],
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Отключенное меню',
    disabled: true,
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const WithDisabledItems: Story = {
  args: {
    placeholder: 'Выберите опцию',
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2', disabled: true },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const Required: Story = {
  args: {
    placeholder: 'Обязательное поле',
    required: true,
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const Small: Story = {
  args: {
    placeholder: 'Маленькое меню',
    size: 'xs',
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const Large: Story = {
  args: {
    placeholder: 'Большое меню',
    size: 'lg',
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const NoBorder: Story = {
  args: {
    placeholder: 'Без рамки',
    noBorder: true,
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const Underline: Story = {
  args: {
    placeholder: 'С подчеркиванием',
    underline: true,
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const Rounded: Story = {
  args: {
    placeholder: 'С закругленными углами',
    rounded: true,
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const PrimarySuccess: Story = {
  args: {
    placeholder: 'Цвет success',
    color: 'air-primary-success',
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const PrimaryAlert: Story = {
  args: {
    placeholder: 'Цвет alert',
    color: 'air-primary-alert',
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const PrimaryWarning: Story = {
  args: {
    placeholder: 'Цвет warning',
    color: 'air-primary-warning',
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const PrimaryCopilot: Story = {
  args: {
    placeholder: 'Цвет copilot',
    color: 'air-primary-copilot',
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const WithTags: Story = {
  args: {
    placeholder: 'С тегами',
    multiple: true,
    tag: 'Тег',
    tagColor: 'air-primary-success',
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    modelValue: ['option1', 'option2'],
  },
}

export const Highlight: Story = {
  args: {
    placeholder: 'С подсветкой',
    highlight: true,
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const WithCustomKeys: Story = {
  args: {
    placeholder: 'С кастомными ключами',
    items: [
      { id: 1, title: 'Опция 1', desc: 'Описание первой опции' },
      { id: 2, title: 'Опция 2', desc: 'Описание второй опции' },
      { id: 3, title: 'Опция 3', desc: 'Описание третьей опции' },
    ],
    valueKey: 'id',
    labelKey: 'title',
    descriptionKey: 'desc',
    modelValue: 2,
  },
}

export const OpenOnFocus: Story = {
  args: {
    placeholder: 'Открывается при фокусе',
    openOnFocus: true,
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const OpenOnClick: Story = {
  args: {
    placeholder: 'Открывается при клике',
    openOnClick: true,
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const WithGroups: Story = {
  args: {
    placeholder: 'С группами',
    items: [
      [
        { value: 'option1', label: 'Опция 1' },
        { value: 'option2', label: 'Опция 2' },
      ],
      [
        { value: 'option3', label: 'Опция 3' },
        { value: 'option4', label: 'Опция 4' },
      ],
    ],
  },
}

export const Loading: Story = {
  args: {
    placeholder: 'Загрузка...',
    loading: true,
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
}

export const Readonly: Story = {
  args: {
    placeholder: 'Только для чтения',
    readonly: true,
    items: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
    modelValue: 'option2',
  },
}

