import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PageCardComponent from '../../../components/page/page-card/PageCardComponent.vue'

import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Page/PageCard',
  component: PageCardComponent,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    href: { control: 'text' },
  },
  args: {
    title: 'Заголовок карточки',
    description: 'Описание карточки',
    href: '/',
  ,},
} as Meta<typeof PageCardComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Заголовок карточки',
    description: 'Описание карточки',
    href: '/',
  },
}

export const WithoutDescription: Story = {
  args: {
    title: 'Заголовок карточки',
    href: '/',
  },
}

export const WithoutLink: Story = {
  args: {
    title: 'Заголовок карточки',
    description: 'Описание карточки',
  },
