import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AccordionComponent from '../../components/accordion/AccordionComponent.vue'
import type { AccordionModel, AccordionType } from '../../components/accordion/model'
import SmartActivityIcon from '@bitrix24/b24icons-vue/outline/SmartActivityIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/outline/FeedbackIcon'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'
import type { AccordionItem } from '@bitrix24/b24ui-nuxt'

const meta = {
  title: 'UI/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    trailingIcon: { control: 'object' },
    labelKey: { control: 'text' },
    collapsible: { control: 'boolean' },
    defaultValue: { control: 'text' },
    modelValue: { control: 'text' },
    type: {
      control: 'select',
      options: ['single', 'multiple'] as AccordionType[],
    },
    disabled: { control: 'boolean' },
    unmountOnHide: { control: 'boolean' },
  },
  args: {
    items: [
      {
        label: 'Начало работы с Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который предлагает полезные инструменты для вашей компании. Это включает чаты и звонки, задачи и проекты, CRM и AI-ассистента.',
      },
      {
        label: 'Основные возможности Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который имеет все инструменты для работы компании и управления бизнесом.',
      },
      {
        label: 'Тарифы Bitrix24 Cloud',
        content: 'Bitrix24 — это онлайн-сервис для управления бизнесом и автоматизации работы. Он содержит инструменты для компаний всех размеров и отраслей. Bitrix24 имеет несколько тарифов с разными наборами инструментов, которые подходят для разных типов бизнеса.',
      },
    ] as AccordionItem[],
    type: 'single',
    collapsible: true,
    unmountOnHide: true,
  } as Partial<AccordionModel>,
} as Meta<typeof AccordionComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<AccordionModel>
}

export const Default: Story = {
  args: {
    items: [
      {
        label: 'Начало работы с Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который предлагает полезные инструменты для вашей компании. Это включает чаты и звонки, задачи и проекты, CRM и AI-ассистента.',
      },
      {
        label: 'Основные возможности Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который имеет все инструменты для работы компании и управления бизнесом.',
      },
      {
        label: 'Тарифы Bitrix24 Cloud',
        content: 'Bitrix24 — это онлайн-сервис для управления бизнесом и автоматизации работы. Он содержит инструменты для компаний всех размеров и отраслей. Bitrix24 имеет несколько тарифов с разными наборами инструментов, которые подходят для разных типов бизнеса.',
      },
    ] as AccordionItem[],
  },
}

export const Multiple: Story = {
  args: {
    type: 'multiple',
    items: [
      {
        label: 'Начало работы с Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который предлагает полезные инструменты для вашей компании. Это включает чаты и звонки, задачи и проекты, CRM и AI-ассистента.',
      },
      {
        label: 'Основные возможности Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который имеет все инструменты для работы компании и управления бизнесом.',
      },
      {
        label: 'Тарифы Bitrix24 Cloud',
        content: 'Bitrix24 — это онлайн-сервис для управления бизнесом и автоматизации работы. Он содержит инструменты для компаний всех размеров и отраслей. Bitrix24 имеет несколько тарифов с разными наборами инструментов, которые подходят для разных типов бизнеса.',
      },
    ] as AccordionItem[],
  },
}

export const NotCollapsible: Story = {
  args: {
    collapsible: false,
    items: [
      {
        label: 'Начало работы с Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который предлагает полезные инструменты для вашей компании. Это включает чаты и звонки, задачи и проекты, CRM и AI-ассистента.',
      },
      {
        label: 'Основные возможности Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который имеет все инструменты для работы компании и управления бизнесом.',
      },
      {
        label: 'Тарифы Bitrix24 Cloud',
        content: 'Bitrix24 — это онлайн-сервис для управления бизнесом и автоматизации работы. Он содержит инструменты для компаний всех размеров и отраслей. Bitrix24 имеет несколько тарифов с разными наборами инструментов, которые подходят для разных типов бизнеса.',
      },
    ] as AccordionItem[],
  },
}

export const UnmountOnHide: Story = {
  args: {
    unmountOnHide: false,
    items: [
      {
        label: 'Начало работы с Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который предлагает полезные инструменты для вашей компании. Это включает чаты и звонки, задачи и проекты, CRM и AI-ассистента.',
      },
      {
        label: 'Основные возможности Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который имеет все инструменты для работы компании и управления бизнесом.',
      },
      {
        label: 'Тарифы Bitrix24 Cloud',
        content: 'Bitrix24 — это онлайн-сервис для управления бизнесом и автоматизации работы. Он содержит инструменты для компаний всех размеров и отраслей. Bitrix24 имеет несколько тарифов с разными наборами инструментов, которые подходят для разных типов бизнеса.',
      },
    ] as AccordionItem[],
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    items: [
      {
        label: 'Начало работы с Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который предлагает полезные инструменты для вашей компании. Это включает чаты и звонки, задачи и проекты, CRM и AI-ассистента.',
      },
      {
        label: 'Основные возможности Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который имеет все инструменты для работы компании и управления бизнесом.',
      },
      {
        label: 'Тарифы Bitrix24 Cloud',
        content: 'Bitrix24 — это онлайн-сервис для управления бизнесом и автоматизации работы. Он содержит инструменты для компаний всех размеров и отраслей. Bitrix24 имеет несколько тарифов с разными наборами инструментов, которые подходят для разных типов бизнеса.',
      },
    ] as AccordionItem[],
  },
}

