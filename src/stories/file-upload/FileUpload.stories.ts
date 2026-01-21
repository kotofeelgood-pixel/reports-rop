import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import FileUploadComponent from '../../components/file-upload/FileUploadComponent.vue'
import type { FileUploadModel, FileUploadColor, FileUploadVariant, FileUploadSize, FileUploadLayout, FileUploadPosition } from '../../components/file-upload/model'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import ImageIcon from '@bitrix24/b24icons-vue/outline/ImageIcon'
import UploadIcon from '@bitrix24/b24icons-vue/outline/UploadIcon'
import { commonMeta } from '../meta'

const meta = {
  ...commonMeta,
  title: 'Form/FileUpload',
  component: FileUploadComponent,
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    icon: { control: 'object' },
    label: { control: 'text' },
    description: { control: 'text' },
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
      ] as FileUploadColor[],
    },
    variant: {
      control: 'select',
      options: ['button', 'area'] as FileUploadVariant[],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'] as FileUploadSize[],
    },
    layout: {
      control: 'select',
      options: ['list', 'grid'] as FileUploadLayout[],
    },
    position: {
      control: 'select',
      options: ['inside', 'outside'] as FileUploadPosition[],
    },
    highlight: { control: 'boolean' },
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    reset: { control: 'boolean' },
    dropzone: { control: 'boolean' },
    interactive: { control: 'boolean' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fileIcon: { control: 'object' },
    fileDelete: { control: 'boolean' },
    fileDeleteIcon: { control: 'object' },
    preview: { control: 'boolean' },
  },
  args: {
    variant: 'area',
    size: 'md',
    dropzone: true,
    interactive: true,
    preview: true,
  } as Partial<FileUploadModel>,
} as Meta<typeof FileUploadComponent>

export default meta
type Story = StoryObj<typeof meta> & {
  args?: Partial<FileUploadModel>
}

export const Default: Story = {
  args: {
    class: 'w-96 min-h-48',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Перетащите изображение сюда',
    class: 'w-96 min-h-48',
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Перетащите изображение сюда',
    description: 'SVG, PNG, JPG или GIF (макс. 2MB)',
    class: 'w-96 min-h-48',
  },
}

export const WithIcon: Story = {
  args: {
    icon: RocketIcon,
    label: 'Перетащите изображение сюда',
    description: 'SVG, PNG, JPG или GIF (макс. 2MB)',
    class: 'w-96 min-h-48',
  },
}

export const Multiple: Story = {
  args: {
    multiple: true,
    label: 'Перетащите изображения сюда',
    description: 'SVG, PNG, JPG или GIF (макс. 2MB)',
    class: 'w-96 min-h-48',
  },
}

export const WithoutDropzone: Story = {
  args: {
    dropzone: false,
    label: 'Выберите файл',
    class: 'w-96 min-h-48',
  },
}

export const WithoutInteractive: Story = {
  args: {
    interactive: false,
    label: 'Перетащите изображение сюда',
    description: 'SVG, PNG, JPG или GIF (макс. 2MB)',
    class: 'w-96 min-h-48',
  },
}

export const AcceptImages: Story = {
  args: {
    accept: 'image/*',
    label: 'Перетащите изображение сюда',
    description: 'Только изображения',
    class: 'w-96 min-h-48',
  },
}

export const AcceptPDF: Story = {
  args: {
    accept: 'application/pdf',
    label: 'Перетащите PDF файл сюда',
    description: 'Только PDF файлы',
    class: 'w-96 min-h-48',
  },
}

export const VariantButton: Story = {
  args: {
    variant: 'button',
    label: 'Выберите файл',
  },
}

export const VariantArea: Story = {
  args: {
    variant: 'area',
    label: 'Перетащите файл сюда',
    description: 'SVG, PNG, JPG или GIF (макс. 2MB)',
    class: 'w-96 min-h-48',
  },
}

export const SizeXs: Story = {
  args: {
    size: 'xs',
    label: 'Перетащите файл сюда',
    class: 'w-96 min-h-48',
  },
}

export const SizeSm: Story = {
  args: {
    size: 'sm',
    label: 'Перетащите файл сюда',
    class: 'w-96 min-h-48',
  },
}

export const SizeMd: Story = {
  args: {
    size: 'md',
    label: 'Перетащите файл сюда',
    class: 'w-96 min-h-48',
  },
}

export const SizeLg: Story = {
  args: {
    size: 'lg',
    label: 'Перетащите файл сюда',
    description: 'SVG, PNG, JPG или GIF (макс. 2MB)',
    class: 'w-96 min-h-48',
  },
}

export const LayoutGrid: Story = {
  args: {
    layout: 'grid',
    multiple: true,
    label: 'Перетащите изображения сюда',
    description: 'SVG, PNG, JPG или GIF (макс. 2MB)',
    class: 'w-96 min-h-48',
  },
}

export const LayoutList: Story = {
  args: {
    layout: 'list',
    multiple: true,
    label: 'Перетащите изображения сюда',
    description: 'SVG, PNG, JPG или GIF (макс. 2MB)',
    class: 'w-96 min-h-48',
  },
}

export const PositionInside: Story = {
  args: {
    layout: 'list',
    position: 'inside',
    multiple: true,
    label: 'Перетащите изображения сюда',
    description: 'SVG, PNG, JPG или GIF (макс. 2MB)',
    class: 'w-96 min-h-48',
  },
}

