import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LocaleSelectComponent from '../../../components/i18n/locale-select/LocaleSelectComponent.vue'
import type { LocaleSelectModel } from '../../../components/i18n/locale-select/model'
import { commonMeta } from '../../meta'
import { ref } from 'vue'

const meta = {
  ...commonMeta,
  title: 'i18n/LocaleSelect',
  component: LocaleSelectComponent,
  argTypes: {
    locales: { control: 'object' },
  },
  args: {
    locales: ['ru', 'en', 'de', 'fr'],
  } as Partial<LocaleSelectModel>,
} as Meta<typeof LocaleSelectComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<LocaleSelectModel>
}

export const Default: Story = {
  args: {
    locales: ['ru', 'en', 'de', 'fr'],
  },
  render: (args) => ({
    components: { LocaleSelectComponent },
    setup() {
      const locale = ref<string | undefined>('ru')
      return { args, locale }
    },
    template: `
      <LocaleSelectComponent v-bind="args" v-model="locale" />
    `,
  }),
}

export const WithDefaultValue: Story = {
  args: {
    locales: ['ru', 'en', 'de', 'fr'],
    defaultValue: 'en',
  },
  render: (args) => ({
    components: { LocaleSelectComponent },
    setup() {
      const locale = ref<string | undefined>(args.defaultValue)
      return { args, locale }
    },
    template: `
      <LocaleSelectComponent v-bind="args" v-model="locale" />
    `,
  }),
}

export const TwoLocales: Story = {
  args: {
    locales: ['ru', 'en'],
  },
  render: (args) => ({
    components: { LocaleSelectComponent },
    setup() {
      const locale = ref<string | undefined>('ru')
      return { args, locale }
    },
    template: `
      <LocaleSelectComponent v-bind="args" v-model="locale" />
    `,
  }),
}
