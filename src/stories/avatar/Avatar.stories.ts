import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AvatarComponent from '../../components/avatar/AvatarComponent.vue'

import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

const meta = {
  title: 'Element/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    icon: { control: 'object' },
    text: { control: 'text' },
    size: {
      control: 'select',
      options: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    chip: { control: 'object' },
  },
  args: {
    src: '/b24ui/avatar/employee.png',
    alt: 'Employee',
    size: 'md',
  },
} as Meta<typeof AvatarComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: '/b24ui/avatar/employee.png',
    alt: 'Employee',
  },
}

export const WithSrc: Story = {
  args: {
    src: 'https://github.com/bitrix24.png',
    alt: 'Bitrix24',
  },
}

export const Size3xs: Story = {
  args: {
    size: '3xs',
    src: '/b24ui/avatar/employee.png',
    alt: 'Employee',
  },
}

export const Size2xs: Story = {
  args: {
    size: '2xs',
    src: '/b24ui/avatar/employee.png',
    alt: 'Employee',
  },
}

export const SizeXs: Story = {
  args: {
    size: 'xs',
    src: '/b24ui/avatar/employee.png',
    alt: 'Employee',
  },
}

export const SizeSm: Story = {
  args: {
    size: 'sm',
    src: '/b24ui/avatar/employee.png',
    alt: 'Employee',
  },
}

export const SizeMd: Story = {
  args: {
    size: 'md',
    src: '/b24ui/avatar/employee.png',
    alt: 'Employee',
  },
}

export const SizeLg: Story = {
  args: {
    size: 'lg',
    src: '/b24ui/avatar/employee.png',
    alt: 'Employee',
  },
}

export const SizeXl: Story = {
  args: {
    size: 'xl',
    src: '/b24ui/avatar/employee.png',
    alt: 'Employee',
  },
}

export const Size2xl: Story = {
  args: {
    size: '2xl',
    src: '/b24ui/avatar/employee.png',
    alt: 'Employee',
  },
}

export const Size3xl: Story = {
  args: {
    size: '3xl',
    src: '/b24ui/avatar/employee.png',
    alt: 'Employee',
  },
}

export const WithIcon: Story = {
  args: {
    icon: RocketIcon,
    size: 'md',
  },
}

export const WithText: Story = {
  args: {
    text: '+24',
    size: 'xl',
  },
}

export const WithAlt: Story = {
  args: {
    alt: 'Employee Name',
    size: 'xl',
  },
}

export const WithChip: Story = {
  args: {
    src: '/b24ui/avatar/assistant.png',
    alt: 'Assistant',
    chip: true,
  },
}

export const WithChipProps: Story = {
  args: {
    src: '/b24ui/avatar/assistant.png',
    alt: 'Assistant',
    chip: {
      text: '+1',
      inset: true,
      hideZero: true,
    },
  },
}

export const WithDifferentAvatars: Story = {
  render: () => ({
    components: { AvatarComponent },
    template: `
      <div class="flex flex-wrap items-center gap-4">
        <AvatarComponent src="/b24ui/avatar/employee.png" alt="Employee" />
        <AvatarComponent src="/b24ui/avatar/assistant.png" alt="Assistant" />
        <AvatarComponent src="https://github.com/bitrix24.png" alt="Bitrix24" />
      </div>
    `,
  }),
}

export const WithDifferentSizes: Story = {
  render: () => ({
    components: { AvatarComponent },
    template: `
      <div class="flex flex-wrap items-center gap-4">
        <AvatarComponent size="xs" src="/b24ui/avatar/employee.png" alt="XS" />
        <AvatarComponent size="sm" src="/b24ui/avatar/employee.png" alt="SM" />
        <AvatarComponent size="md" src="/b24ui/avatar/employee.png" alt="MD" />
        <AvatarComponent size="lg" src="/b24ui/avatar/employee.png" alt="LG" />
        <AvatarComponent size="xl" src="/b24ui/avatar/employee.png" alt="XL" />
        <AvatarComponent size="2xl" src="/b24ui/avatar/employee.png" alt="2XL" />
      </div>
    `,
  }),
}

export const WithFallbacks: Story = {
  render: () => ({
    components: { AvatarComponent },
    setup() {
      return { RocketIcon }
    },
    template: `
      <div class="flex flex-wrap items-center gap-4">
        <AvatarComponent :icon="RocketIcon" size="md" />
        <AvatarComponent text="+24" size="xl" />
        <AvatarComponent alt="Employee Name" size="xl" />
      </div>
    `,
  }),
