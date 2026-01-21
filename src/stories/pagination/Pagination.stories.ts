import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PaginationComponent from '../../components/pagination/PaginationComponent.vue'
import type { PaginationModel, PaginationColor, PaginationActiveColor, PaginationSize } from '../../components/pagination/model'
import { ref } from 'vue'

const meta = {
  title: 'UI/Pagination',
  component: PaginationComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-copilot',
        'air-secondary',
        'air-secondary-alert',
        'air-secondary-accent',
        'air-secondary-accent-1',
        'air-secondary-accent-2',
        'air-secondary-no-accent',
        'air-tertiary',
        'air-tertiary-accent',
        'air-tertiary-no-accent',
        'air-selection',
        'air-boost',
        'link',
      ] as PaginationColor[],
    },
    activeColor: {
      control: 'select',
      options: [
        'default',
        'air-secondary-no-accent',
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-copilot',
        'air-secondary',
        'air-secondary-alert',
        'air-secondary-accent',
        'air-secondary-accent-1',
        'air-secondary-accent-2',
        'air-tertiary',
        'air-tertiary-accent',
        'air-tertiary-no-accent',
        'air-selection',
        'air-boost',
        'danger',
        'success',
        'warning',
        'primary',
        'secondary',
        'collab',
        'ai',
        'link',
      ] as PaginationActiveColor[],
    },
    size: {
      control: 'select',
      options: ['xss', 'xs', 'sm', 'md', 'lg', 'xl'] as PaginationSize[],
    },
    total: { control: 'number' },
    itemsPerPage: { control: 'number' },
    siblingCount: { control: 'number' },
    showEdges: { control: 'boolean' },
    showControls: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    total: 100,
    itemsPerPage: 10,
    siblingCount: 2,
    showEdges: false,
    showControls: true,
    color: 'air-secondary-no-accent',
    activeColor: 'air-primary',
    size: 'md',
  } as Partial<PaginationModel>,
} as Meta<typeof PaginationComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<PaginationModel>
}

export const Default: Story = {
  args: {
    total: 100,
  },
  render: (args) => ({
    components: { PaginationComponent },
    setup() {
      const page = ref(5)
      return { args, page }
    },
    template: `
      <div class="space-y-4">
        <PaginationComponent
          v-bind="args"
          v-model:page="page"
        />
        <div class="text-sm text-gray-600">
          Текущая страница: <strong>{{ page }}</strong>
        </div>
      </div>
    `,
  }),
}

export const WithDefaultPage: Story = {
  args: {
    total: 100,
    defaultPage: 5,
  },
}

export const WithItemsPerPage: Story = {
  args: {
    total: 100,
    itemsPerPage: 20,
  },
  render: (args) => ({
    components: { PaginationComponent },
    setup() {
      const page = ref(3)
      return { args, page }
    },
    template: `
      <div class="space-y-4">
        <PaginationComponent
          v-bind="args"
          v-model:page="page"
        />
        <div class="text-sm text-gray-600">
          Страница: <strong>{{ page }}</strong>, Элементов на странице: <strong>{{ args.itemsPerPage }}</strong>
        </div>
      </div>
    `,
  }),
}

export const WithSiblingCount: Story = {
  args: {
    total: 100,
    siblingCount: 1,
  },
  render: (args) => ({
    components: { PaginationComponent },
    setup() {
      const page = ref(5)
      return { args, page }
    },
    template: `
      <div class="space-y-4">
        <PaginationComponent
          v-bind="args"
          v-model:page="page"
        />
        <div class="text-sm text-gray-600">
          Показывается {{ args.siblingCount }} соседняя страница с каждой стороны
        </div>
      </div>
    `,
  }),
}

export const WithShowEdges: Story = {
  args: {
    total: 100,
    showEdges: true,
    siblingCount: 1,
  },
  render: (args) => ({
    components: { PaginationComponent },
    setup() {
      const page = ref(5)
      return { args, page }
    },
    template: `
      <div class="space-y-4">
        <PaginationComponent
          v-bind="args"
          v-model:page="page"
        />
        <div class="text-sm text-gray-600">
          Всегда показываются первая и последняя страницы
        </div>
      </div>
    `,
  }),
}

export const WithoutControls: Story = {
  args: {
    total: 100,
    showControls: false,
    showEdges: true,
  },
  render: (args) => ({
    components: { PaginationComponent },
    setup() {
      const page = ref(5)
      return { args, page }
    },
    template: `
      <div class="space-y-4">
        <PaginationComponent
          v-bind="args"
          v-model:page="page"
        />
        <div class="text-sm text-gray-600">
          Кнопки "Первая", "Предыдущая", "Следующая" и "Последняя" скрыты
        </div>
      </div>
    `,
  }),
}

