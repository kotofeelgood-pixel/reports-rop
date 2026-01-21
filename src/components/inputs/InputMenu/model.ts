import type { IconComponent, AvatarProps } from '@bitrix24/b24ui-nuxt';

// Размеры инпутов
export type InputSize = "xss" | "xs" | "sm" | "md" | "lg" | "xl"

// Цветовая схема инпутов
export type InputColor = "air-primary" | "air-primary-success" | "air-primary-alert" | "air-primary-warning" | "air-primary-copilot"

// Цветовая схема для тегов
export type TagColor = "air-primary" | "air-primary-success" | "air-primary-alert" | "air-primary-warning" | "air-primary-copilot" | "air-secondary" | "air-secondary-alert" | "air-secondary-accent" | "air-secondary-accent-1" | "air-secondary-accent-2" | "air-tertiary" | "air-selection"

// Типы инпутов
export type InputType = "number" | "image" | "text" | "button" | "search" | "time" | "color" | "checkbox" | "date" | "datetime-local" | "email" | "file" | "hidden" | "month" | "password" | "radio" | "range" | "reset" | "submit" | "tel" | "url" | "week" | string

// Элемент меню инпута
export interface InputMenuItem {
  value?: any;
  label?: string;
  description?: string;
  disabled?: boolean;
  [key: string]: any;
}

export interface InputMenuModel {
  id?: string;
  type?: InputType;
  placeholder?: string;
  color?: InputColor;
  size?: InputSize;
  noBorder?: boolean;
  underline?: boolean;
  rounded?: boolean;
  required?: boolean;
  autofocus?: boolean;
  autofocusDelay?: number;
  trailingIcon?: IconComponent;
  selectedIcon?: IconComponent;
  deleteIcon?: IconComponent;
  content?: Record<string, any>;
  arrow?: boolean | Record<string, any>;
  portal?: string | boolean | HTMLElement;
  virtualize?: boolean | Record<string, any>;
  valueKey?: string | number;
  labelKey?: string | number;
  descriptionKey?: string | number;
  items?: InputMenuItem[] | InputMenuItem[][];
  defaultValue?: any;
  modelValue?: any;
  modelModifiers?: Record<string, any>;
  multiple?: boolean;
  tag?: string;
  tagColor?: TagColor;
  highlight?: boolean;
  createItem?: boolean | "always" | Record<string, any>;
  filterFields?: string[];
  ignoreFilter?: boolean;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  name?: string;
  resetSearchTermOnBlur?: boolean;
  resetSearchTermOnSelect?: boolean;
  highlightOnHover?: boolean;
  openOnClick?: boolean;
  openOnFocus?: boolean;
  icon?: IconComponent;
  avatar?: AvatarProps;
  loading?: boolean;
  trailing?: boolean;
  autocomplete?: string;
  list?: string;
  readonly?: boolean | "true" | "false";
  searchTerm?: string;
}
