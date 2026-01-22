import type { Meta, StoryObj } from '@storybook/vue3-vite'
import InputMenuComponent from '../../../components/inputs/InputMenu/InputMenuComponent.vue'
const meta = {
  title: 'Form/InputMenu',
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
      ],
    },
    size: {
      control: 'select',
      options: ['xss', 'xs', 'sm', 'md', 'lg', 'xl'],
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
      ],
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
  },
} as Meta<typeof InputMenuComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

