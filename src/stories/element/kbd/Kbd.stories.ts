import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KbdComponent from '../../../components/element/kbd/KbdComponent.vue'
import type { KbdModel } from '../../../components/element/kbd/model'
import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Element/Kbd',
  component: KbdComponent,
  argTypes: {},
  args: {} as Partial<KbdModel>,
} as Meta<typeof KbdComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<KbdModel>
}

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { KbdComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="flex gap-2 items-center">
        <KbdComponent v-bind="args">⌘</KbdComponent>
        <span>+</span>
        <KbdComponent v-bind="args">K</KbdComponent>
      </div>
    `,
  }),
}

export const Multiple: Story = {
  args: {},
  render: (args) => ({
    components: { KbdComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="flex gap-2 items-center">
        <KbdComponent v-bind="args">Ctrl</KbdComponent>
        <span>+</span>
        <KbdComponent v-bind="args">Shift</KbdComponent>
        <span>+</span>
        <KbdComponent v-bind="args">P</KbdComponent>
      </div>
    `,
  }),
}

export const SingleKey: Story = {
  args: {},
  render: (args) => ({
    components: { KbdComponent },
    setup() {
      return { args }
    },
    template: `
      <KbdComponent v-bind="args">Esc</KbdComponent>
    `,
  }),
}
