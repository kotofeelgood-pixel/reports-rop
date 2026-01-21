import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PageCardComponent from '../../../components/page/page-card/PageCardComponent.vue'
import type { PageCardModel } from '../../../components/page/page-card/model'
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
  } as Partial<PageCardModel>,
} as Meta<typeof PageCardComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<PageCardModel>
}

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
}
