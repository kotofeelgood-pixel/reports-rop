import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BadgeComponent from '../../components/badge/BadgeComponent.vue'
import type { BadgeModel, BadgeColor, BadgeSize } from '../../components/badge/model'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

const meta = {
  title: 'UI/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    color: {
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
      ] as BadgeColor[],
    },
    inverted: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['xss', 'xs', 'sm', 'md', 'lg', 'xl'] as BadgeSize[],
    },
    square: { control: 'boolean' },
    useLink: { control: 'boolean' },
    useClose: { control: 'boolean' },
    icon: { control: 'object' },
    avatar: { control: 'object' },
    trailing: { control: 'boolean' },
    trailingIcon: { control: 'object' },
  },
  args: {
    label: 'Badge',
    color: 'air-primary',
    size: 'md',
    inverted: false,
    square: false,
    useLink: false,
    useClose: false,
  } as Partial<BadgeModel>,
} as Meta<typeof BadgeComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<BadgeModel>
}

export const Default: Story = {
  args: {
    label: 'Badge',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Метка',
  },
}

export const WithSlot: Story = {
  render: (args) => ({
    components: { BadgeComponent },
    setup() {
      return { args }
    },
    template: `
      <BadgeComponent v-bind="args">
        Метка
      </BadgeComponent>
    `,
  }),
}

export const AirPrimary: Story = {
  args: {
    label: 'Badge',
    color: 'air-primary',
  },
}

export const AirPrimarySuccess: Story = {
  args: {
    label: 'Badge',
    color: 'air-primary-success',
  },
}

export const AirPrimaryAlert: Story = {
  args: {
    label: 'Badge',
    color: 'air-primary-alert',
  },
}

export const AirPrimaryWarning: Story = {
  args: {
    label: 'Badge',
    color: 'air-primary-warning',
  },
}

export const AirPrimaryCopilot: Story = {
  args: {
    label: 'Badge',
    color: 'air-primary-copilot',
  },
}

export const AirSecondary: Story = {
  args: {
    label: 'Badge',
    color: 'air-secondary',
  },
}

export const AirSecondaryAlert: Story = {
  args: {
    label: 'Badge',
    color: 'air-secondary-alert',
  },
}

export const AirSecondaryAccent: Story = {
  args: {
    label: 'Badge',
    color: 'air-secondary-accent',
  },
}

export const AirSecondaryAccent1: Story = {
  args: {
    label: 'Badge',
    color: 'air-secondary-accent-1',
  },
}

export const AirSecondaryAccent2: Story = {
  args: {
    label: 'Badge',
    color: 'air-secondary-accent-2',
  },
}

export const AirTertiary: Story = {
  args: {
    label: 'Badge',
    color: 'air-tertiary',
  },
}

export const AirSelection: Story = {
  args: {
    label: 'Badge',
    color: 'air-selection',
  },
}

export const Inverted: Story = {
  args: {
    label: 'Badge',
    color: 'air-primary',
    inverted: true,
  },
}

export const SizeXss: Story = {
  args: {
    label: 'Badge',
    size: 'xss',
  },
}

export const SizeXs: Story = {
  args: {
    label: 'Badge',
    size: 'xs',
  },
}

export const SizeSm: Story = {
  args: {
    label: 'Badge',
    size: 'sm',
  },
}

export const SizeMd: Story = {
  args: {
    label: 'Badge',
    size: 'md',
  },
}

export const SizeLg: Story = {
  args: {
    label: 'Badge',
    size: 'lg',
  },
}

export const SizeXl: Story = {
  args: {
    label: 'Badge',
    size: 'xl',
  },
}

export const Square: Story = {
  args: {
    label: 'Badge',
    square: true,
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Badge',
    icon: RocketIcon,
  },
}

export const WithIconAndClose: Story = {
  args: {
    label: 'Badge',
    icon: RocketIcon,
    useClose: true,
  },
}

export const WithAvatar: Story = {
  args: {
    label: 'Badge',
    avatar: {
      src: '/b24ui/avatar/employee.png',
    },
    size: 'xl',
  },
}

export const WithTrailingIcon: Story = {
  args: {
    label: 'Badge',
    trailing: true,
    trailingIcon: RocketIcon,
  },
}

export const UseLink: Story = {
  args: {
    label: 'Badge',
    useLink: true,
  },
}

export const WithClose: Story = {
  args: {
    label: 'Badge',
    useClose: true,
  },
}

export const WithCloseHandler: Story = {
  args: {
    label: 'Badge',
    useClose: true,
    onCloseClick: () => {
      console.log('Close clicked')
    },
  },
}

export const AllSizes: Story = {
  render: () => ({
    components: { BadgeComponent },
    template: `
      <div class="flex flex-wrap items-center gap-4">
        <BadgeComponent label="XSS" size="xss" />
        <BadgeComponent label="XS" size="xs" />
        <BadgeComponent label="SM" size="sm" />
        <BadgeComponent label="MD" size="md" />
        <BadgeComponent label="LG" size="lg" />
        <BadgeComponent label="XL" size="xl" />
      </div>
    `,
  }),
}

export const AllColors: Story = {
  render: () => ({
    components: { BadgeComponent },
    template: `
      <div class="flex flex-wrap items-center gap-4">
        <BadgeComponent label="Primary" color="air-primary" />
        <BadgeComponent label="Success" color="air-primary-success" />
        <BadgeComponent label="Alert" color="air-primary-alert" />
        <BadgeComponent label="Warning" color="air-primary-warning" />
        <BadgeComponent label="Copilot" color="air-primary-copilot" />
        <BadgeComponent label="Secondary" color="air-secondary" />
        <BadgeComponent label="Secondary Alert" color="air-secondary-alert" />
        <BadgeComponent label="Secondary Accent" color="air-secondary-accent" />
        <BadgeComponent label="Tertiary" color="air-tertiary" />
        <BadgeComponent label="Selection" color="air-selection" />
      </div>
    `,
  }),
}

export const WithNumbers: Story = {
  render: () => ({
    components: { BadgeComponent },
    template: `
      <div class="flex flex-wrap items-center gap-4">
        <BadgeComponent :label="1" />
        <BadgeComponent :label="42" />
        <BadgeComponent :label="999" />
        <BadgeComponent :label="1000" />
      </div>
    `,
  }),
}
