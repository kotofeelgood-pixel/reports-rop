import type { IconComponent, AvatarProps, AcceptableValue } from '@bitrix24/b24ui-nuxt';

// Размеры инпутов
export type InputSize = "xss" | "xs" | "sm" | "md" | "lg" | "xl"

// Цветовая схема инпутов
export type InputColor = "air-primary" | "air-primary-success" | "air-primary-alert" | "air-primary-warning" | "air-primary-copilot"

// Цветовая схема для тегов
export type TagColor = "air-primary" | "air-primary-success" | "air-primary-alert" | "air-primary-warning" | "air-primary-copilot" | "air-secondary" | "air-secondary-alert" | "air-secondary-accent" | "air-secondary-accent-1" | "air-secondary-accent-2" | "air-tertiary" | "air-selection"

// Типы инпутов
export type InputType = "number" | "image" | "text" | "button" | "search" | "time" | "color" | "checkbox" | "date" | "datetime-local" | "email" | "file" | "hidden" | "month" | "password" | "radio" | "range" | "reset" | "submit" | "tel" | "url" | "week" | string

export interface InputModel {
  id?: string;
  name?: string;
  type?: InputType;
  placeholder?: string;
  color?: InputColor;
  size?: InputSize;
  noPadding?: boolean;
  noBorder?: boolean;
  underline?: boolean;
  rounded?: boolean;
  required?: boolean;
  autocomplete?: string;
  autofocus?: boolean;
  autofocusDelay?: number;
  disabled?: boolean;
  tag?: string;
  tagColor?: TagColor;
  highlight?: boolean;
  modelValue?: AcceptableValue;
  defaultValue?: AcceptableValue;
  icon?: IconComponent;
  avatar?: AvatarProps;
  loading?: boolean;
  trailing?: boolean;
  trailingIcon?: IconComponent;
  list?: string;
  max?: string | number;
  maxlength?: string | number;
  min?: string | number;
  minlength?: string | number;
  pattern?: string;
  readonly?: boolean | "true" | "false";
  step?: string | number;
}
