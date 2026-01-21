import type { AcceptableInputValue } from '@bitrix24/b24ui-nuxt';

export interface InputTimeModel {
  as?: any;
  defaultValue?: AcceptableInputValue;
  modelValue?: AcceptableInputValue | null;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  b24ui?: {
    root?: any;
    input?: any;
  };
}
