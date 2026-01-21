import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ToastComponent from '../../components/toast/ToastComponent.vue'
import type { ToastModel, ToastColor, ToastOrientation } from '../../components/toast/model'
import { useToast } from '@bitrix24/b24ui-nuxt'
import CalendarWithSlotsIcon from '@bitrix24/b24icons-vue/outline/CalendarWithSlotsIcon'
import CopilotAiIcon from '@bitrix24/b24icons-vue/main/CopilotAiIcon'
import CheckLIcon from '@bitrix24/b24icons-vue/outline/CheckLIcon'
import UploadIcon from '@bitrix24/b24icons-vue/outline/UploadIcon'
import Refresh9Icon from '@bitrix24/b24icons-vue/crm/Refresh9Icon'
import ArrowToTheRightIcon from '@bitrix24/b24icons-vue/actions/ArrowToTheRightIcon'
import PlusLIcon from '@bitrix24/b24icons-vue/outline/PlusLIcon'

const meta = {
  title: 'UI/Toast',
  component: ToastComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    color: {
      control: 'select',
      options: [
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-warning',
        'air-primary-copilot',
        'air-secondary',
      ] as ToastColor[],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'] as ToastOrientation[],
    },
    close: { control: 'object' },
    progress: { control: 'object' },
  },
  args: {
    title: 'Уведомление',
    color: 'air-secondary',
    orientation: 'vertical',
    close: true,
    progress: true,
  } as Partial<ToastModel>,
} as Meta<typeof ToastComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<ToastModel>
}

