import type { IconComponent } from '@bitrix24/b24ui-nuxt';

export type ColorModeSwitchSize = 'xs' | 'sm' | 'md' | 'lg';

export type ColorModeSwitchColor =
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-warning'
  | 'air-primary-copilot';

export interface ColorModeSwitchModel {
  as?: any;
  loading?: boolean;
  size?: ColorModeSwitchSize;
  color?: ColorModeSwitchColor;
  autofocus?: boolean | string;
  disabled?: boolean;
  form?: string;
  formaction?: string;
  formenctype?: string;
  formmethod?: string;
  formnovalidate?: boolean | string;
  formtarget?: string;
  name?: string;
  label?: string;
  defaultValue?: boolean;
  required?: boolean;
  id?: string;
  value?: string;
  description?: string;
  loadingIcon?: IconComponent;
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
