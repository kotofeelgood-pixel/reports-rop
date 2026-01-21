import type { AcceptableValue } from '@bitrix24/b24ui-nuxt';

export interface InputDateModel {
  as?: any;
  defaultValue?: AcceptableValue;
  modelValue?: AcceptableValue | null;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  b24ui?: {
    root?: any;
    input?: any;
  };
}
