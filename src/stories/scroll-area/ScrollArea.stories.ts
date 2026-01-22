import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ScrollAreaComponent from '../../components/scroll-area/ScrollAreaComponent.vue'

import { ref } from 'vue'

const meta = {
  title: 'Data/ScrollArea',
  component: ScrollAreaComponent,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    items: { control: 'object' },
    virtualize: { control: 'object' },
  },
  args: {
    orientation: 'vertical',
    items: Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      title: `Элемент ${i + 1}`,
      description: `Описание для элемента ${i + 1}`,
    })),
  },
} as Meta<typeof ScrollAreaComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      title: `Элемент ${i + 1}`,
      description: `Описание для элемента ${i + 1}`,
    })),
  },
  render: (args) => ({
    components: { ScrollAreaComponent },
    setup() {
      return { args }
    },
    template: `
      <ScrollAreaComponent
        v-bind="args"
        class="w-full h-96 scrollbar-thin"
      >
        <template #default="{ item }">
          <div class="p-4 border-b border-gray-200">
            <h3 class="font-semibold">{{ item.title }}</h3>
            <p class="text-sm text-gray-600">{{ item.description }}</p>
          </div>
        </template>
      </ScrollAreaComponent>
    `,
  }),
}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    items: Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      title: `Элемент ${i + 1}`,
      description: `Описание для элемента ${i + 1}`,
    })),
  },
  render: (args) => ({
    components: { ScrollAreaComponent },
    setup() {
      return { args }
    },
    template: `
      <ScrollAreaComponent
        v-bind="args"
        class="w-full h-24 scrollbar-thin"
      >
        <template #default="{ item }">
          <div class="p-4 border-r border-gray-200 min-w-[200px]">
            <h3 class="font-semibold">{{ item.title }}</h3>
            <p class="text-sm text-gray-600">{{ item.description }}</p>
          </div>
        </template>
      </ScrollAreaComponent>
    `,
  }),
}

export const WithVirtualization: Story = {
  args: {
    items: Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      title: `Элемент ${i + 1}`,
      description: `Описание для элемента ${i + 1}`,
    })),
    virtualize: {
      estimateSize: 72,
    },
  },
  render: (args) => ({
    components: { ScrollAreaComponent },
    setup() {
      return { args }
    },
    template: `
      <ScrollAreaComponent
        v-bind="args"
        class="w-full h-96 scrollbar-thin"
      >
        <template #default="{ item }">
          <div class="p-4 border-b border-gray-200">
            <h3 class="font-semibold">{{ item.title }}</h3>
            <p class="text-sm text-gray-600">{{ item.description }}</p>
          </div>
        </template>
      </ScrollAreaComponent>
    `,
  }),
}

export const MasonryLayout: Story = {
  args: {
    items: Array.from({ length: 1000 }, (_, i) => {
      const heights = [320, 480, 640, 800]
      const seed = (i * 11 + 7) % 17
      const height = heights[seed % heights.length]!

      return {
        id: i,
        title: `Элемент ${i + 1}`,
        src: `https://placehold.co/640x${height}?text=${i}`,
        width: 640,
        height,
      }
    }),
    virtualize: {
      gap: 16,
      lanes: 3,
      estimateSize: 480,
    },
  },
  render: (args) => ({
    components: { ScrollAreaComponent },
    setup() {
      return { args }
    },
    template: `
      <ScrollAreaComponent
        v-bind="args"
        class="w-full h-128 p-4 scrollbar-thin"
      >
        <template #default="{ item, index }">
          <img
            :src="item.src"
            :alt="item.title"
            :width="item.width"
            :height="item.height"
            :loading="index > 8 ? 'lazy' : 'eager'"
            class="rounded-md size-full object-cover"
          />
        </template>
      </ScrollAreaComponent>
    `,
  }),
}

export const WithDefaultSlot: Story = {
  args: {},
  render: (args) => ({
    components: { ScrollAreaComponent },
    setup() {
      return { args }
    },
    template: `
      <ScrollAreaComponent
        v-bind="args"
        class="h-96 w-full scrollbar-thin"
        :b24ui="{ viewport: 'gap-4 p-4' }"
      >
        <div class="p-4 border-b border-gray-200">
          <h3 class="font-semibold">Секция 1</h3>
          <p class="text-sm text-gray-600">Кастомный контент без использования пропса items.</p>
        </div>
        <div class="p-4 border-b border-gray-200">
          <h3 class="font-semibold">Секция 2</h3>
          <p class="text-sm text-gray-600">Кастомный контент без использования пропса items.</p>
        </div>
        <div class="p-4 border-b border-gray-200">
          <h3 class="font-semibold">Секция 3</h3>
          <p class="text-sm text-gray-600">Кастомный контент без использования пропса items.</p>
        </div>
        <div class="p-4 border-b border-gray-200">
          <h3 class="font-semibold">Секция 4</h3>
          <p class="text-sm text-gray-600">Кастомный контент без использования пропса items.</p>
        </div>
        <div class="p-4 border-b border-gray-200">
          <h3 class="font-semibold">Секция 5</h3>
          <p class="text-sm text-gray-600">Кастомный контент без использования пропса items.</p>
        </div>
        <div class="p-4">
          <h3 class="font-semibold">Секция 6</h3>
          <p class="text-sm text-gray-600">Кастомный контент без использования пропса items.</p>
        </div>
      </ScrollAreaComponent>
    `,
  }),
}

