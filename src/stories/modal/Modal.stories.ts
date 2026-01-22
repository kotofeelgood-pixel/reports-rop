import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ModalComponent from '../../components/modal/ModalComponent.vue'


const meta = {
  title: 'Overlay/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    overlay: { control: 'boolean' },
    scrollable: { control: 'boolean' },
    overlayBlur: {
      control: 'select',
      options: ['auto', 'on', 'off'],
    },
    transition: { control: 'boolean' },
    fullscreen: { control: 'boolean' },
    dismissible: { control: 'boolean' },
    modal: { control: 'boolean' },
    close: { control: 'object' },
  },
  args: {
    title: 'Модальное окно',
    overlay: true,
    scrollable: false,
    overlayBlur: 'auto',
    transition: true,
    fullscreen: false,
    dismissible: true,
    modal: true,
    close: true,
  },
} as Meta<typeof ModalComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

