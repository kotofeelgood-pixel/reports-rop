import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UserComponent from '../../components/user/UserComponent.vue'
import type { UserModel, UserSize, UserOrientation } from '../../components/user/model'

const meta = {
  title: 'UI/User',
  component: UserComponent,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    description: { control: 'text' },
    size: {
      control: 'select',
      options: ['md', '3xs', '2xs', 'xs', 'sm', 'lg', 'xl', '2xl', '3xl'] as UserSize[],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'] as UserOrientation[],
    },
    chip: { control: 'object' },
    avatar: { control: 'object' },
    to: { control: 'text' },
    target: {
      control: 'select',
      options: ['_blank', '_parent', '_self', '_top'],
    },
  },
  args: {
    name: 'John Doe',
    description: 'Software Engineer',
    size: 'md',
    orientation: 'horizontal',
  } as Partial<UserModel>,
} as Meta<typeof UserComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<UserModel>
}

export const Default: Story = {
  args: {
    name: 'John Doe',
  },
}

export const WithDescription: Story = {
  args: {
    name: 'John Doe',
    description: 'Software Engineer',
  },
}

export const WithAvatar: Story = {
  args: {
    name: 'John Doe',
    description: 'Software Engineer',
    avatar: {
      src: '/b24ui/avatar/employee.png',
    },
  },
}

export const WithChip: Story = {
  args: {
    name: 'John Doe',
    description: 'Software Engineer',
    avatar: {
      src: '/b24ui/avatar/employee.png',
    },
    chip: true,
  },
}

export const WithChipProps: Story = {
  args: {
    name: 'John Doe',
    description: 'Software Engineer',
    avatar: {
      src: '/b24ui/avatar/employee.png',
    },
    chip: {
      color: 'primary',
      position: 'top-right',
    },
  },
}

export const AllSizes: Story = {
  render: () => ({
    components: { UserComponent },
    setup() {
      const sizes: UserSize[] = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
      return { sizes }
    },
    template: `
      <div class="space-y-8">
        <div v-for="size in sizes" :key="size">
          <div class="mb-2 text-sm font-medium">{{ size }}</div>
          <UserComponent
            name="John Doe"
            description="Software Engineer"
            :avatar="{ src: '/b24ui/avatar/employee.png' }"
            :size="size"
          />
        </div>
      </div>
    `,
  }),
}

export const Vertical: Story = {
  args: {
    name: 'John Doe',
    description: 'Software Engineer',
    avatar: {
      src: '/b24ui/avatar/employee.png',
    },
    orientation: 'vertical',
  },
}

export const WithLink: Story = {
  args: {
    name: 'Username',
    description: 'User description',
    avatar: {
      src: 'https://github.com/bitrix24.png',
    },
    to: 'https://github.com/bitrix24',
    target: '_blank',
  },
  render: (args) => ({
    components: { UserComponent },
    setup() {
      return { args }
    },
    template: `
      <UserComponent v-bind="args" />
    `,
  }),
}

export const WithRouterLink: Story = {
  args: {
    name: 'Username',
    description: 'User description',
    avatar: {
      src: '/b24ui/avatar/employee.png',
    },
    to: '/user',
  },
  render: (args) => ({
    components: { UserComponent },
    setup() {
      return { args }
    },
    template: `
      <UserComponent v-bind="args" />
    `,
  }),
}

export const WithCustomSlots: Story = {
  render: () => ({
    components: { UserComponent },
    setup() {
      return {}
    },
    template: `
      <UserComponent
        name="John Doe"
        description="Software Engineer"
        :avatar="{ src: '/b24ui/avatar/employee.png' }"
      >
        <template #name="{ name }">
          <span class="font-bold text-blue-600">{{ name }}</span>
        </template>
        <template #description="{ description }">
          <span class="text-sm italic">{{ description }}</span>
        </template>
      </UserComponent>
    `,
  }),
}

export const WithCustomAvatarSlot: Story = {
  render: () => ({
    components: { UserComponent },
    setup() {
      return {}
    },
    template: `
      <UserComponent
        name="John Doe"
        description="Software Engineer"
      >
        <template #avatar>
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
            JD
          </div>
        </template>
      </UserComponent>
    `,
  }),
}

export const WithOnClick: Story = {
  args: {
    name: 'John Doe',
    description: 'Software Engineer',
    avatar: {
      src: '/b24ui/avatar/employee.png',
    },
    onClick: (event: MouseEvent) => {
      event.preventDefault()
      console.log('User clicked!')
      alert('User clicked!')
    },
  },
  render: (args) => ({
    components: { UserComponent },
    setup() {
      return { args }
    },
    template: `
      <UserComponent v-bind="args" />
    `,
  }),
}

export const DifferentUsers: Story = {
  render: () => ({
    components: { UserComponent },
    setup() {
      const users = [
        {
          name: 'John Doe',
          description: 'Software Engineer',
          avatar: { src: '/b24ui/avatar/employee.png' },
        },
        {
          name: 'Jane Smith',
          description: 'Product Designer',
          avatar: { src: '/b24ui/avatar/assistant.png' },
        },
        {
          name: 'Bob Johnson',
          description: 'Project Manager',
          avatar: { src: '/b24ui/avatar/employee.png' },
        },
      ]
      return { users }
    },
    template: `
      <div class="space-y-4">
        <UserComponent
          v-for="(user, index) in users"
          :key="index"
          :name="user.name"
          :description="user.description"
          :avatar="user.avatar"
        />
      </div>
    `,
  }),
}

export const WithChipColors: Story = {
  render: () => ({
    components: { UserComponent },
    setup() {
      const chipColors = [
        { color: 'primary', position: 'top-right' as const },
        { color: 'air-primary-success', position: 'top-right' as const },
        { color: 'air-primary-alert', position: 'top-right' as const },
        { color: 'air-primary-warning', position: 'top-right' as const },
        { color: 'air-primary-copilot', position: 'top-right' as const },
      ]
      return { chipColors }
    },
    template: `
      <div class="space-y-4">
        <UserComponent
          v-for="(chip, index) in chipColors"
          :key="index"
          name="John Doe"
          description="Software Engineer"
          :avatar="{ src: '/b24ui/avatar/employee.png' }"
          :chip="chip"
        />
      </div>
    `,
  }),
}

export const HorizontalVsVertical: Story = {
  render: () => ({
    components: { UserComponent },
    setup() {
      return {}
    },
    template: `
      <div class="space-y-8">
        <div>
          <div class="mb-2 text-sm font-medium">Horizontal (default)</div>
          <UserComponent
            name="John Doe"
            description="Software Engineer"
            :avatar="{ src: '/b24ui/avatar/employee.png' }"
            orientation="horizontal"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Vertical</div>
          <UserComponent
            name="John Doe"
            description="Software Engineer"
            :avatar="{ src: '/b24ui/avatar/employee.png' }"
            orientation="vertical"
          />
        </div>
      </div>
    `,
  }),
}
