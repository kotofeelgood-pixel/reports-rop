import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ModalComponent from '../../components/modal/ModalComponent.vue'
import type { ModalModel } from '../../components/modal/model'
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'
import { ref } from 'vue'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

const meta = {
  title: 'UI/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    overlay: { control: 'boolean' },
    scrollable: { control: 'boolean' },
    overlayBlur: {
      control: 'select',
      options: ['auto', 'on', 'off'],
    },
    transition: { control: 'boolean' },
    fullscreen: { control: 'boolean' },
    dismissible: { control: 'boolean' },
    modal: { control: 'boolean' },
    close: { control: 'object' },
  },
  args: {
    title: 'Модальное окно',
    overlay: true,
    scrollable: false,
    overlayBlur: 'auto',
    transition: true,
    fullscreen: false,
    dismissible: true,
    modal: true,
    close: true,
  } as Partial<ModalModel>,
} as Meta<typeof ModalComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<ModalModel>
}

export const Default: Story = {
  args: {
    title: 'Модальное окно',
  },
  render: (args) => ({
    components: { ModalComponent },
    setup() {
      return { args }
    },
    template: `
      <ModalComponent v-bind="args">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Открыть
        </button>
        <template #content>
          <div class="h-48 flex items-center justify-center bg-gray-100 rounded">
            <p class="text-gray-600">Содержимое модального окна</p>
          </div>
        </template>
      </ModalComponent>
    `,
  }),
}

export const WithTitle: Story = {
  args: {
    title: 'Модальное окно с заголовком',
  },
  render: (args) => ({
    components: { ModalComponent },
    setup() {
      return { args }
    },
    template: `
      <ModalComponent v-bind="args">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Открыть
        </button>
        <template #body>
          <div class="h-48 flex items-center justify-center bg-gray-100 rounded">
            <p class="text-gray-600">Содержимое модального окна</p>
          </div>
        </template>
      </ModalComponent>
    `,
  }),
}

export const WithDescription: Story = {
  args: {
    title: 'Модальное окно с описанием',
    description: 'Это описание модального окна. Оно помогает пользователю понять, что происходит.',
  },
  render: (args) => ({
    components: { ModalComponent },
    setup() {
      return { args }
    },
    template: `
      <ModalComponent v-bind="args">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Открыть
        </button>
        <template #body>
          <div class="h-48 flex items-center justify-center bg-gray-100 rounded">
            <p class="text-gray-600">Содержимое модального окна</p>
          </div>
        </template>
      </ModalComponent>
    `,
  }),
}

export const WithCloseButton: Story = {
  args: {
    title: 'Модальное окно с кнопкой закрытия',
    close: {
      color: 'air-secondary-accent-2',
      class: 'rounded-full',
    } as ButtonProps,
  },
  render: (args) => ({
    components: { ModalComponent },
    setup() {
      return { args }
    },
    template: `
      <ModalComponent v-bind="args">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Открыть
        </button>
        <template #body>
          <div class="h-48 flex items-center justify-center bg-gray-100 rounded">
            <p class="text-gray-600">Содержимое модального окна</p>
          </div>
        </template>
      </ModalComponent>
    `,
  }),
}

