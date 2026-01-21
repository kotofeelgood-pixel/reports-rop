import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NavigationMenuComponent from '../../../components/navigation/navigation-menu/NavigationMenuComponent.vue'
import type { NavigationMenuModel } from '../../../components/navigation/navigation-menu/model'
import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Navigation/NavigationMenu',
  component: NavigationMenuComponent,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    orientation: 'horizontal',
  } as Partial<NavigationMenuModel>,
} as Meta<typeof NavigationMenuComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<NavigationMenuModel>
}

export const Default: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => ({
    components: { NavigationMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <NavigationMenuComponent v-bind="args">
        <a href="/" class="px-4 py-2">Главная</a>
        <a href="/docs" class="px-4 py-2">Документация</a>
        <a href="/about" class="px-4 py-2">О нас</a>
      </NavigationMenuComponent>
    `,
  }),
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => ({
    components: { NavigationMenuComponent },
    setup() {
      return { args }
    },
    template: `
      <NavigationMenuComponent v-bind="args">
        <a href="/" class="block px-4 py-2">Главная</a>
        <a href="/docs" class="block px-4 py-2">Документация</a>
        <a href="/about" class="block px-4 py-2">О нас</a>
      </NavigationMenuComponent>
    `,
  }),
}
