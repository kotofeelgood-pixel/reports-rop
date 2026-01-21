import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LinkComponent from '../../../components/navigation/link/LinkComponent.vue'
import type { LinkModel } from '../../../components/navigation/link/model'
import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Navigation/Link',
  component: LinkComponent,
  argTypes: {
    to: { control: 'text' },
    href: { control: 'text' },
    external: { control: 'boolean' },
  },
  args: {
    to: '/',
  } as Partial<LinkModel>,
} as Meta<typeof LinkComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<LinkModel>
}

export const Default: Story = {
  args: {
    to: '/',
  },
  render: (args) => ({
    components: { LinkComponent },
    setup() {
      return { args }
    },
    template: `
      <LinkComponent v-bind="args">Ссылка</LinkComponent>
    `,
  }),
}

export const External: Story = {
  args: {
    href: 'https://bitrix24.com',
    external: true,
  },
  render: (args) => ({
    components: { LinkComponent },
    setup() {
      return { args }
    },
    template: `
      <LinkComponent v-bind="args">Внешняя ссылка</LinkComponent>
    `,
  }),
}

export const WithRoute: Story = {
  args: {
    to: '/docs',
  },
  render: (args) => ({
    components: { LinkComponent },
    setup() {
      return { args }
    },
    template: `
      <LinkComponent v-bind="args">Документация</LinkComponent>
    `,
  }),
}
