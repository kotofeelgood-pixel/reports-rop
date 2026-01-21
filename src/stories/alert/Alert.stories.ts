import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AlertComponent from '../../components/alert/AlertComponent.vue'
import type { AlertModel, AlertColor, AlertSize, AlertOrientation } from '../../components/alert/model'
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import { commonMeta } from '../meta'

const meta = {
  ...commonMeta,
  title: 'Element/Alert',
  component: AlertComponent,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'object' },
    avatar: { control: 'object' },
    color: {
      control: 'select',
      options: [
        'air-primary',
        'air-primary-success',
        'air-primary-alert',
        'air-primary-warning',
        'air-primary-copilot',
        'air-secondary',
        'air-secondary-alert',
        'air-secondary-accent',
        'air-secondary-accent-1',
        'air-secondary-accent-2',
        'air-tertiary',
      ] as AlertColor[],
    },
    inverted: { control: 'boolean' },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'] as AlertOrientation[],
    },
    size: {
      control: 'select',
      options: ['md', 'sm'] as AlertSize[],
    },
    actions: { control: 'object' },
    close: { control: 'boolean' },
    closeIcon: { control: 'object' },
  },
  args: {
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
    color: 'air-secondary-accent',
    size: 'md',
    orientation: 'vertical',
    inverted: false,
  } as Partial<AlertModel>,
} as Meta<typeof AlertComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<AlertModel>
}

export const Default: Story = {
  args: {
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
  },
}

export const WithTitleOnly: Story = {
  args: {
    title: 'Внимание!',
  },
}

export const WithDescriptionOnly: Story = {
  args: {
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
  },
}

export const WithIcon: Story = {
  args: {
    icon: RocketIcon,
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
  },
}

export const WithAvatar: Story = {
  args: {
    avatar: {
      src: '/b24ui/avatar/employee.png',
      size: 'xs',
    },
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
  },
}

export const AirPrimary: Story = {
  args: {
    color: 'air-primary',
    icon: RocketIcon,
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
    close: true,
  },
}

export const AirPrimarySuccess: Story = {
  args: {
    color: 'air-primary-success',
    icon: RocketIcon,
    title: 'Успех!',
    description: 'Операция выполнена успешно.',
    close: true,
  },
}

export const AirPrimaryAlert: Story = {
  args: {
    color: 'air-primary-alert',
    icon: RocketIcon,
    title: 'Ошибка!',
    description: 'Произошла ошибка при выполнении операции.',
    close: true,
  },
}

export const AirPrimaryWarning: Story = {
  args: {
    color: 'air-primary-warning',
    icon: RocketIcon,
    title: 'Предупреждение!',
    description: 'Обратите внимание на эту информацию.',
    close: true,
  },
}

export const AirPrimaryCopilot: Story = {
  args: {
    color: 'air-primary-copilot',
    icon: RocketIcon,
    title: 'Copilot',
    description: 'Сообщение от Copilot.',
    close: true,
  },
}

export const AirSecondary: Story = {
  args: {
    color: 'air-secondary',
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
  },
}

export const AirSecondaryAlert: Story = {
  args: {
    color: 'air-secondary-alert',
    title: 'Ошибка!',
    description: 'Произошла ошибка при выполнении операции.',
  },
}

export const AirSecondaryAccent: Story = {
  args: {
    color: 'air-secondary-accent',
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
  },
}

export const AirSecondaryAccent1: Story = {
  args: {
    color: 'air-secondary-accent-1',
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
  },
}

export const AirSecondaryAccent2: Story = {
  args: {
    color: 'air-secondary-accent-2',
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
  },
}

export const AirTertiary: Story = {
  args: {
    color: 'air-tertiary',
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
  },
}

export const Inverted: Story = {
  args: {
    inverted: true,
    color: 'air-primary',
    icon: RocketIcon,
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
    close: true,
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
  },
}

export const WithClose: Story = {
  args: {
    close: true,
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
  },
}

export const WithCustomClose: Story = {
  args: {
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
    close: {
      color: 'air-secondary-accent-2',
      class: 'rounded-full',
    },
  },
}

export const WithActions: Story = {
  args: {
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
    actions: [
      {
        label: 'Действие 1',
      },
      {
        label: 'Действие 2',
        color: 'air-primary',
      },
    ] as ButtonProps[],
  },
}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
    actions: [
      {
        label: 'Действие 1',
      },
      {
        label: 'Действие 2',
        color: 'air-primary',
      },
    ] as ButtonProps[],
  },
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
    actions: [
      {
        label: 'Действие 1',
      },
      {
        label: 'Действие 2',
        color: 'air-primary',
      },
    ] as ButtonProps[],
  },
}

export const WithAllFeatures: Story = {
  args: {
    icon: RocketIcon,
    color: 'air-primary',
    size: 'md',
    orientation: 'vertical',
    title: 'Внимание!',
    description: 'Мы немедленно уведомим менеджера о том, что сделка не продвигается.',
    actions: [
      {
        label: 'Действие 1',
      },
      {
        label: 'Действие 2',
        color: 'air-primary',
      },
    ] as ButtonProps[],
    close: true,
  },
}
