import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AvatarGroupComponent from '../../components/avatar-group/AvatarGroupComponent.vue'
import AvatarComponent from '../avatar/AvatarComponent.vue'
import type { AvatarGroupModel } from '../../components/avatar-group/model'
import type { AvatarSize } from '../avatar/model'

const meta = {
  title: 'UI/AvatarGroup',
  component: AvatarGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as AvatarSize[],
    },
    max: { control: 'number' },
  },
  args: {
    size: 'md',
  } as Partial<AvatarGroupModel>,
} as Meta<typeof AvatarGroupComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<AvatarGroupModel>
}

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { AvatarGroupComponent, AvatarComponent },
    setup() {
      return { args }
    },
    template: `
      <AvatarGroupComponent v-bind="args">
        <AvatarComponent src="/b24ui/avatar/employee.png" alt="Employee Name" />
        <AvatarComponent src="https://github.com/bitrix24.png" alt="Bitrix24" />
        <AvatarComponent src="/b24ui/avatar/assistant.png" alt="Assistant Name" />
      </AvatarGroupComponent>
    `,
  }),
}

export const Size3xs: Story = {
  args: {
    size: '3xs',
  },
  render: (args) => ({
    components: { AvatarGroupComponent, AvatarComponent },
    setup() {
      return { args }
    },
    template: `
      <AvatarGroupComponent v-bind="args">
        <AvatarComponent src="/b24ui/avatar/employee.png" alt="Employee Name" />
        <AvatarComponent src="https://github.com/bitrix24.png" alt="Bitrix24" />
        <AvatarComponent src="/b24ui/avatar/assistant.png" alt="Assistant Name" />
      </AvatarGroupComponent>
    `,
  }),
}

export const Size2xs: Story = {
  args: {
    size: '2xs',
  },
  render: (args) => ({
    components: { AvatarGroupComponent, AvatarComponent },
    setup() {
      return { args }
    },
    template: `
      <AvatarGroupComponent v-bind="args">
        <AvatarComponent src="/b24ui/avatar/employee.png" alt="Employee Name" />
        <AvatarComponent src="https://github.com/bitrix24.png" alt="Bitrix24" />
        <AvatarComponent src="/b24ui/avatar/assistant.png" alt="Assistant Name" />
      </AvatarGroupComponent>
    `,
  }),
}

export const SizeXs: Story = {
  args: {
    size: 'xs',
  },
  render: (args) => ({
    components: { AvatarGroupComponent, AvatarComponent },
    setup() {
      return { args }
    },
    template: `
      <AvatarGroupComponent v-bind="args">
        <AvatarComponent src="/b24ui/avatar/employee.png" alt="Employee Name" />
        <AvatarComponent src="https://github.com/bitrix24.png" alt="Bitrix24" />
        <AvatarComponent src="/b24ui/avatar/assistant.png" alt="Assistant Name" />
      </AvatarGroupComponent>
    `,
  }),
}

export const SizeSm: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => ({
    components: { AvatarGroupComponent, AvatarComponent },
    setup() {
      return { args }
    },
    template: `
      <AvatarGroupComponent v-bind="args">
        <AvatarComponent src="/b24ui/avatar/employee.png" alt="Employee Name" />
        <AvatarComponent src="https://github.com/bitrix24.png" alt="Bitrix24" />
        <AvatarComponent src="/b24ui/avatar/assistant.png" alt="Assistant Name" />
      </AvatarGroupComponent>
    `,
  }),
}

export const SizeMd: Story = {
  args: {
    size: 'md',
  },
  render: (args) => ({
    components: { AvatarGroupComponent, AvatarComponent },
    setup() {
      return { args }
    },
    template: `
      <AvatarGroupComponent v-bind="args">
        <AvatarComponent src="/b24ui/avatar/employee.png" alt="Employee Name" />
        <AvatarComponent src="https://github.com/bitrix24.png" alt="Bitrix24" />
        <AvatarComponent src="/b24ui/avatar/assistant.png" alt="Assistant Name" />
      </AvatarGroupComponent>
    `,
  }),
}

export const SizeLg: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => ({
    components: { AvatarGroupComponent, AvatarComponent },
    setup() {
      return { args }
    },
    template: `
      <AvatarGroupComponent v-bind="args">
        <AvatarComponent src="/b24ui/avatar/employee.png" alt="Employee Name" />
        <AvatarComponent src="https://github.com/bitrix24.png" alt="Bitrix24" />
        <AvatarComponent src="/b24ui/avatar/assistant.png" alt="Assistant Name" />
      </AvatarGroupComponent>
    `,
  }),
}

export const SizeXl: Story = {
  args: {
    size: 'xl',
  },
  render: (args) => ({
    components: { AvatarGroupComponent, AvatarComponent },
    setup() {
      return { args }
    },
    template: `
      <AvatarGroupComponent v-bind="args">
        <AvatarComponent src="/b24ui/avatar/employee.png" alt="Employee Name" />
        <AvatarComponent src="https://github.com/bitrix24.png" alt="Bitrix24" />
        <AvatarComponent src="/b24ui/avatar/assistant.png" alt="Assistant Name" />
      </AvatarGroupComponent>
    `,
  }),
}