export const Default: Story = {
  render: () => ({
    setup() {
      const toast = useToast()

      function showToast() {
        toast.add({
          title: 'Событие добавлено в календарь',
          description: 'Это событие запланировано на 15 января 2024 года.',
          icon: CalendarWithSlotsIcon,
        })
      }

      return { showToast, PlusLIcon }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="showToast"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <PlusLIcon class="w-5 h-5" />
          Добавить в календарь
        </button>
        <p class="text-sm text-gray-600">
          Нажмите на кнопку, чтобы показать Toast уведомление
        </p>
      </div>
    `,
  }),
}

export const WithTitle: Story = {
  render: () => ({
    setup() {
      const toast = useToast()

      function showToast() {
        toast.add({
          title: 'Уведомление',
        })
      }

      return { showToast }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="showToast"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Показать Toast с заголовком
        </button>
      </div>
    `,
  }),
}

export const WithDescription: Story = {
  render: () => ({
    setup() {
      const toast = useToast()

      function showToast() {
        toast.add({
          title: 'Уведомление',
          description: 'Это описание уведомления. Оно содержит дополнительную информацию.',
        })
      }

      return { showToast }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="showToast"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Показать Toast с описанием
        </button>
      </div>
    `,
  }),
}

export const WithIcon: Story = {
  render: () => ({
    setup() {
      const toast = useToast()

      function showToast() {
        toast.add({
          title: 'Ой! Что-то пошло не так.',
          description: 'Возникла проблема с вашим запросом.',
          icon: CopilotAiIcon,
        })
      }

      return { showToast, CopilotAiIcon }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="showToast"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Показать Toast с иконкой
        </button>
      </div>
    `,
  }),
}

export const WithAvatar: Story = {
  render: () => ({
    setup() {
      const toast = useToast()

      function showToast() {
        toast.add({
          title: 'Расчет показателей завершен',
          description: 'Нужна ли вам еще какая-то помощь?',
          avatar: {
            src: '/b24ui/avatar/assistant.png',
          },
        })
      }

      return { showToast }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="showToast"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Показать Toast с аватаром
        </button>
      </div>
    `,
  }),
}

export const WithColor: Story = {
  render: () => ({
    setup() {
      const toast = useToast()

      function showToast() {
        toast.add({
          title: 'Ой! Что-то пошло не так.',
          description: 'Возникла проблема с вашим запросом.',
          icon: CopilotAiIcon,
          color: 'air-primary-alert',
        })
      }

      return { showToast }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="showToast"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Показать Toast с цветом Alert
        </button>
      </div>
    `,
  }),
}

export const AllColors: Story = {
  render: () => ({
    setup() {
      const toast = useToast()

      function showToast(color: ToastColor, label: string) {
        toast.add({
          title: label,
          color,
        })
      }

      return { showToast }
    },
    template: `
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-2">
          <button 
            @click="showToast('air-primary', 'Primary')"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Primary
          </button>
          <button 
            @click="showToast('air-primary-success', 'Success')"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Success
          </button>
          <button 
            @click="showToast('air-primary-alert', 'Alert')"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Alert
          </button>
          <button 
            @click="showToast('air-primary-warning', 'Warning')"
            class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Warning
          </button>
          <button 
            @click="showToast('air-primary-copilot', 'Copilot')"
            class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Copilot
          </button>
          <button 
            @click="showToast('air-secondary', 'Secondary')"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Secondary
          </button>
        </div>
      </div>
    `,
  }),
}

export const WithCloseButton: Story = {
  render: () => ({
    setup() {
      const toast = useToast()

      function showToast() {
        toast.add({
          title: 'Уведомление',
          description: 'Это уведомление можно закрыть.',
          close: {
            color: 'air-primary-copilot',
            class: 'rounded-full',
          },
        })
      }

      return { showToast }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="showToast"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Показать Toast с кнопкой закрытия
        </button>
      </div>
    `,
  }),
}

export const WithoutCloseButton: Story = {
  render: () => ({
    setup() {
      const toast = useToast()

      function showToast() {
        toast.add({
          title: 'Уведомление',
          description: 'Это уведомление нельзя закрыть вручную.',
          close: false,
        })
      }

      return { showToast }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="showToast"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Показать Toast без кнопки закрытия
        </button>
      </div>
    `,
  }),
}

export const WithCustomCloseIcon: Story = {
  render: () => ({
    setup() {
      const toast = useToast()

      function showToast() {
        toast.add({
          title: 'Уведомление',
          description: 'Уведомление с кастомной иконкой закрытия.',
          closeIcon: ArrowToTheRightIcon,
        })
      }

      return { showToast }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="showToast"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Показать Toast с кастомной иконкой закрытия
        </button>
      </div>
    `,
  }),
}

export const WithActions: Story = {
  render: () => ({
    setup() {
      const toast = useToast()

      function showToast() {
        toast.add({
          title: 'Ой! Что-то пошло не так.',
          description: 'Возникла проблема с вашим запросом.',
          actions: [
            {
              icon: Refresh9Icon,
              label: 'Повторить',
              color: 'air-secondary-accent-2',
              onClick: (e: Event) => {
                e?.stopPropagation()
                console.log('Повторить')
              },
            },
          ],
        })
      }

      return { showToast }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="showToast"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Показать Toast с действиями
        </button>
      </div>
    `,
  }),
}

export const WithoutProgress: Story = {
  render: () => ({
    setup() {
      const toast = useToast()

      function showToast() {
        toast.add({
          title: 'Уведомление',
          description: 'Это уведомление без индикатора прогресса.',
          progress: false,
        })
      }

      return { showToast }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="showToast"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Показать Toast без прогресса
        </button>
      </div>
    `,
  }),
}

export const Horizontal: Story = {
  render: () => ({
    setup() {
      const toast = useToast()

      function showToast() {
        toast.add({
          title: 'Уведомление',
          orientation: 'horizontal',
          actions: [
            {
              icon: Refresh9Icon,
              label: 'Повторить',
              color: 'air-secondary-accent-2',
            },
          ],
        })
      }

      return { showToast }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="showToast"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Показать горизонтальный Toast
        </button>
      </div>
    `,
  }),
}

export const SuccessToast: Story = {
  render: () => ({
    setup() {
      const toast = useToast()

      function showToast() {
        toast.add({
          title: 'Файл загружен!',
          description: 'Ваш файл был успешно загружен.',
          icon: CheckLIcon,
          color: 'air-primary-success',
        })
      }

      return { showToast }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="showToast"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Показать успешный Toast
        </button>
      </div>
    `,
  }),
}

export const LoadingToast: Story = {
  render: () => ({
    setup() {
      const toast = useToast()

      function showToast() {
        toast.add({
          title: 'Загрузка файла...',
          description: 'Ваш файл загружается.',
          icon: UploadIcon,
        })
      }

      return { showToast }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="showToast"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Показать Toast о загрузке
        </button>
      </div>
    `,
  }),
}

export const WithCallback: Story = {
  render: () => ({
    setup() {
      const toast = useToast()

      function showToast() {
        toast.add({
          title: 'Загрузка файла...',
          description: 'Ваш файл загружается.',
          icon: UploadIcon,
          duration: 3000,
          'onUpdate:open': (open: boolean) => {
            if (!open) {
              toast.add({
                title: 'Файл загружен!',
                description: 'Ваш файл был успешно загружен.',
                icon: CheckLIcon,
                color: 'air-primary-success',
              })
            }
          },
        })
      }

      return { showToast }
    },
    template: `
      <div class="space-y-4">
        <button 
          @click="showToast"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Показать Toast с callback
        </button>
        <p class="text-sm text-gray-600">
          Когда первое уведомление закроется, появится второе уведомление об успехе
        </p>
      </div>
    `,
  }),
}

export const InContext: Story = {
  render: () => ({
    setup() {
      const toast = useToast()

      function showToast() {
        toast.add({
          title: 'Событие добавлено в календарь',
          description: 'Это событие запланировано на 15 января 2024 года.',
          icon: CalendarWithSlotsIcon,
        })
      }

      return { showToast, PlusLIcon }
    },
    template: `
      <div class="max-w-4xl space-y-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">Toast</h1>
          <p class="text-gray-600">
            Компонент для отображения коротких сообщений, предлагающих информацию или обратную связь пользователю.
          </p>
        </div>
        <div class="border rounded-lg p-8">
          <button 
            @click="showToast"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
          >
            <PlusLIcon class="w-5 h-5" />
            Добавить в календарь
          </button>
          <p class="text-sm text-gray-600 mt-4">
            Toast обычно используется через composable useToast() для программного отображения уведомлений.
          </p>
        </div>
      </div>
    `,
  }),
}
