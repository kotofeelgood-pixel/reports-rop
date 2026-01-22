import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ColorModeSwitchComponent from '../../components/color-mode-switch/ColorModeSwitchComponent.vue'
const meta = {
  title: 'Color Mode/ColorModeSwitch',
  component: ColorModeSwitchComponent,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
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
    autofocus: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    defaultValue: { control: 'boolean' },
    required: { control: 'boolean' },
    id: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    modelValue: { control: 'boolean' },
  },
  args: {
    size: 'md',
    color: 'air-primary',
  },
} as Meta<typeof ColorModeSwitchComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  args: {
    label: 'Темная тема',
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Темная тема',
    description: 'Переключите для использования темной темы',
  },
}

export const SizeXs: Story = {
  args: {
    size: 'xs',
  },
}

export const SizeSm: Story = {
  args: {
    size: 'sm',
  },
}

export const SizeMd: Story = {
  args: {
    size: 'md',
  },
}

export const SizeLg: Story = {
  args: {
    size: 'lg',
  },
}

export const AirPrimary: Story = {
  args: {
    color: 'air-primary',
  },
}

export const AirPrimarySuccess: Story = {
  args: {
    color: 'air-primary-success',
  },
}

export const AirPrimaryAlert: Story = {
  args: {
    color: 'air-primary-alert',
  },
}

export const AirPrimaryWarning: Story = {
  args: {
    color: 'air-primary-warning',
  },
}

export const AirPrimaryCopilot: Story = {
  args: {
    color: 'air-primary-copilot',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: true,
  },
}

export const WithModelValue: Story = {
  args: {
    modelValue: true,
  },
}

export const Required: Story = {
  args: {
    label: 'Темная тема',
    required: true,
  },
}

export const WithId: Story = {
  args: {
    id: 'color-mode-switch',
    label: 'Темная тема',
  },
}

export const WithName: Story = {
  args: {
    name: 'colorMode',
    label: 'Темная тема',
  },
}

export const AllSizes: Story = {
  render: () => ({
    components: { ColorModeSwitchComponent },
    template: `
      <div class="flex flex-col gap-4">
        <ColorModeSwitchComponent size="xs" label="Extra Small" />
        <ColorModeSwitchComponent size="sm" label="Small" />
        <ColorModeSwitchComponent size="md" label="Medium" />
        <ColorModeSwitchComponent size="lg" label="Large" />
      </div>
    `,
  }),
}

export const AllColors: Story = {
  render: () => ({
    components: { ColorModeSwitchComponent },
    template: `
      <div class="flex flex-col gap-4">
        <ColorModeSwitchComponent color="air-primary" label="Primary" />
        <ColorModeSwitchComponent color="air-primary-success" label="Success" />
        <ColorModeSwitchComponent color="air-primary-alert" label="Alert" />
        <ColorModeSwitchComponent color="air-primary-warning" label="Warning" />
        <ColorModeSwitchComponent color="air-primary-copilot" label="Copilot" />
      </div>
    `,
  }),
}

export const WithFullFeatures: Story = {
  args: {
    label: 'Темная тема',
    description: 'Переключите для использования темной темы',
    size: 'md',
    color: 'air-primary',
    required: true,
    id: 'color-mode',
    name: 'colorMode',
  },
