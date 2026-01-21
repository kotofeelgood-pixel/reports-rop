import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PageColumnsComponent from '../../../components/page/page-columns/PageColumnsComponent.vue'
import type { PageColumnsModel } from '../../../components/page/page-columns/model'
import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Page/PageColumns',
  component: PageColumnsComponent,
  argTypes: {
    columns: { control: 'number' },
  },
  args: {
    columns: 2,
  } as Partial<PageColumnsModel>,
} as Meta<typeof PageColumnsComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<PageColumnsModel>
}

export const Default: Story = {
  args: {
    columns: 2,
  },
  render: (args) => ({
    components: { PageColumnsComponent },
    setup() {
      return { args }
    },
    template: `
      <PageColumnsComponent v-bind="args">
        <div class="p-4 border rounded">Колонка 1</div>
        <div class="p-4 border rounded">Колонка 2</div>
      </PageColumnsComponent>
    `,
  }),
}

export const ThreeColumns: Story = {
  args: {
    columns: 3,
  },
  render: (args) => ({
    components: { PageColumnsComponent },
    setup() {
      return { args }
    },
    template: `
      <PageColumnsComponent v-bind="args">
        <div class="p-4 border rounded">Колонка 1</div>
        <div class="p-4 border rounded">Колонка 2</div>
        <div class="p-4 border rounded">Колонка 3</div>
      </PageColumnsComponent>
    `,
  }),
}

export const FourColumns: Story = {
  args: {
    columns: 4,
  },
  render: (args) => ({
    components: { PageColumnsComponent },
    setup() {
      return { args }
    },
    template: `
      <PageColumnsComponent v-bind="args">
        <div class="p-4 border rounded">Колонка 1</div>
        <div class="p-4 border rounded">Колонка 2</div>
        <div class="p-4 border rounded">Колонка 3</div>
        <div class="p-4 border rounded">Колонка 4</div>
      </PageColumnsComponent>
    `,
  }),
}
