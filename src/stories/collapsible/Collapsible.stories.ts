import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CollapsibleComponent from '../../components/collapsible/CollapsibleComponent.vue'
const meta = {
  title: 'Element/Collapsible',
  component: CollapsibleComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    open: { control: 'boolean' },
    unmountOnHide: { control: 'boolean' },
  },
  args: {
    unmountOnHide: true,
  },
} as Meta<typeof CollapsibleComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { CollapsibleComponent },
    setup() {
      return { args }
    },
    template: `
      <CollapsibleComponent v-bind="args" class="flex flex-col gap-2 w-[192px]">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Открыть
        </button>
        <template #content>
          <div class="h-48 border border-gray-300 rounded p-4 flex items-center justify-center">
            Содержимое Collapsible
          </div>
        </template>
      </CollapsibleComponent>
    `,
  }),
}

export const WithDefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => ({
    components: { CollapsibleComponent },
    setup() {
      return { args }
    },
    template: `
      <CollapsibleComponent v-bind="args" class="flex flex-col gap-2 w-[192px]">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Открыть
        </button>
        <template #content>
          <div class="h-48 border border-gray-300 rounded p-4 flex items-center justify-center">
            Содержимое Collapsible (открыто по умолчанию)
          </div>
        </template>
      </CollapsibleComponent>
    `,
  }),
}

export const WithModelValue: Story = {
  args: {
    open: true,
  },
  render: (args) => ({
    components: { CollapsibleComponent },
    setup() {
      return { args }
    },
    template: `
      <CollapsibleComponent v-bind="args" class="flex flex-col gap-2 w-[192px]">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Открыть
        </button>
        <template #content>
          <div class="h-48 border border-gray-300 rounded p-4 flex items-center justify-center">
            Содержимое Collapsible (управляется через v-model)
          </div>
        </template>
      </CollapsibleComponent>
    `,
  }),
}

export const UnmountOnHide: Story = {
  args: {
    unmountOnHide: true,
  },
  render: (args) => ({
    components: { CollapsibleComponent },
    setup() {
      return { args }
    },
    template: `
      <CollapsibleComponent v-bind="args" class="flex flex-col gap-2 w-[192px]">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Открыть
        </button>
        <template #content>
          <div class="h-48 border border-gray-300 rounded p-4 flex items-center justify-center">
            Содержимое будет размонтировано при закрытии
          </div>
        </template>
      </CollapsibleComponent>
    `,
  }),
}

export const KeepMounted: Story = {
  args: {
    unmountOnHide: false,
  },
  render: (args) => ({
    components: { CollapsibleComponent },
    setup() {
      return { args }
    },
    template: `
      <CollapsibleComponent v-bind="args" class="flex flex-col gap-2 w-[192px]">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Открыть
        </button>
        <template #content>
          <div class="h-48 border border-gray-300 rounded p-4 flex items-center justify-center">
            Содержимое остается смонтированным при закрытии
          </div>
        </template>
      </CollapsibleComponent>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { CollapsibleComponent },
    setup() {
      return { args }
    },
    template: `
      <CollapsibleComponent v-bind="args" class="flex flex-col gap-2 w-[192px]">
        <button class="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed">
          Открыть (отключено)
        </button>
        <template #content>
          <div class="h-48 border border-gray-300 rounded p-4 flex items-center justify-center">
            Содержимое Collapsible
          </div>
        </template>
      </CollapsibleComponent>
    `,
  }),
}

export const WithControlledState: Story = {
  render: () => ({
    components: { CollapsibleComponent },
    setup() {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { ref } = require('vue')
      const open = ref(false)
      
      return { open }
    },
    template: `
      <div class="flex flex-col gap-4">
        <button 
          @click="open = !open"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-[192px]"
        >
          {{ open ? 'Закрыть' : 'Открыть' }} (внешний триггер)
        </button>
        <CollapsibleComponent v-model:open="open" class="flex flex-col gap-2 w-[192px]">
          <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Внутренний триггер
          </button>
          <template #content>
            <div class="h-48 border border-gray-300 rounded p-4 flex items-center justify-center">
              Состояние управляется извне: {{ open ? 'Открыто' : 'Закрыто' }}
            </div>
          </template>
        </CollapsibleComponent>
      </div>
    `,
  }),
}

export const WithRotatingIcon: Story = {
  render: () => ({
    components: { CollapsibleComponent },
    template: `
      <CollapsibleComponent class="flex flex-col gap-2 w-[192px]">
        <button class="group px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-between">
          <span>Открыть</span>
          <svg 
            class="w-4 h-4 group-data-[state=open]:rotate-180 transition-transform duration-200"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <template #content>
          <div class="h-48 border border-gray-300 rounded p-4 flex items-center justify-center">
            Иконка поворачивается при открытии
          </div>
        </template>
      </CollapsibleComponent>
    `,
  }),
}

export const WithComplexContent: Story = {
  render: () => ({
    components: { CollapsibleComponent },
    template: `
      <CollapsibleComponent class="flex flex-col gap-2 w-[300px]">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Показать детали
        </button>
        <template #content>
          <div class="border border-gray-300 rounded p-4 space-y-2">
            <h3 class="font-bold text-lg">Детальная информация</h3>
            <p class="text-gray-600">
              Это пример более сложного содержимого в Collapsible компоненте.
            </p>
            <ul class="list-disc list-inside space-y-1">
              <li>Элемент списка 1</li>
              <li>Элемент списка 2</li>
              <li>Элемент списка 3</li>
            </ul>
            <button class="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
              Действие
            </button>
          </div>
        </template>
      </CollapsibleComponent>
    `,
  }),
