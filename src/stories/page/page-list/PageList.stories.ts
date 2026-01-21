import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PageListComponent from '../../../components/page/page-list/PageListComponent.vue'
import type { PageListModel } from '../../../components/page/page-list/model'
import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Page/PageList',
  component: PageListComponent,
  argTypes: {},
  args: {} as Partial<PageListModel>,
} as Meta<typeof PageListComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<PageListModel>
}

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { PageListComponent },
    setup() {
      return { args }
    },
    template: `
      <PageListComponent v-bind="args">
        <div class="p-4 border-b">Элемент списка 1</div>
        <div class="p-4 border-b">Элемент списка 2</div>
        <div class="p-4 border-b">Элемент списка 3</div>
        <div class="p-4">Элемент списка 4</div>
      </PageListComponent>
    `,
  }),
}

export const WithCards: Story = {
  args: {},
  render: (args) => ({
    components: { PageListComponent },
    setup() {
      return { args }
    },
    template: `
      <PageListComponent v-bind="args">
        <div class="p-4 border rounded mb-2">
          <h3 class="font-bold mb-1">Карточка 1</h3>
          <p class="text-sm text-gray-600">Описание карточки</p>
        </div>
        <div class="p-4 border rounded mb-2">
          <h3 class="font-bold mb-1">Карточка 2</h3>
          <p class="text-sm text-gray-600">Описание карточки</p>
        </div>
        <div class="p-4 border rounded">
          <h3 class="font-bold mb-1">Карточка 3</h3>
          <p class="text-sm text-gray-600">Описание карточки</p>
        </div>
      </PageListComponent>
    `,
  }),
}
