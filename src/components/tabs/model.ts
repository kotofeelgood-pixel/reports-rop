import type { IconComponent, AvatarProps, BadgeProps } from '@bitrix24/b24ui-nuxt';

export type TabsSize = 'xss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TabsOrientation = 'horizontal' | 'vertical';

export type TabsVariant = 'link';

export type TabsActivationMode = 'automatic' | 'manual';

export interface TabsItem {
  label?: string;
  icon?: IconComponent;
  avatar?: AvatarProps;
  badge?: string | number | BadgeProps;
  content?: string;
  value?: string | number;
  disabled?: boolean;
  slot?: string;
  class?: any;
  b24ui?: {
    trigger?: any;
    leadingIcon?: any;
    leadingAvatar?: any;
    leadingAvatarSize?: any;
    label?: any;
    trailingBadge?: any;
    trailingBadgeSize?: any;
    content?: any;
  };
  [key: string]: any;
}

export interface TabsModel {
  as?: any;
  items?: TabsItem[];
  variant?: TabsVariant;
  size?: TabsSize;
  orientation?: TabsOrientation;
  content?: boolean;
  unmountOnHide?: boolean;
  activationMode?: TabsActivationMode;
  defaultValue?: string | number;
  modelValue?: string | number;
  labelKey?: string | number;
  b24ui?: {
    root?: any;
    list?: any;
    indicator?: any;
    trigger?: any;
    leadingIcon?: any;
    leadingAvatar?: any;
    leadingAvatarSize?: any;
    label?: any;
    trailingBadge?: any;
    trailingBadgeSize?: any;
    content?: any;
  };
}
