import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AccordionComponent from '../../components/accordion/AccordionComponent.vue'

import { commonMeta } from '../meta'

const meta = {
  ...commonMeta,
  title: 'Data/Accordion',
  component: AccordionComponent,
  argTypes: {
    items: { control: 'object' },
    trailingIcon: { control: 'object' },
    labelKey: { control: 'text' },
    collapsible: { control: 'boolean' },
    defaultValue: { control: 'text' },
    modelValue: { control: 'text' },
    type: {
      control: 'select',
      options: ['single', 'multiple'],
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
    ],
    type: 'single',
    collapsible: true,
    unmountOnHide: true,
  },
} as Meta<typeof AccordionComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

