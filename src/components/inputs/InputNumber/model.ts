import type { IconComponent } from '@bitrix24/b24ui-nuxt';

// Размеры инпутов
export type InputSize = "xss" | "xs" | "sm" | "md" | "lg" | "xl"

// Цветовая схема инпутов
export type InputColor = "air-primary" | "air-primary-success" | "air-primary-alert" | "air-primary-warning" | "air-primary-copilot"

// Цветовая схема для тегов
export type TagColor = "air-primary" | "air-primary-success" | "air-primary-alert" | "air-primary-warning" | "air-primary-copilot" | "air-secondary" | "air-secondary-alert" | "air-secondary-accent" | "air-secondary-accent-1" | "air-secondary-accent-2" | "air-tertiary" | "air-selection"

// Ориентация для InputNumber
export type InputNumberOrientation = "horizontal" | "vertical"

export interface InputNumberModel {
  placeholder?: string;
  color?: InputColor;
  size?: InputSize;
  noBorder?: boolean;
  underline?: boolean;
  rounded?: boolean;
  tag?: string;
  tagColor?: TagColor;
  highlight?: boolean;
  orientation?: InputNumberOrientation;
  increment?: boolean | Record<string, any>;
  incrementIcon?: IconComponent;
  incrementDisabled?: boolean;
  decrement?: boolean | Record<string, any>;
  decrementIcon?: IconComponent;
  decrementDisabled?: boolean;
  autofocus?: boolean;
  autofocusDelay?: number;
  modelModifiers?: Record<string, any>;
  modelValue?: null | number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  stepSnapping?: boolean;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  formatOptions?: Intl.NumberFormatOptions;
  disableWheelChange?: boolean;
  invertWheelChange?: boolean;
  readonly?: boolean;
  autocomplete?: string;
  list?: string;
}
