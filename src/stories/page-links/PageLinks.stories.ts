import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PageLinksComponent from '../../components/page-links/PageLinksComponent.vue'



const meta = {
  title: 'Page/PageLinks',
  component: PageLinksComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    links: { control: 'object' },
  },
  args: {
    links: [
      {
        label: 'Редактировать эту страницу',
        to: 'https://github.com/bitrix24/b24ui',
      },
      {
        label: 'Звезда на GitHub',
        to: 'https://github.com/bitrix24/b24ui',
      },
      {
        label: 'Релизы',
        to: 'https://github.com/bitrix24/b24ui/releases',
      },
    ],
  },
} as Meta<typeof PageLinksComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

