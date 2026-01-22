import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ButtonComponent from '../../components/buttons/ButtonComponent.vue'
import { commonMeta } from '../meta'

const meta: Meta<typeof ButtonComponent> = {
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
  } as any,
  args: {
    label: 'Button',
  } as any,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
