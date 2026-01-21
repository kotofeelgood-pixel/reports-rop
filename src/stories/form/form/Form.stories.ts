import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FormComponent from '../../../components/form/form/FormComponent.vue'
import type { FormModel } from '../../../components/form/form/model'
import { commonMeta } from '../../meta'

const meta = {
  ...commonMeta,
  title: 'Form/Form',
  component: FormComponent,
  argTypes: {},
  args: {} as Partial<FormModel>,
} as Meta<typeof FormComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<FormModel>
}

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { FormComponent },
    setup() {
      return { args }
    },
    template: `
      <FormComponent v-bind="args" @submit="(e) => e.preventDefault()">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Имя</label>
            <input type="text" class="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input type="email" class="w-full px-3 py-2 border rounded" />
          </div>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Отправить</button>
        </div>
      </FormComponent>
    `,
  }),
}
