import type { Meta, StoryObj } from '@storybook/vue3-vite'
import InputComponent from '../../components/inputs/InputComponent.vue'
import type { InputSize, InputColor, InputType, TagColor } from '../../components/inputs/Input/model'

const meta = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  title: 'Form/Input',
  component: InputComponent,
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    type: {
      control: 'select',
      options: [
        'number',
        'image',
        'text',
        'button',
        'search',
        'time',
        'color',
        'checkbox',
        'date',
        'datetime-local',
        'email',
        'file',
        'hidden',
        'month',
        'password',
        'radio',
        'range',
        'reset',
        'submit',
        'tel',
        'url',
        'week',
      ] as InputType[],
    },
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
    noPadding: { control: 'boolean' },
    noBorder: { control: 'boolean' },
    underline: { control: 'boolean' },
    rounded: { control: 'boolean' },
    required: { control: 'boolean' },
    autocomplete: { control: 'text' },
    autofocus: { control: 'boolean' },
    autofocusDelay: { control: 'number' },
    disabled: { control: 'boolean' },
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
    modelValue: { control: 'text' },
    defaultValue: { control: 'text' },
    loading: { control: 'boolean' },
    trailing: { control: 'boolean' },
    readonly: { control: 'boolean' },
    max: { control: 'text' },
    maxlength: { control: 'number' },
    min: { control: 'text' },
    minlength: { control: 'number' },
    pattern: { control: 'text' },
    step: { control: 'text' },
    list: { control: 'text' },
  },
  args: {
    placeholder: 'Введите текст',
    type: 'text',
    color: 'air-primary',
    size: 'md',
  },
} as Meta<typeof InputComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Введите текст',
  },
}

export const WithValue: Story = {
  args: {
    placeholder: 'Введите текст',
    modelValue: 'Пример текста',
  },
}

export const Large: Story = {
  args: {
    placeholder: 'Большой инпут',
    size: 'lg',
  },
}

export const Small: Story = {
  args: {
    placeholder: 'Маленький инпут',
    size: 'sm',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Отключенный инпут',
    disabled: true,
    modelValue: 'Нельзя изменить',
  },
}

export const Required: Story = {
  args: {
    placeholder: 'Обязательное поле',
    required: true,
  },
}

export const Rounded: Story = {
  args: {
    placeholder: 'Инпут с закругленными углами',
    rounded: true,
  },
}

export const Underline: Story = {
  args: {
    placeholder: 'Инпут с подчеркиванием',
    underline: true,
  },
}

export const NoBorder: Story = {
  args: {
    placeholder: 'Инпут без рамки',
    noBorder: true,
  },
}

export const WithTag: Story = {
  args: {
    placeholder: 'Инпут с тегом',
    tag: 'Тег',
    tagColor: 'air-primary-success',
  },
}

export const Loading: Story = {
  args: {
    placeholder: 'Загрузка...',
    loading: true,
  },
}

export const Highlight: Story = {
  args: {
    placeholder: 'Подсвеченный инпут',
    highlight: true,
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Введите пароль',
  },
}

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Поиск...',
  },
}

export const File: Story = {
  args: {
    type: 'file',
  },
}
