import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StepperComponent from '../../components/stepper/StepperComponent.vue'
import type { StepperModel, StepperSize, StepperColor, StepperOrientation } from '../../components/stepper/model'
import type { StepperItem } from '@bitrix24/b24ui-nuxt'
import LocationIcon from '@bitrix24/b24icons-vue/outline/LocationIcon'
import DeliveryIcon from '@bitrix24/b24icons-vue/outline/DeliveryIcon'

const meta = {
  title: 'Navigation/Stepper',
  component: StepperComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'] as StepperSize[],
    },
    color: {
      control: 'select',
      options: [
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-warning',
        'air-primary-copilot',
      ] as StepperColor[],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'] as StepperOrientation[],
    },
    defaultValue: { control: 'number' },
    disabled: { control: 'boolean' },
    linear: { control: 'boolean' },
    modelValue: { control: 'number' },
  },
  args: {
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
    size: 'md',
    color: 'air-primary',
    orientation: 'horizontal',
    linear: true,
  } as Partial<StepperModel>,
} as Meta<typeof StepperComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<StepperModel>
}

export const Default: Story = {
  args: {
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
}

export const SizeXs: Story = {
  args: {
    size: 'xs',
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
}

export const SizeSm: Story = {
  args: {
    size: 'sm',
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
}

export const SizeMd: Story = {
  args: {
    size: 'md',
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
}

export const SizeLg: Story = {
  args: {
    size: 'lg',
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
}

export const SizeXl: Story = {
  args: {
    size: 'xl',
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
}

export const AirPrimary: Story = {
  args: {
    color: 'air-primary',
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
}

export const AirPrimarySuccess: Story = {
  args: {
    color: 'air-primary-success',
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
}

export const AirPrimaryAlert: Story = {
  args: {
    color: 'air-primary-alert',
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
}

export const AirPrimaryWarning: Story = {
  args: {
    color: 'air-primary-warning',
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
}

export const AirPrimaryCopilot: Story = {
  args: {
    color: 'air-primary-copilot',
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
        icon: LocationIcon,
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
        icon: DeliveryIcon,
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 1,
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
}

export const WithModelValue: Story = {
  args: {
    modelValue: 1,
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
}

export const NonLinear: Story = {
  args: {
    linear: false,
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
}

export const WithContentSlot: Story = {
  args: {
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
        icon: LocationIcon,
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
        icon: DeliveryIcon,
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
      },
    ] as StepperItem[],
  },
  render: (args) => ({
    components: { StepperComponent },
    setup() {
      return { args }
    },
    template: `
      <StepperComponent v-bind="args" class="w-full">
        <template #content="{ item }">
          <div class="h-[200px] flex items-center justify-center border border-gray-300 rounded">
            Это шаг {{ item?.title }}.
          </div>
        </template>
      </StepperComponent>
    `,
  }),
}

export const WithCustomSlot: Story = {
  args: {
    items: [
      {
        title: 'Адрес',
        description: 'Добавьте ваш адрес здесь',
        icon: LocationIcon,
        slot: 'address',
      },
      {
        title: 'Доставка',
        description: 'Выберите предпочитаемый способ доставки',
        icon: DeliveryIcon,
        slot: 'shipping',
      },
      {
        title: 'Оформление',
        description: 'Подтвердите ваш заказ',
        slot: 'checkout',
      },
    ] as StepperItem[],
  },
  render: (args) => ({
    components: { StepperComponent },
    setup() {
      return { args }
    },
    template: `
      <StepperComponent v-bind="args" class="w-full">
        <template #address>
          <div class="h-[200px] flex items-center justify-center border border-gray-300 rounded">
            Адрес
          </div>
        </template>
        <template #shipping>
          <div class="h-[200px] flex items-center justify-center border border-gray-300 rounded">
            Доставка
          </div>
        </template>
        <template #checkout>
          <div class="h-[200px] flex items-center justify-center border border-gray-300 rounded">
            Оформление
          </div>
        </template>
      </StepperComponent>
    `,
  }),
}
