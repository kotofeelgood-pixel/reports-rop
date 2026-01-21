import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SlideoverComponent from '../../../components/overlay/slideover/SlideoverComponent.vue'
import type { SlideoverModel } from '../../../components/overlay/slideover/model'
import { commonMeta } from '../../meta'
import { ref } from 'vue'

const meta = {
  ...commonMeta,
  title: 'Overlay/Slideover',
  component: SlideoverComponent,
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    dismissible: { control: 'boolean' },
    overlay: { control: 'boolean' },
  },
  args: {
    side: 'right',
    dismissible: true,
    overlay: true,
  } as Partial<SlideoverModel>,
} as Meta<typeof SlideoverComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<SlideoverModel>
}

export const Default: Story = {
  args: {
    side: 'right',
  },
  render: (args) => ({
    components: { SlideoverComponent },
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div>
        <button @click="open = true" class="px-4 py-2 bg-blue-500 text-white rounded mb-4">Открыть Slideover</button>
        <SlideoverComponent v-bind="args" v-model="open">
          <div class="p-6">
            <h2 class="text-xl font-bold mb-4">Slideover</h2>
            <p>Контент выезжающей панели</p>
          </div>
        </SlideoverComponent>
      </div>
    `,
  }),
}

export const FromLeft: Story = {
  args: {
    side: 'left',
  },
  render: (args) => ({
    components: { SlideoverComponent },
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div>
        <button @click="open = true" class="px-4 py-2 bg-blue-500 text-white rounded mb-4">Открыть слева</button>
        <SlideoverComponent v-bind="args" v-model="open">
          <div class="p-6">
            <h2 class="text-xl font-bold mb-4">Slideover слева</h2>
            <p>Контент выезжающей панели</p>
          </div>
        </SlideoverComponent>
      </div>
    `,
  }),
}

export const FromTop: Story = {
  args: {
    side: 'top',
  },
  render: (args) => ({
    components: { SlideoverComponent },
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div>
        <button @click="open = true" class="px-4 py-2 bg-blue-500 text-white rounded mb-4">Открыть сверху</button>
        <SlideoverComponent v-bind="args" v-model="open">
          <div class="p-6">
            <h2 class="text-xl font-bold mb-4">Slideover сверху</h2>
            <p>Контент выезжающей панели</p>
          </div>
        </SlideoverComponent>
      </div>
    `,
  }),
}
