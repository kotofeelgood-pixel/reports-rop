export type RadioGroupColor = 
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-warning'
  | 'air-primary-copilot';

export type RadioGroupSize = 'xs' | 'sm' | 'md' | 'lg';

export type RadioGroupVariant = 'card' | 'list' | 'table';

export type RadioGroupOrientation = 'horizontal' | 'vertical';

export type RadioGroupIndicator = 'start' | 'end' | 'hidden';

export interface RadioGroupItem {
  label?: string;
  description?: string;
  value?: string | number;
  disabled?: boolean;
  class?: any;
  b24ui?: {
    item?: any;
    container?: any;
    base?: any;
    indicator?: any;
    wrapper?: any;
    label?: any;
    description?: any;
  };
  [key: string]: any;
}

export interface RadioGroupModel {
  as?: any;
  legend?: string;
  valueKey?: string | number;
  labelKey?: string | number;
  descriptionKey?: string | number;
  items?: RadioGroupItem[] | (string | number)[];
  modelValue?: any;
  defaultValue?: any;
  size?: RadioGroupSize;
  variant?: RadioGroupVariant;
  color?: RadioGroupColor;
  orientation?: RadioGroupOrientation;
  indicator?: RadioGroupIndicator;
  disabled?: boolean;
  loop?: boolean;
  name?: string;
  required?: boolean;
  b24ui?: {
    root?: any;
    fieldset?: any;
    legend?: any;
    item?: any;
    base?: any;
    indicator?: any;
    container?: any;
    wrapper?: any;
    label?: any;
    description?: any;
  };
}
