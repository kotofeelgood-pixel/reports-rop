import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ColorModeSelectComponent from '../../../components/color-mode/color-mode-select/ColorModeSelectComponent.vue'
import type { ColorModeSelectModel } from '../../../components/color-mode/color-mode-select/model'
import { commonMeta } from '../../meta'
import { ref } from 'vue'

const meta = {
  ...commonMeta,
  title: 'Color Mode/ColorModeSelect',
  component: ColorModeSelectComponent,
  argTypes: {},
  args: {} as Partial<ColorModeSelectModel>,
} as Meta<typeof ColorModeSelectComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<ColorModeSelectModel>
}

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { ColorModeSelectComponent },
    setup() {
      const mode = ref<string | undefined>('system')
      return { args, mode }
    },
    template: `
      <ColorModeSelectComponent v-bind="args" v-model="mode" />
    `,
  }),
}
