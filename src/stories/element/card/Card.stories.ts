import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CardComponent from '../../../components/element/card/CardComponent.vue'
import type { CardModel } from '../../../components/element/card/model'
import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Element/Card',
  component: CardComponent,
  argTypes: {},
  args: {} as Partial<CardModel>,
} as Meta<typeof CardComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<CardModel>
}

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { CardComponent },
    setup() {
      return { args }
    },
    template: `
      <CardComponent v-bind="args">
        <template #header>
          <h3 class="text-lg font-semibold">Заголовок карточки</h3>
        </template>
        <p>Содержимое карточки. Здесь может быть любой контент.</p>
        <template #footer>
          <div class="text-sm text-gray-500">Футер карточки</div>
        </template>
      </CardComponent>
    `,
  }),
}

export const WithoutHeader: Story = {
  args: {},
  render: (args) => ({
    components: { CardComponent },
    setup() {
      return { args }
    },
    template: `
      <CardComponent v-bind="args">
        <p>Карточка без заголовка</p>
        <template #footer>
          <div class="text-sm text-gray-500">Футер</div>
        </template>
      </CardComponent>
    `,
  }),
}

export const WithoutFooter: Story = {
  args: {},
  render: (args) => ({
    components: { CardComponent },
    setup() {
      return { args }
    },
    template: `
      <CardComponent v-bind="args">
        <template #header>
          <h3 class="text-lg font-semibold">Заголовок</h3>
        </template>
        <p>Карточка без футера</p>
      </CardComponent>
    `,
  }),
}

export const Simple: Story = {
  args: {},
  render: (args) => ({
    components: { CardComponent },
    setup() {
      return { args }
    },
    template: `
      <CardComponent v-bind="args">
        <p>Простая карточка без заголовка и футера</p>
      </CardComponent>
    `,
  }),
}