export const PositionOutside: Story = {
  args: {
    layout: 'list',
    position: 'outside',
    multiple: true,
    label: 'Перетащите изображения сюда',
    description: 'SVG, PNG, JPG или GIF (макс. 2MB)',
    class: 'w-96 min-h-48',
  },
}

export const AirPrimary: Story = {
  args: {
    color: 'air-primary',
    label: 'Перетащите файл сюда',
    class: 'w-96 min-h-48',
  },
}

export const AirPrimaryAlert: Story = {
  args: {
    color: 'air-primary-alert',
    highlight: true,
    label: 'Перетащите файл сюда',
    class: 'w-96 min-h-48',
  },
}

export const AirSecondary: Story = {
  args: {
    color: 'air-secondary',
    label: 'Перетащите файл сюда',
    class: 'w-96 min-h-48',
  },
}

export const AirTertiary: Story = {
  args: {
    color: 'air-tertiary',
    label: 'Перетащите файл сюда',
    class: 'w-96 min-h-48',
  },
}

export const Highlight: Story = {
  args: {
    highlight: true,
    label: 'Перетащите файл сюда',
    class: 'w-96 min-h-48',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Перетащите файл сюда',
    class: 'w-96 min-h-48',
  },
}

export const Required: Story = {
  args: {
    required: true,
    label: 'Перетащите файл сюда',
    class: 'w-96 min-h-48',
  },
}

export const WithoutPreview: Story = {
  args: {
    preview: false,
    label: 'Перетащите файл сюда',
    class: 'w-96 min-h-48',
  },
}

export const WithCustomActions: Story = {
  args: {
    interactive: false,
    label: 'Перетащите изображения сюда',
    description: 'SVG, PNG, JPG или GIF (макс. 2MB)',
    layout: 'list',
    multiple: true,
    class: 'w-96 min-h-48',
  },
  render: (args) => ({
    components: { FileUploadComponent },
    setup() {
      return { args, UploadIcon }
    },
    template: `
      <FileUploadComponent v-bind="args">
        <template #actions="{ open }">
          <button 
            @click="open()"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Выбрать изображения
          </button>
        </template>
      </FileUploadComponent>
    `,
  }),
}

export const WithFilesBottom: Story = {
  args: {
    interactive: false,
    label: 'Перетащите изображения сюда',
    description: 'SVG, PNG, JPG или GIF (макс. 2MB)',
    layout: 'list',
    multiple: true,
    class: 'w-96 min-h-48',
  },
  render: (args) => ({
    components: { FileUploadComponent },
    setup() {
      return { args }
    },
    template: `
      <FileUploadComponent v-bind="args">
        <template #actions="{ open }">
          <button 
            @click="open()"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Выбрать изображения
          </button>
        </template>
        <template #files-bottom="{ removeFile, files }">
          <button 
            v-if="files?.length"
            @click="removeFile()"
            class="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Удалить все файлы
          </button>
        </template>
      </FileUploadComponent>
    `,
  }),
}

export const WithFilesTop: Story = {
  args: {
    interactive: false,
    label: 'Перетащите изображения сюда',
    description: 'SVG, PNG, JPG или GIF (макс. 2MB)',
    layout: 'grid',
    multiple: true,
    class: 'w-96 min-h-48',
  },
  render: (args) => ({
    components: { FileUploadComponent },
    setup() {
      return { args }
    },
    template: `
      <FileUploadComponent v-bind="args">
        <template #actions="{ open }">
          <button 
            @click="open()"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Выбрать изображения
          </button>
        </template>
        <template #files-top="{ open, files }">
          <div v-if="files?.length" class="mb-2 flex items-center justify-between">
            <p class="font-bold">
              Файлы ({{ files?.length }})
            </p>
            <button 
              @click="open()"
              class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Добавить еще
            </button>
          </div>
        </template>
      </FileUploadComponent>
    `,
  }),
}

export const WithDefaultSlot: Story = {
  args: {
    accept: 'image/*',
    class: 'w-64',
  },
  render: (args) => ({
    components: { FileUploadComponent },
    setup() {
      const file = ref<File | null>(null)
      
      function createObjectUrl(file: File | null): string | undefined {
        return file ? URL.createObjectURL(file) : undefined
      }
      
      return { args, file, ImageIcon, createObjectUrl }
    },
    template: `
      <FileUploadComponent v-bind="args" v-model="file">
        <template #default="{ open, removeFile }">
          <div class="flex flex-wrap items-center gap-3">
            <div 
              v-if="file"
              class="w-16 h-16 rounded border border-gray-300 flex items-center justify-center bg-gray-100"
            >
              <img 
                v-if="file"
                :src="createObjectUrl(file)"
                alt="Preview"
                class="w-full h-full object-cover rounded"
              />
            </div>
            <button 
              @click="open()"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {{ file ? 'Изменить изображение' : 'Загрузить изображение' }}
            </button>
          </div>
          <p v-if="file" class="text-sm text-gray-600 mt-1.5">
            {{ file.name }}
            <button 
              @click="removeFile()"
              class="ml-2 text-red-500 hover:text-red-700"
            >
              Удалить
            </button>
          </p>
        </template>
      </FileUploadComponent>
    `,
  }),
}