export const Size2xl: Story = {
  args: {
    size: '2xl',
  },
  render: (args) => ({
    components: { AvatarGroupComponent, AvatarComponent },
    setup() {
      return { args }
    },
    template: `
      <AvatarGroupComponent v-bind="args">
        <AvatarComponent src="/b24ui/avatar/employee.png" alt="Employee Name" />
        <AvatarComponent src="https://github.com/bitrix24.png" alt="Bitrix24" />
        <AvatarComponent src="/b24ui/avatar/assistant.png" alt="Assistant Name" />
      </AvatarGroupComponent>
    `,
  }),
}

export const Size3xl: Story = {
  args: {
    size: '3xl',
  },
  render: (args) => ({
    components: { AvatarGroupComponent, AvatarComponent },
    setup() {
      return { args }
    },
    template: `
      <AvatarGroupComponent v-bind="args">
        <AvatarComponent src="/b24ui/avatar/employee.png" alt="Employee Name" />
        <AvatarComponent src="https://github.com/bitrix24.png" alt="Bitrix24" />
        <AvatarComponent src="/b24ui/avatar/assistant.png" alt="Assistant Name" />
      </AvatarGroupComponent>
    `,
  }),
}

export const WithMax: Story = {
  args: {
    max: 2,
  },
  render: (args) => ({
    components: { AvatarGroupComponent, AvatarComponent },
    setup() {
      return { args }
    },
    template: `
      <AvatarGroupComponent v-bind="args">
        <AvatarComponent src="/b24ui/avatar/employee.png" alt="Employee Name" />
        <AvatarComponent src="https://github.com/bitrix24.png" alt="Bitrix24" />
        <AvatarComponent src="/b24ui/avatar/assistant.png" alt="Assistant Name" />
      </AvatarGroupComponent>
    `,
  }),
}

export const WithMax3: Story = {
  args: {
    max: 3,
    size: 'xl',
  },
  render: (args) => ({
    components: { AvatarGroupComponent, AvatarComponent },
    setup() {
      return { args }
    },
    template: `
      <AvatarGroupComponent v-bind="args">
        <AvatarComponent src="/b24ui/avatar/employee.png" alt="Employee Name" />
        <AvatarComponent src="https://github.com/bitrix24.png" alt="Bitrix24" />
        <AvatarComponent src="/b24ui/avatar/assistant.png" alt="Assistant Name" />
        <AvatarComponent src="/b24ui/avatar/employee.png" alt="Employee Name 2" />
        <AvatarComponent src="/b24ui/avatar/assistant.png" alt="Assistant Name 2" />
      </AvatarGroupComponent>
    `,
  }),
}

export const WithManyAvatars: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => ({
    components: { AvatarGroupComponent, AvatarComponent },
    setup() {
      return { args }
    },
    template: `
      <AvatarGroupComponent v-bind="args">
        <AvatarComponent src="/b24ui/avatar/employee.png" alt="Employee 1" />
        <AvatarComponent src="https://github.com/bitrix24.png" alt="Bitrix24" />
        <AvatarComponent src="/b24ui/avatar/assistant.png" alt="Assistant 1" />
        <AvatarComponent src="/b24ui/avatar/employee.png" alt="Employee 2" />
        <AvatarComponent src="/b24ui/avatar/assistant.png" alt="Assistant 2" />
        <AvatarComponent src="/b24ui/avatar/employee.png" alt="Employee 3" />
      </AvatarGroupComponent>
    `,
  }),
}

export const WithIcons: Story = {
  args: {
    size: 'xl',
  },
  render: (args) => ({
    components: { AvatarGroupComponent, AvatarComponent },
    setup() {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const RocketIcon = require('@bitrix24/b24icons-vue/main/RocketIcon').default
      return { args, RocketIcon }
    },
    template: `
      <AvatarGroupComponent v-bind="args">
        <AvatarComponent :icon="RocketIcon" />
        <AvatarComponent :icon="RocketIcon" />
        <AvatarComponent :icon="RocketIcon" />
      </AvatarGroupComponent>
    `,
  }),
}

export const WithText: Story = {
  args: {
    size: 'xl',
  },
  render: (args) => ({
    components: { AvatarGroupComponent, AvatarComponent },
    setup() {
      return { args }
    },
    template: `
      <AvatarGroupComponent v-bind="args">
        <AvatarComponent text="A" />
        <AvatarComponent text="B" />
        <AvatarComponent text="C" />
      </AvatarGroupComponent>
    `,
  }),
}

export const Mixed: Story = {
  args: {
    size: 'xl',
  },
  render: (args) => ({
    components: { AvatarGroupComponent, AvatarComponent },
    setup() {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const RocketIcon = require('@bitrix24/b24icons-vue/main/RocketIcon').default
      return { args, RocketIcon }
    },
    template: `
      <AvatarGroupComponent v-bind="args">
        <AvatarComponent src="/b24ui/avatar/employee.png" alt="Employee" />
        <AvatarComponent :icon="RocketIcon" />
        <AvatarComponent text="+5" />
      </AvatarGroupComponent>
    `,
  }),
}
