import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ProgressComponent from '../../components/progress/ProgressComponent.vue'
import type { ProgressModel, ProgressSize, ProgressColor, ProgressOrientation, ProgressAnimation } from '../../components/progress/model'

const meta = {
  title: 'Element/Progress',
  component: ProgressComponent,
  tags: ['autodocs'],
  argTypes: {
    max: { control: 'number' },
    status: { control: 'boolean' },
    inverted: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'] as ProgressSize[],
    },
    color: {
      control: 'select',
      options: [
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-warning',
        'air-primary-copilot',
        'air-secondary',
      ] as ProgressColor[],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'] as ProgressOrientation[],
    },
    animation: {
      control: 'select',
      options: ['carousel', 'loading', 'carousel-inverse', 'swing', 'elastic'] as ProgressAnimation[],
    },
    modelValue: { control: 'number' },
  },
  args: {
    modelValue: 24,
    max: 100,
    size: 'md',
    color: 'air-primary',
    orientation: 'horizontal',
    animation: 'loading',
    status: false,
    inverted: false,
  } as Partial<ProgressModel>,
} as Meta<typeof ProgressComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<ProgressModel>
}

export const Default: Story = {
  args: {
    modelValue: 24,
    max: 100,
  },
}

export const WithValue: Story = {
  args: {
    modelValue: 50,
    max: 100,
  },
}

export const WithMax: Story = {
  args: {
    modelValue: 2,
    max: 4,
  },
}

export const WithStatus: Story = {
  args: {
    modelValue: 24,
    max: 100,
    status: true,
  },
}

export const Indeterminate: Story = {
  args: {
    modelValue: null,
  },
}

export const WithSteps: Story = {
  args: {
    modelValue: 3,
    max: {
      '0': 'Проспектинг...',
      '1': 'Квалификация...',
      '2': 'Презентация...',
      '3': 'Переговоры...',
      '4': 'Закрыто!',
    },
  },
}

export const SizeXs: Story = {
  args: {
    size: 'xs',
    modelValue: 50,
    max: 100,
  },
}

export const SizeSm: Story = {
  args: {
    size: 'sm',
    modelValue: 50,
    max: 100,
  },
}

export const SizeMd: Story = {
  args: {
    size: 'md',
    modelValue: 50,
    max: 100,
  },
}

export const SizeLg: Story = {
  args: {
    size: 'lg',
    modelValue: 50,
    max: 100,
  },
}

export const AirPrimary: Story = {
  args: {
    color: 'air-primary',
    modelValue: 50,
    max: 100,
  },
}

export const AirPrimarySuccess: Story = {
  args: {
    color: 'air-primary-success',
    modelValue: 50,
    max: 100,
  },
}

export const AirPrimaryAlert: Story = {
  args: {
    color: 'air-primary-alert',
    modelValue: 50,
    max: 100,
  },
}

export const AirPrimaryWarning: Story = {
  args: {
    color: 'air-primary-warning',
    modelValue: 50,
    max: 100,
  },
}

export const AirPrimaryCopilot: Story = {
  args: {
    color: 'air-primary-copilot',
    modelValue: 50,
    max: 100,
  },
}

export const AirSecondary: Story = {
  args: {
    color: 'air-secondary',
    modelValue: 50,
    max: 100,
  },
}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    modelValue: 50,
    max: 100,
  },
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    modelValue: 50,
    max: 100,
    class: 'h-48 justify-center',
  },
  render: (args) => ({
    components: { ProgressComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="h-48 flex justify-center">
        <ProgressComponent v-bind="args" />
      </div>
    `,
  }),
}

export const Inverted: Story = {
  args: {
    inverted: true,
    modelValue: 50,
    max: 100,
  },
}

export const AnimationLoading: Story = {
  args: {
    animation: 'loading',
    modelValue: null,
  },
}

export const AnimationCarousel: Story = {
  args: {
    animation: 'carousel',
    modelValue: null,
  },
}

export const AnimationCarouselInverse: Story = {
  args: {
    animation: 'carousel-inverse',
    modelValue: null,
  },
}

export const AnimationSwing: Story = {
  args: {
    animation: 'swing',
    modelValue: null,
  },
}

export const AnimationElastic: Story = {
  args: {
    animation: 'elastic',
    modelValue: null,
  },
}

export const WithStatusAndSteps: Story = {
  args: {
    modelValue: 3,
    status: true,
    max: {
      '0': 'Проспектинг...',
      '1': 'Квалификация...',
      '2': 'Презентация...',
      '3': 'Переговоры...',
      '4': 'Закрыто!',
    },
  },
}

export const AnimatedProgress: Story = {
  render: () => ({
    components: { ProgressComponent },
    setup() {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { ref } = require('vue')
      const value = ref(0)
      
      setInterval(() => {
        value.value = (value.value + 1) % 101
      }, 50)
      
      return { value }
    },
    template: `
      <ProgressComponent v-model="value" :max="100" status />
    `,
  }),
}
