import type { IconComponent, ButtonProps } from '@bitrix24/b24ui-nuxt';

export type FileUploadColor =
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-warning'
  | 'air-primary-copilot'
  | 'air-secondary'
  | 'air-secondary-alert'
  | 'air-secondary-accent'
  | 'air-secondary-accent-1'
  | 'air-secondary-accent-2'
  | 'air-tertiary';

export type FileUploadVariant = 'button' | 'area';

export type FileUploadSize = 'xs' | 'sm' | 'md' | 'lg';

export type FileUploadLayout = 'list' | 'grid';

export type FileUploadPosition = 'inside' | 'outside';

export interface FileUploadModel {
  as?: any;
  id?: string;
  name?: string;
  icon?: IconComponent;
  label?: string;
  description?: string;
  color?: FileUploadColor;
  variant?: FileUploadVariant;
  size?: FileUploadSize;
  layout?: FileUploadLayout;
  position?: FileUploadPosition;
  highlight?: boolean;
  accept?: string;
  multiple?: boolean;
  reset?: boolean;
  dropzone?: boolean;
  interactive?: boolean;
  required?: boolean;
  disabled?: boolean;
  fileIcon?: IconComponent;
  fileDelete?: boolean | Omit<ButtonProps, 'to' | 'href' | 'target' | 'rel' | 'download'>;
  fileDeleteIcon?: IconComponent;
  preview?: boolean;
  modelValue?: File | File[] | null;
  b24ui?: {
    root?: any;
    base?: any;
    wrapper?: any;
    icon?: any;
    avatar?: any;
    label?: any;
    description?: any;
    actions?: any;
    files?: any;
    file?: any;
    fileLeadingAvatar?: any;
    fileWrapper?: any;
    fileName?: any;
    fileSize?: any;
    fileTrailingButton?: any;
  };
  // HTML input attributes
  form?: string;
  formaction?: string;
  formenctype?: string;
  formmethod?: string;
  formnovalidate?: boolean | string;
  formtarget?: string;
}
