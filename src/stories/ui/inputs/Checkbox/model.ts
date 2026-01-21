// Размеры чекбоксов
export type CheckboxSize = "xs" | "sm" | "md" | "lg"

// Цветовая схема чекбоксов
export type CheckboxColor = "air-primary" | "air-primary-success" | "air-primary-alert" | "air-primary-warning" | "air-primary-copilot"

// Варианты чекбоксов
export type CheckboxVariant = "card" | "list"

// Позиция индикатора
export type CheckboxIndicator = "start" | "end" | "hidden"

export interface CheckboxModel {
  label?: string;
  description?: string;
  color?: CheckboxColor;
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  indicator?: CheckboxIndicator;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  id?: string;
  defaultValue?: boolean | "indeterminate";
  value?: null | string | number | bigint | Record<string, any>;
  autofocus?: false | true | "true" | "false";
  modelValue?: boolean | "indeterminate";
}
