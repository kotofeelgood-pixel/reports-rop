import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FieldGroupComponent from '../../../components/element/field-group/FieldGroupComponent.vue'
import type { FieldGroupModel } from '../../../components/element/field-group/model'
import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Element/FieldGroup',
  component: FieldGroupComponent,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    orientation: 'horizontal',
  } as Partial<FieldGroupModel>,
} as Meta<typeof FieldGroupComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<FieldGroupModel>
}

export const Default: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => ({
    components: { FieldGroupComponent },
    setup() {
      return { args }
    },
    template: `
      <FieldGroupComponent v-bind="args">
        <button class="px-4 py-2 border rounded">Кнопка 1</button>
        <button class="px-4 py-2 border rounded">Кнопка 2</button>
        <button class="px-4 py-2 border rounded">Кнопка 3</button>
      </FieldGroupComponent>
    `,
  }),
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => ({
    components: { FieldGroupComponent },
    setup() {
      return { args }
    },
    template: `
      <FieldGroupComponent v-bind="args">
        <button class="px-4 py-2 border rounded">Кнопка 1</button>
        <button class="px-4 py-2 border rounded">Кнопка 2</button>
        <button class="px-4 py-2 border rounded">Кнопка 3</button>
      </FieldGroupComponent>
    `,
  }),
}
