import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AdviceComponent from '../../components/advice/AdviceComponent.vue'
import type { AdviceModel, AdviceAngle } from '../../components/advice/model'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import DotsIcon from '@bitrix24/b24icons-vue/button/DotsIcon'

const meta = {
  title: 'UI/Advice',
  component: AdviceComponent,
  tags: ['autodocs'],
  argTypes: {
    description: { control: 'text' },
    icon: { control: 'object' },
    avatar: { control: 'object' },
    angle: {
      control: 'select',
      options: ['bottom', 'top'] as AdviceAngle[],
    },
  },
  args: {
    description: 'Давайте сообщим менеджеру, что сделка не двигается, менеджер не перезванивает клиенту и не отвечает на его сообщения. Давайте назначим задачу менеджеру от имени менеджера',
    angle: 'bottom',
  } as Partial<AdviceModel>,
} as Meta<typeof AdviceComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<AdviceModel>
}

export const Default: Story = {
  args: {
    description: 'Давайте сообщим менеджеру, что сделка не двигается, менеджер не перезванивает клиенту и не отвечает на его сообщения. Давайте назначим задачу менеджеру от имени менеджера',
  },
}

export const WithIcon: Story = {
  args: {
    icon: RocketIcon,
    description: 'Давайте сообщим менеджеру, что сделка не двигается, менеджер не перезванивает клиенту и не отвечает на его сообщения. Давайте назначим задачу менеджеру от имени менеджера',
  },
}

export const WithAvatar: Story = {
  args: {
    avatar: {
      src: '/b24ui/avatar/employee.png',
    },
    description: 'Давайте сообщим менеджеру, что сделка не двигается, менеджер не перезванивает клиенту и не отвечает на его сообщения. Давайте назначим задачу менеджеру от имени менеджера',
  },
}

export const AngleTop: Story = {
  args: {
    angle: 'top',
    avatar: {
      src: '/b24ui/avatar/employee.png',
    },
    description: 'Давайте сообщим менеджеру, что сделка не двигается, менеджер не перезванивает клиенту и не отвечает на его сообщения. Давайте назначим задачу менеджеру от имени менеджера',
  },
}

export const AngleBottom: Story = {
  args: {
    angle: 'bottom',
    avatar: {
      src: '/b24ui/avatar/employee.png',
    },
    description: 'Давайте сообщим менеджеру, что сделка не двигается, менеджер не перезванивает клиенту и не отвечает на его сообщения. Давайте назначим задачу менеджеру от имени менеджера',
  },
}

export const WithCustomSlot: Story = {
  args: {
    avatar: {
      src: '/b24ui/avatar/assistant.png',
    },
  },
  render: (args) => ({
    components: { AdviceComponent },
    setup() {
      return { args }
    },
    template: `
      <AdviceComponent v-bind="args">
        <span>Обычно инструкции о том, как добавить SAML-приложение и добавить URL ACS и SP Entity ID, можно найти в технической документации Microsoft Azure. </span>
        <a href="https://github.com/bitrix24/b24ui/" target="_blank" class="text-blue-500 hover:underline">
          Читать далее
        </a>
      </AdviceComponent>
    `,
  }),
}

export const WithCustomSlotComplex: Story = {
  args: {
    angle: 'top',
    avatar: {
      src: '/b24ui/avatar/employee.png',
    },
  },
  render: (args) => ({
    components: { AdviceComponent },
    setup() {
      return { args, DotsIcon }
    },
    template: `
      <AdviceComponent v-bind="args">
        <div class="flex flex-col items-start justify-between gap-1.5">
          <div class="font-bold">
            Справочная информация
          </div>
          <div>Обычно инструкции о том, как добавить SAML-приложение и добавить URL ACS и SP Entity ID, можно найти в технической документации Microsoft Azure.</div>
          <div class="mt-2 flex flex-row flex-wrap items-start justify-between gap-2">
            <button class="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
              Действие 1
            </button>
            <button class="px-3 py-1 text-xs bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
              Действие 2
            </button>
            <button class="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        </div>
      </AdviceComponent>
    `,
  }),
}

export const WithIconAndDescription: Story = {
  args: {
    icon: RocketIcon,
    description: 'Давайте сообщим менеджеру, что сделка не двигается, менеджер не перезванивает клиенту и не отвечает на его сообщения. Давайте назначим задачу менеджеру от имени менеджера',
  },
}

export const WithAvatarAndIcon: Story = {
  args: {
    avatar: {
      icon: RocketIcon,
    },
    description: 'Давайте сообщим менеджеру, что сделка не двигается, менеджер не перезванивает клиенту и не отвечает на его сообщения. Давайте назначим задачу менеджеру от имени менеджера',
  },
}