export const WithoutCloseButton: Story = {
  args: {
    title: 'Модальное окно без кнопки закрытия',
    close: false,
  },
  render: (args) => ({
    components: { ModalComponent },
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="open = true"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Открыть
        </button>
        <ModalComponent v-bind="args" v-model:open="open">
          <template #body>
            <div class="h-48 flex items-center justify-center bg-gray-100 rounded">
              <p class="text-gray-600">Содержимое модального окна</p>
            </div>
            <div class="mt-4">
              <button 
                @click="open = false"
                class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Закрыть
              </button>
            </div>
          </template>
        </ModalComponent>
      </div>
    `,
  }),
}

export const WithCustomCloseIcon: Story = {
  args: {
    title: 'Модальное окно с кастомной иконкой закрытия',
    closeIcon: RocketIcon,
  },
  render: (args) => ({
    components: { ModalComponent },
    setup() {
      return { args, RocketIcon }
    },
    template: `
      <ModalComponent v-bind="args">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Открыть
        </button>
        <template #body>
          <div class="h-48 flex items-center justify-center bg-gray-100 rounded">
            <p class="text-gray-600">Содержимое модального окна</p>
          </div>
        </template>
      </ModalComponent>
    `,
  }),
}

export const WithoutTransition: Story = {
  args: {
    title: 'Модальное окно без анимации',
    transition: false,
  },
  render: (args) => ({
    components: { ModalComponent },
    setup() {
      return { args }
    },
    template: `
      <ModalComponent v-bind="args">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Открыть
        </button>
        <template #body>
          <div class="h-48 flex items-center justify-center bg-gray-100 rounded">
            <p class="text-gray-600">Содержимое модального окна</p>
          </div>
        </template>
      </ModalComponent>
    `,
  }),
}

export const WithoutOverlay: Story = {
  args: {
    title: 'Модальное окно без фона',
    overlay: false,
  },
  render: (args) => ({
    components: { ModalComponent },
    setup() {
      return { args }
    },
    template: `
      <ModalComponent v-bind="args">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Открыть
        </button>
        <template #body>
          <div class="h-48 flex items-center justify-center bg-gray-100 rounded">
            <p class="text-gray-600">Содержимое модального окна</p>
          </div>
        </template>
      </ModalComponent>
    `,
  }),
}

export const WithOverlayBlur: Story = {
  args: {
    title: 'Модальное окно с размытием фона',
    overlayBlur: 'on',
  },
  render: (args) => ({
    components: { ModalComponent },
    setup() {
      return { args }
    },
    template: `
      <ModalComponent v-bind="args">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Открыть
        </button>
        <template #body>
          <div class="h-48 flex items-center justify-center bg-gray-100 rounded">
            <p class="text-gray-600">Содержимое модального окна</p>
          </div>
        </template>
      </ModalComponent>
    `,
  }),
}

export const Scrollable: Story = {
  args: {
    title: 'Прокручиваемое модальное окно',
    scrollable: true,
  },
  render: (args) => ({
    components: { ModalComponent },
    setup() {
      return { args }
    },
    template: `
      <ModalComponent v-bind="args">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Открыть
        </button>
        <template #body>
          <div class="space-y-4">
            <div v-for="i in 20" :key="i" class="p-4 bg-gray-100 rounded">
              <p>Элемент {{ i }}</p>
            </div>
          </div>
        </template>
      </ModalComponent>
    `,
  }),
}

export const Fullscreen: Story = {
  args: {
    title: 'Полноэкранное модальное окно',
    fullscreen: true,
  },
  render: (args) => ({
    components: { ModalComponent },
    setup() {
      return { args }
    },
    template: `
      <ModalComponent v-bind="args">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Открыть
        </button>
        <template #body>
          <div class="h-full flex items-center justify-center bg-gray-100 rounded">
            <p class="text-gray-600">Полноэкранное содержимое</p>
          </div>
        </template>
      </ModalComponent>
    `,
  }),
}

export const NonModal: Story = {
  args: {
    title: 'Не модальное окно',
    modal: false,
  },
  render: (args) => ({
    components: { ModalComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-4">
        <ModalComponent v-bind="args">
          <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Открыть
          </button>
          <template #body>
            <div class="h-48 flex items-center justify-center bg-gray-100 rounded">
              <p class="text-gray-600">Содержимое модального окна</p>
            </div>
          </template>
        </ModalComponent>
        <p class="text-sm text-gray-600">
          В не модальном режиме можно взаимодействовать с контентом за окном
        </p>
      </div>
    `,
  }),
}

export const NonDismissible: Story = {
  args: {
    title: 'Недопускающее закрытие модальное окно',
    dismissible: false,
  },
  render: (args) => ({
    components: { ModalComponent },
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="open = true"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Открыть
        </button>
        <ModalComponent v-bind="args" v-model:open="open">
          <template #body>
            <div class="h-48 flex items-center justify-center bg-gray-100 rounded">
              <p class="text-gray-600">Это окно нельзя закрыть кликом вне его или нажатием Escape</p>
            </div>
            <div class="mt-4">
              <button 
                @click="open = false"
                class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Закрыть программно
              </button>
            </div>
          </template>
        </ModalComponent>
      </div>
    `,
  }),
}

export const WithFooter: Story = {
  args: {
    title: 'Модальное окно с футером',
    description: 'Используйте слот footer для добавления кнопок действий',
  },
  render: (args) => ({
    components: { ModalComponent },
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="open = true"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Открыть
        </button>
        <ModalComponent v-bind="args" v-model:open="open" :b24ui="{ footer: 'justify-end' }">
          <template #body>
            <div class="h-48 flex items-center justify-center bg-gray-100 rounded">
              <p class="text-gray-600">Содержимое модального окна</p>
            </div>
          </template>
          <template #footer="{ close }">
            <button 
              @click="open = false"
              class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Отмена
            </button>
            <button 
              @click="open = false"
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Подтвердить
            </button>
          </template>
        </ModalComponent>
      </div>
    `,
  }),
}

