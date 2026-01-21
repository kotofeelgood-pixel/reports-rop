import type { IconComponent, AvatarProps } from '@bitrix24/b24ui-nuxt';

export type TextareaColor = 
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-warning'
  | 'air-primary-copilot';

export type TextareaTagColor = 
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
  | 'air-tertiary'
  | 'air-selection';

export type TextareaValue = string | number | null | undefined;

export interface TextareaModel {
  as?: any;
  id?: string;
  name?: string;
  placeholder?: string;
  color?: TextareaColor;
  noPadding?: boolean;
  noBorder?: boolean;
  underline?: boolean;
  rounded?: boolean;
  required?: boolean;
  autofocus?: boolean;
  autofocusDelay?: number;
  autoresize?: boolean;
  autoresizeDelay?: number;
  disabled?: boolean;
  rows?: number;
  maxrows?: number;
  tag?: string;
  tagColor?: TextareaTagColor;
  highlight?: boolean;
  modelValue?: TextareaValue;
  defaultValue?: TextareaValue;
  modelModifiers?: Record<string, any>;
  icon?: IconComponent;
  avatar?: AvatarProps;
  loading?: boolean;
  trailing?: boolean;
  trailingIcon?: IconComponent;
  autocomplete?: string;
  cols?: number | string;
  dirname?: string;
  form?: string;
  maxlength?: number | string;
  minlength?: number | string;
  readonly?: boolean | string;
  wrap?: string;
  b24ui?: {
    root?: any;
    base?: any;
    leading?: any;
    leadingIcon?: any;
    leadingAvatar?: any;
    leadingAvatarSize?: any;
    trailing?: any;
    trailingIcon?: any;
    tag?: any;
  };
}