export const WithDisabledItem: Story = {
  args: {
    items: [
      {
        label: 'Начало работы с Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который предлагает полезные инструменты для вашей компании. Это включает чаты и звонки, задачи и проекты, CRM и AI-ассистента.',
      },
      {
        label: 'Основные возможности Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который имеет все инструменты для работы компании и управления бизнесом.',
        disabled: true,
      },
      {
        label: 'Тарифы Bitrix24 Cloud',
        content: 'Bitrix24 — это онлайн-сервис для управления бизнесом и автоматизации работы. Он содержит инструменты для компаний всех размеров и отраслей. Bitrix24 имеет несколько тарифов с разными наборами инструментов, которые подходят для разных типов бизнеса.',
      },
    ] as AccordionItem[],
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      {
        label: 'Начало работы с Bitrix24',
        icon: SmartActivityIcon,
        content: 'Bitrix24 — это онлайн-сервис, который предлагает полезные инструменты для вашей компании. Это включает чаты и звонки, задачи и проекты, CRM и AI-ассистента.',
      },
      {
        label: 'Основные возможности Bitrix24',
        icon: FeedbackIcon,
        content: 'Bitrix24 — это онлайн-сервис, который имеет все инструменты для работы компании и управления бизнесом.',
      },
      {
        label: 'Тарифы Bitrix24 Cloud',
        icon: RocketIcon,
        content: 'Bitrix24 — это онлайн-сервис для управления бизнесом и автоматизации работы. Он содержит инструменты для компаний всех размеров и отраслей. Bitrix24 имеет несколько тарифов с разными наборами инструментов, которые подходят для разных типов бизнеса.',
      },
    ] as AccordionItem[],
  },
}

export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: RocketIcon,
    items: [
      {
        label: 'Начало работы с Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который предлагает полезные инструменты для вашей компании. Это включает чаты и звонки, задачи и проекты, CRM и AI-ассистента.',
      },
      {
        label: 'Основные возможности Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который имеет все инструменты для работы компании и управления бизнесом.',
      },
      {
        label: 'Тарифы Bitrix24 Cloud',
        content: 'Bitrix24 — это онлайн-сервис для управления бизнесом и автоматизации работы. Он содержит инструменты для компаний всех размеров и отраслей. Bitrix24 имеет несколько тарифов с разными наборами инструментов, которые подходят для разных типов бизнеса.',
      },
    ] as AccordionItem[],
  },
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: '1',
    items: [
      {
        label: 'Начало работы с Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который предлагает полезные инструменты для вашей компании. Это включает чаты и звонки, задачи и проекты, CRM и AI-ассистента.',
      },
      {
        label: 'Основные возможности Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который имеет все инструменты для работы компании и управления бизнесом.',
      },
      {
        label: 'Тарифы Bitrix24 Cloud',
        content: 'Bitrix24 — это онлайн-сервис для управления бизнесом и автоматизации работы. Он содержит инструменты для компаний всех размеров и отраслей. Bitrix24 имеет несколько тарифов с разными наборами инструментов, которые подходят для разных типов бизнеса.',
      },
    ] as AccordionItem[],
  },
}

export const WithDefaultValues: Story = {
  args: {
    type: 'multiple',
    defaultValue: ['0', '2'],
    items: [
      {
        label: 'Начало работы с Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который предлагает полезные инструменты для вашей компании. Это включает чаты и звонки, задачи и проекты, CRM и AI-ассистента.',
      },
      {
        label: 'Основные возможности Bitrix24',
        content: 'Bitrix24 — это онлайн-сервис, который имеет все инструменты для работы компании и управления бизнесом.',
      },
      {
        label: 'Тарифы Bitrix24 Cloud',
        content: 'Bitrix24 — это онлайн-сервис для управления бизнесом и автоматизации работы. Он содержит инструменты для компаний всех размеров и отраслей. Bitrix24 имеет несколько тарифов с разными наборами инструментов, которые подходят для разных типов бизнеса.',
      },
    ] as AccordionItem[],
  },
}

export const WithCustomBodySlot: Story = {
  args: {
    items: [
      {
        label: 'Начало работы с Bitrix24',
        icon: SmartActivityIcon,
      },
      {
        label: 'Основные возможности Bitrix24',
        icon: FeedbackIcon,
      },
      {
        label: 'Тарифы Bitrix24 Cloud',
        icon: RocketIcon,
      },
    ] as AccordionItem[],
  },
  render: (args) => ({
    components: { AccordionComponent },
    setup() {
      return { args }
    },
    template: `
      <AccordionComponent v-bind="args">
        <template #body="{ item }">
          Это панель <b>{{ item.label }}</b>.
        </template>
      </AccordionComponent>
    `,
  }),
}

export const WithCustomContentSlot: Story = {
  args: {
    items: [
      {
        label: 'Начало работы с Bitrix24',
        icon: SmartActivityIcon,
      },
      {
        label: 'Основные возможности Bitrix24',
        icon: FeedbackIcon,
      },
      {
        label: 'Тарифы Bitrix24 Cloud',
        icon: RocketIcon,
      },
    ] as AccordionItem[],
  },
  render: (args) => ({
    components: { AccordionComponent },
    setup() {
      return { args }
    },
    template: `
      <AccordionComponent v-bind="args">
        <template #content="{ item }">
          <p class="pb-3.5 text-(length:--ui-font-size-sm) text-(--b24ui-typography-description-color)">
            Это панель <b>{{ item.label }}</b>.
          </p>
        </template>
      </AccordionComponent>
    `,
  }),
}
