import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SeparatorComponent from './SeparatorComponent.vue'
import type { SeparatorModel, SeparatorOrientation, SeparatorAccent, SeparatorSize, SeparatorType } from './model'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

const meta = {
  title: 'UI/Separator',
  component: SeparatorComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    icon: { control: 'object' },
    avatar: { control: 'object' },
    accent: {
      control: 'select',
      options: ['default', 'accent', 'less'] as SeparatorAccent[],
    },
    size: {
      control: 'select',
      options: ['thin', 'thick'] as SeparatorSize[],
    },
    type: {
      control: 'select',
      options: ['solid', 'double', 'dashed', 'dotted'] as SeparatorType[],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'] as SeparatorOrientation[],
    },
    decorative: { control: 'boolean' },
  },
  args: {
    orientation: 'horizontal',
    accent: 'default',
    size: 'thin',
    type: 'solid',
  } as Partial<SeparatorModel>,
} as Meta<typeof SeparatorComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<SeparatorModel>
}

export const Default: Story = {
  args: {},
}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => ({
    components: { SeparatorComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="h-48 flex items-center">
        <SeparatorComponent v-bind="args" />
      </div>
    `,
  }),
}

export const WithLabel: Story = {
  args: {
    label: 'Bitrix24 UI',
  },
}

export const WithIcon: Story = {
  args: {
    icon: RocketIcon,
  },
}

export const WithAvatar: Story = {
  args: {
    avatar: {
      src: '/b24ui/avatar/employee.png',
    },
  },
}

export const AccentDefault: Story = {
  args: {
    accent: 'default',
    label: 'Default',
  },
}

export const AccentAccent: Story = {
  args: {
    accent: 'accent',
    label: 'Accent',
  },
}

export const AccentLess: Story = {
  args: {
    accent: 'less',
    label: 'Less',
  },
}

export const SizeThin: Story = {
  args: {
    size: 'thin',
    label: 'Thin',
  },
}

export const SizeThick: Story = {
  args: {
    size: 'thick',
    label: 'Thick',
  },
}

export const TypeSolid: Story = {
  args: {
    type: 'solid',
    label: 'Solid',
  },
}

export const TypeDouble: Story = {
  args: {
    type: 'double',
    label: 'Double',
  },
}

export const TypeDashed: Story = {
  args: {
    type: 'dashed',
    label: 'Dashed',
  },
}

export const TypeDotted: Story = {
  args: {
    type: 'dotted',
    label: 'Dotted',
  },
}

export const Decorative: Story = {
  args: {
    decorative: true,
  },
}

export const WithAllFeatures: Story = {
  args: {
    label: 'Bitrix24 UI',
    icon: RocketIcon,
    accent: 'accent',
    size: 'thick',
    type: 'dashed',
    orientation: 'horizontal',
  },
}

export const InContext: Story = {
  render: () => ({
    components: { SeparatorComponent },
    template: `
      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-bold mb-2">Заголовок 1</h3>
          <p>Содержимое первого раздела.</p>
        </div>
        <SeparatorComponent />
        <div>
          <h3 class="text-lg font-bold mb-2">Заголовок 2</h3>
          <p>Содержимое второго раздела.</p>
        </div>
        <SeparatorComponent label="Или" />
        <div>
          <h3 class="text-lg font-bold mb-2">Заголовок 3</h3>
          <p>Содержимое третьего раздела.</p>
        </div>
      </div>
    `,
  }),
}

export const VerticalInContext: Story = {
  render: () => ({
    components: { SeparatorComponent },
    template: `
      <div class="flex items-center gap-4 h-32">
        <div>Левая часть</div>
        <SeparatorComponent orientation="vertical" />
        <div>Правая часть</div>
      </div>
    `,
  }),
}

export const AllTypes: Story = {
  render: () => ({
    components: { SeparatorComponent },
    template: `
      <div class="space-y-4">
        <SeparatorComponent type="solid" label="Solid" />
        <SeparatorComponent type="double" label="Double" />
        <SeparatorComponent type="dashed" label="Dashed" />
        <SeparatorComponent type="dotted" label="Dotted" />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { SeparatorComponent },
    template: `
      <div class="space-y-4">
        <SeparatorComponent size="thin" label="Thin" />
        <SeparatorComponent size="thick" label="Thick" />
      </div>
    `,
  }),
}

export const AllAccents: Story = {
  render: () => ({
    components: { SeparatorComponent },
    template: `
      <div class="space-y-4">
        <SeparatorComponent accent="default" label="Default" />
        <SeparatorComponent accent="accent" label="Accent" />
        <SeparatorComponent accent="less" label="Less" />
      </div>
    `,
  }),
}