export const WithModelValue: Story = {
  args: {
    title: 'Управление через v-model:open',
  },
  render: (args) => ({
    components: { ModalComponent },
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="open = !open"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {{ open ? 'Закрыть' : 'Открыть' }}
        </button>
        <ModalComponent v-bind="args" v-model:open="open">
          <template #body>
            <div class="h-48 flex items-center justify-center bg-gray-100 rounded">
              <p class="text-gray-600">Состояние: {{ open ? 'Открыто' : 'Закрыто' }}</p>
            </div>
          </template>
        </ModalComponent>
        <div class="text-sm text-gray-600">
          Текущее состояние: <strong>{{ open ? 'Открыто' : 'Закрыто' }}</strong>
        </div>
      </div>
    `,
  }),
}

export const NestedModals: Story = {
  render: () => ({
    components: { ModalComponent },
    setup() {
      const first = ref(false)
      const second = ref(false)
      return { first, second }
    },
    template: `
      <div class="space-y-4">
        <ModalComponent v-model:open="first" title="Первое модальное окно" :b24ui="{ footer: 'justify-end' }">
          <button 
            @click="first = true"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Открыть первое
          </button>
          <template #footer>
            <button 
              @click="first = false"
              class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Закрыть
            </button>
            <ModalComponent v-model:open="second" title="Второе модальное окно" :b24ui="{ footer: 'justify-end' }">
              <button 
                @click="second = true"
                class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Открыть второе
              </button>
              <template #footer>
                <button 
                  @click="second = false"
                  class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Закрыть
                </button>
              </template>
            </ModalComponent>
          </template>
        </ModalComponent>
      </div>
    `,
  }),
}

export const FormModal: Story = {
  args: {
    title: 'Форма в модальном окне',
    description: 'Пример использования формы внутри модального окна',
  },
  render: (args) => ({
    components: { ModalComponent },
    setup() {
      const open = ref(false)
      const formData = ref({
        name: '',
        email: '',
      })

      function handleSubmit() {
        console.log('Отправка формы:', formData.value)
        open.value = false
      }

      return { args, open, formData, handleSubmit }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="open = true"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Открыть форму
        </button>
        <ModalComponent v-bind="args" v-model:open="open" :b24ui="{ footer: 'justify-end' }">
          <template #body>
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Имя</label>
                <input
                  v-model="formData.name"
                  type="text"
                  class="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Email</label>
                <input
                  v-model="formData.email"
                  type="email"
                  class="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
            </form>
          </template>
          <template #footer>
            <button 
              @click="open = false"
              class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Отмена
            </button>
            <button 
              @click="handleSubmit"
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Отправить
            </button>
          </template>
        </ModalComponent>
      </div>
    `,
  }),
}

export const InContext: Story = {
  args: {
    title: 'Модальное окно',
    description: 'Компонент для отображения модальных окон с различными настройками',
  },
  render: (args) => ({
    components: { ModalComponent },
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div class="max-w-4xl space-y-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">Modal</h1>
          <p class="text-gray-600">
            Компонент модального окна для отображения сообщений или сбора пользовательского ввода.
          </p>
        </div>
        <div class="border rounded-lg p-8">
          <button 
            @click="open = true"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Открыть модальное окно
          </button>
          <ModalComponent v-bind="args" v-model:open="open">
            <template #body>
              <div class="h-48 flex items-center justify-center bg-gray-100 rounded">
                <p class="text-gray-600">Содержимое модального окна</p>
              </div>
            </template>
          </ModalComponent>
        </div>
      </div>
    `,
  }),
}
