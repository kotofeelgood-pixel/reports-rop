// Размеры чекбоксов
export type CheckboxSize = "xs" | "sm" | "md" | "lg"

// Цветовая схема чекбоксов
export type CheckboxColor = "air-primary" | "air-primary-success" | "air-primary-alert" | "air-primary-warning" | "air-primary-copilot"

// Позиция индикатора
export type CheckboxIndicator = "start" | "end" | "hidden"

// Варианты группы чекбоксов
export type CheckboxGroupVariant = "card" | "list" | "table"

// Ориентация группы чекбоксов
export type CheckboxGroupOrientation = "horizontal" | "vertical"

// Элемент группы чекбоксов
export interface CheckboxGroupItem {
  value?: any;
  label?: string;
  description?: string;
  disabled?: boolean;
  [key: string]: any;
}

export interface CheckboxGroupModel {
  valueKey?: string | number;
  labelKey?: string | number;
  descriptionKey?: string | number;
  items?: CheckboxGroupItem[];
  modelValue?: any[];
  defaultValue?: any[];
  size?: CheckboxSize;
  variant?: CheckboxGroupVariant;
  orientation?: CheckboxGroupOrientation;
  disabled?: boolean;
  loop?: boolean;
  name?: string;
  required?: boolean;
  color?: CheckboxColor;
  indicator?: CheckboxIndicator;
}
