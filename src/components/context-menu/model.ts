import type { IconComponent, AvatarProps } from '@bitrix24/b24ui-nuxt';

export type ContextMenuItemType = 'link' | 'label' | 'separator' | 'checkbox';

export type ContextMenuColor = 
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-copilot'
  | 'air-primary-warning';

export type KbdProps = {
  value: string;
  [key: string]: any;
};

export interface ContextMenuItem {
  label?: string;
  icon?: IconComponent;
  avatar?: AvatarProps;
  kbds?: string[] | KbdProps[];
  type?: ContextMenuItemType;
  color?: ContextMenuColor;
  checked?: boolean;
  disabled?: boolean;
  slot?: string;
  onSelect?: (e: Event) => void;
  onUpdateChecked?: (checked: boolean) => void;
  children?: ContextMenuItem[] | ContextMenuItem[][];
  class?: any;
  b24ui?: {
    item?: any;
    label?: any;
    separator?: any;
    itemLeadingIcon?: any;
    itemLeadingAvatarSize?: any;
    itemLeadingAvatar?: any;
    itemLabel?: any;
    itemLabelExternalIcon?: any;
    itemTrailing?: any;
    itemTrailingIcon?: any;
    itemTrailingKbds?: any;
    itemTrailingKbdsSize?: any;
  };
  [key: string]: any;
}

export type ArrayOrNested<T> = T[] | T[][];

export interface ContextMenuContentProps {
  as?: any;
  asChild?: boolean;
  forceMount?: boolean;
  [key: string]: any;
}

export interface ContextMenuModel {
  items?: ArrayOrNested<ContextMenuItem>;
  checkedIcon?: IconComponent;
  loadingIcon?: IconComponent;
  externalIcon?: boolean | IconComponent;
  content?: Omit<ContextMenuContentProps, 'as' | 'asChild' | 'forceMount'>;
  portal?: string | boolean | HTMLElement;
  labelKey?: string | number;
  descriptionKey?: string | number;
  disabled?: boolean;
  modal?: boolean;
  pressOpenDelay?: number;
  b24ui?: {
    content?: any;
    viewport?: any;
    group?: any;
    label?: any;
    separator?: any;
    item?: any;
    itemLeadingIcon?: any;
    itemLeadingAvatar?: any;
    itemLeadingAvatarSize?: any;
    itemTrailing?: any;
    itemTrailingIcon?: any;
    itemTrailingKbds?: any;
    itemWrapper?: any;
    itemTrailingKbdsSize?: any;
    itemLabel?: any;
    itemDescription?: any;
    itemLabelExternalIcon?: any;
  };
}
