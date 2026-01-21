import type { IconComponent, AvatarProps, AcceptableInputValue } from '@bitrix24/b24ui-nuxt';

export type InputTagsColor = 
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-warning'
  | 'air-primary-copilot';

export type InputTagsSize = 'xss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type InputTagsTagColor = 
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-warning'
  | 'air-primary-copilot'
  | 'air-secondary'
  | 'air-secondary-alert'
  | 'air-secondary-accent'
  | 'air-secondary-accent-1'
  | 'air-secondary-accent-2'
  | 'air-tertiary'
  | 'air-selection';

export interface InputTagsModel {
  as?: any;
  placeholder?: string;
  maxLength?: number;
  color?: InputTagsColor;
  size?: InputTagsSize;
  noBorder?: boolean;
  underline?: boolean;
  rounded?: boolean;
  autofocus?: boolean;
  autofocusDelay?: number;
  deleteIcon?: IconComponent;
  tag?: string;
  tagColor?: InputTagsTagColor;
  highlight?: boolean;
  modelValue?: AcceptableInputValue[] | null;
  defaultValue?: AcceptableInputValue[];
  addOnPaste?: boolean;
  addOnTab?: boolean;
  addOnBlur?: boolean;
  duplicate?: boolean;
  disabled?: boolean;
  delimiter?: string | RegExp;
  max?: number;
  id?: string;
  convertValue?: (value: string) => AcceptableInputValue;
  displayValue?: (value: AcceptableInputValue) => string;
  name?: string;
  required?: boolean;
  icon?: IconComponent;
  avatar?: AvatarProps;
  loading?: boolean;
  trailing?: boolean;
  trailingIcon?: IconComponent;
  autocomplete?: string;
  enterKeyHint?: 'search' | 'enter' | 'done' | 'go' | 'next' | 'previous' | 'send';
  form?: string;
  formaction?: string;
  formenctype?: string;
  formmethod?: string;
  formnovalidate?: boolean | string;
  formtarget?: string;
  list?: string;
  readonly?: boolean | string;
  b24ui?: {
    root?: any;
    base?: any;
    leading?: any;
    leadingIcon?: any;
    leadingAvatar?: any;
    leadingAvatarSize?: any;
    trailing?: any;
    trailingIcon?: any;
    tag?: any;
    item?: any;
    itemText?: any;
    itemDelete?: any;
    itemDeleteIcon?: any;
    input?: any;
  };
}
