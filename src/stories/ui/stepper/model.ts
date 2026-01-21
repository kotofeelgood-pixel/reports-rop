import type { StepperItem } from '@bitrix24/b24ui-nuxt';

export type StepperSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type StepperColor =
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-warning'
  | 'air-primary-copilot';

export type StepperOrientation = 'horizontal' | 'vertical';

export interface StepperModel {
  items: StepperItem[];
  as?: any;
  size?: StepperSize;
  color?: StepperColor;
  orientation?: StepperOrientation;
  defaultValue?: string | number;
  disabled?: boolean;
  linear?: boolean;
  modelValue?: string | number;
  b24ui?: {
    root?: any;
    header?: any;
    item?: any;
    container?: any;
    trigger?: any;
    indicator?: any;
    icon?: any;
    separator?: any;
    wrapper?: any;
    title?: any;
    description?: any;
    content?: any;
  };
}
