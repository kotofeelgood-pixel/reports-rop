import type { IconComponent, AvatarProps, InputProps, ChipProps } from '@bitrix24/b24ui-nuxt';

export type SelectMenuColor = 
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-warning'
  | 'air-primary-copilot';

export type SelectMenuSize = 'xss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type SelectMenuTagColor = 
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

export interface SelectMenuItem {
  label?: string;
  value?: string | number | boolean;
  type?: 'label' | 'separator' | 'item';
  icon?: IconComponent;
  avatar?: AvatarProps;
  color?: SelectMenuColor;
  chip?: ChipProps;
  disabled?: boolean;
  onSelect?: (e: Event) => void;
  class?: any;
  b24ui?: {
    label?: any;
    separator?: any;
    item?: any;
    itemLeadingIcon?: any;
    itemLeadingAvatar?: any;
    itemLeadingAvatarSize?: any;
    itemLeadingChipSize?: any;
    itemLeadingChip?: any;
    itemLabel?: any;
    itemTrailing?: any;
    itemTrailingIcon?: any;
  };
  [key: string]: any;
}

export interface SelectMenuModel {
  id?: string;
  placeholder?: string;
  searchInput?: boolean | InputProps<any>;
  color?: SelectMenuColor;
  size?: SelectMenuSize;
  noPadding?: boolean;
  noBorder?: boolean;
  underline?: boolean;
  rounded?: boolean;
  tag?: string;
  tagColor?: SelectMenuTagColor;
  required?: boolean;
  trailingIcon?: IconComponent;
  selectedIcon?: IconComponent;
  content?: Record<string, any>;
  arrow?: boolean | Record<string, any>;
  portal?: string | boolean | HTMLElement;
  virtualize?: boolean | { overscan?: number; estimateSize?: number };
  valueKey?: string | number;
  labelKey?: string | number;
  descriptionKey?: string | number;
  items?: SelectMenuItem[] | SelectMenuItem[][] | (string | number | boolean)[];
  defaultValue?: any;
  modelValue?: any;
  modelModifiers?: Record<string, any>;
  multiple?: boolean;
  highlight?: boolean;
  createItem?: boolean | 'always' | { position?: 'bottom' | 'top'; when?: 'empty' | 'always' };
  filterFields?: string[];
  ignoreFilter?: boolean;
  autofocus?: boolean;
  autofocusDelay?: number;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  name?: string;
  resetSearchTermOnBlur?: boolean;
  resetSearchTermOnSelect?: boolean;
  highlightOnHover?: boolean;
  icon?: IconComponent;
  avatar?: AvatarProps;
  loading?: boolean;
  trailing?: boolean;
  searchTerm?: string;
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
    value?: any;
    placeholder?: any;
    content?: any;
    viewport?: any;
    arrow?: any;
    group?: any;
    empty?: any;
    label?: any;
    separator?: any;
    item?: any;
    itemLeadingIcon?: any;
    itemLeadingAvatar?: any;
    itemLeadingAvatarSize?: any;
    itemLeadingChip?: any;
    itemLeadingChipSize?: any;
    itemTrailing?: any;
    itemTrailingIcon?: any;
    itemWrapper?: any;
    itemLabel?: any;
    itemDescription?: any;
    input?: any;
    focusScope?: any;
  };
  // HTML form attributes
  form?: string;
  formaction?: string;
  formenctype?: string;
  formmethod?: string;
  formnovalidate?: boolean | string;
  formtarget?: string;
}