export const WithColor: Story = {
  args: {
    total: 100,
    color: 'air-tertiary-no-accent',
  },
  render: (args) => ({
    components: { PaginationComponent },
    setup() {
      const page = ref(5)
      return { args, page }
    },
    template: `
      <PaginationComponent
        v-bind="args"
        v-model:page="page"
      />
    `,
  }),
}

export const WithActiveColor: Story = {
  args: {
    total: 100,
    activeColor: 'air-primary-copilot',
  },
  render: (args) => ({
    components: { PaginationComponent },
    setup() {
      const page = ref(5)
      return { args, page }
    },
    template: `
      <PaginationComponent
        v-bind="args"
        v-model:page="page"
      />
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { PaginationComponent },
    setup() {
      const pages = {
        xss: ref(3),
        xs: ref(3),
        sm: ref(3),
        md: ref(3),
        lg: ref(3),
        xl: ref(3),
      }
      return { pages }
    },
    template: `
      <div class="space-y-6">
        <div>
          <div class="mb-2 text-sm font-medium">Extra Extra Small</div>
          <PaginationComponent
            v-model:page="pages.xss"
            :total="50"
            size="xss"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Extra Small</div>
          <PaginationComponent
            v-model:page="pages.xs"
            :total="50"
            size="xs"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Small</div>
          <PaginationComponent
            v-model:page="pages.sm"
            :total="50"
            size="sm"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Medium</div>
          <PaginationComponent
            v-model:page="pages.md"
            :total="50"
            size="md"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Large</div>
          <PaginationComponent
            v-model:page="pages.lg"
            :total="50"
            size="lg"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Extra Large</div>
          <PaginationComponent
            v-model:page="pages.xl"
            :total="50"
            size="xl"
          />
        </div>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    total: 100,
    disabled: true,
  },
  render: (args) => ({
    components: { PaginationComponent },
    setup() {
      const page = ref(5)
      return { args, page }
    },
    template: `
      <PaginationComponent
        v-bind="args"
        v-model:page="page"
      />
    `,
  }),
}

export const LargeDataset: Story = {
  args: {
    total: 1000,
    itemsPerPage: 20,
    siblingCount: 2,
    showEdges: true,
  },
  render: (args) => ({
    components: { PaginationComponent },
    setup() {
      const page = ref(25)
      return { args, page }
    },
    template: `
      <div class="space-y-4">
        <PaginationComponent
          v-bind="args"
          v-model:page="page"
        />
        <div class="text-sm text-gray-600">
          Всего элементов: <strong>{{ args.total }}</strong>, 
          Элементов на странице: <strong>{{ args.itemsPerPage }}</strong>,
          Всего страниц: <strong>{{ Math.ceil(args.total / args.itemsPerPage) }}</strong>
        </div>
      </div>
    `,
  }),
}

export const SmallDataset: Story = {
  args: {
    total: 15,
    itemsPerPage: 10,
  },
  render: (args) => ({
    components: { PaginationComponent },
    setup() {
      const page = ref(1)
      return { args, page }
    },
    template: `
      <div class="space-y-4">
        <PaginationComponent
          v-bind="args"
          v-model:page="page"
        />
        <div class="text-sm text-gray-600">
          Маленький набор данных ({{ args.total }} элементов)
        </div>
      </div>
    `,
  }),
}

export const WithLinks: Story = {
  args: {
    total: 100,
    siblingCount: 1,
    showEdges: true,
  },
  render: (args) => ({
    components: { PaginationComponent },
    setup() {
      const page = ref(5)

      function to(pageNumber: number) {
        return {
          query: {
            page: pageNumber,
          },
          hash: '#with-links',
        }
      }

      return { args, page, to }
    },
    template: `
      <div class="space-y-4">
        <PaginationComponent
          v-bind="args"
          v-model:page="page"
          :to="to"
        />
        <div class="text-sm text-gray-600">
          Кнопки преобразованы в ссылки с query параметром page
        </div>
      </div>
    `,
  }),
}

export const InContext: Story = {
  args: {
    total: 250,
    itemsPerPage: 10,
    siblingCount: 2,
    showEdges: true,
  },
  render: (args) => ({
    components: { PaginationComponent },
    setup() {
      const page = ref(5)
      const items = ref(
        Array.from({ length: args.itemsPerPage }, (_, i) => ({
          id: (page.value - 1) * args.itemsPerPage + i + 1,
          name: `Элемент ${(page.value - 1) * args.itemsPerPage + i + 1}`,
        }))
      )

      function updateItems() {
        items.value = Array.from({ length: args.itemsPerPage }, (_, i) => ({
          id: (page.value - 1) * args.itemsPerPage + i + 1,
          name: `Элемент ${(page.value - 1) * args.itemsPerPage + i + 1}`,
        }))
      }

      return { args, page, items, updateItems }
    },
    template: `
      <div class="max-w-4xl space-y-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">Pagination</h1>
          <p class="text-gray-600">
            Компонент для навигации по страницам. Позволяет переключаться между страницами данных.
          </p>
        </div>
        <div class="border rounded-lg p-4">
          <div class="space-y-2 mb-4">
            <div
              v-for="item in items"
              :key="item.id"
              class="p-2 bg-gray-50 rounded"
            >
              {{ item.name }}
            </div>
          </div>
          <PaginationComponent
            v-bind="args"
            v-model:page="page"
            @update:page="updateItems"
          />
        </div>
        <div class="text-sm text-gray-600">
          Показано элементов {{ (page - 1) * args.itemsPerPage + 1 }} - 
          {{ Math.min(page * args.itemsPerPage, args.total) }} из {{ args.total }}
        </div>
      </div>
    `,
  }),
}

export const TablePagination: Story = {
  args: {
    total: 150,
    itemsPerPage: 15,
    siblingCount: 1,
    showEdges: true,
  },
  render: (args) => ({
    components: { PaginationComponent },
    setup() {
      const page = ref(1)
      const headers = ['ID', 'Название', 'Статус', 'Дата']
      const rows = ref(
        Array.from({ length: args.itemsPerPage }, (_, i) => ({
          id: (page.value - 1) * args.itemsPerPage + i + 1,
          name: `Запись ${(page.value - 1) * args.itemsPerPage + i + 1}`,
          status: i % 2 === 0 ? 'Активна' : 'Неактивна',
          date: new Date().toLocaleDateString(),
        }))
      )

      function updateRows() {
        rows.value = Array.from({ length: args.itemsPerPage }, (_, i) => ({
          id: (page.value - 1) * args.itemsPerPage + i + 1,
          name: `Запись ${(page.value - 1) * args.itemsPerPage + i + 1}`,
          status: i % 2 === 0 ? 'Активна' : 'Неактивна',
          date: new Date().toLocaleDateString(),
        }))
      }

      return { args, page, headers, rows, updateRows }
    },
    template: `
      <div class="max-w-4xl space-y-4">
        <div class="border rounded-lg overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-100">
              <tr>
                <th
                  v-for="header in headers"
                  :key="header"
                  class="px-4 py-2 text-left"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in rows"
                :key="row.id"
                class="border-t"
              >
                <td class="px-4 py-2">{{ row.id }}</td>
                <td class="px-4 py-2">{{ row.name }}</td>
                <td class="px-4 py-2">{{ row.status }}</td>
                <td class="px-4 py-2">{{ row.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-600">
            Показано {{ (page - 1) * args.itemsPerPage + 1 }} - 
            {{ Math.min(page * args.itemsPerPage, args.total) }} из {{ args.total }}
          </div>
          <PaginationComponent
            v-bind="args"
            v-model:page="page"
            @update:page="updateRows"
          />
        </div>
      </div>
    `,
  }),
}

export const CustomColors: Story = {
  render: () => ({
    components: { PaginationComponent },
    setup() {
      const pages = {
        primary: ref(3),
        success: ref(3),
        alert: ref(3),
        copilot: ref(3),
      }
      return { pages }
    },
    template: `
      <div class="space-y-6">
        <div>
          <div class="mb-2 text-sm font-medium">Primary</div>
          <PaginationComponent
            v-model:page="pages.primary"
            :total="50"
            active-color="air-primary"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Success</div>
          <PaginationComponent
            v-model:page="pages.success"
            :total="50"
            active-color="air-primary-success"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Alert</div>
          <PaginationComponent
            v-model:page="pages.alert"
            :total="50"
            active-color="air-primary-alert"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">Copilot</div>
          <PaginationComponent
            v-model:page="pages.copilot"
            :total="50"
            active-color="air-primary-copilot"
          />
        </div>
      </div>
    `,
  }),
}
