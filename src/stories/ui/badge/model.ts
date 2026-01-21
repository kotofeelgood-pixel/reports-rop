import type { IconComponent, AvatarProps } from '@bitrix24/b24ui-nuxt';

export type BadgeColor =
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

export type BadgeSize = 'xss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface BadgeModel {
  as?: any;
  label?: string | number;
  color?: BadgeColor;
  inverted?: boolean;
  size?: BadgeSize;
  square?: boolean;
  useLink?: boolean;
  useClose?: boolean;
  onCloseClick?: ((event: MouseEvent) => void | Promise<void>) | ((event: MouseEvent) => void | Promise<void>)[];
  icon?: IconComponent;
  avatar?: AvatarProps;
  trailing?: boolean;
  trailingIcon?: IconComponent;
  b24ui?: {
    base?: any;
    wrapper?: any;
    label?: any;
    leadingIcon?: any;
    leadingAvatar?: any;
    leadingAvatarSize?: any;
    trailingIcon?: any;
  };
}
