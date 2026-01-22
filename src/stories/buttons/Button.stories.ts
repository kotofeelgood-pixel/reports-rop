import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ButtonComponent from '../../components/buttons/ButtonComponent.vue'
import { commonMeta } from '../meta'

const meta = {
  ...commonMeta,
  title: 'Element/Button',
  component: ButtonComponent,
  argTypes: {
    label: { control: 'text'},
    size: {
      control: 'select',
      options: ['xs', 'md', 'xss', 'sm', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: [
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-copilot',
        'air-secondary',
        'air-secondary-alert',
        'air-secondary-accent',
        'air-secondary-accent-1',
        'air-secondary-accent-2',
        'air-secondary-no-accent',
        'air-tertiary',
        'air-tertiary-accent',
        'air-tertiary-no-accent',
        'air-selection',
        'air-boost',
        'link',
      ],
    },
    useDropdown: { control: 'boolean' },
    active: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    rounded: { control: 'boolean' },
    block: { control: 'boolean' },
    useClock: { control: 'boolean' },
    useWait: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
  args: {
    label: 'Button',
  },
} satisfies Meta<typeof ButtonComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    color: 'air-primary-success',
    size: 'md',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    color: 'air-secondary',
  },
}

export const Large: Story = {
  args: {
    label: 'Large Button',
    size: 'lg',
  },
}

export const Small: Story = {
  args: {
    label: 'Small Button',
    size: 'sm',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
}

export const Loading: Story = {
  args: {
    label: 'Loading Button',
    loading: true,
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Button with Icon',
    color: 'air-primary',
  },
}

export const Rounded: Story = {
  args: {
    label: 'Rounded Button',
    rounded: true,
    color: 'air-primary',
  },
}

export const Block: Story = {
  args: {
    label: 'Block Button',
    block: true,
    color: 'air-primary',
  },