export const WithProgrammaticScroll: Story = {
  args: {
    items: Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      title: `Элемент ${i + 1}`,
    })),
    virtualize: {
      estimateSize: 72,
    },
  },
  render: (args) => ({
    components: { ScrollAreaComponent },
    setup() {
      const scrollArea = ref<any>(null)
      const targetIndex = ref(500)

      function scrollToTop() {
        scrollArea.value?.virtualizer?.scrollToIndex(0, { align: 'start', behavior: 'smooth' })
      }

      function scrollToBottom() {
        scrollArea.value?.virtualizer?.scrollToIndex(args.items!.length - 1, { align: 'end', behavior: 'smooth' })
      }

      function scrollToItem(index: number) {
        scrollArea.value?.virtualizer?.scrollToIndex(index - 1, { align: 'center', behavior: 'smooth' })
      }

      return { args, scrollArea, targetIndex, scrollToTop, scrollToBottom, scrollToItem }
    },
    template: `
      <div class="w-full">
        <ScrollAreaComponent
          ref="scrollArea"
          v-bind="args"
          class="h-96 w-full scrollbar-thin"
        >
          <template #default="{ item, index }">
            <div
              class="p-4 border-b border-gray-200"
              :class="[index === (targetIndex - 1) && 'bg-blue-100']"
            >
              <h3 class="font-semibold">{{ item.title }}</h3>
            </div>
          </template>
        </ScrollAreaComponent>

        <div class="px-4 py-3 border-t border-gray-200 w-full flex gap-2">
          <button
            @click="scrollToTop"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            В начало
          </button>
          <button
            @click="scrollToBottom"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            В конец
          </button>
          <button
            @click="scrollToItem(targetIndex)"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Перейти к {{ targetIndex }}
          </button>
        </div>
      </div>
    `,
  }),
}

export const WithScrollEvent: Story = {
  args: {
    items: Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      title: `Элемент ${i + 1}`,
      description: `Описание для элемента ${i + 1}`,
    })),
  },
  render: (args) => ({
    components: { ScrollAreaComponent },
    setup() {
      const isScrolling = ref(false)

      function handleScroll(scrolling: boolean) {
        isScrolling.value = scrolling
      }

      return { args, isScrolling, handleScroll }
    },
    template: `
      <div class="w-full">
        <div class="px-4 py-2 bg-gray-100 border-b">
          <p class="text-sm">
            Статус прокрутки: <strong>{{ isScrolling ? 'Прокручивается' : 'Остановлено' }}</strong>
          </p>
        </div>
        <ScrollAreaComponent
          v-bind="args"
          class="w-full h-96 scrollbar-thin"
          @scroll="handleScroll"
        >
          <template #default="{ item }">
            <div class="p-4 border-b border-gray-200">
              <h3 class="font-semibold">{{ item.title }}</h3>
              <p class="text-sm text-gray-600">{{ item.description }}</p>
            </div>
          </template>
        </ScrollAreaComponent>
      </div>
    `,
  }),
}

export const InContext: Story = {
  args: {
    items: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      title: `Элемент ${i + 1}`,
      description: `Описание для элемента ${i + 1}`,
    })),
  },
  render: (args) => ({
    components: { ScrollAreaComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-4xl space-y-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">ScrollArea</h1>
          <p class="text-gray-600">
            Гибкий компонент прокручиваемой области с поддержкой виртуализации для работы с большими наборами данных.
          </p>
        </div>
        <ScrollAreaComponent
          v-bind="args"
          class="w-full h-96 border border-gray-200 rounded-lg scrollbar-thin"
        >
          <template #default="{ item }">
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50">
              <h3 class="font-semibold">{{ item.title }}</h3>
              <p class="text-sm text-gray-600">{{ item.description }}</p>
            </div>
          </template>
        </ScrollAreaComponent>
      </div>
    `,
  }),
