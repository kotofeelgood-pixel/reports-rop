import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LocaleSelectComponent from '../../../components/i18n/locale-select/LocaleSelectComponent.vue'
import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'i18n/LocaleSelect',
  component: LocaleSelectComponent,
  argTypes: {
    locales: { control: 'object' },
  },
  args: {
    locales: ['ru', 'en', 'de', 'fr'],
  },
} as Meta<typeof LocaleSelectComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

