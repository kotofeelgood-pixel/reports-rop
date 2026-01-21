import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PageLinksComponent from './PageLinksComponent.vue'
import type { PageLinksModel } from './model'
import type { PageLink } from '@bitrix24/b24ui-nuxt'
import DocumentSignIcon from '@bitrix24/b24icons-vue/main/DocumentSignIcon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'

const meta = {
  title: 'UI/PageLinks',
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
    ] as PageLink[],
  } as Partial<PageLinksModel>,
} as Meta<typeof PageLinksComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<PageLinksModel>
}

export const Default: Story = {
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
    ] as PageLink[],
  },
}

export const WithTitle: Story = {
  args: {
    title: 'Сообщество',
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
    ] as PageLink[],
  },
}

export const WithIcons: Story = {
  args: {
    title: 'Сообщество',
    links: [
      {
        label: 'Редактировать эту страницу',
        icon: DocumentSignIcon,
        to: 'https://github.com/bitrix24/b24ui',
        target: '_blank',
      },
      {
        label: 'Звезда на GitHub',
        icon: AiStarsIcon,
        to: 'https://github.com/bitrix24/b24ui',
        target: '_blank',
      },
      {
        label: 'Релизы',
        icon: RocketIcon,
        to: 'https://github.com/bitrix24/b24ui/releases',
        target: '_blank',
      },
    ] as PageLink[],
  },
}

export const WithTargetBlank: Story = {
  args: {
    title: 'Сообщество',
    links: [
      {
        label: 'Редактировать эту страницу',
        to: 'https://github.com/bitrix24/b24ui',
        target: '_blank',
      },
      {
        label: 'Звезда на GitHub',
        to: 'https://github.com/bitrix24/b24ui',
        target: '_blank',
      },
      {
        label: 'Релизы',
        to: 'https://github.com/bitrix24/b24ui/releases',
        target: '_blank',
      },
    ] as PageLink[],
  },
}

export const ManyLinks: Story = {
  args: {
    title: 'Полезные ссылки',
    links: [
      {
        label: 'Документация',
        to: 'https://bitrix24.github.io/b24ui/',
      },
      {
        label: 'GitHub',
        to: 'https://github.com/bitrix24/b24ui',
      },
      {
        label: 'Релизы',
        to: 'https://github.com/bitrix24/b24ui/releases',
      },
      {
        label: 'Issues',
        to: 'https://github.com/bitrix24/b24ui/issues',
      },
      {
        label: 'Discussions',
        to: 'https://github.com/bitrix24/b24ui/discussions',
      },
    ] as PageLink[],
  },
}

export const WithCustomSlots: Story = {
  args: {
    title: 'Сообщество',
    links: [
      {
        label: 'Редактировать эту страницу',
        icon: DocumentSignIcon,
        to: 'https://github.com/bitrix24/b24ui',
      },
      {
        label: 'Звезда на GitHub',
        icon: AiStarsIcon,
        to: 'https://github.com/bitrix24/b24ui',
      },
      {
        label: 'Релизы',
        icon: RocketIcon,
        to: 'https://github.com/bitrix24/b24ui/releases',
      },
    ] as PageLink[],
  },
  render: (args) => ({
    components: { PageLinksComponent },
    setup() {
      return { args }
    },
    template: `
      <PageLinksComponent v-bind="args">
        <template #title>
          <span class="font-bold text-lg">Кастомный заголовок</span>
        </template>
      </PageLinksComponent>
    `,
  }),
}

export const InContext: Story = {
  args: {
    title: 'Сообщество',
    links: [
      {
        label: 'Редактировать эту страницу',
        icon: DocumentSignIcon,
        to: 'https://github.com/bitrix24/b24ui',
        target: '_blank',
      },
      {
        label: 'Звезда на GitHub',
        icon: AiStarsIcon,
        to: 'https://github.com/bitrix24/b24ui',
        target: '_blank',
      },
      {
        label: 'Релизы',
        icon: RocketIcon,
        to: 'https://github.com/bitrix24/b24ui/releases',
        target: '_blank',
      },
    ] as PageLink[],
  },
  render: (args) => ({
    components: { PageLinksComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-md space-y-4">
        <div>
          <h2 class="text-2xl font-bold mb-2">Заголовок страницы</h2>
          <p>Содержимое страницы...</p>
        </div>
        <div class="border-t pt-4">
          <PageLinksComponent v-bind="args" />
        </div>
      </div>
    `,
  }),
}
