import type { IconComponent } from '@bitrix24/b24ui-nuxt';

export type SwitchColor = 
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-warning'
  | 'air-primary-copilot';

export type SwitchSize = 'xs' | 'sm' | 'md' | 'lg';

export interface SwitchModel {
  as?: any;
  color?: SwitchColor;
  size?: SwitchSize;
  loading?: boolean;
  loadingIcon?: IconComponent;
  checkedIcon?: IconComponent;
  uncheckedIcon?: IconComponent;
  label?: string;
  description?: string;
  defaultValue?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  required?: boolean;
  value?: string;
  autofocus?: boolean | string;
  form?: string;
  formaction?: string;
  formenctype?: string;
  formmethod?: string;
  formnovalidate?: boolean | string;
  formtarget?: string;
  modelValue?: boolean;
  b24ui?: {
    root?: any;
    base?: any;
    container?: any;
    thumb?: any;
    icon?: any;
    wrapper?: any;
    label?: any;
    description?: any;
  };
}
