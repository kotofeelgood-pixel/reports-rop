export type PinInputColor = 
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-warning'
  | 'air-primary-copilot';

export type PinInputSize = 'xss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type PinInputType = 'text' | 'number';

export interface PinInputModel {
  as?: any;
  color?: PinInputColor;
  size?: PinInputSize;
  underline?: boolean;
  rounded?: boolean;
  noBorder?: boolean;
  length?: string | number;
  autofocus?: boolean;
  autofocusDelay?: number;
  highlight?: boolean;
  defaultValue?: string[];
  disabled?: boolean;
  id?: string;
  mask?: boolean;
  modelValue?: string[] | null;
  name?: string;
  otp?: boolean;
  placeholder?: string;
  required?: boolean;
  type?: PinInputType;
  b24ui?: {
    root?: any;
    base?: any;
  };
}
